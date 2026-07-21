import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Mail, X, LogIn, Sparkles } from 'lucide-react';
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
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Primary Admin credentials check
    if (
      (email.trim().toLowerCase() === 'sanchezmanuel397@gmail.com' && password === '1211AntoUmbides') ||
      password === '1211AntoUmbides'
    ) {
      onLoginSuccess(email.trim() || 'sanchezmanuel397@gmail.com');
      onClose();
    } else {
      setErrorMsg('Credenciales inválidas. Verifique el email y la contraseña asignada.');
    }
  };

  const handleQuickFill = () => {
    setEmail('sanchezmanuel397@gmail.com');
    setPassword('1211AntoUmbides');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-[#00873D] p-8 space-y-6 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm">
              <IdurLogo />
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
            <span>Acceso Administrativo Seguro</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 pt-1">Portal de Administración IDUR</h3>
          <p className="text-xs text-slate-600 font-medium">
            Inicie sesión con las credenciales maestras para gestionar el catálogo y capacitaciones.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
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

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Contraseña</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4 text-white" />
              <span>Ingresar al Panel Admin</span>
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

        <div className="pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono-tech">
          IDUR S.A. • Acceso Restringido a Personal Autorizado
        </div>

      </div>
    </div>
  );
};
