import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";
import { content } from "../../config/content";
import { motionConfig } from "../../config/theme";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.farYouveCome;

export default function SectionFarYouveCome({ onActive }: SectionProps) {
  const zoomRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: zoomRef,
    offset: ["start end", "end start"],
  });
  // Slow zoom/parallax behind "But I do."
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.15, 1.32]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.2]);

  return (
    <Chapter id="far" onActive={onActive} className="!justify-start" minFull={false}>
      <div className="absolute inset-0">
        <SkyBackdrop variant="mid">
          <StarField intensity={0.8} />
        </SkyBackdrop>
      </div>

      {/* Part A: the narrative build */}
      <div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-prose-wide flex-col items-center justify-center text-center"
        style={{ paddingTop: "12svh", paddingBottom: "8svh" }}
      >
        <Reveal as="h2">
          <span
            className="font-serif text-ivory text-balance"
            style={{
              fontSize: "clamp(2.25rem, 7vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            {c.heading}
          </span>
        </Reveal>

        <RevealGroup className="mt-10 flex flex-col gap-6" slow>
          <RevealItem
            as="p"
            className="font-sans text-text-secondary text-pretty mx-auto"
            style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", lineHeight: 1.8, maxWidth: "44ch" }}
          >
            {c.lines[0]}
          </RevealItem>
          <RevealItem
            as="p"
            className="font-sans text-text-secondary text-pretty mx-auto"
            style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", lineHeight: 1.8, maxWidth: "50ch" }}
          >
            {c.lines[1]}
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Part B: a visual pause on "Look around you now." */}
      <div className="relative z-10 flex min-h-[70svh] w-full items-center justify-center">
        <Reveal as="p" statement>
          <span
            className="font-serif text-ivory text-balance"
            style={{
              fontSize: "clamp(1.9rem, 6vw, 3.25rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {c.pauseLine}
          </span>
        </Reveal>
      </div>

      {/* Part C: love around her, then the pivot */}
      <div
        className="relative z-10 mx-auto flex min-h-[80svh] max-w-prose-wide flex-col items-center justify-center text-center"
        style={{ paddingBottom: "6svh" }}
      >
        <RevealGroup className="flex flex-col gap-8" slow>
          <RevealItem
            as="p"
            className="font-sans text-text-secondary text-pretty mx-auto"
            style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.8, maxWidth: "46ch" }}
          >
            {c.afterPause[0]}
          </RevealItem>
          <RevealItem
            as="p"
            className="font-sans text-text-muted text-pretty mx-auto"
            style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", lineHeight: 1.8, maxWidth: "44ch" }}
          >
            {c.afterPause[1]}
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Part D: the powerful line with slow zoom glow behind it */}
      <div
        ref={zoomRef}
        className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            width: "min(90vw, 900px)",
            height: "min(90vw, 900px)",
            borderRadius: "50%",
            scale,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, rgba(43,94,168,0.35) 0%, rgba(11,31,77,0.15) 45%, rgba(5,11,26,0) 70%)",
          }}
        />
        <motion.h2
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: motionConfig.revealSlow, ease: motionConfig.ease }}
          className="relative font-serif text-ivory"
          style={{
            fontSize: "clamp(3rem, 12vw, 6.5rem)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            textShadow: "0 0 40px rgba(43,94,168,0.35)",
          }}
        >
          {c.statement}
        </motion.h2>
      </div>
    </Chapter>
  );
}
