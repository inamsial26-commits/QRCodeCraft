import React from 'react';
import { QRState } from '../../types/qr';
import { SAMPLE_TEMPLATES } from '../../constants/qrTemplates';
import {
  Globe,
  Lock,
  Eye,
  EyeOff,
  Navigation,
  Calendar,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  AtSign,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface QRFormProps {
  state: QRState;
  onChange: <K extends keyof QRState>(key: K, value: QRState[K]) => void;
}

export const QRForm: React.FC<QRFormProps> = ({ state, onChange }) => {
  const [showWifiPassword, setShowWifiPassword] = React.useState(false);
  const [geoLocating, setGeoLocating] = React.useState(false);

  const currentTemplates = SAMPLE_TEMPLATES[state.type] || [];

  const handleApplyTemplate = (tpl: (typeof currentTemplates)[0]) => {
    const updates = tpl.apply(state);
    Object.entries(updates).forEach(([key, val]) => {
      onChange(key as any, val);
    });
  };

  // Quick URL protocol setter
  const handleUrlProtocol = (protocol: string) => {
    let clean = state.url.replace(/^https?:\/\//i, '');
    onChange('url', protocol + clean);
  };

  // Get current device location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange('location', {
          ...state.location,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
          locationName: state.location.locationName || 'My Current Location',
        });
        setGeoLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setGeoLocating(false);
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Sample Presets Bar */}
      {currentTemplates.length > 0 && (
        <div className="p-3 rounded-xl bg-[#635BFF]/5 border border-[#635BFF]/15 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#635BFF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Quick Example:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {currentTemplates.map((tpl) => (
              <button
                key={tpl.name}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                title={tpl.description}
                className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-[#635BFF] text-[#151B35] hover:text-white rounded-lg border border-[#E8EAF2] hover:border-[#635BFF] transition-all shadow-2xs cursor-pointer"
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 1. URL / Website */}
      {state.type === 'url' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73798B]">
              Website Address
            </label>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleUrlProtocol('https://')}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[#151B35] font-semibold text-[11px]"
              >
                https://
              </button>
              <button
                type="button"
                onClick={() => handleUrlProtocol('http://')}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[#73798B] font-semibold text-[11px]"
              >
                http://
              </button>
            </div>
          </div>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73798B]" />
            <input
              type="url"
              value={state.url}
              onChange={(e) => onChange('url', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] placeholder-[#73798B]/50 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all"
            />
          </div>
          <p className="text-xs text-[#73798B]">
            Enter any valid website URL. When scanned, phones will instantly open this destination.
          </p>
        </div>
      )}

      {/* 2. Plain Text */}
      {state.type === 'text' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73798B]">
              Plain Text Content
            </label>
            <span className="text-[11px] text-[#73798B] font-mono">
              {state.text.length} chars
            </span>
          </div>
          <textarea
            rows={4}
            value={state.text}
            onChange={(e) => onChange('text', e.target.value)}
            placeholder="Type or paste any text, secret message, instructions, or coupon code..."
            className="w-full p-3 bg-white border border-[#E8EAF2] rounded-xl text-sm text-[#20243A] placeholder-[#73798B]/50 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all resize-none"
          />
          <p className="text-xs text-[#73798B]">
            Plain text QR codes display text directly on the scanner's screen without requiring internet.
          </p>
        </div>
      )}

      {/* 3. Wi-Fi */}
      {state.type === 'wifi' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Network Name (SSID) *
            </label>
            <input
              type="text"
              value={state.wifi.ssid}
              onChange={(e) =>
                onChange('wifi', { ...state.wifi, ssid: e.target.value })
              }
              placeholder="e.g. Guest_WiFi_5G"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Wi-Fi Password
            </label>
            <div className="relative">
              <input
                type={showWifiPassword ? 'text' : 'password'}
                value={state.wifi.password}
                disabled={state.wifi.encryption === 'nopass'}
                onChange={(e) =>
                  onChange('wifi', { ...state.wifi, password: e.target.value })
                }
                placeholder={
                  state.wifi.encryption === 'nopass'
                    ? 'No password required'
                    : 'Enter Wi-Fi password'
                }
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
              {state.wifi.encryption !== 'nopass' && (
                <button
                  type="button"
                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73798B] hover:text-[#151B35]"
                >
                  {showWifiPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
                Security Type
              </label>
              <select
                value={state.wifi.encryption}
                onChange={(e) =>
                  onChange('wifi', {
                    ...state.wifi,
                    encryption: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#20243A] select-none">
                <input
                  type="checkbox"
                  checked={state.wifi.hidden}
                  onChange={(e) =>
                    onChange('wifi', { ...state.wifi, hidden: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#635BFF] focus:ring-[#635BFF] border-slate-300"
                />
                <span className="text-xs font-medium">Hidden Network (SSID Broadcast Off)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 4. Email */}
      {state.type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Recipient Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73798B]" />
              <input
                type="email"
                value={state.email.email}
                onChange={(e) =>
                  onChange('email', { ...state.email, email: e.target.value })
                }
                placeholder="contact@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Pre-filled Subject
            </label>
            <input
              type="text"
              value={state.email.subject}
              onChange={(e) =>
                onChange('email', { ...state.email, subject: e.target.value })
              }
              placeholder="e.g. Product Inquiry / Support Request"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Email Body
            </label>
            <textarea
              rows={3}
              value={state.email.body}
              onChange={(e) =>
                onChange('email', { ...state.email, body: e.target.value })
              }
              placeholder="Hi there, I scanned your QR code and would like to ask..."
              className="w-full p-3 bg-white border border-[#E8EAF2] rounded-xl text-sm text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] resize-none"
            />
          </div>
        </div>
      )}

      {/* 5. Phone */}
      {state.type === 'phone' && (
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B]">
            Phone Number to Dial
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={state.phone.countryCode}
              onChange={(e) =>
                onChange('phone', { ...state.phone, countryCode: e.target.value })
              }
              placeholder="+1"
              className="w-24 px-3 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] text-center focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73798B]" />
              <input
                type="tel"
                value={state.phone.phone}
                onChange={(e) =>
                  onChange('phone', { ...state.phone, phone: e.target.value })
                }
                placeholder="555-019-2834"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>
          <p className="text-xs text-[#73798B]">
            When scanned, user devices immediately open the native phone app ready to call.
          </p>
        </div>
      )}

      {/* 6. SMS */}
      {state.type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={state.sms.phone}
              onChange={(e) =>
                onChange('sms', { ...state.sms, phone: e.target.value })
              }
              placeholder="+1 555 019 2834"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Predefined SMS Message
            </label>
            <textarea
              rows={3}
              value={state.sms.message}
              onChange={(e) =>
                onChange('sms', { ...state.sms, message: e.target.value })
              }
              placeholder="e.g. RSVP YES to John's birthday party!"
              className="w-full p-3 bg-white border border-[#E8EAF2] rounded-xl text-sm text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] resize-none"
            />
          </div>
        </div>
      )}

      {/* 7. WhatsApp */}
      {state.type === 'whatsapp' && (
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B]">
            WhatsApp Phone Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={state.whatsapp.countryCode}
              onChange={(e) =>
                onChange('whatsapp', {
                  ...state.whatsapp,
                  countryCode: e.target.value,
                })
              }
              placeholder="+1"
              className="w-20 px-3 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] text-center focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
            <input
              type="tel"
              value={state.whatsapp.phone}
              onChange={(e) =>
                onChange('whatsapp', {
                  ...state.whatsapp,
                  phone: e.target.value,
                })
              }
              placeholder="5550192834"
              className="flex-1 px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Pre-filled Message (Optional)
            </label>
            <textarea
              rows={3}
              value={state.whatsapp.message}
              onChange={(e) =>
                onChange('whatsapp', {
                  ...state.whatsapp,
                  message: e.target.value,
                })
              }
              placeholder="Hello! I would like to learn more about your services."
              className="w-full p-3 bg-white border border-[#E8EAF2] rounded-xl text-sm text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] resize-none"
            />
          </div>
          <p className="text-xs text-[#73798B]">
            Generates a verified WhatsApp wa.me direct link that opens WhatsApp without saving the contact first.
          </p>
        </div>
      )}

      {/* 8. vCard Contact */}
      {state.type === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={state.vcard.firstName}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, firstName: e.target.value })
                }
                placeholder="Sarah"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={state.vcard.lastName}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, lastName: e.target.value })
                }
                placeholder="Chen"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Organization
              </label>
              <input
                type="text"
                value={state.vcard.organization}
                onChange={(e) =>
                  onChange('vcard', {
                    ...state.vcard,
                    organization: e.target.value,
                  })
                }
                placeholder="Company Name"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={state.vcard.title}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, title: e.target.value })
                }
                placeholder="Director of Sales"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={state.vcard.phone}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, phone: e.target.value })
                }
                placeholder="+1 555-019-2834"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Email
              </label>
              <input
                type="email"
                value={state.vcard.email}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, email: e.target.value })
                }
                placeholder="sarah@example.com"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
              Website
            </label>
            <input
              type="url"
              value={state.vcard.website}
              onChange={(e) =>
                onChange('vcard', { ...state.vcard, website: e.target.value })
              }
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                City / State
              </label>
              <input
                type="text"
                value={`${state.vcard.city}${state.vcard.state ? ', ' + state.vcard.state : ''}`}
                onChange={(e) => {
                  const [c, s] = e.target.value.split(',').map((x) => x.trim());
                  onChange('vcard', {
                    ...state.vcard,
                    city: c || '',
                    state: s || '',
                  });
                }}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
                Country
              </label>
              <input
                type="text"
                value={state.vcard.country}
                onChange={(e) =>
                  onChange('vcard', { ...state.vcard, country: e.target.value })
                }
                placeholder="USA"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. Location */}
      {state.type === 'location' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73798B]">
              Geographic Coordinates
            </label>
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={geoLocating}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#635BFF] bg-[#635BFF]/10 hover:bg-[#635BFF]/20 rounded-lg transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{geoLocating ? 'Locating...' : 'Use My Location'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#73798B] mb-1">Latitude</label>
              <input
                type="text"
                value={state.location.latitude}
                onChange={(e) =>
                  onChange('location', {
                    ...state.location,
                    latitude: e.target.value,
                  })
                }
                placeholder="37.7749"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#73798B] mb-1">Longitude</label>
              <input
                type="text"
                value={state.location.longitude}
                onChange={(e) =>
                  onChange('location', {
                    ...state.location,
                    longitude: e.target.value,
                  })
                }
                placeholder="-122.4194"
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Location Name / Label (Optional)
            </label>
            <input
              type="text"
              value={state.location.locationName}
              onChange={(e) =>
                onChange('location', {
                  ...state.location,
                  locationName: e.target.value,
                })
              }
              placeholder="e.g. Acme HQ Main Lobby"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          {/* Quick city presets */}
          <div className="pt-1 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-[#73798B]">Quick Presets:</span>
            {[
              { name: 'New York', lat: '40.7128', lng: '-74.0060' },
              { name: 'London', lat: '51.5074', lng: '-0.1278' },
              { name: 'Tokyo', lat: '35.6762', lng: '139.6503' },
              { name: 'Paris', lat: '48.8566', lng: '2.3522' },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() =>
                  onChange('location', {
                    latitude: p.lat,
                    longitude: p.lng,
                    locationName: p.name,
                  })
                }
                className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-[#151B35] rounded-md transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 10. Event */}
      {state.type === 'event' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Event Title *
            </label>
            <input
              type="text"
              value={state.event.title}
              onChange={(e) =>
                onChange('event', { ...state.event, title: e.target.value })
              }
              placeholder="e.g. Design & Tech Summit 2026"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Venue / Location
            </label>
            <input
              type="text"
              value={state.event.location}
              onChange={(e) =>
                onChange('event', { ...state.event, location: e.target.value })
              }
              placeholder="Grand Ballroom or Zoom Link"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={state.event.startDate}
                onChange={(e) =>
                  onChange('event', { ...state.event, startDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-xs sm:text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                value={state.event.endDate}
                onChange={(e) =>
                  onChange('event', { ...state.event, endDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-xs sm:text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Description / Agenda
            </label>
            <textarea
              rows={2}
              value={state.event.description}
              onChange={(e) =>
                onChange('event', { ...state.event, description: e.target.value })
              }
              placeholder="Keynote speech, workshops, and afternoon networking reception."
              className="w-full p-3 bg-white border border-[#E8EAF2] rounded-xl text-sm text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] resize-none"
            />
          </div>
        </div>
      )}

      {/* 11. Social */}
      {state.type === 'social' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Choose Platform
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'instagram', label: 'Instagram' },
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'twitter', label: 'X (Twitter)' },
                { id: 'tiktok', label: 'TikTok' },
                { id: 'facebook', label: 'Facebook' },
                { id: 'github', label: 'GitHub' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    onChange('social', {
                      ...state.social,
                      platform: p.id as any,
                    })
                  }
                  className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all ${
                    state.social.platform === p.id
                      ? 'bg-[#635BFF] text-white border-[#635BFF] shadow-xs'
                      : 'bg-white text-[#20243A] border-[#E8EAF2] hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              Username or Profile Link
            </label>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73798B]" />
              <input
                type="text"
                value={state.social.usernameOrUrl}
                onChange={(e) =>
                  onChange('social', {
                    ...state.social,
                    usernameOrUrl: e.target.value,
                  })
                }
                placeholder="yourhandle or https://..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
            </div>
          </div>
          <p className="text-xs text-[#73798B]">
            You can type your handle directly (e.g. <code>alex_designs</code>) or paste the full profile URL.
          </p>
        </div>
      )}

      {/* 12. YouTube */}
      {state.type === 'youtube' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onChange('youtube', { ...state.youtube, type: 'video' })
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                state.youtube.type === 'video'
                  ? 'bg-[#635BFF] text-white border-[#635BFF]'
                  : 'bg-white text-[#20243A] border-[#E8EAF2]'
              }`}
            >
              Single Video
            </button>
            <button
              type="button"
              onClick={() =>
                onChange('youtube', { ...state.youtube, type: 'channel' })
              }
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                state.youtube.type === 'channel'
                  ? 'bg-[#635BFF] text-white border-[#635BFF]'
                  : 'bg-white text-[#20243A] border-[#E8EAF2]'
              }`}
            >
              Channel / Profile
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1.5">
              {state.youtube.type === 'video'
                ? 'Video URL or Video ID'
                : 'Channel Name, Handle, or URL'}
            </label>
            <input
              type="text"
              value={state.youtube.urlOrId}
              onChange={(e) =>
                onChange('youtube', { ...state.youtube, urlOrId: e.target.value })
              }
              placeholder={
                state.youtube.type === 'video'
                  ? 'https://youtube.com/watch?v=dQw4w9WgXcQ'
                  : '@veritasium or channel URL'
              }
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
            />
          </div>
          <p className="text-xs text-[#73798B]">
            Scanners on mobile will immediately launch the YouTube app directly to your video or channel.
          </p>
        </div>
      )}
    </div>
  );
};
