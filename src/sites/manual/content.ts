/** Facts and media provenance, separately reviewable before release. */
export type CaseId = "sirius" | "laniakea" | "karataeva";
export interface ManualCase {
  id: CaseId;
  name: string;
  type: string;
  role: string;
  status: string;
  chrome: string;
  source?: { label: string; url: string };
  demo?: { label: string; url: string };
  disclaimer: string;
  lines: readonly string[];
  annotationLeft: readonly string[];
  annotationRight: readonly string[];
  annotationTech: readonly string[];
  mobileNote: string;
  mobileProof: string;
  mediaCaption: string;
  mediaAlt: string;
  media: {
    src: string;
    srcSet?: string;
    sizes?: string;
    full: string;
  };
}
const mediaRoot = "/media/manual/projects/";
export const manualCases: readonly ManualCase[] = [
  {
    id: "sirius",
    name: "SIRIUS", type: "Сайт фотостудии", role: "Структура, UI, frontend",
    status: "Dark Editorial — арт-концепт",
    chrome: "SIRIUS / ART DIRECTION · НЕ ОПУБЛИКОВАНО",
    source: { label: "Код текущего сайта", url: "https://github.com/KROFN/sirius-test" },
    demo: { label: "Текущий сайт (не редизайн)", url: "https://krofn.ru/sirius-test/" },
    disclaimer: "В окне — утверждённый художественный концепт Dark Editorial. Ссылка ведёт на существующую версию сайта; она не является доказательством реализации показанного редизайна.",
    lines: ["Существующая реализация: адаптивный сайт фотостудии", "Разделы услуг, портфолио и сценарии записи", "Dark Editorial — отдельный редизайн, пока НЕ live"],
    annotationLeft: ["Редакционный", "редизайн:", "атмосфера", "и свет"],
    annotationRight: ["Крупная", "типографика", "+ фокус", "на кадре"],
    annotationTech: ["Контраст", "и композиция"],
    mobileNote: "Кадр, свет и типографика — отдельное художественное направление.",
    mobileProof: "АРТ-КОНЦЕПТ / НЕ ОПУБЛИКОВАН",
    mediaCaption: "SIRIUS / ART CONCEPT — не опубликованная реализация",
    mediaAlt: "Визуальный арт-концепт Dark Editorial: крупная надпись SIRIUS и модель в студийном свете. Не опубликованный сайт.",
    media: {src: "/media/manual/assets/sirius-art-clean.webp",full: "/media/manual/assets/sirius-art-clean.webp"}
  },
  {
    id: "laniakea",
    name: "Ланиакея", type: "API-платформа", role: "Frontend, API и инфраструктура",
    status: "Локальная реализация / статус публикации уточняется",
    chrome: "LANIAKEA / LOCAL UI SCREENSHOT",
    disclaimer: "В кадре — реальный скриншот публичной части Ланиакеи, полученный из локальной сборки Node2. Это не доказательство внешнего production-деплоя.",
    lines: ["Публичная часть и отдельный интерфейс Console", "Cloudflare Workers / D1 и API gateway", "Статус внешней публикации не подтверждён"],
    annotationLeft: ["Система", "за кадром:", "API +", "консоль"],
    annotationRight: ["Световое", "поле —", "собственная", "графика"],
    annotationTech: ["Workers / D1", "без выдуманных KPI"],
    mobileNote: "Публичный интерфейс связан с существующей API-инфраструктурой.",
    mobileProof: "СКРИНШОТ ЛОКАЛЬНОЙ СБОРКИ",
    mediaCaption: "Laniakea / скриншот локального интерфейса Node2 · не подтверждённый production",
    mediaAlt: "Настоящий скриншот страницы Laniakea из локальной сборки Node2: тёмная сцена и золотой световой рисунок.",
    media: {src: mediaRoot+"laniakea-1600-3f76b82322.webp",srcSet: mediaRoot+"laniakea-960-040d6de810.webp 960w, "+mediaRoot+"laniakea-1600-3f76b82322.webp 1600w, "+mediaRoot+"laniakea-2400-b4cda4d4a8.webp 2400w",sizes:"(max-width: 520px) 100vw, (max-width: 1024px) 86vw, 1160px",full: mediaRoot+"laniakea-3200-1b7550238d.webp"}
  },
  {
    id: "karataeva",
    name: "Karataeva", type: "Сайт фотографа", role: "Дизайн и frontend",
    status: "Исходная реализация / статус публикации уточняется",
    chrome: "KARATAEVA / SOURCE-BUILT SCREENSHOT",
    source: {label: "Репозиторий проекта", url: "https://github.com/KROFN/karataeva-site"},
    disclaimer: "В кадре — настоящий скриншот сайта «Тёплые Кадры», собранного из исходников KROFN/karataeva-site. Это локальный рендер, не подтверждённая публикация.",
    lines: ["Персональный лендинг для фотографа", "React, TypeScript, Vite, Tailwind и GSAP", "Галерея, адаптивная структура и взаимодействия"],
    annotationLeft: ["Изображение", "ведёт", "повествование"],
    annotationRight: ["Мягкая", "типографика", "и галерея", "снимков"],
    annotationTech: ["Галерея +", "адаптив"],
    mobileNote: "Визуальное повествование строится вокруг фотографий.",
    mobileProof: "СКРИНШОТ ИСХОДНОГО ПРОЕКТА",
    mediaCaption: "Karataeva / интерфейс из исходников GitHub · локальный рендер",
    mediaAlt: "Настоящий скриншот лендинга фотографа «Тёплые Кадры», собранного из исходников GitHub: заголовок и портрет.",
    media: {src: mediaRoot+"karataeva-1600-58a579d0c5.webp",srcSet: mediaRoot+"karataeva-960-b5e7bf958e.webp 960w, "+mediaRoot+"karataeva-1600-58a579d0c5.webp 1600w, "+mediaRoot+"karataeva-2400-d10e27eb4a.webp 2400w",sizes:"(max-width: 520px) 100vw, (max-width: 1024px) 86vw, 1160px",full: mediaRoot+"karataeva-3200-2e5c7c61fe.webp"}
  }
] as const;
