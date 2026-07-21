import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  GraduationCap, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut, 
  X,
  Server,
  Mail,
  Phone,
  FileText,
  Search,
  Eye,
  TrendingUp
} from 'lucide-react';
import type { Equipment, Course } from '../types';
import type { AdminUser } from '../types/admin';
import { IdurLogo } from './IdurLogo';
import { loadEquipmentStats, loadCourseStats, loadParticipants } from '../lib/statsService';

interface AdminDashboardProps {
  currentUserEmail: string;
  onLogout: () => void;
  equipmentList: Equipment[];
  onAddEquipment: (newEq: Equipment) => void;
  onDeleteEquipment: (id: string) => void;
  coursesList: Course[];
  onAddCourse: (newCourse: Course) => void;
  onDeleteCourse: (id: string) => void;
  adminUsers: AdminUser[];
  onAddAdminUser: (newAdmin: AdminUser) => void;
  onDeleteAdminUser: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUserEmail,
  onLogout,
  equipmentList,
  onAddEquipment,
  onDeleteEquipment,
  coursesList,
  onAddCourse,
  onDeleteCourse,
  adminUsers,
  onAddAdminUser,
  onDeleteAdminUser
}) => {
  const [activeTab, setActiveTab] = useState<'equipos' | 'cursos' | 'usuarios' | 'db'>('equipos');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Stats & Registration States
  const [eqStats, setEqStats] = useState(() => loadEquipmentStats());
  const [cStats, setCStats] = useState(() => loadCourseStats());
  const [participantsList, setParticipantsList] = useState(() => loadParticipants());
  const [participantSearch, setParticipantSearch] = useState('');

  // Re-load stats when tab changes to keep dashboard updated
  React.useEffect(() => {
    setEqStats(loadEquipmentStats());
    setCStats(loadCourseStats());
    setParticipantsList(loadParticipants());
  }, [activeTab]);

  // Compute equipment metrics highlights
  const metrics = useMemo(() => {
    let maxInq = -1, maxQuote = -1, maxSales = -1;
    let maxInqId = '', maxQuoteId = '', maxSalesId = '';

    Object.keys(eqStats).forEach(id => {
      const s = eqStats[id];
      if (s.consultas > maxInq) {
        maxInq = s.consultas;
        maxInqId = id;
      }
      if (s.cotizaciones > maxQuote) {
        maxQuote = s.cotizaciones;
        maxQuoteId = id;
      }
      if (s.ventas > maxSales) {
        maxSales = s.ventas;
        maxSalesId = id;
      }
    });

    return {
      mostInquired: equipmentList.find(e => e.id === maxInqId),
      mostInquiredVal: maxInq > 0 ? maxInq : 0,
      mostQuoted: equipmentList.find(e => e.id === maxQuoteId),
      mostQuotedVal: maxQuote > 0 ? maxQuote : 0,
      mostSold: equipmentList.find(e => e.id === maxSalesId),
      mostSoldVal: maxSales > 0 ? maxSales : 0,
    };
  }, [eqStats, equipmentList]);

  // Filter participants list
  const filteredParticipants = useMemo(() => {
    return participantsList.filter(p => {
      const q = participantSearch.toLowerCase().trim();
      if (!q) return true;
      return (
        p.attendeeName.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.courseTitle.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q)
      );
    });
  }, [participantsList, participantSearch]);

  // New Equipment Form State
  const [showAddEqModal, setShowAddEqModal] = useState(false);
  const [eqModel, setEqModel] = useState('');
  const [eqName, setEqName] = useState('');
  const [eqBrand, setEqBrand] = useState('OMICRON');
  const [eqCategory, setEqCategory] = useState<'transformadores' | 'interruptores' | 'cables' | 'calidad-energia'>('transformadores');
  const [eqDesc, setEqDesc] = useState('');
  const [eqPrice, setEqPrice] = useState(350);
  const [eqRent, setEqRent] = useState(true);
  const [eqSale, setEqSale] = useState(true);

  // New Course Form State
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [cTitle, setCTitle] = useState('');
  const [cBrand, setCBrand] = useState('OMICRON');
  const [cDate, setCDate] = useState('');
  const [cDuration] = useState('1 Día (8hs Cátedra)');
  const [cLocation] = useState('Laboratorio IDUR S.A., Buenos Aires');
  const [cPrice, setCPrice] = useState(250);
  const [cSeats, setCSeats] = useState(15);
  const [cDesc, setCDesc] = useState('');

  // New Admin User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'SuperAdmin' | 'Editor' | 'Soporte'>('Editor');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    const newEq: Equipment = {
      id: `eq-${Date.now()}`,
      model: eqModel,
      name: eqName,
      brand: eqBrand,
      category: eqCategory,
      shortDescription: eqDesc,
      description: eqDesc,
      availableForRent: eqRent,
      availableForSale: eqSale,
      rentalPricePerDayEst: eqPrice,
      specs: [
        { label: 'Estado', value: 'Calibración Vigente ISO 17025' },
        { label: 'Disponibilidad', value: 'Entrega Inmediata' }
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    };

    onAddEquipment(newEq);
    setShowAddEqModal(false);
    triggerToast(`Equipo "${eqModel}" agregado exitosamente al catálogo.`);
    setEqModel('');
    setEqName('');
    setEqDesc('');
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: cTitle,
      brandFocus: cBrand,
      equipmentUsed: [cBrand],
      instructor: 'Instructor Especialista IDUR S.A.',
      date: cDate || 'Próximamente 2026',
      duration: cDuration,
      location: cLocation,
      modality: 'Presencial (Lab IDUR)',
      price: cPrice,
      totalSeats: cSeats,
      availableSeats: cSeats,
      description: cDesc,
      topics: [
        'Introducción teórica y normativa internacional',
        'Criterios de diagnóstico en campo',
        'Taller práctico con instrumental calibrado'
      ]
    };

    onAddCourse(newCourse);
    setShowAddCourseModal(false);
    triggerToast(`Capacitación "${cTitle}" publicada correctamente.`);
    setCTitle('');
    setCDesc('');
  };

  const handleCreateAdminUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;

    const newAdmin: AdminUser = {
      id: `usr-${Date.now()}`,
      email: newAdminEmail.trim(),
      name: newAdminName.trim() || 'Administrador IDUR',
      role: newAdminRole,
      createdAt: new Date().toLocaleDateString()
    };

    onAddAdminUser(newAdmin);
    setShowAddUserModal(false);
    triggerToast(`Permisos de administrador concedidos a ${newAdminEmail}.`);
    setNewAdminEmail('');
    setNewAdminName('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-[#00873D] selection:text-white flex flex-col">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00873D] text-white font-bold text-xs shadow-2xl border border-emerald-400">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-xl shadow-md">
              <IdurLogo />
            </div>
            <div className="hidden sm:block border-l border-slate-800 pl-4">
              <span className="text-xs font-mono-tech uppercase font-bold text-emerald-400 tracking-wider">
                PANEL DE ADMINISTRACIÓN
              </span>
              <p className="text-[11px] text-slate-400">IDUR S.A. Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-slate-200 font-bold leading-tight">{currentUserEmail}</p>
                <span className="text-[9px] text-emerald-400 font-mono-tech font-bold uppercase">SuperAdmin</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-slate-400 text-xs font-mono-tech uppercase">Equipos Registrados</p>
            <p className="text-2xl font-black text-white">{equipmentList.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-slate-400 text-xs font-mono-tech uppercase">Cursos Publicados</p>
            <p className="text-2xl font-black text-emerald-400">{coursesList.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-slate-400 text-xs font-mono-tech uppercase">Administradores</p>
            <p className="text-2xl font-black text-cyan-400">{adminUsers.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-slate-400 text-xs font-mono-tech uppercase">Base de Datos recomendada</p>
            <p className="text-xs font-bold text-emerald-400 font-mono-tech">PostgreSQL (Supabase)</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('equipos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'equipos'
                ? 'bg-[#00873D] text-white shadow-lg shadow-emerald-700/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Gestión de Equipos ({equipmentList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cursos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cursos'
                ? 'bg-[#00873D] text-white shadow-lg shadow-emerald-700/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Capacitaciones & Cursos ({coursesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('usuarios')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'usuarios'
                ? 'bg-[#00873D] text-white shadow-lg shadow-emerald-700/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Usuarios Admin ({adminUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'db'
                ? 'bg-[#00873D] text-white shadow-lg shadow-emerald-700/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Recomendación de Base de Datos</span>
          </button>
        </div>

        {/* TAB 1: GESTIÓN DE EQUIPOS */}
        {activeTab === 'equipos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Catálogo de Equipos de Ensayos</h3>
                <p className="text-xs text-slate-400">Agregue o edite instrumentos disponibles para Venta y Alquiler.</p>
              </div>
              <button
                onClick={() => setShowAddEqModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Agregar Nuevo Equipo</span>
              </button>
            </div>

            {/* Metrics Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono-tech uppercase font-bold">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Equipo Más Consultado</span>
                </div>
                <h4 className="text-lg font-black text-white">{metrics.mostInquired?.model || 'Ninguno'}</h4>
                <p className="text-[11px] text-slate-400 font-mono-tech">{metrics.mostInquiredVal} visitas a especificaciones</p>
              </div>
              <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-tech uppercase font-bold">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Equipo Más Cotizado</span>
                </div>
                <h4 className="text-lg font-black text-emerald-400">{metrics.mostQuoted?.model || 'Ninguno'}</h4>
                <p className="text-[11px] text-slate-400 font-mono-tech">{metrics.mostQuotedVal} solicitudes de cotización</p>
              </div>
              <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech uppercase font-bold">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Mayor Conversión Venta</span>
                </div>
                <h4 className="text-lg font-black text-cyan-400">{metrics.mostSold?.model || 'Ninguno'}</h4>
                <p className="text-[11px] text-slate-400 font-mono-tech">{metrics.mostSoldVal} cierres comerciales</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentList.map((eq) => (
                <div key={eq.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {eq.brand}
                      </span>
                      <span className="text-xs font-mono-tech text-emerald-400 font-bold">
                        USD ${eq.rentalPricePerDayEst}/día
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{eq.model}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{eq.name}</p>
                    </div>

                    {/* Stats Breakdown inside Card */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 text-[9px] font-mono-tech text-slate-400 border-t border-slate-900">
                      <div className="p-1 rounded-lg bg-slate-900 border border-slate-800/80 text-center">
                        <p className="text-slate-500 font-bold">Consultas</p>
                        <p className="text-xs font-extrabold text-slate-200 mt-0.5">{eqStats[eq.id]?.consultas || 0}</p>
                      </div>
                      <div className="p-1 rounded-lg bg-slate-900 border border-slate-800/80 text-center">
                        <p className="text-slate-500 font-bold">Cotizaciones</p>
                        <p className="text-xs font-extrabold text-emerald-400 mt-0.5">{eqStats[eq.id]?.cotizaciones || 0}</p>
                      </div>
                      <div className="p-1 rounded-lg bg-slate-900 border border-slate-800/80 text-center">
                        <p className="text-slate-500 font-bold">Ventas</p>
                        <p className="text-xs font-extrabold text-cyan-400 mt-0.5">{eqStats[eq.id]?.ventas || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex gap-1.5 text-[10px] font-mono-tech">
                      {eq.availableForRent && <span className="bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">Alquiler</span>}
                      {eq.availableForSale && <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">Venta</span>}
                    </div>

                    <button
                      onClick={() => onDeleteEquipment(eq.id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 text-xs cursor-pointer"
                      title="Eliminar equipo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GESTIÓN DE CAPACITACIONES */}
        {activeTab === 'cursos' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Fechas de Próximas Capacitaciones</h3>
                <p className="text-xs text-slate-400">Publique nuevos cursos en el laboratorio o modifique cupos libres.</p>
              </div>
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Publicar Nueva Fecha</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coursesList.map((course) => (
                <div key={course.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {course.brandFocus} Focus
                      </span>
                      <span className="text-xs font-mono-tech text-white font-bold">
                        USD ${course.price}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white leading-snug">{course.title}</h4>
                      <p className="text-xs text-slate-400 font-mono-tech mt-1">📅 {course.date}</p>
                    </div>

                    {/* Course Stats Breakdown */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[9px] font-mono-tech text-slate-400 border-t border-slate-900">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-center">
                        <p className="text-slate-500 font-bold">Consultas</p>
                        <p className="text-xs font-extrabold text-slate-200 mt-0.5">{cStats[course.id]?.consultas || 0}</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-center">
                        <p className="text-slate-500 font-bold">Inscriptos</p>
                        <p className="text-xs font-extrabold text-emerald-400 mt-0.5">
                          {cStats[course.id]?.inscriptos || 0} / {course.totalSeats}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-emerald-400">{course.availableSeats} Cupos Libres</span>
                    <button
                      onClick={() => onDeleteCourse(course.id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800 text-xs cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Registered Participants Section */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white">Listado de Participantes Inscriptos</h3>
                  <p className="text-xs text-slate-400">Consulte y administre la nómina de estudiantes registrados a las capacitaciones.</p>
                </div>
                
                {/* Search box */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar participante, empresa, curso..."
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-[#00873D] transition-colors font-semibold"
                  />
                </div>
              </div>

              {filteredParticipants.length > 0 ? (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-900 text-slate-400 uppercase font-mono-tech border-b border-slate-800 text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3.5">Fecha</th>
                          <th className="p-3.5">Participante</th>
                          <th className="p-3.5">Empresa</th>
                          <th className="p-3.5">Contacto</th>
                          <th className="p-3.5">Capacitación</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-200 font-medium">
                        {filteredParticipants.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3.5 font-mono-tech text-slate-400 text-[11px] whitespace-nowrap">{p.date}</td>
                            <td className="p-3.5 font-bold text-white">{p.attendeeName}</td>
                            <td className="p-3.5 text-slate-300 font-bold">{p.companyName}</td>
                            <td className="p-3.5 space-y-1">
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Mail className="w-3.5 h-3.5 text-[#00873D]" />
                                <span>{p.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Phone className="w-3.5 h-3.5 text-[#00873D]" />
                                <span>{p.phone}</span>
                              </div>
                            </td>
                            <td className="p-3.5 max-w-xs text-slate-300 leading-relaxed font-semibold">{p.courseTitle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 font-medium text-xs">
                  No se encontraron participantes registrados que coincidan con la búsqueda.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: USUARIOS ADMINISTRADORES */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Alta & Gestión de Usuarios Administradores</h3>
                <p className="text-xs text-slate-400">Conceda acceso al panel a otros trabajadores autorizados de IDUR S.A.</p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md transition-all"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Agregar Administrador</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono-tech border-b border-slate-800">
                  <tr>
                    <th className="p-4">Usuario / Email</th>
                    <th className="p-4">Nombre</th>
                    <th className="p-4">Rol de Acceso</th>
                    <th className="p-4">Fecha de Alta</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {adminUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-900/50">
                      <td className="p-4 font-bold font-mono-tech text-emerald-400">{usr.email}</td>
                      <td className="p-4 font-semibold">{usr.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono-tech font-bold">
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono-tech">{usr.createdAt}</td>
                      <td className="p-4 text-right">
                        {usr.email !== 'sanchezmanuel397@gmail.com' && (
                          <button
                            onClick={() => onDeleteAdminUser(usr.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: RECOMENDACIÓN DE BASE DE DATOS */}
        {activeTab === 'db' && (
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono-tech font-bold uppercase">
                RECOMENDACIÓN TÉCNICA DE ARQUITECTURA
              </span>
              <h3 className="text-2xl font-black text-white">Base de Datos Ideal para IDUR S.A.</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Para producción, se recomienda implementar <strong className="text-emerald-400">Supabase (PostgreSQL)</strong>. Es la solución líder para aplicaciones corporativas modernas por las siguientes razones clave:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">1</div>
                <h4 className="text-white font-bold text-sm">PostgreSQL Relacional Gratis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ideal para vincular equipos con certificados de calibración ISO 17025 y registros de capacitaciones con pases QR.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">2</div>
                <h4 className="text-white font-bold text-sm">Autenticación & RLS Integrada</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Permite restringir el acceso a <code className="text-emerald-300 font-mono-tech">sanchezmanuel397@gmail.com</code> y administradores mediante contraseñas encriptadas en bcrypt.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h4 className="text-white font-bold text-sm">Almacenamiento de PDFs</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Incluye Supabase Storage para subir imágenes de equipos y archivos PDF de certificados de calibración oficiales.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: AGREGAR EQUIPO */}
      {showAddEqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">Agregar Nuevo Equipo al Catálogo</h4>
              <button onClick={() => setShowAddEqModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateEquipment} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Modelo de Equipo</label>
                  <input type="text" required placeholder="Ej: CPC 100" value={eqModel} onChange={(e) => setEqModel(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Marca Representada</label>
                  <select value={eqBrand} onChange={(e) => setEqBrand(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white">
                    <option value="OMICRON">OMICRON</option>
                    <option value="b2 electronics">b2 electronics</option>
                    <option value="Janitza">Janitza</option>
                    <option value="ARCTEQ">ARCTEQ</option>
                    <option value="SEG electronics">SEG electronics</option>
                    <option value="STÄUBLI">STÄUBLI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nombre Descriptivo</label>
                <input type="text" required placeholder="Ej: Sistema Multifuncional de Ensayos Primarios" value={eqName} onChange={(e) => setEqName(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Descripción Técnica</label>
                <textarea required rows={2} placeholder="Descripción de aplicaciones..." value={eqDesc} onChange={(e) => setEqDesc(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Tarifa Alquiler Diario (USD)</label>
                  <input type="number" required value={eqPrice} onChange={(e) => setEqPrice(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Categoría</label>
                  <select value={eqCategory} onChange={(e) => setEqCategory(e.target.value as any)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white">
                    <option value="transformadores">Transformadores</option>
                    <option value="interruptores">Interruptores</option>
                    <option value="cables">Cables MT/AT & VLF</option>
                    <option value="calidad-energia">Calidad de Energía</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input type="checkbox" checked={eqRent} onChange={(e) => setEqRent(e.target.checked)} />
                  <span>Disponible para Alquiler</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input type="checkbox" checked={eqSale} onChange={(e) => setEqSale(e.target.checked)} />
                  <span>Disponible para Venta</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddEqModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#00873D] text-white font-bold">Guardar Equipo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR CURSO */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">Publicar Nueva Fecha de Capacitación</h4>
              <button onClick={() => setShowAddCourseModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Título del Curso</label>
                <input type="text" required placeholder="Ej: Ensayos en Transformadores con OMICRON" value={cTitle} onChange={(e) => setCTitle(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Marca Enfoque</label>
                  <select value={cBrand} onChange={(e) => setCBrand(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white">
                    <option value="OMICRON">OMICRON</option>
                    <option value="b2 electronics">b2 electronics</option>
                    <option value="Janitza">Janitza</option>
                    <option value="ARCTEQ">ARCTEQ</option>
                    <option value="SEG electronics">SEG electronics</option>
                    <option value="STÄUBLI">STÄUBLI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Fecha Prevista</label>
                  <input type="text" required placeholder="Ej: 20 de Septiembre, 2026" value={cDate} onChange={(e) => setCDate(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Inversión (USD)</label>
                  <input type="number" required value={cPrice} onChange={(e) => setCPrice(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Total Cupos</label>
                  <input type="number" required value={cSeats} onChange={(e) => setCSeats(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Descripción Resumida</label>
                <textarea required rows={2} placeholder="Temario y objetivos..." value={cDesc} onChange={(e) => setCDesc(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddCourseModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#00873D] text-white font-bold">Publicar Fecha</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR ADMIN USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">Alta de Usuario Administrador</h4>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateAdminUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Email del Trabajador</label>
                <input type="email" required placeholder="ejemplo@idur.com.ar" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nombre Completo</label>
                <input type="text" required placeholder="Ej: Ing. Pedro Gómez" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Rol Asignado</label>
                <select value={newAdminRole} onChange={(e) => setNewAdminRole(e.target.value as any)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white">
                  <option value="Editor">Editor (Catálogo y Cursos)</option>
                  <option value="SuperAdmin">SuperAdmin (Acceso Total)</option>
                  <option value="Soporte">Soporte Técnico</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#00873D] text-white font-bold">Conceder Permisos</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
