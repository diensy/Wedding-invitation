"use client";

import Image from "next/image";
import { CalendarHeart, Clock, MapPin, Navigation } from "lucide-react";
import { wedding } from "@/config/wedding";
import { FloralCorner, GoldFlourish } from "./Floral";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const details = [
  { icon: CalendarHeart, label: "The Date", value: wedding.dateLong },
  { icon: Clock, label: "The Time", value: wedding.time },
  { icon: MapPin, label: "The Venue", value: wedding.venue.name, sub: wedding.venue.address },
].filter((d) => d.value);

export default function WeddingDetails() {
  return (
    <section id="details" className="bg-velvet relative overflow-hidden px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Save the date" title="Wedding Details" light>
        Join us as we begin our journey together, surrounded by family and blessings.
      </SectionHeading>

      <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2">
        <Reveal from="left" className="relative">
          <div className="bg-paper gold-frame relative h-full overflow-hidden rounded-sm px-6 py-12 text-center shadow-2xl sm:px-12">
            <FloralCorner className="absolute -top-3 -left-3 w-24 sm:w-32" />
            <FloralCorner className="absolute -right-3 -bottom-3 w-24 -scale-100 sm:w-32" tones={["blush", "red", "cream"]} />
            <p className="font-script text-4xl text-wine-700 sm:text-5xl">The Ceremony</p>
            <GoldFlourish className="mx-auto mt-3 h-4 w-44" />
            <dl className="mt-8 space-y-8">
              {details.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex flex-col items-center">
                  <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
                  <dt className="mt-2 font-display text-xs tracking-[0.3em] text-gold-700 uppercase">{label}</dt>
                  <dd className="mt-1 text-2xl text-wine-800">{value}</dd>
                  {sub && <dd className="mt-1 max-w-xs text-base text-wine-800/70 italic">{sub}</dd>}
                </div>
              ))}
            </dl>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-wine-700 px-7 py-3 font-display text-xs tracking-[0.25em] text-cream-50 uppercase shadow-lg transition hover:bg-wine-600 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              View on Map
            </a>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.15} className="group relative min-h-[320px] overflow-hidden rounded-sm ring-1 ring-gold-500/50">
          <Image
            src={wedding.venue.image}
            alt={`${wedding.venue.name} decorated for the ceremony`}
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="object-cover transition-transform duration-[1.6s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-center">
            <p className="font-display text-xs tracking-[0.35em] text-gold-300 uppercase">{wedding.venue.city}</p>
            <p className="mt-2 font-script text-4xl text-cream-50 sm:text-5xl">{wedding.venue.name}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
