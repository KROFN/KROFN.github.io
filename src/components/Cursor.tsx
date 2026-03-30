import { useEffect, useRef } from "react";
import { useEnvironmentFlags } from "../hooks/useEnvironmentFlags";

export default function Cursor({ label }: { label: string }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { canHover, reducedMotion } = useEnvironmentFlags();

  useEffect(() => {
    if (!(canHover && !reducedMotion)) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let rafId = 0;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        dot.classList.add("is-hovering");
        ring.classList.add("is-hovering");
      }
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        dot.classList.remove("is-hovering");
        ring.classList.remove("is-hovering");
      }
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.cancelAnimationFrame(rafId);
    };
  }, [canHover, reducedMotion]);

  if (!(canHover && !reducedMotion)) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-label={label} />
    </>
  );
}
