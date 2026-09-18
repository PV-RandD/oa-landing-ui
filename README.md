# OpenAssets — Open Rails landing page

A responsive, single-page landing page using the selected Open Rails art direction. Run locally with:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No package installation or build step is required. The initial concept comparison remains available at `/concepts.html`.

## Files

- `index.html`: semantic page content, metadata, navigation, benefit panels and native process accordions.
- `styles.css`: OpenAssets styling, responsive layouts and decorative animation.
- `app.js`: benefit tabs with arrow-key navigation, process illustration, mobile menu, motion controls and progressive scroll reveals.
- `assets/`: original generated PNGs, optimized WebP production images and unmodified OA logo.
- `PROMPTS.md`, `OPEN-RAILS-PROMPTS.md`: imagegen prompts and asset provenance.

## Media

The page uses six optimized still images: desktop hero, portrait mobile hero, tokenization, global reach, compliance, and customizable issuance. Motion is a lightweight CSS camera drift, rail-light animation and section reveals. It pauses offscreen, can be paused by the visitor, and respects reduced-motion preferences. No video generation service is connected; these are not independently animated 3D scenes or rendered videos.

The logo is the original brand-assets PNG, displayed at its natural aspect ratio. Generated artwork contains no composited brand marks. Google Fonts serves Manrope; a local sans-serif fallback is provided.

## Content and links

Copy adapts the Hadron narrative to the OpenAssets tokenization focus. The process illustration is conceptual, not a product UI screenshot. Insight cards link to existing OpenAssets pages, not invented articles. All primary CTAs link to the existing OpenAssets partner page; no new form backend, tracking or cookies are added.

## Before public launch

Confirm the adapted product wording and four-step journey with the OA product team. The local preview is not deployed. A future hero video should preserve the poster and mobile composition and respect the existing pause/reduced-motion controls.
