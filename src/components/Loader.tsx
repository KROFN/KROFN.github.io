import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

interface LoaderProps {
  label: string;
  lead: string;
  trail: string;
  assetProgress: number;
  assetsReady: boolean;
  onDone: () => void;
}

export default function Loader({
  label,
  lead,
  trail,
  assetProgress,
  assetsReady,
  onDone,
}: LoaderProps) {
  const [timeProgress, setTimeProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const isDoneRef = useRef(false);
  const { reducedMotion } = useEnvironmentFlags();
  const value =
    assetsReady && timeProgress >= 1
      ? 100
      : Math.min(
          99,
          Math.round(timeProgress * 76 + Math.max(0, Math.min(assetProgress, 1)) * 24),
        );

  useEffect(() => {
    let rafId = 0;
    const duration = reducedMotion ? 700 : 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTimeProgress(eased);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!assetsReady || timeProgress < 1 || isDoneRef.current) {
      return;
    }

    isDoneRef.current = true;

    const timeoutId = window.setTimeout(() => {
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: reducedMotion ? 0.4 : 0.95,
        ease: "power4.inOut",
        onComplete: onDone,
      });
    }, reducedMotion ? 60 : 200);

    return () => window.clearTimeout(timeoutId);
  }, [assetsReady, onDone, reducedMotion, timeProgress]);

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
