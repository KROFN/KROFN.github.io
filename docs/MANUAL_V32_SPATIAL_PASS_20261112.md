# KROFN Manual — V3.2 spatial / interaction pass

Status: feature branch only. Owner requested structural correction after reviewing the V3.1 React staging. This pass does **not** touch `main` or `krofn.ru`.

## Problem being corrected

The V3.1 implementation read as one continuous editorial artboard placed inside HTML: the same paper surface, rails, borders and stacked screenshot treatment ran through §01 → §02 → §03. Controls worked, but the page had weak web-level scene separation and little sense of changing interface state.

Owner also rejected the pervasive red circling/underlining language, especially the red treatment around “на субподряд”.

## V3.2 spatial changes

- Header is now persistent site chrome.
- §01 is a self-contained Hero scene that fills the first viewport below the header. §02 no longer peeks into the first screen.
- Removed the red circle/underline treatment around “на субподряд”.
- §02 is now a desktop scroll-driven sticky case stage:
  - one viewport-sized interface state;
  - three cases change as the user scrolls;
  - direct tabs move to the corresponding scroll state;
  - title, type, role, status, technical breakdown, links and media switch together;
  - handwritten annotations are removed from the case media itself; the active tab/progress state carries the accent instead.
- Project media uses a restrained portfolio-view frame rather than decorative fake-browser chrome.
- Tablet/mobile keeps natural document flow and explicit previous/next controls; no scroll-jacking.
- §03 is a separate dark closing scene instead of another continuation of the same paper sheet.
- Red is limited to semantic/accent use: nav indices, the active case marker, the Hero diagram note and the final-scene kicker.

## Verification

- `npx tsc --noEmit` — PASS
- `npm run build` — PASS
- `npm run test:routes` — PASS
- `node scripts/verify-manual.mjs` — PASS
- Chromium QA:
  - 1920×900 and 1440×900: Hero, all three case states, collaboration scene.
  - 390×844: Hero, two case states via mobile arrows, collaboration scene.
  - no horizontal overflow;
  - no page errors;
  - sticky header remains at y=0;
  - desktop case stage occupies exactly the viewport below the 92px header.

Representative renders and `QA_SPATIAL.json` are in `review-v32/`.

Release gate remains unchanged: review only; no merge or production publish without explicit owner approval.
