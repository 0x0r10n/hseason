import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import Moon from "../atmosphere/Moon";
import FloatingParticles from "../atmosphere/FloatingParticles";
import { ScrollCue } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { motionConfig } from "../../config/theme";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

const ease = motionConfig.ease;

export default function Hero({ onActive }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Gentle parallax: content drifts up and fades as you leave the hero.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);

  return (
    <Chapter id="hero" onActive={onActive}>
      <div ref={ref} className="absolute inset-0 overflow-hidden">
        <motion.div style={{ position: "absolute", top: -100, left: 0, right: 0, bottom: -100, y: skyY }}>
          <SkyBackdrop variant="deep">
            <StarField intensity={1} />
            <Moon x={isMobile ? 0.78 : 0.74} y={0.2} size={isMobile ? 108 : 148} intensity={0.85} />
            <FloatingParticles delay={2.4} />
          </SkyBackdrop>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow date */}
        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="font-sans text-text-muted"
          style={{
            fontSize: "clamp(0.7rem, 1.6vw, 0.8rem)",
            letterSpacing: "0.35em",
          }}
        >
          {content.hero.date}
        </motion.p>

        {/* Hero heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease, delay: 0.6 }}
          className="font-serif text-ivory text-balance mt-6"
          style={{
            fontSize: "clamp(3.25rem, 12vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
          }}
        >
          {content.hero.heading}
        </motion.h1>

        {/* Sub + line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.2 }}
          className="font-sans text-text-secondary mt-8 max-w-[36ch] text-pretty"
          style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", lineHeight: 1.7 }}
        >
          {content.hero.sub}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.7 }}
          className="font-sans text-text-muted mt-4 max-w-[34ch] text-pretty"
          style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.1rem)", lineHeight: 1.7 }}
        >
          {content.hero.line}
        </motion.p>
      </motion.div>

      {/* Scroll cue pinned near the bottom */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: "max(2rem, var(--safe-bottom))" }}
      >
        <ScrollCue label={content.hero.scroll} />
      </div>
    </Chapter>
  );
}
