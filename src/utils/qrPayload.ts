import { QRState } from '../types/qr';

export function formatQRPayload(state: QRState): string {
  const { type } = state;

  switch (type) {
    case 'url': {
      let url = state.url.trim();
      if (!url) return 'https://qrcraft.app';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }

    case 'text': {
      return state.text.trim() || 'Welcome to QRCodeCraft!';
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = state.wifi;
      const safeSsid = ssid.replace(/([\\;,:"])/g, '\\$1');
      const safePass = password.replace(/([\\;,:"])/g, '\\$1');
      const enc = encryption === 'nopass' ? 'nopass' : encryption;
      return `WIFI:T:${enc};S:${safeSsid};P:${safePass};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'email': {
      const { email, subject, body } = state.email;
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const query = params.toString();
      return `mailto:${email.trim()}${query ? '?' + query : ''}`;
    }

    case 'phone': {
      const full = `${state.phone.countryCode}${state.phone.phone}`.replace(/[^\d+]/g, '');
      return `tel:${full || '+1234567890'}`;
    }

    case 'sms': {
      const full = state.sms.phone.replace(/[^\d+]/g, '');
      const body = state.sms.message;
      return `smsto:${full || '+1234567890'}:${body}`;
    }

    case 'whatsapp': {
      const phoneDigits = `${state.whatsapp.countryCode}${state.whatsapp.phone}`.replace(/\D/g, '');
      const text = encodeURIComponent(state.whatsapp.message || '');
      return `https://wa.me/${phoneDigits}${text ? `?text=${text}` : ''}`;
    }

    case 'vcard': {
      const { firstName, lastName, organization, title, phone, email, website, street, city, state: st, zip, country } = state.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${firstName} ${lastName}`.trim() || 'FN:Contact Name',
        organization ? `ORG:${organization}` : '',
        title ? `TITLE:${title}` : '',
        phone ? `TEL;TYPE=CELL:${phone}` : '',
        email ? `EMAIL:${email}` : '',
        website ? `URL:${website.startsWith('http') ? website : 'https://' + website}` : '',
        (street || city || st || zip || country)
          ? `ADR;TYPE=WORK:;;${street};${city};${st};${zip};${country}`
          : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }

    case 'location': {
      const { latitude, longitude, locationName } = state.location;
      const lat = latitude.trim() || '37.7749';
      const lng = longitude.trim() || '-122.4194';
      if (locationName) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng + ' (' + locationName + ')')}`;
      }
      return `geo:${lat},${lng}?q=${lat},${lng}`;
    }

    case 'event': {
      const { title, location, startDate, endDate, description } = state.event;
      const formatTime = (dtStr: string) => {
        if (!dtStr) return '20261101T120000Z';
        const d = new Date(dtStr);
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//QRCodeCraft//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${title || 'New Event'}`,
        location ? `LOCATION:${location}` : '',
        description ? `DESCRIPTION:${description}` : '',
        `DTSTART:${formatTime(startDate)}`,
        `DTEND:${formatTime(endDate || startDate)}`,
        'END:VEVENT',
        'END:VCALENDAR',
      ]
        .filter(Boolean)
        .join('\n');
    }

    case 'social': {
      const { platform, usernameOrUrl } = state.social;
      const trimmed = usernameOrUrl.trim().replace(/^@/, '');
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
      const map: Record<string, string> = {
        instagram: `https://instagram.com/${trimmed}`,
        linkedin: `https://linkedin.com/in/${trimmed}`,
        twitter: `https://x.com/${trimmed}`,
        tiktok: `https://tiktok.com/@${trimmed}`,
        facebook: `https://facebook.com/${trimmed}`,
        github: `https://github.com/${trimmed}`,
      };
      return map[platform] || `https://${platform}.com/${trimmed}`;
    }

    case 'youtube': {
      const val = state.youtube.urlOrId.trim();
      if (!val) return 'https://youtube.com';
      if (val.startsWith('http://') || val.startsWith('https://')) return val;
      if (state.youtube.type === 'channel') {
        return `https://youtube.com/@${val.replace(/^@/, '')}`;
      }
      return `https://youtu.be/${val}`;
    }

    default:
      return 'https://qrcraft.app';
  }
}

// Calculate color luminance & contrast ratio
function getRGB(hex: string): [number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const [r1, g1, b1] = getRGB(hex1);
    const [r2, g2, b2] = getRGB(hex2);
    const l1 = getLuminance(r1, g1, b1);
    const l2 = getLuminance(r2, g2, b2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 21;
  }
}
