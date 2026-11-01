import React from 'react';
import { QRType } from '../types/qr';
import {
  Globe,
  Wifi,
  MessageCircle,
  Contact2,
  Mail,
  Phone,
  MapPin,
  Share2,
  ArrowRight,
} from 'lucide-react';

interface TypeExplorerProps {
  onSelectType: (type: QRType) => void;
}

const EXPLORER_TYPES = [
  {
    type: 'url' as QRType,
    title: 'Website QR Code',
    desc: 'Direct visitors directly to your website, blog post, portfolio, or landing page without manual typing.',
    icon: Globe,
    accent: 'bg-indigo-50 text-[#635BFF]',
  },
  {
    type: 'wifi' as QRType,
    title: 'Wi-Fi QR Code',
    desc: 'Allow guests and customers to connect to your Wi-Fi network instantly without exposing your password in plain sight.',
    icon: Wifi,
    accent: 'bg-blue-50 text-[#3678F6]',
  },
  {
    type: 'whatsapp' as QRType,
    title: 'WhatsApp QR Code',
    desc: 'Enable leads and clients to start a WhatsApp chat with your business with a prefilled message in a single scan.',
    icon: MessageCircle,
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    type: 'vcard' as QRType,
    title: 'Business Card QR Code',
    desc: 'Share complete contact details including phone, email, address, and company directly to address books.',
    icon: Contact2,
    accent: 'bg-purple-50 text-purple-600',
  },
  {
    type: 'email' as QRType,
    title: 'Email QR Code',
    desc: 'Pre-compose customer support, feedback, or sales inquiries directly in the customer’s native mail app.',
    icon: Mail,
    accent: 'bg-rose-50 text-rose-600',
  },
  {
    type: 'phone' as QRType,
    title: 'Phone QR Code',
    desc: 'Print on flyers and storefront windows so potential customers can call your hotline with a single tap.',
    icon: Phone,
    accent: 'bg-amber-50 text-amber-600',
  },
  {
    type: 'location' as QRType,
    title: 'Location QR Code',
    desc: 'Guide customers straight to your store or event venue using native Apple Maps or Google Maps directions.',
    icon: MapPin,
    accent: 'bg-teal-50 text-teal-600',
  },
  {
    type: 'social' as QRType,
    title: 'Social Media QR Code',
    desc: 'Boost your audience by linking directly to your profile on Instagram, LinkedIn, TikTok, X, or GitHub.',
    icon: Share2,
    accent: 'bg-sky-50 text-sky-600',
  },
];

export const TypeExplorer: React.FC<TypeExplorerProps> = ({ onSelectType }) => {
  return (
    <section id="types" className="py-16 lg:py-20 bg-white border-b border-[#E8EAF2]/60 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/10 px-3 py-1 rounded-full">
            Supported Formats
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            One QR Code Generator. Endless Possibilities.
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            From sharing Wi-Fi credentials to digital business cards and marketing campaigns, select a format to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPLORER_TYPES.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.type}
                className="bg-white rounded-2xl border border-[#E8EAF2] p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${card.accent} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#151B35] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73798B] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8EAF2]/80">
                  <button
                    type="button"
                    onClick={() => onSelectType(card.type)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#635BFF] group-hover:text-[#3678F6] transition-colors cursor-pointer"
                  >
                    <span>Create Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
