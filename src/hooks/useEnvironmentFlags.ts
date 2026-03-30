import { useEffect, useState } from "react";

interface EnvironmentFlags {
  canHover: boolean;
  reducedMotion: boolean;
}

function getFlags(): EnvironmentFlags {
  return {
    canHover: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export function useEnvironmentFlags() {
  const [flags, setFlags] = useState<EnvironmentFlags>(getFlags);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setFlags(getFlags());

    hoverQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      hoverQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return flags;
}
