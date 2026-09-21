"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { animate } from "motion/mini";

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("motion-paused", paused);
    return () => document.body.classList.remove("motion-paused");
  }, [paused]);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MotionContext.Provider>
  );
}
export function useMotionPreference() {
  return useContext(MotionContext);
}
export function MotionToggle() {
  const { paused, toggle } = useMotionPreference();
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={paused}
      aria-label={
        paused ? "Resume decorative motion" : "Pause decorative motion"
      }
      onClick={toggle}
    >
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      <span className="motion-label">
        {paused ? "Resume motion" : "Pause motion"}
      </span>
    </button>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { paused } = useMotionPreference();
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      reduced ||
      paused ||
      !("IntersectionObserver" in window) ||
      element.getBoundingClientRect().top <= window.innerHeight
    )
      return;
    let animation: ReturnType<typeof animate> | undefined;
    // Server output is always visible; only below-fold elements animate after hydration.
    element.style.opacity = "0";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        animation = animate(
          element,
          { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0)"] },
          { duration: 0.55 },
        );
        observer.disconnect();
      },
      // Reveal once the element has crossed the line 20% up from the bottom edge, including when a jump scrolls past it.
      { rootMargin: "10000px 0px -20% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.stop();
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    };
  }, [reduced, paused]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
