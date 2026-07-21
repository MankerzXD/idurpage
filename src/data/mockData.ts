import type { Equipment, Course, CalibrationCert } from '../types';

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'cpc-100',
    name: 'Sistema Multifuncional de Ensayos Primarios',
    brand: 'OMICRON',
    model: 'CPC 100',
    shortDescription: 'El sistema universal de ensayos primarios para transformadores, TC/TT, interruptores y sistemas de puesta a tierra.',
    description: 'Reemplaza hasta 15 dispositivos de ensayo individuales. Permite realizar pruebas eléctricas en transformadores de potencia, transformadores de medida, interruptores de potencia y sistemas de puesta a tierra.',
    category: 'transformadores',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 450,
    specs: [
      { label: 'Corriente Máxima', value: '2000 A AC (800 A AC continuo)' },
      { label: 'Tensión Máxima', value: '12 kV AC' },
      { label: 'Rango de Frecuencia', value: '15 Hz - 400 Hz' },
      { label: 'Peso', value: '29 kg (Ultra portátil)' }
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'hva28',
    name: 'Equipo de Ensayo VLF en Cables',
    brand: 'b2 electronics',
    model: 'HVA28',
    shortDescription: 'Generador VLF (Very Low Frequency) ultra-compacto para ensayos de rigidez dieléctrica en cables de Media Tensión.',
    description: 'Sistema ultra liviano para ensayos en cables de MT según normas IEEE 400.2 e IEC 60502-2. Incluye ensayo de cubierta y localización de fallas.',
    category: 'cables',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 320,
    specs: [
      { label: 'Tensión de Salida', value: '29 kV pico / 20 kV RMS' },
      { label: 'Frecuencia VLF', value: '0.01 Hz a 0.1 Hz' },
      { label: 'Capacidad de Carga', value: '0.5 µF @ 0.1 Hz @ 20 kV' },
      { label: 'Peso', value: '14 kg' }
    ],
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'umg512',
    name: 'Analizador de Calidad de Energía Clase A',
    brand: 'Janitza',
    model: 'UMG 512-PRO',
    shortDescription: 'Analizador de redes y calidad de suministro eléctrico según IEC 61000-4-30 Clase A.',
    description: 'Monitoreo continuo de transitorios, armónicos hasta el orden 63, flicker, huecos de tensión y eventos en la red eléctrica en tiempo real con servidor web integrado.',
    category: 'calidad-energia',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 180,
    specs: [
      { label: 'Certificación', value: 'IEC 61000-4-30 Clase A' },
      { label: 'Muestreo', value: '25.6 kHz por canal' },
      { label: 'Memoria', value: '4 GB Flash interna' },
      { label: 'Interfaces', value: 'Ethernet, Modbus TCP/RTU, Profibus' }
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'cibano-500',
    name: 'Sistema de Ensayo de Interruptores de Potencia',
    brand: 'OMICRON',
    model: 'CIBANO 500',
    shortDescription: 'Sistema de prueba 3 en 1 para interruptores de media y alta tensión.',
    description: 'Combina microohmetro, cronómetro de tiempos de operación y análisis de movimiento/corriente de bobina en un único equipo portátil operado por software Primary Test Manager.',
    category: 'interruptores',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 390,
    specs: [
      { label: 'Corriente de Microohmetro', value: 'Hasta 200 A DC' },
      { label: 'Canales de Tiempo', value: '12 canales de contacto principal' },
      { label: 'Análisis de Bobinas', value: 'Corrientes de Apertura/Cierre' },
      { label: 'Pruebas de Subtensión', value: 'Fuente DC integrada regulada' }
    ],
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mpd-800',
    name: 'Sistema de Medición de Descargas Parciales',
    brand: 'OMICRON',
    model: 'MPD 800',
    shortDescription: 'Detección y análisis multicanal de Descargas Parciales (DP) en laboratorio y campo.',
    description: 'Referencia mundial para medición de DP según IEC 60270 en transformadores, generadores, motores, GIS y cables de alta tensión.',
    category: 'transformadores',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 580,
    specs: [
      { label: 'Filtrado Digital', value: 'Filtrado multicanal sincrónico' },
      { label: 'Análisis PRPD', value: 'Patrones 3D en tiempo real' },
      { label: 'Ancho de Banda', value: 'Hasta 32 MHz' },
      { label: 'Aislamiento', value: 'Conexión por fibra óptica' }
    ],
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'td60',
    name: 'Sistema de Medición de Tan Delta',
    brand: 'b2 electronics',
    model: 'TD60-2',
    shortDescription: 'Módulo de diagnóstico de Tangente de Delta sin cables para diagnóstico de cables de MT.',
    description: 'Diagnóstico preciso del envejecimiento por arborescencias de agua en aislamiento de XLPE/EPR. Comunicación Bluetooth con equipo HVA.',
    category: 'cables',
    availableForRent: true,
    availableForSale: true,
    rentalPricePerDayEst: 250,
    specs: [
      { label: 'Tensión de Medición', value: 'Hasta 62 kV pico / 44 kV RMS' },
      { label: 'Precisión Tan Delta', value: '1 x 10^-4' },
      { label: 'Comunicación', value: 'Bluetooth 4.0 inalámbrico' },
      { label: 'Peso', value: '5 kg' }
    ],
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-cpc100',
    title: 'Ensayos Avanzados en Transformadores de Potencia con OMICRON CPC 100',
    brandFocus: 'OMICRON',
    equipmentUsed: ['CPC 100', 'CP TD1', 'Primary Test Manager'],
    instructor: 'Ing. Carlos Mendoza (Certificado OMICRON Academy)',
    date: '15 de Agosto, 2026',
    duration: '2 Días (16hs Cátedra - Teórico/Práctico)',
    location: 'Laboratorio IDUR S.A., Buenos Aires',
    modality: 'Presencial (Lab IDUR)',
    price: 350,
    totalSeats: 12,
    availableSeats: 4,
    description: 'Capacitación intensiva teórico-práctica sobre medición de relación de transformación, resistencia de devanados, impedancia de cortocircuito y tangente de delta.',
    topics: [
      'Teoría de aislamiento y circuitos equivalentes de transformadores',
      'Configuración y operación del software PTM',
      'Medición de Resistencia de Devanados y Desmagnetización',
      'Ensayos de Factor de Potencia / Tangente de Delta (CP TD1)',
      'Interpretación de resultados según normas IEEE C57.12.90 e IEC 60076'
    ]
  },
  {
    id: 'course-vlf',
    title: 'Diagnóstico y Ensayos VLF/Tan Delta en Cables de Media Tensión',
    brandFocus: 'b2 electronics',
    equipmentUsed: ['HVA28', 'TD60', 'b2 Control Center'],
    instructor: 'Ing. Roberto Silva (Especialista en Aislamiento)',
    date: '28 de Agosto, 2026',
    duration: '1 Día (8hs Cátedra)',
    location: 'Campus Virtual IDUR / Práctica en Lab',
    modality: 'Presencial (Lab IDUR)',
    price: 220,
    totalSeats: 15,
    availableSeats: 7,
    description: 'Aprenda los protocolos de ensayo no destructivo en cables de MT mediante tecnología VLF y medición de Tangente de Delta.',
    topics: [
      'Fundamentos del envejecimiento en cables subterráneos (Water Trees)',
      'Diferencias entre ensayos DC, AC 50Hz y VLF 0.1Hz',
      'Normativa IEEE 400.2-2013 e IEC 60502-2',
      'Criterios de evaluación de Tan Delta y Monitoreo de estabilidad (MDEV)',
      'Taller práctico con el equipo b2 HVA28'
    ]
  },
  {
    id: 'course-janitza',
    title: 'Monitoreo de Calidad de Energía y Análisis de Armónicos IEC 61000-4-30',
    brandFocus: 'Janitza',
    equipmentUsed: ['Janitza UMG 512-PRO', 'GridVis Software'],
    instructor: 'Ing. Mariana Rossi (Especialista Calidad de Red)',
    date: '10 de Septiembre, 2026',
    duration: '1 Día (8hs Cátedra)',
    location: 'Plataforma Online IDUR Live',
    modality: 'Online Vivo',
    price: 180,
    totalSeats: 20,
    availableSeats: 11,
    description: 'Diagnóstico de disturbios eléctricos, transitorios, armónicos y eventos de tensión en sistemas industriales.',
    topics: [
      'Estándares IEC 61000-4-30 Clase A e IEEE 519',
      'Filtrado y compensación de armónicos',
      'Configuración de alertas y reportes automáticos en GridVis',
      'Casos de estudio de fallas en variadores de frecuencia'
    ]
  }
];

export const MOCK_CERTIFICATES: CalibrationCert[] = [
  {
    id: 'CERT-2026-8841',
    equipmentModel: 'OMICRON CPC 100 (S/N: QG521L)',
    serialNumber: 'QG521L',
    issueDate: '12/01/2026',
    expiryDate: '12/01/2027',
    downloadUrl: '#',
    status: 'Vigente'
  },
  {
    id: 'CERT-2025-4412',
    equipmentModel: 'b2 electronics HVA28 (S/N: HVA-9942)',
    serialNumber: 'HVA-9942',
    issueDate: '05/09/2025',
    expiryDate: '05/09/2026',
    downloadUrl: '#',
    status: 'Vigente'
  },
  {
    id: 'CERT-2025-1102',
    equipmentModel: 'Janitza UMG 604 (S/N: JNZ-3321)',
    serialNumber: 'JNZ-3321',
    issueDate: '14/03/2025',
    expiryDate: '14/03/2026',
    downloadUrl: '#',
    status: 'Próximo a Vencer'
  }
];
