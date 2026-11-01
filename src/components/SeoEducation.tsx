import React from 'react';
import { BookOpen, Check, HelpCircle } from 'lucide-react';

export const SeoEducation: React.FC = () => {
  return (
    <article className="py-16 lg:py-24 bg-[#F7F8FC] border-b border-[#E8EAF2]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] bg-white border border-[#E8EAF2] px-3.5 py-1 rounded-full shadow-2xs">
            Complete Educational Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            Everything You Need to Know About QR Codes
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            A comprehensive, beginner-to-advanced overview of QR technology, best practices, and printing guidelines.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-8 sm:p-10 shadow-xs space-y-10 text-[#20243A]">
          {/* 1. What is a QR Code? */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">01.</span> What Is a QR Code?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              A <strong>QR code</strong> (short for <em>Quick Response code</em>) is a two-dimensional matrix barcode invented in 1994 by Masahiro Hara of Denso Wave. Unlike traditional linear UPC barcodes that store alphanumeric data horizontally in stripes, a QR code stores data in both horizontal and vertical directions across a grid of black and white squares (called modules).
            </p>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              Because of this 2D structure, a single QR code can hold up to 7,089 numeric characters or 4,296 alphanumeric characters—hundreds of times more data than a standard supermarket barcode.
            </p>
          </section>

          {/* 2. How Do QR Codes Work? */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">02.</span> How Do QR Codes Work?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              When a smartphone camera points at a QR code, its computer vision software identifies three distinctive nested square patterns located in the corners, known as <strong>Finder Patterns</strong>. These squares allow the camera to instantly determine orientation, tilt angle, and physical size.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151B35] mb-1">
                  Finder & Timing Patterns
                </h4>
                <p className="text-xs text-[#73798B]">
                  Enable camera sensors to lock onto the matrix from any angle (360 degrees) and compensate for perspective distortion.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151B35] mb-1">
                  Reed-Solomon Error Correction
                </h4>
                <p className="text-xs text-[#73798B]">
                  A mathematical algorithm that restores corrupted or obscured modules up to 30%, making center logos possible.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How to Create a QR Code for a Website */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">03.</span> How to Create a QR Code for a Website?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              Creating a website QR code with QRCodeCraft takes just seconds:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-[#73798B]">
              <li>Select the <strong>URL / Link</strong> tab in the generator at the top of the page.</li>
              <li>Paste your complete destination URL (for example, <code>https://yourbrand.com/store</code>).</li>
              <li>Optionally customize your brand colors or add your logo.</li>
              <li>Click <strong>Download QR Code (PNG)</strong> or <strong>Vector SVG</strong> to save your file.</li>
            </ol>
          </section>

          {/* 4. Wi-Fi QR Code */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">04.</span> How to Create a Wi-Fi QR Code?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              A Wi-Fi QR code encodes the standard syntax <code>WIFI:T:WPA;S:NetworkName;P:SecretPassword;;</code>. When guests scan this card with an iPhone or Android phone, a notification appears saying <em>"Join Guest_WiFi Network?"</em>. One tap securely logs them into the network without exposing your raw password on a paper notice.
            </p>
          </section>

          {/* 5. WhatsApp QR Code */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">05.</span> How to Create a WhatsApp QR Code?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              Enter your country code, phone number, and an optional pre-filled conversation starter (such as <em>"Hello! I am inquiring about pricing"</em>). The code encodes a universal <code>https://wa.me/&lt;number&gt;?text=...</code> link that immediately opens a WhatsApp conversation window without requiring the sender to save your contact first.
            </p>
          </section>

          {/* 6. Are QR Codes Free and Do They Expire? */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">06.</span> Are QR Codes Free and Do They Expire?
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              <strong>Static QR codes generated by QRCodeCraft never expire.</strong> Because the encoded content (such as a website link, phone number, or Wi-Fi password) is etched permanently into the black-and-white pixel pattern itself, the QR code will remain functional forever as long as your destination link or Wi-Fi network continues to exist. There are no monthly fees or expiration dates.
            </p>
          </section>

          {/* 7. How to Scan */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-[#151B35] flex items-center gap-2">
              <span className="text-[#635BFF]">07.</span> How to Scan QR Codes on Mobile Devices
            </h3>
            <p className="text-sm sm:text-base text-[#73798B] leading-relaxed">
              Modern smartphones do not require third-party scanning apps:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-[#73798B]">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
                <span><strong>iOS (iPhone & iPad):</strong> Open the built-in Camera app, point it steadily at the QR code, and tap the yellow banner that appears on your screen.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
                <span><strong>Android:</strong> Open the native Camera app or swipe down the Quick Settings menu to tap <em>"Scan QR code"</em> or Google Lens.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
};
