import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider, useTranslation } from '../LanguageContext';

// Wrapper component per fornire il contesto
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageContext', () => {
  beforeEach(() => {
    // Pulisce localStorage prima di ogni test per evitare stato condiviso
    window.localStorage.clear();
  });

  it('dovrebbe inizializzare con la lingua di default (it)', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.language).toBe('it');
  });

  it('dovrebbe tradurre correttamente una chiave esistente in italiano', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    // Assumiamo che 'header.title_prefix' esista nel locale 'it'
    expect(result.current.t('header.title_prefix')).toBe('Patente');
  });

  it('dovrebbe cambiare lingua in inglese e aggiornare le traduzioni', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    
    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.t('header.title_prefix')).toBe('Driving License');
  });

  it('dovrebbe restituire la chiave se la traduzione manca', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    const missingKey = 'chiave.non.esistente';
    expect(result.current.t(missingKey)).toBe(missingKey);
  });
  
  it('dovrebbe persistere la lingua nel localStorage', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    
    act(() => {
      result.current.setLanguage('en');
    });
    
    // Verifica accesso diretto a localStorage
    expect(window.localStorage.getItem('patente_language')).toContain('en');
  });
});