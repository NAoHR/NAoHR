import { useComputedColorScheme } from "@mantine/core";
import type { SimpleIcon } from "simple-icons";
import {
  siExpress,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSpring,
  siTypescript,
} from "simple-icons";

/**
 * Brand marks ship with the bundle instead of being hot-linked from third
 * party CDNs, so they cannot rot or be blocked.
 */
const ICONS: Record<string, SimpleIcon> = {
  express: siExpress,
  javascript: siJavascript,
  mongodb: siMongodb,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  openjdk: siOpenjdk,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  spring: siSpring,
  typescript: siTypescript,
};

/** Perceived brightness of a `RRGGBB` string, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface BrandIconProps {
  slug: string;
  size?: number;
}

const BrandIcon = ({ slug, size = 18 }: BrandIconProps) => {
  const scheme = useComputedColorScheme("dark");
  const icon = ICONS[slug];

  if (!icon) return null;

  const brightness = luminance(icon.hex);
  // Near-black marks vanish on dark backgrounds (and vice versa) — fall back
  // to the surrounding text colour when the brand colour would not read.
  const washedOut =
    (scheme === "dark" && brightness < 0.2) || (scheme === "light" && brightness > 0.85);

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={washedOut ? "currentColor" : `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
};

export default BrandIcon;
