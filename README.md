# SPACE16154 — V1.1 Repository

Mobile-first demo frontend for the SPACE16154 football intelligence project.

## Included
- Dashboard
- Matches with readable mobile cards
- Match detail: model probabilities, 6 macro areas, technical comparison, absences and match info
- Analysis: league table, team detail and Trend Model Score
- Top Signals: dedicated section with Confidence / Value / Forma and league filters
- More: Model Performance and Model Confidence
- Demo backend logic embedded in `app.js`
- SPACE16154 planet/football visual identity
- PWA manifest and versioned service worker

## Cache
Service worker cache is `space16154-v1.1.0`. Old cache keys are deleted on activation. Assets are versioned with `?v=1.1.0` so a deployment does not keep the previous UI.

## Important
The demo numbers are synthetic. Sportmonks integration will replace the data layer later; the UI and model concepts remain separate from the provider.
