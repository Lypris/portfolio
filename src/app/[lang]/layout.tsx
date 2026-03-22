import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MainLayout from "@components/main-layout";
import { getDictionary } from "./dictionaries";
import { ThemeProvider } from "./theme-providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rudy VIRQUIN",
  description: "Portfolio de Rudy Virquin",
};

export async function generateStaticParams() {
  return [ {lang: "en"}, {lang: "fr"}, {lang: "de"} ];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { lang } = await params;

  const dict = await getDictionary(lang || 'fr');

  return (
    <html className="h-full" lang={lang || 'fr'} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <ThemeProvider>
          <MainLayout lang={lang} dict={dict}>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
