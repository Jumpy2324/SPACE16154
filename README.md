# SPACE16154 — Football Intelligence

Repository demo V1 mobile-first.

## Struttura
- `index.html` — shell e cache-busting asset version.
- `styles.css` — interfaccia mobile-first nero/oro.
- `app.js` — demo backend/model + rendering frontend.
- `logo.svg` — logo SPACE16154 (pallone-pianeta).
- `manifest.webmanifest` — predisposizione PWA/app installabile.
- `sw.js` — service worker con cache versionata e network-first.

## Demo model
I dati grezzi sono raccolti in `RAW_TEAMS`; le sei macroaree vengono derivate dagli indicatori e il Model Score applica i pesi definiti in `WEIGHTS`. Le probabilità 1X2, Under/Over e Gol/No Gol derivano dal Model Score e dagli input del modello.

## Sportmonks
Quando sarà disponibile il pacchetto Sportmonks, sostituire gli input del demo backend con un adapter API mantenendo invariata la struttura del frontend.

## Nota cache
La versione asset è `1.0.0` e il service worker usa la cache `space16154-v1`. A ogni release va incrementata la versione in `index.html`, `app.js` e `sw.js`/CACHE per evitare asset obsoleti.
