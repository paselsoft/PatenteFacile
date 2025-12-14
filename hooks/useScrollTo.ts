import { useCallback } from 'react';

export const useScrollTo = (headerOffset: number = 80) => {
  const scrollToId = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        
        // Gestione focus per accessibilità dopo lo scroll
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
    }
  }, [headerOffset]);

  return scrollToId;
};