import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const BrandBar: React.FC = () => {
  const brands = [
    {
      name: 'OMICRON',
      tagline: 'Representante Oficial • Austria',
      desc: 'Ensayos primarios, relés de protección y descargas parciales',
      badge: 'Partner Gold',
      logo: '/brands/omicron.svg',
      color: 'bg-white border-slate-200'
    },
    {
      name: 'b2 electronics',
      tagline: 'Representante Oficial • Austria',
      desc: 'Sistemas VLF y Tan Delta para diagnósticos de cables',
      badge: 'Exclusivo en Argentina',
      logo: '/brands/b2-electronics.svg',
      color: 'bg-white border-slate-200'
    },
    {
      name: 'Janitza',
      tagline: 'Representante Oficial • Alemania',
      desc: 'Monitoreo de calidad de energía e IEC 61000-4-30 Clase A',
      badge: 'Soluciones Smart Grid',
      logo: '/brands/janitza.svg',
      color: 'bg-white border-slate-200'
    },
    {
      name: 'ARCTEQ',
      tagline: 'Representante Oficial • Finlandia',
      desc: 'Protección de arco eléctrico y relés de protección inteligente',
      badge: 'Protección Arc Flash',
      logo: '/brands/arcteq.svg',
      color: 'bg-white border-slate-200'
    },
    {
      name: 'SEG electronics',
      tagline: 'Representante Oficial • Alemania',
      desc: 'Relés de protección de sobrecorriente, tensión y frecuencia',
      badge: 'Protección de Redes',
      logo: '/brands/seg-electronics.svg',
      color: 'bg-white border-slate-200'
    },
    {
      name: 'STÄUBLI',
      tagline: 'Representante Oficial • Suiza',
      desc: 'Conectores eléctricos de alta corriente y accesorios de prueba',
      badge: 'Conectividad Premium',
      logo: '/brands/staubli.svg',
      color: 'bg-white border-slate-200'
    }
  ];

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest font-mono-tech text-[#00873D] font-black">
            Marcas Internacionales Representadas por IDUR S.A.
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Representantes Exclusivos & Servicio Técnico Oficial
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Garantía oficial de fábrica, calibraciones homologadas e importación directa de repuestos originales.
          </p>
        </div>

        {/* Brand Grid - 6 Brands */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((b, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                {/* Logo & Badge */}
                <div className="flex items-center justify-between h-14 border-b border-slate-100 pb-3">
                  <div className="h-10 flex items-center max-w-[170px]">
                    <img 
                      src={b.logo} 
                      alt={b.name} 
                      className="max-h-9 object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[#00873D]">
                    {b.badge}
                  </span>
                </div>

                <p className="text-xs font-bold text-[#0A2540]">{b.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 pt-3 border-t border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00873D]" />
                <span>Respaldo & Garantía Oficial IDUR S.A.</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
