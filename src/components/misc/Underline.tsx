import { useEffect, useState } from "react";

interface UnderlineProps {
  /** Margin above the bar. */
  mtop?: string;
  /** Freeze the bar at `w` instead of animating it. */
  st?: boolean;
  /** Width used when `st` is set. */
  w?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Underline = ({ mtop = "0px", st = false, w = "30%" }: UnderlineProps) => {
  const [width, setWidth] = useState(st ? w : "100%");

  useEffect(() => {
    if (st || prefersReducedMotion()) return;

    const id = setInterval(() => {
      setWidth(`${Math.floor(Math.random() * 100)}%`);
    }, 1300);

    return () => clearInterval(id);
  }, [st]);

  return (
    <div
      aria-hidden="true"
      className="gradient"
      style={{
        width,
        marginTop: mtop,
        height: "3px",
        transition: ".3s",
      }}
    />
  );
};

export default Underline;
