import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

interface FloatingParticlesProps {
  /** Delay (s) before particles begin appearing. */
  delay?: number;
  count?: number;
}

/**
 * A handful of slow, luminous dust motes that rise through the frame.
 * Deliberately sparse. Disabled entirely under reduced-motion.
 */
export default function FloatingParticles({
  delay = 2.4,
  count,
}: FloatingParticlesProps) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const n = count ?? (isMobile ? 8 : 16);

  const particles = useMemo(
    () =>
      new Array(n).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.4 + 1.2,
        duration: Math.random() * 14 + 16,
        delay: delay + Math.random() * 8,
        drift: (Math.random() - 0.5) * 40,
        gold: Math.random() < 0.25,
        opacity: Math.random() * 0.35 + 0.1,
      })),
    [n, delay]
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, y: "10%" }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: ["10%", "-110%"],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.gold
              ? "rgba(230,211,163,0.9)"
              : "rgba(245,243,238,0.9)",
            boxShadow: p.gold
              ? "0 0 6px rgba(212,175,106,0.5)"
              : "0 0 6px rgba(197,203,216,0.4)",
          }}
        />
      ))}
    </div>
  );
}
