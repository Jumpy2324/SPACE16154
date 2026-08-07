# SPACE16154 V4

Questa versione migliora il progetto in due direzioni:

## Grafica / UX
- dashboard più leggibile su smartphone;
- gerarchia visiva più forte;
- menu laterale funzionante;
- navigazione reale tra Dashboard, Match Day, Analisi, Squadre e Altro;
- filtri partita;
- schermata analisi con spiegazione del segnale;
- stato motore e qualità del dataset;
- responsive per schermi piccoli;
- service worker con cache versionata per evitare i problemi di aggiornamento di GitHub Pages.

## Analitica
La UI non confonde più **probabilità** e **confidence**.
Il motore demo calcola separatamente:
- probabilità 1X2;
- probabilità Goal;
- probabilità Over 2.5;
- confidence/convergenza degli indicatori;
- edge indicativo;
- fair probability.

Il codice è volutamente modulare: `DATA.matches` è il punto in cui collegare il provider dati reale.

## Per una V4 realmente predittiva
Servono:
1. provider API per fixture e statistiche;
2. storico risultati;
3. xG/xGA e split casa/trasferta;
4. assenze/infortuni/squalifiche;
5. quote pre-match;
6. calibrazione probabilità;
7. backtesting con Brier Score e Log Loss;
8. monitoraggio della performance del modello nel tempo.

**Importante:** i numeri inclusi nella V4 sono dati dimostrativi e non devono essere interpretati come previsioni reali.


## V4 — UI/UX and analysis improvements
- Removed the redundant hamburger navigation on mobile; bottom navigation is now the primary navigation.
- Dashboard KPI cards are interactive: Matches, Signals/Analysis, Confidence and Data Quality.
- Matches are grouped by league; the old “Tutte” filter is gone.
- Top Signals now use consistent badges: Alta Convergenza and/or Value/Edge.
- Analysis screen redesigned around probability, confidence, convergence, edge, explanatory factors, comparison data and data quality.
- Fixed the visible numeric formatting issue such as `1.71.2f`.
- Added a clearer roadmap for real-data integration, calibration and backtesting.
