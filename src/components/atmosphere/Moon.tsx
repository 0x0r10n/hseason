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
  /** Public asset served at site root, e.g. /her.jpg */
  photoSrc?: string;
  alt?: string;
}

/**
 * A portrait framed as the moon: a circular photo with a crisp blue-to-wine
 * rim. It breathes via opacity only — never a per-frame scale — because
 * scaling a border-radius clip each frame shimmers on mobile GPUs.
 */
export default function Moon({
  x = 0.72,
  y = 0.24,
  size = 150,
  intensity = 1,
  className,
  photoSrc = "/her.jpg",
  alt = "",
}: MoonProps) {
  const reduced = usePrefersReducedMotion();
  const rim = Math.max(3, Math.round(size * 0.035));

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: `calc(${x * 100}% - ${size / 2}px)`,
        top: `calc(${y * 100}% - ${size / 2}px)`,
        width: size,
        height: size,
        opacity: intensity,
        pointerEvents: "none",
        // Keep this disc on its own compositor layer so an animated ancestor
        // (hero parallax / finale background) can't cause repaint bleed.
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >
      <motion.div
        initial={false}
        animate={reduced ? undefined : { opacity: [0.94, 1, 0.94] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          padding: rim,
          background:
            "linear-gradient(140deg, #2B5EA8 0%, #193B73 44%, #5C1830 72%, #4A1025 100%)",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <img
          src={photoSrc}
          alt={alt}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            borderRadius: "50%",
            display: "block",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </div>
  );
}
