import { useEffect, useState } from "react";

import ProfileMark from "./misc/ProfileMark";

const FADE_MS = 650;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Full-screen entry curtain. The site is already rendered underneath, so
 * dismissing this just fades the curtain away to reveal it.
 *
 * Deliberately a plain div: a native button keeps its UA appearance and, once
 * focused, a rounded focus ring — both of which showed through at the corners.
 * Keyboard dismissal is handled by a window listener instead.
 */
const Intro = () => {
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    function dismiss() {
      if (prefersReducedMotion()) {
        setDismissed(true);
        return;
      }
      setLeaving((already) => {
        if (!already) window.setTimeout(() => setDismissed(true), FADE_MS);
        return true;
      });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (["Enter", " ", "Spacebar", "Escape"].includes(event.key)) {
        event.preventDefault();
        dismiss();
      }
    }

    // Hold the page still while the curtain is up.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dismissed]);

  if (dismissed) return null;

  function handleClick() {
    if (leaving) return;

    if (prefersReducedMotion()) {
      setDismissed(true);
      return;
    }

    setLeaving(true);
    window.setTimeout(() => setDismissed(true), FADE_MS);
  }

  return (
    <div
      data-testid="intro"
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        cursor: "pointer",
        backgroundColor: "var(--mantine-color-body)",
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: leaving ? "none" : "auto",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span className="breathe" style={{ width: "min(46vmin, 320px)", display: "block" }}>
        <ProfileMark />
      </span>
    </div>
  );
};

export default Intro;
