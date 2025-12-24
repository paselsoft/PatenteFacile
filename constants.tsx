import { Stethoscope, FileText, BookOpen, Car } from 'lucide-react';
import { StepItem, CostItem, ChecklistItem } from './types';

export const STEPS_DATA: StepItem[] = [
  {
    id: 1,
    titleKey: "steps.step1_title",
    descriptionKey: "steps.step1_desc",
    noteKey: "steps.step1_note",
    icon: Stethoscope
  },
  {
    id: 2,
    titleKey: "steps.step2_title",
    descriptionKey: "steps.step2_desc",
    icon: FileText
  },
  {
    id: 3,
    titleKey: "steps.step3_title",
    descriptionKey: "steps.step3_desc",
    icon: BookOpen
  },
  {
    id: 4,
    titleKey: "steps.step4_title",
    descriptionKey: "steps.step4_desc",
    icon: Car
  }
];

export const COSTS_DATA: CostItem[] = [
  {
    reasonKey: "costs.cost1_reason",
    detailKey: "costs.cost1_detail",
    code: "N067",
    amount: "€ 42,40"
  },
  {
    reasonKey: "costs.cost2_reason",
    detailKey: "costs.cost2_detail",
    code: "N019",
    amount: "€ 16,00"
  },
  {
    reasonKey: "costs.total_reason",
    detailKey: "",
    code: "",
    amount: "€ 58,40",
    isTotal: true
  }
];

export const DOCUMENTS_DATA: ChecklistItem[] = [
  { 
    id: 'tt2112', 
    labelKey: 'documents.tt2112_label', 
    detailKey: 'documents.tt2112_detail', 
    required: true 
  },
  { 
    id: 'pagopa', 
    labelKey: 'documents.pagopa_label', 
    detailKey: 'documents.pagopa_detail', 
    required: true 
  },
  { 
    id: 'medico', 
    labelKey: 'documents.medico_label', 
    detailKey: 'documents.medico_detail', 
    required: true 
  },
  { 
    id: 'identita', 
    labelKey: 'documents.identita_label', 
    detailKey: 'documents.identita_detail', 
    required: true 
  },
  { 
    id: 'cf', 
    labelKey: 'documents.cf_label', 
    detailKey: 'documents.cf_detail', 
    required: true 
  }
];

export const EXTRA_EU_DOCUMENTS_DATA: ChecklistItem[] = [
  { 
    id: 'soggiorno', 
    labelKey: 'documents.soggiorno_label', 
    detailKey: 'documents.soggiorno_detail', 
    required: true 
  }
];

export const MINOR_DOCUMENTS_DATA: ChecklistItem[] = [
  {
    id: 'doc_genitore',
    labelKey: 'documents.doc_genitore_label', 
    detailKey: 'documents.doc_genitore_detail',
    required: true
  }
];

export const DELEGATE_DOCUMENTS_DATA: ChecklistItem[] = [
  {
    id: 'del_delega',
    labelKey: 'documents.del_delega_label', 
    detailKey: 'documents.del_delega_detail',
    required: true
  },
  {
    id: 'del_doc_delegato',
    labelKey: 'documents.del_doc_delegato_label', 
    detailKey: 'documents.del_doc_delegato_detail',
    required: true
  },
  {
    id: 'del_doc_delegante',
    labelKey: 'documents.del_doc_delegante_label', 
    detailKey: 'documents.del_doc_delegante_detail',
    required: true
  }
];