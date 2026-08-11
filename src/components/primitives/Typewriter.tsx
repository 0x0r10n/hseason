import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

interface TypewriterProps {
  text: string;
  className?: string;
  /** ms per character. */
  speed?: number;
  /** Delay before typing begins (ms) once in view. */
  startDelay?: number;
  style?: React.CSSProperties;
  onDone?: () => void;
}

/**
 * Types a line out character-by-character when it scrolls into view. Reserved
 * for the single most special phrase ("The sky is beautiful."). Under
 * reduced-motion it simply presents the full line. A soft gold caret blinks
 * while typing and then fades away.
 */
export default function Typewriter({
  text,
  className,
  speed = 85,
  startDelay = 300,
  style,
  onDone,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(text.length);
      setDone(true);
      onDone?.();
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) window.clearInterval(interval);
    };
  }, [inView, reduced, text, speed, startDelay, onDone]);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.06em",
          marginLeft: "0.06em",
          height: "0.9em",
          verticalAlign: "-0.08em",
          background: "#D4AF6A",
          opacity: done ? 0 : 1,
          transition: "opacity 900ms ease",
          animation: done ? "none" : "tw-blink 1.05s steps(2, start) infinite",
        }}
      />
      <style>{`@keyframes tw-blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}
