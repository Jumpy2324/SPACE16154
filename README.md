# SPACE16154 — c6f4749 + Functional Update

Base grafica e asset recuperati direttamente dal commit GitHub `c6f4749` (build Pages #188).

## Grafica
La base CSS, l'HTML strutturale e `logo.svg` provengono dal commit #188 originale.
Non è presente il redesign/mocked-up che era stato provato successivamente.

## Aggiornamenti funzionali
- navigazione: Dashboard / Matches / Analysis / Top Signals / Altro;
- Top Signals autonomo con filtri Tutti / Confidence / Value / Forma e campionato;
- Analysis integra classifica/squadre e profilo modello;
- Match Detail con 6 macroaree e spiegazione dei differenziali;
- Dati Tecnici snelliti: xG, xGA, Ultimo terzo, Qualità tiro, PPDA;
- Assenze principali;
- Informazioni partita: stadio, meteo, arbitro, ultimo incontro;
- Model Performance e Model Confidence dentro Altro;
- backend demo coerente:
  dati simulati → indicatori → normalizzazione 0–100 → macroaree → pesi → Model Score → probabilità → Confidence / Value / Forma → Top Signals;
- possibilità di nessun Top Signal se una soglia non viene superata.

## Pesi demo iniziali
Threat Creation 22%
Defense Stability 20%
Forma 20%
Opponent Strength 18%
Pressing / PPDA 14%
Availability / Assenze 6%

La calibrazione dei pesi resta congelata fino a 4–7 giornate reali sui cinque campionati.
