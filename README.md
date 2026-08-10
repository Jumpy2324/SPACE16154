# FOOTBALL16154 — CACHE RESET PACKAGE

Build: `20260810-0542-reset1`

Questo pacchetto serve a eliminare definitivamente il vecchio Service Worker/cache prima di continuare con la replica pixel-perfect.

## Come usarlo
1. Sostituisci/carica TUTTI i file di questo ZIP nella root del repository.
2. Dopo il deploy, apri UNA VOLTA `cache-reset.html` sul sito.
3. La pagina elimina tutti i Service Worker e tutte le Cache Storage disponibili, poi apre automaticamente:
   `index.html?build=20260810-0542-reset1`
4. In alto a destra deve comparire la scritta verde:
   `BUILD 20260810-0542-reset1`
5. Finché stiamo sistemando la grafica, NON registriamo alcun nuovo Service Worker.

## Perché funziona
- `cache-reset.html` ha un nome nuovo, quindi il vecchio cache-first service worker non dovrebbe averlo già in cache.
- CSS e JS hanno nomi unici legati alla build, non semplici query string.
- `sw.js` è stato sostituito da un worker di reset che cancella le vecchie cache e poi si disinstalla.
- `index.html` cancella nuovamente service worker e cache come ulteriore sicurezza.

Quando vediamo la build nuova correttamente, torniamo a lavorare sul mockup 1:1.
