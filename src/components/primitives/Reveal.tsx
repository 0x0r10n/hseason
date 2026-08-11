import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  revealVariants,
  statementVariants,
  containerStagger,
  containerStaggerSlow,
  motionConfig,
} from "../../config/theme";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

type As = "div" | "p" | "span" | "section" | "h1" | "h2" | "h3" | "li" | "ul";

interface RevealProps {
  children: ReactNode;
  as?: As;
  className?: string;
  /** Trigger once when scrolled into view (default) or every time. */
  once?: boolean;
  /** Fraction of the element visible before firing. */
  amount?: number;
  delay?: number;
  /** Use the larger, softer statement animation. */
  statement?: boolean;
  style?: React.CSSProperties;
}

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

/**
 * Scroll-reveal: opacity 0->1, rise 26px->0, blur 4px->0 over ~1.2s.
 * Under reduced-motion it degrades to a simple fade.
 */
export function Reveal({
  children,
  as = "div",
  className,
  once = true,
  amount = 0.4,
  delay = 0,
  statement = false,
  style,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const source = reduced
    ? reducedVariants
    : statement
      ? statementVariants
      : revealVariants;

  // Bake the delay into the variant so it survives framer's transition merge.
  const base = delay
    ? {
        hidden: source.hidden,
        visible: {
          ...source.visible,
          transition: { ...source.visible.transition, delay },
        },
      }
    : source;

  return (
    <MotionTag
      className={className}
      style={style}
      variants={base}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  as?: As;
  className?: string;
  once?: boolean;
  amount?: number;
  slow?: boolean;
  style?: React.CSSProperties;
}

/**
 * A container that staggers its <RevealItem> children into view.
 */
export function RevealGroup({
  children,
  as = "div",
  className,
  once = true,
  amount = 0.35,
  slow = false,
  style,
}: RevealGroupProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      variants={slow ? containerStaggerSlow : containerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  as?: As;
  className?: string;
  statement?: boolean;
  style?: React.CSSProperties;
}

/** A single staggered child inside <RevealGroup>. */
export function RevealItem({
  children,
  as = "div",
  className,
  statement = false,
  style,
}: RevealItemProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const base = reduced
    ? reducedVariants
    : statement
      ? statementVariants
      : revealVariants;
  return (
    <MotionTag className={className} style={style} variants={base}>
      {children}
    </MotionTag>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  as?: As;
  /** Seconds between each word. */
  stagger?: number;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
}

/**
 * Reveals a line word-by-word. Reserved for the most special phrases.
 * Under reduced-motion the whole line simply fades in.
 */
export function WordReveal({
  text,
  className,
  as = "div",
  stagger = 0.16,
  once = true,
  amount = 0.6,
  style,
}: WordRevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const words = text.split(" ");

  if (reduced) {
    return (
      <MotionTag
        className={className}
        style={style}
        variants={reducedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {text}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            aria-hidden="true"
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            variants={{
              hidden: { opacity: 0, y: "0.5em", filter: "blur(4px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.9,
                  ease: motionConfig.ease,
                },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}
