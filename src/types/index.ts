export type EquipmentBrand = 'OMICRON' | 'b2 electronics' | 'Janitza' | 'ARCTEQ' | 'SEG electronics' | 'STÄUBLI' | 'IDUR Lab' | string;
export type ApplicationCategory = 'transformadores' | 'interruptores' | 'cables' | 'calidad-energia' | 'protecciones' | 'conectividad' | 'todos';

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface Equipment {
  id: string;
  name: string;
  brand: EquipmentBrand;
  model: string;
  shortDescription: string;
  description: string;
  category: ApplicationCategory;
  availableForRent: boolean;
  availableForSale: boolean;
  rentalPricePerDayEst?: number;
  salePriceEst?: number;
  specs: EquipmentSpec[];
  image: string;
  pdfDatasheetUrl?: string;
  featured?: boolean;
}

export interface QuoteItem {
  equipment: Equipment;
  type: 'rental' | 'purchase';
  rentalDays?: number;
}

export interface Course {
  id: string;
  title: string;
  brandFocus: EquipmentBrand;
  equipmentUsed: string[];
  instructor: string;
  date: string;
  duration: string;
  location: string;
  modality: 'Presencial (Lab IDUR)' | 'Online Vivo' | 'In-Company';
  price: number;
  totalSeats: number;
  availableSeats: number;
  description: string;
  topics: string[];
}

export interface CalibrationCert {
  id: string;
  equipmentModel: string;
  serialNumber: string;
  issueDate: string;
  expiryDate: string;
  downloadUrl: string;
  status: 'Vigente' | 'Próximo a Vencer' | 'Vencido';
}
