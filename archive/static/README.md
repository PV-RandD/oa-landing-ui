# OpenAssets — Open Rails landing page

A responsive, single-page landing page using the selected Open Rails art direction. Run locally with:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No package installation or build step is required. The initial concept comparison remains available at `/concepts.html`.

## Files

- `index.html`: semantic page content, metadata, navigation, benefit panels and native process accordions.
- `styles.css`: OpenAssets styling, responsive layouts and decorative animation.
- `typography.css`: responsive OA type scale, reading widths, contrast, and spacing adjustments (17px desktop / 16px mobile body copy).
- `app.js`: benefit tabs with arrow-key navigation, process illustration, mobile menu, motion controls and progressive scroll reveals.
- `assets/`: original generated PNGs, optimized WebP production images and unmodified OA logo.
- `PROMPTS.md`, `OPEN-RAILS-PROMPTS.md`: imagegen prompts and asset provenance.

## Media

The page uses six optimized still images: desktop hero, portrait mobile hero, tokenization, global reach, compliance, and customizable issuance. The hero now uses two silent, 10-second H.264 loops rendered from the approved still artwork with a seamless camera push/pull: 1280×720 desktop (~1.5 MB), and 576×1024 portrait (~780 KB). Only the matching video loads, after the initial page load. Playback pauses offscreen, when the tab is hidden, and through the visitor’s pause control. Reduced-motion and data-saving preferences keep the still image and avoid the video request. Playback/decoding failures retain the image. The process rail-light animation and section reveals remain CSS-based. These videos animate the camera over a still composition; objects do not move independently in 3D.

The logo is the original brand-assets PNG, displayed at its natural aspect ratio. Generated artwork contains no composited brand marks. IBM Plex Sans is self-hosted as a compact WOFF2 file, with its SIL Open Font License included. One family unifies headings, reading text, and controls. Font choice is independent of the existing OA website; body sizes, hierarchy, and reading comfort drive the typography. System sans-serif is the fallback.

## Content and links

Copy adapts the Hadron narrative to the OpenAssets tokenization focus. The process illustration is conceptual, not a product UI screenshot. Insight cards link to existing OpenAssets pages, not invented articles. All primary CTAs link to the existing OpenAssets partner page; no new form backend, tracking or cookies are added.

## Before public launch

Confirm the adapted product wording and four-step journey with the OA product team. The local preview is not deployed. Independent object animation would require a separate 3D or image-to-video production pass. The current loop renderer is included at `scripts/render-hero.swift` (macOS AVFoundation; use a new output filename when re-rendering).

## Verification

Run `node --test tests/hero-media.test.cjs` for the six media lifecycle checks. Browser checks confirmed H.264 decoding on desktop/mobile, pause/resume, and offscreen pause. The supported review URL is http://127.0.0.1:4173/; direct file-browser playback was not verified.

Typography verification: 320, 390, 768, 1024 and 1440px layouts checked without horizontal overflow. A temporary fixture with 200% root text size at 320px exposed tab/footer wrapping issues, which were fixed and rechecked. Main reading and secondary text colors exceed 7:1 against their solid section backgrounds; this is not a full accessibility certification. Local Latin font is approximately 45 KB.


## Layout and interaction refinements

`layout.css` owns section spacing, responsive composition, fixed navigation, stable-height benefit panels, and interactive states. Navigation follows the current section and measures its header offset for anchor links. Mobile links transfer focus to their destination; Escape restores menu-button focus. Process stage buttons and native disclosures share selection state. Decorative motion respects reduced-motion and pause controls.

Validation: media-controller tests (6 passing), JavaScript syntax check, desktop browser interaction checks, and responsive overflow checks at 320px, 390px, and 768px. Keyboard benefit selection, mobile anchor focus, and Escape dismissal verified in the browser.


## Content review

Revised the landing copy to describe the institutional audience, issuance and management tools, and the contact action. Replaced broad benefit claims with specific capability labels. Asset categories are examples of use cases, and the four-stage process is a planning guide rather than a delivery commitment. Resource cards identify their destination pages. The primary contact CTA is "Talk to our team".

Public capability references checked on 2026-09-20:
- https://www.openassets.to/asset-tokenization/ for issuance, asset management, participant checks, and transfer controls.
- https://www.openassets.to/ for institutional positioning and configurable infrastructure.
- https://www.openassets.to/partner/ for the contact destination.
- https://www.openassets.to/3f-consortium/ for the Forge Finance Forum resource.

Verified the existing privacy, terms, and disclaimer destinations. Updated page metadata and checked revised copy on desktop and at 320px width. Internal anchors and IDs remain valid.

## Staging build and launch checks

Build a clean static directory for the actual destination:

```sh
python3 scripts/build.py --site-url https://YOUR-STAGING-HOST/
```

Upload only `dist/`. The builder copies referenced runtime files, the font license, and the sharing image. It excludes concept pages, source artwork not used by the page, renderer scripts, tests, and temporary media exports. It writes absolute canonical and sharing URLs for the supplied destination. Rebuild when that destination changes. Staging includes `noindex, nofollow` and a disallowing robots.txt; these are indexing controls, not access protection.

After final public-launch approval, build with the public HTTPS URL and `--production` to enable indexing. Do not upload the current local build unchanged: its metadata points to the localhost preview.

The favicon embeds the original OA icon bytes in a square SVG canvas, preserving the mark's aspect ratio. Social cards use the approved desktop hero PNG, 1672×941, with Open Graph and Twitter metadata. A hosted social-card fetch remains to be checked once a destination exists.

Checks completed on 2026-09-20:
- Packaged page checked at 320, 390, 768, 1024, and 1440px without horizontal overflow.
- Keyboard benefit selection, process selection, motion pause/resume, mobile menu links, destination focus, and Escape dismissal verified in the packaged page.
- Six media-controller tests pass, including reduced motion, data saving, breakpoint changes, failures, and background/offscreen pauses. Reduced-motion preference coverage is automated rather than an additional OS-setting test.
- All packaged HTML/CSS asset references resolve; IDs are unique and internal anchors valid. No browser console errors observed.
- Critical files total about 260 KiB desktop / 209 KiB mobile before compression, excluding deferred video and lazy images. This is an asset-size check, not a Lighthouse score or field Core Web Vitals measurement.
- Company, blog, product, contact, consortium, legal, and LinkedIn destinations were reviewed. X blocked automated retrieval, so that destination remains unverified.

Deployment remains pending a hosting destination. No public or remote staging site has been created.
