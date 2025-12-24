import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../Header';

// Mock Language Context per evitare dipendenza dalle traduzioni reali
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => {
        if (key === 'header.cta_docs') return 'Prepara i Documenti';
        if (key === 'header.cta_steps') return 'Scopri i Passaggi';
        if (key === 'header.title_prefix') return 'Patente';
        if (key === 'header.title_suffix') return 'Facile';
        return key;
    },
    language: 'it',
  }),
}));

// Mock scroll hook
const scrollToMock = vi.fn();
vi.mock('../../hooks/useScrollTo', () => ({
  useScrollTo: () => scrollToMock
}));

describe('Header Component', () => {
  it('dovrebbe renderizzare titolo e pulsanti CTA', () => {
    render(<Header />);
    expect(screen.getByText('Patente')).toBeDefined();
    expect(screen.getByText('Facile')).toBeDefined();
    expect(screen.getByText('Prepara i Documenti')).toBeDefined();
    expect(screen.getByText('Scopri i Passaggi')).toBeDefined();
  });

  it('dovrebbe scorrere ai documenti quando si clicca la CTA primaria', () => {
    render(<Header />);
    const btn = screen.getByText('Prepara i Documenti');
    fireEvent.click(btn);
    expect(scrollToMock).toHaveBeenCalledWith('documenti');
  });

  it('dovrebbe scorrere alla procedura quando si clicca la CTA secondaria', () => {
    render(<Header />);
    const btn = screen.getByText('Scopri i Passaggi');
    fireEvent.click(btn);
    expect(scrollToMock).toHaveBeenCalledWith('procedura');
  });
});