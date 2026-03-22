import { getDictionary } from "./dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 sm:py-12 font-[family-name:var(--font-geist-sans)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 rounded-2xl border border-[color:var(--border)] bg-card/40 p-6 sm:p-10 lg:flex-row lg:items-start">
        <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-8xl font-bold leading-none">{dict.home.name}</h1>
            <p className="text-lg mt-4 uppercase">
              {dict.home.role}
              <br />
              {dict.home.semester}
              <br />
              {dict.home.school}
            </p>
        </div>

        <div className="w-full max-w-xs rounded-xl border border-[color:var(--border)] bg-card/70 p-4 lg:mt-2">
          <div className="space-y-1 text-sm text-[color:var(--muted-foreground)]">
            <p>{dict.home.currentLocaleLabel}: {lang}</p>
            <p>
              {dict.home.serverRenderedLabel}{" "}
              {dict["server-component"].welcome}
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
