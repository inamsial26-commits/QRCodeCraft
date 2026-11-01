import React, { useState } from 'react';
import { Printer, X, LayoutTemplate, Sparkles, Check } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrDataUrl: string;
  defaultTitle?: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  qrDataUrl,
  defaultTitle = 'Scan Here with Your Phone',
}) => {
  const [headline, setHeadline] = useState(defaultTitle);
  const [subtext, setSubtext] = useState('Point your camera at this code to access immediately');
  const [template, setTemplate] = useState<'tent' | 'sign' | 'sticker'>('sign');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3678F6] text-white flex items-center justify-center shadow-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#151B35]">Print QR Display Card</h3>
              <p className="text-xs text-[#73798B]">Instant printable tent, sign, or display placard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration inputs */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
              Placard Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Free Wi-Fi Access / Scan For Menu"
              className="w-full px-3.5 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
              Instructions / Subtext
            </label>
            <input
              type="text"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              placeholder="e.g. Open Camera > Point at QR > Tap Link"
              className="w-full px-3.5 py-2 bg-white border border-[#E8EAF2] rounded-xl text-sm font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30"
            />
          </div>

          {/* Template choices */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-1">
              Display Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sign', label: 'Wall Sign / Counter' },
                { id: 'tent', label: 'Table Tent Stand' },
                { id: 'sticker', label: 'Minimal Sticker' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setTemplate(fmt.id as any)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    template === fmt.id
                      ? 'bg-[#635BFF] text-white border-[#635BFF] shadow-xs'
                      : 'bg-white text-[#20243A] border-[#E8EAF2] hover:bg-slate-50'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live print preview box */}
        <div className="p-6 bg-slate-100 rounded-2xl flex items-center justify-center my-4">
          <div
            id="printable-qr-card"
            className="bg-white border-2 border-slate-300 p-6 rounded-2xl shadow-sm text-center max-w-xs w-full flex flex-col items-center"
          >
            <h4 className="text-base font-extrabold text-[#151B35] mb-1 leading-snug">
              {headline}
            </h4>
            <p className="text-[11px] text-[#73798B] mb-4">
              {subtext}
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs mb-3">
              <img src={qrDataUrl} alt="QR Code" className="w-40 h-40 object-contain mx-auto" />
            </div>

            <p className="text-[10px] text-slate-400 font-medium">
              Powered by QRCodeCraft
            </p>
          </div>
        </div>

        {/* Print CTA */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#73798B] hover:text-[#151B35]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-6 bg-gradient-to-r from-[#635BFF] to-[#3678F6] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Open Print Dialog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
