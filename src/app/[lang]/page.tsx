import Image from "next/image";
import { getDictionary } from "./dictionaries";
import { Locale } from "../../../i18n-config";
import LocaleSwitcher from "./components/locale-switcher";
import "./globals.css";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  console.log("page lang", lang);
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl md:text-8xl font-bold leading-none">Rudy VIRQUIN</h1>
            <p className="text-lg mt-4 uppercase">Student Engineer<br/>5. Semester<br/>INSA Strasbourg</p>
        </div>

        <div>
          <LocaleSwitcher />
          <div>
            <p>Current locale: {lang}</p>
            <p>
              This text is rendered on the server:{" "}
              {dictionary["server-component"].welcome}
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
