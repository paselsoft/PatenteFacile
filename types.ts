import { LucideIcon } from 'lucide-react';

export type Language = 'it' | 'en';

export interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface StepItem {
  id: number;
  titleKey: string;
  descriptionKey: string;
  noteKey?: string;
  icon: LucideIcon;
}

export interface CostItem {
  reasonKey: string;
  detailKey: string;
  code: string;
  amount: string;
  isTotal?: boolean;
}

export interface ChecklistItem {
  id: string;
  labelKey: string;
  detailKey?: string;
  required: boolean;
}