import { defaultLocale, supportedLocales, type Locale } from "@/constants/locales";
import { getAllProjects } from "@/content/projects/loader";

import ArticleComponent from "./components/ArticleComponent";

type Props = {
    params: Promise<{ lang: string }>;
};

function toLocale(value: string): Locale {
    return supportedLocales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export const dynamic = "force-static";

export default async function ProjectsPage({ params }: Props) {
    const { lang } = await params;
    const locale = toLocale(lang);
    const projects = await getAllProjects(locale);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
            <div className="mb-8 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
                <p className="max-w-3xl text-[color:var(--muted-foreground)]">
                    Each project card is generated from local MDX frontmatter with locale fallback.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ArticleComponent key={`${project.slug}-${project.resolvedLocale}`} lang={lang} project={project} />
                ))}
            </div>
        </main>
    );
}
