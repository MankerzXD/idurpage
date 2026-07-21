import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';
import { IdurLogo } from './IdurLogo';

interface FooterProps {
  setCurrentPage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNav = (page: string) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 py-16 text-xs font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand Info & ISO (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div 
              className="bg-white p-2 rounded-xl inline-block shadow-md cursor-pointer"
              onClick={() => handleNav('home')}
            >
              <IdurLogo />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Líderes en soluciones de ensayo, diagnóstico de alta tensión, venta y alquiler de equipos de precisión para el sector energético argentino.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono-tech text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certificación ISO 9001 & ISO 17025</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/idur-sa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0077B5]/20 hover:bg-[#0077B5]/40 border border-[#0077B5]/50 text-cyan-300 font-bold text-xs transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#0077B5]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn IDUR S.A.</span>
              </a>
            </div>
          </div>

          {/* Col 2: Datos Oficiales de Contacto (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-mono-tech text-emerald-400">
              Ubicación & Contacto
            </h4>
            
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">IDUR S.A.</p>
                  <p>Avenida Sucre 2074 - 1° Piso - Oficina 5</p>
                  <p className="text-slate-400">B1643AQO - Beccar</p>
                  <p className="text-slate-400">Provincia de Buenos Aires - Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 font-mono-tech pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">+54 11 4737-0530</p>
                  <p className="text-white font-bold">+54 11 4719-5972</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 font-mono-tech pt-1">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@idur.com.ar" className="text-emerald-400 font-bold hover:underline">
                  info@idur.com.ar
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Secciones Principales (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-mono-tech">
              Páginas
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-medium">
              <li onClick={() => handleNav('home')} className="hover:text-emerald-400 cursor-pointer">Inicio</li>
              <li onClick={() => handleNav('catalogo')} className="hover:text-emerald-400 cursor-pointer">Equipos & Alquiler</li>
              <li onClick={() => handleNav('capacitaciones')} className="hover:text-emerald-400 cursor-pointer">Capacitaciones</li>
              <li onClick={() => handleNav('laboratorio')} className="hover:text-emerald-400 cursor-pointer">Laboratorio & Servicios</li>
              <li onClick={() => handleNav('nosotros')} className="hover:text-emerald-400 cursor-pointer">Nosotros & Marcas</li>
            </ul>
          </div>

          {/* Col 4: MAPA GOOGLE INTERACTIVO SI O SI (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-mono-tech flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Ubicación en Google Maps</span>
              </h4>
              <a 
                href="https://maps.google.com/?q=Avenida+Sucre+2074+Beccar+Buenos+Aires" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-mono-tech"
              >
                <span>Abrir en Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-800 shadow-xl aspect-video bg-slate-900 group">
              <iframe
                title="Ubicación IDUR S.A. Beccar"
                src="https://maps.google.com/maps?q=Avenida%20Sucre%202074%20Beccar%20Buenos%20Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white">IDUR S.A. • Beccar</span>
                </div>
                <span className="text-[10px] font-mono-tech text-emerald-400">Av. Sucre 2074</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono-tech">
          <p>© {new Date().getFullYear()} IDUR S.A. Todos los derechos reservados. Av. Sucre 2074 - Beccar, Bs. As.</p>
          <p className="text-emerald-400 font-bold">Sitio Oficial IDUR S.A.</p>
        </div>

      </div>
    </footer>
  );
};
