import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const dir = resolve("dist");
const routes = [
  { path: "index.html", canonical: "https://krofn.ru/" },
  { path: "work/index.html", canonical: "https://krofn.ru/work/" },
  { path: "creative/index.html", canonical: "https://krofn.ru/creative/" },
];

for (const route of routes) {
  const html = await readFile(resolve(dir, route.path), "utf8");
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.ok(html.includes(`<link rel="canonical" href="${route.canonical}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${route.canonical}"`));
  assert.match(html, /<meta property="og:image" content="https:\/\/krofn\.ru\/img\/[^"]+"/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.ok(html.includes('href="/favicon.ico"'), "Missing ICO favicon on " + route.path);
  assert.ok(html.includes('href="/favicon.svg?v=1"'), "Missing SVG favicon on " + route.path);
  assert.ok(html.includes('href="/favicon-32x32.png"'), "Missing PNG favicon on " + route.path);
  assert.ok(html.includes('href="/apple-touch-icon.png"'), "Missing Apple touch icon on " + route.path);
  assert.match(html, /<meta property="og:description" content="[^"]+"/);
  assert.ok(!html.includes("BLOG.KROFN"), "Removed project must not be present in HTML");
  if (route.path === "work/index.html") {
    assert.ok(html.includes('<meta property="og:image" content="https://krofn.ru/img/krofn-og.jpg"'), "Work must use the dedicated KROFN social card");
    assert.ok(html.includes('<meta name="twitter:image" content="https://krofn.ru/img/krofn-og.jpg"'), "Work Twitter card must use the dedicated KROFN social card");
    assert.ok(html.includes("разработка для агентств"), "Work-specific page title missing");
    assert.ok(html.includes("https://krofn.ru/mitta-test/"), "MITTA live demo missing from Work");
    assert.ok(html.includes("https://krofn.ru/sirius-test/"), "SIRIUS live demo missing from Work");
    assert.ok(html.includes("Инициативный концепт"), "MITTA/SIRIUS portfolio cases must stay labeled as initiative concepts");
  }
}
for (const icon of ["favicon.ico", "favicon.svg", "favicon-32x32.png", "apple-touch-icon.png"]) {
  assert.ok((await stat(resolve(dir, icon))).size > 100, "Missing or empty " + icon);
}
const notFound = await readFile(resolve(dir, "404.html"), "utf8");
assert.ok(notFound.includes('href="/favicon.svg?v=1"'), "404 page must include favicon");
assert.match(notFound, /name="robots" content="noindex,nofollow"/);
assert.ok(!notFound.includes('rel="canonical"'));
const siteMap = await readFile(resolve(dir, "sitemap.xml"), "utf8");
for (const route of routes) assert.ok(siteMap.includes(route.canonical));
assert.ok((await stat(resolve(dir, "img/smart-otdelka.jpg"))).size > 1000);
assert.ok((await stat(resolve(dir, "img/fincross.jpg"))).size > 1000);
await assert.rejects(stat(resolve(dir, "img/blog-krofn.jpg")), { code: "ENOENT" });
console.log("PASS: 3 route pages + 404, canonical, OG, sitemap, image assets, removed BLOG.KROFN");
