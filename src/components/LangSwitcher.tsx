import { useLang } from "../context/LangContext";
import type { Locale } from "../types/portfolio";

const locales: Locale[] = ["ru", "en"];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-switcher" aria-label="Language switcher">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          className={locale === lang ? "is-active" : ""}
          onClick={() => setLang(locale)}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
