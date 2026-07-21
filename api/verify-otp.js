import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, token, expiry } = req.body;

  if (!email || !otp || !token || !expiry) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos para la verificación.' });
  }

  // Check if code has expired
  if (Date.now() > Number(expiry)) {
    return res.status(400).json({ error: 'El código OTP ha expirado. Por favor, solicita uno nuevo.' });
  }

  const targetEmail = email.trim().toLowerCase();
  const targetOtp = otp.trim();

  // Recompute verification token
  const secret = process.env.RESEND_API_KEY || 'idur-otp-secret-key';
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${targetEmail}:${targetOtp}:${expiry}`);
  const expectedToken = hmac.digest('hex');

  // Verify signature match
  if (token === expectedToken) {
    return res.status(200).json({ status: 'success', authorized: true });
  } else {
    return res.status(401).json({ error: 'El código de verificación ingresado es incorrecto.' });
  }
}
