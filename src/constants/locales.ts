const locales = [{ locale: "en" }, { locale: "fr" }, { locale: "de" }] as const;
const supportedLocales = locales.map((entry) => entry.locale);
const defaultLocale = "en";

type Locale = (typeof locales)[number]["locale"];

export { defaultLocale, locales, supportedLocales };
export type { Locale };