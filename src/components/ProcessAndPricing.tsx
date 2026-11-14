import { ArrowRight, Check } from 'lucide-react';
import {
  DIVISIONS,
  type DivisionId,
  PRICING_TIERS,
  PROCESS_STEPS,
} from '../config/site';

interface ProcessAndPricingProps {
  onSelectDivision: (division: DivisionId) => void;
}

export function ProcessAndPricing({ onSelectDivision }: ProcessAndPricingProps) {
  return (
    <>
      <section
        id="how-it-works"
        className="border-b border-slate-800/80 bg-[#080d1b] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-cyan-400 sm:text-sm">Execution Model</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance] sm:text-4xl">
              Three steps from technical bottleneck to verified delivery.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-800 bg-[#0d1324] p-6 sm:p-7"
              >
                <p className="font-mono text-xs font-semibold text-cyan-400 tabular-nums">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-b border-slate-800/80 bg-[#060913] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-cyan-400 sm:text-sm">
              Transparent Rates &amp; Packages
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance] sm:text-4xl">
              Upfront pricing built for individuals, creators &amp; businesses.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              No hidden diagnostics traps or agency retainers for simple fixes. Confirm exact
              rates before any bench work or production begins.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {PRICING_TIERS.map((tier) => {
              const division = DIVISIONS.find((d) => d.id === tier.divisionId)!;

              return (
                <div
                  key={tier.divisionId}
                  className={`flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0d1324] p-6 transition-colors duration-150 ${division.borderHoverClass}`}
                >
                  <div>
                    <p className={`text-xs font-semibold ${division.textAccentClass}`}>
                      {division.number} · {division.shortLabel}
                    </p>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-50">
                      {tier.title}
                    </h3>

                    <div className="mt-4 border-b border-slate-800/80 pb-4">
                      <p className="font-mono text-3xl font-bold tracking-tight text-slate-50 tabular-nums">
                        {tier.price}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{tier.unit}</p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {tier.description}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {tier.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                        >
                          <Check
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${division.textAccentClass}`}
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDivision(tier.divisionId)}
                    className={`mt-6 inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${division.buttonAccentClass}`}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
