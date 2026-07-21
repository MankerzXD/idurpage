import { createClient } from '@supabase/supabase-js';
import type { Equipment, Course } from '../types';
import type { AdminUser } from '../types/admin';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rjhrfadbfscpdlgthdzt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqaHJmYWRiZnNjcGRsZ3RoZHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1OTM3NTEsImV4cCI6MjEwMDE2OTc1MX0.Loy5Ds1G_bsKLkh5QQi2FKOK3XeTfOpSuXO7wQ31YrA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return Boolean(supabaseAnonKey);
};

// Data Fetchers
export async function fetchEquipmentFromSupabase(): Promise<Equipment[] | null> {
  try {
    const { data, error } = await supabase.from('equipment').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;
    
    return data.map(item => ({
      id: item.id,
      model: item.model,
      name: item.name,
      brand: item.brand,
      category: item.category,
      shortDescription: item.short_description || '',
      description: item.description || '',
      availableForRent: item.available_for_rent,
      availableForSale: item.available_for_sale,
      rentalPricePerDayEst: item.rental_price_per_day_est,
      specs: item.specs || [],
      image: item.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    }));
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return null;
  }
}

export async function fetchCoursesFromSupabase(): Promise<Course[] | null> {
  try {
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;
    
    return data.map(c => ({
      id: c.id,
      title: c.title,
      brandFocus: c.brand_focus,
      equipmentUsed: [c.brand_focus],
      instructor: c.instructor || 'IDUR Technical Instructor',
      date: c.date,
      duration: c.duration || '1 Día',
      location: c.location || 'Laboratorio IDUR S.A.',
      modality: 'Presencial (Lab IDUR)',
      price: c.price || 0,
      totalSeats: c.total_seats || 15,
      availableSeats: c.available_seats || 15,
      description: c.description || '',
      topics: c.topics || []
    }));
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return null;
  }
}

export async function fetchAdminsFromSupabase(): Promise<AdminUser[] | null> {
  try {
    const { data, error } = await supabase.from('admin_users').select('*');
    if (error || !data) return null;
    
    return data.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: u.created_at ? new Date(u.created_at).toLocaleDateString() : '21/07/2026'
    }));
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return null;
  }
}

// Data Mutators
export async function saveEquipmentToSupabase(eq: Equipment) {
  try {
    await supabase.from('equipment').insert([{
      id: eq.id,
      model: eq.model,
      name: eq.name,
      brand: eq.brand,
      category: eq.category,
      short_description: eq.shortDescription,
      description: eq.description,
      available_for_rent: eq.availableForRent,
      available_for_sale: eq.availableForSale,
      rental_price_per_day_est: eq.rentalPricePerDayEst,
      specs: eq.specs,
      image: eq.image
    }]);
  } catch (err) {
    console.error('Error saving equipment to Supabase:', err);
  }
}

export async function deleteEquipmentFromSupabase(id: string) {
  try {
    await supabase.from('equipment').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting equipment from Supabase:', err);
  }
}

export async function saveCourseToSupabase(course: Course) {
  try {
    await supabase.from('courses').insert([{
      id: course.id,
      title: course.title,
      brand_focus: course.brandFocus,
      instructor: course.instructor,
      date: course.date,
      duration: course.duration,
      location: course.location,
      price: course.price,
      total_seats: course.totalSeats,
      available_seats: course.availableSeats,
      description: course.description,
      topics: course.topics
    }]);
  } catch (err) {
    console.error('Error saving course to Supabase:', err);
  }
}

export async function deleteCourseFromSupabase(id: string) {
  try {
    await supabase.from('courses').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting course from Supabase:', err);
  }
}

export async function saveAdminUserToSupabase(user: AdminUser) {
  try {
    await supabase.from('admin_users').insert([{
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }]);
  } catch (err) {
    console.error('Error saving admin user to Supabase:', err);
  }
}

export async function deleteAdminUserFromSupabase(id: string) {
  try {
    await supabase.from('admin_users').delete().eq('id', id);
  } catch (err) {
    console.error('Error deleting admin user from Supabase:', err);
  }
}
