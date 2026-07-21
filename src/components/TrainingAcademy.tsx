import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  X,
  Building,
  User,
  Mail,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Course } from '../types';
import { MOCK_COURSES } from '../data/mockData';
import { sendRegistrationEmail } from '../lib/emailService';

export const TrainingAcademy: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const [submittedRegistration, setSubmittedRegistration] = useState<{
    course: Course;
    attendeeName: string;
    companyName: string;
    email: string;
    phone: string;
  } | null>(null);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    setIsSending(true);

    const payload = {
      toEmail: email,
      attendeeName: attendeeName || 'Ing. Profesional',
      companyName: companyName || 'Empresa Eléctrica',
      phone,
      courseTitle: selectedCourse.title
    };

    // Dispatch email trigger
    await sendRegistrationEmail(payload);

    setSubmittedRegistration({
      course: selectedCourse,
      attendeeName: payload.attendeeName,
      companyName: payload.companyName,
      email: payload.toEmail,
      phone
    });

    setIsSending(false);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSelectedCourse(null);
  };

  return (
    <section id="capacitaciones" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-[#00873D] text-xs font-mono-tech uppercase font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-[#00873D]" /> IDUR Technical Academy
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Capacitaciones Especializadas <span className="text-[#00873D]">& Certificación</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
              Cursos teóricos y prácticos sobre operabilidad de equipos OMICRON, b2 y Janitza. Complete el formulario para recibir la notificación de inscripción y ficha de pago en su correo.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00873D] bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold">
            <Award className="w-4 h-4 text-[#00873D]" />
            <span>Certificado Oficial IDUR S.A. al finalizar</span>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all"
            >
              <div className="space-y-4">
                
                {/* Brand Focus Badge & Seats counter */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#00873D] border border-emerald-200 text-xs font-mono-tech font-bold">
                    {course.brandFocus} Focus
                  </span>
                  <span className="text-xs font-mono-tech text-emerald-800 flex items-center gap-1 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Users className="w-3.5 h-3.5 text-[#00873D]" /> {course.availableSeats} Cupos Libres
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {course.description}
                </p>

                {/* Details List */}
                <div className="space-y-2 text-xs font-mono-tech text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00873D]" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00873D]" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00873D]" />
                    <span>{course.location}</span>
                  </div>
                </div>

                {/* Topics Bullet List */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-mono-tech uppercase font-bold text-slate-500">Programa del Curso:</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {course.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00873D] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-mono-tech">Inversión por participante</p>
                  <p className="text-lg font-extrabold font-mono-tech text-slate-900">USD ${course.price}</p>
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Inscribirse</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal: Registration Form */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-2xl">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono-tech text-[#00873D] font-bold">Solicitud de Inscripción</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedCourse.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1">Nombre Completo del Asistente</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ej: Ing. Martín González"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs font-semibold mb-1">Empresa / Organización</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ej: Transener / Edenor / Central Puerto"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1">Email Profesional</label>
                      <input
                        type="email"
                        required
                        placeholder="correo@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-semibold mb-1">Teléfono Móvil</label>
                      <input
                        type="tel"
                        required
                        placeholder="+54 11 1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#00873D] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{isSending ? 'Enviando Correo...' : 'Enviar Registro por Email'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Modal: Confirmation Email Notice */}
        {submittedRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-[#00873D] p-6 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-[#00873D] font-bold text-sm">
                  <Send className="w-4 h-4 text-[#00873D]" />
                  <span>Notificación de Inscripción Enviada</span>
                </div>
                <button
                  onClick={() => setSubmittedRegistration(null)}
                  className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Confirmation Notice Body */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00873D] text-white flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">¡Email Enviado con Éxito!</h4>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end">
                <button
                  onClick={() => setSubmittedRegistration(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#00873D] hover:bg-[#007032] text-white font-bold text-xs shadow-md"
                >
                  Entendido
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
