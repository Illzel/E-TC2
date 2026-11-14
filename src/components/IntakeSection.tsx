import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  RotateCcw,
} from 'lucide-react';
import { DIVISIONS, type DivisionId, SITE_CONFIG } from '../config/site';
import {
  AI_COMPANY_SIZE_OPTIONS,
  AI_FOCUS_OPTIONS,
  CREATOR_FORMAT_OPTIONS,
  CREATOR_VOLUME_OPTIONS,
  REMOTE_SESSION_OPTIONS,
  REMOTE_SYSTEM_OPTIONS,
  REPAIR_DEVICE_OPTIONS,
  REPAIR_FULFILLMENT_OPTIONS,
  type IntakeFormState,
  type ValidationErrors,
  buildFormspreePayload,
  buildMailtoHref,
  buildTicketId,
  getDefaultFormState,
  getDivisionDisplayName,
  getTrackSpecificSummary,
  validateIntakeForm,
} from '../utils/dispatch';

interface IntakeSectionProps {
  activeTab: DivisionId;
  onTabChange: (division: DivisionId) => void;
  submitted: boolean;
  onSubmittedChange: (submitted: boolean) => void;
  resetSignal: number;
}

interface SubmissionReceipt {
  ticketId: string;
  mailtoHref: string;
  channel: 'formspree' | 'mailto';
  snapshot: IntakeFormState;
}

const PLACEHOLDER_MAP: Record<DivisionId, string> = {
  remote:
    'Describe what is happening (e.g., slow Windows startup, printer offline, locked out of email, pop-ups)...',
  repair:
    'Share device model, symptoms, or damage (e.g., iPhone 15 Pro cracked OLED, MacBook battery draining fast)...',
  creator:
    'Describe your channel style, pacing references, caption preferences, or podcast/stream episode length...',
  ai:
    'Outline your business goals (e.g., 30-sec AI commercial for local HVAC, or 24/7 AI lead intake & SOP agent)...',
};

export function IntakeSection({
  activeTab,
  onTabChange,
  submitted,
  onSubmittedChange,
  resetSignal,
}: IntakeSectionProps) {
  const [form, setForm] = useState<IntakeFormState>(() => getDefaultFormState(activeTab));
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      division: activeTab,
    }));
    setErrors({});
    setSubmitError('');
  }, [activeTab]);

  useEffect(() => {
    if (resetSignal === 0) return;
    setForm(getDefaultFormState(activeTab));
    setErrors({});
    setSubmitError('');
    setReceipt(null);
  }, [resetSignal, activeTab]);

  const activeDivision = DIVISIONS.find((d) => d.id === activeTab)!;

  function updateField<K extends keyof IntakeFormState>(key: K, value: IntakeFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (submitError) setSubmitError('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validateIntakeForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const ticketId = buildTicketId(form.division);
    const mailtoHref = buildMailtoHref(form, SITE_CONFIG.supportEmail, ticketId);

    if (SITE_CONFIG.formspreeEndpoint) {
      setSubmitting(true);
      setSubmitError('');
      try {
        const response = await fetch(SITE_CONFIG.formspreeEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buildFormspreePayload(form, ticketId)),
        });

        if (!response.ok) {
          throw new Error('Submission service returned an error.');
        }

        setReceipt({
          ticketId,
          mailtoHref,
          channel: 'formspree',
          snapshot: { ...form },
        });
        onSubmittedChange(true);
      } catch {
        setSubmitError(
          'Unable to reach the intake endpoint right now. Use the direct email ticket button below or try again.',
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Zero-cost mailto dispatch + immediate confirmation state
    const link = document.createElement('a');
    link.href = mailtoHref;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setReceipt({
      ticketId,
      mailtoHref,
      channel: 'mailto',
      snapshot: { ...form },
    });
    onSubmittedChange(true);
  }

  function handleReset() {
    setForm(getDefaultFormState(activeTab));
    setErrors({});
    setSubmitError('');
    setReceipt(null);
    onSubmittedChange(false);
  }

  return (
    <section id="intake" className="border-b border-slate-800/80 bg-[#080d1b] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className={`text-xs font-medium sm:text-sm ${activeDivision.textAccentClass}`}>
            Adaptive Multi-Track Dispatch
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 [text-wrap:balance] sm:text-4xl">
            Start your support, repair, creator, or AI request.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Select a division track below. The form configures itself to collect the exact
            specifications needed for a fast quote or immediate live room session.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Service Division Intake Tracks"
          className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DIVISIONS.map((division) => {
            const isSelected = activeTab === division.id;
            return (
              <button
                key={division.id}
                type="button"
                role="tab"
                id={`tab-${division.id}`}
                aria-selected={isSelected}
                aria-controls="intake-panel"
                onClick={() => onTabChange(division.id)}
                className={`flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors duration-150 sm:text-sm ${
                  isSelected
                    ? division.activeTabClass
                    : 'border-slate-800 bg-[#0d1324] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${division.indicatorDotClass}`}
                  aria-hidden="true"
                />
                <span>{division.tabLabel}</span>
              </button>
            );
          })}
        </div>

        <div
          id="intake-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="mt-6 rounded-2xl border border-slate-800 bg-[#0d1324] p-6 sm:p-8"
        >
          {submitted && receipt ? (
            <div data-testid="intake-confirmation" className="space-y-6">
              <div className="flex items-start gap-4 border-b border-slate-800 pb-6">
                <CheckCircle2
                  className="mt-0.5 h-7 w-7 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-xs font-semibold text-emerald-400 tabular-nums">
                    Ticket Prepared · {receipt.ticketId}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-50">
                    Your {getDivisionDisplayName(receipt.snapshot.division)} request is ready.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {receipt.channel === 'formspree'
                      ? 'Your submission has been dispatched to the Einsteinium Technical Configuration desk.'
                      : `Your email ticket draft to ${SITE_CONFIG.supportEmail} has been prepared. If your mail client did not open automatically, click "Open Email Draft" below or join the live browser room directly.`}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-[#060913] p-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-400">Client Name</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-100">
                    {receipt.snapshot.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Reply Email</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-100">
                    {receipt.snapshot.email}
                  </dd>
                </div>
                {getTrackSpecificSummary(receipt.snapshot).map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs text-slate-400">{item.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-slate-200">{item.value}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-400">Scope Notes</dt>
                  <dd className="mt-0.5 text-sm text-slate-300">
                    {receipt.snapshot.projectDetails}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.instantSupportRoomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                >
                  Enter Live Support Room Now
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={receipt.mailtoHref}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 bg-[#060913] px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-500 hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Open Email Draft
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <p className={`text-xs font-semibold ${activeDivision.textAccentClass}`}>
                    {activeDivision.number} · {activeDivision.scopeTag}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-50">
                    {activeDivision.title}
                  </h3>
                </div>
                {activeTab === 'remote' && (
                  <a
                    href={SITE_CONFIG.instantSupportRoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 underline-offset-4 hover:underline"
                  >
                    Need instant screen-share? Join Jitsi Room
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="intake-full-name"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="intake-full-name"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jordan Vance"
                    aria-invalid={Boolean(errors.fullName)}
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.fullName && (
                    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="intake-email"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="intake-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@domain.com"
                    aria-invalid={Boolean(errors.email)}
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="intake-phone"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    id="intake-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(205) 555-0199"
                    className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {activeTab === 'remote' && (
                  <>
                    <div>
                      <label
                        htmlFor="remote-system"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Device / System Type
                      </label>
                      <select
                        id="remote-system"
                        value={form.remoteSystemType}
                        onChange={(e) => updateField('remoteSystemType', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
                      >
                        {REMOTE_SYSTEM_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="remote-session"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Session Preference
                      </label>
                      <select
                        id="remote-session"
                        value={form.remoteSessionPref}
                        onChange={(e) => updateField('remoteSessionPref', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
                      >
                        {REMOTE_SESSION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'repair' && (
                  <>
                    <div>
                      <label
                        htmlFor="repair-device"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Device Type
                      </label>
                      <select
                        id="repair-device"
                        value={form.repairDeviceType}
                        onChange={(e) => updateField('repairDeviceType', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                      >
                        {REPAIR_DEVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="repair-fulfillment"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Fulfillment Method
                      </label>
                      <select
                        id="repair-fulfillment"
                        value={form.repairFulfillment}
                        onChange={(e) => updateField('repairFulfillment', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                      >
                        {REPAIR_FULFILLMENT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'creator' && (
                  <>
                    <div>
                      <label
                        htmlFor="creator-format"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Content Format
                      </label>
                      <select
                        id="creator-format"
                        value={form.creatorFormat}
                        onChange={(e) => updateField('creatorFormat', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-fuchsia-400 focus:outline-none"
                      >
                        {CREATOR_FORMAT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="creator-volume"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Target Volume
                      </label>
                      <select
                        id="creator-volume"
                        value={form.creatorVolume}
                        onChange={(e) => updateField('creatorVolume', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-fuchsia-400 focus:outline-none"
                      >
                        {CREATOR_VOLUME_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="creator-footage-url"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Channel / Google Drive Raw Footage URL (Optional)
                      </label>
                      <input
                        id="creator-footage-url"
                        name="creatorFootageUrl"
                        type="url"
                        value={form.creatorFootageUrl}
                        onChange={(e) => updateField('creatorFootageUrl', e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        aria-invalid={Boolean(errors.creatorFootageUrl)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-fuchsia-400 focus:outline-none"
                      />
                      {errors.creatorFootageUrl && (
                        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.creatorFootageUrl}</span>
                        </p>
                      )}
                    </div>
                  </>
                )}

                {activeTab === 'ai' && (
                  <>
                    <div>
                      <label
                        htmlFor="ai-focus"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        AI Implementation Focus
                      </label>
                      <select
                        id="ai-focus"
                        value={form.aiFocus}
                        onChange={(e) => updateField('aiFocus', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                      >
                        {AI_FOCUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="ai-company-size"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Company Size
                      </label>
                      <select
                        id="ai-company-size"
                        value={form.aiCompanySize}
                        onChange={(e) => updateField('aiCompanySize', e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                      >
                        {AI_COMPANY_SIZE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="ai-website-url"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Company Website URL (Optional)
                      </label>
                      <input
                        id="ai-website-url"
                        name="aiWebsiteUrl"
                        type="url"
                        value={form.aiWebsiteUrl}
                        onChange={(e) => updateField('aiWebsiteUrl', e.target.value)}
                        placeholder="https://yourcompany.com"
                        aria-invalid={Boolean(errors.aiWebsiteUrl)}
                        className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-400 focus:outline-none"
                      />
                      {errors.aiWebsiteUrl && (
                        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.aiWebsiteUrl}</span>
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div>
                <label
                  htmlFor="intake-details"
                  className="block text-xs font-semibold text-slate-200"
                >
                  Issue, Hardware, or Project Scope <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="intake-details"
                  name="projectDetails"
                  required
                  rows={4}
                  value={form.projectDetails}
                  onChange={(e) => updateField('projectDetails', e.target.value)}
                  placeholder={PLACEHOLDER_MAP[activeTab]}
                  aria-invalid={Boolean(errors.projectDetails)}
                  className="mt-2 block w-full rounded-lg border border-slate-700 bg-[#060913] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none"
                />
                {errors.projectDetails && (
                  <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.projectDetails}</span>
                  </p>
                )}
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{submitError}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-5">
                <p className="text-xs text-slate-400">
                  Direct dispatch to <span className="text-slate-200">{SITE_CONFIG.supportEmail}</span>
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${activeDivision.buttonAccentClass}`}
                >
                  {submitting ? 'Submitting Request...' : `Submit ${activeDivision.shortLabel} Request`}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
