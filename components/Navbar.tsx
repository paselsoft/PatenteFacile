import React, { useState } from 'react';
import { Menu, X, Car, Globe } from 'lucide-react';
import { useScrollTo } from '../hooks/useScrollTo';
import { useTranslation } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const scrollToId = useScrollTo();
  const { t, language, setLanguage } = useTranslation();

  const links = [
    { name: t('navbar.presentation'), href: 'presentazione' },
    { name: t('navbar.documents'), href: 'documenti' },
    { name: t('navbar.procedure'), href: 'procedura' },
    { name: t('navbar.costs'), href: 'costi' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToId(targetId);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
    setIsLangOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo - Converted to button for A11Y */}
          <button 
            type="button"
            className="flex-shrink-0 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-motorizzazione rounded-lg p-1" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Torna all'inizio della pagina"
          >
            <div className="p-1.5 bg-motorizzazione rounded-lg mr-2">
                <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Patente Facile</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-600 hover:text-motorizzazione px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-motorizzazione"
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Switcher Desktop */}
            <div className="relative ml-4 pl-4 border-l border-gray-200">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center text-gray-600 hover:text-motorizzazione px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-motorizzazione"
                    aria-label="Cambia lingua"
                >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="uppercase">{language}</span>
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
                onClick={toggleLanguage}
                className="mr-4 p-2 rounded-md text-gray-600 hover:text-motorizzazione hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-motorizzazione"
            >
                <span className="font-bold uppercase text-sm">{language}</span>
            </button>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-motorizzazione hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-motorizzazione"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Apri menu principale"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out shadow-lg overflow-hidden ${isOpen ? 'max-h-screen opacity-100 border-b border-gray-100' : 'max-h-0 opacity-0'}`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-600 hover:text-motorizzazione hover:bg-blue-50 block px-3 py-3 rounded-md text-base font-medium focus:outline-none focus:bg-blue-50 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};