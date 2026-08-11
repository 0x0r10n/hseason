import { motion } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaPrefs";

interface CloudLayerProps {
  /** 0..1 overall opacity of the cloud band. */
  intensity?: number;
  className?: string;
}

/**
 * Very soft, slow-moving clouds built from blurred radial gradients — no
 * heavy image or video assets. Two layers drift in opposite directions at
 * different speeds to imply parallax depth. Static under reduced-motion.
 */
export default function CloudLayer({
  intensity = 1,
  className,
}: CloudLayerProps) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const layerBase: React.CSSProperties = {
    position: "absolute",
    inset: "-10% -30%",
    willChange: "transform",
  };

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          ...layerBase,
          opacity: 0.5 * intensity,
          filter: `blur(${isMobile ? 28 : 44}px)`,
          background: `
            radial-gradient(40% 30% at 20% 62%, rgba(25,59,115,0.55) 0%, rgba(25,59,115,0) 70%),
            radial-gradient(46% 26% at 62% 70%, rgba(11,31,77,0.6) 0%, rgba(11,31,77,0) 72%),
            radial-gradient(38% 24% at 85% 60%, rgba(43,94,168,0.28) 0%, rgba(43,94,168,0) 70%)
          `,
        }}
        animate={reduced ? undefined : { x: ["0%", "6%", "0%"] }}
        transition={{ duration: 90, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          ...layerBase,
          opacity: 0.4 * intensity,
          filter: `blur(${isMobile ? 34 : 56}px)`,
          background: `
            radial-gradient(44% 28% at 40% 78%, rgba(10,42,94,0.5) 0%, rgba(10,42,94,0) 72%),
            radial-gradient(40% 24% at 75% 82%, rgba(25,59,115,0.4) 0%, rgba(25,59,115,0) 70%)
          `,
        }}
        animate={reduced ? undefined : { x: ["0%", "-7%", "0%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
