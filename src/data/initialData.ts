import heroImage from '@/src/assets/images/hero_moroccan_jellaba_1791757446974.jpg';
import randaImage from '@/src/assets/images/jellaba_crepe_randa_1791757457227.jpg';
import veloursImage from '@/src/assets/images/jellaba_velours_noir_1791757466616.jpg';
import ivoireImage from '@/src/assets/images/jellaba_soie_ivoire_1791757476362.jpg';
import brandLogo from '@/src/assets/images/chamas_mode_logo_1791762812267.jpg';
import { Product, StoreConfig } from '../types/store';

export const INITIAL_CONFIG: StoreConfig = {
  brandName: "Chama's MODE",
  brandTagline: 'Haute Couture Marocaine · Jellabas d’Exception',
  customLogoUrl: brandLogo, // Official brand logo uploaded by user
  themePreset: 'royal-emerald',
  whatsAppNumber: '212771186111',
  whatsAppDisplay: '+212 7 71 18 61 11',
  instagramHandle: '@chamasmode',
  instagramUrl: 'https://www.instagram.com/chamasmode?xtok=NnRyMDU4Zmp5eWUx',
  deliveryNotice: 'Livraison sécurisée partout au Maroc & Expédition Internationale',
  atelierCity: 'Fès',
  currency: 'MAD',
  currencyRate: {
    MAD: 1,
    EUR: 0.092,
    USD: 0.10,
  },
};

export const THEMES_LIST = [
  {
    id: 'royal-emerald',
    label: 'Vert Émeraude Royal & Or',
    description: 'Émeraude royale marocaine et passementerie d’or haute couture',
    primaryColor: '#0D281E',
    accentColor: '#1C6B4D',
    bgColor: '#F4F8F5',
  },
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'chamas-01',
    name: 'Jellaba Émeraude Impériale · Sfifa Dorée',
    category: 'haute-couture',
    categoryLabel: 'Haute Couture & Cérémonie',
    samplePrice: 499,
    currency: 'MAD',
    description: 'Création d’apparat en crêpe de soie émeraude rehaussée d’une sfifa traditionnelle dorée et aakad tressés à la main. Coupe majestueuse pensée pour les grandes occasions et réceptions.',
    craftDetails: {
      tissu: 'Crêpe de soie fluide premier choix',
      sfifa: 'Sfifa dorée artisanale façon Cartier',
      aakad: 'Aakad en fil de soie pure noués manuellement',
      broderie: 'Zouaq d’Al-Maâlem raffiné aux manches',
    },
    image: heroImage,
    colors: [
      { name: 'Vert Émeraude', hex: '#0f5238' },
      { name: 'Bleu Majorelle', hex: '#1a365d' },
      { name: 'Bordeaux Impérial', hex: '#581825' },
    ],
    sizes: ['36', '38', '40', '42', '44', 'Sur-Mesure'],
    isSample: true,
    featured: true,
  },
  {
    id: 'chamas-02',
    name: 'Jellaba Randa Rose Poudré · Fait-Main',
    category: 'randa',
    categoryLabel: 'Randa Traditionnelle',
    samplePrice: 499,
    currency: 'MAD',
    description: 'Pièce délicate façonnée à la main avec une broderie randa fine ton-sur-ton le long du buste et des poignets. Un tombé impeccable alliant modernité et pure tradition marocaine.',
    craftDetails: {
      tissu: 'Crêpe japonais doux et respirant',
      sfifa: 'Travail minutieux à l’aiguille (Randa)',
      aakad: 'Aakad miniatures ton-sur-ton',
      broderie: 'Motifs ajourés mssoussa brodés main',
    },
    image: randaImage,
    colors: [
      { name: 'Rose Poudré', hex: '#c59b9b' },
      { name: 'Beige Sable', hex: '#d8cbb8' },
      { name: 'Gris Perle', hex: '#cfd2d6' },
    ],
    sizes: ['36', '38', '40', '42', '44', 'Sur-Mesure'],
    isSample: true,
    featured: true,
  },
  {
    id: 'chamas-03',
    name: 'Jellaba Velours Noir Cérémonie',
    category: 'velours',
    categoryLabel: 'Velours Précieux',
    samplePrice: 499,
    currency: 'MAD',
    description: 'Noblesse du velours de soie noir profond sublimé par une passementerie argentée lumineuse et fentes latérales travaillées. Une élégance intemporelle pour vos soirées.',
    craftDetails: {
      tissu: 'Velours de soie lourd à reflet subtil',
      sfifa: 'Sfifa argentée pure soie et fil d’argent',
      aakad: 'Aakad denses sur toute la longueur',
      broderie: 'Finitions ornementales aux fentes basses',
    },
    image: veloursImage,
    colors: [
      { name: 'Noir Ébène', hex: '#171717' },
      { name: 'Bleu Nuit', hex: '#0f172a' },
      { name: 'Vert Forêt', hex: '#143322' },
    ],
    sizes: ['36', '38', '40', '42', '44', 'Sur-Mesure'],
    isSample: true,
    featured: true,
  },
  {
    id: 'chamas-04',
    name: 'Jellaba Ivoire & Or Champagne · Soie',
    category: 'soie-crepe',
    categoryLabel: 'Soie & Crêpe Moderne',
    samplePrice: 499,
    currency: 'MAD',
    description: 'Une création lumineuse en crêpe immaculé avec finitions champagne soignées et capuche fluide d’un chic naturel. Idéale pour le vendredi, fêtes de l’Aïd ou cérémonies familiales.',
    craftDetails: {
      tissu: 'Crêpe de soie lourd haute densité',
      sfifa: 'Sfifa fine champagne artisanale',
      aakad: 'Boutons aakad tissés soie véritable',
      broderie: 'Brodage artisanal fin au col et capuchon',
    },
    image: ivoireImage,
    colors: [
      { name: 'Ivoire Épuré', hex: '#f7f4ee' },
      { name: 'Blanc Neige', hex: '#ffffff' },
      { name: 'Nude Champagne', hex: '#ede4d8' },
    ],
    sizes: ['36', '38', '40', '42', '44', 'Sur-Mesure'],
    isSample: true,
    featured: true,
  },
];
