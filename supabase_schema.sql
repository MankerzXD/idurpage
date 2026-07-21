-- =========================================================
-- ESQUEMA DE BASE DE DATOS SUPABASE / POSTGRESQL PARA IDUR S.A.
-- Copia y pega este script en: Supabase Dashboard -> SQL Editor -> Run
-- =========================================================

-- 1. Tabla de Equipos (Venta & Alquiler)
CREATE TABLE IF NOT EXISTS public.equipment (
    id TEXT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT,
    description TEXT,
    available_for_rent BOOLEAN DEFAULT true,
    available_for_sale BOOLEAN DEFAULT true,
    rental_price_per_day_est NUMERIC(10,2) DEFAULT 0,
    specs JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Capacitaciones & Cursos
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    brand_focus VARCHAR(100) NOT NULL,
    instructor VARCHAR(255),
    date VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    location VARCHAR(255),
    price NUMERIC(10,2) DEFAULT 0,
    total_seats INT DEFAULT 15,
    available_seats INT DEFAULT 15,
    description TEXT,
    topics JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Usuarios Administradores
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Editor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Solicitudes de Cotización B2B
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(255) NOT NULL,
    client_company VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(100),
    items JSONB NOT NULL,
    total_est NUMERIC(10,2),
    status VARCHAR(50) DEFAULT 'Pendiente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Inscripciones a Cursos con Pase QR
CREATE TABLE IF NOT EXISTS public.course_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_code VARCHAR(100) UNIQUE NOT NULL,
    course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
    attendee_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    qr_code_data TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar acceso de lectura pública a catálogos
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura Pública de Equipos" ON public.equipment FOR SELECT USING (true);
CREATE POLICY "Lectura Pública de Cursos" ON public.courses FOR SELECT USING (true);

-- Insertar Administrador Principal
INSERT INTO public.admin_users (id, email, name, role)
VALUES ('admin-1', 'sanchezmanuel397@gmail.com', 'Manuel Sánchez', 'SuperAdmin')
ON CONFLICT (email) DO NOTHING;

-- Seed Equipos Iniciales
INSERT INTO public.equipment (id, model, name, brand, category, short_description, description, available_for_rent, available_for_sale, rental_price_per_day_est, image)
VALUES 
('cpc-100', 'CPC 100', 'Sistema Multifuncional de Ensayos Primarios', 'OMICRON', 'transformadores', 'El sistema universal de ensayos primarios para transformadores, TC/TT, interruptores.', 'Reemplaza hasta 15 dispositivos de ensayo individuales.', true, true, 450, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'),
('hva28', 'HVA28', 'Equipo de Ensayo VLF en Cables', 'b2 electronics', 'cables', 'Generador VLF ultra-compacto para ensayos de rigidez dieléctrica.', 'Sistema ultra liviano para ensayos en cables de MT según normas IEEE 400.2.', true, true, 320, 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'),
('umg512', 'UMG 512-PRO', 'Analizador de Calidad de Energía Clase A', 'Janitza', 'calidad-energia', 'Analizador de redes y calidad de suministro eléctrico según IEC 61000-4-30 Clase A.', 'Monitoreo continuo de transitorios y armónicos.', true, true, 180, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;
