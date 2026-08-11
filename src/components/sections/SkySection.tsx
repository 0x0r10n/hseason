import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import Moon from "../atmosphere/Moon";
import CloudLayer from "../atmosphere/CloudLayer";
import { Reveal, RevealGroup, RevealItem, WordReveal } from "../primitives/Reveal";
import Typewriter from "../primitives/Typewriter";
import { content } from "../../config/content";
import { useIsMobile } from "../../hooks/useMediaPrefs";
interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.sky;

/** A full-viewport beat within the sky. */
function Beat({
  children,
  min = "100svh",
  className = "",
}: {
  children: React.ReactNode;
  min?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative z-10 mx-auto flex w-full max-w-prose-wide flex-col items-center justify-center text-center ${className}`}
      style={{ minHeight: min, paddingLeft: "1.375rem", paddingRight: "1.375rem" }}
    >
      {children}
    </div>
  );
}

export default function SkySection({ onActive }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Report activity to the progress dots.
  useEffect(() => {
    if (!onActive) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onActive("sky");
        }
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onActive]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Cross-fade from a deep black-blue into a rich, luminous sapphire sky.
  const deepOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const sapphireOpacity = useTransform(scrollYProgress, [0.06, 0.4], [0, 1]);
  const moonOpacity = useTransform(scrollYProgress, [0.16, 0.5], [0, 1]);
  const cloudOpacity = useTransform(scrollYProgress, [0.12, 0.46], [0, 1]);
  const starBoost = useTransform(scrollYProgress, [0, 0.45], [0.6, 1]);

  const bigSerif: React.CSSProperties = {
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 400,
    lineHeight: 1.06,
  };

  return (
    <section
      ref={sectionRef}
      id="sky"
      className="relative w-full"
      aria-label="The sky"
    >
      {/* Sticky, cross-fading sky background for the whole section */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100svh",
            overflow: "hidden",
          }}
        >
          {/* Base: near-black deep sky */}
          <motion.div style={{ position: "absolute", inset: 0, opacity: deepOpacity }}>
            <SkyBackdrop variant="deep" />
          </motion.div>
          {/* Luminous sapphire sky with hidden wine horizon */}
          <motion.div style={{ position: "absolute", inset: 0, opacity: sapphireOpacity }}>
            <SkyBackdrop variant="sapphire" wine />
          </motion.div>
          {/* Clouds fade in softly */}
          <motion.div style={{ position: "absolute", inset: 0, opacity: cloudOpacity }}>
            <CloudLayer intensity={isMobile ? 0.7 : 1} />
          </motion.div>
          {/* Stars, slightly brighter as the sky opens up */}
          <motion.div style={{ position: "absolute", inset: 0, opacity: starBoost }}>
            <StarField intensity={isMobile ? 0.9 : 1.25} />
          </motion.div>
          {/* Moon appears */}
          <motion.div style={{ position: "absolute", inset: 0, opacity: moonOpacity }}>
            <Moon
              x={isMobile ? 0.7 : 0.66}
              y={0.26}
              size={isMobile ? 118 : 168}
              intensity={1}
            />
          </motion.div>
        </div>
      </div>

      {/* Foreground beats */}
      <div className="relative">
        {/* 1 — handwritten opener */}
        <Beat min="92svh">
          <Reveal>
            <span
              className="font-hand text-champagne"
              style={{ fontSize: "clamp(1.75rem, 6vw, 2.75rem)", lineHeight: 1.2 }}
            >
              {c.remember}
            </span>
          </Reveal>
        </Beat>

        {/* 2 — THE special phrase (typewriter) */}
        <Beat>
          <Typewriter
            text={c.phrase}
            className="text-ivory text-balance"
            style={{ ...bigSerif, fontSize: "clamp(2.75rem, 10vw, 6rem)" }}
          />
        </Beat>

        {/* 3 — the secret, one line at a time */}
        <Beat min="92svh">
          <RevealGroup className="flex flex-col gap-7" slow amount={0.4}>
            {c.intro.map((line, i) => (
              <RevealItem
                key={i}
                as="p"
                className="font-sans text-text-secondary text-pretty mx-auto"
                style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.8, maxWidth: "40ch" }}
              >
                {line}
              </RevealItem>
            ))}
          </RevealGroup>
        </Beat>

        {/* 4 — forever / today / tomorrow / always */}
        <Beat>
          <Reveal
            as="p"
            className="font-serif text-ivory"
            style={{ fontSize: "clamp(1.75rem, 5.5vw, 3rem)", fontWeight: 400, lineHeight: 1.3 }}
          >
            {c.forever}
          </Reveal>
          <RevealGroup className="mt-10 flex flex-col gap-3" slow amount={0.5}>
            {c.times.map((t, i) => (
              <RevealItem
                key={i}
                as="p"
                className="font-serif text-text-secondary"
                style={{ fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontStyle: "italic", lineHeight: 1.35 }}
              >
                {t}
              </RevealItem>
            ))}
          </RevealGroup>
        </Beat>

        {/* 5 — everything up there */}
        <Beat>
          <RevealGroup className="flex flex-col gap-3" slow amount={0.4}>
            {c.everything.map((line, i) => {
              const last = i === c.everything.length - 1;
              return (
                <RevealItem
                  key={i}
                  as="p"
                  className={last ? "font-sans text-text-secondary mt-5" : "font-serif text-ivory"}
                  style={
                    last
                      ? { fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.7, maxWidth: "34ch", marginInline: "auto" }
                      : { fontSize: "clamp(1.6rem, 5vw, 2.6rem)", fontWeight: 400, lineHeight: 1.25 }
                  }
                >
                  {line}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Beat>

        {/* 6 — everything changes, but the sky remains */}
        <Beat>
          <RevealGroup className="flex flex-col gap-8" slow amount={0.5}>
            <RevealItem
              as="p"
              className="font-sans text-text-muted"
              style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.6 }}
            >
              {c.changes[0]}
            </RevealItem>
            <RevealItem
              as="p"
              className="font-sans text-text-muted"
              style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", fontStyle: "italic" }}
            >
              {c.changes[1]}
            </RevealItem>
            <RevealItem
              as="p"
              statement
              className="font-serif text-ivory"
              style={{ fontSize: "clamp(2rem, 6.5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.15 }}
            >
              {c.changes[2]}
            </RevealItem>
          </RevealGroup>
        </Beat>

        {/* 7 — the turn toward her (pause) */}
        <Beat min="94svh">
          <Reveal as="p" statement amount={0.6}>
            <span
              className="font-serif text-ivory text-balance"
              style={{ fontSize: "clamp(2rem, 6.5vw, 3.75rem)", fontWeight: 400, lineHeight: 1.18 }}
            >
              {c.howISeeYou}
            </span>
          </Reveal>
        </Beat>

        {/* 8 — the first moment */}
        <Beat min="82svh">
          <Reveal
            as="p"
            className="font-sans text-text-secondary text-pretty mx-auto"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", lineHeight: 1.8, maxWidth: "46ch" }}
          >
            {c.firstMoment}
          </Reveal>
        </Beat>

        {/* 9 — not perfect, just beautiful */}
        <Beat min="86svh">
          <RevealGroup className="flex flex-col gap-4" slow amount={0.5}>
            {c.notPerfect.map((line, i) => {
              const last = i === c.notPerfect.length - 1;
              return (
                <RevealItem
                  key={i}
                  as="p"
                  className={last ? "font-serif text-ivory mt-2" : "font-sans text-text-muted"}
                  style={
                    last
                      ? { fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontStyle: "italic", lineHeight: 1.3 }
                      : { fontSize: "clamp(1.05rem, 2.8vw, 1.25rem)", lineHeight: 1.7 }
                  }
                >
                  {line}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Beat>

        {/* 10 — meaning */}
        <Beat min="80svh">
          <Reveal
            as="p"
            className="font-sans text-text-secondary text-pretty mx-auto"
            style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.8, maxWidth: "40ch" }}
          >
            {c.meaning}
          </Reveal>
        </Beat>

        {/* 11 — the reveal: handwritten phrase, then a 2s breathe, then "Now you know why." */}
        <Beat min="100svh">
          <WordReveal
            text={c.phraseFinal}
            as="p"
            stagger={0.24}
            amount={0.6}
            className="font-hand text-champagne"
            style={{ fontSize: "clamp(2.6rem, 9vw, 5rem)", lineHeight: 1.1 }}
          />
          <Reveal
            as="p"
            delay={2.0}
            amount={0.6}
            className="font-sans text-text-secondary mt-12"
            style={{
              fontSize: "clamp(1rem, 2.6vw, 1.25rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.7,
            }}
          >
            {c.nowYouKnow}
          </Reveal>
        </Beat>
      </div>
    </section>
  );
}
