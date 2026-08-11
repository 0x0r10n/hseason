import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { Reveal } from "../primitives/Reveal";
import { GoldRule } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

export default function SectionNineteen({ onActive }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The giant "19" drifts slightly — parallax at ~0.15x.
  const ghostY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.03, 0.07, 0.03]
  );

  return (
    <Chapter id="nineteen" onActive={onActive}>
      <div ref={ref} className="absolute inset-0 overflow-hidden">
        <SkyBackdrop variant="mid">
          <StarField intensity={0.7} />
        </SkyBackdrop>

        {/* Huge translucent background "19" */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.span
            aria-hidden="true"
            className="font-serif select-none"
            style={{
              y: ghostY,
              opacity: ghostOpacity,
              fontSize: "min(70vw, 46rem)",
              lineHeight: 1,
              fontWeight: 500,
              color: "#C5CBD8",
              letterSpacing: "-0.03em",
            }}
          >
            19
          </motion.span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-prose flex-col items-center text-center">
        <Reveal as="h2" statement>
          <span
            className="font-serif text-ivory"
            style={{
              fontSize: "clamp(3rem, 10vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            {content.nineteen.heading}
          </span>
        </Reveal>

        <GoldRule className="mt-6" delay={0.3} />

        <Reveal
          as="p"
          delay={0.15}
          className="font-sans text-text-secondary mt-10 text-pretty"
          style={{
            fontSize: "clamp(1.05rem, 3vw, 1.35rem)",
            lineHeight: 1.7,
          }}
        >
          {content.nineteen.lead}
        </Reveal>

        <Reveal
          as="p"
          delay={0.3}
          className="font-sans text-text-secondary mt-6 text-pretty"
          style={{
            fontSize: "clamp(1rem, 2.6vw, 1.2rem)",
            lineHeight: 1.8,
            maxWidth: "38ch",
          }}
        >
          {content.nineteen.body}
        </Reveal>
      </div>
    </Chapter>
  );
}
