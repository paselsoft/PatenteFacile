import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChecklistToggle } from '../ChecklistToggle';
import { Globe } from 'lucide-react';

describe('ChecklistToggle Component', () => {
  it('dovrebbe renderizzare label e stato iniziale', () => {
    const onChange = vi.fn();
    
    render(
      <ChecklistToggle 
        id="test-toggle"
        label="Test Toggle"
        checked={false}
        onChange={onChange}
        icon={Globe}
      />
    );

    expect(screen.getByText('Test Toggle')).toBeDefined();
    const checkbox = screen.getByRole('checkbox');
    expect((checkbox as HTMLInputElement).checked).toBe(false);
  });

  it('dovrebbe chiamare onChange con il nuovo valore al click', () => {
    const onChange = vi.fn();
    
    render(
      <ChecklistToggle 
        id="test-toggle"
        label="Test Toggle"
        checked={false}
        onChange={onChange}
        icon={Globe}
      />
    );

    fireEvent.click(screen.getByLabelText('Test Toggle'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('dovrebbe cambiare stile visivo quando attivo', () => {
     render(
      <ChecklistToggle 
        id="test-toggle-active"
        label="Active Toggle"
        checked={true}
        onChange={() => {}}
        icon={Globe}
      />
    );

    // Verifica la presenza della classe di colore attivo sul label container o testo
    const labelText = screen.getByText('Active Toggle');
    expect(labelText.className).toContain('text-motorizzazione');
  });
});