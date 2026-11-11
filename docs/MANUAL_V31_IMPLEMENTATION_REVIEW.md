# KROFN Fidelity V3.1 — implementation QA (feature branch only)

Visual source of truth: approved `KROFN_FIDELITY_V31_STANDALONE.html` and its nine approval screenshots. This change is a React/TypeScript implementation, **not** an artistic redesign.

## Scope
- New `/`: isolated `ManualSite`, retaining §01, §02, §03 and paper/annotation/media composition.
- `/work`, `/creative`, existing deep links and 404: retained, not rewritten.
- Legacy `SiteNav`, `Cursor`, `LangSwitcher`, `Loader`, `Lenis` and GSAP effects do not mount/run on `/`; global body::before noise is disabled only for the manual route.
- Case state, handwritten project annotations, technical details, links, touch navigation and native `dialog` are React-owned.
- No project media are embedded as data URIs. High-resolution source screenshots live as responsive hashed WebP files; static GitHub Pages cache headers are controlled by the provider, so immutable names supply cache busting.

## Audited deviations from V3.1
1. Desktop Hero: original red stroke asset retained; its bounding box is positioned around, rather than across, “на субподряд”. Mobile stroke remains V3.1.
2. Laniakea and Karataeva: replaced 840px previews with unretouched local browser renders taken at 1600×900 CSS pixels / DPR2. Files encoded at 960, 1600, 2400, 3200 physical pixels. Sources + hashes in `docs/manual-v31-media-provenance.json`.
3. Removed review-only text (`FIDELITY REVIEW`, `NOT APPROVED`, `NO DEPLOY`) from the user-facing DOM.
4. Source status and CTA text distinguish SIRIUS Dark Editorial art direction from the separately available existing site. Laniakea/Karataeva online production status is *not* claimed as verified.
5. Legacy global `.projects` padding was explicitly neutralized **only** in ManualSite and duplicate nested footer prevented. Desktop rails line up with approved screenshot: §01 y151, §02 y725, §03 y2099 vs reference y151 / y725 / y2109.

No new sections, visual experiments, metrics or alternative art direction were introduced.

## Verification
- Baseline main `084149348dc5478d7b9f91b95d90fec40ef92231` passed `npm ci`, `npm run build`, and `npm run test:routes` before integration.
- Branch: `feat/krofn-manual-v31`. Changes never target main.
- Current: `npx tsc --noEmit`, `npm run build`, `npm run test:routes`, `node scripts/verify-manual.mjs`.
- Chromium checked 18 states (6 widths × 3 cases): 320, 390, 768, 1024, 1440, 1920px. No horizontal overflow, page JS errors, media failures, or unscoped legacy visuals. Full logs: `review-v31/QA_ALL.json`.
- Additional checks: case buttons, arrows, mobile swipe, project dialog click/Escape, direct legacy routes, language and canonical/OG/sitemap/favicons.
- Mobile hit areas checked: header 46px; arrows 48px; footer links 46px.
- Localhost Chromium performance sample in `review-v31/PERFORMANCE_LOCAL.json`: **not** Lighthouse or real-user production Core Web Vitals. No external performance promises.

## Release gate
**Do not merge or deploy on this PR.** A push to main triggers the GitHub Pages deployment workflow. Before a separately authorized release: independently approve all nine screenshots and copy/status links, verify the current deployed state of SIRIUS/demo/source endpoints, verify OG cards and canonical on the final domain, then authorize merge. Roll back a later release by reverting its commit and repeating the route smoke tests.

## Review assets
`review-v31/KROFN_IMPL_{1440,390,320}_{SIRIUS,LANIAKEA,KARATAEVA}.webp` are **actual browser screenshots of this React implementation**, not the approved reference screenshots. They are review files and do not enter the Vite dist build.
