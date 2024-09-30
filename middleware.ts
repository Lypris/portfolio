import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let headers = { "accept-language": "en-US, en, q=0.5" };
let languages = new Negotiator({ headers }).languages();

import { defaultLocale } from "@/constants/locales";
import { i18n } from "i18n-config";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}/`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );  
  
  if ( pathnameIsMissingLocale ) {
    return NextResponse.rewrite(
      new URL(
        `${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.nextUrl.href
      )
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next).*)",
  ]
};