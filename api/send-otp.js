import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Falta configurar la variable de entorno RESEND_API_KEY.' });
  }

  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'El correo electrónico es requerido.' });
  }

  const targetEmail = email.trim().toLowerCase();

  // Validate if the email is an authorized administrator
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  let isAuthorized = false;

  // Master Admin fallback
  if (targetEmail === 'sanchezmanuel397@gmail.com') {
    isAuthorized = true;
  } else if (supabaseUrl && supabaseAnonKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', targetEmail)
        .maybeSingle();

      if (data && !error) {
        isAuthorized = true;
      }
    } catch (err) {
      console.warn('[OTP Admin Check Error]: Failed to query Supabase, fallback check only.', err);
    }
  }

  if (!isAuthorized) {
    return res.status(403).json({ error: 'El email ingresado no pertenece a un administrador autorizado.' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set expiration (5 minutes)
  const expiry = Date.now() + 5 * 60 * 1000;

  // Generate HMAC verification token
  const secret = RESEND_API_KEY;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${targetEmail}:${otp}:${expiry}`);
  const token = hmac.digest('hex');

  // Resend API variables
  const FROM_EMAIL = 'IDUR Seguridad <notificaciones@mankerz.net>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: targetEmail,
        subject: `[IDUR S.A.] Código de Verificación OTP: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F172A; max-width: 500px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 16px; background-color: #FFFFFF;">
            <div style="background-color: #0A2540; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h2 style="color: #00873D; margin: 0; font-family: Georgia, serif; font-size: 24px;">IDUR S.A.</h2>
              <p style="color: #E2E8F0; font-size: 10px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Portal de Administración Seguro</p>
            </div>
            
            <h3 style="color: #0F172A; margin-top: 0; font-size: 16px;">Código de Acceso Único</h3>
            <p style="font-size: 13px; color: #475569; line-height: 1.5;">
              Estás intentando iniciar sesión en el panel de administración de <strong>IDUR S.A.</strong>
              Usa el siguiente código de verificación de un solo uso (OTP) para completar el acceso. <strong>Este código es válido por 5 minutos.</strong>
            </p>
            
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; text-align: center; border-radius: 12px; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #00873D; font-family: monospace;">${otp}</span>
            </div>
            
            <p style="font-size: 11px; color: #94A3B8; text-align: center;">
              Si no solicitaste este código, puedes ignorar este correo de forma segura.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
            
            <div style="font-size: 11px; color: #64748B; line-height: 1.5;">
              <p style="margin: 0; font-weight: bold; color: #0A2540;">IDUR S.A. • Soporte de Ingeniería</p>
              <p style="margin: 2px 0;">Avenida Sucre 2074 - Beccar, Buenos Aires</p>
              <p style="margin: 2px 0;">Tel: +54 11 4737-0530 • Email: info@idur.com.ar</p>
            </div>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log('[OTP Email Response]:', result);

    if (!response.ok) {
      return res.status(response.status).json({ error: result.message || 'Error al enviar OTP vía Resend' });
    }

    return res.status(200).json({ status: 'success', token, expiry });
  } catch (error) {
    console.error('[OTP Email Send Error]:', error);
    return res.status(500).json({ error: 'Error al enviar el correo con el código OTP: ' + error.message });
  }
}
