import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";

const dist = resolve("dist");
const indexPath = join(dist, "index.html");
const original = await readFile(indexPath, "utf8");
const siteOrigin = (process.env.SITE_ORIGIN || "https://krofn.ru").replace(/\/+$/, "");
const origin = new URL(siteOrigin);
if (origin.protocol !== "https:" || origin.pathname !== "/") {
  throw new Error("SITE_ORIGIN must be an HTTPS origin without a path");
}

const pages = [
  {
    route: "/",
    file: "index.html",
    title: "KROFN — Creative & Work | Портфолио",
    description: "KROFN — разработка сайтов и веб-инструментов, авторские проекты и визуальные эксперименты. Выберите Work для сотрудничества или Creative для портфолио.",
    image: "/img/krofn-og.jpg",
  },
  {
    route: "/work/",
    file: "work/index.html",
    title: "KROFN Work — Сайты, лендинги и разработка для агентств",
    description: "Разработка лендингов и многостраничных сайтов, доработки и веб-инструменты. Работа напрямую с клиентами и в командах агентств. Кейсы, подход и контакт.",
    image: "/img/krofn-og.jpg",
  },
  {
    route: "/creative/",
    file: "creative/index.html",
    title: "KROFN Creative — Интерфейсы, проекты и эксперименты",
    description: "Авторское портфолио KROFN: интерактивные интерфейсы, визуальные веб-проекты, разработка и инженерные эксперименты.",
    image: "/img/fincross.jpg",
  },
];

const escapeAttribute = (value) =>
  String(value).replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function injectMetadata(document, page) {
  const canonical = siteOrigin + page.route;
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);
  let html = document.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  const descriptionRE = /<meta\s+name="description"\s+content="[^"]*"\s*\/>/;
  if (!descriptionRE.test(html)) throw new Error("Missing template description meta");
  html = html.replace(descriptionRE, `<meta name="description" content="${description}" />`);
  const metadata = [
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="KROFN" />',
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}" />`,
    `<meta property="og:image" content="${escapeAttribute(siteOrigin + page.image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(siteOrigin + page.image)}" />`,
  ];
  if (!html.includes("</head>")) throw new Error("Missing head in build");
  return html.replace("</head>", `    ${metadata.join("\n    ")}\n  </head>`);
}

for (const page of pages) {
  const output = join(dist, page.file);
  await mkdir(resolve(output, ".."), { recursive: true });
  await writeFile(output, injectMetadata(original, page));
}

const fallback = original.replace(/<title>[\s\S]*?<\/title>/, "<title>KROFN — Страница не найдена</title>")
  .replace("</head>", '    <meta name="robots" content="noindex,nofollow" />\n  </head>');
await writeFile(join(dist, "404.html"), fallback);

const siteMap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((page) => `  <url><loc>${siteOrigin + page.route}</loc></url>`),
  "</urlset>",
].join("\n") + "\n";
await writeFile(join(dist, "sitemap.xml"), siteMap);
await writeFile(join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`);
console.log("Generated route-specific HTML:", pages.map((page) => page.route).join(", "), "+ 404, sitemap, robots");
