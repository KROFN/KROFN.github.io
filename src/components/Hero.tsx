import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLang } from "../context/LangContext";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

export default function Hero() {
  const { copy } = useLang();
  const { reducedMotion } = useEnvironmentFlags();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.15 });

      timeline
        .from("[data-hero-line]", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
        })
        .from(
          "[data-hero-fade]",
          {
            y: 28,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          "[data-hero-orbit]",
          {
            scale: 0.9,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        );
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="hero" className="hero section-shell">
      <div className="hero-meta" data-hero-fade>
        <span>{copy.hero.eyebrow}</span>
        <span>{copy.hero.status}</span>
      </div>

      <div className="hero-grid">
        <div className="hero-title-block">
          <div className="line-mask">
            <div data-hero-line className="hero-name hero-name-primary">
              {copy.hero.name[0]}
            </div>
          </div>
          <div className="line-mask">
            <div data-hero-line className="hero-name hero-name-secondary">
              {copy.hero.name[1]}
            </div>
          </div>
          <div className="line-mask hero-role-mask">
            <div data-hero-line className="hero-role">
              {copy.hero.role}
            </div>
          </div>
          <p className="hero-trajectory" data-hero-fade>
            {copy.hero.trajectory}
          </p>
        </div>

        <div className="hero-side">
          <p className="hero-summary" data-hero-fade>
            {copy.hero.summary}
          </p>

          <div className="hero-orbit" data-hero-fade>
            {copy.hero.orbit.map((item) => (
              <span key={item} className="hero-orbit-chip" data-hero-orbit>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll" data-hero-fade>
        <div className="hero-scroll-line" />
        <span>{copy.ui.scrollLabel}</span>
      </div>
    </section>
  );
}
