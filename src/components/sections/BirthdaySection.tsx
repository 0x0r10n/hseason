import { motion } from "framer-motion";
import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";
import { GoldStar } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { usePrefersReducedMotion } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.birthday;

export default function BirthdaySection({ onActive }: SectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <Chapter id="birthday" onActive={onActive}>
      <div className="absolute inset-0">
        <SkyBackdrop variant="sapphire">
          <StarField intensity={0.9} />
        </SkyBackdrop>
      </div>

      <div className="relative z-10 mx-auto flex max-w-prose-wide flex-col items-center text-center">
        {/* The heading with a soft breathing glow behind it */}
        <div className="relative flex items-center justify-center">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              width: "min(120vw, 720px)",
              height: "min(60vw, 360px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(43,94,168,0.28) 0%, rgba(212,175,106,0.08) 40%, rgba(5,11,26,0) 70%)",
            }}
            animate={reduced ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Reveal as="h2" statement amount={0.5}>
            <span className="relative inline-flex items-start justify-center gap-3">
              <span
                className="font-serif text-ivory text-balance"
                style={{
                  fontSize: "clamp(2.5rem, 8.5vw, 5rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  textShadow: "0 0 50px rgba(43,94,168,0.4)",
                }}
              >
                {c.heading}
              </span>
              <motion.span
                className="mt-2 shrink-0"
                animate={reduced ? undefined : { rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <GoldStar size={18} />
              </motion.span>
            </span>
          </Reveal>
        </div>

        <Reveal
          as="p"
          delay={0.2}
          className="font-serif text-champagne mt-8"
          style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 400, fontStyle: "italic" }}
        >
          {c.sub}
        </Reveal>

        <Reveal
          as="p"
          delay={0.35}
          className="font-sans text-text-secondary mt-8"
          style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.7 }}
        >
          {c.invite}
        </Reveal>

        <RevealGroup className="mt-12 flex flex-col gap-3" slow amount={0.3}>
          {c.list.map((line, i) => (
            <RevealItem
              key={i}
              as="p"
              className="font-sans text-text-secondary"
              style={{ fontSize: "clamp(1.05rem, 2.7vw, 1.25rem)", lineHeight: 1.6 }}
            >
              {line}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal
          as="p"
          delay={0.2}
          className="font-serif text-ivory mt-14"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.3,
          }}
        >
          {c.close}
        </Reveal>
      </div>
    </Chapter>
  );
}
