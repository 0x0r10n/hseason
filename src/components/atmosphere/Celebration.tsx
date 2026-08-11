import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

/**
 * A "full party" celebration for the finale: multicolor confetti glitter that
 * rains down. Animates via transform/opacity only (composited on the GPU) and
 * only mounts once the finale scrolls into view, so it stays smooth on phones.
 * Disabled under reduced-motion.
 */

const CONFETTI_COLORS = [
  "#F72585", // magenta
  "#FFD166", // yellow
  "#06D6A0", // green
  "#4CC9F0", // cyan
  "#B983FF", // violet
  "#FF5E7E", // pink
  "#D4AF6A", // gold (ties into the site)
  "#E6D3A3", // champagne
  "#2B5EA8", // blue-glow
];

// Deterministic pseudo-random so the layout is stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Celebration() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const confettiCount = isMobile ? 22 : 48;

  const confetti = useMemo(() => {
    const rand = mulberry32(9001);
    return new Array(confettiCount).fill(0).map((_, i) => ({
      id: i,
      left: rand() * 100,
      color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
      w: 5 + rand() * 6,
      h: 8 + rand() * 10,
      round: rand() < 0.35,
      drift: (rand() - 0.5) * 24, // vw sway
      rot: 180 + rand() * 540,
      dur: 3.6 + rand() * 3,
      delay: rand() * 4,
    }));
  }, [confettiCount]);

  if (reduced) {
    // Confetti is motion-driven; under reduced-motion we simply show nothing.
    return null;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {inView && (
        <>
          {/* Confetti glitter raining down */}
          {confetti.map((c) => (
            <motion.span
              key={`c-${c.id}`}
              initial={{ opacity: 0, y: "-12vh", x: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0.9, 0],
                y: ["-12vh", "112vh"],
                x: [0, `${c.drift}vw`, 0],
                rotate: [0, c.rot],
              }}
              transition={{
                duration: c.dur,
                delay: c.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: `${c.left}%`,
                width: c.w,
                height: c.h,
                background: c.color,
                borderRadius: c.round ? "50%" : 2,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
