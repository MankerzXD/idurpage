import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  FileCheck, 
  Cpu, 
  RotateCw, 
  Send
} from 'lucide-react';

export const LabServices: React.FC = () => {
  const [equipmentModel, setEquipmentModel] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Calibración Anual');
  const [requested, setRequested] = useState(false);

  const services = [
    {
      title: 'Calibración Trazable ISO 17025',
      desc: 'Emisión de certificados oficiales de calibración trazables a patrones nacionales e internacionales para su flota de equipos.',
      icon: FileCheck
    },
    {
      title: 'Mantenimiento Preventivo & Reparación',
      desc: 'Servicio técnico especializado con componentes y repuestos originales importados directamente de Austria y Alemania.',
      icon: Wrench
    },
    {
      title: 'Actualización de Software & Firmware',
      desc: 'Carga de licencias oficial Primary Test Manager (PTM), b2 Control Center y calibraciones de sensores.',
      icon: Cpu
    },
    {
      title: 'Guardia & Equipo de Sustitución',
      desc: 'Acceso prioritario a alquiler de equipos de reemplazo durante el período de calibración para no paralizar sus obras.',
      icon: RotateCw
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <section id="laboratorio" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-[#00873D] text-xs font-mono-tech uppercase font-bold">
              <Wrench className="w-3.5 h-3.5 text-[#00873D]" /> Laboratorio Oficial de Servicio Técnico
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Calibración Certificada & <span className="text-[#00873D]">Mantenimiento</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
              Garantice la precisión de sus instrumentos de ensayo. El Laboratorio IDUR ofrece calibraciones periódicas y atención técnica homologada.
            </p>
          </div>
        </div>

        {/* Grid: Services Overview & Booking Form */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: 4 Key Services */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00873D] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-base">{s.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Laboratory Service Order Form */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-md">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Solicitar Turno de Calibración / Service</h3>
              <p className="text-xs text-slate-500 font-mono-tech">Recepción de equipos en laboratorio Bs. As.</p>
            </div>

            {requested ? (
              <div className="p-6 text-center rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00873D] mx-auto" />
                <h4 className="text-slate-900 font-bold text-base">Solicitud de Turno Registrada</h4>
                <p className="text-xs text-slate-700">
                  Nuestro jefe de laboratorio se pondrá en contacto para coordinar el ingreso del equipo <strong className="text-[#00873D]">{equipmentModel}</strong>.
                </p>
                <button
                  onClick={() => setRequested(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Nueva Solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Modelo de Equipo / Marca</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: OMICRON CPC 100 / b2 HVA28"
                    value={equipmentModel}
                    onChange={(e) => setEquipmentModel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00873D] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Número de Serie (S/N)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: QG521L"
                      value={serialNum}
                      onChange={(e) => setSerialNum(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono-tech focus:border-[#00873D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Tipo de Servicio</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00873D] focus:outline-none"
                    >
                      <option>Calibración Anual</option>
                      <option>Mantenimiento Preventivo</option>
                      <option>Reparación / Diagnóstico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Empresa Solicitante</label>
                  <input
                    type="text"
                    required
                    placeholder="Razón Social"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00873D] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Contacto</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre Ingeniero"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00873D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Teléfono</label>
                    <input
                      type="tel"
                      required
                      placeholder="+54..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#00873D] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md transition-all mt-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Enviar Solicitud de Servicio Técnico</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
