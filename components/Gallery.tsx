"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const photos = wedding.gallery;

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const isOpen = index !== null;
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  return (
    <section id="gallery" className="bg-paper relative px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Captured moments" title="Our Gallery" />

      <div className="mx-auto max-w-6xl columns-2 gap-3 sm:gap-5 md:columns-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 0.1} className="mb-3 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setDir(0);
                setIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-sm ring-1 ring-gold-500/30 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none"
              aria-label={`Open photo: ${p.alt}`}
            >
              <div className={`relative w-full ${"tall" in p && p.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-wine-900/0 transition duration-500 group-hover:bg-wine-900/40">
                <Expand className="h-8 w-8 scale-75 text-cream-50 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-wine-950/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 rounded-full border border-gold-500/50 p-2 text-gold-300 transition hover:bg-gold-500/20"
              aria-label="Close photo viewer"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 z-10 rounded-full border border-gold-500/50 bg-wine-950/50 p-2 text-gold-300 transition hover:bg-gold-500/20 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 z-10 rounded-full border border-gold-500/50 bg-wine-950/50 p-2 text-gold-300 transition hover:bg-gold-500/20 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                className="relative h-[75vh] w-full max-w-4xl"
                initial={{ opacity: 0, x: dir * 60, scale: dir === 0 ? 0.92 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1);
                  else if (info.offset.x > 60) step(-1);
                }}
              >
                <Loader2 className="absolute top-1/2 left-1/2 h-8 w-8 -translate-1/2 animate-spin text-gold-400/70" aria-hidden="true" />
                <Image
                  src={photos[index].src}
                  alt={photos[index].alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="pointer-events-none object-contain"
                />
                <figcaption className="absolute inset-x-0 -bottom-10 text-center text-base text-blush-200 italic">
                  {photos[index].alt} &middot; {index + 1} / {photos.length}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
