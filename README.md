# Patente Facile - Guida Interattiva

**Patente Facile** è una landing page moderna e interattiva progettata per guidare gli utenti attraverso il processo burocratico per il conseguimento della patente di guida B in Italia.

L'applicazione offre una panoramica chiara dei costi, dei passaggi necessari e fornisce una checklist interattiva per tracciare i documenti raccolti.

## Funzionalità Principali

*   **Progressive Web App (PWA):** L'applicazione è installabile su dispositivi mobili e desktop, funziona a schermo intero e offre un'esperienza nativa.
*   **Guida Passo-Passo:** Una visualizzazione chiara dei 4 step fondamentali (Visita Medica, Domanda, Teoria, Pratica).
*   **Gestione Modulo TT 2112:**
    *   **Compilazione Online:** Integrazione via modale con JotForm per compilare il modulo burocratico direttamente dal browser.
    *   **Download PDF:** Possibilità di scaricare il modello vuoto ufficiale.
*   **Checklist Documenti Dinamica:**
    *   **Personalizzazione:** Pannello di configurazione per aggiungere automaticamente i documenti necessari in base al profilo utente:
        *   **Minorenni:** Aggiunge documento del genitore/tutore.
        *   **Cittadini Extra-UE:** Aggiunge permesso di soggiorno.
        *   **Delegato:** Aggiunge documenti per la delega.
    *   **Progresso Reale:** Il completamento al 100% è calcolato solo sui documenti pertinenti al profilo selezionato.
    *   **Salvataggio Dati:** Utilizzo di Custom Hooks per salvare progressi e preferenze nel browser (LocalStorage) in modo sicuro.
    *   **Sistema Modali Custom:** Finestre popup integrate nel design per visualizzare dettagli e conferme.
*   **SEO & Social Sharing:** Ottimizzata per i motori di ricerca con meta tag avanzati e supporto Open Graph per anteprime ricche sui social network.
*   **Accessibilità e UX:**
    *   Navigazione completa da tastiera (Tab, Esc, Enter).
    *   Attributi ARIA corretti per screen reader.
    *   Checkbox e Toggle semantici.
    *   Skip Link per accesso rapido ai contenuti.
*   **Robustezza:**
    *   **Error Boundary:** Protezione contro crash imprevisti dell'applicazione.
    *   **Performance:** Ottimizzazione rendering tramite `useMemo`, `useCallback` e lazy loading delle immagini.
*   **Navigazione Intelligente:** Barra di navigazione fissa (Sticky) con scorrimento fluido (Smooth Scroll).
*   **Tabella Costi:** Un riepilogo chiaro e trasparente dei costi fissi PagoPA.
*   **Design Responsivo:** Ottimizzato per dispositivi mobili e desktop utilizzando Tailwind CSS.

## Tecnologie Utilizzate

*   **React:** Libreria principale per l'interfaccia utente.
*   **Tailwind CSS:** Framework CSS utility-first.
*   **Lucide React:** Libreria di icone vettoriali.
*   **LocalStorage API:** Per la persistenza dei dati.
*   **PWA Manifest:** Per l'installabilità dell'applicazione.
*   **Vite:** Build tool rapido e leggero.
*   **TypeScript:** Superset tipizzato di JavaScript.

## Struttura del Progetto

*   `src/index.tsx`: Entry point.
*   `src/App.tsx`: Layout principale con Error Boundary.
*   `src/components/`: Componenti modulari.
    *   `src/components/checklist/`: Sottocomponenti ottimizzati per la checklist.
*   `src/hooks/`: Custom Hooks (useChecklist, useLocalStorage, useScrollTo).
*   `src/constants.tsx`: Dati statici (testi, costi, documenti).
*   `src/types.ts`: Definizioni TypeScript.
*   `manifest.json`: Configurazione PWA.

## Installazione e Avvio

1.  Assicurati di avere Node.js installato.
2.  Installa le dipendenze: `npm install`
3.  Avvia il server di sviluppo: `npm run dev`

## Qualità del Codice e Sviluppo

Il progetto include strumenti preconfigurati per garantire la qualità del codice (Code Hygiene).

### Comandi Disponibili

*   **Linting:** `npm run lint` - Analizza il codice alla ricerca di errori e problemi di stile.
*   **Fix automatico:** `npm run lint:fix` - Corregge automaticamente i problemi risolvibili.
*   **Formattazione:** `npm run format` - Formatta tutto il codice secondo le regole Prettier.
*   **Type Check:** `npm run type-check` - Verifica la correttezza dei tipi TypeScript senza generare build.
*   **Test:** `npm run test` - Esegue la suite di unit test con Vitest.

### Git Hooks (Husky)

Prima di ogni commit, vengono eseguiti automaticamente:
1.  **Prettier**: Formattazione dei file modificati.
2.  **ESLint**: Controllo qualità sui file modificati.

Se questi controlli falliscono, il commit viene bloccato per prevenire l'inserimento di codice non conforme.

## Licenza

Questo progetto è rilasciato sotto licenza MIT. I dati relativi alla Motorizzazione Civile sono a scopo puramente informativo e basati sulla normativa vigente al 2024.