import { z } from "astro/zod";

import experienceJson from "./experience.json";
import projectsJson from "./projects.json";
import stackJson from "./stack.json";

/*
 * The portfolio's content lives in the JSON files next to this module.
 * Parsing them here means a typo or a leftover field fails `astro build`
 * instead of rendering a broken page, the same guarantee the blog's
 * frontmatter schema gives.
 */

const Role = z
  .object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
    /** Systems the work connected, in the order a message passes them. */
    route: z.array(z.string()).min(2),
    highlights: z.array(z.string()).min(1),
    tag: z.array(z.string()),
  })
  .strict();

const Project = z
  .object({
    title: z.string(),
    link: z.url(),
    description: z.string(),
    tag: z.array(z.string()),
  })
  .strict();

/** Rendering order, roughly from what I write in to what I run it on. */
export const STACK_GROUPS = [
  "Languages",
  "Frameworks",
  "Data",
  "Integration & Ops",
  "AI",
] as const;

const StackItem = z
  .object({
    name: z.string(),
    group: z.enum(STACK_GROUPS),
  })
  .strict();

export type Role = z.infer<typeof Role>;

const stackItems = z.array(StackItem).parse(stackJson);

export const experience = z.array(Role).parse(experienceJson);
export const projects = z.array(Project).parse(projectsJson);
export const stack = STACK_GROUPS.map((group) => ({
  group,
  items: stackItems.filter((item) => item.group === group).map((item) => item.name),
})).filter(({ items }) => items.length > 0);
