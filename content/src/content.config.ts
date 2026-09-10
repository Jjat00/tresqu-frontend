import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipo Tresqu'),
    tags: z.array(z.string()).default([]),
    // FAQs en frontmatter: se renderizan visibles Y como JSON-LD FAQPage,
    // así el schema nunca se desincroniza del contenido visible.
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    heading: z.string(),
    description: z.string().max(170),
    intro: z.string(),
    updatedDate: z.coerce.date(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
  }),
});

export const collections = { blog, solutions };
