"use client";

import { CalendarDays, Clock, Flower2, Gem, MapPin, Music, Sun, Wine, type LucideIcon } from "lucide-react";
import { wedding, type WeddingEvent } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS: Record<WeddingEvent["icon"], LucideIcon> = {
  henna: Flower2,
  sun: Sun,
  music: Music,
  rings: Gem,
  glass: Wine,
};

export default function Itinerary() {
  return (
    <section id="itinerary" className="relative overflow-hidden bg-blush-100 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Celebrations" title="Wedding Itinerary">
        Two days of colour, music and love. We hope you can join us for every one.
      </SectionHeading>

      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
        {wedding.events.map((ev, i) => {
          const Icon = ICONS[ev.icon];
          return (
            <Reveal
              as="li"
              key={ev.name}
              delay={i * 0.08}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <article className="group relative h-full overflow-hidden rounded-t-[9rem] rounded-b-md border border-gold-500/40 bg-cream-50 px-6 pt-12 pb-8 text-center shadow-[0_20px_40px_-25px_rgba(86,10,22,0.55)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-25px_rgba(86,10,22,0.7)]">
                <div className="absolute inset-2 rounded-t-[8.5rem] rounded-b-sm border border-gold-500/25" aria-hidden="true" />
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-wine-600 to-wine-800 text-gold-300 shadow-lg ring-4 ring-gold-400/30 transition-transform duration-500 group-hover:rotate-12">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 font-script text-4xl text-wine-700">{ev.name}</h3>
                <p className="relative mt-2 text-base text-wine-900/70 italic">{ev.description}</p>
                <dl className="relative mt-6 space-y-2 text-left text-base text-wine-900/85">
                  <div className="flex items-start gap-3">
                    <dt className="sr-only">Date</dt>
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <dd>{ev.date}</dd>
                  </div>
                  {ev.time && (
                    <div className="flex items-start gap-3">
                      <dt className="sr-only">Time</dt>
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <dd>{ev.time}</dd>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <dt className="sr-only">Location</dt>
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <dd>{ev.location}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
