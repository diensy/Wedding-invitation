import { GoldFlourish } from "./Floral";
import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; light?: boolean; children?: React.ReactNode };

export default function SectionHeading({ eyebrow, title, light = false, children }: Props) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p className={`font-display text-xs tracking-[0.35em] uppercase sm:text-sm ${light ? "text-gold-300" : "text-gold-600"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-script text-5xl leading-tight sm:text-6xl md:text-7xl ${light ? "text-cream-50" : "text-wine-700"}`}>
        {title}
      </h2>
      <GoldFlourish className="mx-auto mt-4 h-5 w-48 sm:w-60" />
      {children && (
        <p className={`mt-5 text-lg leading-relaxed italic sm:text-xl ${light ? "text-blush-200/90" : "text-wine-800/80"}`}>
          {children}
        </p>
      )}
    </Reveal>
  );
}
