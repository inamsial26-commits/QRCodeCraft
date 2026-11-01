import React from 'react';
import { QrCode, Heart, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenHostingerGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenHostingerGuide }) => {
  return (
    <footer className="bg-white border-t border-[#E8EAF2] pt-16 pb-12 text-[#73798B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8EAF2]">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3678F6] flex items-center justify-center text-white shadow-xs">
                <QrCode className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#151B35]">
                QRCode<span className="text-[#635BFF]">Craft</span>
              </span>
            </div>
            <p className="text-sm text-[#73798B] leading-relaxed max-w-sm">
              Create. Customize. Scan. Share. Premium worldwide QR code generator engineered for speed, privacy, and flawless scanning.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16A36A]">
              <Shield className="w-4 h-4" />
              <span>100% Client-Side · No Tracking · Free Forever</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#151B35]">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  QR Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('types')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  Supported Formats
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('how-it-works')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  FAQ & Help
                </button>
              </li>
            </ul>
          </div>

          {/* Formats */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#151B35]">
              Popular QR Types
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  Wi-Fi Password QR Code
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  vCard Digital Business Card
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  WhatsApp Quick Chat Link
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-[#151B35] transition-colors cursor-pointer text-left"
                >
                  Google Maps Pin & Geo URI
                </button>
              </li>
            </ul>
          </div>

          {/* Export & Deployment */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#151B35]">
              Deployment
            </h4>
            <p className="text-xs text-[#73798B] leading-relaxed">
              Fully optimized for static hosting on Hostinger, Cloudflare, Vercel, or custom Apache/Nginx web servers.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenHostingerGuide}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#635BFF] hover:underline cursor-pointer text-left"
              >
                <span>Hostinger Upload Guide →</span>
              </button>
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#635BFF] bg-[#635BFF]/10 px-2.5 py-1 rounded-md">
                  <Sparkles className="w-3 h-3" />
                  Production Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} QRCodeCraft. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#73798B]">
            <span>High-Speed Client Runtime</span>
            <span>·</span>
            <span>ISO/IEC 18004 Standard Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
