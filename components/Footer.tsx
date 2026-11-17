"use client";

import { Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import { FloralGarland, GoldFlourish } from "./Floral";
import FloatingPetals from "./FloatingPetals";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-velvet relative overflow-hidden px-5 pt-10 pb-14 text-center">
      <FloatingPetals count={8} seed={99} />
      <FloralGarland className="relative mx-auto -mt-2 w-[min(100%,520px)] drop-shadow-xl" />
      <Reveal className="relative">
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blush-200/90 italic sm:text-xl">{wedding.footerMessage}</p>
        <p className="text-gold-gradient mt-8 font-script text-6xl sm:text-7xl">
          {wedding.bride.firstName} &amp; {wedding.groom.firstName}
        </p>
        <GoldFlourish className="mx-auto mt-4 h-5 w-52" />
        <p className="mt-4 font-display text-sm tracking-[0.35em] text-gold-300">{wedding.dateShort}</p>
        <p className="mt-2 font-display text-xs tracking-[0.3em] text-cream-100/60">{wedding.hashtag}</p>
        <p className="mt-12 flex items-center justify-center gap-2 text-sm text-cream-100/50">
          Made with <Heart className="h-3.5 w-3.5 fill-wine-500 text-wine-500" aria-label="love" /> for our loved ones
        </p>
      </Reveal>
    </footer>
  );
}
