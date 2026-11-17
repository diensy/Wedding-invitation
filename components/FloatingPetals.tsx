"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

const COLORS = ["#b3203a", "#e7a9a6", "#f6d7d1", "#8a1426", "#f3e3c3"];

type Props = { count?: number; className?: string; seed?: number };

export default function FloatingPetals({ count = 14, className = "", seed = 7 }: Props) {
  const reduce = useReducedMotion();
  const petals = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r2(rand() * 100),
      size: r2(10 + rand() * 14),
      duration: r2(12 + rand() * 12),
      delay: r2(-rand() * 20),
      sway: r2(20 + rand() * 50),
      spin: r2(180 + rand() * 360),
      color: COLORS[Math.floor(rand() * COLORS.length)],
    }));
  }, [count, seed]);

  if (reduce) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 20 24"
          width={p.size}
          height={p.size * 1.2}
          className="petal absolute -top-10"
          style={
            {
              left: `${p.left}%`,
              "--sway": `${p.sway}px`,
              "--spin": `${p.spin}deg`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <path d="M10 0 C 18 6 20 16 10 24 C 0 16 2 6 10 0Z" fill={p.color} />
          <path d="M10 3 C 12 10 12 16 10 21" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none" />
        </svg>
      ))}
    </div>
  );
}
