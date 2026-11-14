import { useEffect, useRef, useState } from "react";

const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";
const AIM_TARGETS = "a, button, summary, label, [role='button']";

export default function PestCursor() {
  const nodeRef = useRef(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [aiming, setAiming] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hit, setHit] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return undefined;

    setOn(true);
    document.body.classList.add("pest-cursor");

    let frame = 0;
    const point = { x: 0, y: 0 };

    const paint = () => {
      frame = 0;
      const node = nodeRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event) => {
      point.x = event.clientX;
      point.y = event.clientY;
      const target = event.target;
      const typing = Boolean(target?.closest?.(TEXT_FIELDS));
      setHidden(typing);
      setAiming(Boolean(target?.closest?.(AIM_TARGETS)) && !typing);
      setReady(true);
      queue();
    };

    const onDown = (event) => {
      if (event.button !== 0) return;
      if (event.target?.closest?.(TEXT_FIELDS)) return;
      setHit(true);
    };

    const onUp = () => setHit(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("pest-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!on) return null;

  const className = [
    "pest-sight",
    ready ? "ready" : "",
    aiming ? "aiming" : "",
    hit ? "hit" : "",
    hidden ? "off" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={nodeRef} className={className} aria-hidden="true">
      <span className="pest-sight-ring" />
      <svg className="pest-sight-bug" viewBox="0 0 32 32">
        <path d="M8 16c0-2 2-5 5-6M24 16c0-2-2-5-5-6" />
        <path d="M11 12 7 6M21 12l4-6" />
        <ellipse cx="16" cy="18" rx="6.5" ry="5" />
        <path d="M10 18H6M22 18h4M11 21l-4 4M21 21l4 4" />
      </svg>
      <span className="pest-sight-slash" />
      <span className="pest-sight-burst" />
    </div>
  );
}
