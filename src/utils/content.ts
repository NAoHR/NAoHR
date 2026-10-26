import { z } from "astro/zod";

import employersJson from "./employers.json";
import experienceJson from "./experience.json";
import projectsJson from "./projects.json";
import stackJson from "./stack.json";

/*
 * The portfolio's content lives in the JSON files next to this module.
 * Parsing them here means a typo or a leftover field fails `astro build`
 * instead of rendering a broken page, the same guarantee the blog's
 * frontmatter schema gives.
 */

/** Systems in the order a message passes them; drawn as boxes and lines. */
const Route = z.array(z.string()).min(2);

const Employer = z
  .object({
    name: z.string(),
    place: z.string(),
    period: z.string(),
    summary: z.string(),
    /** Job titles held there, oldest first. */
    ladder: z.array(z.object({ title: z.string(), since: z.string() }).strict()).min(1),
  })
  .strict();

const Role = z
  .object({
    /** What the work achieved; the visible heading. */
    headline: z.string(),
    /** The project's own name. */
    title: z.string(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
    route: Route,
    /** One-paragraph result shown without expanding the details. */
    impact: z.string(),
    highlights: z.array(z.string()).min(1),
    tag: z.array(z.string()),
  })
  .strict();

const FeaturedProject = z
  .object({
    title: z.string(),
    year: z.string(),
    /** Shown next to the year, e.g. "private" for a repo with no public link. */
    note: z.string().optional(),
    link: z.url().optional(),
    route: Route,
    description: z.string(),
    tag: z.array(z.string()),
  })
  .strict();

const EarlierProject = z
  .object({
    title: z.string(),
    link: z.url(),
    summary: z.string(),
  })
  .strict();

const Projects = z
  .object({
    featured: z.array(FeaturedProject),
    earlier: z.array(EarlierProject),
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

const employers = z.array(Employer).parse(employersJson);
const roles = z.array(Role).parse(experienceJson);
const stackItems = z.array(StackItem).parse(stackJson);

for (const role of roles) {
  if (!employers.some((employer) => employer.name === role.company)) {
    throw new Error(`experience.json: "${role.title}" names unknown company "${role.company}"`);
  }
}

/** Employers in employers.json order, each with its roles in experience.json order. */
export const work = employers.map((employer) => ({
  ...employer,
  roles: roles.filter((role) => role.company === employer.name),
}));

export const projects = Projects.parse(projectsJson);

export const stack = STACK_GROUPS.map((group) => ({
  group,
  items: stackItems.filter((item) => item.group === group).map((item) => item.name),
})).filter(({ items }) => items.length > 0);
