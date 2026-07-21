import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Calculator,
  AlertCircle,
  MapPin
} from 'lucide-react';
import type { QuoteItem } from '../types';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart
}) => {
  const [startDate, setStartDate] = useState<string>('2026-08-01');
  const [durationDays, setDurationDays] = useState<number>(5);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [includeFieldTechSupport, setIncludeFieldTechSupport] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculate estimated total
  const estimatedTotal = items.reduce((acc, item) => {
    if (item.type === 'rental' && item.equipment.rentalPricePerDayEst) {
      return acc + (item.equipment.rentalPricePerDayEst * durationDays);
    }
    return acc;
  }, 0) + (includeFieldTechSupport ? 150 * durationDays : 0);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*SOLICITUD DE COTIZACIÓN B2B - IDUR S.A.*\n\n`;
    text += `*Empresa:* ${companyName || 'No especificada'}\n`;
    text += `*Contacto:* ${contactName || 'Ingeniero'}\n`;
    text += `*Email:* ${email}\n`;
    text += `*Teléfono:* ${phone}\n`;
    text += `*Ubicación de Obra:* ${siteLocation || 'A convenir'}\n`;
    text += `*Fecha Inicio:* ${startDate} (${durationDays} días de alquiler)\n\n`;
    text += `*Equipos Requeridos:*\n`;

    items.forEach((it, idx) => {
      text += `${idx + 1}. ${it.equipment.brand} ${it.equipment.model} (${it.type === 'rental' ? 'Alquiler' : 'Venta'})\n`;
    });

    if (includeFieldTechSupport) {
      text += `\n*Servicio Adicional:* Asistencia de Técnico Especialista en Campo`;
    }

    text += `\n\n*Estimado Aproximado:* USD $${estimatedTotal}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5491140000000?text=${encodedText}`, '_blank');
    setIsSubmitted(true);
  };

  const handleDownloadPDFMock = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-[#0A2540] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-cyan-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Cotizador B2B de Alquiler / Venta</h3>
                <p className="text-xs text-slate-300 font-mono-tech">IDUR S.A. • Respuesta Inmediata</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-blue-900 text-slate-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0A2540]">¡Solicitud Generada con Éxito!</h4>
                <p className="text-xs text-slate-600">
                  Hemos estructurado los datos de tu pedido. Un ingeniero comercial de IDUR S.A. verificará la disponibilidad de calibración y te enviará la propuesta oficial.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); onClearCart(); onClose(); }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  Volver al Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono-tech uppercase font-bold text-slate-500">
                      Equipos Seleccionados ({items.length})
                    </h4>
                    {items.length > 0 && (
                      <button
                        onClick={onClearCart}
                        className="text-xs text-rose-600 hover:text-rose-800 transition-colors font-bold"
                      >
                        Vaciar
                      </button>
                    )}
                  </div>

                  {items.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-600 font-medium">No hay equipos en la lista de cotización.</p>
                      <p className="text-[11px] text-slate-500">Haz clic en "Cotizar Alquiler" o "Cotizar Venta" en el catálogo.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.equipment.image}
                              alt={item.equipment.name}
                              className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-[#0A2540]">{item.equipment.model}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 font-mono-tech font-bold">
                                  {item.type === 'rental' ? 'Alquiler' : 'Venta'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{item.equipment.brand}</p>
                              {item.type === 'rental' && item.equipment.rentalPricePerDayEst && (
                                <p className="text-[10px] text-amber-700 font-mono-tech font-bold">
                                  USD ${item.equipment.rentalPricePerDayEst} / día
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <>
                    {/* Dates & Duration Configuration */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                      <h4 className="text-xs font-mono-tech uppercase font-bold text-blue-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-700" /> Configuración del Período de Alquiler
                      </h4>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                        <div>
                          <label className="block text-slate-600 text-[10px] mb-1 font-bold">Fecha de Inicio de Obra</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 text-[10px] mb-1 font-bold">Días de Alquiler Estimados</label>
                          <select
                            value={durationDays}
                            onChange={(e) => setDurationDays(Number(e.target.value))}
                            className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                          >
                            <option value={3}>3 Días (Prueba rápida)</option>
                            <option value={5}>5 Días (1 Semana de Obra)</option>
                            <option value={10}>10 Días (Extenso)</option>
                            <option value={30}>30 Días (Mensual Obra Grande)</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-700 pt-1 cursor-pointer font-medium">
                        <input
                          type="checkbox"
                          checked={includeFieldTechSupport}
                          onChange={(e) => setIncludeFieldTechSupport(e.target.checked)}
                          className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Incluir Especialista de Campo IDUR para asistencia en maniobra (+USD $150/día)</span>
                      </label>
                    </div>

                    {/* Customer Info Form */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <h4 className="text-xs font-mono-tech uppercase font-bold text-slate-500">
                        Datos del Solicitante / Empresa
                      </h4>

                      <div className="space-y-2.5 text-xs">
                        <div className="relative">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Nombre de Empresa / Razón Social"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Ingeniero / Contacto"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                            />
                          </div>

                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Teléfono / WhatsApp"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            placeholder="Correo Electrónico Corporativo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                          />
                        </div>

                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Ubicación de Obra (Ej: Subestación Ezeiza)"
                            value={siteLocation}
                            onChange={(e) => setSiteLocation(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:border-blue-600 focus:outline-none shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price Estimate Summary */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono-tech">
                      <div className="flex justify-between items-center text-xs text-slate-700">
                        <span>Estimado Alquiler ({durationDays} días):</span>
                        <span className="font-bold text-[#0A2540] text-sm">USD ${estimatedTotal}</span>
                      </div>
                      <p className="text-[10px] text-blue-800 font-semibold">
                        *El monto final se confirmará en el presupuesto oficial con IVA y certificado de calibración.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}

          </div>

          {/* Footer Actions */}
          {!isSubmitted && items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enviar Solicitud por WhatsApp a IDUR</span>
              </button>

              <button
                onClick={handleDownloadPDFMock}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Generar Presupuesto PDF de Muestra</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
