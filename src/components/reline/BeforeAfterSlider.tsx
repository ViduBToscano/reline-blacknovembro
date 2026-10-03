import { useState } from "react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  alt: string;
};

export function BeforeAfterSlider({ before, after, alt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="overflow-hidden rounded-3xl bg-white p-3 shadow-[var(--shadow-soft)]">
      <div className="group relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-2xl bg-sand">
        <img
          src={after}
          alt={`${alt}: depois`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <img
          src={before}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          loading="lazy"
          draggable={false}
          aria-hidden="true"
        />

        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream-lt backdrop-blur-sm">
          Antes
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream-lt backdrop-blur-sm">
          Depois
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-cream-lt shadow-[0_0_12px_var(--ink)]"
          style={{ left: `calc(${position}% - 1px)` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream-lt bg-ink/85 text-cream-lt shadow-lg">
            <span className="text-sm" aria-hidden="true">↔</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="before-after-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Comparar antes e depois: ${alt}`}
        />
      </div>
    </figure>
  );
}