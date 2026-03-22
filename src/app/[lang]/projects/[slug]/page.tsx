import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { defaultLocale, supportedLocales, type Locale } from "@/constants/locales";
import { getAllProjectSlugs, getProjectBySlug } from "@/content/projects/loader";

type Params = {
  lang: string;
  slug: string;
};

type PageProps = {
  params: Promise<Params>;
};

function toLocale(lang: string): Locale {
  return supportedLocales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();

  return supportedLocales.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = await getProjectBySlug(slug, toLocale(lang));

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.metadata.title} | Projects`,
    description: project.metadata.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  const { metadata, content } = project;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-8">
      <Link
        href={`/${lang}/projects`}
        className="inline-block text-sm font-medium text-primary transition hover:opacity-80"
      >
        Back to projects
      </Link>

      <header className="mt-4 space-y-4 border-b border-[color:var(--border)] pb-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{metadata.title}</h1>
        <p className="max-w-3xl text-lg text-[color:var(--muted-foreground)]">{metadata.summary}</p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted-foreground)]">
          <span>{new Date(metadata.date).toLocaleDateString(metadata.resolvedLocale)}</span>
          <span>•</span>
          <span>{metadata.tags.join(", ") || "untagged"}</span>
          {metadata.requestedLocale !== metadata.resolvedLocale ? (
            <>
              <span>•</span>
              <span>
                Fallback content: {metadata.resolvedLocale.toUpperCase()}
              </span>
            </>
          ) : null}
        </div>
      </header>

      <article className="prose prose-slate mt-10 max-w-none dark:prose-invert">{content}</article>
    </main>
  );
}
