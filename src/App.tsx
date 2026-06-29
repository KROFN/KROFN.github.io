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

const ROUTE_IMAGE_WAIT_LIMIT = 7000;

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

function useRouteImageLoad(route: RouteKey) {
  const [assetProgress, setAssetProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let frameId = 0;
    let timeoutId = 0;
    const cleanupCallbacks: Array<() => void> = [];

    setAssetProgress(0);
    setAssetsReady(false);

    const markReady = () => {
      if (isCancelled) {
        return;
      }

      setAssetProgress(1);
      setAssetsReady(true);
    };

    frameId = window.requestAnimationFrame(() => {
      if (isCancelled) {
        return;
      }

      const page = document.querySelector<HTMLElement>(`.page-${route}`);
      const images = Array.from(page?.querySelectorAll<HTMLImageElement>("img[src]") ?? []);

      if (!images.length) {
        markReady();
        return;
      }

      let finishedCount = images.filter((image) => image.complete).length;
      setAssetProgress(finishedCount / images.length);

      if (finishedCount >= images.length) {
        markReady();
        return;
      }

      const handleImageDone = () => {
        if (isCancelled) {
          return;
        }

        finishedCount += 1;
        setAssetProgress(Math.min(finishedCount / images.length, 1));

        if (finishedCount >= images.length) {
          markReady();
        }
      };

      images.forEach((image) => {
        if (image.complete) {
          return;
        }

        image.addEventListener("load", handleImageDone, { once: true });
        image.addEventListener("error", handleImageDone, { once: true });
        cleanupCallbacks.push(() => {
          image.removeEventListener("load", handleImageDone);
          image.removeEventListener("error", handleImageDone);
        });
      });

      timeoutId = window.setTimeout(markReady, ROUTE_IMAGE_WAIT_LIMIT);
    });

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, [route]);

  return { assetProgress, assetsReady };
}

function PortfolioShell() {
  const [readyRoute, setReadyRoute] = useState<RouteKey | null>(null);
  const pathname = usePathname();
  const route = useMemo(() => getRoute(pathname), [pathname]);
  const { copy } = useLang();
  const { canHover, reducedMotion } = useEnvironmentFlags();
  const { assetProgress, assetsReady } = useRouteImageLoad(route);
  const isReady = readyRoute === route;
  const handleLoaderDone = useCallback(() => setReadyRoute(route), [route]);

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
          assetProgress={assetProgress}
          assetsReady={assetsReady}
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
