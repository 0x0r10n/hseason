import { motion } from "framer-motion";
import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import CloudLayer from "../atmosphere/CloudLayer";
import Celebration from "../atmosphere/Celebration";
import { Reveal, WordReveal } from "../primitives/Reveal";
import { GoldStar } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.finale;

/**
 * The last sky. Returns to the deepest blue/black of the hero, but the moon is
 * more present and the stars more prominent. The background very slowly
 * breathes between black, midnight and sapphire with a hidden wine undertone.
 * No call to action — the screen simply remains.
 */
export default function Finale({ onActive }: SectionProps) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <Chapter id="finale" onActive={onActive} minFull={false}>
      <div className="absolute inset-0" aria-hidden="true">
        {/* Slowly shifting base tone via cross-fading layers. Animating the
            `background` property forces a full repaint each frame (the ending
            stutter); cross-fading opacity is composited on the GPU instead. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #020308 0%, #050B1A 60%, #020308 100%)",
          }}
        />
        {!reduced && (
          <>
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #030713 0%, #0B1F4D 60%, #050B1A 100%)",
                willChange: "opacity",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #020308 0%, #0A2A5E 60%, #030916 100%)",
                willChange: "opacity",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 0.75, 1],
              }}
            />
          </>
        )}
        <SkyBackdrop variant="deep" wine style={{ background: "transparent" }}>
          <CloudLayer intensity={0.5} />
          <StarField intensity={isMobile ? 1.1 : 1.5} />
        </SkyBackdrop>

        {/* Her photo, filling the last page as a soft blurred backdrop. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ pointerEvents: "none" }}
        >
          <img
            src="/her.jpg"
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: `-${isMobile ? 40 : 64}px`,
              width: `calc(100% + ${isMobile ? 80 : 128}px)`,
              height: `calc(100% + ${isMobile ? 80 : 128}px)`,
              objectFit: "cover",
              objectPosition: "center 28%",
              filter: `blur(${isMobile ? 26 : 40}px)`,
              transform: "scale(1.08) translateZ(0)",
              opacity: 0.5,
            }}
          />
          {/* Scrim: darken + wine/blue undertone so the text stays readable. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, rgba(2,3,8,0.35) 0%, rgba(2,3,8,0.72) 62%, rgba(2,3,8,0.9) 100%)",
            }}
          />
        </div>
      </div>

      {/* Full-party celebration — fires once the finale scrolls into view */}
      <Celebration />

      <div
        className="relative z-10 mx-auto flex max-w-prose-wide flex-col items-center text-center"
        style={{ paddingTop: "18svh", paddingBottom: "16svh" }}
      >
        <Reveal
          as="p"
          className="font-sans text-text-muted"
          style={{
            fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {c.prelude}
        </Reveal>

        {/* Handwritten phrase, revealed slowly */}
        <WordReveal
          text={c.phrase}
          as="p"
          stagger={0.26}
          amount={0.6}
          className="font-hand text-champagne mt-10"
          style={{ fontSize: "clamp(2.4rem, 8.5vw, 4.5rem)", lineHeight: 1.1 }}
        />

        {/* Breathe, then the birthday line */}
        <Reveal as="h2" statement delay={1.6} amount={0.6}>
          <span
            className="font-serif text-ivory mt-16 block text-balance"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              textShadow: "0 0 50px rgba(43,94,168,0.4)",
            }}
          >
            {c.name}
          </span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.3}
          className="font-serif text-champagne mt-8"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2.1rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {c.line}
        </Reveal>

        <div className="mt-10 flex items-center gap-4">
          <span className="gold-rule" style={{ width: 44 }} />
          <GoldStar size={14} />
          <span className="gold-rule" style={{ width: 44 }} />
        </div>

        <Reveal
          as="p"
          delay={0.2}
          className="font-sans text-text-secondary mt-10"
          style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", lineHeight: 1.7 }}
        >
          {c.enjoy}
        </Reveal>
      </div>

      {/* The screen simply remains. A whisper at the very bottom. */}
      <div
        className="relative z-10 flex w-full justify-center"
        style={{ paddingBottom: "max(2.5rem, var(--safe-bottom))" }}
      >
        <span
          className="font-hand text-text-muted"
          style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", opacity: 0.7 }}
        >
          {c.footer}
        </span>
      </div>
    </Chapter>
  );
}
