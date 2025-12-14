import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse
  // storedValue state to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (item) {
        const parsed = JSON.parse(item);
        // Basic check to ensure we aren't returning null for object types if unexpected
        return parsed !== null ? parsed : initialValue;
      }
      return initialValue;
    } catch (error) {
      // Type-safe error handling
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Error reading localStorage key "${key}":`, errorMessage);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Error setting localStorage key "${key}":`, errorMessage);
    }
  };

  return [storedValue, setValue];
}