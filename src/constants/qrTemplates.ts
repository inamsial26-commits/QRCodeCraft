import { QRType, QRState } from '../types/qr';

export interface SampleTemplate {
  name: string;
  type: QRType;
  description: string;
  apply: (prevState: QRState) => Partial<QRState>;
}

export const SAMPLE_TEMPLATES: Record<QRType, SampleTemplate[]> = {
  url: [
    {
      name: 'Restaurant Menu',
      type: 'url',
      description: 'Link to a digital online dining menu',
      apply: () => ({ url: 'https://bistrolumiere.com/menu' }),
    },
    {
      name: 'E-Commerce Store',
      type: 'url',
      description: 'Direct customers to seasonal sale',
      apply: () => ({ url: 'https://myshop.com/collection/summer-sale' }),
    },
    {
      name: 'Google Review Link',
      type: 'url',
      description: 'Collect 5-star customer feedback',
      apply: () => ({ url: 'https://g.page/r/your-google-review-link' }),
    },
  ],
  wifi: [
    {
      name: 'Cafe Guest Wi-Fi',
      type: 'wifi',
      description: 'Standard guest wireless network',
      apply: (prev) => ({
        wifi: {
          ...prev.wifi,
          ssid: 'Cafe_Roasters_Guest',
          password: 'espresso_please',
          encryption: 'WPA',
          hidden: false,
        },
      }),
    },
    {
      name: 'Office Conference Room',
      type: 'wifi',
      description: 'Fast meeting room Wi-Fi network',
      apply: (prev) => ({
        wifi: {
          ...prev.wifi,
          ssid: 'InnovateHub_Meeting5G',
          password: 'CreateGreatThings2026',
          encryption: 'WPA',
          hidden: false,
        },
      }),
    },
    {
      name: 'Open Public Network',
      type: 'wifi',
      description: 'No password required network',
      apply: (prev) => ({
        wifi: {
          ...prev.wifi,
          ssid: 'City_Free_WiFi',
          password: '',
          encryption: 'nopass',
          hidden: false,
        },
      }),
    },
  ],
  vcard: [
    {
      name: 'Tech Founder / Executive',
      type: 'vcard',
      description: 'Executive leadership digital card',
      apply: (prev) => ({
        vcard: {
          ...prev.vcard,
          firstName: 'Marcus',
          lastName: 'Vance',
          organization: 'Apex Robotics Inc.',
          title: 'Founder & CEO',
          phone: '+1 (415) 890-1234',
          email: 'marcus@apexrobotics.io',
          website: 'https://apexrobotics.io',
          street: '500 Howard St',
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
          country: 'USA',
        },
      }),
    },
    {
      name: 'Freelance Designer',
      type: 'vcard',
      description: 'Creative studio contact card',
      apply: (prev) => ({
        vcard: {
          ...prev.vcard,
          firstName: 'Elena',
          lastName: 'Rostova',
          organization: 'Studio Forma',
          title: 'Senior Brand Designer',
          phone: '+44 20 7946 0912',
          email: 'elena@studioforma.design',
          website: 'https://studioforma.design',
          street: '14 Shoreditch High St',
          city: 'London',
          state: 'Greater London',
          zip: 'E1 6PG',
          country: 'United Kingdom',
        },
      }),
    },
  ],
  whatsapp: [
    {
      name: 'Sales & Quote Inquiry',
      type: 'whatsapp',
      description: 'Direct sales quote starter',
      apply: (prev) => ({
        whatsapp: {
          ...prev.whatsapp,
          countryCode: '+1',
          phone: '5550192834',
          message: 'Hi, I would like to request a quote for your professional design packages.',
        },
      }),
    },
    {
      name: 'Customer Support Desk',
      type: 'whatsapp',
      description: 'Instant customer help link',
      apply: (prev) => ({
        whatsapp: {
          ...prev.whatsapp,
          countryCode: '+1',
          phone: '5550192834',
          message: 'Hello! I need help with an order I placed recently.',
        },
      }),
    },
  ],
  text: [
    {
      name: 'Discount Coupon Code',
      type: 'text',
      description: 'In-store discount voucher',
      apply: () => ({
        text: 'PROMO CODE: SAVE20-SUMMER (Show at checkout for 20% off your purchase!)',
      }),
    },
    {
      name: 'Secret Message / Scavenger Hunt',
      type: 'text',
      description: 'Clue for team game or event',
      apply: () => ({
        text: 'Clue #4: Head towards the north courtyard by the fountain to uncover the next checkpoint!',
      }),
    },
  ],
  email: [
    {
      name: 'Job Application',
      type: 'email',
      description: 'Pre-addressed applicant email',
      apply: (prev) => ({
        email: {
          ...prev.email,
          email: 'careers@acmeglobal.com',
          subject: 'Application: Senior Full-Stack Engineer',
          body: 'Hello Hiring Team,\n\nI am thrilled to submit my application for the Senior Full-Stack Engineer position. Attached is my portfolio and resume.\n\nBest regards,',
        },
      }),
    },
  ],
  phone: [
    {
      name: '24/7 Hotline',
      type: 'phone',
      description: 'Emergency or customer support call',
      apply: (prev) => ({
        phone: {
          ...prev.phone,
          countryCode: '+1',
          phone: '8005550199',
        },
      }),
    },
  ],
  sms: [
    {
      name: 'Event RSVP Text',
      type: 'sms',
      description: 'One-tap RSVP via SMS',
      apply: (prev) => ({
        sms: {
          ...prev.sms,
          phone: '+15550123456',
          message: 'RSVP YES for Sarah & David’s Anniversary Celebration on Nov 20!',
        },
      }),
    },
  ],
  location: [
    {
      name: 'Times Square, NYC',
      type: 'location',
      description: 'Famous landmark pin',
      apply: (prev) => ({
        location: {
          ...prev.location,
          latitude: '40.7580',
          longitude: '-73.9855',
          locationName: 'Times Square, New York',
        },
      }),
    },
    {
      name: 'Eiffel Tower, Paris',
      type: 'location',
      description: 'Tourist attraction map location',
      apply: (prev) => ({
        location: {
          ...prev.location,
          latitude: '48.8584',
          longitude: '2.2945',
          locationName: 'Eiffel Tower, Paris',
        },
      }),
    },
  ],
  event: [
    {
      name: 'Annual Tech Conference',
      type: 'event',
      description: 'Keynote and workshop invite',
      apply: (prev) => ({
        event: {
          ...prev.event,
          title: 'NextGen AI & Cloud Summit 2026',
          location: 'Convention Center, Hall A',
          startDate: '2026-11-20T09:00',
          endDate: '2026-11-20T17:00',
          description: 'Keynote speeches, interactive product demonstrations, and networking.',
        },
      }),
    },
  ],
  social: [
    {
      name: 'LinkedIn Showcase',
      type: 'social',
      description: 'Professional network profile',
      apply: (prev) => ({
        social: {
          ...prev.social,
          platform: 'linkedin',
          usernameOrUrl: 'sarah-chen-tech',
        },
      }),
    },
    {
      name: 'Instagram Portfolio',
      type: 'social',
      description: 'Photo and creative profile',
      apply: (prev) => ({
        social: {
          ...prev.social,
          platform: 'instagram',
          usernameOrUrl: 'pixelcraft_studio',
        },
      }),
    },
  ],
  youtube: [
    {
      name: 'Product Walkthrough Video',
      type: 'youtube',
      description: 'Direct video launch',
      apply: (prev) => ({
        youtube: {
          ...prev.youtube,
          type: 'video',
          urlOrId: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      }),
    },
  ],
};
