import React from 'react';
import { ShieldCheck, Award, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { BrandBar } from './BrandBar';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-16 py-12 bg-slate-50">
      
      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-[#00873D] text-xs font-mono-tech uppercase font-bold">
            Trayectoria en Argentina
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sobre <span className="text-[#00873D]">IDUR S.A.</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Más de dos décadas proveyendo equipamiento de diagnóstico de alta tensión, calibraciones con trazabilidad ISO 17025 y asesoramiento técnico especializado a las principales empresas del sector eléctrico nacional.
          </p>
        </div>
      </div>

      {/* Brand Grid Section */}
      <BrandBar />

      {/* Key Company Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00873D] flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Representación Exclusiva</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Representamos en forma oficial a firmas líderes globales como OMICRON, b2 electronics, Janitza, ARCTEQ, SEG electronics y STÄUBLI.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00873D] flex items-center justify-center border border-emerald-200">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Laboratorio ISO 17025</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Laboratorio de ensayo y calibración propio con patrones de referencia trazables nacional e internacionalmente.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00873D] flex items-center justify-center border border-emerald-200">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Soporte Técnico de Ingeniería</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipo de ingenieros capacitados directamente en fábrica para asistencia técnica, capacitaciones e in-company.
            </p>
          </div>

        </div>
      </div>

      {/* Office & Headquarters Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#0A2540] text-white space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono-tech text-emerald-400 font-bold uppercase">Sede Central Beccar</span>
            <h2 className="text-2xl sm:text-3xl font-black">Instalaciones & Laboratorio Técnico</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono-tech text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Avenida Sucre 2074 - 1° Piso - Oficina 5, B1643AQO - Beccar, Buenos Aires</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Atención Comercial: Lunes a Viernes de 8:00 a 17:00 hs</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
