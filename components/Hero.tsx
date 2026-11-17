"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { FloralCorner, FloralGarland, GoldFlourish } from "./Floral";
import FloatingPetals from "./FloatingPetals";

// Opacity + transform only: animating blur filters is what made the intro stutter on phones.
const item = (delay: number, ready: boolean) => ({
  initial: { opacity: 0, y: 30 },
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
  transition: { duration: 1.1, delay: ready ? delay : 0, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-wine-900 px-5 pt-24 pb-36">
      <motion.div className="absolute inset-0" style={{ y: bgY }} initial={{ scale: 1.15 }} animate={{ scale: ready ? 1 : 1.15 }} transition={{ duration: 2.4, ease: "easeOut" }}>
        <Image src={wedding.heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-wine-950/80 via-wine-900/70 to-wine-950/90" />
      {ready && <FloatingPetals count={12} seed={21} />}

      <motion.div className="pointer-events-none absolute -top-4 -left-4 w-32 sm:w-56 lg:w-72" {...item(0.2, ready)}>
        <FloralCorner className="w-full drop-shadow-2xl" />
      </motion.div>
      <motion.div className="pointer-events-none absolute -top-4 -right-4 w-32 sm:w-56 lg:w-72" {...item(0.35, ready)}>
        <FloralCorner className="w-full -scale-x-100 drop-shadow-2xl" tones={["blush", "red", "cream"]} />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p {...item(0.4, ready)} className="font-display text-xs tracking-[0.45em] text-gold-300 uppercase sm:text-sm">
          We are getting married
        </motion.p>

        <motion.h1 {...item(0.6, ready)} className="mt-6 font-script leading-[0.95] text-cream-50">
          <span className="block text-6xl sm:text-8xl md:text-9xl">{wedding.bride.firstName}</span>
          <span className="text-gold-gradient my-1 block text-4xl sm:text-6xl">&amp;</span>
          <span className="block text-6xl sm:text-8xl md:text-9xl">{wedding.groom.firstName}</span>
        </motion.h1>

        <motion.div {...item(0.9, ready)}>
          <GoldFlourish className="mx-auto mt-6 h-6 w-56 sm:w-72" />
        </motion.div>

        <motion.p {...item(1.05, ready)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blush-200/90 italic sm:text-xl">
          {wedding.invitationLine}
        </motion.p>

        <motion.div {...item(1.25, ready)} className="mt-8 inline-flex max-w-full flex-col items-center gap-1 border-y border-gold-500/50 px-2 py-4 sm:px-8">
          <span className="font-display text-sm tracking-[0.12em] text-gold-300 sm:text-base sm:tracking-[0.25em]">{wedding.dateLong}</span>
          <span className="text-base text-cream-100/80 italic sm:text-lg">{wedding.venue.name}, {wedding.venue.city}</span>
        </motion.div>
      </motion.div>

      <FloralGarland className="pointer-events-none absolute -bottom-2 left-1/2 w-[min(120%,720px)] max-w-none -translate-x-1/2 drop-shadow-2xl" />

      <motion.a
        href="#couple"
        aria-label="Scroll to the couple"
        className="absolute bottom-[clamp(5rem,18vw,8rem)] left-1/2 z-10 -translate-x-1/2 text-gold-300"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0 }}
        transition={{ opacity: { delay: 1.8 }, y: { duration: 2, repeat: Infinity } }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
