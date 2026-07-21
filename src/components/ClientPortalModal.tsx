import React, { useState } from 'react';
import { 
  UserCheck, 
  X, 
  FileCheck2, 
  BookOpen, 
  Award, 
  Download, 
  Lock, 
  CheckCircle2
} from 'lucide-react';
import { MOCK_CERTIFICATES } from '../data/mockData';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('ingenieria@transener.com.ar');
  const [password, setPassword] = useState('••••••••');
  const [activeTab, setActiveTab] = useState<'certificados' | 'manuales' | 'historial'>('certificados');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0A2540]">Portal B2B de Clientes IDUR S.A.</h3>
              <p className="text-xs text-slate-500 font-mono-tech">Área Privada para Clientes Recurrentes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isLoggedIn ? (
          /* Login Screen */
          <div className="max-w-md mx-auto py-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 mx-auto flex items-center justify-center text-blue-700">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#0A2540]">Acceso a Documentación Técnica</h4>
              <p className="text-xs text-slate-600">
                Descargue certificados de calibración vigentes, manuales de operabilidad e historial de capacitaciones de su personal.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-mono-tech text-[11px]">
                <p className="font-bold">Acceso de Demostración:</p>
                <p>Usuario: ingenieria@transener.com.ar</p>
                <p>Clave: (Cualquier clave)</p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Correo Corporativo</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0A2540] hover:bg-blue-900 text-white font-bold text-xs shadow-md"
              >
                Ingresar al Portal B2B
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-6">
            
            {/* Account Info Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A2540] text-cyan-300 font-extrabold flex items-center justify-center text-xs">
                  TR
                </div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-sm">Transener S.A.</h4>
                  <p className="text-xs text-slate-500 font-mono-tech">CUIT 30-65488421-9 • Cliente Categoría A</p>
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-xs text-rose-600 hover:text-rose-800 underline font-mono-tech font-bold"
              >
                Cerrar Sesión
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-4 text-xs font-mono-tech">
              <button
                onClick={() => setActiveTab('certificados')}
                className={`pb-3 font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'certificados' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileCheck2 className="w-4 h-4" /> Certificados de Calibración
              </button>
              <button
                onClick={() => setActiveTab('manuales')}
                className={`pb-3 font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'manuales' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Manuales & Esquemas
              </button>
              <button
                onClick={() => setActiveTab('historial')}
                className={`pb-3 font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'historial' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4" /> Historial de Cursos
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'certificados' && (
              <div className="space-y-3">
                {MOCK_CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0A2540]">{cert.equipmentModel}</span>
                        <span className={`text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded ${
                          cert.status === 'Vigente' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono-tech mt-1">
                        Emisión: {cert.issueDate} • Vencimiento: {cert.expiryDate}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Descargando certificado de calibración ${cert.id}.pdf`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-700 border border-slate-300 text-xs font-bold shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'manuales' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-[#0A2540]">Manual de Usuario - OMICRON CPC 100</h5>
                    <p className="text-xs text-slate-500">Guía de operabilidad PTM v5.2 (Español)</p>
                  </div>
                  <button onClick={() => alert('Descargando Manual CPC100.pdf')} className="p-2 rounded-lg bg-white text-blue-700 border border-slate-200 hover:bg-slate-100 shadow-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-[#0A2540]">Protocolo de Ensayo VLF - b2 HVA28</h5>
                    <p className="text-xs text-slate-500">Standard IEEE 400.2-2013 Quick Guide</p>
                  </div>
                  <button onClick={() => alert('Descargando Guía VLF.pdf')} className="p-2 rounded-lg bg-white text-blue-700 border border-slate-200 hover:bg-slate-100 shadow-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'historial' && (
              <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-[#0A2540] font-bold text-sm">3 Ingenieros Acreditados en 2026</h5>
                <p className="text-xs text-slate-600">
                  Ing. Martín González, Ing. Lucas Pérez y Ing. Sofía Ramos han completado la capacitación CPC 100.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
