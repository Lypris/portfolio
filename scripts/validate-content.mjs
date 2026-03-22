import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const contentRoot = path.join(process.cwd(), "content", "projects");

const schema = z.object({
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

async function validate() {
  const folders = await fs.readdir(contentRoot, { withFileTypes: true });
  const errors = [];

  for (const folder of folders) {
    if (!folder.isDirectory()) {
      continue;
    }

    const projectPath = path.join(contentRoot, folder.name);
    const files = await fs.readdir(projectPath, { withFileTypes: true });
    const mdxFiles = files.filter((file) => file.isFile() && file.name.endsWith(".mdx"));

    if (mdxFiles.length === 0) {
      errors.push(`Project \"${folder.name}\" has no locale MDX files.`);
      continue;
    }

    for (const mdxFile of mdxFiles) {
      const fullPath = path.join(projectPath, mdxFile.name);
      const source = await fs.readFile(fullPath, "utf8");
      const frontmatter = matter(source).data;

      const result = schema.safeParse(frontmatter);
      if (!result.success) {
        errors.push(
          `${fullPath}: ${result.error.issues
            .map((issue) => `${issue.path.join(".") || "frontmatter"} ${issue.message}`)
            .join("; ")}`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("\nContent validation failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Content validation passed.");
}

validate().catch((error) => {
  console.error(error);
  process.exit(1);
});
