import { chapters } from "../../config/content";

interface ProgressDotsProps {
  activeId: string;
}

/**
 * A whisper-quiet vertical chapter indicator, desktop only (hidden on mobile
 * via Tailwind). Tiny dots; the active one glows a soft gold. Clicking scrolls
 * to that chapter. Not a navbar — just orientation.
 */
export default function ProgressDots({ activeId }: ProgressDotsProps) {
  return (
    <nav
      aria-label="Chapters"
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[9995] flex-col items-center gap-4"
    >
      {chapters.map((c) => {
        const active = c.id === activeId;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={c.label}
            aria-current={active ? "true" : undefined}
            className="group relative flex items-center justify-center"
            style={{ width: 16, height: 16 }}
          >
            <span
              style={{
                display: "block",
                borderRadius: "50%",
                transition: "all 700ms cubic-bezier(0.16,1,0.3,1)",
                width: active ? 8 : 5,
                height: active ? 8 : 5,
                background: active
                  ? "radial-gradient(circle, #E6D3A3 0%, #D4AF6A 100%)"
                  : "rgba(197,203,216,0.32)",
                boxShadow: active
                  ? "0 0 10px rgba(212,175,106,0.6)"
                  : "none",
              }}
            />
            {/* Label appears on hover */}
            <span
              className="pointer-events-none absolute right-6 whitespace-nowrap opacity-0 group-hover:opacity-100"
              style={{
                transition: "opacity 400ms ease",
                fontFamily: '"Manrope", sans-serif',
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C5CBD8",
              }}
            >
              {c.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
