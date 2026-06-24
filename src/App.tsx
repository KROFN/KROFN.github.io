import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import LangSwitcher from "./components/LangSwitcher";
import Loader from "./components/Loader";
import SiteNav from "./components/shared/SiteNav";
import { LangProvider, useLang } from "./context/LangContext";
import { useEnvironmentFlags } from "./hooks/useEnvironmentFlags";
import CreativeSite from "./sites/creative/CreativeSite";
import GatewaySite from "./sites/gateway/GatewaySite";
import WorkSite from "./sites/work/WorkSite";

gsap.registerPlugin(ScrollTrigger);

type RouteKey = "gateway" | "creative" | "work" | "unknown";

function getRoute(pathname: string): RouteKey {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/") {
    return "gateway";
  }

  if (normalized === "/creative") {
    return "creative";
  }

  if (normalized === "/work") {
    return "work";
  }

  return "unknown";
}

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("portfolio:navigate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("portfolio:navigate", handlePopState);
    };
  }, []);

  return pathname;
}

function useInternalNavigation() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href);
      const isInternal =
        url.origin === window.location.origin &&
        ["/", "/creative", "/work"].includes(url.pathname);

      if (
        !isInternal ||
        anchor.target ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (url.pathname === window.location.pathname && url.hash) {
        return;
      }

      event.preventDefault();

      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, "", url.pathname);
        window.dispatchEvent(new Event("portfolio:navigate"));
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
}

function NotFoundSite() {
  const { lang } = useLang();
  const copy =
    lang === "ru"
      ? {
          title: "Маршрут не найден",
          text: "Выбери один из двух режимов портфолио.",
        }
      : {
          title: "Route not found",
          text: "Choose one of the two portfolio modes.",
        };

  return (
    <main className="not-found section-shell">
      <h1>{copy.title}</h1>
      <p>{copy.text}</p>
      <div className="not-found-actions">
        <a href="/creative" className="magnetic-link">
          Creative
        </a>
        <a href="/work" className="magnetic-link">
          Work
        </a>
      </div>
    </main>
  );
}

function renderRoute(route: RouteKey): ReactNode {
  if (route === "creative") {
    return <CreativeSite />;
  }

  if (route === "work") {
    return <WorkSite />;
  }

  if (route === "unknown") {
    return <NotFoundSite />;
  }

  return <GatewaySite />;
}

function PortfolioShell() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const route = useMemo(() => getRoute(pathname), [pathname]);
  const { copy } = useLang();
  const { canHover, reducedMotion } = useEnvironmentFlags();
  const handleLoaderDone = useCallback(() => setIsReady(true), []);

  useInternalNavigation();

  useEffect(() => {
    document.body.dataset.route = route;

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);

      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: "instant" });
          ScrollTrigger.refresh();
        }, 100);

        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.setTimeout(() => ScrollTrigger.refresh(), 80);
  }, [route]);

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
      <Cursor label={route === "creative" ? copy.ui.viewLabel : ""} />
      <SiteNav active={route} />
      <LangSwitcher />
      {!isReady && (
        <Loader
          label={copy.ui.loading}
          lead={copy.ui.loaderLead}
          trail={copy.ui.loaderTrail}
          onDone={handleLoaderDone}
        />
      )}
      <div className="app-shell" aria-hidden="true">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="ambient-grid" />
      </div>
      <div className={`page page-${route} ${isReady ? "page-ready" : ""}`}>
        {renderRoute(route)}
      </div>
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
