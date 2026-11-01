export type QRType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'vcard'
  | 'location'
  | 'event'
  | 'social'
  | 'youtube';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRDesignConfig {
  fgColor: string;
  bgColor: string;
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logoUrl?: string;
  logoSizePercent: number; // 15 to 30
}

export interface WifiFormData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailFormData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneFormData {
  countryCode: string;
  phone: string;
}

export interface SmsFormData {
  phone: string;
  message: string;
}

export interface WhatsAppFormData {
  countryCode: string;
  phone: string;
  message: string;
}

export interface VCardFormData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface LocationFormData {
  latitude: string;
  longitude: string;
  locationName: string;
}

export interface EventFormData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SocialFormData {
  platform: 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'facebook' | 'github';
  usernameOrUrl: string;
}

export interface YouTubeFormData {
  urlOrId: string;
  type: 'video' | 'channel';
}

export interface QRState {
  type: QRType;
  url: string;
  text: string;
  wifi: WifiFormData;
  email: EmailFormData;
  phone: PhoneFormData;
  sms: SmsFormData;
  whatsapp: WhatsAppFormData;
  vcard: VCardFormData;
  location: LocationFormData;
  event: EventFormData;
  social: SocialFormData;
  youtube: YouTubeFormData;
  design: QRDesignConfig;
}
