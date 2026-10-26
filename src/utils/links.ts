/** Where to find me. The first three also appear in the hero. */
export const EMAIL = "2014496.najmi@gmail.com";

export const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/najmi207" },
  { label: "GitHub", href: "https://github.com/NAoHR" },
  { label: "Codewars", href: "https://www.codewars.com/users/Najmi" },
  { label: "Instagram", href: "https://instagram.com/najmi_2821" },
  { label: "X", href: "https://twitter.com/bintangbhsarab" },
] as const;

/** The hero's status badge. Delete or edit when no longer taking side work. */
export const AVAILABILITY = {
  status: "Available for side projects",
  where: "Remote, based in Jakarta (UTC+7)",
  href: `mailto:${EMAIL}?subject=${encodeURIComponent("Side project")}`,
} as const;
