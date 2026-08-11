import Chapter from "../primitives/Chapter";
import SkyBackdrop from "../atmosphere/SkyBackdrop";
import StarField from "../atmosphere/StarField";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";
import { content } from "../../config/content";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.quiet;

/**
 * Section 07 — a quiet handwritten letter resting on a dark desk. A subtle
 * paper card (very restrained, not glassy) holds the closing message.
 */
export default function GiftSection({ onActive }: SectionProps) {
  return (
    <Chapter id="quiet" onActive={onActive}>
      <div className="absolute inset-0">
        {/* Dark desk: deepest sky with the hidden wine warmth */}
        <SkyBackdrop variant="deep" wine>
          <StarField intensity={0.4} />
        </SkyBackdrop>
      </div>

      <Reveal
        className="relative z-10 w-full"
        amount={0.25}
        style={{ maxWidth: "620px" }}
      >
        {/* The letter card */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            borderRadius: 3,
            padding: "clamp(2rem, 7vw, 3.75rem)",
            background:
              "linear-gradient(160deg, rgba(20,26,42,0.72) 0%, rgba(12,17,30,0.82) 100%)",
            border: "1px solid rgba(212,175,106,0.14)",
            boxShadow:
              "0 30px 80px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(245,243,238,0.04)",
          }}
        >
          {/* Faint paper-fiber texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              mixBlendMode: "overlay",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.35'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Hairline gold corner ticks */}
          <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4" style={cornerStyle("tl")} />
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4" style={cornerStyle("tr")} />
          <span aria-hidden="true" className="pointer-events-none absolute left-4 bottom-4" style={cornerStyle("bl")} />
          <span aria-hidden="true" className="pointer-events-none absolute right-4 bottom-4" style={cornerStyle("br")} />

          <div className="relative">
            <h2
              className="font-serif text-ivory"
              style={{
                fontSize: "clamp(1.9rem, 6vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              {c.heading}
            </h2>

            <RevealGroup className="mt-8 flex flex-col gap-6" slow amount={0.2}>
              {c.lines.map((line, i) => (
                <RevealItem
                  key={i}
                  as="p"
                  className="font-sans text-text-secondary text-pretty"
                  style={{ fontSize: "clamp(1rem, 2.6vw, 1.18rem)", lineHeight: 1.8 }}
                >
                  {line}
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="my-9 gold-rule" style={{ opacity: 0.6 }} />

            <Reveal
              as="p"
              className="font-serif text-ivory"
              style={{
                fontSize: "clamp(1.3rem, 3.6vw, 1.75rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              {c.turn}
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="font-hand text-champagne mt-6"
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", lineHeight: 1.35 }}
            >
              {c.close}
            </Reveal>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}

function cornerStyle(pos: "tl" | "tr" | "bl" | "br"): React.CSSProperties {
  const size = 14;
  const c = "rgba(212,175,106,0.5)";
  const base: React.CSSProperties = { width: size, height: size };
  const b = "1px solid";
  switch (pos) {
    case "tl":
      return { ...base, borderTop: `${b} ${c}`, borderLeft: `${b} ${c}` };
    case "tr":
      return { ...base, borderTop: `${b} ${c}`, borderRight: `${b} ${c}` };
    case "bl":
      return { ...base, borderBottom: `${b} ${c}`, borderLeft: `${b} ${c}` };
    case "br":
      return { ...base, borderBottom: `${b} ${c}`, borderRight: `${b} ${c}` };
  }
}
