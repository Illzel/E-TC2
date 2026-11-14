import type { DivisionId } from '../config/site';

export interface IntakeFormState {
  division: DivisionId;
  fullName: string;
  email: string;
  phone: string;
  // Remote Support fields
  remoteSystemType: string;
  remoteSessionPref: string;
  // Device Repair fields
  repairDeviceType: string;
  repairFulfillment: string;
  // Creator Shorts fields
  creatorFormat: string;
  creatorVolume: string;
  creatorFootageUrl: string;
  // AI & Enterprise fields
  aiFocus: string;
  aiCompanySize: string;
  aiWebsiteUrl: string;
  // Shared details
  projectDetails: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  creatorFootageUrl?: string;
  aiWebsiteUrl?: string;
  projectDetails?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export const REMOTE_SYSTEM_OPTIONS = [
  'Windows 10 / 11 PC or Laptop',
  'Apple Mac / MacBook (macOS)',
  'Email, Browser & Account Recovery',
  'Home / Office Wi-Fi, Printer & Smart Devices',
] as const;

export const REMOTE_SESSION_OPTIONS = [
  'Instant Live Room (Join Now)',
  'Scheduled 1-on-1 Session (Today / This Week)',
] as const;

export const REPAIR_DEVICE_OPTIONS = [
  'iPhone / Android Smartphone',
  'MacBook / Apple Laptop',
  'Windows Laptop / Gaming Notebook',
  'Desktop Workstation / Custom PC',
  'iPad / Tablet or Console',
] as const;

export const REPAIR_FULFILLMENT_OPTIONS = [
  'Local Drop-Off: Tuscaloosa / Holt, AL',
  'Nationwide Mail-In Repair (Tracked Shipping)',
] as const;

export const CREATOR_FORMAT_OPTIONS = [
  'Repurpose Existing Videos / Streams / Podcasts',
  'Original Short-Form Videos',
  'Multi-Platform Bundle (Shorts + Reels + TikTok)',
] as const;

export const CREATOR_VOLUME_OPTIONS = [
  '5 Clips (Starter Batch)',
  '10–15 Clips / Month',
  '30 Clips / Month (Daily Growth)',
] as const;

export const AI_FOCUS_OPTIONS = [
  'Full Corporate AI Workflow Integration',
  'AI Commercial & Video Ad Production',
  '24/7 AI Support & Lead Qualification Agent',
] as const;

export const AI_COMPANY_SIZE_OPTIONS = [
  '1–10 Employees (Local / Boutique)',
  '11–50 Employees (Growing SMB)',
  '51–250+ Employees (Mid-Market / Enterprise)',
] as const;

export function getDefaultFormState(division: DivisionId): IntakeFormState {
  return {
    division,
    fullName: '',
    email: '',
    phone: '',
    remoteSystemType: REMOTE_SYSTEM_OPTIONS[0],
    remoteSessionPref: REMOTE_SESSION_OPTIONS[0],
    repairDeviceType: REPAIR_DEVICE_OPTIONS[0],
    repairFulfillment: REPAIR_FULFILLMENT_OPTIONS[0],
    creatorFormat: CREATOR_FORMAT_OPTIONS[0],
    creatorVolume: CREATOR_VOLUME_OPTIONS[0],
    creatorFootageUrl: '',
    aiFocus: AI_FOCUS_OPTIONS[0],
    aiCompanySize: AI_COMPANY_SIZE_OPTIONS[1],
    aiWebsiteUrl: '',
    projectDetails: '',
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidOptionalUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    return Boolean(parsed.hostname && parsed.hostname.includes('.'));
  } catch {
    return false;
  }
}

export function validateIntakeForm(state: IntakeFormState): ValidationResult {
  const errors: ValidationErrors = {};

  if (state.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(state.email.trim())) {
    errors.email = 'Please enter a valid email address so we can reply.';
  }

  if (state.division === 'creator' && !isValidOptionalUrl(state.creatorFootageUrl)) {
    errors.creatorFootageUrl = 'Enter a valid channel or Google Drive URL (e.g. https://drive.google.com/...).';
  }

  if (state.division === 'ai' && !isValidOptionalUrl(state.aiWebsiteUrl)) {
    errors.aiWebsiteUrl = 'Enter a valid website URL (e.g. https://yourcompany.com).';
  }

  if (state.projectDetails.trim().length < 10) {
    errors.projectDetails = 'Please describe your issue, device, or project goal (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getDivisionDisplayName(division: DivisionId): string {
  switch (division) {
    case 'remote':
      return 'Remote Tech Support';
    case 'repair':
      return 'Device Hardware Repair';
    case 'creator':
      return 'Creator Shorts / Reels / TikTok';
    case 'ai':
      return 'AI Commercials & Corporate AI';
  }
}

export function buildTicketId(division: DivisionId, timestampMs: number = Date.now()): string {
  const prefixMap: Record<DivisionId, string> = {
    remote: 'REM',
    repair: 'REP',
    creator: 'CRT',
    ai: 'AIE',
  };
  const code = String(timestampMs).slice(-6);
  return `ETC2-${prefixMap[division]}-${code}`;
}

export function getTrackSpecificSummary(state: IntakeFormState): Array<{ label: string; value: string }> {
  switch (state.division) {
    case 'remote':
      return [
        { label: 'Device / System', value: state.remoteSystemType },
        { label: 'Session Preference', value: state.remoteSessionPref },
      ];
    case 'repair':
      return [
        { label: 'Hardware Type', value: state.repairDeviceType },
        { label: 'Fulfillment Track', value: state.repairFulfillment },
      ];
    case 'creator':
      return [
        { label: 'Content Format', value: state.creatorFormat },
        { label: 'Target Volume', value: state.creatorVolume },
        ...(state.creatorFootageUrl.trim()
          ? [{ label: 'Channel / Footage URL', value: state.creatorFootageUrl.trim() }]
          : []),
      ];
    case 'ai':
      return [
        { label: 'AI Implementation Focus', value: state.aiFocus },
        { label: 'Organization Size', value: state.aiCompanySize },
        ...(state.aiWebsiteUrl.trim()
          ? [{ label: 'Company Website', value: state.aiWebsiteUrl.trim() }]
          : []),
      ];
  }
}

export function buildMailtoHref(
  state: IntakeFormState,
  supportEmail: string,
  ticketId: string,
): string {
  const trackName = getDivisionDisplayName(state.division);
  const subject = `[${ticketId}] ${trackName} Request — ${state.fullName.trim()}`;

  const trackLines = getTrackSpecificSummary(state).map(
    (entry) => `${entry.label}: ${entry.value}`,
  );

  const bodyLines = [
    `Ticket ID: ${ticketId}`,
    `Division: ${trackName}`,
    `Client Name: ${state.fullName.trim()}`,
    `Client Email: ${state.email.trim()}`,
    ...(state.phone.trim() ? [`Phone: ${state.phone.trim()}`] : []),
    '',
    '--- Track Configuration ---',
    ...trackLines,
    '',
    '--- Project / Issue Details ---',
    state.projectDetails.trim(),
  ];

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });

  return `mailto:${supportEmail}?${params.toString()}`;
}

export function buildFormspreePayload(state: IntakeFormState, ticketId: string): Record<string, string> {
  const trackSummary = getTrackSpecificSummary(state);
  const payload: Record<string, string> = {
    ticketId,
    division: getDivisionDisplayName(state.division),
    fullName: state.fullName.trim(),
    email: state.email.trim(),
    phone: state.phone.trim() || 'Not provided',
    projectDetails: state.projectDetails.trim(),
  };

  for (const item of trackSummary) {
    payload[item.label] = item.value;
  }

  return payload;
}
