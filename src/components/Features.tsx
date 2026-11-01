import React from 'react';
import {
  Zap,
  Grid,
  Palette,
  Image,
  Download,
  UserCheck,
  Cpu,
  Smartphone,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Instant QR Generation',
      desc: 'Watch your QR code react in real-time as you type, with zero latency or server round-trips.',
      icon: Zap,
      color: 'text-[#635BFF]',
    },
    {
      title: '12 Essential QR Types',
      desc: 'From URLs and Wi-Fi credentials to vCards, WhatsApp messages, and map locations, every use case is covered.',
      icon: Grid,
      color: 'text-[#3678F6]',
    },
    {
      title: 'Custom Colors & Palettes',
      desc: 'Pick your brand foreground and background colors with built-in WCAG contrast validation to ensure scan reliability.',
      icon: Palette,
      color: 'text-[#16A36A]',
    },
    {
      title: 'Center Logo Integration',
      desc: 'Upload your brand symbol or choose popular icons. High error correction (30%) keeps the code easily scannable.',
      icon: Image,
      color: 'text-purple-600',
    },
    {
      title: 'High-Resolution Downloads',
      desc: 'Download crisp raster PNG images up to 2048px or infinitely scalable vector SVGs for billboards and commercial print.',
      icon: Download,
      color: 'text-amber-600',
    },
    {
      title: 'No Registration Required',
      desc: 'Start creating immediately without setting up accounts, providing credit cards, or verifying emails.',
      icon: UserCheck,
      color: 'text-emerald-600',
    },
    {
      title: '100% Browser-Based Processing',
      desc: 'QR codes and logos are rendered right in your local browser runtime. Your private data never touches our servers.',
      icon: Cpu,
      color: 'text-cyan-600',
    },
    {
      title: 'Mobile-Friendly Experience',
      desc: 'Responsive, thumb-friendly dashboard crafted to work smoothly on desktops, iPads, iPhones, and Android devices.',
      icon: Smartphone,
      color: 'text-indigo-600',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E8EAF2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/10 px-3.5 py-1 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            Everything You Need to Create Better QR Codes
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            Engineered for professionals, marketers, and developers who demand fast, scannable, and beautiful codes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl border border-[#E8EAF2] bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  <Icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <h3 className="text-base font-bold text-[#151B35] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#73798B] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
