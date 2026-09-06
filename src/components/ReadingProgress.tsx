"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Thin article-scoped reading progress bar (rAF-throttled scroll listener,
 * scaleX fill). Decorative, so always aria-hidden; short articles that fit
 * in one viewport hide it entirely. No CSS transition — position is
 * scroll-driven, which is inherently reduced-motion safe.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const article = document.getElementById(targetId);
    const bar = barRef.current;
    if (!article || !bar) return;
    let raf = 0;
    let isHidden = false;

    const update = () => {
      raf = 0;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 40) {
        if (!isHidden) {
          isHidden = true;
          setHidden(true);
        }
        bar.style.transform = "scaleX(0)";
        return;
      }
      if (isHidden) {
        isHidden = false;
        setHidden(false);
      }
      const done = Math.min(Math.max(-rect.top / total, 0), 1);
      bar.style.transform = `scaleX(${done})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className={`reading-progress sticky top-0 z-10 pt-4 ${hidden ? "hidden" : ""}`}>
      <div ref={barRef} className="h-0.5 origin-left bg-pine dark:bg-mint" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
