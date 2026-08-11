import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";
import { GoldDot } from "../primitives/Ornaments";
import { content } from "../../config/content";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.thisDay;

export default function SectionThisDay({ onActive }: SectionProps) {
  return (
    <Chapter id="this-day" onActive={onActive} className="!justify-start" minFull={false}>
      <div className="absolute inset-0">
        {/* Dawn: night warming very slightly toward the horizon */}
        <SkyBackdrop variant="dawn" wine>
          <StarField intensity={0.5} />
        </SkyBackdrop>
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-prose-wide flex-col items-center justify-center text-center"
        style={{ paddingTop: "12svh", paddingBottom: "8svh" }}
      >
        <Reveal as="h2">
          <span
            className="font-serif text-ivory text-balance"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.16,
              maxWidth: "20ch",
              display: "inline-block",
            }}
          >
            {c.heading}
          </span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.2}
          className="font-sans text-text-secondary mt-10 text-pretty mx-auto"
          style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.8, maxWidth: "48ch" }}
        >
          {c.body}
        </Reveal>

        {/* Triplet, revealed line-by-line */}
        <RevealGroup className="mt-14 flex flex-col gap-2" slow amount={0.5}>
          {c.triplet.map((line, i) => (
            <RevealItem
              key={i}
              as="p"
              className="font-serif text-ivory"
              style={{
                fontSize: "clamp(1.5rem, 4.5vw, 2.25rem)",
                fontWeight: 400,
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              {line}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* The "you made it here." beat */}
      <div className="relative z-10 flex min-h-[90svh] w-full flex-col items-center justify-center text-center">
        <Reveal
          as="p"
          className="font-sans text-text-muted"
          style={{
            fontSize: "clamp(1rem, 2.6vw, 1.2rem)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          {c.prelude}
        </Reveal>

        <Reveal as="h2" statement delay={0.3} amount={0.6}>
          <span
            className="font-serif text-ivory mt-6 block"
            style={{
              fontSize: "clamp(2.75rem, 10vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.02,
              textShadow: "0 0 46px rgba(43,94,168,0.3)",
            }}
          >
            {c.statement}
          </span>
        </Reveal>

        <div className="mt-12 flex items-center gap-4">
          <span className="gold-rule" style={{ width: 40 }} />
          <GoldDot />
          <span className="gold-rule" style={{ width: 40 }} />
        </div>

        <Reveal
          as="p"
          delay={0.2}
          className="font-sans text-text-secondary mt-10 text-pretty"
          style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)", lineHeight: 1.7 }}
        >
          {c.close}
        </Reveal>
      </div>
    </Chapter>
  );
}
