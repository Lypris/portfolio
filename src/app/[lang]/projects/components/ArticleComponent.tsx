import Image from "next/image";
import Link from "next/link";

import type { ProjectListItem } from "@/content/projects/loader";

type ArticleProps = {
  lang: string;
  project: ProjectListItem;
};

export default function ArticleComponent({ lang, project }: ArticleProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[color:var(--border)] bg-card text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/${lang}/projects/${project.slug}`} className="block">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt ?? project.title}
          width={1280}
          height={720}
          className="h-48 w-full object-cover"
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
        />

        <div className="space-y-3 p-5">
          <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
          <p className="line-clamp-3 text-sm text-[color:var(--muted-foreground)]">{project.summary}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.slug}-${tag}`}
                className="rounded-full border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--muted-foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center text-sm font-medium text-primary transition group-hover:opacity-80">
            Read project
          </span>
        </div>
      </Link>
    </article>
  );
}