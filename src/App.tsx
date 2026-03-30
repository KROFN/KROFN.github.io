import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import FooterSection from "./components/FooterSection";
import Hero from "./components/Hero";
import LangSwitcher from "./components/LangSwitcher";
import Loader from "./components/Loader";
import Projects from "./components/Projects";
import StackSection from "./components/StackSection";
import { LangProvider, useLang } from "./context/LangContext";
import { useEnvironmentFlags } from "./hooks/useEnvironmentFlags";

gsap.registerPlugin(ScrollTrigger);

function PortfolioShell() {
  const [isReady, setIsReady] = useState(false);
  const { copy } = useLang();
  const { canHover, reducedMotion } = useEnvironmentFlags();

  useEffect(() => {
    if (!(canHover && !reducedMotion)) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");

    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, [canHover, reducedMotion]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1,
    });

    let rafId = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(frame);
    };

    lenis.on("scroll", ScrollTrigger.update);
    rafId = window.requestAnimationFrame(frame);
    window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isReady, reducedMotion]);

  return (
    <>
      <Cursor label={copy.ui.viewLabel} />
      <LangSwitcher />
      {!isReady && (
        <Loader
          label={copy.ui.loading}
          lead={copy.ui.loaderLead}
          trail={copy.ui.loaderTrail}
          onDone={() => setIsReady(true)}
        />
      )}
      <div className="app-shell" aria-hidden="true">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="ambient-grid" />
      </div>
      <main className={`page ${isReady ? "page-ready" : ""}`}>
        <Hero />
        <Projects />
        <StackSection />
        <FooterSection />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <PortfolioShell />
    </LangProvider>
  );
}
