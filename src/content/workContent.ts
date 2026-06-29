import { projects } from "./creativeContent";
import type { Locale, ProjectId, ProjectItem } from "../types/portfolio";

export const contacts = {
  telegram: "https://t.me/krofn",
  github: "https://github.com/KROFN",
};

interface WorkServiceCopy {
  title: string;
  outcome: string;
  deliverables: string[];
}

interface WorkServiceMoreCopy {
  title: string;
  text: string;
  cta: string;
}

type WorkProjectId = ProjectId | "smart-otdelka";

type WorkProjectItem = Omit<ProjectItem, "id"> & {
  id: WorkProjectId;
};

const workProjects: WorkProjectItem[] = [
  {
    id: "smart-otdelka",
    image: "/img/smart-otdelka.jpg",
    demoUrl: "https://smart-otdelka.vercel.app/",
    repoUrl: "https://github.com/KROFN/smart-otdelka",
  },
  ...projects,
];

interface WorkExampleCopy {
  id: WorkProjectId;
  title: string;
  task: string;
  built: string;
  result: string;
}

interface WorkProcessStep {
  title: string;
  text: string;
  output: string;
}

interface WorkCopy {
  navAria: string;
  hero: {
    headline: string;
    subtext: string;
    telegramCta: string;
    servicesCta: string;
    panelAria: string;
    facts: string[];
  };
  sections: {
    services: { kicker: string; title: string; intro: string };
    examples: { kicker: string; title: string; intro: string };
    process: { kicker: string; title: string; intro: string };
    estimate: { kicker: string; title: string; intro: string };
    contact: { kicker: string; title: string; intro: string };
  };

  labels: {
    task: string;
    built: string;
    result: string;
    output: string;
  };
  services: WorkServiceCopy[];
  servicesMore: WorkServiceMoreCopy;
  examples: WorkExampleCopy[];
  process: WorkProcessStep[];
  estimate: {
    intro: string;
    tiers: {
      name: string;
      description: string;
      output: string;
    }[];
    factorsTitle: string;
    factors: string[];
    ctaText: string;
    cta: string;
  };
  contact: {
    leadTitle: string;
    leadSubtitle: string;
    response: string;
    checklist: string[];
    note: string;
  };
  buttons: {
    demo: string;
    code: string;
    telegram: string;
    discuss: string;
  };
}

export const workContent: Record<Locale, WorkCopy> = {
  ru: {
    navAria: "Коммерческие услуги KROFN",
    hero: {
      headline: "Превращаю сырые идеи в проекты, которые можно показать",
      subtext:
        "Структура, визуал и готовый результат: презентация, сайт или рабочий инструмент.",
      telegramCta: "Написать в Telegram",
      servicesCta: "Смотреть услуги",
      panelAria: "Коротко о работе",
      facts: [
        "Ответ в течение дня",
        "PPTX / PDF / сайт / исходники",
        "Бриф → финал",
        "Правки до старта",
      ],
    },
    sections: {
      services: {
        kicker: "01 / Что делаю",
        title: "Услуги",
        intro:
          "Выбери формат задачи: от презентации и сайта до визуальной упаковки или рабочего инструмента.",
      },
      examples: {
        kicker: "02 / Доказательства",
        title: "Кейсы",
        intro:
          "Несколько работ, где идея превращалась в понятную страницу, систему или инструмент.",
      },
      process: {
        kicker: "03 / Процесс",
        title: "Как проходит работа",
        intro:
          "Путь от сырого описания до результата, который можно передать и показать.",
      },
      estimate: {
        kicker: "04 / Бюджет",
        title: "Оценка и бюджет",
        intro:
          "Оценка зависит от объёма, сроков и того, насколько глубоко нужно собирать задачу.",
      },
      contact: {
        kicker: "05 / Контакт",
        title: "Начать проект",
        intro:
          "Пришли короткое описание — я помогу разложить задачу и понять следующий шаг.",
      },
    },
    labels: {
      task: "Фокус",
      built: "Что собрано",
      result: "Что изменилось",
      output: "Выход",
    },
    services: [
      {
        title: "Презентации и визуальная упаковка",
        outcome:
          "Помогаю превратить текст и идею в понятный deck для защиты, продажи или выступления.",
        deliverables: [
          "PPTX / PDF",
          "структура и визуальный стиль",
          "финальная версия для показа",
        ],
      },
      {
        title: "Сайты и web-витрины",
        outcome:
          "Собираю страницу, которая объясняет проект, человека или услугу без лишнего шума.",
        deliverables: ["адаптивная страница", "demo/deploy", "исходники"],
      },
      {
        title: "Дизайн и оформление",
        outcome:
          "Привожу материалы к единому визуальному языку: от афиши до карточек и обложек.",
        deliverables: [
          "макеты",
          "экспорт под нужный формат",
          "визуальная система",
        ],
      },
      {
        title: "Инструменты и автоматизация",
        outcome:
          "Делаю рабочие скрипты, CLI/TUI, плагины и мини-системы под конкретную рутину.",
        deliverables: ["рабочий инструмент", "инструкция запуска", "исходники"],
      },
    ],
    servicesMore: {
      title: "Индивидуальная задача",
      text: "Если проект не вписывается в эти форматы — напиши, и я помогу разобраться, как его лучше собрать.",
      cta: "Обсудить проект",
    },
    examples: [
      {
        id: "smart-otdelka",
        title: "Смарт-Отделка",
        task:
          "Лендинг для ремонта квартир, где первый экран сразу объясняет услугу, географию и путь к заявке.",
        built:
          "Крупная hero-подача, блоки услуг, калькулятор стоимости и прямой переход в Telegram.",
        result:
          "Страница перестала быть просто визиткой: у посетителя есть сценарий от первого интереса до обращения.",
      },
      {
        id: "p2",
        title: "IMGIFTED FEST",
        task:
          "Страница фестиваля, которой нужно держать сразу две роли: афиша для эмоции и расписание для ориентации.",
        built:
          "Адаптивная структура с афишной подачей, сеткой конкурсных дней и быстрым чтением категорий.",
        result:
          "Главное стало видно без инструкций: что происходит, когда приходить и где искать свой блок.",
      },
      {
        id: "p0",
        title: "Лак и Точка",
        task:
          "Beauty-лендинг, который продаёт не только услугу, но и ощущение: аккуратно, уверенно, без салонного шума.",
        built:
          "Крупная типографика, анимационный первый экран, прайс-лист и быстрый путь к записи.",
        result:
          "Получилась атмосферная web-витрина, где настроение бренда и практическая информация работают вместе.",
      },
      {
        id: "p5",
        title: "BLOG.KROFN",
        task:
          "Личный блог должен выглядеть как медиа, но оставаться удобным рабочим инструментом для автора.",
        built:
          "Fullstack-платформа с редактором, SSR/SEO-страницами, загрузкой обложек и двуязычным интерфейсом.",
        result:
          "Публикации получили нормальную витрину, а управление осталось достаточно простым для регулярной работы.",
      },
    ],
    process: [
      {
        title: "Бриф",
        text: "Понимаем задачу, аудиторию, срок и формат результата.",
        output: "короткое ТЗ",
      },
      {
        title: "Структура",
        text: "Собираю логику, порядок блоков и ключевые акценты.",
        output: "план / скелет",
      },
      {
        title: "Черновик",
        text: "Показываю первый визуальный вариант и направление.",
        output: "версия для согласования",
      },
      {
        title: "Финал и правки",
        text: "Довожу дизайн, тексты, адаптив или сборку.",
        output: "финальная версия",
      },
      {
        title: "Передача",
        text: "Отдаю файлы, ссылки и короткие инструкции.",
        output: "результат, которым можно пользоваться",
      },
    ],
    estimate: {
      intro:
        "Я не называю цену вслепую: сначала смотрю задачу, материалы и нужный результат, затем предлагаю понятную оценку.",
      tiers: [
        {
          name: "Быстрая доработка",
          description:
            "Небольшие правки, визуальная чистка, доработка презентации или сайта.",
          output: "фиксированный объём, быстрая оценка после описания.",
        },
        {
          name: "Полная сборка",
          description:
            "Презентации, лендинги и визуальная упаковка с нуля.",
          output: "структура, визуальное направление, финальные файлы.",
        },
        {
          name: "Сложный проект",
          description:
            "Платформы, автоматизация, CLI/TUI-инструменты, плагины, админ-потоки.",
          output: "сначала бриф, затем понятная оценка объёма.",
        },
      ],
      factorsTitle: "На оценку влияет:",
      factors: [
        "срочность",
        "количество слайдов / страниц / экранов",
        "готовность текста и материалов",
        "сложность визуального стиля",
        "нужна ли разработка, анимация, адаптив, админка или автоматизация",
      ],
      ctaText:
        "Не уверен, к какому формату относится задача? Напиши — разложу по объёму.",
      cta: "Обсудить проект",
    },
    contact: {
      leadTitle: "Расскажи о задаче",
      leadSubtitle:
        "Я помогу разобраться, что можно сделать, и предложу, как лучше собрать проект.",
      response: "Для старта пришли:",
      checklist: [
        "Что нужно сделать",
        "Дедлайн и примерный объём",
        "Материалы и референсы",
      ],
      note:
        "Обычно отвечаю в течение дня, если не горит дедлайн по другому проекту.",
    },
    buttons: {
      demo: "Демо",
      code: "Код",
      telegram: "Написать в Telegram",
      discuss: "Обсудить проект",
    },
  },
  en: {
    navAria: "KROFN commercial services",
    hero: {
      headline: "I turn raw ideas into projects ready to present",
      subtext:
        "Structure, visuals and a finished result: a deck, website or working tool.",
      telegramCta: "Message on Telegram",
      servicesCta: "See services",
      panelAria: "Work quick facts",
      facts: [
        "Reply within a day",
        "PPTX / PDF / website / source files",
        "Brief → final",
        "Revisions upfront",
      ],
    },
    sections: {
      services: {
        kicker: "01 / What I do",
        title: "Services",
        intro:
          "Choose the task format: from a presentation or website to visual packaging or a working tool.",
      },
      examples: {
        kicker: "02 / Proof",
        title: "Cases",
        intro:
          "A few works where an idea became a clear page, system or tool.",
      },
      process: {
        kicker: "03 / Process",
        title: "How the work goes",
        intro:
          "The path from a raw description to a result you can hand off and present.",
      },
      estimate: {
        kicker: "04 / Budget",
        title: "Estimate and budget",
        intro:
          "The estimate depends on scope, timing and how deeply the task needs to be shaped.",
      },
      contact: {
        kicker: "05 / Contact",
        title: "Start a project",
        intro:
          "Send a short description and I will help break down the task and next step.",
      },
    },
    labels: {
      task: "Focus",
      built: "Built around",
      result: "Shift",
      output: "Output",
    },
    services: [
      {
        title: "Presentations and visual packaging",
        outcome:
          "I help turn text and an idea into a clear deck for defense, sales or a talk.",
        deliverables: [
          "PPTX / PDF",
          "structure and visual style",
          "final ready-to-show version",
        ],
      },
      {
        title: "Websites and web showcases",
        outcome:
          "I build a page that explains a project, person or service without unnecessary noise.",
        deliverables: ["responsive page", "demo/deploy", "source files"],
      },
      {
        title: "Design and presentation",
        outcome:
          "I bring materials into one visual language: from posters to cards and covers.",
        deliverables: [
          "layouts",
          "exports for the needed format",
          "visual system",
        ],
      },
      {
        title: "Tools and automation",
        outcome:
          "I make working scripts, CLI/TUI tools, plugins and mini-systems for a specific routine.",
        deliverables: ["working tool", "run instructions", "source files"],
      },
    ],
    servicesMore: {
      title: "Custom task",
      text: "If the project does not fit these formats, message me and I will help figure out the best way to shape it.",
      cta: "Discuss project",
    },
    examples: [
      {
        id: "smart-otdelka",
        title: "Smart-Finishing",
        task:
          "A renovation landing page where the first screen explains the service, location and path to inquiry.",
        built:
          "A bold hero, service blocks, price calculator and direct Telegram handoff.",
        result:
          "The page became a guided route from first interest to contact, not just a static business card.",
      },
      {
        id: "p2",
        title: "IMGIFTED FEST",
        task:
          "A festival page that had to work as both an emotional poster and a practical schedule.",
        built:
          "Responsive structure, poster-like visual direction, competition-day grids and readable category blocks.",
        result:
          "Visitors can understand what is happening, when to come and where their category lives without instructions.",
      },
      {
        id: "p0",
        title: "Lak and Point",
        task:
          "A beauty landing page that sells the feeling of the service as much as the service itself.",
        built:
          "Oversized typography, animated first screen, price-list section and a fast booking handoff.",
        result:
          "The brand mood and practical details now sit in one clear, atmospheric web showcase.",
      },
      {
        id: "p5",
        title: "BLOG.KROFN",
        task:
          "A personal blog that should feel like a media surface while staying practical for the author.",
        built:
          "A fullstack platform with an editor, SSR/SEO post pages, cover uploads and bilingual UI.",
        result:
          "The public side gained a proper editorial shell, while publishing stays simple enough for regular use.",
      },
    ],
    process: [
      {
        title: "Brief",
        text: "We clarify the task, audience, deadline and result format.",
        output: "short brief",
      },
      {
        title: "Structure",
        text: "I shape the logic, block order and key accents.",
        output: "plan / skeleton",
      },
      {
        title: "Draft",
        text: "I show the first visual version and direction.",
        output: "version for approval",
      },
      {
        title: "Final and revisions",
        text: "I refine the design, copy, responsive layout or build.",
        output: "final version",
      },
      {
        title: "Handoff",
        text: "I provide files, links and short instructions.",
        output: "a result you can use",
      },
    ],
    estimate: {
      intro:
        "I do not name a price blindly: first I look at the task, materials and needed result, then offer a clear estimate.",
      tiers: [
        {
          name: "Quick refinement",
          description:
            "Small edits, visual cleanup, deck or website refinement.",
          output: "fixed scope, quick estimate after a description.",
        },
        {
          name: "Full build",
          description:
            "Presentations, landing pages and visual packaging from scratch.",
          output: "structure, visual direction, final files.",
        },
        {
          name: "Complex project",
          description:
            "Platforms, automation, CLI/TUI tools, plugins, admin flows.",
          output: "brief first, then a clear scope estimate.",
        },
      ],
      factorsTitle: "The estimate depends on:",
      factors: [
        "urgency",
        "number of slides / pages / screens",
        "readiness of copy and materials",
        "complexity of the visual style",
        "whether development, animation, responsive layout, admin tools or automation are needed",
      ],
      ctaText:
        "Not sure which format fits your task? Message me — I will break down the scope.",
      cta: "Discuss project",
    },
    contact: {
      leadTitle: "Tell me about the task",
      leadSubtitle:
        "I will help figure out what is realistic and suggest how to shape the project.",
      response: "To start, send:",
      checklist: [
        "What needs to be done",
        "Deadline and approximate scope",
        "Materials and references",
      ],
      note:
        "I usually reply within a day unless I am on a deadline.",
    },
    buttons: {
      demo: "Demo",
      code: "Code",
      telegram: "Message on Telegram",
      discuss: "Discuss project",
    },
  },
};

export function getWorkProject(id: WorkProjectId) {
  return workProjects.find((project) => project.id === id);
}
