"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { FloralCorner, FloralGarland, GoldFlourish, WaxSeal } from "./Floral";
import FloatingPetals from "./FloatingPetals";

type Phase = "closed" | "opening" | "lifting" | "presenting";

// Milliseconds from tap until each phase starts.
const TIMELINE = { lifting: 1150, presenting: 2700, done: 4300 };
const EASE = [0.65, 0, 0.35, 1] as const;

const initials = `${wedding.bride.firstName[0]}${wedding.groom.firstName[0]}`;

export default function Envelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    const speed = reduce ? 0.25 : 1;
    timers.current.push(
      window.setTimeout(() => setPhase("lifting"), TIMELINE.lifting * speed),
      window.setTimeout(() => setPhase("presenting"), TIMELINE.presenting * speed),
      window.setTimeout(onOpened, TIMELINE.done * speed),
    );
  }, [phase, onOpened, reduce]);

  const isClosed = phase === "closed";
  const flapOpen = phase !== "closed";
  const cardOut = phase === "lifting" || phase === "presenting";
  const presenting = phase === "presenting";

  return (
    <motion.section
      className="bg-velvet fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE } }}
      aria-label="Wedding invitation envelope"
    >
      <FloatingPetals count={16} />

      <motion.div
        className="pointer-events-none will-change-transform absolute -top-6 -left-6 w-40 sm:w-60 md:w-72"
        animate={{ rotate: [0, 3, 0], y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FloralCorner className="w-full drop-shadow-xl" />
      </motion.div>
      <motion.div
        className="pointer-events-none will-change-transform absolute -top-6 -right-6 w-40 sm:w-60 md:w-72"
        animate={{ rotate: [0, -3, 0], y: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <FloralCorner className="w-full -scale-x-100 drop-shadow-xl" tones={["blush", "red", "cream"]} />
      </motion.div>
      <motion.div
        className="pointer-events-none will-change-transform absolute -bottom-6 -left-6 w-36 sm:w-52 md:w-64"
        animate={{ rotate: [0, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <FloralCorner className="w-full -scale-y-100 drop-shadow-xl" tones={["blush", "cream", "red"]} />
      </motion.div>
      <motion.div
        className="pointer-events-none will-change-transform absolute -right-6 -bottom-6 w-36 sm:w-52 md:w-64"
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <FloralCorner className="w-full -scale-100 drop-shadow-xl" />
      </motion.div>

      <motion.div
        className="relative z-10 mb-[clamp(6rem,22vw,10rem)] text-center"
        animate={{ opacity: isClosed ? 1 : 0, y: isClosed ? 0 : -20 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-display text-[0.7rem] tracking-[0.4em] text-gold-300 uppercase sm:text-xs">The Wedding Of</p>
        <p className="text-gold-gradient mt-2 font-script text-4xl sm:text-5xl">
          {wedding.bride.firstName} &amp; {wedding.groom.firstName}
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        role="button"
        tabIndex={isClosed ? 0 : -1}
        aria-label="Tap to open the invitation"
        aria-disabled={!isClosed}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        className={`relative z-10 aspect-[10/7] w-[min(88vw,520px)] outline-none select-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-8 focus-visible:ring-offset-wine-800 ${
          isClosed ? "cursor-pointer" : "cursor-default"
        }`}
        style={{ perspective: 1600 }}
        animate={isClosed && !reduce ? { y: [0, -10, 0] } : { y: 0 }}
        transition={isClosed ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
        whileHover={isClosed ? { scale: 1.02 } : undefined}
        whileTap={isClosed ? { scale: 0.98 } : undefined}
      >
        {/* Back panel / inside lining */}
        <motion.div
          className="absolute inset-0 rounded-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)]"
          style={{ background: "linear-gradient(180deg,#4a0711 0%,#6d0f1f 100%)" }}
          animate={presenting ? { y: "70%", opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        {/* Invitation card */}
        <motion.div
          className="absolute inset-x-[5%] top-[5%] bottom-[4%]"
          style={{ zIndex: cardOut ? 25 : 10 }}
          initial={false}
          animate={presenting ? { y: "-24%", scale: 1.14 } : cardOut ? { y: "-60%", scale: 1 } : { y: 0, scale: 1 }}
          transition={{ duration: presenting ? 1.4 : 1.3, ease: EASE }}
        >
          <InnerCard />
        </motion.div>

        {/* Front pocket */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 20 }}
          animate={presenting ? { y: "70%", opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="env-side" x1="0" x2="1">
                <stop offset="0%" stopColor="#7a1022" />
                <stop offset="100%" stopColor="#951a2e" />
              </linearGradient>
              <linearGradient id="env-bottom" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#8a1426" />
                <stop offset="100%" stopColor="#b02239" />
              </linearGradient>
            </defs>
            <path d="M0 0 L50 37 L0 70Z" fill="url(#env-side)" />
            <path d="M100 0 L50 37 L100 70Z" fill="url(#env-side)" />
            <path d="M0 70 L50 32 L100 70Z" fill="url(#env-bottom)" />
            <path d="M0 70 L50 32 L100 70" fill="none" stroke="url(#gold-g)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
            <path d="M0 0 L46 34.5 M100 0 L54 34.5" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.3" />
          </svg>
          <FloralCorner className="absolute -bottom-3 -left-3 w-[30%] -scale-y-100 drop-shadow-lg" />
          <FloralCorner className="absolute -right-3 -bottom-3 w-[30%] -scale-100 drop-shadow-lg" tones={["blush", "red", "cream"]} />
          <FloralGarland className="absolute bottom-[2%] left-1/2 w-[46%] -translate-x-1/2 drop-shadow-md" tone="blush" />
          <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-gold-500/40 ring-inset" />
        </motion.div>

        {/* Top flap with front face and lining */}
        {/* Opacity lives on this wrapper: fading a preserve-3d element flattens it and both faces show. */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[60%]"
          style={{ perspective: 1600, zIndex: phase === "closed" || phase === "opening" ? 30 : 5 }}
          initial={false}
          animate={presenting ? { y: "116%", opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={{ rotateX: flapOpen ? 180 : 0 }}
          transition={{ duration: 1.05, ease: EASE, delay: flapOpen ? 0.3 : 0 }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <svg viewBox="0 0 100 42" preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)]">
              <defs>
                <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f1123" />
                  <stop offset="100%" stopColor="#a51d33" />
                </linearGradient>
              </defs>
              <path d="M0 0 H100 L53 40 Q50 42.5 47 40 Z" fill="url(#env-flap)" />
              <path d="M0 0 L47 40 Q50 42.5 53 40 L100 0" fill="none" stroke="url(#gold-g)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            </svg>
            <FloralGarland className="absolute top-[4%] left-1/2 w-[52%] -translate-x-1/2 rotate-180 opacity-95" />
          </div>
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
            <svg viewBox="0 0 100 42" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="env-lining" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f6dcd6" />
                  <stop offset="100%" stopColor="#e8b9b2" />
                </linearGradient>
              </defs>
              {/* Mirrored so the open flap points up, away from the envelope. */}
              <path d="M0 42 H100 L53 2 Q50 -0.5 47 2 Z" fill="url(#env-lining)" />
              <path d="M6 40 H94 L51.5 4.5 Q50 3.2 48.5 4.5 Z" fill="none" stroke="#c9a24b" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </motion.div>
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute top-[60%] left-1/2 w-[22%] max-w-[112px] min-w-[76px] -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 40 }}
          initial={false}
          animate={isClosed ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 1.35, opacity: 0, rotate: -25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {isClosed && !reduce && (
            <motion.span
              className="absolute inset-0 rounded-full bg-gold-300/40"
              animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <WaxSeal initials={initials} className="relative w-full" />
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={open}
        tabIndex={-1}
        className="relative z-10 mt-10 font-display text-xs tracking-[0.5em] text-gold-300 uppercase sm:text-sm"
        animate={isClosed ? { opacity: [0.45, 1, 0.45] } : { opacity: 0 }}
        transition={isClosed ? { duration: 2.4, repeat: Infinity } : { duration: 0.4 }}
        aria-hidden="true"
      >
        Tap to Open
      </motion.button>
    </motion.section>
  );
}

function InnerCard() {
  return (
    <div className="bg-paper gold-frame relative flex h-full w-full flex-col items-center overflow-hidden rounded-sm px-[6%] pt-[7%] text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <FloralCorner className="absolute -top-2 -left-2 w-[24%] opacity-90" tones={["blush", "cream", "red"]} />
      <FloralCorner className="absolute -top-2 -right-2 w-[24%] -scale-x-100 opacity-90" tones={["blush", "cream", "red"]} />
      <p className="font-display text-[clamp(0.45rem,1.6vw,0.7rem)] tracking-[0.3em] text-gold-700 uppercase">
        Together with their families
      </p>
      <p className="mt-[3%] font-script text-[clamp(1.6rem,7.5vw,3.2rem)] leading-none text-wine-700">
        {wedding.bride.firstName}
      </p>
      <p className="font-script text-[clamp(1rem,4vw,1.8rem)] leading-tight text-gold-600">&amp;</p>
      <p className="font-script text-[clamp(1.6rem,7.5vw,3.2rem)] leading-none text-wine-700">{wedding.groom.firstName}</p>
      <GoldFlourish className="mt-[3%] h-3 w-1/2" />
      <p className="mt-[2%] font-display text-[clamp(0.5rem,1.8vw,0.8rem)] tracking-[0.25em] text-wine-800">
        {wedding.dateShort}
      </p>
      <p className="mt-[1%] text-[clamp(0.55rem,2vw,0.9rem)] text-wine-800/80 italic">{wedding.venue.name}</p>
    </div>
  );
}
