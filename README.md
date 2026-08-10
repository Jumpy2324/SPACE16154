# SPACE16154 — PRE-03:02 GRAPHICS + FUNCTIONAL UPDATE

Base grafica: `SPACE16154_V4_0_CACHE_BUST_UPDATE.zip`, l'ultimo ramo grafico pre-03:02 identificato come riferimento buono.

La grafica nuova/mockup successiva NON è inclusa.
Non esiste `logo.svg` in questo pacchetto.

Aggiornamenti:
- Dashboard invariata nel linguaggio visivo pre-03:02.
- Bottom nav: Dashboard / Matches / Analisi / Top Signals / Altro.
- Squadre assorbite dentro Analisi.
- Top Signals autonomo con filtri tipo e campionato.
- Match Detail con 6 macroaree, differenziali e Model Score.
- Dati tecnici snelliti: xG, xGA, Ultimo terzo, Qualità tiro, PPDA.
- Assenze principali.
- Informazioni partita: stadio, meteo, arbitro, ultimo incontro.
- Model Performance e Model Confidence dentro Altro.
- Backend demo coerente:
  dati simulati -> normalizzazione 0-100 -> macroaree -> pesi -> score -> probabilità -> Confidence/Value/Forma -> segnali.
- Nessun segnale viene creato se le soglie non vengono superate.
- Pesi congelati fino a 4–7 giornate reali.

Pesi iniziali:
Threat 22% · Defense 20% · Forma 20% · Opponent Strength 18% · Pressing 14% · Availability 6%.
