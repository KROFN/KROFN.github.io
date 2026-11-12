# KROFN Manual — V3.4 authorial composition pass

Status: review-only. No merge / production release is authorized.

## Why this pass exists

V3.3 fixed UX, but became too safe: repeated paper + headline + grid patterns made the page feel like a clean technical brochure rather than an authored portfolio.

The V3.4 goal is therefore not another polish pass. Hero, sticky header and free vertical scrolling are kept. §02 and §03 are rebuilt compositionally.

## §02 / cases

The portfolio remains one freely scrollable section with explicit tabs/arrows/swipe. No scroll capture returns.

The three cases now have deliberately different desktop compositions:

- **SIRIUS** — oversized left title, cinematic media cutting across the spread, data/analysis anchored as technical notes.
- **Ланиакея** — system-field composition: large media on the left, narrow technical/data rail on the right, oversized serial/index layer.
- **Karataeva** — editorial portrait composition: media leads from the left, title breaks across the top/right, project proof/analysis sits in a separate right column.

All three still switch as complete project states and use the same factual source data.

Red is stronger again but semantic: active state, proof stamps, serial marks, slashes/rules. No decorative circles around words.

## §03 / handoff

The previous generic “big headline + checklist” layout is removed.

§03 is now a handoff / brief sheet:
- INPUT / what can be handed over;
- DEVELOPMENT transfer marker;
- OUTPUT / what is fixed before/at handoff;
- a single dark CTA bar.

This keeps the manual/editorial language while giving the closing section a stronger conceptual reason to exist.

## QA

PASS:
- TypeScript
- production build
- legacy route tests
- manual media verifier
- Chromium 1649×920: all 3 cases, no horizontal overflow / page errors
- Chromium 390×844: all 3 cases, no horizontal overflow / page errors
- mobile anchor-to-cases order verified as title → facts → media → technical analysis → CTA → note
- normal page scrolling remains free; no scroll-driven case switching

Representative evidence is stored in review-v34/.
