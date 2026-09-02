import { createTheme } from "@mantine/core";

export const GRADIENT = { from: "#E64980", to: "#4C6EF5", deg: 83 } as const;

export const theme = createTheme({
  primaryColor: "violet",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  headings: {
    fontFamily: "Unbounded, -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: "500",
  },
  defaultRadius: "md",
});
