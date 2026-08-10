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


## Aggiornamento modello — 1.3.0-model

Questa versione mantiene la grafica della build #188 e aggiunge:
- backend demo matematicamente coerente;
- catena dati simulati → indicatori → normalizzazione → macroaree → pesi → Model Score → probabilità → segnali;
- sei macroaree e spiegazione del differenziale nel Match Detail;
- Dati Tecnici snelliti: xG, xGA, Ultimo terzo, Qualità tiro, PPDA;
- Assenze Principali e Informazioni Partita;
- Analysis con campionati, classifica/squadre e profilo modello;
- Top Signals autonomo con filtri Tipo e Campionato e riepilogo giornaliero;
- Model Performance e Model Confidence dentro Altro;
- possibilità di nessun segnale quando le soglie non sono superate.

Pesi demo iniziali: Threat 22%, Defense 20%, Forma 20%, Opponent Strength 18%, Pressing/PPDA 14%, Assenze 6%.
La calibrazione resta congelata fino a 4–7 giornate reali per tutti i campionati.
