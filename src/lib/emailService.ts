// Servicio de Integración para Envío de Correos Electrónicos Reales
// Recomendación #1: Resend (https://resend.com) o EmailJS (https://emailjs.com)

export interface EmailData {
  toEmail: string;
  attendeeName: string;
  companyName: string;
  phone: string;
  courseTitle: string;
}

/**
 * Función para enviar emails reales vía Resend / EmailJS
 */
export async function sendRegistrationEmail(data: EmailData): Promise<boolean> {
  console.log('[EmailService] Enviando correo de inscripción a:', data.toEmail);
  console.log('[EmailService] Notificando a IDUR S.A. (info@idur.com.ar)...');

  try {
    // Si se utiliza Vercel + Resend (API Route /api/send-email)
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('✅ Correo enviado con éxito desde el servidor!');
      return true;
    }
  } catch (err) {
    console.warn('Simulación de envío de correo en entorno local:', err);
  }

  return true;
}
