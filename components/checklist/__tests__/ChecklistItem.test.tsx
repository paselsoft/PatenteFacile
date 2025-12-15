import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChecklistItemRow } from '../ChecklistItem';
import { ChecklistItem } from '../../../types';

// Mock del Context di traduzione per isolare il componente
vi.mock('../../../contexts/LanguageContext', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Restituisce la chiave come traduzione
    language: 'it',
  }),
}));

const mockItem: ChecklistItem = {
  id: 'test_doc',
  labelKey: 'documents.test_label',
  required: true
};

describe('ChecklistItem Component', () => {
  it('dovrebbe renderizzare correttamente la label e la checkbox', () => {
    const onToggle = vi.fn();
    const onInfoClick = vi.fn();

    render(
      <ChecklistItemRow 
        item={mockItem}
        isChecked={false}
        onToggle={onToggle}
        onInfoClick={onInfoClick}
        isDelegateMode={false}
      />
    );

    // Verifica che la label sia presente (usiamo la chiave mockata)
    expect(screen.getByText('documents.test_label')).toBeDefined();
    
    // Verifica che l'input checkbox esista e abbia l'aria-describedby corretto (implicitamente tramite label)
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute('checked')).toBeNull();
  });

  it('dovrebbe chiamare onToggle quando viene cliccato', () => {
    const onToggle = vi.fn();
    render(
      <ChecklistItemRow 
        item={mockItem}
        isChecked={false}
        onToggle={onToggle}
        onInfoClick={() => {}}
        isDelegateMode={false}
      />
    );

    fireEvent.click(screen.getByText('documents.test_label'));
    expect(onToggle).toHaveBeenCalledWith('test_doc');
  });

  it('dovrebbe mostrare il badge "Extra-UE" per il permesso di soggiorno', () => {
    const extraEuItem: ChecklistItem = { ...mockItem, id: 'soggiorno' };
    
    render(
      <ChecklistItemRow 
        item={extraEuItem}
        isChecked={false}
        onToggle={() => {}}
        onInfoClick={() => {}}
        isDelegateMode={false}
      />
    );

    expect(screen.getByText('checklist.badge_extra_eu')).toBeDefined();
  });

  it('dovrebbe mostrare il badge "Minore" per documenti genitore', () => {
    const minorItem: ChecklistItem = { ...mockItem, id: 'doc_genitore_1' };
    
    render(
      <ChecklistItemRow 
        item={minorItem}
        isChecked={false}
        onToggle={() => {}}
        onInfoClick={() => {}}
        isDelegateMode={false}
      />
    );

    expect(screen.getByText('checklist.badge_minor')).toBeDefined();
  });

  it('dovrebbe mostrare il badge "Delegato" se in modalità delega', () => {
    const delegateItem: ChecklistItem = { ...mockItem, id: 'del_doc_1' };
    
    render(
      <ChecklistItemRow 
        item={delegateItem}
        isChecked={false}
        onToggle={() => {}}
        onInfoClick={() => {}}
        isDelegateMode={true}
      />
    );

    expect(screen.getByText('checklist.badge_delegate')).toBeDefined();
  });

  it('dovrebbe applicare lo stile "checked" quando isChecked è true', () => {
    render(
      <ChecklistItemRow 
        item={mockItem}
        isChecked={true}
        onToggle={() => {}}
        onInfoClick={() => {}}
        isDelegateMode={false}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    // Verifica proprietà DOM checked
    expect((checkbox as HTMLInputElement).checked).toBe(true);
    
    // Verifica classe visuale per testo barrato
    const labelText = screen.getByText('documents.test_label');
    expect(labelText.className).toContain('line-through');
  });
});