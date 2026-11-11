import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve("public/media/manual");
for (const name of ["paper.webp", "hero-circle.png", "hero-note.png", "case-left-note.png", "sirius-underline.png", "footer-underline.png", "footer-note.png", "sirius-art-clean.webp"]) {
  assert.ok((await stat(resolve(root, "assets", name))).size > 700, name + " missing");
}
const content=await readFile(resolve("src/sites/manual/content.ts"),"utf8");
for (const name of ["laniakea","karataeva"]) {
  for (const w of [960,1600,2400,3200]) {
    const pattern = new RegExp(name + "-" + w + "-[a-f0-9]{10}\\.webp", "g");
    const matching = [...content.matchAll(pattern)];
    assert.ok(matching.length >= 1, `${name} ${w} missing from manifest`);
    for (const match of matching) assert.ok((await stat(resolve(root,"projects",match[0]))).size>5000, match[0]+" missing");
  }
}
assert.ok(content.includes("НЕ ОПУБЛИКОВАН"));
assert.ok(!content.includes("https://laniakea-api.pages.dev"), "Unverified live URL not permitted");
const css=await readFile(resolve("src/sites/manual/ManualSite.css"),"utf8");
assert.ok(css.includes("body[data-route=\"manual\"]::before"), "Legacy pseudo background must be disabled");
console.log("PASS: all approved manual media assets, 3 case states, isolated styling");
