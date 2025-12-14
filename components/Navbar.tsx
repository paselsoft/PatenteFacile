import React, { useState } from 'react';
import { Menu, X, Car } from 'lucide-react';
import { useScrollTo } from '../hooks/useScrollTo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToId = useScrollTo();

  const links = [
    { name: 'Presentazione', href: 'presentazione' },
    { name: 'Documenti', href: 'documenti' },
    { name: 'Procedura', href: 'procedura' },
    { name: 'Costi', href: 'costi' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToId(targetId);
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
          <div className="hidden md:flex space-x-8">
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
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
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