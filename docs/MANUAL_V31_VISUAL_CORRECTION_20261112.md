# KROFN V3.1 — implementation visual QA correction (2026-11-12)

Status: approved artistic source of truth remains V3.1; React implementation is not owner-approved. Feature-only correction, no change to main or krofn.ru.

## Verified defects and targeted fixes

| Finding | Cause | Correction |
| --- | --- | --- |
| Huge side fields on desktop 1920 | Paper capped at 1440px | Full-width paper + expanded wide-desktop grid and 2-line Hero. No new aesthetic direction |
| Header disappears after anchor navigation | overflow:hidden on .sheet created nested scroll container; #top was on main after mast | overflow:clip, anchor on actual header; browser confirms headerY=0 and sheet.scrollTop=0 on all six widths |
| Figma/React/TS diagram sits on text | Absolute art layer on H1 | Shifted to true secondary field below H1; 0 px² H1/diagram overlap on all six widths |
| Red graphics blurry | Small original PNGs stretched | Deterministic contour-traced SVG derived from exact approved PNGs by scripts/make-manual-vectors.py; original PNGs retained |
| Red circle crosses glyphs | Hero-circle stretched into word | Same hand-painted source-language stroke as full underline below word |
| Repeated SIRIUS warnings | status, chrome, watermark, caption, technical list, disclaimer | One explicit case status; removed the other on-page repeats and long legalese |
| Fake "ПЕРЕЛИСТАТЬ КЕЙС" | Decorative span with arrow | Removed; tabs are the only primary desktop selector, arrows/count the mobile selector |
| Competing duplicate carousel controls | Tabs and arrows everywhere | Only the appropriate mode is visible; keyboard/swipe retained |
| Checkmarks outside square | 22px Unicode glyph in 21px cell | Centered SVG checkmarks in technical and cooperation lists |
| Disconnected corner marks | Decorative nonfunctional crosses in four corners and header | Removed detached pseudo-registration marks; approved section rails retained |
| SIRIUS cropped, picture appears to contain buttons | object-fit cover and no click on full case image | object-fit contain and accessible overlay to open approved image in modal |
| Karataeva lags on selection | Media lazy-mounted on switching | Adjacent case media prefetched and reused by browser |
| Full-page QA captures contain black SIRIUS panel | Offscreen compositor paint skipped even after image.decode | Scroll through every visible viewport and stitch screenshot tiles. Old screenshots must not be used as visual evidence |

## Unresolved source asset quality limit

The approved SIRIUS art image is 1382×748 px, with small UI text already embedded in the source raster. Programmatic Lanczos 2× resampling and a mild unsharp mask produces a responsive high-DPR variant, but DOES NOT restore missing detail or make it a real published screenshot. A real native-resolution design source or owner-approved literal re-render is required to eliminate that limitation. Original WebP kept unchanged.

Laniakea and Karataeva still use real source-based browser media. No claims that external production statuses were independently confirmed.

## Validation evidence

- TypeScript noEmit, Vite build, existing route tests and manual asset verifier: PASS.
- review-v31/QA_ALL.json: 18 carousel states on widths 320/390/768/1024/1440/1920, plus six anchor-return flows: zero errors and zero overflow.
- review-v31/QA_UX_20261112.json: six additional navigational, modal, media, isolated shell and SVG checks: all pass.
- review-v31/KROFN_IMPL_{320,390,1440,1920}_{SIRIUS,LANIAKEA,KARATAEVA}.webp: 12 browser captures from visible viewport tiles, not broken Chromium fullPage screenshots.
- review-v31/PERFORMANCE_LOCAL.json: locality-only Chromium performance. Not field Core Web Vitals.

Release gate: merge and production forbidden until independently approved, and statuses/links checked on current services.
