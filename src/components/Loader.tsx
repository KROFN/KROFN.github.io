import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

interface LoaderProps {
  label: string;
  lead: string;
  trail: string;
  onDone: () => void;
}

export default function Loader({ label, lead, trail, onDone }: LoaderProps) {
  const [value, setValue] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useEnvironmentFlags();

  useEffect(() => {
    let rafId = 0;
    let timeoutId = 0;
    const duration = reducedMotion ? 700 : 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * 100));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      timeoutId = window.setTimeout(() => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: reducedMotion ? 0.4 : 0.95,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      }, reducedMotion ? 60 : 200);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [onDone, reducedMotion]);

  return (
    <div ref={rootRef} className="loader">
      <div className="loader-topline">
        <span>{label}</span>
        <span>{String(value).padStart(2, "0")}</span>
      </div>
      <div className="loader-counter">
        <span>{String(value).padStart(2, "0")}</span>
        <span className="loader-counter-suffix">%</span>
      </div>
      <div className="loader-footer">
        <span>{lead}</span>
        <span>{trail}</span>
      </div>
      <div className="loader-progress">
        <div className="loader-progress-bar" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
