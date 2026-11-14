import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { DIVISIONS, type DivisionId, TESTIMONIALS } from '../config/site';
import { getNextIndex, getPrevIndex } from '../utils/carousel';

interface TestimonialCarouselProps {
  onSelectDivision: (division: DivisionId) => void;
}

export function TestimonialCarousel({ onSelectDivision }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];
  const activeDivision = DIVISIONS.find((d) => d.id === activeItem.divisionId)!;

  function handlePrev() {
    setActiveIndex((prev) => getPrevIndex(prev, TESTIMONIALS.length));
  }

  function handleNext() {
    setActiveIndex((prev) => getNextIndex(prev, TESTIMONIALS.length));
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-b border-slate-800/80 bg-[#060913] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-cyan-400 sm:text-sm">Client Outcomes</p>
            <h2
              id="testimonials-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance] sm:text-4xl"
            >
              Verified results across every division.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Real outcomes from households, creators, and businesses served in Tuscaloosa, Holt,
              and nationwide.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              0{activeIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-[#0d1324] text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-[#0d1324] text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article
            aria-live="polite"
            data-testid="active-testimonial-card"
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0d1324] p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${activeDivision.indicatorDotClass}`}
                    aria-hidden="true"
                  />
                  <span className={`font-semibold ${activeDivision.textAccentClass}`}>
                    {activeDivision.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-200">{activeDivision.shortLabel}</span>
                </div>

                <div className="text-right">
                  <p className="font-mono text-xl font-bold tracking-tight text-slate-50 tabular-nums sm:text-2xl">
                    {activeItem.metric}
                  </p>
                  <p className="text-[11px] text-slate-400">{activeItem.metricLabel}</p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Quote
                  className={`mt-1 h-5 w-5 shrink-0 ${activeDivision.textAccentClass}`}
                  aria-hidden="true"
                />
                <blockquote className="text-base leading-relaxed text-slate-100 sm:text-lg">
                  &ldquo;{activeItem.quote}&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
              <div>
                <p className="text-sm font-bold text-slate-50">{activeItem.clientName}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {activeItem.clientRole} · {activeItem.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectDivision(activeItem.divisionId)}
                className={`inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${activeDivision.buttonAccentClass}`}
              >
                Start {activeDivision.shortLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          <div
            role="tablist"
            aria-label="Select division testimonial"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            {TESTIMONIALS.map((item, idx) => {
              const divMeta = DIVISIONS.find((d) => d.id === item.divisionId)!;
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors duration-150 ${
                    isSelected
                      ? 'border-slate-600 bg-[#0d1324]'
                      : `border-slate-800/90 bg-[#090f20]/70 hover:bg-[#0d1324] ${divMeta.borderHoverClass}`
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${divMeta.indicatorDotClass}`}
                        aria-hidden="true"
                      />
                      <span className={`font-semibold ${divMeta.textAccentClass}`}>
                        {divMeta.shortLabel}
                      </span>
                      <span className="text-slate-600" aria-hidden="true">
                        ·
                      </span>
                      <span className="truncate text-slate-400">{item.clientName}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-300">{item.clientRole}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-mono text-sm font-bold text-slate-100 tabular-nums">
                      {item.metric}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.metricLabel}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
