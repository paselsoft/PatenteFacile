# Changelog

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

## [Unreleased]

### Aggiunto
- **Checklist Dinamica (Minori & Extra-UE):** Aggiornata la sezione checklist per escludere di default i documenti opzionali (Permesso di Soggiorno, Documenti Tutore).
- **Pannello "Personalizza la tua lista":** Aggiunti 3 interruttori (Toggle) sopra la checklist per attivare i documenti per Extracomunitari, Minorenni e Delegati.
- **Badge Informativi:** Aggiunti badge visivi colorati nella lista documenti per identificare rapidamente quelli aggiunti dalle opzioni di personalizzazione.
- **Barra di Navigazione Sticky:** Menu di navigazione fisso in alto.
- **Smooth Scrolling Custom:** Implementazione di uno scorrimento fluido.
- **Sistema Modal:** Finestra modale per dettagli documenti.
- **Persistenza Dati:** Utilizzo di `localStorage` esteso anche alle preferenze di personalizzazione (Minore/Extra-UE).

### Modificato
- Refactoring completo `DocumentsChecklist` per gestire liste dinamiche concatenate.
- Aggiornata la logica di calcolo della percentuale di completamento per riflettere solo i documenti pertinenti alla selezione dell'utente.
- Spostati i documenti specifici in liste separate nel file `constants.tsx`.

### Corretto
- Risolto problema UX dove gli utenti non potevano raggiungere il 100% di completamento senza spuntare documenti non necessari (es. Permesso di Soggiorno per cittadini UE).