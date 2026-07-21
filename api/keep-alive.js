export default async function handler(req, res) {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rjhrfadbfscpdlgthdzt.supabase.co';
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqaHJmYWRiZnNjcGRsZ3RoZHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1OTM3NTEsImV4cCI6MjEwMDE2OTc1MX0.Loy5Ds1G_bsKLkh5QQi2FKOK3XeTfOpSuXO7wQ31YrA';

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (response.ok) {
      return res.status(200).json({ status: 'ok', message: 'Ping a Supabase exitoso desde Vercel Cron!' });
    }
    return res.status(500).json({ status: 'error', code: response.status });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
