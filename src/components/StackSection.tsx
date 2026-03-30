import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../context/LangContext";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

gsap.registerPlugin(ScrollTrigger);

export default function StackSection() {
  const { copy } = useLang();
  const { reducedMotion } = useEnvironmentFlags();
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeLoop = [...copy.stack.marquee, ...copy.stack.marquee];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-stack-reveal]", {
        y: 52,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="stack" className="stack section-shell">
      <div className="section-kicker" data-stack-reveal>
        {copy.sections.stack}
      </div>

      <div className="stack-header" data-stack-reveal>
        <div className="stack-heading">
          {copy.stack.heading.map((line, index) => (
            <div
              key={line}
              className={`stack-heading-line ${index === 1 ? "is-outline" : ""}`}
            >
              {line}
            </div>
          ))}
        </div>
        <p className="stack-intro">{copy.stack.intro}</p>
      </div>

      <div className="stack-marquee-wrap" data-stack-reveal>
        <div
          className="stack-marquee"
          style={{ ["--marquee-duration" as string]: "34s" }}
        >
          {marqueeLoop.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
        <div
          className="stack-marquee stack-marquee-reverse"
          style={{ ["--marquee-duration" as string]: "42s" }}
        >
          {[...marqueeLoop].reverse().map((item, index) => (
            <span key={`${item}-reverse-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="stack-terminal" data-stack-reveal>
        <div className="stack-terminal-top">
          <span className="stack-terminal-dots">
            <i />
            <i />
            <i />
          </span>
          <span>{copy.stack.terminalCommand}</span>
        </div>
        <div className="stack-terminal-hint">{copy.stack.terminalHint}</div>

        <div className="stack-grid">
          {copy.stack.groups.map((group) => (
            <section key={group.title} className="stack-column">
              <div className="stack-column-title">{group.title}</div>
              <div className="stack-column-eyebrow">{group.eyebrow}</div>
              <div className="stack-column-list">
                {group.items.map((item) => (
                  <div key={item.name} className="stack-item">
                    <div className="stack-item-head">
                      <span>{item.name}</span>
                      <span>{item.focus}</span>
                    </div>
                    {item.detail ? <p>{item.detail}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
