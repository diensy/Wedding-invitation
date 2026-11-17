"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { wedding } from "@/config/wedding";
import { FloralCorner } from "./Floral";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const { dressCode } = wedding;

function AttireCard({ title, items, from }: { title: string; items: readonly string[]; from: "left" | "right" }) {
  return (
    <Reveal from={from} className="h-full">
      <div className="h-full rounded-sm border border-gold-500/40 bg-cream-50/10 p-8 text-center">
        <h3 className="font-script text-4xl text-gold-300 sm:text-5xl">{title}</h3>
        <ul className="mt-5 space-y-3 text-lg text-cream-100/90">
          {items.map((it) => (
            <li key={it} className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function DressCode() {
  return (
    <section id="dress-code" className="bg-velvet relative overflow-hidden px-5 py-24 sm:py-32">
      <FloralCorner className="pointer-events-none absolute -top-4 -left-4 w-28 opacity-90 sm:w-44" />
      <FloralCorner className="pointer-events-none absolute -top-4 -right-4 w-28 -scale-x-100 opacity-90 sm:w-44" tones={["blush", "red", "cream"]} />

      <SectionHeading eyebrow="What to wear" title="Dress Code" light>
        {dressCode.note}
      </SectionHeading>

      <Reveal className="text-center">
        <p className="font-display text-lg tracking-[0.3em] text-gold-300 uppercase sm:text-xl">{dressCode.title}</p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <AttireCard title="For Her" items={dressCode.women} from="left" />
        <AttireCard title="For Him" items={dressCode.men} from="right" />
      </div>

      <Reveal className="mx-auto mt-14 max-w-4xl text-center">
        <p className="font-display text-xs tracking-[0.35em] text-gold-300 uppercase">Our Colour Palette</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-5 sm:gap-8">
          {dressCode.palette.map((c, i) => (
            <motion.li
              key={c.hex}
              className="flex w-20 flex-col items-center"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 16 }}
              whileHover={{ y: -6 }}
            >
              <span
                className="h-16 w-16 rounded-full shadow-lg ring-2 ring-gold-400/70 ring-offset-4 ring-offset-wine-800"
                style={{ backgroundColor: c.hex }}
              />
              <span className="mt-3 text-sm text-cream-100/85">{c.name}</span>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
