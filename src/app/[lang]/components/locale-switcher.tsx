"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../../../i18n-config";

const localeFlags: Record<Locale, string> = {
  en: "GB",
  fr: "FR",
  de: "DE",
};

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const currentLocale = React.useMemo(() => {
    if (!pathName) return i18n.defaultLocale;
    const segments = pathName.split("/");
    const locale = segments[1];
    return i18n.locales.includes(locale as Locale)
      ? (locale as Locale)
      : i18n.defaultLocale;
  }, [pathName]);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex items-center gap-2">
        {i18n.locales.map((locale) => {
          if (locale === currentLocale) return null;

          return (
            <li key={locale}>
              <Link
                href={redirectedPathName(locale)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-background text-xs font-semibold text-foreground hover:text-primary"
                aria-label={`Switch language to ${locale}`}
              >
                {localeFlags[locale]}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}