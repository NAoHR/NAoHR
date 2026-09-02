import { render, screen, within } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App from "./pages/App";
import experience from "./utils/experience.json";
import projects from "./utils/projects.json";
import quotes from "./utils/quotes.json";
import stacks from "./utils/stack.json";

const renderApp = () =>
  render(
    <MantineProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MantineProvider>,
  );

describe("App", () => {
  it("renders the introduction", () => {
    renderApp();
    expect(screen.getByText(/Najmi's Here/i)).toBeInTheDocument();
  });

  it("renders every project with a working external link", () => {
    renderApp();

    for (const project of projects) {
      const link = screen.getByLabelText(`Visit ${project.title} on GitHub`);
      expect(link).toHaveAttribute("href", project.link);
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("renders every tech stack entry", () => {
    renderApp();

    // Scoped to the stack section: names like "Java" also appear as project tags.
    const section = document.getElementById("stack");
    expect(section).not.toBeNull();

    for (const stack of stacks) {
      expect(within(section as HTMLElement).getByText(stack.name)).toBeInTheDocument();
    }
  });

  it("renders exactly one quote attribution", () => {
    const { container } = renderApp();

    // The quote itself is typed out letter by letter, so only the cite is
    // present synchronously. Count the rendered elements rather than matching
    // against the data: 15 authors have more than one quote, so filtering
    // quotes.json by author double-counts.
    const cites = container.querySelectorAll("cite");
    expect(cites).toHaveLength(1);

    const authors = new Set(quotes.map((q) => `– ${q.author}`));
    expect(authors).toContain(cites[0].textContent);
  });

  it("offers both a Personal and a Professional tab", () => {
    renderApp();

    expect(screen.getByRole("tab", { name: /personal/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /professional/i })).toBeInTheDocument();
  });

  it("renders every professional engagement with its role, company and period", () => {
    renderApp();

    for (const role of experience) {
      // Two engagements share a title, so the title alone is not unique.
      expect(screen.getAllByText(role.title).length).toBeGreaterThan(0);
      expect(
        screen.getByText(`${role.role} · ${role.company} · ${role.period}`),
      ).toBeInTheDocument();
    }
  });

  it("gives every professional engagement a distinct cover image", () => {
    const images = experience.map((role) => role.image);

    expect(images.every(Boolean)).toBe(true);
    expect(new Set(images).size).toBe(images.length);
  });

  it("has no duplicate project links", () => {
    const links = projects.map((p) => p.link);
    expect(new Set(links).size).toBe(links.length);
  });
});
