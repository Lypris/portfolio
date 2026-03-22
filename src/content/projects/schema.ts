import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().date(),
  coverImage: z.string().min(1),
  coverImageAlt: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().nonnegative().optional(),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const projectMetadataSchema = projectFrontmatterSchema.extend({
  slug: z.string().min(1),
  requestedLocale: z.string().min(2),
  resolvedLocale: z.string().min(2),
  availableLocales: z.array(z.string().min(2)),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
