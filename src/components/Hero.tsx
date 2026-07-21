import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  FileCheck2, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onExploreCourses }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-grid-pattern-light bg-radial-glow-light py-16 lg:py-24">
      {/* Background Subtle Accent Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00873D] text-xs font-extrabold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-[#00873D] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Propuesta de Rediseño B2B • IDUR S.A.</span>
              <span className="bg-[#00873D] text-white px-2 py-0.5 rounded text-[10px] font-mono-tech">Oficial</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Tecnología de <span className="text-[#00873D]">Alta Tensión</span> y Diagnóstico Eléctrico
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Representantes oficiales en Argentina de <strong className="text-[#00873D]">OMICRON</strong>, <strong className="text-[#00873D]">b2 electronics</strong>, <strong className="text-[#00873D]">Janitza</strong>, <strong className="text-[#00873D]">ARCTEQ</strong>, <strong className="text-[#00873D]">SEG electronics</strong> y <strong className="text-[#00873D]">STÄUBLI</strong>. Proveemos venta, alquiler de flota calibrada, laboratorio certificado y capacitaciones técnicas especializadas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-base shadow-xl shadow-emerald-700/20 hover:scale-105 transition-all group"
              >
                <Zap className="w-5 h-5 text-white fill-current" />
                <span>Explorar Equipos & Cotizar Alquiler</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-white hover:bg-emerald-50 hover:border-[#00873D] text-slate-800 border border-slate-300 font-bold text-base transition-all shadow-sm"
              >
                <Calendar className="w-5 h-5 text-[#00873D]" />
                <span>Próximas Capacitaciones</span>
              </button>
            </div>

            {/* Feature Highlights Ribbon */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#00873D]" />
                  <span>Flota 100% Calibrada</span>
                </div>
                <p className="text-xs text-slate-600">Certificación oficial de fábrica en cada equipo.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-[#00873D]" />
                  <span>Respuesta Rápida</span>
                </div>
                <p className="text-xs text-slate-600">Cotizaciones inmediatas para obras e in-company.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <Award className="w-4 h-4 text-[#00873D]" />
                  <span>Soporte de Ingeniería</span>
                </div>
                <p className="text-xs text-slate-600">Asesoramiento técnico especializado.</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Interactive Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00873D] to-emerald-400 rounded-3xl blur-xl opacity-25"></div>

              {/* Main Preview Box */}
              <div className="relative rounded-2xl bg-white p-6 border border-slate-200 space-y-6 shadow-2xl">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#00873D] animate-ping" />
                    <span className="text-xs font-mono-tech text-[#00873D] font-extrabold uppercase tracking-wider">
                      LABORATORIO EN VIVO • BUENOS AIRES
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-tech text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    ISO 17025
                  </span>
                </div>

                {/* Featured Equipment Card Highlight */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
                      alt="OMICRON CPC 100" 
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 font-mono-tech bg-slate-950 px-2 py-0.5 rounded">
                          OMICRON Austria
                        </span>
                        <h4 className="text-white font-bold text-lg mt-0.5">CPC 100 Universal Test Set</h4>
                      </div>
                      <span className="text-xs font-mono-tech font-extrabold text-white bg-[#00873D] px-2.5 py-1 rounded shadow">
                        Disponible
                      </span>
                    </div>
                  </div>

                  {/* Technical Parameters Pill */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                      <p className="text-slate-500 text-[10px]">Inyección Primaria</p>
                      <p className="text-[#00873D] font-bold">2000 A AC / 12 kV</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                      <p className="text-slate-500 text-[10px]">Alquiler Diario Est.</p>
                      <p className="text-amber-800 font-bold">USD $450 / día</p>
                    </div>
                  </div>
                </div>

                {/* Quick RFQ Simulation Strip */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-[#00873D]" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">¿Necesitás alquilar este equipo?</p>
                      <p className="text-[11px] text-slate-600">Incluye maleta de cables y calibración vigente.</p>
                    </div>
                  </div>
                  <button 
                    onClick={onExploreCatalog}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00873D] hover:bg-[#007032] text-white text-xs font-bold transition-all shadow"
                  >
                    Cotizar
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
