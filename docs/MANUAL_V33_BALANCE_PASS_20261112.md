# KROFN Manual — V3.3 balance pass

Status: review-only. No production release is authorized.

## Why V3.3 exists

V3.2 correctly broke the long-artboard feeling, but overcorrected into a slide/presentation model:
- accidental dark gutters / heavy black scene separators;
- desktop portfolio captured roughly three viewports of scroll and forced the visitor through all three case states before continuing;
- the fully dark collaboration scene departed too far from the original technical-manual / editorial visual language.

## Changes

- Restored the page itself to the paper/manual background; no accidental black gutters.
- Removed thick theatrical black separators between chapters.
- Removed scroll-driven case switching and the 310svh sticky scroll capture.
- §02 is now normal document flow: one interactive editorial case spread with explicit SIRIUS / Ланиакея / Karataeva tabs (mobile uses arrows/swipe). Visitors can scroll past it immediately.
- Case switching remains a complete state switch: title, facts, technical breakdown, links and authentic project media change together.
- §03 returned to the light technical-manual family. A single dark CTA module supplies contrast instead of turning the whole final screen into a separate dark landing page.
- Hero composition and the restrained red-accent policy are preserved.

## QA

- TypeScript — PASS
- production build — PASS
- route tests — PASS
- manual media verifier — PASS
- Chromium: 1920×900, 1440×900, 390×844 — no page errors / no mobile overflow.
- Exact owner-like desktop check: 1649×920 — no horizontal overflow.
- At 1649×920, from §02 a single 1100px wheel movement reaches §03; active case remains SIRIUS. Portfolio no longer traps scroll.

Representative screenshots are in review-v33/.
