import React, { useEffect, useRef, useState } from 'react';
import { QRState } from '../../types/qr';
import { formatQRPayload, getContrastRatio } from '../../utils/qrPayload';
import {
  renderQRToCanvas,
  generateHighResPNG,
  generateSVGString,
  downloadBlob,
  copyCanvasToClipboard,
} from '../../utils/qrGenerator';
import { PrintModal } from '../PrintModal';
import {
  Download,
  Copy,
  RotateCcw,
  Share2,
  Check,
  AlertTriangle,
  QrCode,
  Scan,
  ExternalLink,
  Layers,
  Printer,
} from 'lucide-react';

interface QRPreviewProps {
  state: QRState;
  onReset: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ state, onReset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadSize, setDownloadSize] = useState<number>(1024);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const payload = formatQRPayload(state);
  const contrast = getContrastRatio(
    state.design.fgColor,
    state.design.bgColor === 'transparent' ? '#FFFFFF' : state.design.bgColor
  );
  const isContrastWarning = contrast < 3.2;

  // Re-render canvas live whenever state or design changes
  useEffect(() => {
    if (!canvasRef.current) return;
    renderQRToCanvas(canvasRef.current, payload, state.design).catch((err) => {
      console.error('Failed to render QR:', err);
    });
  }, [payload, state.design]);

  // Handle PNG Download
  const handleDownloadPNG = async () => {
    try {
      setIsGeneratingDownload(true);
      const dataUrl = await generateHighResPNG(payload, state.design, downloadSize);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      downloadBlob(blob, `qrcraft-${state.type}-${downloadSize}px.png`);
    } catch (err) {
      console.error('Download PNG failed:', err);
    } finally {
      setIsGeneratingDownload(false);
    }
  };

  // Handle SVG Download
  const handleDownloadSVG = async () => {
    try {
      setIsGeneratingDownload(true);
      const svgString = await generateSVGString(payload, state.design);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      downloadBlob(blob, `qrcraft-${state.type}.svg`);
    } catch (err) {
      console.error('Download SVG failed:', err);
    } finally {
      setIsGeneratingDownload(false);
    }
  };

  // Handle Copy Image
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    const success = await copyCanvasToClipboard(canvasRef.current);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback: copy payload text
      navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle Share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QRCodeCraft - My Custom QR Code',
          text: `Check out this QR code for: ${payload}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share dismissed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A36A]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#151B35]">
              Live QR Preview
            </h3>
          </div>
          <button
            onClick={() => setShowPayloadModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#554de0] cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Test Payload</span>
          </button>
        </div>

        {/* Live Canvas Area with Card Frame */}
        <div className="relative mx-auto my-2 p-6 bg-[#F7F8FC] rounded-2xl border border-[#E8EAF2] flex flex-col items-center justify-center">
          <div
            className="p-4 rounded-xl shadow-xs transition-colors duration-200"
            style={{
              backgroundColor:
                state.design.bgColor === 'transparent' ? '#FFFFFF' : state.design.bgColor,
            }}
          >
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="max-w-[260px] sm:max-w-[300px] w-full h-auto aspect-square object-contain block mx-auto"
            />
          </div>

          {/* Contrast warning */}
          {isContrastWarning && (
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Low color contrast. May be hard to scan.</span>
            </div>
          )}

          {/* Quick Payload snippet label */}
          <p className="mt-3 text-[11px] font-mono text-[#73798B] truncate max-w-xs text-center px-2">
            {payload}
          </p>
        </div>

        {/* Resolution selector */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#73798B] flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#635BFF]" />
            Export Resolution
          </span>
          <div className="inline-flex p-0.5 bg-slate-100 rounded-lg">
            {[
              { size: 512, label: '512px' },
              { size: 1024, label: '1024px' },
              { size: 2048, label: '2048px (HD)' },
            ].map((opt) => (
              <button
                key={opt.size}
                type="button"
                onClick={() => setDownloadSize(opt.size)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  downloadSize === opt.size
                    ? 'bg-white text-[#151B35] shadow-2xs'
                    : 'text-[#73798B] hover:text-[#151B35]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-2.5">
        {/* Primary Download Button */}
        <button
          onClick={handleDownloadPNG}
          disabled={isGeneratingDownload}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-[#635BFF] to-[#3678F6] hover:from-[#554de0] hover:to-[#2b6be0] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          <Download className="w-4 h-4" />
          <span>{isGeneratingDownload ? 'Generating File...' : 'Download QR Code (PNG)'}</span>
        </button>

        {/* Secondary download & tools grid */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleDownloadSVG}
            disabled={isGeneratingDownload}
            className="py-2.5 px-2 bg-white hover:bg-[#F7F8FC] border border-[#E8EAF2] text-[#151B35] text-xs font-bold rounded-xl shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#3678F6]" />
            <span>Vector SVG</span>
          </button>

          <button
            onClick={() => setShowPrintModal(true)}
            className="py-2.5 px-2 bg-white hover:bg-[#F7F8FC] border border-[#E8EAF2] text-[#151B35] text-xs font-bold rounded-xl shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#16A36A]" />
            <span>Print Card</span>
          </button>

          <button
            onClick={handleCopyImage}
            className="py-2.5 px-2 bg-white hover:bg-[#F7F8FC] border border-[#E8EAF2] text-[#151B35] text-xs font-bold rounded-xl shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                <span className="text-[#16A36A]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#635BFF]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Tertiary action strip: Reset & Share */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8EAF2] text-xs">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[#73798B] hover:text-[#E5484D] font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-[#635BFF] hover:text-[#554de0] font-semibold transition-colors cursor-pointer"
          >
            {shareSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                <span className="text-[#16A36A]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share QR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Print Modal */}
      <PrintModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        qrDataUrl={canvasRef.current ? canvasRef.current.toDataURL('image/png') : ''}
        defaultTitle={
          state.type === 'wifi'
            ? `Connect to ${state.wifi.ssid || 'Wi-Fi'}`
            : state.type === 'vcard'
            ? `Contact: ${state.vcard.firstName || ''} ${state.vcard.lastName || ''}`.trim()
            : 'Scan with Your Smartphone Camera'
        }
      />

      {/* Test Payload Modal / Drawer */}
      {showPayloadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151B35]">Scanned QR Payload</h3>
                  <p className="text-xs text-[#73798B]">This is the exact string mobile phones will detect</p>
                </div>
              </div>
              <button
                onClick={() => setShowPayloadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Decoded content box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 break-all max-h-60 overflow-y-auto whitespace-pre-wrap select-all">
              {payload}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-xs text-[#73798B]">
                Length: <span className="font-mono font-bold text-[#151B35]">{payload.length}</span> bytes
              </div>
              <div className="flex items-center gap-2">
                {payload.startsWith('http') && (
                  <a
                    href={payload}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#635BFF]/10 text-[#635BFF] hover:bg-[#635BFF]/20 text-xs font-bold rounded-lg transition-colors"
                  >
                    <span>Test Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(payload);
                    setShowPayloadModal(false);
                  }}
                  className="px-4 py-2 bg-[#151B35] hover:bg-[#20243A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Copy Payload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
