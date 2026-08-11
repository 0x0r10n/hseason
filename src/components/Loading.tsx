import { useEffect } from "react";
import { motion } from "framer-motion";
import { content } from "../config/content";
import { motionConfig } from "../config/theme";
import { usePrefersReducedMotion } from "../hooks/useMediaPrefs";

interface LoadingProps {
  onDone: () => void;
}

/**
 * Minimal loading veil. No percentage, no spinner — just a quiet line of
 * serif text on near-black, then a slow fade into the experience.
 */
export default function Loading({ onDone }: LoadingProps) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(onDone, motionConfig.loadingMs);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="loading"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 40%, #050B1A 0%, #020308 70%)",
        paddingLeft: "max(1.5rem, var(--safe-left))",
        paddingRight: "max(1.5rem, var(--safe-right))",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 1.2, ease: motionConfig.ease }}
    >
      <motion.h1
        initial={{ opacity: 0, y: reduced ? 0 : 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: motionConfig.ease, delay: 0.15 }}
        className="font-serif text-center text-ivory"
        style={{
          fontSize: "clamp(1.9rem, 6vw, 3rem)",
          fontWeight: 400,
          lineHeight: 1.28,
          letterSpacing: "0.01em",
        }}
      >
        {content.loading.title[0]}
        <br />
        {content.loading.title[1]}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: motionConfig.ease, delay: 0.7 }}
        className="mt-6 font-sans"
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#7F8A9D",
        }}
      >
        {content.loading.sub}
      </motion.p>

      {/* A single, slowly breathing gold dot — the only motion here */}
      <motion.span
        aria-hidden="true"
        className="mt-10 block rounded-full"
        style={{ width: 4, height: 4, background: "#D4AF6A" }}
        animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
