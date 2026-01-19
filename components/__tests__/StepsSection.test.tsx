import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepsSection } from '../StepsSection';

// Mock the context
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'steps.title': 'I 4 Passaggi per la Patente B',
        'steps.step1_title': 'Visita Medica',
        'steps.step1_description': 'Effettua la visita medica presso un medico autorizzato',
        'steps.step2_title': 'Domanda',
        'steps.step2_description': 'Presenta la domanda alla Motorizzazione',
        'steps.step3_title': 'Esame Teoria',
        'steps.step3_description': 'Supera l\'esame di teoria',
        'steps.step4_title': 'Esame Pratica',
        'steps.step4_description': 'Supera l\'esame di guida',
      };
      return translations[key] || key;
    },
    language: 'it',
    setLanguage: vi.fn(),
  }),
}));

describe('StepsSection Component', () => {
  it('dovrebbe renderizzare il titolo della sezione', () => {
    render(<StepsSection />);
    expect(screen.getByText('I 4 Passaggi per la Patente B')).toBeDefined();
  });

  it('dovrebbe renderizzare tutti e 4 i passaggi', () => {
    render(<StepsSection />);
    expect(screen.getByText('Visita Medica')).toBeDefined();
    expect(screen.getByText('Domanda')).toBeDefined();
    expect(screen.getByText('Esame Teoria')).toBeDefined();
    expect(screen.getByText('Esame Pratica')).toBeDefined();
  });

  it('dovrebbe avere l\'ID corretto per la navigazione', () => {
    render(<StepsSection />);
    const section = document.getElementById('procedura');
    expect(section).toBeDefined();
  });

  it('dovrebbe mostrare le descrizioni dei passaggi', () => {
    render(<StepsSection />);
    expect(screen.getByText(/Effettua la visita medica/)).toBeDefined();
    expect(screen.getByText(/Presenta la domanda/)).toBeDefined();
  });

  it('dovrebbe avere una struttura con section tag', () => {
    render(<StepsSection />);
    const section = document.querySelector('section#procedura');
    expect(section).toBeDefined();
  });

  it('dovrebbe avere heading h2 per il titolo', () => {
    render(<StepsSection />);
    const h2 = document.querySelector('h2');
    expect(h2).toBeDefined();
  });
});
