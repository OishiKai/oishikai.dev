import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string(),
    techStack: z.array(z.string()).default([]),
    link: z.string().optional(),
    github: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    shortName: z.string(),
    description: z.string(),
    platform: z.string(),
    price: z.string(),
    rating: z.string().optional(),
    storeUrl: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    iconLabel: z.string(),
    iconGradient: z.string().default('from-primary-500 to-primary-700'),
    milestones: z.array(z.object({
      version: z.string(),
      date: z.string(),
      description: z.string(),
    })).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects, products };
