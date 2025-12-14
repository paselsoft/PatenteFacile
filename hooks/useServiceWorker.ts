import { useState, useEffect, useCallback } from 'react';

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  // Funzione per aggiornare il Service Worker
  const updateServiceWorker = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [waitingWorker]);

  useEffect(() => {
    // Verifica supporto SW
    if (!('serviceWorker' in navigator)) return;

    const registerSW = async () => {
      try {
        // Utilizziamo il percorso relativo semplice 'service-worker.js' (senza ./ o costruzioni assolute).
        // Il browser risolverà questo percorso rispetto all'URL della pagina corrente.
        // Questo approccio è il più robusto perché:
        // 1. Garantisce che l'origine dello script coincida con la pagina (risolve "Origin Mismatch").
        // 2. Evita errori di parsing URL specifici di alcuni ambienti con "./".
        // 3. Lascia che il browser gestisca automaticamente lo scope di default (la directory dello script).
        const registration = await navigator.serviceWorker.register('service-worker.js');
        
        console.log('[Service Worker] Registered successfully');

        // Controlla se c'è un SW in attesa (aggiornamento scaricato ma non attivato)
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setIsUpdateAvailable(true);
        }

        // Ascolta nuovi aggiornamenti
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nuovo contenuto disponibile, si prega di ricaricare
                setWaitingWorker(newWorker);
                setIsUpdateAvailable(true);
              }
            });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    // Ritarda la registrazione per non impattare il caricamento iniziale
    window.addEventListener('load', () => {
        registerSW();
    });

    // Ascolta il cambio di controller (quando il nuovo SW prende il controllo)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });

  }, []);

  return { isUpdateAvailable, updateServiceWorker };
};