import type { CSSProperties, ReactNode } from "react";

interface SkyBackdropProps {
  /**
   * Vertical mood of the sky:
   * - "deep"   near-black, for hero / finale
   * - "mid"    richer midnight blue
   * - "sapphire" the luminous centerpiece sky
   * - "dawn"   a barely warmer transition (section 03)
   * - "calm"   softer, lighter blue (your-year / birthday)
   */
  variant?: "deep" | "mid" | "sapphire" | "dawn" | "calm";
  /** Introduce the almost-hidden wine undertone near the horizon. */
  wine?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Layered, cinematic sky. Multiple soft radial/linear gradients are stacked
 * so no single band is obvious — the goal is a photographed-night-sky feel
 * rather than a flat CSS gradient. Purely decorative (aria-hidden layers).
 */
const BASE: Record<NonNullable<SkyBackdropProps["variant"]>, string> = {
  deep: `
    radial-gradient(120% 90% at 50% 8%, #050B1A 0%, #030612 46%, #020308 100%),
    linear-gradient(180deg, #020308 0%, #030713 60%, #020308 100%)
  `,
  mid: `
    radial-gradient(120% 90% at 50% 10%, #0B1F4D 0%, #071634 42%, #030916 100%),
    linear-gradient(180deg, #050B1A 0%, #071734 55%, #040A1C 100%)
  `,
  sapphire: `
    radial-gradient(120% 85% at 50% 18%, #0A2A5E 0%, #0B1F4D 40%, #050B1A 82%, #020308 100%),
    linear-gradient(180deg, #040A1C 0%, #0A2247 50%, #050B1A 100%)
  `,
  dawn: `
    radial-gradient(130% 95% at 50% 88%, #14264a 0%, #0B1F4D 38%, #050B1A 78%, #020308 100%),
    linear-gradient(180deg, #050B1A 0%, #0B1F4D 62%, #0e1f40 100%)
  `,
  calm: `
    radial-gradient(120% 90% at 50% 12%, #0F2A55 0%, #0B1F4D 46%, #071531 100%),
    linear-gradient(180deg, #071531 0%, #0B1F4D 58%, #050E22 100%)
  `,
};

export default function SkyBackdrop({
  variant = "mid",
  wine = false,
  className,
  style,
  children,
}: SkyBackdropProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: BASE[variant],
        ...style,
      }}
    >
      {/* Sapphire atmospheric glow, offset from center for asymmetry */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 50% at 68% 26%, rgba(43,94,168,0.20) 0%, rgba(43,94,168,0) 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* A cooler counter-glow low on the left for depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 45% at 18% 80%, rgba(25,59,115,0.22) 0%, rgba(25,59,115,0) 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Almost-hidden wine undertone near the horizon */}
      {wine && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(90% 45% at 50% 108%, rgba(92,24,48,0.28) 0%, rgba(74,16,37,0.12) 42%, rgba(74,16,37,0) 72%)",
            mixBlendMode: "screen",
          }}
        />
      )}
      {children}
    </div>
  );
}
