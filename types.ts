import { LucideIcon } from 'lucide-react';

export interface StepItem {
  id: number;
  title: string;
  description: string;
  note?: string;
  icon: LucideIcon;
}

export interface CostItem {
  reason: string;
  detail: string;
  code: string;
  amount: string;
  isTotal?: boolean;
}

export interface PresentationMode {
  id: number;
  title: string;
  description: string;
  details?: React.ReactNode;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  required: boolean;
}