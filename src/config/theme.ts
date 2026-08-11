/**
 * Centralized visual + motion system.
 * Blue is the primary environment; gold is a rare jewelry accent;
 * wine is an almost-hidden emotional undertone.
 */

export const colors = {
  ink: "#020308",
  midnight: "#050B1A",
  sapphire: "#0B1F4D",
  ocean: "#0A2A5E",
  blueSoft: "#193B73",
  blueGlow: "#2B5EA8",
  ivory: "#F5F3EE",
  textSecondary: "#C5CBD8",
  textMuted: "#7F8A9D",
  gold: "#D4AF6A",
  champagne: "#E6D3A3",
  wine: "#4A1025",
  burgundy: "#5C1830",
} as const;

/** Typography scale expressed as responsive clamp() strings. */
export const type = {
  hero: "clamp(3.25rem, 12vw, 6rem)", // 52 -> 96
  h1: "clamp(3rem, 10vw, 5rem)", // 48 -> 80 (e.g. "19.")
  h2: "clamp(2.25rem, 7vw, 4rem)", // 36 -> 64 section headings
  h3: "clamp(1.75rem, 5vw, 2.75rem)",
  statement: "clamp(2.5rem, 9vw, 5.25rem)", // "But I do." moments
  body: "clamp(1rem, 2.6vw, 1.25rem)", // 16 -> 20
  small: "clamp(0.875rem, 2vw, 1rem)",
  eyebrow: "clamp(0.7rem, 1.6vw, 0.8rem)",
  hand: "clamp(2rem, 7vw, 3.5rem)",
  handSmall: "clamp(1.5rem, 5vw, 2.25rem)",
} as const;

/**
 * Animation timing. Everything is slow and calm.
 * Durations in seconds; the signature ease is a soft cinematic curve.
 */
export const motionConfig = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeSoft: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
  reveal: 1.2,
  revealSlow: 1.5,
  stagger: 0.18,
  staggerSlow: 0.42,
  loadingMs: 1500,
} as const;

/** The scroll-reveal keyframes used everywhere (opacity + rise + blur). */
export const revealVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: motionConfig.reveal, ease: motionConfig.ease },
  },
} as const;

/** A gentler variant for large statement lines. */
export const statementVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)", scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: motionConfig.revealSlow, ease: motionConfig.ease },
  },
} as const;

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.stagger,
      delayChildren: 0.1,
    },
  },
} as const;

export const containerStaggerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.staggerSlow,
      delayChildren: 0.2,
    },
  },
} as const;
