// Vercel Serverless Function / Resend API Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { toEmail, attendeeName, companyName, phone, courseTitle } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_cf7VxpQB_EaUEc76JmXzMMvj4zhhq2UPM';
  const ADMIN_TEST_EMAIL = 'sanchezmanuel397@gmail.com'; // Notificación para IDUR S.A. en etapa de prueba
  const FROM_EMAIL = 'IDUR Capacitaciones <notificaciones@mankerz.net>'; // Remitente oficial desde el dominio mankerz.net

  try {
    const recipients = [toEmail, ADMIN_TEST_EMAIL].filter(Boolean);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: recipients,
        subject: `[IDUR S.A.] Confirmación de Inscripción - ${courseTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 16px; background-color: #FFFFFF;">
            
            <div style="background-color: #0A2540; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <h2 style="color: #00873D; margin: 0; font-family: Georgia, serif; font-size: 28px;">IDUR S.A.</h2>
              <p style="color: #E2E8F0; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Notificación Oficial de Capacitación</p>
            </div>

            <p style="font-size: 14px; color: #0F172A;">Estimado/a <strong>${attendeeName}</strong> (${companyName}),</p>
            <p style="font-size: 13px; color: #334155; line-height: 1.5;">
              Hemos recibido correctamente tu solicitud de inscripción para la capacitación técnica en <strong>IDUR S.A.</strong>:
            </p>

            <div style="background: #F0FDF4; padding: 16px; border-left: 4px solid #00873D; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0; color: #0A2540; font-size: 16px;">${courseTitle}</h3>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; line-height: 1.6;">
                <strong>Nombre del Asistente:</strong> ${attendeeName}<br/>
                <strong>Empresa / Organización:</strong> ${companyName}<br/>
                <strong>Teléfono de Contacto:</strong> ${phone}<br/>
                <strong>Email Registrado:</strong> ${toEmail}
              </p>
            </div>

            <p style="font-size: 13px; color: #334155; line-height: 1.5;">
              Nuestro departamento académico se pondrá en contacto a la brevedad con la ficha de pago y detalles de ingreso al laboratorio.
            </p>

            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
            
            <div style="font-size: 11px; color: #64748B; line-height: 1.5;">
              <p style="margin: 0; font-weight: bold; color: #0A2540;">IDUR S.A. • Soluciones de Ingeniería Eléctrica</p>
              <p style="margin: 2px 0;">Avenida Sucre 2074 - 1° Piso - Oficina 5, Beccar, Buenos Aires</p>
              <p style="margin: 2px 0;">Tel: +54 11 4737-0530 / +54 11 4719-5972 • Email: info@idur.com.ar</p>
            </div>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log('[Resend Email Response]:', result);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: result.message || 'Error al enviar correo vía Resend' });
    }

    return res.status(200).json({ status: 'success', result });
  } catch (error) {
    console.error('[Resend Email Error]:', error);
    return res.status(500).json({ error: error.message });
  }
}
