import { useComputedColorScheme } from "@mantine/core";
import { IconTool } from "@tabler/icons-react";
import type { SimpleIcon } from "simple-icons";
import {
  siApachekafka,
  siClaude,
  siDocker,
  siExpress,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRedhat,
  siRedis,
  siSpring,
  siTypescript,
} from "simple-icons";

/**
 * Brand marks ship with the bundle instead of being hot-linked from third
 * party CDNs, so they cannot rot or be blocked.
 */
const ICONS: Record<string, SimpleIcon> = {
  apachekafka: siApachekafka,
  claude: siClaude,
  docker: siDocker,
  express: siExpress,
  javascript: siJavascript,
  mongodb: siMongodb,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  openjdk: siOpenjdk,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  redhat: siRedhat,
  redis: siRedis,
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

/** WCAG relative luminance of a `RRGGBB` string, with sRGB gamma expansion. */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: number, b: number) {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Luminance of the page behind the mark: Mantine's dark body, and white. */
const BODY_LUMINANCE = { dark: luminance("1a1b1e"), light: 1 };

/**
 * Below this, the brand colour is too close to the background to read. Judged
 * by contrast rather than raw brightness, so a saturated red keeps its colour
 * on dark even though its luminance is low.
 */
const MIN_CONTRAST = 2;

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

  // Near-black marks vanish on dark backgrounds (and pale ones on light) —
  // fall back to the surrounding text colour when the brand colour cannot read.
  const washedOut =
    contrastRatio(luminance(icon.hex), BODY_LUMINANCE[scheme]) < MIN_CONTRAST;

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
