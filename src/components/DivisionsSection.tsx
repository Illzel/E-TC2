import { useState } from 'react';
import {
  ArrowRight,
  Award,
  Bot,
  Cpu,
  ExternalLink,
  Film,
  Headphones,
  MonitorCheck,
  Play,
  ShieldCheck,
} from 'lucide-react';
import hardwareBenchImg from '../assets/images/division_hardware_bench_1794615460597.jpg';
import enterpriseAiImg from '../assets/images/division_enterprise_ai_1794615461783.jpg';
import {
  AI_CERTIFICATIONS,
  CREATOR_VIDEO_SAMPLES,
  DIVISIONS,
  type DivisionId,
  SITE_CONFIG,
} from '../config/site';
import { MediaFrame } from './MediaFrame';

interface DivisionsSectionProps {
  onSelectDivision: (division: DivisionId) => void;
  onOpenCertifications: (certId?: string) => void;
}

const DIVISION_MEDIA: Partial<Record<DivisionId, { src: string; alt: string }>> = {
  repair: {
    src: hardwareBenchImg,
    alt: 'Precision laptop and smartphone hardware repair workbench',
  },
  ai: {
    src: enterpriseAiImg,
    alt: 'Corporate AI engineering and workflow automation studio',
  },
};

function DivisionIcon({ id, className }: { id: DivisionId; className: string }) {
  switch (id) {
    case 'remote':
      return <Headphones className={className} aria-hidden="true" />;
    case 'repair':
      return <Cpu className={className} aria-hidden="true" />;
    case 'creator':
      return <Film className={className} aria-hidden="true" />;
    case 'ai':
      return <Bot className={className} aria-hidden="true" />;
  }
}

export function DivisionsSection({
  onSelectDivision,
  onOpenCertifications,
}: DivisionsSectionProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(CREATOR_VIDEO_SAMPLES[0].id);

  const activeVideo =
    CREATOR_VIDEO_SAMPLES.find((sample) => sample.id === selectedVideoId) ??
    CREATOR_VIDEO_SAMPLES[0];

  return (
    <section id="services" className="border-b border-slate-800/80 bg-[#060913] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-cyan-400 sm:text-sm">Core Capabilities</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance] sm:text-4xl">
            Four specialized engineering &amp; media divisions under one roof.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Select the track that matches your immediate bottleneck—consumer troubleshooting,
            physical hardware repair, vertical creator output, or corporate AI deployment.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {DIVISIONS.map((division) => {
            const media = DIVISION_MEDIA[division.id];

            return (
              <article
                key={division.id}
                className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1324] transition-colors duration-150 ${division.borderHoverClass}`}
              >
                <div>
                  {division.id === 'creator' ? (
                    <div className="border-b border-slate-800/80 bg-[#060913]">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                        <video
                          key={activeVideo.src}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={activeVideo.title}
                          className="h-full w-full object-contain"
                        >
                          <source src={activeVideo.src} type="video/mp4" />
                        </video>
                      </div>

                      <div className="border-t border-slate-800/80 bg-[#090f20] px-4 py-3 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-100">
                              {activeVideo.title}
                            </p>
                            <p className="truncate text-[11px] text-slate-400">
                              {activeVideo.description}
                            </p>
                          </div>
                          <span className="shrink-0 font-mono text-[11px] text-fuchsia-300">
                            {activeVideo.category}
                          </span>
                        </div>

                        <div
                          role="tablist"
                          aria-label="Division 03 recent video and commercial previews"
                          className="mt-3 grid grid-cols-3 gap-2"
                        >
                          {CREATOR_VIDEO_SAMPLES.map((sample) => {
                            const isSelected = sample.id === activeVideo.id;
                            return (
                              <button
                                key={sample.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => setSelectedVideoId(sample.id)}
                                className={`inline-flex min-h-[36px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                                  isSelected
                                    ? 'border-fuchsia-500 bg-fuchsia-500/15 text-fuchsia-200'
                                    : 'border-slate-800 bg-[#0d1324] text-slate-300 hover:border-slate-700 hover:text-white'
                                }`}
                              >
                                <Play className="h-3 w-3 shrink-0" aria-hidden="true" />
                                <span className="truncate">{sample.tabLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : media ? (
                    <div className="relative">
                      <MediaFrame
                        src={media.src}
                        alt={media.alt}
                        aspectClass="aspect-[16/9]"
                        fallbackLabel={division.title}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1324] via-transparent to-transparent"
                      />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-slate-800/80 bg-gradient-to-br from-[#091226] via-[#0a1020] to-[#060913] p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <MonitorCheck className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                          <span className="text-sm font-semibold text-slate-100">
                            Instant Browser Screen-Share Desk
                          </span>
                        </div>
                        <span className="font-mono text-xs text-cyan-300">Zero Install</span>
                      </div>

                      <div className="my-auto grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-800 bg-[#060913]/85 p-3">
                          <p className="font-mono text-[11px] font-semibold text-cyan-400 tabular-nums">
                            01
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-100">
                            Open Live Link
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
                            Launch directly in Chrome, Edge, or Safari.
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-[#060913]/85 p-3">
                          <p className="font-mono text-[11px] font-semibold text-cyan-400 tabular-nums">
                            02
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-100">
                            Share Screen
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
                            You stay in control while we guide every click.
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-[#060913]/85 p-3">
                          <p className="font-mono text-[11px] font-semibold text-cyan-400 tabular-nums">
                            03
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-100">
                            Verified Fix
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
                            PC, Mac, Wi-Fi, email &amp; printers resolved live.
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400">
                        Windows · macOS · iOS / Android Guidance · Encrypted Jitsi Room
                      </p>
                    </div>
                  )}

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <DivisionIcon
                        id={division.id}
                        className={`h-4 w-4 ${division.textAccentClass}`}
                      />
                      <span className={`font-semibold ${division.textAccentClass}`}>
                        {division.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{division.scopeTag}</span>
                    </div>

                    <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-50">
                      {division.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-200">{division.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {division.summary}
                    </p>

                    <ul className="mt-5 grid grid-cols-1 gap-2 border-t border-slate-800/80 pt-4 sm:grid-cols-2">
                      {division.capabilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${division.indicatorDotClass}`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {division.id === 'ai' && (
                      <div className="mt-5 border-t border-slate-800/80 pt-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>
                              Google &amp; Coursera Verified Credentials ({AI_CERTIFICATIONS.length})
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            John Henry Williams · Oct 2026
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {AI_CERTIFICATIONS.map((cert) => (
                            <button
                              key={cert.id}
                              type="button"
                              onClick={() => onOpenCertifications(cert.id)}
                              className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-800/90 bg-[#090f20] px-3 py-2 text-left text-xs transition-colors hover:border-emerald-500/50 hover:text-white"
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <Award
                                  className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                                  aria-hidden="true"
                                />
                                <span className="truncate font-medium text-slate-200 group-hover:text-white">
                                  {cert.title.replace(' (8-Course Program)', '')}
                                </span>
                              </span>
                              <span className="shrink-0 font-mono text-[10px] text-slate-400 tabular-nums group-hover:text-emerald-300">
                                Verify
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-slate-800/80 bg-[#090f20]/70 px-6 py-4 sm:px-7">
                  {division.id === 'remote' && (
                    <a
                      href={SITE_CONFIG.instantSupportRoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                    >
                      Join Live Room
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}

                  {division.id === 'ai' && (
                    <button
                      type="button"
                      onClick={() => onOpenCertifications(AI_CERTIFICATIONS[0].id)}
                      className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Verify AI Certifications ({AI_CERTIFICATIONS.length})
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectDivision(division.id)}
                    className={
                      division.id === 'remote'
                        ? 'inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-[#0d1324] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-cyan-500/60 hover:text-white'
                        : `inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${division.buttonAccentClass}`
                    }
                  >
                    {division.id === 'remote' ? 'Book Session' : `Start ${division.shortLabel}`}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
