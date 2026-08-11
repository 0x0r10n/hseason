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
 * rim. No glow, no halo — it breathes very slowly to stay alive in the scene.
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
      }}
    >
      <motion.div
        initial={false}
        animate={reduced ? undefined : { scale: [1, 1.012, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          padding: rim,
          background:
            "linear-gradient(140deg, #2B5EA8 0%, #193B73 44%, #5C1830 72%, #4A1025 100%)",
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
          }}
        />
      </motion.div>
    </div>
  );
}
