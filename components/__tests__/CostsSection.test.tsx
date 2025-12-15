import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CostsSection } from '../CostsSection';
import { COSTS_DATA } from '../../constants';

// Mock delle traduzioni
vi.mock('../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'it',
  }),
}));

describe('CostsSection Component', () => {
  it('dovrebbe renderizzare il titolo della sezione', () => {
    render(<CostsSection />);
    expect(screen.getByText('costs.title')).toBeDefined();
  });

  it('dovrebbe renderizzare la card del totale', () => {
    render(<CostsSection />);
    expect(screen.getByText('costs.total_label')).toBeDefined();
    
    // Trova l'importo totale dai dati costanti
    const totalItem = COSTS_DATA.find(c => c.isTotal);
    if (totalItem) {
        expect(screen.getByText(totalItem.amount)).toBeDefined();
    }
  });

  it('dovrebbe renderizzare la lista dei costi singoli', () => {
    render(<CostsSection />);
    
    const singleCosts = COSTS_DATA.filter(c => !c.isTotal);
    
    singleCosts.forEach(cost => {
        // Verifica che le chiavi di traduzione siano presenti nel DOM
        expect(screen.getByText(cost.reasonKey)).toBeDefined();
        expect(screen.getByText(cost.amount)).toBeDefined();
        expect(screen.getByText(cost.code)).toBeDefined();
    });
  });
});