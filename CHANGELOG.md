# Changelog

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

## [Unreleased]

### Environment & Workflow
- **Gestione Anteprima AI Studio:** Identificato il comportamento automatico dell'ambiente di preview che inietta script `importmap` in `index.html`.
  - *Azione:* Rimozione manuale dello script prima del commit.
  - *Nota Tecnica:* Questo comportamento non è disabilitabile lato configurazione progetto, ma deve essere gestito mantenendo pulito il codice sorgente per la build di produzione (Cloud Run/Vite).

### Quality Assurance & Testing (Fase 4 - Consolidamento)
- **Fix Critico Index:** Rimossa nuovamente e definitivamente la sezione `<script type="importmap">` da `index.html`. Analisi confermata: non esistono script interni al progetto che rigenerano questo blocco; la sua ricomparsa è probabilmente dovuta a configurazioni dell'ambiente di sviluppo esterno o plugin dell'editor.
- **Ambiente di Test:** Aggiornato `vite.config.ts` per configurare correttamente l'ambiente `jsdom` per Vitest, abilitando il testing dei componenti React.
- **Nuovi Test Unitari:**
    - **LanguageContext:** Creata suite di test completa per verificare la logica di traduzione, il fallback delle chiavi e la persistenza della lingua.
    - **Header Component:** Aggiunti test per verificare il rendering corretto dei testi e l'integrazione con lo scroll (mocked).
    - **Navbar Component:** Aggiunti test per la navigazione, il cambio lingua e l'interazione con il logo.
- **Copertura:** Aumentata significativamente la copertura dei test sui componenti "core" dell'interfaccia.

### Environment & Config
- **Ripristino Configurazioni:** Rigenerati i file `.prettierrc`, `.lintstagedrc` e `.husky/pre-commit` per garantire la stabilità dell'ambiente di sviluppo.

### Fix & Code Hygiene (Fase 1 - Completamento)
- **Configurazione Code Quality:** Creati e configurati `.prettierrc` e `.lintstagedrc` per standardizzare lo stile del codice e ottimizzare i commit.
- **Husky Hook:** Aggiunto script `.husky/pre-commit` per automatizzare i controlli di qualità (ESLint + Prettier) prima di ogni commit.

### Code Hygiene & Infrastruttura (Fase 1 - Iniziale)
- **Configurazione Prettier:** Creato file `.prettierrc` con regole di formattazione standard (single quote, no semi, trailing comma es5) per garantire coerenza stilistica.
- **Configurazione Lint-Staged:** Creato `.lintstagedrc` per eseguire ESLint e Prettier solo sui file in staging, ottimizzando i tempi di commit.
- **Git Hooks:** Implementato hook `.husky/pre-commit` per automatizzare i controlli di qualità prima di ogni commit.
- **Documentation:** Aggiornato `README.md` con i nuovi comandi di sviluppo (`npm run format`, `npm run lint`) e spiegazione del workflow di qualità.

### Developer Experience & Code Hygiene (Fase 4 - Precedente)
- **Infrastruttura di Quality Assurance:** Configurato un ambiente di sviluppo professionale per garantire la qualità del codice a lungo termine.
- **ESLint Standard:** Aggiunta configurazione `.eslintrc.json` con regole rigorose per TypeScript, React Hooks e, soprattutto, **Accessibilità (jsx-a11y)**.
- **Prettier:** Introdotto `.prettierrc` per garantire una formattazione del codice coerente tra diversi sviluppatori.
- **Husky & Lint-Staged:** Implementati Git Hooks che impediscono il commit di codice che non rispetta le regole di linting o che contiene errori di tipo.
- **Package Scripts:** Aggiornato `package.json` con script dedicati (`lint`, `format`, `type-check`) e organizzate le dipendenze spostando i tool di testing e build in `devDependencies`.

### Quality Assurance (Fase 3: Testing Componenti)
- **Unit Testing UI:** Implementati test completi per i componenti critici dell'interfaccia utilizzando `Vitest` e `React Testing Library`.
- **ChecklistItem Tests:** 
    - Verifica del rendering condizionale dei badge (Extra-UE, Minore, Delegato).
    - Verifica delle interazioni utente (Toggle click).
    - Verifica della formattazione visiva (testo barrato al completamento).
- **ChecklistToggle Tests:** Verifica del cambio di stato e della renderizzazione corretta delle icone.
- **CostsSection Tests:** Verifica della corretta visualizzazione della tabella prezzi e del calcolo totale.
- **Mocking Contesto:** Implementata strategia di mocking per `LanguageContext` per isolare i test UI dalla logica di traduzione e persistenza.

### Funzionalità (Fase 2: Internazionalizzazione)
- **Supporto Multi-lingua (i18n):** Implementata l'intera infrastruttura per il supporto multilingua.
    - Creazione `LanguageContext` per la gestione dello stato globale della lingua.
    - Aggiunto hook `useTranslation` per il consumo delle traduzioni nei componenti.
    - Aggiunti file di localizzazione `it.ts` e `en.ts` con dizionari completi.
    - Persistenza della preferenza lingua tramite `localStorage`.
- **UI Language Switcher:**
    - Aggiunto pulsante toggle nella Navbar (desktop e mobile) per passare istantaneamente da Italiano a Inglese.
    - Icona mondo/globo per identificare chiaramente la funzionalità.
- **Refactoring Dati:**
    - Aggiornato `constants.tsx` rimuovendo i testi hardcoded e sostituendoli con chiavi di traduzione (`titleKey`, `descriptionKey`, ecc.).
    - Aggiornati i tipi TypeScript in `types.ts` per riflettere la nuova struttura basata su chiavi.
- **Localizzazione Completa:**
    - Tutte le sezioni (Header, Presentazione, Step, Costi, Checklist, Modali, Footer) ora reagiscono dinamicamente al cambio lingua.
    - Gestione di testi complessi (HTML/Bold) tramite composizione o `dangerouslySetInnerHTML` controllato.

### Fix Critici (Fase 1)
- **Service Worker Registration (Fix Definitivo):**
  - Semplificata la chiamata di registrazione a `navigator.serviceWorker.register('service-worker.js')`.
  - Rimosso qualsiasi tentativo di costruire URL assoluti o usare percorsi con `./`. L'uso del filename diretto delega la risoluzione al browser, garantendo che l'origine sia sempre identica a quella della pagina (risolvendo "Script origin does not match") ed evitando errori di parsing URL.
  - Spostata la registrazione all'evento `window.load` per migliorare le performance di caricamento iniziale della pagina.

### PWA Engagement & UX (Fase 1)
- **Installazione In-App:** Aggiunto un banner discreto ("Toast") che appare sui dispositivi compatibili per invitare l'utente a installare l'app come PWA. Scompare se l'utente lo chiude o installa l'app.
- **Gestione Aggiornamenti:** Implementato un sistema di notifica aggiornamenti. Quando il Service Worker rileva una nuova versione, appare un banner in alto con un pulsante "Aggiorna Ora" che ricarica l'app in modo sicuro.
- **Celebrazione Checklist:** Aggiunto un effetto "Coriandoli" (Confetti) che si attiva automaticamente quando l'utente completa il 100% della checklist documenti, aumentando la gratificazione (Gamification).
- **Service Worker Refactor:** Migrata la logica di registrazione del Service Worker da `index.tsx` a un custom hook `useServiceWorker` per gestire lo stato reattivo dell'interfaccia.
- **Strategia Cache:** Aggiornato `service-worker.js` per non forzare l'attivazione immediata (`skipWaiting`), permettendo all'utente di finire la sessione corrente prima di aggiornare.

### UX Improvements
- **Link Portale Automobilista:** Trasformato il box decorativo statico nella sezione "Versamenti PagoPA" in una "Action Card" funzionale.
    - Ora è un link cliccabile che porta direttamente al sito ufficiale (Portale dell'Automobilista) per effettuare i pagamenti.
    - Aggiunto un gradiente di sfondo (Blue 600-800) come fallback estetico nel caso in cui l'immagine di sfondo non venga caricata (risolve il problema dello sfondo grigio vuoto).
    - Aggiunte icone e call-to-action ("Accedi al Portale") per rendere chiara la funzione.

### Fix Critici (Post-Review)
- **UI Bugfix PagoPA:** Rimossa l'altezza forzata (`h-full`) e l'espansione automatica (`flex-grow`) dalla card "Versamenti PagoPA". Questo eliminava lo spazio bianco vuoto eccessivo visibile quando la colonna adiacente ("Modalità di Presentazione") era molto più lunga. La card ora si adatta naturalmente al proprio contenuto.
- **Entry Point:** Aggiunto il tag script mancante in `index.html` per caricare l'applicazione React (`index.tsx`). Senza questo, l'app mostrava una pagina bianca.
- **Animazioni:** Risolto problema con classi di animazione "phantom" (`animate-in`, `fade-in`, etc.) che dipendevano da un plugin non presente.
    - Definiti keyframes standard (`fade-in`, `zoom-in`, `slide-in`) direttamente nella configurazione Tailwind in `index.html`.
    - Aggiornati tutti i componenti modali e la checklist per utilizzare le nuove classi standard (`animate-fade-in`, `animate-zoom-in`).

### Aggiunto
- **Design System Animation:** Aggiunta animazione custom `fade-in-down` in `tailwind.config` per rendere funzionante l'entrata dell'icona nell'Header.
- **Offline Ready (Service Worker):** Implementato un Service Worker (`service-worker.js`) che abilita il funzionamento offline dell'applicazione.
    - Strategia **Network-First** per la shell HTML (assicura che l'app si aggiorni quando c'è rete).
    - Strategia **Cache-First** per asset pesanti (immagini Unsplash, font, librerie CDN) per prestazioni fulminee.
    - Registrazione automatica all'avvio in `index.tsx`.
- **Design System Standard:** Centralizzata la configurazione delle animazioni in `tailwind.config` (dentro `index.html`).
    - Default Transition: **300ms** (Interfaccia, Bottoni, Hover)
    - Slow Transition: **500ms** (Barre di progresso, Pannelli grandi)
    - Cinematic Transition: **700ms** (Immagini, Effetti di sfondo)
    - Standard Curve: `cubic-bezier(0.4, 0, 0.2, 1)` per un feeling fluido e professionale.
- **TypeScript Strict Mode:** Attivata la modalità rigorosa (`"strict": true`) nel `tsconfig.json`. Questo include controlli avanzati come `strictNullChecks` e `noImplicitAny` per prevenire bug a runtime e garantire la massima qualità del codice come richiesto dal report di analisi.
- **Unit Testing:** Creata suite di test completa per `useChecklist.ts` utilizzando Vitest e React Testing Library. Copertura test per logica filtri, persistenza localStorage, calcolo progresso e reset.
- **PWA (Progressive Web App):** Aggiunto file `manifest.json` e configurazioni meta per rendere l'applicazione installabile su dispositivi desktop e mobile ("Aggiungi a schermata Home").
- **SEO Optimization:** Implementati meta tag completi (`description`, `keywords`, `author`) nell'`index.html` per migliorare l'indicizzazione sui motori di ricerca.
- **Social Sharing (Open Graph):** Aggiunti protocolli Open Graph (Facebook/LinkedIn) e Twitter Card per generare anteprime ricche (con immagini e descrizioni personalizzate) quando il link viene condiviso.
- **Performance:** Implementato "Lazy Loading" (`loading="lazy"`) su tutte le immagini non critiche (Presentazione, Documenti, Procedura, Costi) per migliorare il caricamento iniziale della pagina (LCP) e ridurre il consumo di banda.
- **Refactoring Architetturale:** Suddivisione del componente `DocumentsChecklist` in sottocomponenti modulari (`ChecklistToggle`, `ChecklistItem`, `ResetConfirmModal`, `ChecklistDetailModal`).
- **Hook useChecklist:** Creazione di un custom hook dedicato (`useChecklist.ts`) per centralizzare la logica di business, la persistenza e il calcolo del progresso della checklist.
- **Robustezza Applicazione:** Introdotto componente `ErrorBoundary` per catturare errori imprevisti e prevenire crash dell'interfaccia.
- **Accessibilità Tastiera:** Aggiunto "Skip Link" nascosto per permettere agli utenti di saltare direttamente al contenuto principale.
- **Custom Hooks:** Creati hooks riutilizzabili `useLocalStorage` (per persistenza sicura) e `useScrollTo` (per navigazione fluida centralizzata).
- **Semantica Checkbox:** I controlli della checklist e i toggle ora usano input nativi `<input type="checkbox">` nascosti con etichette `<label>`, garantendo accessibilità a screen reader e navigazione da tastiera.
- **Accessibilità Modali:** Aggiunti attributi ARIA (`role="dialog"`, `aria-modal`) e listener per il tasto `Escape` su tutti i modali (JotForm e Checklist).

### Modificato
- **Design System Enforcement:** Aggiornati `PresentationSection` e `CostsSection` per utilizzare il token `duration-cinematic` (700ms) al posto di valori manuali, garantendo coerenza visiva al 100%.
- **Entry Point:** Aggiornato `index.tsx` per registrare il Service Worker al caricamento della pagina.
- **Standardizzazione Componenti:** Aggiornati `Navbar`, `DocumentsChecklist` e sottocomponenti (`ChecklistItem`, `ChecklistToggle`, `ResetConfirmModal`) per utilizzare le nuove durate standard (300ms/500ms/700ms) eliminando le transizioni incoerenti.
- **Index HTML:** Ristrutturato l'`head` del documento per includere i riferimenti al manifest, icone Apple Touch, theme-color e metadati social.
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