"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// Layout effect on the client (runs before paint, so above-the-fold items
// never flash hidden); plain effect on the server to avoid the SSR warning.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Single shared IntersectionObserver for every Reveal on the page. Each
// target is unobserved the first time it intersects (fire-once entrance).
let sharedObserver: IntersectionObserver | null = null;
const pending = new Map<Element, () => void>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const fire = pending.get(entry.target);
          if (!fire) continue;
          pending.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
          fire();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
  }
  return sharedObserver;
}

function useRevealState() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion users (and browsers without IntersectionObserver) get
    // the visible baseline immediately — no animation, no observer.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }
    // Already on screen (e.g. hero content): show now, skip the observer
    // so above-the-fold content never flashes hidden after hydration.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const io = getSharedObserver();
    if (!io) {
      setVisible(true);
      return;
    }
    pending.set(el, () => setVisible(true));
    io.observe(el);
    return () => {
      pending.delete(el);
      io.unobserve(el);
    };
  }, []);

  return { ref, visible };
}

/** Stagger slot for card grids: 90ms steps, capped at 6 slots (see globals.css). */
function staggerStyle(index?: number): CSSProperties | undefined {
  if (index === undefined) return undefined;
  return { "--i": Math.min(Math.max(index, 0), 5) } as CSSProperties;
}

export default function Reveal({
  as,
  index,
  className = "",
  children,
}: {
  /** Wrapper element. Use "li" for card rows inside a <ul> (valid HTML). */
  as?: "div" | "li";
  /** Stagger slot 0..5 (clamped); omit for no stagger. */
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, visible } = useRevealState();
  const cls = `reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`;
  const style = staggerStyle(index);
  if (as === "li") {
    return (
      <li ref={ref as React.Ref<HTMLLIElement>} style={style} className={cls}>
        {children}
      </li>
    );
  }
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} style={style} className={cls}>
      {children}
    </div>
  );
}
