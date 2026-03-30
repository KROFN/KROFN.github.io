import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../content/portfolioContent";
import { useLang } from "../context/LangContext";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { copy } = useLang();
  const { canHover, reducedMotion } = useEnvironmentFlags();
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const triggerElement = sectionRef.current;
    const revealTargets = triggerElement.querySelectorAll<HTMLElement>("[data-project-reveal]");

    if (!revealTargets.length) {
      return;
    }

    if (reducedMotion) {
      // Ensure rows never stay hidden if a reveal tween was interrupted.
      gsap.set(revealTargets, {
        y: 0,
        autoAlpha: 1,
        clearProps: "transform,opacity,visibility",
      });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-project-reveal]",
        {
          y: 56,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: triggerElement,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!previewRef.current || !canHover) {
      return;
    }

    xToRef.current = gsap.quickTo(previewRef.current, "x", {
      duration: reducedMotion ? 0 : 0.35,
      ease: "power3.out",
    });

    yToRef.current = gsap.quickTo(previewRef.current, "y", {
      duration: reducedMotion ? 0 : 0.35,
      ease: "power3.out",
    });

    return () => {
      xToRef.current = null;
      yToRef.current = null;
    };
  }, [canHover, reducedMotion]);

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    if (!(canHover && sectionRef.current)) {
      return;
    }

    const bounds = sectionRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left + 28;
    const y = event.clientY - bounds.top - 128;

    if (xToRef.current && yToRef.current) {
      xToRef.current(x);
      yToRef.current(y);
      return;
    }

    if (previewRef.current) {
      gsap.set(previewRef.current, { x, y });
    }
  };

  const hoveredProject = hoveredProjectId
    ? projects.find((project) => project.id === hoveredProjectId) ?? null
    : null;

  return (
    <section ref={sectionRef} id="projects" className="projects section-shell">
      <div className="section-kicker" data-project-reveal>
        {copy.sections.projects}
      </div>

      <div className="section-heading-block" data-project-reveal>
        <p className="section-intro">{copy.projectIntro}</p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => {
          const projectCopy = copy.projects[project.id];

          return (
            <article
              key={project.id}
              className="project-row"
              data-project-reveal
            >
              <div className="project-index">{String(index + 1).padStart(2, "0")}</div>

              <div className="project-primary">
                <div
                  className="project-name"
                  data-cursor-hover
                  onMouseEnter={(event) => {
                    setHoveredProjectId(project.id);
                    movePreview(event);
                  }}
                  onMouseMove={movePreview}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {projectCopy.name.map((line) => (
                    <div key={line} className="project-name-line">
                      {line}
                    </div>
                  ))}
                </div>
                <div className="project-meta">
                  <span>{projectCopy.category}</span>
                  <span>{projectCopy.tech}</span>
                  <span>{projectCopy.note}</span>
                </div>
              </div>

              <div className="project-secondary">
                <p className="project-summary">{projectCopy.summary}</p>
                <img
                  className="project-inline-image"
                  src={project.image}
                  alt={`${projectCopy.name.join(" ")} preview`}
                />
                <div className="project-links">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" data-cursor-hover>
                      {copy.ui.liveLabel}
                    </a>
                  )}
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" data-cursor-hover>
                    {copy.ui.repoLabel}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div
        ref={previewRef}
        className={`project-float-preview ${hoveredProject ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="project-float-preview-media">
          {hoveredProject && (
            <img
              src={hoveredProject.image}
              alt={`${copy.projects[hoveredProject.id].name.join(" ")} preview`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
