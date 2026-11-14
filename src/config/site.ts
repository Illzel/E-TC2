export type DivisionId = 'remote' | 'repair' | 'creator' | 'ai';

export interface SiteConfig {
  readonly businessName: string;
  readonly shortBrand: string;
  readonly serviceAreas: string;
  readonly supportEmail: string;
  readonly instantSupportRoomUrl: string;
  readonly bookingUrl: string;
  readonly formspreeEndpoint: string;
  readonly operationalHours: string;
}

export const SITE_CONFIG: SiteConfig = {
  businessName: 'Einsteinium Technical Configuration',
  shortBrand: 'E=TC²',
  serviceAreas: 'Tuscaloosa & Holt, Alabama • Nationwide Remote & Mail-In',
  supportEmail: 'john203995@gmail.com',
  instantSupportRoomUrl: 'https://meet.jit.si/ETC2-Live-Support-Desk',
  bookingUrl: '',
  formspreeEndpoint: '',
  operationalHours: 'Mon–Sat · 8:00 AM – 8:00 PM CT · Emergency Dispatch Available',
};

export interface DivisionMeta {
  readonly id: DivisionId;
  readonly number: string;
  readonly shortLabel: string;
  readonly tabLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly scopeTag: string;
  readonly summary: string;
  readonly capabilities: readonly string[];
  readonly accentHex: string;
  readonly borderHoverClass: string;
  readonly textAccentClass: string;
  readonly activeTabClass: string;
  readonly buttonAccentClass: string;
  readonly indicatorDotClass: string;
}

export const DIVISIONS: readonly DivisionMeta[] = [
  {
    id: 'remote',
    number: 'Division 01',
    shortLabel: 'Remote Support',
    tabLabel: 'Remote Support',
    title: 'Live Step-by-Step Remote Troubleshooting',
    subtitle: 'Real human technicians guiding you click-by-click in plain English.',
    scopeTag: 'Nationwide Remote Desk',
    summary:
      'Zero-install browser screen-sharing built for everyday users and busy offices. We walk with you live through slow Windows/Mac tune-ups, malware cleanup, account recovery, Wi-Fi and printer headaches, and 1-on-1 training.',
    capabilities: [
      'Slow PC & Mac performance tune-ups',
      'Malware, adware & browser hijack removal',
      'Email, Microsoft 365 & account recovery',
      'Home/office Wi-Fi, printer & 1-on-1 guidance',
    ],
    accentHex: '#06b6d4',
    borderHoverClass: 'hover:border-cyan-500/60',
    textAccentClass: 'text-cyan-400',
    activeTabClass: 'border-cyan-500 bg-cyan-500/15 text-cyan-200',
    buttonAccentClass: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
    indicatorDotClass: 'bg-cyan-400',
  },
  {
    id: 'repair',
    number: 'Division 02',
    shortLabel: 'Device Repair',
    tabLabel: 'Device Repair',
    title: 'Phone & Laptop Hardware Repair',
    subtitle: 'Component-level restoration with transparent part pricing.',
    scopeTag: 'Tuscaloosa / Holt Local & Mail-In',
    summary:
      'Precision repair for smartphones, MacBooks, Windows laptops, and workstations. Drop off locally in Tuscaloosa & Holt, Alabama, or ship via tracked nationwide mail-in turnaround.',
    capabilities: [
      'OLED / LCD screen & digitizer replacements',
      'Battery swaps & USB-C / Lightning port micro-repair',
      'Thermal paste / liquid metal repasting & fan service',
      'NVMe SSD, RAM upgrades & liquid damage triage',
    ],
    accentHex: '#6366f1',
    borderHoverClass: 'hover:border-indigo-500/60',
    textAccentClass: 'text-indigo-400',
    activeTabClass: 'border-indigo-500 bg-indigo-500/15 text-indigo-200',
    buttonAccentClass: 'bg-indigo-500 text-white hover:bg-indigo-400',
    indicatorDotClass: 'bg-indigo-400',
  },
  {
    id: 'creator',
    number: 'Division 03',
    shortLabel: 'Creator Shorts',
    tabLabel: 'Creator Shorts/Reels',
    title: 'YouTube Shorts, Reels & TikTok Production',
    subtitle: 'Turn raw footage or long-form streams into retention-engineered clips.',
    scopeTag: 'Creator Media Studio',
    summary:
      'Built for creators, podcasters, and brands who need consistent vertical growth without editing bottlenecks. We produce original short-form videos or slice your long-form streams and podcasts with kinetic captions and sound design.',
    capabilities: [
      'Long-form video, stream & podcast repurposing',
      'Original scripted vertical video production',
      'Kinetic captions, hook pacing & B-roll cutting',
      'Custom sound design & multi-platform mastering',
    ],
    accentHex: '#d946ef',
    borderHoverClass: 'hover:border-fuchsia-500/60',
    textAccentClass: 'text-fuchsia-400',
    activeTabClass: 'border-fuchsia-500 bg-fuchsia-500/15 text-fuchsia-200',
    buttonAccentClass: 'bg-fuchsia-500 text-white hover:bg-fuchsia-400',
    indicatorDotClass: 'bg-fuchsia-400',
  },
  {
    id: 'ai',
    number: 'Division 04',
    shortLabel: 'AI & Enterprise',
    tabLabel: 'AI Ads & Enterprise',
    title: 'AI Commercials & Corporate AI Implementation',
    subtitle: 'High-converting AI video ads and automated workflows that cut overhead.',
    scopeTag: 'Commercial & B2B Systems',
    summary:
      'Deploy commercial-grade AI video ads alongside practical internal automation: 24/7 lead qualification agents, customer support routing, and SOP knowledge workflows engineered for measurable operational ROI.',
    capabilities: [
      'Broadcast-grade AI video commercials & ad creatives',
      '24/7 AI lead capture & customer support agents',
      'Internal SOP automation & CRM pipeline routing',
      'Executive team onboarding & governance guardrails',
    ],
    accentHex: '#10b981',
    borderHoverClass: 'hover:border-emerald-500/60',
    textAccentClass: 'text-emerald-400',
    activeTabClass: 'border-emerald-500 bg-emerald-500/15 text-emerald-200',
    buttonAccentClass: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
    indicatorDotClass: 'bg-emerald-400',
  },
];

export interface PricingTier {
  readonly divisionId: DivisionId;
  readonly title: string;
  readonly price: string;
  readonly unit: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly ctaLabel: string;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    divisionId: 'remote',
    title: 'Remote Quick-Fix / Tune-Up',
    price: '$39–$69',
    unit: 'Flat rate per session',
    description: 'Live 1-on-1 remote diagnostic and fix with zero travel or drop-off delay.',
    highlights: [
      'Up to 60 minutes live screen-share',
      'Speed tune-up, malware or printer fix',
      'No fix, clear diagnostic path guarantee',
    ],
    ctaLabel: 'Book Remote Fix',
  },
  {
    divisionId: 'repair',
    title: 'Device Hardware Repair',
    price: '$49+',
    unit: 'Labor + exact part cost',
    description: 'Transparent bench labor with direct part sourcing—never inflated markups.',
    highlights: [
      'Written diagnostic quote before work',
      'Local Tuscaloosa / Holt drop-off or mail-in',
      'Thermal cleaning & post-repair stress test',
    ],
    ctaLabel: 'Request Repair Quote',
  },
  {
    divisionId: 'creator',
    title: 'Creator Shorts/Reels Starter Pack',
    price: '$149+',
    unit: '5-clip production batch',
    description: 'Hook-driven vertical cuts ready for YouTube Shorts, Reels, and TikTok.',
    highlights: [
      '5 vertical 9:16 exports (4K / 1080p)',
      'Kinetic captions & punch-in pacing',
      '48–72 hour turnaround from raw link',
    ],
    ctaLabel: 'Order 5-Clip Batch',
  },
  {
    divisionId: 'ai',
    title: 'AI Commercials & Corporate AI',
    price: 'Custom ROI',
    unit: 'Scoped project or retainer',
    description: 'Tailored AI ad production and workflow systems built around measurable savings.',
    highlights: [
      'AI video commercial sprints or retainers',
      'Custom lead/support agent integration',
      'SOP workflow audit & deployment plan',
    ],
    ctaLabel: 'Scope AI System',
  },
];

export interface ProcessStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: '01. Scope & Diagnostic',
    title: 'Pinpoint the bottleneck in minutes',
    description:
      'Select your division track below or enter the live support room directly. We confirm exact scope, turnaround, and flat-rate or transparent part pricing upfront.',
  },
  {
    step: '02. Live Execution',
    title: 'Hands-on engineering or media production',
    description:
      'For remote help, watch and learn step-by-step on screen. For repairs, creator batches, or AI workflows, our team executes with checkpoint updates.',
  },
  {
    step: '03. Verified Delivery',
    title: 'Tested, documented & ready to scale',
    description:
      'Every device passes thermal and hardware checks, every clip is mastered for platform retention, and every AI system ships with clear team runbooks.',
  },
];

export interface CreatorVideoSample {
  readonly id: string;
  readonly tabLabel: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly src: string;
}

export const CREATOR_VIDEO_SAMPLES: readonly CreatorVideoSample[] = [
  {
    id: 'fortigate-commercial',
    tabLabel: 'Product Commercial',
    title: 'FortiGate 61E — Hardware Commercial Spot',
    category: 'Commercial Ad',
    description:
      'Clean studio product spot with motion-tracked spec callouts and punchy sound sync.',
    src: '/assets/aistudio/gemini_generated_video_e5754073_8e8f4272.mp4',
  },
  {
    id: 'tnt-short-cut',
    tabLabel: 'Short-Form Cut',
    title: 'Studio Lyric Hook — Short-Form Cut',
    category: 'Creator Short',
    description:
      'High-energy animated vocal performance cut engineered for Shorts, Reels, and TikTok retention.',
    src: '/assets/aistudio/Tntclipver1_f91d25e0.mp4',
  },
  {
    id: 'studio-extended-reel',
    tabLabel: 'Extended Reel',
    title: 'Full Animated Studio Session — Extended Reel',
    category: 'Full Production',
    description:
      'Multi-scene animated studio showcase with dynamic camera framing and custom lyric timing.',
    src: '/assets/aistudio/Untitled_video__1__f36e4cbb.mp4',
  },
];

export interface TestimonialItem {
  readonly id: string;
  readonly divisionId: DivisionId;
  readonly metric: string;
  readonly metricLabel: string;
  readonly quote: string;
  readonly clientName: string;
  readonly clientRole: string;
  readonly location: string;
}

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: 'remote-support-proof',
    divisionId: 'remote',
    metric: '35 min',
    metricLabel: 'Live browser fix',
    quote:
      'My accounting laptop froze before payroll and three local shops quoted a four-day wait. We opened the browser link, cleared the corrupted startup services step-by-step on screen, and I was back online in thirty-five minutes.',
    clientName: 'Patricia Holloway',
    clientRole: 'Office Manager, Holloway Tax & Bookkeeping',
    location: 'Tuscaloosa, AL',
  },
  {
    id: 'device-repair-proof',
    divisionId: 'repair',
    metric: '$840 saved',
    metricLabel: 'vs. full laptop replacement',
    quote:
      'A coffee spill knocked out my MacBook Pro charging circuit and left the fans screaming. E=TC² ultrasonic-cleaned the board, replaced the USB-C controller, and repasted the thermals—delivering exact part receipts and cooler temps than factory.',
    clientName: 'Marcus Vance',
    clientRole: 'Independent Civil Engineer',
    location: 'Holt, AL',
  },
  {
    id: 'creator-shorts-proof',
    divisionId: 'creator',
    metric: '3.2x watch time',
    metricLabel: 'across 15 repurposed clips',
    quote:
      'Our weekly 90-minute podcast sat untouched because editing took ten hours a week. Dropping raw Drive links to E=TC² turned each episode into crisp vertical cuts with kinetic captions and sound hits that tripled average view duration.',
    clientName: 'Devon Albright',
    clientRole: 'Host, Southern Gridiron Weekly',
    location: 'Birmingham, AL (Remote)',
  },
  {
    id: 'ai-enterprise-proof',
    divisionId: 'ai',
    metric: '42% faster',
    metricLabel: 'after-hours lead capture',
    quote:
      'We needed a product commercial that looked broadcast-ready without a five-figure agency shoot, plus an intake assistant for after-hours service calls. Their AI commercial drove immediate clicks and our dispatch desk now qualifies leads overnight.',
    clientName: 'Grant Callahan',
    clientRole: 'Operations Director, Crimson Valley Mechanical',
    location: 'Nationwide B2B Client',
  },
];

export interface AiCertification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly recipient: string;
  readonly completedDate: string;
  readonly verifyCode: string;
  readonly verifyUrl: string;
  readonly pdfPath: string;
  readonly focus: string;
  readonly isFlagship?: boolean;
}

export const AI_CERTIFICATIONS: readonly AiCertification[] = [
  {
    id: 'google-ai-professional',
    title: 'Google AI Professional Certificate (8-Course Program)',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 19, 2026',
    verifyCode: 'ZRFTWL3MFHQL',
    verifyUrl: 'https://coursera.org/verify/professional-cert/ZRFTWL3MFHQL',
    pdfPath: '/assets/aistudio/Coursera_AI_Professional_b5e7c28a.pdf',
    focus:
      'Complete 8-course credential covering AI workflows, custom AI app building, data analysis, content creation, and responsible enterprise deployment.',
    isFlagship: true,
  },
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 18, 2026',
    verifyCode: 'SXJI54VVP8S7',
    verifyUrl: 'https://coursera.org/verify/SXJI54VVP8S7',
    pdfPath: '/assets/aistudio/Coursera_ai_fundimentals_79796ecf.pdf',
    focus: 'Core generative AI mechanics, model evaluation, and workplace automation safety.',
  },
  {
    id: 'design-prompts',
    title: 'Design Prompts for Everyday Work Tasks',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 1, 2026',
    verifyCode: '4Y1JZ3C93CII',
    verifyUrl: 'https://coursera.org/verify/4Y1JZ3C93CII',
    pdfPath: '/assets/aistudio/Coursera_4Y1JZ3C93CII_34c1abe1.pdf',
    focus: 'Structured prompt engineering for repeatable operational workflows and SOPs.',
  },
  {
    id: 'ai-writing-communicating',
    title: 'AI for Writing and Communicating',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 19, 2026',
    verifyCode: 'V78488JK93OL',
    verifyUrl: 'https://coursera.org/verify/V78488JK93OL',
    pdfPath: '/assets/aistudio/Coursera_writing_communication_be71701e.pdf',
    focus: 'Executive-ready business communications, proposal drafting, and tone calibration.',
  },
  {
    id: 'ai-content-creation',
    title: 'AI for Content Creation',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 18, 2026',
    verifyCode: '9BDJERXNSGZ0',
    verifyUrl: 'https://coursera.org/verify/9BDJERXNSGZ0',
    pdfPath: '/assets/aistudio/Coursera_content_creation_5e28642d.pdf',
    focus: 'Commercial video ideation, creative direction, and multi-channel brand assets.',
  },
  {
    id: 'ai-data-analysis',
    title: 'AI for Data Analysis',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 19, 2026',
    verifyCode: 'TYCY9IWOU3V7',
    verifyUrl: 'https://coursera.org/verify/TYCY9IWOU3V7',
    pdfPath: '/assets/aistudio/Coursera_data_analyasis_87004d72.pdf',
    focus: 'Automated spreadsheet auditing, trend extraction, and KPI reporting.',
  },
  {
    id: 'ai-app-building',
    title: 'AI for App Building',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 18, 2026',
    verifyCode: 'T048CZ708M04',
    verifyUrl: 'https://coursera.org/verify/T048CZ708M04',
    pdfPath: '/assets/aistudio/AI_for_App_Building_96f3ffcc.pdf',
    focus: 'Custom AI tool prototyping, workflow interfaces, and tailored business utilities.',
  },
  {
    id: 'ai-app-deployment',
    title: 'AI for App Deployment',
    issuer: 'Google via Coursera',
    recipient: 'John Henry Williams',
    completedDate: 'Oct 7, 2026',
    verifyCode: 'BEICPS5P85QO',
    verifyUrl: 'https://coursera.org/verify/BEICPS5P85QO',
    pdfPath: '/assets/aistudio/Certificate_AI_Development._6f437700.pdf',
    focus: 'Production rollout, reliability testing, and live deployment of AI solutions.',
  },
];


