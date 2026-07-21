// Script de Keep-Alive para prevenir que Supabase Free Tier entre en pausa
// Envía un ping de salud liviano al endpoint oficial de Supabase

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rjhrfadbfscpdlgthdzt.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqaHJmYWRiZnNjcGRsZ3RoZHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1OTM3NTEsImV4cCI6MjEwMDE2OTc1MX0.Loy5Ds1G_bsKLkh5QQi2FKOK3XeTfOpSuXO7wQ31YrA';

async function keepAlive() {
  console.log(`[IDUR Supabase Keep-Alive] Enviando ping a: ${SUPABASE_URL}...`);
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (response.ok) {
      console.log('✅ Ping a Supabase exitoso (200 OK)! El proyecto mantendrá su actividad continua.');
    } else {
      console.warn('⚠️ Supabase respondió con estado:', response.status);
    }
  } catch (err) {
    console.error('❌ Error enviando ping a Supabase:', err.message);
  }
}

keepAlive();
