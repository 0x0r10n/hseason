import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

interface MoonProps {
  /** Fractional position within the parent (0..1). */
  x?: number;
  y?: number;
  /** Diameter in px (kept modest — never huge). */
  size?: number;
  /** 0..1 overall visibility. */
  intensity?: number;
  className?: string;
}

/**
 * Soft moonlight: warm ivory core, a champagne-gold rim, and a faint blue
 * atmospheric halo. It breathes and drifts extremely slowly. Never yellow,
 * never large.
 */
export default function Moon({
  x = 0.72,
  y = 0.24,
  size = 150,
  intensity = 1,
  className,
}: MoonProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        left: `calc(${x * 100}% - ${size / 2}px)`,
        top: `calc(${y * 100}% - ${size / 2}px)`,
        width: size,
        height: size,
        pointerEvents: "none",
      }}
    >
      {/* Wide, faint blue atmospheric glow */}
      <div
        style={{
          position: "absolute",
          inset: `-${size * 1.9}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(43,94,168,${
            0.16 * intensity
          }) 0%, rgba(11,31,77,${0.1 * intensity}) 32%, rgba(5,11,26,0) 68%)`,
          filter: "blur(6px)",
        }}
      />

      {/* Champagne halo close to the disc */}
      <div
        style={{
          position: "absolute",
          inset: `-${size * 0.6}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(230,211,163,${
            0.22 * intensity
          }) 0%, rgba(212,175,106,${0.1 * intensity}) 40%, rgba(212,175,106,0) 70%)`,
          filter: "blur(2px)",
        }}
      />

      {/* The disc itself — breathing glow */}
      <motion.div
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.92, 1, 0.92],
                scale: [1, 1.012, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          // Warm ivory core, gently offset to imply a light source.
          background:
            "radial-gradient(circle at 38% 34%, #FBF8F0 0%, #F5F3EE 42%, #E6D3A3 78%, #D4AF6A 100%)",
          boxShadow:
            "0 0 40px rgba(230,211,163,0.28), inset -10px -8px 26px rgba(11,31,77,0.35), inset 6px 6px 18px rgba(255,255,255,0.25)",
        }}
      >
        {/* Extremely subtle maria for texture, not cartoonish */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 62% 60%, rgba(127,138,157,0.18) 0%, rgba(127,138,157,0) 26%), radial-gradient(circle at 40% 68%, rgba(127,138,157,0.12) 0%, rgba(127,138,157,0) 20%)",
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>
    </div>
  );
}
