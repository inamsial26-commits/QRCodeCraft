import { QRType, QRState } from '../types/qr';

export interface QRTypeMeta {
  id: QRType;
  title: string;
  badge: string;
  description: string;
  placeholder: string;
}

export const QR_TYPES: QRTypeMeta[] = [
  {
    id: 'url',
    title: 'Website / URL',
    badge: 'Popular',
    description: 'Open any webpage, landing page, or online store instantly.',
    placeholder: 'https://yourwebsite.com',
  },
  {
    id: 'wifi',
    title: 'Wi-Fi Network',
    badge: 'Instant Connect',
    description: 'Connect to Wi-Fi seamlessly without typing long passwords.',
    placeholder: 'Office-HighSpeed-5G',
  },
  {
    id: 'vcard',
    title: 'vCard Contact',
    badge: 'Business',
    description: 'Share your digital business card directly into smartphone contacts.',
    placeholder: 'Full Contact Profile',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Chat',
    badge: 'Direct Message',
    description: 'Start a direct WhatsApp chat with an optional prefilled message.',
    placeholder: '+1 (555) 019-2834',
  },
  {
    id: 'text',
    title: 'Plain Text',
    badge: 'Simple',
    description: 'Display any text message, coupon code, notes, or raw string.',
    placeholder: 'Enter any text, instructions, or notes here...',
  },
  {
    id: 'email',
    title: 'Email Draft',
    badge: 'Inquiries',
    description: 'Open a pre-addressed email draft with subject line and body.',
    placeholder: 'hello@yourcompany.com',
  },
  {
    id: 'phone',
    title: 'Phone Call',
    badge: 'One Tap',
    description: 'Trigger an immediate phone dialer call with a single scan.',
    placeholder: '+1 (800) 555-0199',
  },
  {
    id: 'sms',
    title: 'SMS Message',
    badge: 'Fast',
    description: 'Pre-compose a text message to a specific number.',
    placeholder: '+1 (555) 012-3456',
  },
  {
    id: 'location',
    title: 'Google Maps / Geo',
    badge: 'Navigation',
    description: 'Pinpoint an exact GPS coordinate or business address on maps.',
    placeholder: '37.7749, -122.4194',
  },
  {
    id: 'event',
    title: 'Calendar Event',
    badge: 'Meetings',
    description: 'Add an event, conference, or party straight to calendar.',
    placeholder: 'Tech Conference 2026',
  },
  {
    id: 'social',
    title: 'Social Profile',
    badge: 'Audience',
    description: 'Grow your followers on Instagram, LinkedIn, X, TikTok, or GitHub.',
    placeholder: '@yourhandle',
  },
  {
    id: 'youtube',
    title: 'YouTube Video/Channel',
    badge: 'Streaming',
    description: 'Direct viewers to a video, playlist, or YouTube channel.',
    placeholder: 'https://youtube.com/watch?v=...',
  },
];

export const INITIAL_QR_STATE: QRState = {
  type: 'url',
  url: 'https://example.com',
  text: 'Hello from QRCodeCraft!',
  wifi: {
    ssid: 'Guest_WiFi_5G',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  email: {
    email: 'contact@example.com',
    subject: 'Inquiry via QRCodeCraft',
    body: 'Hi, I would like to get in touch regarding...',
  },
  phone: {
    countryCode: '+1',
    phone: '5550192834',
  },
  sms: {
    phone: '+15550192834',
    message: 'Hello! I scanned your QR code.',
  },
  whatsapp: {
    countryCode: '+1',
    phone: '5550192834',
    message: 'Hello! I found your QR code and would like more details.',
  },
  vcard: {
    firstName: 'Sarah',
    lastName: 'Chen',
    organization: 'Apex Solutions Inc.',
    title: 'Product Director',
    phone: '+1 (555) 234-5678',
    email: 'sarah.chen@example.com',
    website: 'https://apexsolutions.io',
    street: '100 Market St, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
  },
  location: {
    latitude: '37.7749',
    longitude: '-122.4194',
    locationName: 'San Francisco Downtown',
  },
  event: {
    title: 'Global Tech Summit 2026',
    location: 'Moscone Convention Center',
    startDate: '2026-11-15T09:00',
    endDate: '2026-11-15T17:00',
    description: 'Annual flagship keynote, product unveils, and networking summit.',
  },
  social: {
    platform: 'linkedin',
    usernameOrUrl: 'sarahchen-tech',
  },
  youtube: {
    urlOrId: 'https://youtube.com',
    type: 'video',
  },
  design: {
    fgColor: '#151B35',
    bgColor: '#FFFFFF',
    size: 400,
    margin: 4,
    errorCorrectionLevel: 'M',
    logoUrl: undefined,
    logoSizePercent: 22,
  },
};

export interface ColorPreset {
  name: string;
  fg: string;
  bg: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Dark Navy', fg: '#151B35', bg: '#FFFFFF' },
  { name: 'Brand Indigo', fg: '#635BFF', bg: '#FFFFFF' },
  { name: 'Electric Blue', fg: '#3678F6', bg: '#FFFFFF' },
  { name: 'Emerald Forest', fg: '#0F766E', bg: '#FFFFFF' },
  { name: 'Velvet Purple', fg: '#7C3AED', bg: '#F8FAFC' },
  { name: 'Ruby Sunset', fg: '#BE123C', bg: '#FFF1F2' },
  { name: 'Deep Slate', fg: '#334155', bg: '#F8FAFC' },
  { name: 'Pure Contrast', fg: '#000000', bg: '#FFFFFF' },
];

export interface PresetLogo {
  id: string;
  name: string;
  dataUrl: string;
}

// Built-in SVG logos as safe data URLs for instant embedding with no network delay
export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'web',
    name: 'Website',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23635BFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%233678F6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2325D366"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.201.3-.777.979-.953 1.18-.175.2-.351.225-.652.075-.3-.15-1.27-.468-2.42-1.494-.894-.799-1.498-1.786-1.674-2.087-.175-.3-.018-.463.132-.612.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.632-.928-2.235-.245-.589-.494-.509-.677-.518-.175-.009-.376-.011-.577-.011s-.527.075-.803.375c-.276.3-1.053 1.029-1.053 2.509s1.078 2.906 1.229 3.107c.15.2 2.121 3.24 5.14 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.9-.119.578-.35 1.78-7.26 1.78-7.26z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E4405F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    id: 'mail',
    name: 'Email',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23635BFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  {
    id: 'star',
    name: 'Star / Brand',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
];
