"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import { FloralCorner } from "./Floral";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Person = (typeof wedding)["bride"] | (typeof wedding)["groom"];

function Profile({ person, role, from }: { person: Person; role: string; from: "left" | "right" }) {
  return (
    <Reveal from={from} className="flex flex-col items-center text-center">
      <div className="group relative w-60 sm:w-72">
        <div className="absolute -inset-3 rounded-t-full border border-gold-500/60" />
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full shadow-[0_25px_50px_-20px_rgba(86,10,22,0.6)]">
          <Image
            src={person.photo}
            alt={`${person.fullName}, the ${role.toLowerCase()}`}
            fill
            sizes="(max-width: 640px) 240px, 288px"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-900/40 to-transparent" />
        </div>
        <FloralCorner className="absolute -bottom-8 -left-8 w-28 -scale-y-100 drop-shadow-lg" />
      </div>
      <p className="mt-10 font-display text-xs tracking-[0.35em] text-gold-600 uppercase">The {role}</p>
      <h3 className="mt-2 font-script text-5xl text-wine-700 sm:text-6xl">{person.fullName}</h3>
      <p className="mt-2 text-base text-wine-800/70 italic">{person.parents}</p>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section id="couple" className="bg-paper relative overflow-hidden px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Two hearts, one soul" title="The Happy Couple">
        &ldquo;Whatever our souls are made of, his and mine are the same.&rdquo;
      </SectionHeading>

      <div className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <Profile person={wedding.bride} role="Bride" from="left" />
        <Reveal from="zoom" delay={0.3} className="flex items-center justify-center md:h-[24rem]">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/60 bg-cream-50 shadow-lg">
            <Heart className="h-7 w-7 fill-wine-600 text-wine-600" />
          </span>
        </Reveal>
        <Profile person={wedding.groom} role="Groom" from="right" />
      </div>
    </section>
  );
}
