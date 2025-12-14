# Changelog

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

## [Unreleased]

### Aggiunto
- **Performance:** Implementato "Lazy Loading" (`loading="lazy"`) su tutte le immagini non critiche (Presentazione, Documenti, Procedura, Costi) per migliorare il caricamento iniziale della pagina (LCP) e ridurre il consumo di banda.
- **Refactoring Architetturale:** Suddivisione del componente `DocumentsChecklist` in sottocomponenti modulari (`ChecklistToggle`, `ChecklistItem`, `ResetConfirmModal`, `ChecklistDetailModal`).
- **Hook useChecklist:** Creazione di un custom hook dedicato (`useChecklist.ts`) per centralizzare la logica di business, la persistenza e il calcolo del progresso della checklist.
- **Robustezza Applicazione:** Introdotto componente `ErrorBoundary` per catturare errori imprevisti e prevenire crash dell'interfaccia.
- **Accessibilità Tastiera:** Aggiunto "Skip Link" nascosto per permettere agli utenti di saltare direttamente al contenuto principale.
- **Custom Hooks:** Creati hooks riutilizzabili `useLocalStorage` (per persistenza sicura) e `useScrollTo` (per navigazione fluida centralizzata).
- **Semantica Checkbox:** I controlli della checklist e i toggle ora usano input nativi `<input type="checkbox">` nascosti con etichette `<label>`, garantendo accessibilità a screen reader e navigazione da tastiera.
- **Accessibilità Modali:** Aggiunti attributi ARIA (`role="dialog"`, `aria-modal`) e listener per il tasto `Escape` su tutti i modali (JotForm e Checklist).

### Modificato
- **Type Safety LocalStorage:** Migliorata la gestione degli errori nel custom hook `useLocalStorage` per gestire correttamente i tipi di errore `unknown` nei blocchi try/catch.
- **Contrasto Header:** Aumentato il contrasto del testo secondario nell'hero section (da `text-blue-100` a `text-blue-50`) per migliorare la leggibilità sullo sfondo gradiente.
- **Pulizia Codice:** Rimossi alias e import ridondanti nel componente `ChecklistItem`.
- **Refactoring Checklist:** Riscritto `DocumentsChecklist` per utilizzare il nuovo hook di storage e `useMemo` per ottimizzare le performance di rendering.
- **Accessibilità Logo:** Il logo nella Navbar è stato convertito da `div` a `button` per essere accessibile tramite tastiera.
- **Responsive Menu:** Corretto bug dell'altezza massima del menu mobile che poteva tagliare le voci su schermi piccoli.
- **Immagini Responsive:** Ottimizzata l'altezza dell'immagine sticky nella sezione "Procedura" per adattarsi meglio a diverse risoluzioni.
- **Compilazione Online TT 2112:** Integrato un sistema modale con iframe per permettere agli utenti di compilare e scaricare il modello TT 2112 direttamente tramite JotForm, senza lasciare la pagina.
- **Pulsanti Azione TT 2112:** Ridisegnata la sezione di download del modello per includere due opzioni distinte: "Compila Online" (Primaria) e "Scarica PDF Vuoto" (Secondaria).
- **Modale Conferma Reset:** Implementata una finestra di dialogo personalizzata (Custom Modal) per la conferma del reset della checklist. Sostituisce il `window.confirm` nativo per garantire compatibilità con le preview sandboxed e migliorare la coerenza visiva.
- **Checklist Filtri:** Reso il pannello filtri della checklist sempre visibile e rimosso il meccanismo "accordion" per migliorare l'usabilità immediata.
- **Layout TT 2112:** Ottimizzato il box di download per forzare l'avviso di stampa su una singola riga e allineare il pulsante in alto.
- **Avviso Stampa TT 2112:** Inserito un badge informativo evidenziato nel box di download del Modello TT 2112 che raccomanda la stampa su fogli singoli (no fronte-retro).
- **CTA Modello TT 2112:** Trasformato il link per il download del modello TT 2112 in un box "Call-to-Action" evidente e accattivante per migliorare la UX.
- **CTA in Header:** Aggiunto pulsante "Prepara i Documenti" nell'hero section per migliorare la conversione e guidare l'utente. Migliorato sfondo con gradienti.
- **Feedback Successo Checklist:** Aggiunto un banner celebrativo verde che appare quando la checklist raggiunge il 100% di completamento.
- **Card Totale Costi:** Separato il totale dei costi dalla tabella e creato un componente "Summary Card" ad alto impatto visivo (Price Anchoring).
- **Footer Link:** Aggiunto link diretto al Portale dell'Automobilista.
- **Restyling Grafico:** Integrate immagini di alta qualità da Unsplash in tutte le sezioni principali (Presentazione, Documenti, Procedura, Costi) per migliorare l'engagement.
- **Layout Grid Avanzati:**
    - **Sezione Documenti:** Nuova struttura a due colonne su desktop con sidebar laterale contenente immagine motivazionale e box informativo sulle foto.
    - **Sezione Procedura:** Layout a due colonne con immagine "sticky" (prospettiva di guida) che accompagna lo scorrimento degli step.
    - **Sezione Costi:** Layout a due colonne con immagine illustrativa accanto alla tabella dei prezzi.
- **Sezione Presentazione Arricchita:** Aggiunta immagine header alla card delle modalità e immagine decorativa per la sezione pagamenti.
- **Checklist Dinamica (Minori & Extra-UE):** Aggiornata la sezione checklist per escludere di default i documenti opzionali (Permesso di Soggiorno, Documenti Tutore).
- **Pannello "Personalizza la tua lista":** Aggiunti 3 interruttori (Toggle) sopra la checklist per attivare i documenti per Extracomunitari, Minorenni e Delegati.
- **Badge Informativi:** Aggiunti badge visivi colorati nella lista documenti per identificare rapidamente quelli aggiunti dalle opzioni di personalizzazione.
- **Barra di Navigazione Sticky:** Menu di navigazione fisso in alto.
- **Smooth Scrolling Custom:** Implementazione di uno scorrimento fluido.
- **Sistema Modal:** Finestra modale per dettagli documenti.
- **Persistenza Dati:** Utilizzo di `localStorage` esteso anche alle preferenze di personalizzazione (Minore/Extra-UE).
- **Sezione Delegati Migliorata:** Aggiunto un header visivo, icone dedicate e indentazione ("sottovoci") per i documenti relativi alla delega.

### Corretto
- **Gestione Errori LocalStorage:** L'hook `useLocalStorage` ora gestisce correttamente errori di parsing JSON e ambienti SSR.
- Risolto problema UX dove gli utenti non potevano raggiungere il 100% di completamento senza spuntare documenti non necessari (es. Permesso di Soggiorno per cittadini UE).
- **Correzione Testuale Presentazione:** Rimossa la menzione errata alle "agenzie di pratiche auto" per la presentazione della domanda. Per il conseguimento della patente, sono abilitate solo le autoscuole.
- **Correzione Step 3 (Teoria):** Aggiornata la descrizione per chiarire che dopo l'esame di teoria è necessario rivolgersi ad un'autoscuola per il rilascio del Foglio Rosa e le guide obbligatorie.