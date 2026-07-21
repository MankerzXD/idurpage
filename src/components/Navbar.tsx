import React, { useState } from 'react';
import { 
  Zap, 
  GraduationCap, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X,
  Clock
} from 'lucide-react';
import { IdurLogo } from './IdurLogo';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Inicio', icon: Zap },
    { id: 'catalogo', label: 'Equipos & Alquiler', icon: Zap },
    { id: 'capacitaciones', label: 'Capacitaciones', icon: GraduationCap },
    { id: 'laboratorio', label: 'Laboratorio & Servicios', icon: Wrench },
    { id: 'nosotros', label: 'Nosotros & Marcas', icon: ShieldCheck },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner Ribbon */}
      <div className="bg-[#0A2540] text-xs py-1.5 px-4 text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Representantes Oficiales en Argentina
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-white font-medium">
              OMICRON • b2 • Janitza • ARCTEQ • SEG • STÄUBLI
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono-tech text-xs">
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> At. Comercial: Lun a Vie 8 a 17 hs
            </span>
            
            <a 
              href="tel:+541147370530" 
              className="flex items-center gap-1 text-emerald-400 hover:text-white transition-colors font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5" /> +54 (11) 4737-0530
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Green Brand Logo */}
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleNavClick('home')}
          >
            <IdurLogo />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-4.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#00873D] text-white shadow-md' 
                      : 'text-slate-700 hover:text-[#00873D] hover:bg-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all ${
                  isActive ? 'bg-[#00873D] text-white' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#00873D]'}`} />
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
