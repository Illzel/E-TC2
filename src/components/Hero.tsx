import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Wrench } from 'lucide-react';
import heroLabImg from '../assets/images/hero_tech_lab_1794615460552.jpg';
import { DIVISIONS, type DivisionId, SITE_CONFIG } from '../config/site';
import { MediaFrame } from './MediaFrame';

interface HeroProps {
  onSelectDivision: (division: DivisionId) => void;
}

const TRUST_SIGNALS = [
  {
    icon: CheckCircle2,
    title: 'Real Human Step-by-Step Support',
    detail: 'Patient live walkthroughs in plain English—never scripted chatbots.',
  },
  {
    icon: Globe2,
    title: 'Tuscaloosa Local & Nationwide Service',
    detail: 'Drop-off bench in Tuscaloosa / Holt, AL plus nationwide remote & mail-in.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to Save Time, Cut Costs & Scale',
    detail: 'Flat-rate fixes for households and measurable ROI systems for teams.',
  },
] as const;

export function Hero({ onSelectDivision }: HeroProps) {
  return (
    <section id="top" className="border-b border-slate-800/80 bg-[#060913] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-wide text-cyan-400 sm:text-sm">
                {SITE_CONFIG.serviceAreas}
              </p>
              <h1
                className="mt-4 max-w-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)', lineHeight: 1.08 }}
              >
                Precision Tech Repair, Live Human Support, Creator Media &amp; Enterprise AI.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Whether you need a patient specialist to fix a slow laptop over screen-share today
                or an engineering partner to ship retention-focused Shorts and corporate AI
                workflows, {SITE_CONFIG.shortBrand} delivers direct execution without agency bloat.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium text-slate-400">
                Choose a division to pre-load your request:
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {DIVISIONS.map((division) => (
                  <button
                    key={division.id}
                    type="button"
                    onClick={() => onSelectDivision(division.id)}
                    className={`group flex min-h-[46px] cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-[#0d1324] px-4 py-3 text-left transition-colors duration-150 ${division.borderHoverClass}`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${division.indicatorDotClass}`}
                        aria-hidden="true"
                      />
                      <span className="truncate text-sm font-semibold text-slate-100">
                        {division.shortLabel}
                      </span>
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 ${division.textAccentClass}`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1324]">
              <MediaFrame
                src={heroLabImg}
                alt="Einsteinium Technical Configuration engineering operations studio"
                aspectClass="aspect-video lg:aspect-auto lg:h-full"
                fallbackLabel="E=TC² Engineering & Diagnostics Studio"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060913]/95 via-[#060913]/35 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Wrench className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                  <span>Tuscaloosa / Holt Bench</span>
                  <span aria-hidden="true">·</span>
                  <span>Nationwide Remote Desk</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-50 sm:text-base">
                  Direct browser screen-share, component-level repair, and AI workflow deployment.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE_CONFIG.instantSupportRoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                  >
                    Join Live Support Room
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center rounded-lg border border-slate-700 bg-[#060913]/80 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                  >
                    Explore 4 Divisions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-8 md:grid-cols-3 lg:gap-6">
          {TRUST_SIGNALS.map((signal) => {
            const Icon = signal.icon;
            return (
              <div key={signal.title} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">{signal.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{signal.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
