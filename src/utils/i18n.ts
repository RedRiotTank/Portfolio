import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";
import zh from "../locales/zh.json";
import ja from "../locales/ja.json";

export const languages = {
  en: { label: "English", flag: "🇬🇧", dict: en },
  es: { label: "Español", flag: "🇪🇸", dict: es },
  fr: { label: "Français", flag: "🇫🇷", dict: fr },
  de: { label: "Deutsch", flag: "🇩🇪", dict: de },
  zh: { label: "中文", flag: "🇨🇳", dict: zh },
  ja: { label: "日本語", flag: "🇯🇵", dict: ja },
};

export const defaultLang = "en";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof typeof en) {
    const dict = languages[lang].dict as Record<string, string>;
    const defaultDict = languages[defaultLang].dict as Record<string, string>;

    return dict[key] || defaultDict[key] || key;
  };
}

export function getRouteFromUrl(url: URL, targetLang: string) {
  const [, currentLangPrefix] = url.pathname.split("/");
  let pathWithoutLang = url.pathname;

  if (currentLangPrefix in languages) {
    pathWithoutLang = url.pathname.replace(`/${currentLangPrefix}`, "") || "/";
  }

  if (targetLang === defaultLang) return pathWithoutLang;
  return `/${targetLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
}

export function translatePath(path: string, lang: string) {
  return lang === defaultLang ? path : `/${lang}${path === "/" ? "" : path}`;
}
