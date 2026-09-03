import { useComputedColorScheme } from "@mantine/core";
import { IconTool } from "@tabler/icons-react";
import type { SimpleIcon } from "simple-icons";
import {
  siClaude,
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
  claude: siClaude,
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

/**
 * Marks with no simple-icons entry, self-hosted under `public/assets/` rather
 * than hot-linked. Keyed by the same slug used in the data files.
 */
const IMAGE_ICONS: Record<string, string> = {
  hermes: "/assets/hermes-agent.png",
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
  const image = IMAGE_ICONS[slug];
  if (image) {
    return (
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ borderRadius: 3, display: "block" }}
      />
    );
  }

  const icon = ICONS[slug];

  // simple-icons has no mark for every tool — and its "Hermes" is the parcel
  // courier, not this one. A neutral glyph beats shipping the wrong logo.
  if (!icon) return <IconTool size={size} stroke={1.5} aria-hidden="true" />;

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
