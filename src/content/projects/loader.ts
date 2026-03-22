import "server-only";

import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import { defaultLocale, supportedLocales, type Locale } from "@/constants/locales";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  projectFrontmatterSchema,
  projectMetadataSchema,
  type ProjectMetadata,
} from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content", "projects");

export type ProjectListItem = ProjectMetadata;

export type ProjectDetail = {
  metadata: ProjectMetadata;
  content: React.ReactNode;
};

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

function normalizeLocale(locale: string): Locale {
  return isSupportedLocale(locale) ? locale : defaultLocale;
}

function projectFilePath(slug: string, locale: string) {
  return path.join(CONTENT_ROOT, slug, `${locale}.mdx`);
}

function sortProjects(a: ProjectListItem, b: ProjectListItem) {
  const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;

  if (aOrder !== bOrder) {
    return aOrder - bOrder;
  }

  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

async function readAvailableLocalesForSlug(slug: string) {
  const projectFolder = path.join(CONTENT_ROOT, slug);
  const entries = await fs.readdir(projectFolder, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""))
    .filter(isSupportedLocale);
}

export async function resolveProjectLocaleFile(slug: string, locale: string) {
  const requestedLocale = normalizeLocale(locale);
  const requestedPath = projectFilePath(slug, requestedLocale);

  if (await pathExists(requestedPath)) {
    return {
      filePath: requestedPath,
      requestedLocale,
      resolvedLocale: requestedLocale,
    } as const;
  }

  const fallbackPath = projectFilePath(slug, defaultLocale);

  if (await pathExists(fallbackPath)) {
    return {
      filePath: fallbackPath,
      requestedLocale,
      resolvedLocale: defaultLocale,
    } as const;
  }

  return null;
}

async function readProjectFrontmatter(slug: string, locale: string) {
  const resolved = await resolveProjectLocaleFile(slug, locale);
  if (!resolved) {
    return null;
  }

  const source = await fs.readFile(resolved.filePath, "utf8");
  const availableLocales = await readAvailableLocalesForSlug(slug);
  const parsedMatter = matter(source);
  const baseMetadata = projectFrontmatterSchema.parse(parsedMatter.data);

  const metadata = projectMetadataSchema.parse({
    ...baseMetadata,
    slug,
    requestedLocale: resolved.requestedLocale,
    resolvedLocale: resolved.resolvedLocale,
    availableLocales,
  });

  return { metadata, source: parsedMatter.content, resolved };
}

export const getAllProjectSlugs = cache(async () => {
  const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
});

export const getAllProjects = cache(async (locale: Locale) => {
  const slugs = await getAllProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const record = await readProjectFrontmatter(slug, locale);
      if (!record) {
        return null;
      }

      if (!record.metadata.published) {
        return null;
      }

      return record.metadata;
    }),
  );

  return projects.filter((project): project is ProjectListItem => project !== null).sort(sortProjects);
});

export const getProjectBySlug = cache(async (slug: string, locale: Locale) => {
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return null;
  }

  const record = await readProjectFrontmatter(slug, locale);
  if (!record || !record.metadata.published) {
    return null;
  }

  const mdx = await compileMDX<unknown>({
    source: record.source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light-high-contrast",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return {
    metadata: record.metadata,
    content: mdx.content,
  } satisfies ProjectDetail;
});
