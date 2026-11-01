import React, { useState, useEffect } from 'react';
import { Menu, X, QrCode, ScanLine, UploadCloud } from 'lucide-react';

interface HeaderProps {
  onNavigateToGenerator?: () => void;
  onOpenScanner?: () => void;
  onOpenHostingerGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToGenerator,
  onOpenScanner,
  onOpenHostingerGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'generator' && onNavigateToGenerator) {
      onNavigateToGenerator();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E8EAF2]'
          : 'bg-white border-b border-[#E8EAF2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-[#151B35] group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3678F6] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
            <QrCode className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#151B35]">
            QRCode<span className="text-[#635BFF]">Craft</span>
          </span>
        </a>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#73798B]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#151B35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('generator')}
            className="hover:text-[#151B35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            QR Generator
          </button>
          <button
            onClick={() => scrollTo('types')}
            className="hover:text-[#151B35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            QR Types
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#151B35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-[#151B35] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Scan QR tool button */}
          <button
            onClick={onOpenScanner}
            title="Scan any QR code using camera or image upload"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#151B35] hover:text-[#635BFF] hover:bg-slate-50 border border-[#E8EAF2] rounded-xl transition-colors cursor-pointer"
          >
            <ScanLine className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Scan QR</span>
          </button>

          {/* Hostinger guide button */}
          <button
            onClick={onOpenHostingerGuide}
            title="Step-by-step guide to upload to Hostinger"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#73798B] hover:text-[#151B35] hover:bg-slate-50 border border-transparent hover:border-[#E8EAF2] rounded-xl transition-colors cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>

          <button
            onClick={() => scrollTo('generator')}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#635BFF] to-[#3678F6] hover:from-[#554de0] hover:to-[#2b6be0] rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            Create QR Code
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#73798B] hover:text-[#151B35] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8EAF2] bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-base font-semibold text-[#20243A] hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('generator')}
            className="block w-full text-left py-2 px-3 text-base font-semibold text-[#20243A] hover:bg-slate-50 rounded-lg"
          >
            QR Generator
          </button>
          <button
            onClick={() => scrollTo('types')}
            className="block w-full text-left py-2 px-3 text-base font-semibold text-[#20243A] hover:bg-slate-50 rounded-lg"
          >
            QR Types
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 px-3 text-base font-semibold text-[#20243A] hover:bg-slate-50 rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="block w-full text-left py-2 px-3 text-base font-semibold text-[#20243A] hover:bg-slate-50 rounded-lg"
          >
            FAQ
          </button>
          <div className="pt-2 border-t border-[#E8EAF2] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenScanner) onOpenScanner();
              }}
              className="w-full text-left py-2 px-3 text-sm font-bold text-[#635BFF] bg-[#635BFF]/10 rounded-lg flex items-center gap-2"
            >
              <ScanLine className="w-4 h-4" />
              <span>Scan Any QR Code</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenHostingerGuide) onOpenHostingerGuide();
              }}
              className="w-full text-left py-2 px-3 text-sm font-bold text-[#151B35] bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-[#73798B]" />
              <span>Hostinger Deploy Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
