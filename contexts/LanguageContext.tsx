import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { it } from '../locales/it';
import { en } from '../locales/en';
import { TranslationContextType, Language } from '../types';

const LanguageContext = createContext<TranslationContextType | undefined>(undefined);

// Dizionario delle traduzioni
const translations = {
  it,
  en
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistenza lingua (default italiano)
  const [language, setLanguage] = useLocalStorage<Language>('patente_language', 'it');

  // Funzione di traduzione nested (es. "header.title")
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        console.warn(`Translation key missing: ${key} in ${language}`);
        return key; // Fallback alla chiave
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};