import { useEffect } from 'react';
import { ArrowRight, ExternalLink, MonitorCheck, X } from 'lucide-react';
import { DIVISIONS, type DivisionId, SITE_CONFIG } from '../config/site';

interface RapidDispatchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectDivision: (division: DivisionId) => void;
}

export function RapidDispatchModal({
  open,
  onClose,
  onSelectDivision,
}: RapidDispatchModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rapid-dispatch-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0d1324] p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-xs font-semibold text-cyan-400">
              {SITE_CONFIG.shortBrand} Rapid Dispatch
            </p>
            <h2 id="rapid-dispatch-title" className="mt-1 text-xl font-bold text-slate-50">
              Choose how you want to connect right now.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dispatch modal"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-[#060913] text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <MonitorCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  Instant Live Browser Screen-Share Room
                </p>
                <p className="mt-0.5 text-xs text-slate-300">
                  Best for urgent PC/Mac troubleshooting—opens in your browser with zero downloads.
                </p>
              </div>
            </div>
            <a
              href={SITE_CONFIG.instantSupportRoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Join Live Room
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium text-slate-400">
            Or route directly into a specific intake track:
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {DIVISIONS.map((division) => (
              <button
                key={division.id}
                type="button"
                onClick={() => {
                  onClose();
                  onSelectDivision(division.id);
                }}
                className={`group flex min-h-[52px] cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-[#060913] px-4 py-3 text-left transition-colors ${division.borderHoverClass}`}
              >
                <div>
                  <p className={`text-[11px] font-semibold ${division.textAccentClass}`}>
                    {division.number}
                  </p>
                  <p className="text-sm font-semibold text-slate-100">{division.shortLabel}</p>
                </div>
                <ArrowRight
                  className={`h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 ${division.textAccentClass}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
