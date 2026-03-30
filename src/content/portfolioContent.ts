import type { Locale, PortfolioCopy, ProjectItem } from "../types/portfolio";

export const projects: ProjectItem[] = [
  {
    id: "p0",
    image: "/img/smart-placeholder.jpg",
    demoUrl: "https://smart-otdelka.vercel.app/",
    repoUrl: "https://github.com/KROFN/smart-otdelka",
  },
  {
    id: "p1",
    image: "/img/p1.jpg",
    demoUrl: "https://karataeva-site.vercel.app/",
    repoUrl: "https://github.com/KROFN/karataeva-site",
  },
  {
    id: "p3",
    image: "/img/p3.jpg",
    demoUrl: "https://kraskovsky-crossword.vercel.app/",
    repoUrl: "https://github.com/KROFN/kraskovsky-crossword",
  },
  {
    id: "p2",
    image: "/img/p2.jpg",
    demoUrl: "https://imgifted-fest.vercel.app/",
    repoUrl: "https://github.com/KROFN/imgifted-fest",
  },
  {
    id: "p4",
    image: "/img/p4.jpg",
    repoUrl: "https://github.com/KROFN/melodine",
  },
];

export const portfolioContent: Record<Locale, PortfolioCopy> = {
  ru: {
    htmlLang: "ru",
    ui: {
      loading: "Инициализация портфолио",
      loaderLead: "Креативный инженерный сигнал",
      loaderTrail: "Запуск портфолио",
      viewLabel: "СМОТРЕТЬ",
      liveLabel: "ДЕМО",
      repoLabel: "КОД",
      scrollLabel: "Скролл",
    },
    hero: {
      eyebrow: "Sergey Kraskovsky / Creative Engineer / 2026",
      status: "Open for studio-level collaborations",
      name: ["SERGEY", "KRASKOVSKY"],
      role: "Creative Engineer",
      trajectory: "Fullstack / Python / Linux / DevOps trajectory",
      summary:
        "17-летний developer, который превращает интерфейсы в кинематографичный опыт. Проектирую и собираю продукты end-to-end, совмещая визуальную смелость, инженерную дисциплину и реальный shipping mindset.",
      orbit: ["Frontend systems", "Motion direction", "Infra thinking"],
    },
    sections: {
      projects: "02 / Selected Work",
      stack: "03 / Systems",
      contact: "04 / Contact",
    },
    projectIntro:
      "Выбранные запуски, в которых сочетаются визуальная подача, качество взаимодействия и реальная дисциплина shipping.",
    projects: {
      p0: {
        name: ["СМАРТ-ОТДЕЛКА"],
        category: "Лендинг / Ремонт квартир",
        summary:
          "Портфолио-лендинг для вымышленной компании по ремонту квартир: аккуратный визуальный стиль, калькулятор итоговой цены и быстрый переход в Telegram для заявки.",
        tech: "React | TypeScript | Vite",
        note: "Калькулятор и Telegram-конверсия",
      },
      p1: {
        name: ["ТЕПЛЫЕ", "КАДРЫ"],
        category: "Портфолио-лендинг",
        summary:
          "Персональный сайт с художественной подачей, галереей работ и лёгкой editorial-структурой для презентации специалиста.",
        tech: "React · TypeScript · CSS",
        note: "Identity-driven web experience",
      },
      p2: {
        name: ["IMGIFTED", "FEST"],
        category: "Платформа мероприятия",
        summary:
          "Сайт фестиваля одарённых детей с программой, регистрационными сценариями и структурой для участников и родителей.",
        tech: "React · TypeScript · Motion",
        note: "Event storytelling and clarity",
      },
      p3: {
        name: ["FINCROSS"],
        category: "Интерактивная игра",
        summary:
          "Игровой веб-опыт с проверкой ответов, таймером, системой очков и вниманием к динамике взаимодействия.",
        tech: "React · TypeScript · Game Logic",
        note: "Interaction-first experiment",
      },
      p4: {
        name: ["MELODINE"],
        category: "Музыкальный загрузчик",
        summary:
          "Интерактивное консольное приложение для поиска и загрузки музыки из плейлистов с многопоточной обработкой, ID3-тегами, локальной статистикой и TUI-интерфейсом.",
        tech: "Python · Rich · InquirerPy · SQLite",
        note: "TUI workflow with local music stats",
      },
    },
    stack: {
      heading: ["SYSTEMS", "THAT SHIP"],
      intro:
        "Комбинирую визуальный вкус и инженерную практику: от интерфейсов и motion до автоматизации, Linux-среды и продуманной инфраструктуры.",
      terminalCommand: "cat capabilities.manifest",
      terminalHint: "Current working focus: design-aware engineering",
      marquee: [
        "PYTHON",
        "REACT",
        "TYPESCRIPT",
        "GSAP",
        "SQLITE",
        "LINUX",
        "DOCKER",
        "AUTOMATION",
        "MONGODB",
        "NODE.JS",
        "DEVOPS",
      ],
      groups: [
        {
          title: "Languages",
          eyebrow: "Core syntax layer",
          items: [
            {
              name: "Python",
              focus: "Automation / tooling / backend thinking",
            },
            {
              name: "SQLite",
              focus: "Local persistence / lightweight app state",
            },
            {
              name: "TypeScript",
              focus: "Interface safety / app architecture",
            },
            {
              name: "Kotlin + Java",
              focus: "Expanding systems vocabulary",
            },
          ],
        },
        {
          title: "Frontend",
          eyebrow: "Visual systems layer",
          items: [
            {
              name: "React",
              focus: "Component systems / rapid delivery",
            },
            {
              name: "GSAP",
              focus: "Motion dramaturgy",
            },
            {
              name: "Vite + CSS",
              focus: "Fast iteration / clean output",
            },
          ],
        },
        {
          title: "Backend",
          eyebrow: "Application logic layer",
          items: [
            {
              name: "Node.js + Express",
              focus: "APIs / service logic / product features",
            },
            {
              name: "MongoDB",
              focus: "Content and auth-ready data flows",
            },
          ],
        },
        {
          title: "DevOps",
          eyebrow: "Runtime layer",
          items: [
            {
              name: "Linux",
              focus: "CLI confidence / environment control",
            },
            {
              name: "Docker + Git",
              focus: "Repeatability / deployment habits",
            },
          ],
        },
      ],
    },
    contact: {
      heading: ["ДАВАЙ", "ПОГОВОРИМ"],
      subline:
        "Открыт к проектам, стажировкам и studio-facing коллаборациям, где важны и вкус, и реализация.",
      telegramLabel: "Telegram",
      githubLabel: "GitHub",
      availability: "Открыт для фриланса, стажировок и studio-команд",
    },
    footer: {
      rights: "© 2026 Sergey Kraskovsky. Все права защищены.",
      signature: "Built with motion, systems and intent.",
    },
  },
  en: {
    htmlLang: "en",
    ui: {
      loading: "Booting portfolio sequence",
      loaderLead: "Creative engineer signal",
      loaderTrail: "Portfolio boot sequence",
      viewLabel: "VIEW",
      liveLabel: "LIVE",
      repoLabel: "CODE",
      scrollLabel: "Scroll",
    },
    hero: {
      eyebrow: "Sergey Kraskovsky / Creative Engineer / 2026",
      status: "Open for studio-level collaborations",
      name: ["SERGEY", "KRASKOVSKY"],
      role: "Creative Engineer",
      trajectory: "Fullstack / Python / Linux / DevOps trajectory",
      summary:
        "A 17-year-old developer shaping interfaces into cinematic digital experiences. I build products end to end, blending visual ambition, engineering discipline and a strong shipping mindset.",
      orbit: ["Frontend systems", "Motion direction", "Infra thinking"],
    },
    sections: {
      projects: "02 / Selected Work",
      stack: "03 / Systems",
      contact: "04 / Contact",
    },
    projectIntro:
      "Selected launches that balance visual presence, interaction quality and practical shipping.",
    projects: {
      p0: {
        name: ["SMART-OTDELKA"],
        category: "Landing / Apartment Renovation",
        summary:
          "A portfolio landing for a fictional apartment renovation company, featuring a final-price calculator, polished UI direction and direct Telegram lead routing.",
        tech: "React | TypeScript | Vite",
        note: "Calculator-driven conversion concept",
      },
      p1: {
        name: ["WARM", "FRAMES"],
        category: "Portfolio landing",
        summary:
          "A personal website with an editorial feel, project gallery and clear storytelling for a specialist-led brand presence.",
        tech: "React · TypeScript · CSS",
        note: "Identity-driven web experience",
      },
      p2: {
        name: ["IMGIFTED", "FEST"],
        category: "Event platform",
        summary:
          "A festival website built for gifted children, combining program flow, registration moments and participant-facing clarity.",
        tech: "React · TypeScript · Motion",
        note: "Event storytelling and clarity",
      },
      p3: {
        name: ["FINCROSS"],
        category: "Interactive game",
        summary:
          "A playful web experience with answer validation, a timer, scoring logic and a stronger focus on interaction design.",
        tech: "React · TypeScript · Game Logic",
        note: "Interaction-first experiment",
      },
      p4: {
        name: ["MELODINE"],
        category: "Music downloader",
        summary:
          "An interactive console app for searching and downloading music from playlists, with multithreaded processing, ID3 tagging, local stats and a TUI interface.",
        tech: "Python · Rich · InquirerPy · SQLite",
        note: "TUI workflow with local music stats",
      },
    },
    stack: {
      heading: ["SYSTEMS", "THAT SHIP"],
      intro:
        "I bridge visual taste and engineering practice, moving from interfaces and motion into automation, Linux workflows and infrastructure-minded execution.",
      terminalCommand: "cat capabilities.manifest",
      terminalHint: "Current working focus: design-aware engineering",
      marquee: [
        "PYTHON",
        "REACT",
        "TYPESCRIPT",
        "GSAP",
        "SQLITE",
        "LINUX",
        "DOCKER",
        "AUTOMATION",
        "MONGODB",
        "NODE.JS",
        "DEVOPS",
      ],
      groups: [
        {
          title: "Languages",
          eyebrow: "Core syntax layer",
          items: [
            {
              name: "Python",
              focus: "Automation / tooling / backend thinking",
            },
            {
              name: "SQLite",
              focus: "Local persistence / lightweight app state",
            },
            {
              name: "TypeScript",
              focus: "Interface safety / app architecture",
            },
            {
              name: "Kotlin + Java",
              focus: "Expanding systems vocabulary",
            },
          ],
        },
        {
          title: "Frontend",
          eyebrow: "Visual systems layer",
          items: [
            {
              name: "React",
              focus: "Component systems / rapid delivery",
            },
            {
              name: "GSAP",
              focus: "Motion dramaturgy",
            },
            {
              name: "Vite + CSS",
              focus: "Fast iteration / clean output",
            },
          ],
        },
        {
          title: "Backend",
          eyebrow: "Application logic layer",
          items: [
            {
              name: "Node.js + Express",
              focus: "APIs / service logic / product features",
            },
            {
              name: "MongoDB",
              focus: "Content and auth-ready data flows",
            },
          ],
        },
        {
          title: "DevOps",
          eyebrow: "Runtime layer",
          items: [
            {
              name: "Linux",
              focus: "CLI confidence / environment control",
            },
            {
              name: "Docker + Git",
              focus: "Repeatability / deployment habits",
            },
          ],
        },
      ],
    },
    contact: {
      heading: ["LET'S", "TALK"],
      subline:
        "Open to projects, internships and studio-facing collaborations where both taste and execution matter.",
      telegramLabel: "Telegram",
      githubLabel: "GitHub",
      availability: "Available for freelance / internships / studio teams",
    },
    footer: {
      rights: "© 2026 Sergey Kraskovsky. All rights reserved.",
      signature: "Built with motion, systems and intent.",
    },
  },
};
