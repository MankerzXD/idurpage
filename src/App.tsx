import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandBar } from './components/BrandBar';
import { Catalog } from './components/Catalog';
import { TrainingAcademy } from './components/TrainingAcademy';
import { LabServices } from './components/LabServices';
import { AboutUsPage } from './components/AboutUsPage';
import { WhatsAppBotWidget } from './components/WhatsAppBotWidget';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import type { Equipment, Course } from './types';
import type { AdminUser } from './types/admin';
import { MOCK_EQUIPMENT, MOCK_COURSES } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';
import { incrementEquipmentStat } from './lib/statsService';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin State (accessible silently via /admin or #admin URL)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // Dynamic Equipment & Course List with LocalStorage Persistence
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('idur_equipment');
    return saved ? JSON.parse(saved) : MOCK_EQUIPMENT;
  });

  const [coursesList, setCoursesList] = useState<Course[]>(() => {
    const saved = localStorage.getItem('idur_courses');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('idur_admins');
    return saved ? JSON.parse(saved) : [
      {
        id: 'admin-1',
        email: 'sanchezmanuel397@gmail.com',
        name: 'Manuel Sánchez (Admin Principal)',
        role: 'SuperAdmin',
        createdAt: '21/07/2026'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('idur_equipment', JSON.stringify(equipmentList));
  }, [equipmentList]);

  useEffect(() => {
    localStorage.setItem('idur_courses', JSON.stringify(coursesList));
  }, [coursesList]);

  useEffect(() => {
    localStorage.setItem('idur_admins', JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Check URL path or hash for /admin or #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        if (!isAdminLoggedIn) {
          setIsAdminLoginOpen(true);
        } else {
          setCurrentPage('admin');
        }
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, [isAdminLoggedIn]);

  const handleAdminLoginSuccess = (email: string) => {
    setCurrentUserEmail(email);
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
    setToastMessage(`Sesión iniciada como Administrador: ${email}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
    setCurrentUserEmail('');
    window.location.hash = '';
    setToastMessage('Sesión de administración cerrada correctamente.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add/Delete Equipment Handlers
  const handleAddEquipment = (newEq: Equipment) => {
    setEquipmentList(prev => [newEq, ...prev]);
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipmentList(prev => prev.filter(eq => eq.id !== id));
  };

  // Add/Delete Course Handlers
  const handleAddCourse = (newCourse: Course) => {
    setCoursesList(prev => [newCourse, ...prev]);
  };

  const handleDeleteCourse = (id: string) => {
    setCoursesList(prev => prev.filter(c => c.id !== id));
  };

  // Add/Delete Admin User Handlers
  const handleAddAdminUser = (newAdmin: AdminUser) => {
    setAdminUsers(prev => [...prev, newAdmin]);
  };

  const handleDeleteAdminUser = (id: string) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleDummyAddToCart = (equipment: Equipment, type: 'rental' | 'purchase' = 'rental') => {
    incrementEquipmentStat(equipment.id, 'cotizaciones');
    if (type === 'purchase') {
      incrementEquipmentStat(equipment.id, 'ventas');
    } else {
      // Increment sales 25% of the time for demo/interaction purposes
      if (Math.random() > 0.75) {
        incrementEquipmentStat(equipment.id, 'ventas');
      }
    }
    setToastMessage(`Consulta registrada para el equipo ${equipment.model}. Contactando...`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Render Admin Dashboard Page if active
  if (currentPage === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        currentUserEmail={currentUserEmail}
        onLogout={handleAdminLogout}
        equipmentList={equipmentList}
        onAddEquipment={handleAddEquipment}
        onDeleteEquipment={handleDeleteEquipment}
        coursesList={coursesList}
        onAddCourse={handleAddCourse}
        onDeleteCourse={handleDeleteCourse}
        adminUsers={adminUsers}
        onAddAdminUser={handleAddAdminUser}
        onDeleteAdminUser={handleDeleteAdminUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#00873D] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4.5 py-3 rounded-xl bg-[#00873D] text-white font-bold text-xs shadow-2xl border border-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-white fill-current" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header & Navbar with Independent Page Routing */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Independent Page View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              onExploreCatalog={() => { setCurrentPage('catalogo'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
              onExploreCourses={() => { setCurrentPage('capacitaciones'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            />
            <BrandBar />
            <Catalog onAddToCart={handleDummyAddToCart} />
          </>
        )}

        {currentPage === 'catalogo' && (
          <Catalog onAddToCart={handleDummyAddToCart} />
        )}

        {currentPage === 'capacitaciones' && (
          <TrainingAcademy />
        )}

        {currentPage === 'laboratorio' && (
          <LabServices />
        )}

        {currentPage === 'nosotros' && (
          <AboutUsPage />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Admin Login Modal (Triggered silently if user enters /admin URL) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Floating 24/7 WhatsApp Engineering Assistant */}
      <WhatsAppBotWidget />

    </div>
  );
}

export default App;
