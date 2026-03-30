import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { portfolioContent } from "../content/portfolioContent";
import type { Locale } from "../types/portfolio";

interface LangContextValue {
  lang: Locale;
  setLang: (nextLang: Locale) => void;
  copy: (typeof portfolioContent)[Locale];
}

const STORAGE_KEY = "sergey-portfolio-lang";

const LangContext = createContext<LangContextValue | null>(null);

function resolveInitialLang(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ru" || stored === "en") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(resolveInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = portfolioContent[lang].htmlLang;
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      copy: portfolioContent[lang],
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);

  if (!value) {
    throw new Error("useLang must be used within LangProvider");
  }

  return value;
}
