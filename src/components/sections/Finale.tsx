import Chapter from "../primitives/Chapter";
import Celebration from "../atmosphere/Celebration";
import { Reveal, WordReveal } from "../primitives/Reveal";
import { GoldStar } from "../primitives/Ornaments";
import { content } from "../../config/content";
import { useIsMobile } from "../../hooks/useMediaPrefs";

interface SectionProps {
  onActive?: (id: string) => void;
}

const c = content.finale;

/**
 * The last page. Her photo fills the screen as a soft, blurred backdrop with a
 * darkening scrim so the closing words stay readable. Deliberately static — no
 * looping background animation — so nothing forces the blurred layer to repaint
 * while you read. Only the one-shot text reveals and the confetti move.
 */
export default function Finale({ onActive }: SectionProps) {
  const isMobile = useIsMobile();

  return (
    <Chapter id="finale" onActive={onActive} minFull={false}>
      {/* Static backdrop — no animation here on purpose. A live blur under
          infinitely-animating layers forced the whole finale to re-rasterize
          every frame, which is what made the photo shake, the text flicker,
          and the scroll lag. The photo is now rasterized once and left alone;
          `overflow-hidden` clips the soft blur edges. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "#020308" }} />

        <img
          src="/her.jpg"
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: `-${isMobile ? 20 : 30}px`,
            width: `calc(100% + ${isMobile ? 40 : 60}px)`,
            height: `calc(100% + ${isMobile ? 40 : 60}px)`,
            objectFit: "cover",
            objectPosition: "center 28%",
            filter: `blur(${isMobile ? 10 : 14}px)`,
            transform: "translateZ(0)",
            opacity: 0.55,
          }}
        />

        {/* Scrim: keep the text readable over the photo. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, rgba(2,3,8,0.32) 0%, rgba(2,3,8,0.66) 62%, rgba(2,3,8,0.86) 100%)",
          }}
        />
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
