import { useEffect, useState } from "react";

/** True once the window has been scrolled further than `offset` pixels. */
export function useScrolledPast(offset: number) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY >= offset,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= offset);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}
