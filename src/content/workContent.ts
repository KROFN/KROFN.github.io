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
  status: string;
  role: string;
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
    projectsCta: string;
    panelAria: string;
    facts: string[];
  };
  sections: {
    services: { kicker: string; title: string; intro: string };
    examples: { kicker: string; title: string; intro: string };
    partners: { kicker: string; title: string; intro: string };
    process: { kicker: string; title: string; intro: string };
    estimate: { kicker: string; title: string; intro: string };
    contact: { kicker: string; title: string; intro: string };
  };

  labels: {
    task: string;
    built: string;
    result: string;
    role: string;
    output: string;
  };
  services: WorkServiceCopy[];
  servicesMore: WorkServiceMoreCopy;
  examples: WorkExampleCopy[];
  partners: { title: string; text: string; bullets: string[]; cta: string };
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
      headline: "Разрабатываю сайты и веб-инструменты для бизнеса",
      subtext:
        "Лендинги, многостраничные сайты и доработки. Работаю напрямую и подключаюсь к проектам агентств и специалистов по рекламе — от готового макета до технического запуска.",
      telegramCta: "Обсудить задачу",
      projectsCta: "Посмотреть работы",
      panelAria: "Коротко о работе",
      facts: [
        "Ответ в течение дня",
        "Лендинги / многостраничные сайты",
        "По ТЗ или с нуля",
        "Исходники и передача",
      ],
    },
    sections: {
      services: {
        kicker: "02 / Что делаю",
        title: "Услуги",
        intro:
          "От лендинга и доработок до небольших инструментов. Договоримся о результате до начала работы.",
      },
      examples: {
        kicker: "01 / Работы",
        title: "Избранные проекты",
        intro:
          "Демонстрационные работы и авторские проекты. Для каждого — моя роль и проверяемый результат.",
      },
      partners: {
        kicker: "03 / Сотрудничество",
        title: "Для агентств и специалистов по рекламе",
        intro: "Можно передать отдельную задачу, готовый макет или согласованный участок разработки.",
      },
      process: {
        kicker: "04 / Процесс",
        title: "Как проходит работа",
        intro:
          "Путь от сырого описания до результата, который можно передать и показать.",
      },
      estimate: {
        kicker: "05 / Бюджет",
        title: "Оценка и бюджет",
        intro:
          "Оценка зависит от объёма, сроков и того, насколько глубоко нужно собирать задачу.",
      },
      contact: {
        kicker: "06 / Контакт",
        title: "Начать проект",
        intro:
          "Пришли короткое описание — я помогу разложить задачу и понять следующий шаг.",
      },
    },
    labels: {
      task: "Фокус",
      built: "Реализация",
      result: "Результат",
      role: "Моя роль",
      output: "Выход",
    },
    services: [
      {
        title: "Сайты и лендинги",
        outcome: "Адаптивные страницы для представления услуг, продуктов и рекламных кампаний.",
        deliverables: ["структура и вёрстка", "адаптив под мобильные", "публикация и исходники"],
      },
      {
        title: "Доработки и интеграции",
        outcome: "Подключаюсь к существующему сайту, чтобы исправить конкретную проблему или добавить функцию.",
        deliverables: ["исправление интерфейсов", "формы и сценарии обращения", "интеграции — по согласованному ТЗ"],
      },
      {
        title: "Инструменты и автоматизация",
        outcome: "Небольшие веб-инструменты, скрипты и автоматизация повторяющихся задач.",
        deliverables: ["рабочий инструмент", "проверка сценариев", "инструкция и код"],
      },
      {
        title: "Дизайн и презентации",
        outcome: "Дополнительная визуальная помощь: оформление, презентации и материалы для показа.",
        deliverables: ["структура и визуальный стиль", "макеты", "экспорт PPTX / PDF"],
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
        status: "Демо-проект · доступен сайт",
        role: "Структура страницы, UI, frontend и калькулятор.",
        task: "Концепт посадочной страницы для услуг ремонта с понятным сценарием обращения.",
        built: "Адаптивный интерфейс, разделы услуг, калькулятор и ссылка на обращение в Telegram.",
        result: "Рабочее демо с переходом от изучения услуг к заявке. Коммерческая конверсия не измерялась.",
      },
      {
        id: "p0",
        title: "Лак и Точка",
        status: "Авторский концепт · онлайн-демо",
        role: "Визуальная система, анимация, адаптивный frontend.",
        task: "Прототип beauty-лендинга с сочетанием атмосферы и практичной информации.",
        built: "Главный экран, анимации, прайс-лист и сценарий записи.",
        result: "Готовый frontend-концепт; опубликованные показатели продаж не заявляются.",
      },
      {
        id: "p2",
        title: "IMGIFTED FEST",
        status: "Демонстрационная работа · онлайн-демо",
        role: "Структура, визуальная подача, адаптивная вёрстка.",
        task: "Страница мероприятия с афишной подачей и расписанием категорий.",
        built: "Секции дней, категорий выступлений и навигация по программе.",
        result: "Собран демонстрационный интерфейс для просмотра программы на разных экранах.",
      },
      {
        id: "p3",
        title: "FINCROSS",
        status: "Авторский веб-проект · онлайн-демо",
        role: "Интерактивный frontend и логика игрового сценария.",
        task: "Веб-игра с проверкой ответов и управлением состоянием раунда.",
        built: "Игровой интерфейс, таймер, проверка ответов и очки.",
        result: "Реализован самостоятельный интерактивный сценарий на React и TypeScript.",
      },
    ],
    partners: {
      title: "Техническая часть — на мне",
      text: "Работаю с заказчиками напрямую или в связке с вашей командой. Подхожу для отдельной страницы, доработки существующего сайта или разработки по готовому дизайну.",
      bullets: [
        "Получаю ТЗ, макет или ссылку на текущий сайт; уточняю границы задачи.",
        "Согласуем результат, срок и критерии приёмки до начала.",
        "Передаю исходники и инструкции; дополнительные изменения оцениваем отдельно.",
        "Формат общения, NDA и работа под брендом агентства — по договорённости.",
      ],
      cta: "Прислать задачу на оценку",
    },
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
      headline: "I build websites and web tools for businesses",
      subtext:
        "Landing pages, multi-page sites and targeted improvements. I work directly with clients or join agency and ad-specialist projects — from an existing design to launch.",
      telegramCta: "Discuss a task",
      projectsCta: "See work",
      panelAria: "Work quick facts",
      facts: [
        "Reply within a day",
        "Landing / multi-page websites",
        "From brief or existing design",
        "Source code and handoff",
      ],
    },
    sections: {
      services: {
        kicker: "02 / What I do",
        title: "Services",
        intro:
          "From landing pages and improvements to small tools. Scope and outcome are agreed upfront.",
      },
      examples: {
        kicker: "01 / Selected work",
        title: "Projects",
        intro:
          "Concepts and independent projects, with an explicit role and a verifiable deliverable.",
      },
      partners: {
        kicker: "03 / Collaboration",
        title: "For agencies and advertising specialists",
        intro: "Bring an individual task, an existing design or a scoped development assignment.",
      },
      process: {
        kicker: "04 / Process",
        title: "How the work goes",
        intro:
          "The path from a raw description to a result you can hand off and present.",
      },
      estimate: {
        kicker: "05 / Budget",
        title: "Estimate and budget",
        intro:
          "The estimate depends on scope, timing and how deeply the task needs to be shaped.",
      },
      contact: {
        kicker: "06 / Contact",
        title: "Start a project",
        intro:
          "Send a short description and I will help break down the task and next step.",
      },
    },
    labels: {
      task: "Focus",
      built: "Implementation",
      result: "Result",
      role: "My role",
      output: "Output",
    },
    services: [
      {
        title: "Websites and landing pages",
        outcome: "Responsive pages for services, products and advertising campaigns.",
        deliverables: ["structure and frontend", "mobile layouts", "deployment and source files"],
      },
      {
        title: "Website improvements",
        outcome: "I join an existing project to solve a specific issue or add a feature.",
        deliverables: ["UI fixes", "forms and inquiry flows", "integrations scoped in the brief"],
      },
      {
        title: "Tools and automation",
        outcome: "Small web tools, scripts and workflow automation.",
        deliverables: ["working tool", "tested flows", "instructions and code"],
      },
      {
        title: "Design and presentations",
        outcome: "Additional visual work: materials, decks and layouts for presenting ideas.",
        deliverables: ["structure and visual direction", "layouts", "PPTX / PDF exports"],
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
        status: "Concept demo · live preview",
        role: "Page structure, interface, frontend and calculator.",
        task: "A landing-page concept for renovation services with a clear inquiry path.",
        built: "Responsive layout, service sections, calculator and Telegram contact link.",
        result: "A working demo from service discovery to inquiry; conversion was not measured.",
      },
      {
        id: "p0",
        title: "Lak and Point",
        status: "Independent concept · live demo",
        role: "Visual system, motion and responsive frontend.",
        task: "Beauty landing-page concept balancing visual identity with essential details.",
        built: "Hero, animation, price-list section and booking flow.",
        result: "A frontend concept; no commercial performance metrics claimed.",
      },
      {
        id: "p2",
        title: "IMGIFTED FEST",
        status: "Demonstration project · live demo",
        role: "Structure, editorial visual direction and responsive layout.",
        task: "A poster-like event page with readable categories and schedule.",
        built: "Day sections, category blocks and program navigation.",
        result: "A demonstration interface for viewing the program across screen sizes.",
      },
      {
        id: "p3",
        title: "FINCROSS",
        status: "Independent web project · live demo",
        role: "Interactive frontend and round-state logic.",
        task: "A browser game with answer validation and round management.",
        built: "Game interface, timer, answer checks and scoring.",
        result: "A standalone interactive flow built with React and TypeScript.",
      },
    ],
    partners: {
      title: "I handle the technical execution",
      text: "I work directly with clients or as part of your delivery process. Suitable for individual pages, targeted improvements or development from an existing design.",
      bullets: [
        "Share a brief, design or current website; we clarify scope.",
        "Agree on deliverables, timing and acceptance before work starts.",
        "Source code and handoff notes are included; added scope is quoted separately.",
        "Communication model, NDA and white-label work are subject to agreement.",
      ],
      cta: "Send a task for estimation",
    },
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
