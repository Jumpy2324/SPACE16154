# SPACE16154 — V1.2

Ricostruzione del frontend mobile-first sulla base delle decisioni concordate.

## Struttura
- Dashboard: Match in evidenza, Top Signals sintetici, prossime partite.
- Matches: elenco/consultazione; il dettaglio apre l'analisi completa.
- Analysis: classifica Model Score, dettaglio squadra e Trend Model Score.
- Top Signals: sezione dedicata con filtri Tutti / Confidence / Value / Forma e campionato.
- Altro: Model Performance, Model Confidence e metodologia.
- Dettaglio partita: Probabilità del modello → Analisi del modello (6 macroaree) → Dati tecnici → Assenze → Informazioni partita.

## Logica demo
I dati sono sintetici ma il Model Score e le macroaree sono strutturati come livelli distinti: il frontend visualizza i valori derivati dal modello demo. La fonte Sportmonks verrà collegata successivamente e non sarà la "legge" del modello: i dati saranno rielaborati dalla nostra logica.

## Identità
Logo pallone/pianeta dorato e nome SPACE16154. Colori principali nero/oro; Confidence verde, Value arancione, Forma blu; probabilità più alte e risultati evidenziati in verde.

## Cache
Cache service worker `space16154-v1.2.0`; in activation vengono rimosse le versioni precedenti. Asset CSS/JS sono versionati `v=1.2.0`.
