import { defaultLocale } from "@/constants/locales";
import { i18n } from "./i18n-config";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle the root case (localhost:3000)
  if (pathname === "/") {
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}`, // Rewrite root to default locale
        request.url
      )
    );
  }

  // Check if the pathname is missing a locale and rewrite
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Keep existing path and add locale prefix for App Router [lang] segment.
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js paths (_next)
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};