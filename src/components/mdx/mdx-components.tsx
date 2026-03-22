import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import ArchitectureDiagram from "./ArchitectureDiagram";
import Callout from "./Callout";

type MdxImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

function parseDimension(value: number | string | undefined, fallback: number) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function MdxImage({ src = "", alt = "", width, height }: MdxImageProps) {
  return (
    <span className="my-6 block not-prose overflow-hidden rounded-2xl border border-[color:var(--border)] bg-card">
      <Image
        src={src}
        alt={alt}
        width={parseDimension(width, 1280)}
        height={parseDimension(height, 720)}
        className="h-auto w-full"
        sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
      />
    </span>
  );
}

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  children?: ReactNode;
};

function CodeBlock({ children, className, ...props }: PreProps) {
  const classes = [
    "my-6 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <pre className={classes} {...props}>
      {children}
    </pre>
  );
}

export const mdxComponents: MDXComponents = {
  img: MdxImage,
  pre: CodeBlock,
  Callout,
  ArchitectureDiagram,
};
