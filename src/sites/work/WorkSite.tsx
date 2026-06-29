import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { useLang } from "../../context/LangContext";
import { contacts, getWorkProject, workContent } from "../../content/workContent";
import { useEnvironmentFlags } from "../../hooks/useEnvironmentFlags";

function WorkSection({
  id,
  kicker,
  title,
  intro,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="work-section section-shell">
      <div className="work-section-head" data-work-reveal>
        <span>{kicker}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function WorkSite() {
  const { lang } = useLang();
  const { reducedMotion } = useEnvironmentFlags();
  const copy = workContent[lang];
  const siteRef = useRef<HTMLElement>(null);
  const scrollToServices = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const services = document.getElementById("services");

    if (!services) {
      return;
    }

    window.history.replaceState({}, "", "#services");
    window.scrollTo({
      top: services.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!siteRef.current) {
      return;
    }

    const revealTargets = siteRef.current.querySelectorAll<HTMLElement>("[data-work-reveal]");

    if (!revealTargets.length) {
      return;
    }

    if (reducedMotion) {
      gsap.set(revealTargets, {
        y: 0,
        autoAlpha: 1,
        clearProps: "transform,opacity,visibility",
      });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-work-reveal]",
        {
          y: 22,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.72,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        },
      );
    }, siteRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <main ref={siteRef} className="work-site">
        <section className="work-hero section-shell">
          <div className="work-hero-content">
            <h1 data-work-reveal>{copy.hero.headline}</h1>
            <p data-work-reveal>{copy.hero.subtext}</p>
            <div className="work-hero-actions" data-work-reveal>
              <a href={contacts.telegram} className="work-button is-primary">
                {copy.hero.telegramCta}
              </a>
              <a
                href="#services"
                className="work-button"
                onClickCapture={scrollToServices}
              >
                {copy.hero.servicesCta}
              </a>
            </div>
            <div className="work-hero-trust" aria-label={copy.hero.panelAria} data-work-reveal>
              {copy.hero.facts.map((fact) => (
                <div key={fact}>{fact}</div>
              ))}
            </div>
          </div>
        </section>

        <WorkSection
          id="services"
          kicker={copy.sections.services.kicker}
          title={copy.sections.services.title}
          intro={copy.sections.services.intro}
        >
          <div className="work-service-grid">
            {copy.services.map((service) => (
              <article key={service.title} className="work-card" data-work-reveal>
                <div className="work-card-top">
                  <h3>{service.title}</h3>
                  <p>{service.outcome}</p>
                </div>
                <ul>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="work-service-more" data-work-reveal>
            <div>
              <h3>{copy.servicesMore.title}</h3>
              <p>{copy.servicesMore.text}</p>
            </div>
            <a href={contacts.telegram} className="work-button">
              {copy.servicesMore.cta}
            </a>
          </div>
        </WorkSection>

        <WorkSection
          id="cases"
          kicker={copy.sections.examples.kicker}
          title={copy.sections.examples.title}
          intro={copy.sections.examples.intro}
        >
          <div className="work-example-list">
            {copy.examples.map((example, index) => {
              const project = getWorkProject(example.id);

              return (
                <article key={example.id} className="work-example" data-work-reveal>
                  <div className="work-example-media">
                    {project ? (
                      <img src={project.image} alt={`${example.title} preview`} />
                    ) : null}
                  </div>
                  <div className="work-example-copy">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{example.title}</h3>
                    <p className="work-case-lead">{example.task}</p>
                    <ul className="work-case-points">
                      <li>
                        <strong>{copy.labels.built}</strong>
                        <span>{example.built}</span>
                      </li>
                      <li>
                        <strong>{copy.labels.result}</strong>
                        <span>{example.result}</span>
                      </li>
                    </ul>
                    <div className="work-example-links">
                      {project?.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="is-primary-link"
                        >
                          {copy.buttons.demo}
                        </a>
                      ) : null}
                      {project?.repoUrl ? (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer">
                          {copy.buttons.code}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </WorkSection>

        <WorkSection
          id="process"
          kicker={copy.sections.process.kicker}
          title={copy.sections.process.title}
          intro={copy.sections.process.intro}
        >
          <div className="work-process-grid">
            {copy.process.map((step, index) => (
              <article key={step.title} className="work-process-step" data-work-reveal>
                <span>{String(index + 1).padStart(2, "0")} /</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <strong>
                  {copy.labels.output}: {step.output}
                </strong>
              </article>
            ))}
          </div>
        </WorkSection>

        <WorkSection
          id="estimate"
          kicker={copy.sections.estimate.kicker}
          title={copy.sections.estimate.title}
          intro={copy.sections.estimate.intro}
        >
          <div className="work-estimate" data-work-reveal>
            <div className="work-estimate-main">
              <div className="work-budget-tiers">
                {copy.estimate.tiers.map((tier) => (
                  <article key={tier.name} className="work-budget-tier">
                    <h3>{tier.name}</h3>
                    <p>{tier.description}</p>
                    <strong>
                      {copy.labels.output}: {tier.output}
                    </strong>
                  </article>
                ))}
              </div>
            </div>
            <div className="work-estimate-factors">
              <strong>{copy.estimate.factorsTitle}</strong>
              <ul>
                {copy.estimate.factors.map((factor) => (
                  <li key={factor}>{factor}</li>
                ))}
              </ul>
            </div>
            <div className="work-estimate-cta">
              <p>{copy.estimate.ctaText}</p>
              <a href={contacts.telegram} className="work-button is-primary">
                {copy.estimate.cta}
              </a>
            </div>
          </div>
        </WorkSection>

        <WorkSection
          id="contact"
          kicker={copy.sections.contact.kicker}
          title={copy.sections.contact.title}
          intro={copy.sections.contact.intro}
        >
          <div className="work-contact" data-work-reveal>
            <div className="work-contact-lead">
              <p className="work-contact-lead-title">
                {copy.contact.leadTitle}
              </p>
              <p className="work-contact-lead-subtitle">
                {copy.contact.leadSubtitle}
              </p>
            </div>
            <div className="work-contact-action">
              <strong>{copy.contact.response}</strong>
              <ol className="work-contact-checklist">
                {copy.contact.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <div className="work-contact-actions">
                <a
                  href={contacts.telegram}
                  className="work-button is-primary is-xl is-block has-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="work-button-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M21.4 4.2 2.6 10.9c-1 .4-1 1-.2 1.3l4.7 1.5 1.8 5.6c.2.6.1.9.6.9s.6-.3.9-.6l2.3-2.3 4.6 3.4c.9.5 1.5.2 1.7-.8l3-14.3c.3-1.2-.4-1.7-1.8-1.2zM9.8 14.5l7.8-4.9c.4-.2.7 0 .4.4l-6.6 6-.2 2.8-.4-4.3z" />
                  </svg>
                  {copy.buttons.telegram}
                </a>
              </div>
              <p className="work-contact-note">{copy.contact.note}</p>
            </div>
          </div>
        </WorkSection>
    </main>
  );
}
