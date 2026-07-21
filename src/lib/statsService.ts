export interface EquipmentStats {
  [eqId: string]: {
    consultas: number;
    cotizaciones: number;
    ventas: number;
  };
}

export interface CourseStats {
  [courseId: string]: {
    consultas: number;
    inscriptos: number;
  };
}

export interface Participant {
  id: string;
  courseId: string;
  courseTitle: string;
  attendeeName: string;
  companyName: string;
  email: string;
  phone: string;
  date: string;
}

// Initial mock stats for equipment
const DEFAULT_EQ_STATS: EquipmentStats = {
  'cpc-100': { consultas: 48, cotizaciones: 29, ventas: 5 },
  'hva28': { consultas: 36, cotizaciones: 21, ventas: 3 },
  'umg512': { consultas: 42, cotizaciones: 25, ventas: 6 },
  'cibano-500': { consultas: 29, cotizaciones: 14, ventas: 2 },
  'mpd-800': { consultas: 31, cotizaciones: 11, ventas: 1 },
  'td60': { consultas: 22, cotizaciones: 13, ventas: 2 }
};

// Initial mock stats for courses
const DEFAULT_COURSE_STATS: CourseStats = {
  'course-cpc100': { consultas: 64, inscriptos: 11 },
  'course-vlf': { consultas: 51, inscriptos: 8 },
  'course-janitza': { consultas: 39, inscriptos: 4 }
};

// Initial mock participants list
const DEFAULT_PARTICIPANTS: Participant[] = [
  {
    id: 'reg-1',
    courseId: 'course-cpc100',
    courseTitle: 'Ensayos Avanzados en Transformadores de Potencia con OMICRON CPC 100',
    attendeeName: 'Ing. Martín Rossi',
    companyName: 'Edenor S.A.',
    email: 'mrossi@edenor.com.ar',
    phone: '+54 11 5829-1029',
    date: '18/07/2026'
  },
  {
    id: 'reg-2',
    courseId: 'course-cpc100',
    courseTitle: 'Ensayos Avanzados en Transformadores de Potencia con OMICRON CPC 100',
    attendeeName: 'Téc. Sofía Gómez',
    companyName: 'Transener S.A.',
    email: 'sgomez@transener.com.ar',
    phone: '+54 11 4920-5819',
    date: '19/07/2026'
  },
  {
    id: 'reg-3',
    courseId: 'course-vlf',
    courseTitle: 'Diagnóstico y Ensayos VLF/Tan Delta en Cables de Media Tensión',
    attendeeName: 'Ing. Lucas Pereyra',
    companyName: 'Edesur S.A.',
    email: 'lpereyra@edesur.com.ar',
    phone: '+54 11 3910-4820',
    date: '20/07/2026'
  },
  {
    id: 'reg-4',
    courseId: 'course-vlf',
    courseTitle: 'Diagnóstico y Ensayos VLF/Tan Delta en Cables de Media Tensión',
    attendeeName: 'Ing. Manuel J. Sánchez',
    companyName: 'MankerzStudio',
    email: 'mjsanchez@ucema.edu.ar',
    phone: '+54 11 4737-0530',
    date: '21/07/2026'
  },
  {
    id: 'reg-5',
    courseId: 'course-janitza',
    courseTitle: 'Monitoreo de Calidad de Energía y Análisis de Armónicos IEC 61000-4-30',
    attendeeName: 'Téc. Alejandro Castro',
    companyName: 'Techint Ingeniería',
    email: 'acastro@techint.com.ar',
    phone: '+54 11 6029-5819',
    date: '15/07/2026'
  }
];

export function loadEquipmentStats(): EquipmentStats {
  const saved = localStorage.getItem('idur_equipment_stats');
  if (!saved) {
    localStorage.setItem('idur_equipment_stats', JSON.stringify(DEFAULT_EQ_STATS));
    return DEFAULT_EQ_STATS;
  }
  return JSON.parse(saved);
}

export function loadCourseStats(): CourseStats {
  const saved = localStorage.getItem('idur_course_stats');
  if (!saved) {
    localStorage.setItem('idur_course_stats', JSON.stringify(DEFAULT_COURSE_STATS));
    return DEFAULT_COURSE_STATS;
  }
  return JSON.parse(saved);
}

export function loadParticipants(): Participant[] {
  const saved = localStorage.getItem('idur_participants');
  if (!saved) {
    localStorage.setItem('idur_participants', JSON.stringify(DEFAULT_PARTICIPANTS));
    return DEFAULT_PARTICIPANTS;
  }
  return JSON.parse(saved);
}

export function incrementEquipmentStat(eqId: string, type: 'consultas' | 'cotizaciones' | 'ventas') {
  const stats = loadEquipmentStats();
  if (!stats[eqId]) {
    stats[eqId] = { consultas: 0, cotizaciones: 0, ventas: 0 };
  }
  stats[eqId][type] = (stats[eqId][type] || 0) + 1;
  localStorage.setItem('idur_equipment_stats', JSON.stringify(stats));
}

export function incrementCourseStat(courseId: string, type: 'consultas' | 'inscriptos') {
  const stats = loadCourseStats();
  if (!stats[courseId]) {
    stats[courseId] = { consultas: 0, inscriptos: 0 };
  }
  stats[courseId][type] = (stats[courseId][type] || 0) + 1;
  localStorage.setItem('idur_course_stats', JSON.stringify(stats));
}

export function addParticipant(courseId: string, courseTitle: string, attendeeName: string, companyName: string, email: string, phone: string) {
  const participants = loadParticipants();
  participants.unshift({
    id: `reg-${Date.now()}`,
    courseId,
    courseTitle,
    attendeeName,
    companyName,
    email,
    phone,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('idur_participants', JSON.stringify(participants));
  incrementCourseStat(courseId, 'inscriptos');
}
