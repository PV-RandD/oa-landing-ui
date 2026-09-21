# OpenAssets landing page

A Next.js App Router project with React, TypeScript, Tailwind CSS 4, and Motion. It preserves the approved OpenAssets design, copy, optimized stills, and camera-motion loops.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. This starts Next.js, including React Fast Refresh.

## Verify and build

```sh
npm run typecheck
npm test
npm run build
```

Next.js pre-renders the single-page route and metadata into `out/`. React hydrates the interactive components. This is a Next.js static export, with server-rendered HTML for search engines and no backend requirement. To inspect the generated production output, stop the development server and run `npm run preview`.

Before deployment, set `SITE_URL` to the actual HTTPS origin in `.env.local` or the hosting build environment. Set `SITE_INDEXABLE=true` only for the approved public launch. Staging defaults to noindex and disallows crawlers. These settings do not provide access protection.

Build command: `npm run build`. Publish directory: `out`. Do not deploy the old `dist` output or the archived prototype. No hosting target is configured yet.

## Structure

- `src/app/page.tsx` composes the landing page with App Router server components.
- `src/app/layout.tsx` owns metadata, font preload, and motion preferences.
- `src/app/robots.ts` generates crawler rules from the deployment setting.
- `src/components/sections.tsx`, `hero.tsx`, and `footer.tsx` render the narrative content.
- `header.tsx`, `benefits.tsx`, and `process.tsx` use React state for interactive controls.
- `asset-media.tsx` shares intrinsic image sizing; `hero-media.tsx` provides responsive still/video media with configurable sources. Pass empty video sources for a still-only hero.
- `motion-provider.tsx` uses Motion for section reveals, respects reduced motion, and shares the user's pause setting.
- `src/lib/hero-controller.mjs` owns video loading, playback, and cleanup. It avoids video requests under reduced-motion or data-saving preferences and pauses offscreen or in background tabs.
- `src/lib/content.ts` holds approved benefit, process, and navigation data.
- `src/app/globals.css` loads Tailwind and the design styles. Tailwind handles shared layout utilities and exposes OA design tokens; custom CSS preserves the art direction and responsive compositions.
- `public/assets/` contains only runtime assets and the font license. `assets/` retains original artwork and production source files.
- `archive/static/` preserves the earlier HTML prototype for reference. It is not served by Next.js and is not part of the release.

## Media and contact

The hero uses silent 10-second camera-motion loops, with separate desktop/mobile encodes and matching WebP stills. These are camera moves over artwork, not independent object animation. The OA logo and favicon icon retain the original brand artwork. The favicon uses an SVG canvas to preserve the icon's aspect ratio. Social metadata uses the approved hero PNG.

Contact CTAs lead to the existing OpenAssets partner page. No new form backend, analytics, or cookies are introduced. Product references and media-generation prompts are recorded in `PROMPTS.md`, `OPEN-RAILS-PROMPTS.md`, and the archived content-review notes.

## Migration validation

- Next.js production build and TypeScript checks pass.
- Seven media-controller tests cover source selection, pause/resume, reduced motion, data saving, preference changes, visibility, failures, and React unmount/remount cleanup.
- Generated HTML includes the narrative copy, benefit content, canonical URL, robots policy, and social metadata before JavaScript runs.
- Browser checks cover hydration, keyboard tabs, process selection, mobile menu focus, anchor navigation, and responsive overflow.
- Next.js was updated to 16.3.5 after the initial dependency audit; installation reported no remaining advisories.

Hosted metadata and deployment verification remain pending a hosting destination. The previously quoted static-prototype transfer sizes are not measurements of the React application.
