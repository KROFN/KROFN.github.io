# KROFN Manual — V3.5 dossier / work-order pass

Status: review-only. No merge or production release is authorized.

## Goal

V3.4 was rejected because it substituted decorative composition for coherence. V3.5 returns to the V3.3 free-scroll baseline and rebuilds §02/§03 with a stricter rule: every visible element must have a functional/editorial role.

## §02 / Project dossier

The three projects share one coherent case interface rather than three unrelated artboards:

- title + factual metadata form the dossier header;
- authentic project media is the dominant visual canvas;
- a dark attached technical rail contains verified status, technical breakdown and project note;
- the lower strip contains project actions and source/disclaimer context;
- project tabs/arrows/swipe switch the complete state;
- no scroll capture, watermark numerals, decorative CASE labels or title/media collisions.

The media itself supplies each project's personality; the surrounding interface stays coherent.

## §03 / Work order

The generic checklist and the rejected handoff diagram are replaced by a simple work-order structure:

- strong heading;
- three clear stages: input / boundaries / handoff;
- one dark CTA strip.

This keeps the technical-manual language while remaining part of the same site.

## Visual review performed before staging

Full viewport screenshots were inspected for:
- 1649×920: all three project states + collaboration;
- 1440×900: all three project states;
- 390×844: project and collaboration states;
- actual navigation clicks to #cases and #collab.

Observed:
- no horizontal overflow;
- no JS page errors;
- anchors land immediately below the sticky header;
- mobile project order is title → metadata → media → technical rail → actions;
- normal vertical scrolling remains free.

Automated checks:
- TypeScript PASS
- production build PASS
- legacy routes PASS
- manual media verifier PASS
