export interface Product {
  id: string;
  name: string;
  category: 'haute-couture' | 'randa' | 'soie-crepe' | 'velours';
  categoryLabel: string;
  samplePrice: number; // Editable sample price in MAD
  currency: string;
  description: string;
  craftDetails: {
    tissu: string;
    sfifa: string;
    aakad: string;
    broderie: string;
  };
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  isSample: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  selectedSize: string;
  selectedColor: string;
  customMeasurements?: {
    longueur?: string;
    poitrine?: string;
    taille?: string;
    hanches?: string;
  };
  samplePrice: number;
  quantity: number;
}

export type ThemePreset =
  | 'gold-black'
  | 'powder-rose'
  | 'royal-emerald'
  | 'bordeaux-gold'
  | 'minimal-couture'
  | 'navy-gold';

export interface ThemeColors {
  primary: string;
  accent: string;
  surface: string;
  cardBg: string;
  border: string;
  text: string;
  muted: string;
  bannerBg: string;
  bannerText: string;
}

export interface StoreConfig {
  brandName: string;
  brandTagline: string;
  customLogoUrl: string | null;
  themePreset: ThemePreset;
  whatsAppNumber: string; // international format without spaces, e.g. 212600000000
  whatsAppDisplay: string; // readable format e.g. +212 600 000 000
  instagramHandle: string;
  instagramUrl: string;
  deliveryNotice: string;
  atelierCity: string;
  currency: 'MAD' | 'EUR' | 'USD';
  currencyRate: {
    MAD: number;
    EUR: number;
    USD: number;
  };
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  address?: string;
  notes?: string;
}
