import React from 'react';
import { MousePointerClick, Sliders, DownloadCloud } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your QR Type',
      description:
        'Select from 12 versatile QR categories including website URL, Wi-Fi network, digital vCard contact, WhatsApp chat, or calendar event.',
      icon: MousePointerClick,
    },
    {
      step: '02',
      title: 'Customize Your Design',
      description:
        'Personalize your QR code with high-contrast color palettes, quiet margin zones, error correction levels, and your own company logo.',
      icon: Sliders,
    },
    {
      step: '03',
      title: 'Download and Share',
      description:
        'Export your finished QR code in high-resolution PNG or vector SVG ready for print, billboards, product packaging, menus, or digital screens.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-[#F7F8FC] border-b border-[#E8EAF2]/60 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] bg-white border border-[#E8EAF2] px-3.5 py-1 rounded-full shadow-2xs">
            Simple Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            Create Your QR Code in Three Simple Steps
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            No complex software, no design skills needed, and zero account signups required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-[#E8EAF2] p-8 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3678F6] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-[#151B35]/20 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#151B35] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#73798B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#16A36A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                  <span>
                    {index === 0
                      ? 'Instant configuration'
                      : index === 1
                      ? 'Live real-time preview'
                      : 'Commercial print ready'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
