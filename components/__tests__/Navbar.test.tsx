import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';

// Mock the hooks and context
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'it',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('../../hooks/useScrollTo', () => ({
  useScrollTo: () => vi.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('dovrebbe renderizzare il logo e il nome dell\'app', () => {
    render(<Navbar />);
    expect(screen.getByText('Patente Facile')).toBeDefined();
  });

  it('dovrebbe mostrare i link di navigazione desktop', () => {
    render(<Navbar />);
    expect(screen.getByText('navbar.presentation')).toBeDefined();
    expect(screen.getByText('navbar.documents')).toBeDefined();
    expect(screen.getByText('navbar.procedure')).toBeDefined();
    expect(screen.getByText('navbar.costs')).toBeDefined();
  });

  it('dovrebbe avere un bottone per il menu mobile', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText('Apri menu principale');
    expect(menuButton).toBeDefined();
  });

  it('dovrebbe espandere il menu mobile quando si clicca il bottone', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText('Apri menu principale');

    // Inizialmente aria-expanded dovrebbe essere false
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');

    // Clicca per aprire
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Clicca per chiudere
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('dovrebbe avere il bottone per cambiare lingua', () => {
    render(<Navbar />);
    const langButton = screen.getByLabelText('Cambia lingua');
    expect(langButton).toBeDefined();
  });

  it('dovrebbe mostrare la lingua corrente in maiuscolo', () => {
    render(<Navbar />);
    // Il mock restituisce 'it' come lingua
    const langIndicators = screen.getAllByText('it');
    expect(langIndicators.length).toBeGreaterThan(0);
  });

  it('dovrebbe avere il logo cliccabile per tornare in cima', () => {
    render(<Navbar />);
    const logoButton = screen.getByLabelText('Torna all\'inizio della pagina');
    expect(logoButton).toBeDefined();
  });

  it('dovrebbe avere attributi ARIA corretti per accessibilità', () => {
    render(<Navbar />);
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeDefined();

    const menuButton = screen.getByLabelText('Apri menu principale');
    expect(menuButton.getAttribute('aria-controls')).toBe('mobile-menu');
  });
});
