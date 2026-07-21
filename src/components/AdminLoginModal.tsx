import React, { useState, useEffect } from 'react';
import { ShieldAlert, Mail, X, LogIn, Sparkles, Send, ArrowLeft, RefreshCw, Key } from 'lucide-react';
import { IdurLogo } from './IdurLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [token, setToken] = useState('');
  const [expiry, setExpiry] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return;

    setErrorMsg('');
    setIsSending(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setExpiry(data.expiry);
        setStep(2);
        setCountdown(60);
        setOtp('');
      } else {
        setErrorMsg(data.error || 'Error al enviar el código de verificación.');
      }
    } catch (err: any) {
      setErrorMsg('No se pudo conectar con el servidor de autenticación.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setErrorMsg('Por favor ingrese el código completo de 6 dígitos.');
      return;
    }

    setErrorMsg('');
    setIsVerifying(true);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          token,
          expiry
        })
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(email.trim());
        onClose();
        // Reset state
        setStep(1);
        setEmail('');
        setOtp('');
      } else {
        setErrorMsg(data.error || 'El código OTP es incorrecto.');
      }
    } catch (err: any) {
      setErrorMsg('Error de red al intentar verificar el código.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('sanchezmanuel397@gmail.com');
  };

  const handleBackToEmail = () => {
    setStep(1);
    setOtp('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-[#00873D] p-8 space-y-6 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">
              <IdurLogo showBadge={false} className="h-7" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00873D] text-[11px] font-mono-tech font-bold uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-[#00873D]" />
            <span>Acceso OTP de Alta Seguridad</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 pt-1">Portal de Administración IDUR</h3>
          <p className="text-xs text-slate-600 font-medium">
            {step === 1 
              ? 'Ingrese su email de administrador para recibir un código de acceso único (OTP) enviado por Resend.'
              : `Hemos enviado un código OTP de 6 dígitos al correo: ${email}`}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Flow */}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Administrador</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="sanchezmanuel397@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00873D] hover:bg-[#007032] disabled:bg-slate-300 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                {isSending ? (
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
                <span>{isSending ? 'Enviando código...' : 'Solicitar Código de Acceso'}</span>
              </button>

              <button
                type="button"
                onClick={handleQuickFill}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#00873D] border border-emerald-200 text-[11px] font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Autocompletar Admin Principal
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-center">
                Código de Verificación
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-lg font-mono tracking-[8px] font-bold focus:border-[#00873D] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isVerifying || otp.length < 6}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00873D] hover:bg-[#007032] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
              >
                {isVerifying ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>{isVerifying ? 'Verificando...' : 'Verificar e Ingresar'}</span>
              </button>

              <div className="flex items-center justify-between text-[11px] pt-2">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Cambiar Email
                </button>

                {countdown > 0 ? (
                  <span className="text-slate-400 font-medium font-mono-tech">
                    Reenviar en {countdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-[#00873D] hover:text-[#007032] font-bold transition-colors font-semibold"
                  >
                    Reenviar Código
                  </button>
                )}
              </div>
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono-tech">
          IDUR S.A. • Acceso Restringido a Personal Autorizado
        </div>

      </div>
    </div>
  );
};
