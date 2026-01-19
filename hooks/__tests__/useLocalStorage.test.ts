import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('dovrebbe inizializzare con il valore di default', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('dovrebbe salvare e leggere valori stringa', () => {
    const { result } = renderHook(() => useLocalStorage('string-key', ''));

    act(() => {
      result.current[1]('test value');
    });

    expect(result.current[0]).toBe('test value');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('string-key', '"test value"');
  });

  it('dovrebbe salvare e leggere valori numerici', () => {
    const { result } = renderHook(() => useLocalStorage('number-key', 0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
  });

  it('dovrebbe salvare e leggere valori booleani', () => {
    const { result } = renderHook(() => useLocalStorage('bool-key', false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('dovrebbe salvare e leggere oggetti', () => {
    const initialObj = { name: '', age: 0 };
    const { result } = renderHook(() => useLocalStorage('obj-key', initialObj));

    const newObj = { name: 'Mario', age: 30 };
    act(() => {
      result.current[1](newObj);
    });

    expect(result.current[0]).toEqual(newObj);
  });

  it('dovrebbe salvare e leggere array', () => {
    const { result } = renderHook(() => useLocalStorage<string[]>('array-key', []));

    act(() => {
      result.current[1](['item1', 'item2', 'item3']);
    });

    expect(result.current[0]).toEqual(['item1', 'item2', 'item3']);
  });

  it('dovrebbe supportare funzioni di aggiornamento come useState', () => {
    const { result } = renderHook(() => useLocalStorage('counter-key', 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](prev => prev + 5);
    });

    expect(result.current[0]).toBe(6);
  });

  it('dovrebbe mantenere il tipo generico', () => {
    interface User {
      id: number;
      name: string;
    }

    const defaultUser: User = { id: 0, name: '' };
    const { result } = renderHook(() => useLocalStorage<User>('user-key', defaultUser));

    const newUser: User = { id: 1, name: 'Luigi' };
    act(() => {
      result.current[1](newUser);
    });

    expect(result.current[0].id).toBe(1);
    expect(result.current[0].name).toBe('Luigi');
  });

  it('dovrebbe gestire valori null correttamente', () => {
    const { result } = renderHook(() => useLocalStorage<string | null>('nullable-key', null));

    expect(result.current[0]).toBeNull();

    act(() => {
      result.current[1]('non-null value');
    });

    expect(result.current[0]).toBe('non-null value');
  });

  it('dovrebbe usare chiavi diverse per valori diversi', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'));
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'));

    act(() => {
      result1.current[1]('updated1');
    });

    expect(result1.current[0]).toBe('updated1');
    expect(result2.current[0]).toBe('value2');
  });
});
