import React, { useState } from 'react';
import { 
  Menu, 
  X,
  Phone
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
    { id: 'home', label: 'Inicio' },
    { id: 'catalogo', label: 'Equipos & Alquiler' },
    { id: 'capacitaciones', label: 'Capacitaciones' },
    { id: 'laboratorio', label: 'Laboratorio & Servicios' },
    { id: 'nosotros', label: 'Nosotros & Marcas' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Official Brand Logo (Without S.A. badge for a cleaner, minimalist look) */}
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleNavClick('home')}
          >
            <IdurLogo showBadge={false} className="h-8" />
          </div>

          {/* Desktop Nav Links (Minimalist styling, no pills or icons) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-sm font-semibold tracking-tight transition-all duration-200 ${
                    isActive 
                      ? 'text-[#00873D]' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00873D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button - Minimalist Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+541147370530" 
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#00873D] hover:text-[#00873D] hover:bg-emerald-50/50 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#00873D]" />
              <span>+54 (11) 4737-0530</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold text-sm transition-all ${
                  isActive ? 'bg-[#00873D]/10 text-[#00873D]' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <a 
              href="tel:+541147370530" 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-50 text-slate-700 text-sm font-bold border border-slate-200"
            >
              <Phone className="w-4 h-4 text-[#00873D]" />
              <span>+54 (11) 4737-0530</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
