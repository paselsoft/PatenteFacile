import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

// Mock the context
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.disclaimer': 'Disclaimer: Questa guida è solo a scopo informativo.',
        'footer.copyright': '© 2024 Patente Facile. Tutti i diritti riservati.',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Termini di Servizio',
      };
      return translations[key] || key;
    },
    language: 'it',
    setLanguage: vi.fn(),
  }),
}));

describe('Footer Component', () => {
  it('dovrebbe renderizzare il footer', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeDefined();
  });

  it('dovrebbe contenere informazioni sul copyright o disclaimer', () => {
    render(<Footer />);
    // Il footer dovrebbe contenere testo
    const footer = document.querySelector('footer');
    expect(footer?.textContent?.length).toBeGreaterThan(0);
  });

  it('dovrebbe avere una struttura semantica corretta', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeDefined();
    expect(footer?.tagName.toLowerCase()).toBe('footer');
  });
});
