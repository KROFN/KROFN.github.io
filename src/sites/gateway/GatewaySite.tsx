import { useLang } from "../../context/LangContext";

const gatewayContent = {
  ru: {
    title: "KROFN",
    subtitle: "Два входа в один проект.",
    hint:
      "Если пришёл по делу — выбирай Work. Если хочешь посмотреть основное портфолио — Creative.",
    entries: [
      {
        title: "CREATIVE",
        description:
          "Личное портфолио: creative engineering, motion, frontend-системы и эксперименты.",
        button: "Открыть Creative",
        href: "/creative",
      },
      {
        title: "WORK",
        description:
          "Сайты, лендинги и доработки для бизнеса. Разработка напрямую или в команде агентства.",
        button: "Заказать работу",
        href: "/work",
      },
    ],
  },
  en: {
    title: "KROFN",
    subtitle: "Two ways to enter.",
    hint:
      "If you came for paid work — choose Work. If you want the main personal portfolio — choose Creative.",
    entries: [
      {
        title: "CREATIVE",
        description:
          "Personal portfolio: creative engineering, motion, frontend systems and experiments.",
        button: "Open Creative",
        href: "/creative",
      },
      {
        title: "WORK",
        description:
          "Websites, landing pages and improvements for businesses, delivered directly or with agency teams.",
        button: "Start a project",
        href: "/work",
      },
    ],
  },
} as const;

export default function GatewaySite() {
  const { lang } = useLang();
  const copy = gatewayContent[lang];

  return (
    <section className="gateway section-shell">
        <div className="gateway-hero">
          <div>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
          </div>
          <span className="gateway-hint">{copy.hint}</span>
        </div>

        <div className="gateway-cards">
          {copy.entries.map((entry) => (
            <article key={entry.title} className="gateway-card">
              <div>
                <span className="gateway-card-index">
                  {entry.title === "CREATIVE" ? "01" : "02"}
                </span>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
              </div>
              <a href={entry.href} className="gateway-card-link">
                {entry.button}
              </a>
            </article>
          ))}
        </div>
    </section>
  );
}
