import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Plus, 
  Info
} from 'lucide-react';
import type { Equipment, ApplicationCategory } from '../types';
import { MOCK_EQUIPMENT } from '../data/mockData';
import { incrementEquipmentStat } from '../lib/statsService';

interface CatalogProps {
  onAddToCart: (equipment: Equipment, type: 'rental' | 'purchase') => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<ApplicationCategory>('todos');
  const [selectedType, setSelectedType] = useState<'todos' | 'alquiler' | 'venta'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEquipment, setActiveModalEquipment] = useState<Equipment | null>(null);

  const categories: { id: ApplicationCategory; label: string }[] = [
    { id: 'todos', label: 'Todas las Soluciones' },
    { id: 'transformadores', label: 'Transformadores & Subestaciones' },
    { id: 'interruptores', label: 'Interruptores de Potencia' },
    { id: 'cables', label: 'Cables MT/AT & VLF' },
    { id: 'calidad-energia', label: 'Calidad de Energía' },
  ];

  const filteredEquipment = MOCK_EQUIPMENT.filter(eq => {
    // Filter by Category
    if (selectedCategory !== 'todos' && eq.category !== selectedCategory) {
      return false;
    }
    // Filter by Type (Alquiler / Venta)
    if (selectedType === 'alquiler' && !eq.availableForRent) return false;
    if (selectedType === 'venta' && !eq.availableForSale) return false;
    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = 
        eq.name.toLowerCase().includes(q) || 
        eq.model.toLowerCase().includes(q) || 
        eq.brand.toLowerCase().includes(q) ||
        eq.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <section id="catalogo" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-[#00873D] text-xs font-mono-tech uppercase font-bold">
              <Zap className="w-3.5 h-3.5 text-[#00873D]" /> Catálogo Orientado a Soluciones
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Equipos de Ensayo: <span className="text-[#00873D]">Venta & Alquiler</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
              Seleccione la solución técnica que necesita para sus obras. Agregue equipos a su cesta de cotización para calcular disponibilidad y tarifario al instante.
            </p>
          </div>

          {/* Quick Filter Toggle (Alquiler / Venta / Todos) */}
          <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setSelectedType('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedType === 'todos' ? 'bg-[#00873D] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedType('alquiler')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedType === 'alquiler' ? 'bg-[#00873D] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Solo Alquiler
            </button>
            <button
              onClick={() => setSelectedType('venta')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedType === 'venta' ? 'bg-[#00873D] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Solo Venta
            </button>
          </div>
        </div>

        {/* Search Bar & Application Category Filters */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-[#00873D] text-white border-[#00873D] shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#00873D] hover:text-[#00873D]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por modelo (ej. CPC 100, HVA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#00873D] shadow-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((eq) => (
            <div
              key={eq.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={eq.image}
                  alt={eq.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Brand Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-emerald-300 text-xs font-mono-tech font-bold shadow-md">
                    {eq.brand}
                  </span>
                </div>

                {/* Rental price tag if available */}
                {eq.availableForRent && eq.rentalPricePerDayEst && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#00873D] text-white font-mono-tech text-xs font-black shadow-md">
                    USD ${eq.rentalPricePerDayEst}/día
                  </div>
                )}

                {/* Model Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-black text-xl tracking-tight">
                    {eq.model}
                  </h3>
                  <p className="text-slate-200 text-xs font-semibold line-clamp-1">
                    {eq.name}
                  </p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                  {eq.shortDescription}
                </p>

                {/* Key Technical Specs List */}
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5 font-mono-tech text-[11px]">
                  {eq.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500 font-medium">{spec.label}:</span>
                      <span className="font-bold text-[#00873D]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  
                  <div className="grid grid-cols-2 gap-2">
                    {eq.availableForRent && (
                      <button
                        onClick={() => onAddToCart(eq, 'rental')}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white text-xs font-bold transition-all shadow"
                      >
                        <Plus className="w-3.5 h-3.5 text-white" />
                        <span>Cotizar Alquiler</span>
                      </button>
                    )}

                    {eq.availableForSale && (
                      <button
                        onClick={() => onAddToCart(eq, 'purchase')}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-all"
                      >
                        <span>Cotizar Venta</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveModalEquipment(eq);
                      incrementEquipmentStat(eq.id, 'consultas');
                    }}
                    className="w-full flex items-center justify-center gap-1 py-1.5 text-slate-500 hover:text-[#00873D] text-[11px] font-semibold transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Ver especificaciones detalladas & ficha técnica</span>
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Equipment Detail Modal */}
        {activeModalEquipment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono-tech font-bold text-[#00873D] px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {activeModalEquipment.brand}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {activeModalEquipment.model} - {activeModalEquipment.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalEquipment(null)}
                  className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                {activeModalEquipment.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono-tech uppercase font-bold text-slate-500">
                  Especificaciones Técnicas Principales
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activeModalEquipment.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 font-mono-tech text-xs">
                      <p className="text-slate-500">{spec.label}</p>
                      <p className="text-[#00873D] font-bold mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalEquipment(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    onAddToCart(activeModalEquipment, 'rental');
                    setActiveModalEquipment(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow"
                >
                  Añadir a Cotización de Alquiler
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
