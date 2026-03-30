import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../context/LangContext";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.262.82-.576 0-.287-.012-1.238-.018-2.244-3.339.725-4.043-1.419-4.043-1.419-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.238 1.84 1.238 1.072 1.837 2.812 1.307 3.497.999.108-.776.42-1.306.764-1.606-2.665-.303-5.466-1.335-5.466-5.94 0-1.312.468-2.382 1.235-3.222-.123-.303-.536-1.525.117-3.178 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.006-.405c1.02.006 2.047.138 3.006.405 2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.243 2.875.12 3.178.768.84 1.233 1.91 1.233 3.222 0 4.617-2.807 5.634-5.48 5.93.432.372.816 1.104.816 2.225 0 1.606-.015 2.902-.015 3.297 0 .317.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12Z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.054 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941Z"
      />
    </svg>
  );
}

function MagneticLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { canHover, reducedMotion } = useEnvironmentFlags();

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!(canHover && !reducedMotion) || !linkRef.current) {
      return;
    }

    const bounds = linkRef.current.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);

    gsap.to(linkRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!linkRef.current) {
      return;
    }

    gsap.to(linkRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="magnetic-link"
      data-cursor-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span>{label}</span>
    </a>
  );
}

export default function FooterSection() {
  const { copy } = useLang();
  const { reducedMotion } = useEnvironmentFlags();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-footer-reveal]", {
        y: 52,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <footer ref={sectionRef} id="contact" className="footer section-shell">
      <div className="section-kicker" data-footer-reveal>
        {copy.sections.contact}
      </div>

      <div className="footer-heading" data-footer-reveal>
        {copy.contact.heading.map((line, index) => (
          <div key={line} className={index === 1 ? "is-outline" : ""}>
            {line}
          </div>
        ))}
      </div>

      <div className="footer-content" data-footer-reveal>
        <div className="footer-copy">
          <p>{copy.contact.subline}</p>
          <span>{copy.contact.availability}</span>
        </div>

        <div className="footer-actions">
          <MagneticLink href="https://t.me/krofn" label={copy.contact.telegramLabel}>
            <TelegramIcon />
          </MagneticLink>
          <MagneticLink href="https://github.com/KROFN" label={copy.contact.githubLabel}>
            <GithubIcon />
          </MagneticLink>
        </div>
      </div>

      <div className="footer-bottom" data-footer-reveal>
        <span>{copy.footer.rights}</span>
        <span>{copy.footer.signature}</span>
      </div>
    </footer>
  );
}
