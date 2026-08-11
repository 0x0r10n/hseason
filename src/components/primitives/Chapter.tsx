import { useEffect, useRef, type ReactNode } from "react";

interface ChapterProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Report visibility to the progress indicator. */
  onActive?: (id: string) => void;
  /** Minimum height. Uses svh for correct mobile behavior. */
  minFull?: boolean;
  style?: React.CSSProperties;
}

/**
 * A narrative section. Anchored by id, vertically centered content, and it
 * notifies the parent when it becomes the dominant section on screen (for the
 * desktop progress dots). Uses 100svh so mobile browser chrome doesn't clip.
 */
export default function Chapter({
  id,
  children,
  className = "",
  onActive,
  minFull = true,
  style,
}: ChapterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onActive) return;
    const el = ref.current;
    if (!el) return;
    // A thin trigger band at the vertical center of the viewport: any section
    // crossing the middle of the screen becomes "active". This works for
    // sections both shorter and much taller than the viewport.
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onActive(id);
        }
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [id, onActive]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full flex flex-col items-center justify-center ${className}`}
      style={{
        minHeight: minFull ? "100svh" : undefined,
        paddingLeft: "max(1.375rem, var(--safe-left))",
        paddingRight: "max(1.375rem, var(--safe-right))",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
