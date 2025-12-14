# Changelog

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

## [Unreleased]

### Aggiunto
- **CTA in Header:** Aggiunto pulsante "Prepara i Documenti" nell'hero section per migliorare la conversione e guidare l'utente. Migliorato sfondo con gradienti.
- **Feedback Successo Checklist:** Aggiunto un banner celebrativo verde che appare quando la checklist raggiunge il 100% di completamento.
- **Card Totale Costi:** Separato il totale dei costi dalla tabella e creato un componente "Summary Card" ad alto impatto visivo (Price Anchoring).
- **Link Download Modello TT 2112:** Inserito link diretto al PDF ufficiale del Portale dell'Automobilista nella sezione "Modalità di Presentazione".
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

### Modificato
- **UI Settings Checklist:** Ridisegnato il pannello filtri della checklist per renderlo più chiaro e integrato.
- Refactoring completo `DocumentsChecklist` per gestire layout responsive (Grid) e logica complessa.
- Riorganizzazione della sezione Documenti per spostare l'info box delle foto nella sidebar su desktop.
- Aggiornata la logica di calcolo della percentuale di completamento per riflettere solo i documenti pertinenti alla selezione dell'utente.
- Spostati i documenti specifici in liste separate nel file `constants.tsx`.

### Corretto
- Risolto problema UX dove gli utenti non potevano raggiungere il 100% di completamento senza spuntare documenti non necessari (es. Permesso di Soggiorno per cittadini UE).