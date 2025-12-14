import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChecklist } from '../useChecklist';
import { DOCUMENTS_DATA, EXTRA_EU_DOCUMENTS_DATA, MINOR_DOCUMENTS_DATA, DELEGATE_DOCUMENTS_DATA } from '../../constants';

// Mock di localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useChecklist Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('dovrebbe inizializzare con lo stato di default', () => {
    const { result } = renderHook(() => useChecklist());

    expect(result.current.checkedItems).toEqual({});
    expect(result.current.isDelegateMode).toBe(false);
    expect(result.current.isExtraEu).toBe(false);
    expect(result.current.isMinor).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(result.current.isComplete).toBe(false);
    
    // Default list should only contain base documents
    expect(result.current.currentList).toHaveLength(DOCUMENTS_DATA.length);
  });

  it('dovrebbe aggiornare la lista documenti attivando Extra UE', () => {
    const { result } = renderHook(() => useChecklist());

    act(() => {
      result.current.setIsExtraEu(true);
    });

    const expectedLength = DOCUMENTS_DATA.length + EXTRA_EU_DOCUMENTS_DATA.length;
    expect(result.current.currentList).toHaveLength(expectedLength);
    expect(result.current.currentList.some(item => item.id === 'soggiorno')).toBe(true);
  });

  it('dovrebbe gestire correttamente la modalità Delegato', () => {
    const { result } = renderHook(() => useChecklist());

    act(() => {
      result.current.setIsDelegateMode(true);
    });

    const expectedLength = DOCUMENTS_DATA.length + DELEGATE_DOCUMENTS_DATA.length;
    expect(result.current.currentList).toHaveLength(expectedLength);
    expect(result.current.currentList.some(item => item.id.startsWith('del_'))).toBe(true);
  });

  it('dovrebbe calcolare correttamente il progresso', () => {
    const { result } = renderHook(() => useChecklist());
    const firstItemId = DOCUMENTS_DATA[0].id;
    const totalBaseItems = DOCUMENTS_DATA.length;

    act(() => {
      result.current.toggleItem(firstItemId);
    });

    // 1 item checked out of 5 base items = 20%
    const expectedProgress = Math.round((1 / totalBaseItems) * 100);
    expect(result.current.progress).toBe(expectedProgress);
    expect(result.current.checkedItems[firstItemId]).toBe(true);
  });

  it('dovrebbe raggiungere il 100% e isComplete solo se tutto è checkato', () => {
    const { result } = renderHook(() => useChecklist());

    act(() => {
      // Check all base items
      DOCUMENTS_DATA.forEach(item => {
        result.current.toggleItem(item.id);
      });
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.isComplete).toBe(true);
  });

  it('dovrebbe resettare correttamente la checklist', () => {
    const { result } = renderHook(() => useChecklist());

    act(() => {
      result.current.toggleItem(DOCUMENTS_DATA[0].id);
    });

    expect(result.current.checkedItems).not.toEqual({});

    act(() => {
      result.current.resetChecklist();
    });

    expect(result.current.checkedItems).toEqual({});
    expect(result.current.progress).toBe(0);
  });

  it('dovrebbe persistere lo stato nel localStorage', () => {
    const { result } = renderHook(() => useChecklist());

    act(() => {
      result.current.setIsMinor(true);
    });

    // Check localStorage direct access
    const storedMinor = window.localStorage.getItem('patente_minor');
    expect(storedMinor).toBe('true');

    // Re-render hook to simulate page reload
    const { result: result2 } = renderHook(() => useChecklist());
    expect(result2.current.isMinor).toBe(true);
  });
});