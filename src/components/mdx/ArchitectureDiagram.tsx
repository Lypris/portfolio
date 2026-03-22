type ArchitectureDiagramProps = {
  title?: string;
};

export default function ArchitectureDiagram({
  title = "High-level architecture",
}: ArchitectureDiagramProps) {
  return (
    <figure className="my-8 not-prose overflow-hidden rounded-2xl border border-[color:var(--border)] bg-card p-5">
      <figcaption className="mb-4 text-sm font-semibold text-[color:var(--muted-foreground)]">
        {title}
      </figcaption>

      <svg
        viewBox="0 0 900 320"
        className="h-auto w-full"
        role="img"
        aria-label={title}
      >
        <rect x="20" y="40" width="240" height="100" rx="16" className="fill-sky-200/70 stroke-sky-500" />
        <text x="140" y="95" textAnchor="middle" className="fill-sky-950 text-base font-semibold">
          Next.js App Router
        </text>

        <rect x="330" y="40" width="240" height="100" rx="16" className="fill-emerald-200/70 stroke-emerald-500" />
        <text x="450" y="95" textAnchor="middle" className="fill-emerald-950 text-base font-semibold">
          Content Loader
        </text>

        <rect x="640" y="40" width="240" height="100" rx="16" className="fill-amber-200/70 stroke-amber-500" />
        <text x="760" y="95" textAnchor="middle" className="fill-amber-950 text-base font-semibold">
          MDX Components
        </text>

        <rect x="330" y="190" width="240" height="100" rx="16" className="fill-violet-200/70 stroke-violet-500" />
        <text x="450" y="245" textAnchor="middle" className="fill-violet-950 text-base font-semibold">
          content/projects/*
        </text>

        <path d="M260 90 H330" className="stroke-[3] stroke-slate-500" />
        <path d="M570 90 H640" className="stroke-[3] stroke-slate-500" />
        <path d="M450 140 V190" className="stroke-[3] stroke-slate-500" />
      </svg>
    </figure>
  );
}
