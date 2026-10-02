# TruePas App 7 — UI redesign

Design-only demo of the redesigned TruePas mobile app, matching the look of truepas.com
(sky gradient, `#007AFF` blue, glass surfaces, Inter).

- `prototype/index.html` — clickable phone preview of all 15 screens. Full screen on a phone
  (swipe or side arrows to move between screens); iPhone frame with a screen list on desktop.
  Open it directly in a browser.
- `prototype/build.js` — rebuilds `index.html` from `prototype/shell.html` and the screens in
  `project/` (`node prototype/build.js`).
- `project/` — the design canvas source: one `.dc.html` file per screen plus `canvas.json`.

All names and numbers in the screens are sample data.
