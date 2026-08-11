import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

type Star = {
  x: number; // 0..1 relative
  y: number; // 0..1 relative
  r: number; // radius px
  base: number; // base opacity
  amp: number; // twinkle amplitude
  speed: number; // twinkle speed
  phase: number; // twinkle phase
  gold: boolean; // a rare few are champagne-gold
  drift: number; // vertical drift factor
};

interface StarFieldProps {
  /** Density multiplier for sections that want a richer sky. */
  intensity?: number;
  className?: string;
}

/**
 * Lightweight canvas star field. Stars twinkle almost imperceptibly and
 * drift upward extremely slowly. Honors reduced-motion (renders a static
 * frame) and thins out dramatically on mobile for performance.
 */
export default function StarField({ intensity = 1, className }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;
    let onScreen = true;
    let tabVisible = !document.hidden;

    const buildStars = () => {
      // Base density per megapixel, thinned on mobile.
      const area = (width * height) / (1280 * 720);
      const baseCount = isMobile ? 60 : 130;
      const count = Math.round(baseCount * area * intensity);
      stars = new Array(Math.max(24, count)).fill(0).map(() => {
        const gold = Math.random() < 0.06;
        return {
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * (isMobile ? 1.1 : 1.4) + 0.25,
          base: Math.random() * 0.5 + 0.12,
          amp: Math.random() * 0.35 + 0.05,
          speed: Math.random() * 0.0006 + 0.0002,
          phase: Math.random() * Math.PI * 2,
          gold,
          drift: Math.random() * 0.4 + 0.2,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = reduced
          ? s.base
          : s.base + Math.sin(t * s.speed + s.phase) * s.amp;
        const opacity = Math.max(0, Math.min(1, twinkle));
        // Extremely slow upward drift; wraps around.
        const dy = reduced ? 0 : ((t * 0.000004 * s.drift) % 1);
        let yy = s.y - dy;
        if (yy < 0) yy += 1;

        const px = s.x * width;
        const py = yy * height;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = `rgba(230, 211, 163, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(245, 243, 238, ${opacity})`;
        }
        ctx.fill();

        // A soft halo on the larger stars for a lensed feel.
        if (s.r > 1) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = s.gold
            ? `rgba(212, 175, 106, ${opacity * 0.06})`
            : `rgba(197, 203, 216, ${opacity * 0.05})`;
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    // Only burn frames when this field is near the viewport AND the tab is
    // visible. Every section mounts its own star canvas, so without this all
    // nine loops run at once; gating keeps just the 1–2 on-screen ones alive.
    const shouldRun = () => !reduced && onScreen && tabVisible;
    const start = () => {
      if (!raf && shouldRun()) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const sync = () => (shouldRun() ? start() : stop());

    resize();
    draw(0); // paint one static frame so the sky is never blank
    sync();

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 180);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause the loop whenever the canvas scrolls out of view.
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(resizeTimer);
    };
  }, [reduced, isMobile, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
