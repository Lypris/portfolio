import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-providers";
import MainLayout from "@components/main-layout";
import { getDictionary } from "./dictionaries";

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

export async function getStaticParams() {
  return {
    lang: ["en", "fr", "de"],
  };
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout({ children, params: { lang } }: Readonly<Props>) {
    
  console.log("layout lang", lang)

  const dict = await getDictionary(lang);

  return (
    <html className="h-full" lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainLayout lang={lang} dict={dict}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
