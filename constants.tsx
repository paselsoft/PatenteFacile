import React from 'react';
import { Stethoscope, FileText, BookOpen, Car } from 'lucide-react';
import { StepItem, CostItem, ChecklistItem } from './types';

export const STEPS_DATA: StepItem[] = [
  {
    id: 1,
    title: "Visita Medica di Idoneità",
    description: "Recati dal tuo medico curante per ottenere il Certificato Anamnestico. Successivamente, prenota la visita con un medico certificatore abilitato (ASL, ACI, ecc.). Il medico invierà il certificato telematicamente.",
    note: "Nota: Allo sportello dovrai portare la Ricevuta telematica della visita (con foto), NON l'anamnestico.",
    icon: Stethoscope
  },
  {
    id: 2,
    title: "Presentazione Domanda",
    description: "Presenta il Modello TT 2112 compilato, le ricevute PagoPA, la ricevuta medica e i documenti di identità. La domanda ha validità di 6 mesi.",
    icon: FileText
  },
  {
    id: 3,
    title: "Esame di Teoria & Foglio Rosa",
    description: "Hai 2 tentativi in 6 mesi. L'esame (Cat. B) consiste in 30 quiz (max 3 errori) in 20 minuti. Superato l'esame, ottieni il Foglio Rosa.",
    icon: BookOpen
  },
  {
    id: 4,
    title: "Esercitazioni e Guida",
    description: "Il Foglio Rosa è valido 12 mesi. Hai a disposizione 3 tentativi per l'esame pratico.",
    icon: Car
  }
];

export const COSTS_DATA: CostItem[] = [
  {
    reason: "Esame di Teoria (Conseguimento)",
    detail: "Include Diritti (€26,40) + Bollo Domanda (€16,00)",
    code: "N067",
    amount: "€ 42,40"
  },
  {
    reason: "Imposta di Bollo (Emissione Patente)",
    detail: "Per il documento fisico",
    code: "N019",
    amount: "€ 16,00"
  },
  {
    reason: "TOTALE VERSAMENTI UMC",
    detail: "",
    code: "",
    amount: "€ 58,40",
    isTotal: true
  }
];

export const DOCUMENTS_DATA: ChecklistItem[] = [
  { 
    id: 'tt2112', 
    label: 'Modello TT 2112', 
    detail: 'Compilato in ogni sua parte e firmato dal candidato.', 
    required: true 
  },
  { 
    id: 'pagopa', 
    label: 'Ricevute PagoPA', 
    detail: 'Attestazione di pagamento delle tariffe N067 e N019.', 
    required: true 
  },
  { 
    id: 'medico', 
    label: 'Ricevuta Visita Medica', 
    detail: 'Ricevuta telematica con foto (rilasciata dal medico certificatore).', 
    required: true 
  },
  { 
    id: 'identita', 
    label: 'Documento di Identità', 
    detail: 'In corso di validità (Originale + Fotocopia fronte/retro).', 
    required: true 
  },
  { 
    id: 'cf', 
    label: 'Codice Fiscale', 
    detail: 'Tessera Sanitaria (Originale + Fotocopia fronte/retro).', 
    required: true 
  }
];

export const EXTRA_EU_DOCUMENTS_DATA: ChecklistItem[] = [
  { 
    id: 'soggiorno', 
    label: 'Permesso di Soggiorno', 
    detail: 'Solo per cittadini extracomunitari (Originale + Copia). Deve essere in corso di validità o accompagnato da ricevuta di rinnovo.', 
    required: true 
  }
];

export const MINOR_DOCUMENTS_DATA: ChecklistItem[] = [
  {
    id: 'doc_genitore',
    label: 'Documento Genitore/Tutore',
    detail: 'Fotocopia del documento di riconoscimento del genitore o tutore legale che ha firmato la domanda.',
    required: true
  }
];

export const DELEGATE_DOCUMENTS_DATA: ChecklistItem[] = [
  {
    id: 'del_delega',
    label: 'Delega Firmata',
    detail: 'Delega in carta semplice firmata dal candidato (Delegante).',
    required: true
  },
  {
    id: 'del_doc_delegato',
    label: 'Documento Delegato (Originale)',
    detail: 'Documento di riconoscimento della persona che presenta la pratica (Delegato) in ORIGINALE per identificazione.',
    required: true
  },
  {
    id: 'del_doc_delegante',
    label: 'Documento Delegante (Copia)',
    detail: 'Fotocopia del documento di riconoscimento del candidato (Delegante).',
    required: true
  }
];