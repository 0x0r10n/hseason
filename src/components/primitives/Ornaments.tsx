import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

/** A thin, centered gold hairline — used sparingly beneath headings. */
export function GoldRule({
  width = 64,
  className = "",
  delay = 0,
}: {
  width?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        height: 1,
        width,
        transformOrigin: "center",
        background:
          "linear-gradient(90deg, transparent, rgba(212,175,106,0.85), transparent)",
      }}
    />
  );
}

/** A tiny gold dot used as a section separator / accent. */
export function GoldDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full ${className}`}
      style={{
        width: 4,
        height: 4,
        background: "#D4AF6A",
        boxShadow: "0 0 8px rgba(212,175,106,0.6)",
      }}
    />
  );
}

/** A tiny four-point gold star, used beside "Happy Birthday". */
export function GoldStar({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
        fill="#D4AF6A"
        opacity="0.9"
      />
    </svg>
  );
}

/** The quiet "scroll slowly" cue with a gently drifting arrow. */
export function ScrollCue({ label }: { label: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="font-sans"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#7F8A9D",
        }}
      >
        {label}
      </span>
      <motion.span
        aria-hidden="true"
        style={{ color: "#7F8A9D", fontSize: "0.9rem", lineHeight: 1 }}
        animate={reduced ? undefined : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
    </motion.div>
  );
}
