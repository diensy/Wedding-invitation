type Tone = "red" | "blush" | "cream";

const TONES: Record<Tone, { outer: string; mid: string; inner: string; line: string }> = {
  red: { outer: "url(#rose-red-o)", mid: "url(#rose-red-m)", inner: "#5a0815", line: "rgba(40,0,8,0.55)" },
  blush: { outer: "url(#rose-blush-o)", mid: "url(#rose-blush-m)", inner: "#d98f8c", line: "rgba(120,40,45,0.45)" },
  cream: { outer: "url(#rose-cream-o)", mid: "url(#rose-cream-m)", inner: "#e9d2b0", line: "rgba(120,85,40,0.4)" },
};

const PETAL = "M0 0 C -24 -8 -28 -40 0 -46 C 28 -40 24 -8 0 0Z";

/** Shared gradients for every floral SVG. Render once near the root. */
export function FloralDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <radialGradient id="rose-red-o" cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#5e0816" />
          <stop offset="55%" stopColor="#9e1428" />
          <stop offset="100%" stopColor="#c8324a" />
        </radialGradient>
        <radialGradient id="rose-red-m" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#4a0611" />
          <stop offset="100%" stopColor="#b01d33" />
        </radialGradient>
        <radialGradient id="rose-blush-o" cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#d68c8c" />
          <stop offset="60%" stopColor="#efbcb6" />
          <stop offset="100%" stopColor="#fbe1dc" />
        </radialGradient>
        <radialGradient id="rose-blush-m" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#c97a7c" />
          <stop offset="100%" stopColor="#f5cdc7" />
        </radialGradient>
        <radialGradient id="rose-cream-o" cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#e4c9a2" />
          <stop offset="60%" stopColor="#f7ead5" />
          <stop offset="100%" stopColor="#fffaf0" />
        </radialGradient>
        <radialGradient id="rose-cream-m" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#d9b98c" />
          <stop offset="100%" stopColor="#f8ecd8" />
        </radialGradient>
        <linearGradient id="leaf-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7f9a5f" />
          <stop offset="100%" stopColor="#3f5a2e" />
        </linearGradient>
        <linearGradient id="gold-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a8822f" />
          <stop offset="40%" stopColor="#f1dea4" />
          <stop offset="65%" stopColor="#c9a24b" />
          <stop offset="100%" stopColor="#8a6a24" />
        </linearGradient>
        <radialGradient id="wax-g" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#f6e4ad" />
          <stop offset="45%" stopColor="#d2ad57" />
          <stop offset="100%" stopColor="#8d6922" />
        </radialGradient>
      </defs>
    </svg>
  );
}

type RoseProps = { x: number; y: number; r?: number; rot?: number; tone?: Tone };

export function Rose({ x, y, r = 1, rot = 0, tone = "red" }: RoseProps) {
  const t = TONES[tone];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={PETAL} fill={t.outer} transform={`rotate(${a})`} stroke={t.line} strokeWidth="0.6" />
      ))}
      {[36, 108, 180, 252, 324].map((a) => (
        <path key={a} d={PETAL} fill={t.mid} transform={`rotate(${a}) scale(0.68)`} stroke={t.line} strokeWidth="0.6" />
      ))}
      <circle r="15" fill={t.inner} />
      <path
        d="M0 -2 C 6 -2 6 6 0 6 C -9 6 -9 -8 0 -8 C 12 -8 12 11 0 11 C -14 11 -14 -13 2 -13"
        fill="none"
        stroke={t.line}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M-20 -22 C -10 -30 10 -30 20 -22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" />
    </g>
  );
}

export function Leaf({ x, y, len = 1, rot = 0 }: { x: number; y: number; len?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${len})`}>
      <path d="M0 0 C 12 -13 34 -13 48 0 C 34 13 12 13 0 0Z" fill="url(#leaf-g)" />
      <path d="M2 0 L44 0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" />
    </g>
  );
}

export function Bud({ x, y, rot = 0, tone = "red" }: { x: number; y: number; rot?: number; tone?: Tone }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M0 0 L0 18" stroke="#4f6b3a" strokeWidth="1.6" />
      <path d="M0 0 C -8 -6 -7 -18 0 -22 C 7 -18 8 -6 0 0Z" fill={TONES[tone].outer} />
      <path d="M0 2 C -6 -2 -8 -8 -6 -12 M0 2 C 6 -2 8 -8 6 -12" fill="none" stroke="#5f7d45" strokeWidth="2" />
    </g>
  );
}

function Filler({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#fff8ec" opacity="0.9">
      <circle r="2.4" />
      <circle cx="6" cy="-4" r="1.8" />
      <circle cx="-5" cy="-6" r="1.6" />
      <circle cx="3" cy="6" r="1.5" />
    </g>
  );
}

type SvgProps = { className?: string; style?: React.CSSProperties };

/** Rose cluster designed for a top-left corner. Mirror with CSS for other corners. */
export function FloralCorner({ className, style, tones = ["red", "blush", "cream"] }: SvgProps & { tones?: [Tone, Tone, Tone] }) {
  return (
    <svg viewBox="0 0 260 260" className={className} style={style} aria-hidden="true">
      <Leaf x={70} y={60} len={1.5} rot={-5} />
      <Leaf x={60} y={70} len={1.5} rot={95} />
      <Leaf x={110} y={40} len={1.1} rot={20} />
      <Leaf x={40} y={110} len={1.1} rot={70} />
      <Leaf x={120} y={95} len={1} rot={40} />
      <Leaf x={20} y={30} len={1.2} rot={-150} />
      <Bud x={180} y={40} rot={70} tone={tones[1]} />
      <Bud x={40} y={180} rot={-160} tone={tones[0]} />
      <Rose x={62} y={62} r={1.15} rot={10} tone={tones[0]} />
      <Rose x={132} y={42} r={0.7} rot={40} tone={tones[1]} />
      <Rose x={42} y={132} r={0.7} rot={-20} tone={tones[2]} />
      <Rose x={110} y={110} r={0.48} rot={60} tone={tones[1]} />
      <Filler x={160} y={70} />
      <Filler x={70} y={160} />
      <Filler x={150} y={130} />
    </svg>
  );
}

/** Horizontal garland with a large centre rose. */
export function FloralGarland({ className, style, tone = "red" }: SvgProps & { tone?: Tone }) {
  const side: Tone = tone === "red" ? "blush" : "red";
  return (
    <svg viewBox="0 0 600 140" className={className} style={style} aria-hidden="true">
      <path d="M40 80 C 160 40 220 110 300 70 C 380 110 440 40 560 80" fill="none" stroke="#4f6b3a" strokeWidth="2" />
      {[
        [80, 70, 200, 1],
        [130, 60, -20, 1.1],
        [190, 85, 160, 1],
        [235, 55, -40, 1.2],
        [470, 70, -20, 1],
        [420, 60, 200, 1.1],
        [365, 85, 20, 1],
        [365, 55, 220, 1.2],
      ].map(([x, y, rot, len], i) => (
        <Leaf key={i} x={x} y={y} rot={rot} len={len} />
      ))}
      <Bud x={60} y={80} rot={-100} tone={side} />
      <Bud x={540} y={80} rot={100} tone={side} />
      <Rose x={165} y={72} r={0.5} rot={20} tone="cream" />
      <Rose x={435} y={72} r={0.5} rot={-20} tone="cream" />
      <Rose x={230} y={74} r={0.72} rot={-30} tone={side} />
      <Rose x={370} y={74} r={0.72} rot={30} tone={side} />
      <Rose x={300} y={70} r={1.05} rot={8} tone={tone} />
      <Filler x={120} y={92} />
      <Filler x={480} y={92} />
      <Filler x={268} y={110} />
      <Filler x={334} y={110} />
    </svg>
  );
}

/** Thin gold flourish used between headings and content. */
export function GoldFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} aria-hidden="true">
      <g fill="none" stroke="url(#gold-g)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 12 H 92" />
        <path d="M236 12 H 148" />
        <path d="M92 12 C 100 2 110 2 114 12 C 110 20 102 18 102 12" />
        <path d="M148 12 C 140 2 130 2 126 12 C 130 20 138 18 138 12" />
      </g>
      <path d="M120 4 L126 12 L120 20 L114 12Z" fill="url(#gold-g)" />
    </svg>
  );
}

/** Gold monogram wax seal. */
// Rounded so server and browser trig output serialize identically (avoids hydration mismatch).
const round = (n: number) => Math.round(n * 1000) / 1000;

const SEAL_BUMPS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return { cx: round(50 + Math.cos(a) * 41), cy: round(50 + Math.sin(a) * 41), r: 7 + (i % 3) };
});

const SEAL_DOTS = [0, 60, 120, 180, 240, 300].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { key: deg, cx: round(50 + Math.cos(a) * 35.5), cy: round(50 + Math.sin(a) * 35.5) };
});

export function WaxSeal({ initials, className }: { initials: string; className?: string }) {
  const bumps = SEAL_BUMPS;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.35))">
        {bumps.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="url(#wax-g)" />
        ))}
        <circle cx="50" cy="50" r="42" fill="url(#wax-g)" />
      </g>
      <circle cx="50" cy="50" r="31" fill="none" stroke="#8d6922" strokeWidth="1.4" opacity="0.7" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#fff3cf" strokeWidth="0.6" opacity="0.6" />
      {SEAL_DOTS.map((d) => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r="1.3" fill="#8d6922" />
      ))}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-great-vibes), cursive"
        fontSize="25"
        fill="#6e4f15"
        style={{ paintOrder: "stroke" }}
        stroke="#f8e7b4"
        strokeWidth="0.6"
      >
        {initials}
      </text>
    </svg>
  );
}
