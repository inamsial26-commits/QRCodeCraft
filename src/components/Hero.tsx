import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { ArrowRight, Sparkles, CheckCircle2, Wifi, Globe, UserCheck, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onGenerateClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGenerateClick, onExploreClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        'https://qrcraft.app',
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#151B35',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'H',
        },
        (err) => {
          if (err) console.error(err);
        }
      );
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FC] via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8EAF2]/60">
      {/* Soft atmospheric background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#635BFF]/10 via-[#3678F6]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8EAF2] shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#635BFF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
                Free Online QR Code Generator
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151B35] tracking-tight leading-[1.12] text-balance">
              Create Beautiful QR Codes in Seconds
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#73798B] leading-relaxed max-w-2xl font-normal">
              Generate custom QR codes for websites, Wi-Fi, business cards, social media, and more. Customize your design and download instantly. No registration required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGenerateClick}
                className="px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#635BFF] to-[#3678F6] hover:from-[#554de0] hover:to-[#2b6be0] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>Generate QR Code</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-base font-bold text-[#151B35] bg-white hover:bg-[#F7F8FC] border border-[#E8EAF2] rounded-xl shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                Explore QR Types
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-[#73798B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                <span className="font-medium text-[#20243A]">100% Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#3678F6]" />
                <span className="font-medium text-[#20243A]">Instant Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#635BFF]" />
                <span className="font-medium text-[#20243A]">No Sign-Up Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with real scannable QR & Phone Mockup */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Phone mockup with scanner animation */}
            <div className="relative w-72 sm:w-80 bg-[#151B35] p-3 rounded-[36px] shadow-2xl border-4 border-slate-700/50">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Screen viewport */}
              <div className="relative bg-slate-900 rounded-[28px] p-4 text-white overflow-hidden aspect-[9/16] flex flex-col justify-between">
                {/* Scanner header */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Camera · Live</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium text-[10px]">
                    Auto-Focus
                  </span>
                </div>

                {/* Central viewfinder frame with real QR */}
                <div className="relative mx-auto my-auto p-3 bg-white rounded-2xl shadow-inner flex flex-col items-center">
                  <canvas ref={canvasRef} className="w-40 h-40 rounded-lg" />
                  
                  {/* Glowing scanner sweep line */}
                  <div className="absolute inset-x-2 top-0 h-1 bg-gradient-to-r from-transparent via-[#635BFF] to-transparent animate-bounce opacity-75" />
                  
                  {/* Corner marks */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#635BFF]" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#635BFF]" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#635BFF]" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#635BFF]" />
                </div>

                {/* Scanned result notification badge */}
                <div className="bg-slate-800/90 border border-slate-700 backdrop-blur-md rounded-xl p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#635BFF]/20 flex items-center justify-center text-[#635BFF] shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-200 truncate">https://qrcraft.app</p>
                    <p className="text-[10px] text-emerald-400 font-medium">Tap to open in browser</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating feature pills around phone */}
            <div className="hidden sm:flex absolute -left-6 top-10 bg-white p-3 rounded-2xl shadow-xl border border-[#E8EAF2] items-center gap-3 animate-pulse duration-1000">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3678F6] flex items-center justify-center">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#151B35]">Instant Wi-Fi</p>
                <p className="text-[11px] text-[#73798B]">One tap connection</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -right-6 bottom-16 bg-white p-3 rounded-2xl shadow-xl border border-[#E8EAF2] items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#635BFF] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#151B35]">vCard Contact</p>
                <p className="text-[11px] text-[#73798B]">Saves to address book</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
