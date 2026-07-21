import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables (including those without VITE_ prefix)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Expose env variables to process.env for Node serverless handlers
  Object.keys(env).forEach((key) => {
    process.env[key] = env[key];
  });

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/')) {
              // Extract the API endpoint path without query parameters
              const urlPath = req.url.split('?')[0];
              const handlerPath = path.resolve(process.cwd(), `.${urlPath}.js`);

              if (fs.existsSync(handlerPath)) {
                try {
                  // Import the serverless function handler dynamically
                  const module = await import(`${handlerPath}?update=${Date.now()}`);
                  const handler = module.default || module;

                  if (typeof handler === 'function') {
                    // Read and parse the request body
                    let rawBody = '';
                    req.on('data', (chunk) => {
                      rawBody += chunk;
                    });

                    req.on('end', async () => {
                      try {
                        (req as any).body = rawBody ? JSON.parse(rawBody) : {};
                      } catch (e) {
                        (req as any).body = {};
                      }

                      // Create mock response object matching Vercel Serverless Function signature
                      const mockRes = {
                        statusCode: 200,
                        status(code: number) {
                          this.statusCode = code;
                          res.statusCode = code;
                          return this;
                        },
                        json(data: any) {
                          res.setHeader('Content-Type', 'application/json');
                          res.statusCode = this.statusCode;
                          res.end(JSON.stringify(data));
                          return this;
                        },
                        setHeader(name: string, value: string) {
                          res.setHeader(name, value);
                          return this;
                        },
                        end(data: any) {
                          res.end(data);
                          return this;
                        }
                      };

                      try {
                        await handler(req, mockRes);
                      } catch (err: any) {
                        console.error(`[API Error] in ${urlPath}:`, err);
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                      }
                    });
                    return;
                  }
                } catch (err: any) {
                  console.error(`[API Load Error] for ${urlPath}:`, err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: `Failed to load handler: ${err.message}` }));
                  return;
                }
              }
            }
            next();
          });
        }
      }
    ],
  };
});
