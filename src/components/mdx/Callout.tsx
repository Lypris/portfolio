import { ReactNode } from "react";

type CalloutVariant = "info" | "success" | "warning";

type CalloutProps = {
  title?: string;
  variant?: CalloutVariant;
  children: ReactNode;
};

const stylesByVariant: Record<CalloutVariant, string> = {
  info: "border-sky-300/80 bg-sky-50/70 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100",
  success:
    "border-emerald-700 bg-emerald-300 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-900/35 dark:text-emerald-100",
  warning:
    "border-amber-300/80 bg-amber-50/70 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100",
};

export default function Callout({
  title,
  variant = "info",
  children,
}: CalloutProps) {
  return (
    <aside className={`my-6 rounded-xl border px-4 py-3 ${stylesByVariant[variant]}`}>
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
