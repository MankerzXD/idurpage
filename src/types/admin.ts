export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SuperAdmin' | 'Editor' | 'Soporte';
  createdAt: string;
}

export interface AdminStats {
  totalEquipment: number;
  totalCourses: number;
  totalQuotes: number;
  totalAdmins: number;
}
