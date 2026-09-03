import { useId } from "react";
import { useComputedColorScheme } from "@mantine/core";

import { PROFILE_MARK_PATH, PROFILE_MARK_VIEWBOX } from "./profileMarkPath";

interface ProfileMarkProps {
  /** Any valid CSS length. */
  size?: string | number;
  title?: string;
}

/**
 * The traced portrait mark. Carries the site gradient on dark, solid black on
 * light — the gradient washes out against a white ground.
 */
const ProfileMark = ({ size = "100%", title = "Najmi" }: ProfileMarkProps) => {
  const scheme = useComputedColorScheme("dark");
  const gradientId = useId();
  const isDark = scheme === "dark";

  return (
    <svg
      viewBox={PROFILE_MARK_VIEWBOX}
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={{ display: "block", maxWidth: "100%" }}
    >
      {isDark && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E64980" />
            <stop offset="100%" stopColor="#4C6EF5" />
          </linearGradient>
        </defs>
      )}
      <path
        d={PROFILE_MARK_PATH}
        fillRule="evenodd"
        fill={isDark ? `url(#${gradientId})` : "var(--mantine-color-black)"}
      />
    </svg>
  );
};

export default ProfileMark;
