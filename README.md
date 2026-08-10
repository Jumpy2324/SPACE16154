# SPACE16154 — Flat reset test

Build `20260810-0606-flat1`

Tutti i file sono nella root del repository:
- index.html
- styles.css
- app.js
- cache-reset.html
- sw.js

Nessuna cartella assets.
Nessun nome CSS/JS con hash.
Nessun manifest.
Nessuna PWA attiva.

## Test
1. Carica tutti i file nella root del repository.
2. Apri `cache-reset.html`.
3. Dopo il redirect devi vedere una schermata nera/oro con:
   `BUILD 20260810-0606-flat1`
   e la scritta verde:
   `NUOVA BUILD CARICATA CORRETTAMENTE`

Se compare, il problema cache/percorso è risolto e si può tornare a costruire il mockup vero.
