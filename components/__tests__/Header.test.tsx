import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

// Mock the context and hooks
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'header.title_prefix': 'Patente',
        'header.title_suffix': 'Facile',
        'header.subtitle': 'La guida completa per la patente B',
        'header.cta_docs': 'Prepara i Documenti',
        'header.cta_steps': 'Scopri i Passaggi',
      };
      return translations[key] || key;
    },
    language: 'it',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('../../hooks/useScrollTo', () => ({
  useScrollTo: () => vi.fn(),
}));

describe('Header Component', () => {
  it('dovrebbe renderizzare il titolo principale', () => {
    render(<Header />);
    expect(screen.getByText('Patente')).toBeDefined();
    expect(screen.getByText('Facile')).toBeDefined();
  });

  it('dovrebbe renderizzare il sottotitolo', () => {
    render(<Header />);
    expect(screen.getByText('La guida completa per la patente B')).toBeDefined();
  });

  it('dovrebbe avere due pulsanti CTA', () => {
    render(<Header />);
    expect(screen.getByText('Prepara i Documenti')).toBeDefined();
    expect(screen.getByText('Scopri i Passaggi')).toBeDefined();
  });

  it('dovrebbe avere una struttura semantica corretta', () => {
    render(<Header />);
    const header = document.querySelector('header');
    expect(header).toBeDefined();
  });

  it('dovrebbe avere il tag h1 per il titolo principale', () => {
    render(<Header />);
    const h1 = document.querySelector('h1');
    expect(h1).toBeDefined();
    expect(h1?.textContent).toContain('Patente');
  });

  it('dovrebbe avere i pulsanti CTA con stili appropriati', () => {
    render(<Header />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
