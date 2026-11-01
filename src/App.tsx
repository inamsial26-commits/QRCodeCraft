/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QRState, QRType } from './types/qr';
import { INITIAL_QR_STATE } from './constants/qrData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MainGenerator } from './components/Generator/MainGenerator';
import { TypeExplorer } from './components/TypeExplorer';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { UseCases } from './components/UseCases';
import { TrustPrivacy } from './components/TrustPrivacy';
import { SeoEducation } from './components/SeoEducation';
import { FaqSection } from './components/FaqSection';
import { AdPlaceholder } from './components/AdPlaceholder';
import { Footer } from './components/Footer';
import { QRScannerModal } from './components/QRScannerModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';

export default function App() {
  const [qrState, setQrState] = useState<QRState>(INITIAL_QR_STATE);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isHostingerGuideOpen, setIsHostingerGuideOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTypeFromExplorer = (type: QRType) => {
    setQrState((prev) => ({
      ...prev,
      type,
    }));
    scrollTo('generator');
  };

  // Smart payload parser when a user scans a QR code
  const handleLoadPayloadIntoGenerator = (payload: string) => {
    const trimmed = payload.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      setQrState((prev) => ({
        ...prev,
        type: 'url',
        url: trimmed,
      }));
    } else if (/^WIFI:/i.test(trimmed)) {
      // Parse WIFI:T:WPA;S:MySSID;P:MyPass;;
      const ssidMatch = trimmed.match(/S:([^;]+);/i);
      const passMatch = trimmed.match(/P:([^;]+);/i);
      const encMatch = trimmed.match(/T:([^;]+);/i);
      setQrState((prev) => ({
        ...prev,
        type: 'wifi',
        wifi: {
          ...prev.wifi,
          ssid: ssidMatch ? ssidMatch[1] : prev.wifi.ssid,
          password: passMatch ? passMatch[1] : '',
          encryption: encMatch && encMatch[1] === 'nopass' ? 'nopass' : 'WPA',
        },
      }));
    } else if (/^mailto:/i.test(trimmed)) {
      const emailOnly = trimmed.replace(/^mailto:/i, '').split('?')[0];
      setQrState((prev) => ({
        ...prev,
        type: 'email',
        email: {
          ...prev.email,
          email: emailOnly,
        },
      }));
    } else if (/^tel:/i.test(trimmed)) {
      const phoneOnly = trimmed.replace(/^tel:/i, '');
      setQrState((prev) => ({
        ...prev,
        type: 'phone',
        phone: {
          ...prev.phone,
          phone: phoneOnly,
        },
      }));
    } else {
      setQrState((prev) => ({
        ...prev,
        type: 'text',
        text: trimmed,
      }));
    }
    scrollTo('generator');
  };

  return (
    <div className="min-h-screen bg-white text-[#20243A] flex flex-col font-sans selection:bg-[#635BFF]/15 selection:text-[#635BFF]">
      {/* Sticky Header */}
      <Header
        onNavigateToGenerator={() => scrollTo('generator')}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenHostingerGuide={() => setIsHostingerGuideOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onGenerateClick={() => scrollTo('generator')}
          onExploreClick={() => scrollTo('types')}
        />

        {/* Top Responsive AdSense Leaderboard Placement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <AdPlaceholder format="leaderboard" />
        </div>

        {/* Main Workhorse: Live QR Generator */}
        <MainGenerator state={qrState} setState={setQrState} />

        {/* QR Code Type Explorer */}
        <TypeExplorer onSelectType={handleSelectTypeFromExplorer} />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Mid-Page Content Ad Slot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <AdPlaceholder format="leaderboard" />
        </div>

        {/* Features Section */}
        <Features />

        {/* Use Cases Section */}
        <UseCases />

        {/* Trust & Privacy Section */}
        <TrustPrivacy />

        {/* In-depth SEO Educational Content Section */}
        <SeoEducation />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollTo}
        onOpenHostingerGuide={() => setIsHostingerGuideOpen(true)}
      />

      {/* Built-in QR Scanner Modal (Camera or Image Upload) */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onLoadPayloadIntoGenerator={handleLoadPayloadIntoGenerator}
      />

      {/* Hostinger Upload & Deployment Checklist Modal */}
      <HostingerGuideModal
        isOpen={isHostingerGuideOpen}
        onClose={() => setIsHostingerGuideOpen(false)}
      />
    </div>
  );
}
