import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../Navbar';

// Mock Language Context
const setLanguageMock = vi.fn();
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
        if (key === 'navbar.presentation') return 'Presentazione';
        if (key === 'navbar.documents') return 'Documenti';
        return key;
    },
    language: 'it',
    setLanguage: setLanguageMock
  }),
}));

// Mock scroll hook
const scrollToMock = vi.fn();
vi.mock('../../hooks/useScrollTo', () => ({
  useScrollTo: () => scrollToMock
}));

describe('Navbar Component', () => {
  it('dovrebbe renderizzare il logo e i link di navigazione', () => {
    render(<Navbar />);
    expect(screen.getByText('Patente Facile')).toBeDefined();
    expect(screen.getByText('Presentazione')).toBeDefined();
    expect(screen.getByText('Documenti')).toBeDefined();
  });

  it('dovrebbe attivare lo scroll quando si clicca un link', () => {
    render(<Navbar />);
    const link = screen.getByText('Presentazione');
    fireEvent.click(link);
    expect(scrollToMock).toHaveBeenCalledWith('presentazione');
  });
  
  it('dovrebbe cambiare lingua quando si clicca il selettore desktop', () => {
    render(<Navbar />);
    // Il pulsante ha aria-label="Cambia lingua"
    const langBtn = screen.getByLabelText('Cambia lingua');
    fireEvent.click(langBtn);
    expect(setLanguageMock).toHaveBeenCalled();
  });

  it('dovrebbe scrollare in alto quando si clicca il logo', () => {
    // Mock di window.scrollTo
    const windowScrollMock = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: windowScrollMock, writable: true });

    render(<Navbar />);
    const logoBtn = screen.getByLabelText("Torna all'inizio della pagina");
    fireEvent.click(logoBtn);
    
    expect(windowScrollMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});