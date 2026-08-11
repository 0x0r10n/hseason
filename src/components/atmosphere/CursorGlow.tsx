import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

/**
 * A subtle soft-blue glow that trails the cursor on desktop. Uses a single
 * fixed element moved via transform (no React re-renders, no layout). Fully
 * disabled on touch devices and under reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const enabled = !reduced && !isMobile;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // Gentle easing toward the pointer.
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 460,
        height: 460,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9996,
        opacity: 0,
        transition: "opacity 600ms ease",
        background:
          "radial-gradient(circle, rgba(43,94,168,0.10) 0%, rgba(43,94,168,0.05) 35%, rgba(43,94,168,0) 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
