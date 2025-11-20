export interface Project {
  id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  downloadCount: string;
  externalLink: string;
  featured?: boolean;
  category: string;
  image?: string; // Sanity Image URL
}

export interface Article {
  id: string;
  title: string;
  category: string;
  link: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'layout' | 'consulting';
}

export interface Profile {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  headline: string;
  subHeadline: string;
  aboutText: string;
  avatar: string;
  tags: string[];
  email: string;
  socials: {
    notionArabs: string;
    facebook: string;
    whatsapp: string;
    telegram: string;
  };
}

export enum Language {
  AR = 'ar',
  EN = 'en'
}