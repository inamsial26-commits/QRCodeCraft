import React from 'react';
import { ShieldCheck, HardDrive, Lock, EyeOff } from 'lucide-react';

export const TrustPrivacy: React.FC = () => {
  const points = [
    {
      title: 'Local Client-Side Generation',
      desc: 'All QR rendering and matrix math occur directly within your web browser using HTML5 Canvas and client-side JavaScript. Your text and links are never sent to a remote API.',
      icon: HardDrive,
    },
    {
      title: 'Zero Account Requirement',
      desc: 'Use every feature—including all 12 formats, color styling, and high-res vector downloads—without creating an account, submitting an email address, or paying a subscription.',
      icon: Lock,
    },
    {
      title: 'Logos Processed in Memory',
      desc: 'When you upload a logo, it is read into your browser’s local memory via FileReader. It is drawn into your download file and is never uploaded or archived to any server storage.',
      icon: EyeOff,
    },
    {
      title: 'No Tracking or Scanned Content Auditing',
      desc: 'Unlike dynamic QR services that intercept your visitors through redirects, QRCodeCraft outputs pure static QR codes that connect scanners straight to your original destination.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E8EAF2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#16A36A] bg-[#16A36A]/10 px-3.5 py-1 rounded-full">
            Transparent Privacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            Your QR Codes. Your Data. Your Control.
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            We believe in honest, privacy-first software. Here is how QRCodeCraft protects your information by architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-7 rounded-2xl border border-[#E8EAF2] bg-[#F7F8FC]/50 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8EAF2] shadow-2xs flex items-center justify-center text-[#16A36A] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151B35] mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#73798B] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
