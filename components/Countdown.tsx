"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { FloralGarland } from "./Floral";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const target = new Date(wedding.dateISO).getTime();

function getRemaining(): Remaining {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-t-full border border-gold-500/50 bg-cream-50/90 shadow-[0_15px_35px_-15px_rgba(86,10,22,0.45)]">
      <div className="relative h-[1.1em] overflow-hidden font-display text-4xl text-wine-700 tabular-nums sm:text-5xl md:text-6xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 font-display text-[0.6rem] tracking-[0.3em] text-gold-700 uppercase sm:text-xs">{label}</span>
    </div>
  );
}

export default function Countdown() {
  // Starts null so server and first client render match.
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(getRemaining());
    const id = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const done = time !== null && time.days + time.hours + time.minutes + time.seconds === 0;

  return (
    <section id="countdown" className="bg-paper relative overflow-hidden px-5 pt-24 pb-32 sm:pt-32">
      <SectionHeading eyebrow="Counting every moment" title={"Until We Say I Do"} />

      {done ? (
        <Reveal className="text-center font-script text-5xl text-wine-700">Today is the day!</Reveal>
      ) : (
        <Reveal className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:gap-6">
          <Unit value={time?.days ?? null} label="Days" />
          <Unit value={time?.hours ?? null} label="Hours" />
          <Unit value={time?.minutes ?? null} label="Minutes" />
          <Unit value={time?.seconds ?? null} label="Seconds" />
        </Reveal>
      )}

      <FloralGarland className="pointer-events-none absolute -bottom-3 left-1/2 w-[min(120%,640px)] max-w-none -translate-x-1/2 opacity-90" tone="blush" />
    </section>
  );
}
