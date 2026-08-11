import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";
import { GoldDot } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { motionConfig } from "../../config/theme";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.yourYear;

/**
 * An elegant 18 -> 19 passage. Not a school timeline: two quiet numerals with
 * a hairline gold thread drawing between them and a single travelling dot.
 */
function YearThread() {
  return (
    <div className="mt-16 flex w-full max-w-md items-center justify-center gap-5">
      <Reveal
        as="span"
        className="font-serif text-text-muted"
        style={{ display: "inline-block", fontSize: "clamp(1.75rem, 6vw, 2.75rem)", fontWeight: 400 }}
      >
        {c.from}
      </Reveal>

      <div className="relative flex-1" style={{ height: 2 }}>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(127,138,157,0.25), rgba(197,203,216,0.15))",
          }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: motionConfig.ease, delay: 0.2 }}
          style={{
            transformOrigin: "left",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(212,175,106,0.9), rgba(230,211,163,0.5))",
          }}
        />
        {/* Travelling dot */}
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2"
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: motionConfig.ease, delay: 0.2 }}
          style={{
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            borderRadius: "50%",
            background: "#E6D3A3",
            boxShadow: "0 0 10px rgba(212,175,106,0.8)",
          }}
        />
      </div>

      <Reveal
        as="span"
        delay={0.3}
        className="font-serif text-ivory"
        style={{
          display: "inline-block",
          fontSize: "clamp(2.5rem, 8vw, 3.75rem)",
          fontWeight: 400,
          textShadow: "0 0 26px rgba(212,175,106,0.25)",
        }}
      >
        {c.to}
      </Reveal>
    </div>
  );
}

export default function SectionYourYear({ onActive }: SectionProps) {
  return (
    <Chapter id="your-year" onActive={onActive}>
      <div className="absolute inset-0">
        <SkyBackdrop variant="calm">
          <StarField intensity={0.6} />
        </SkyBackdrop>
      </div>

      <div className="relative z-10 mx-auto flex max-w-prose-wide flex-col items-center text-center">
        <Reveal as="h2">
          <span
            className="font-serif text-ivory text-balance"
            style={{
              fontSize: "clamp(2.25rem, 7vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.12,
            }}
          >
            {c.heading}
          </span>
        </Reveal>

        <RevealGroup className="mt-12 flex flex-col gap-5" slow amount={0.3}>
          {c.hopes.map((line, i) => (
            <RevealItem
              key={i}
              as="p"
              className="font-sans text-text-secondary text-pretty mx-auto"
              style={{
                fontSize: "clamp(1.05rem, 2.7vw, 1.28rem)",
                lineHeight: 1.7,
                maxWidth: "42ch",
              }}
            >
              {line}
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 flex items-center gap-4">
          <span className="gold-rule" style={{ width: 36 }} />
          <GoldDot />
          <span className="gold-rule" style={{ width: 36 }} />
        </div>

        <Reveal
          as="p"
          delay={0.15}
          className="font-serif text-ivory mt-10"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.3,
          }}
        >
          {c.close}
        </Reveal>

        <YearThread />
      </div>
    </Chapter>
  );
}
