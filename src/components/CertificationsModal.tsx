import { useEffect, useState } from 'react';
import { Award, ExternalLink, FileText, ShieldCheck, X } from 'lucide-react';
import { AI_CERTIFICATIONS } from '../config/site';

interface CertificationsModalProps {
  open: boolean;
  initialCertId?: string;
  onClose: () => void;
}

export function CertificationsModal({
  open,
  initialCertId,
  onClose,
}: CertificationsModalProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialCertId ?? AI_CERTIFICATIONS[0].id,
  );

  useEffect(() => {
    if (initialCertId) {
      setSelectedId(initialCertId);
    }
  }, [initialCertId]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const activeCert =
    AI_CERTIFICATIONS.find((c) => c.id === selectedId) ?? AI_CERTIFICATIONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-certs-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1324] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Division 04 · Verified Credentials</span>
              <span className="text-slate-600" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-300">John Henry Williams</span>
            </div>
            <h2
              id="ai-certs-modal-title"
              className="mt-1 text-lg font-bold text-slate-50 sm:text-xl"
            >
              Google &amp; Coursera AI Certifications ({AI_CERTIFICATIONS.length} Verified)
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certifications dialog"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-[#060913] text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Verified AI Certifications"
            className="border-b border-slate-800 bg-[#090f20] p-4 lg:col-span-5 lg:overflow-y-auto lg:border-r lg:border-b-0"
          >
            <div className="space-y-2">
              {AI_CERTIFICATIONS.map((cert, index) => {
                const isSelected = cert.id === activeCert.id;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(cert.id)}
                    className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800/90 bg-[#0d1324] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                        0{index + 1} · {cert.completedDate}
                      </span>
                      <span className="font-mono text-slate-400 tabular-nums">
                        ID: {cert.verifyCode}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-100">{cert.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{cert.issuer}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            aria-label={activeCert.title}
            className="flex flex-col justify-between gap-4 p-5 sm:p-6 lg:col-span-7 lg:overflow-y-auto"
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <Award className="h-4 w-4" aria-hidden="true" />
                    <span className="font-semibold">{activeCert.issuer}</span>
                    <span className="text-slate-600" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-slate-300">Issued {activeCert.completedDate}</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-bold text-slate-50">{activeCert.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Awarded to <span className="font-semibold text-slate-200">{activeCert.recipient}</span> ·
                    Coursera Verification ID:{' '}
                    <span className="font-mono text-emerald-300">{activeCert.verifyCode}</span>
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeCert.focus}</p>

              <div className="mt-4 rounded-xl border border-slate-700/80 bg-[#060913] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <p className="font-mono text-[11px] font-semibold tracking-wide text-emerald-400">
                      OFFICIAL COURSE CERTIFICATE
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Authorized by Google · Offered through Coursera
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-slate-300 tabular-nums">
                      {activeCert.completedDate}
                    </p>
                    <p className="font-mono text-[11px] text-emerald-400 tabular-nums">
                      ID: {activeCert.verifyCode}
                    </p>
                  </div>
                </div>

                <div className="py-5">
                  <p className="text-xs text-slate-400">This certifies that</p>
                  <p className="mt-1 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
                    {activeCert.recipient}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">has successfully completed</p>
                  <p className="mt-1 text-base font-semibold text-emerald-300 sm:text-lg">
                    {activeCert.title}
                  </p>

                  {activeCert.isFlagship && (
                    <div className="mt-4 grid grid-cols-1 gap-1.5 border-t border-slate-800/80 pt-3 text-xs text-slate-300 sm:grid-cols-2">
                      <span>· AI Fundamentals</span>
                      <span>· AI for Brainstorming &amp; Planning</span>
                      <span>· AI for Research &amp; Insights</span>
                      <span>· AI for Writing &amp; Communicating</span>
                      <span>· AI for Content Creation</span>
                      <span>· AI for Data Analysis</span>
                      <span>· AI for App Building</span>
                      <span>· AI for App Deployment</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <div>
                    <p className="font-semibold text-slate-200">Amanda Brophy</p>
                    <p className="text-[11px]">Global Director of Google Career Certificates</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[11px] text-slate-400">Identity &amp; Participation Confirmed</p>
                    <p className="font-mono text-[11px] text-emerald-400">
                      {activeCert.verifyUrl.replace('https://', '')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <a
                href={activeCert.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-700 bg-[#060913] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
              >
                <FileText className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                Open Official Certificate PDF
              </a>

              <a
                href={activeCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                Verify Credential on Coursera
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
