/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Black — depth & contrast
        ink: "#020308",
        // Deep blue family (primary environment)
        midnight: "#050B1A",
        sapphire: "#0B1F4D",
        ocean: "#0A2A5E",
        // Lighter blues
        "blue-soft": "#193B73",
        "blue-glow": "#2B5EA8",
        // Warm ivory text
        ivory: "#F5F3EE",
        "text-secondary": "#C5CBD8",
        "text-muted": "#7F8A9D",
        // Gold — jewelry accents
        gold: "#D4AF6A",
        champagne: "#E6D3A3",
        // Wine — hidden emotional undertone
        wine: "#4A1025",
        burgundy: "#5C1830",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.35em",
        wide2: "0.18em",
      },
      maxWidth: {
        prose: "640px",
        "prose-wide": "720px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-4%, 2%, 0)" },
        },
      },
    },
  },
  plugins: [],
};
