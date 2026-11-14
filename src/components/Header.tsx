import { useState } from 'react';
import { Menu, Radio, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface HeaderProps {
  onOpenConnectModal: () => void;
}

const NAV_LINKS = [
  { href: '#services', label: 'Divisions' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Rates' },
  { href: '#intake', label: 'Start Request' },
] as const;

export function Header({ onOpenConnectModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="border-b border-slate-800/90 bg-[#0a1020] px-4 py-2 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium text-slate-100">
              <Radio className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
              Support Desk Live
            </span>
            <span className="hidden text-slate-600 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-slate-400">{SITE_CONFIG.serviceAreas}</span>
          </div>
          <span className="hidden font-mono text-[11px] text-slate-400 tabular-nums lg:inline">
            {SITE_CONFIG.operationalHours}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-3 whitespace-nowrap text-slate-50 focus-visible:outline-cyan-400"
          >
            <span className="inline-flex h-9 items-center justify-center rounded-md border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 px-2.5 font-mono text-sm font-semibold tracking-tight text-slate-50">
              {SITE_CONFIG.shortBrand}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-100 sm:inline">
              {SITE_CONFIG.businessName}
            </span>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-300 underline-offset-8 transition-colors duration-150 hover:text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {SITE_CONFIG.bookingUrl ? (
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 whitespace-nowrap rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors duration-150 hover:bg-cyan-300 sm:text-sm"
              >
                Connect Now
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenConnectModal}
                className="shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors duration-150 hover:bg-cyan-300 sm:text-sm"
              >
                Connect Now
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#0d1324] text-slate-200 transition-colors hover:border-slate-700 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            className="border-t border-slate-800 bg-[#060913] px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-[#0d1324] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
