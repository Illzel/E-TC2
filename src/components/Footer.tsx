import { Mail, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function Footer() {
  return (
    <footer className="bg-[#060913] py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-slate-800/80 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 items-center justify-center rounded-md border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 px-2.5 font-mono text-sm font-semibold tracking-tight text-slate-50">
                {SITE_CONFIG.shortBrand}
              </span>
              <span className="text-base font-bold tracking-tight text-slate-50">
                {SITE_CONFIG.businessName}
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Multi-division technical engineering, hardware repair, creator short-form production,
              and corporate AI implementation serving Tuscaloosa &amp; Holt, Alabama and clients
              nationwide.
            </p>
          </div>

          <div className="space-y-3 md:col-span-4">
            <h2 className="text-xs font-semibold tracking-wide text-slate-200">
              Service Areas &amp; Hours
            </h2>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
              <span>{SITE_CONFIG.serviceAreas}</span>
            </p>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <span>{SITE_CONFIG.operationalHours}</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="underline-offset-4 hover:text-white hover:underline"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            </p>
          </div>

          <div className="space-y-2 md:col-span-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-200">Quick Links</h2>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white">
                  Service Divisions
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  Execution Process
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Rates &amp; Packages
                </a>
              </li>
              <li>
                <a href="#intake" className="hover:text-white">
                  Start Request
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instantSupportRoomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Live Browser Support Room
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.businessName} ({SITE_CONFIG.shortBrand}). All
            rights reserved.
          </p>
          <p>Tuscaloosa · Holt, Alabama · United States</p>
        </div>
      </div>
    </footer>
  );
}
