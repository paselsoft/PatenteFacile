# Patente Facile - Guida Interattiva

**Patente Facile** è una landing page moderna e interattiva progettata per guidare gli utenti attraverso il processo burocratico per il conseguimento della patente di guida B in Italia.

L'applicazione offre una panoramica chiara dei costi, dei passaggi necessari e fornisce una checklist interattiva per tracciare i documenti raccolti.

## Funzionalità Principali

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
    *   Salvataggio automatico dei progressi e delle preferenze nel browser (LocalStorage).
    *   **Sistema Modali Custom:** Finestre popup integrate nel design (non native del browser) per visualizzare i dettagli dei documenti e confermare azioni critiche come il reset della lista.
*   **Navigazione Intelligente:** Barra di navigazione fissa (Sticky) con scorrimento fluido (Smooth Scroll).
*   **Tabella Costi:** Un riepilogo chiaro e trasparente dei costi fissi PagoPA.
*   **Design Responsivo:** Ottimizzato per dispositivi mobili e desktop utilizzando Tailwind CSS.

## Tecnologie Utilizzate

*   **React:** Libreria principale per l'interfaccia utente.
*   **Tailwind CSS:** Framework CSS utility-first.
*   **Lucide React:** Libreria di icone vettoriali.
*   **LocalStorage API:** Per la persistenza dei dati.

## Struttura del Progetto

*   `src/index.tsx`: Entry point.
*   `src/App.tsx`: Layout principale.
*   `src/components/`: Componenti modulari.
*   `src/constants.tsx`: Dati statici (testi, costi, documenti).
*   `src/types.ts`: Definizioni TypeScript.

## Installazione e Avvio

1.  Assicurati di avere Node.js installato.
2.  Installa le dipendenze: `npm install`
3.  Avvia: `npm start`

## Licenza

Questo progetto è rilasciato sotto licenza MIT. I dati relativi alla Motorizzazione Civile sono a scopo puramente informativo e basati sulla normativa vigente al 2024.