import React, { useState, useRef, useEffect } from 'react';
import { decodeQRFromImage, decodeQRFromImageData } from '../utils/qrScanner';
import {
  Camera,
  Upload,
  X,
  ScanLine,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  VideoOff,
} from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadPayloadIntoGenerator: (data: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onLoadPayloadIntoGenerator,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera'>('upload');
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera on unmount or mode switch
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setScannedResult(null);
      setErrorMessage(null);
    }
  }, [isOpen]);

  const startCamera = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsScanning(true);
        requestAnimationFrame(tickCamera);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setErrorMessage(
        'Could not access camera. Please allow camera permissions or upload an image instead.'
      );
      setIsScanning(false);
    }
  };

  const tickCamera = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const decoded = decodeQRFromImageData(imgData);
        if (decoded) {
          setScannedResult(decoded);
          stopCamera();
          return;
        }
      }
    }
    animationFrameRef.current = requestAnimationFrame(tickCamera);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage(null);
    setScannedResult(null);

    try {
      const result = await decodeQRFromImage(file);
      if (result) {
        setScannedResult(result);
      } else {
        setErrorMessage(
          'No readable QR code found in this image. Please ensure the QR is well-lit and not blurry.'
        );
      }
    } catch {
      setErrorMessage('Failed to decode image file. Please try another image.');
    }
  };

  const handleCopy = () => {
    if (!scannedResult) return;
    navigator.clipboard.writeText(scannedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3678F6] text-white flex items-center justify-center shadow-xs">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#151B35]">Scan & Verify QR Code</h3>
              <p className="text-xs text-[#73798B]">Instant client-side QR decoder</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveMode('upload');
            }}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-[#151B35] shadow-xs'
                : 'text-[#73798B] hover:text-[#151B35]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('camera');
              startCamera();
            }}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'camera'
                ? 'bg-white text-[#151B35] shadow-xs'
                : 'text-[#73798B] hover:text-[#151B35]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera</span>
          </button>
        </div>

        {/* Error alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Body content based on mode */}
        {activeMode === 'upload' && !scannedResult && (
          <div className="py-6 px-4 border-2 border-dashed border-[#E8EAF2] hover:border-[#635BFF] rounded-2xl bg-[#F7F8FC] text-center transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="qr-scan-file-input"
            />
            <label htmlFor="qr-scan-file-input" className="cursor-pointer block space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#151B35]">
                Click or Drop QR Image to Scan
              </p>
              <p className="text-xs text-[#73798B]">
                Supports PNG, JPG, WebP, SVG screenshots
              </p>
            </label>
          </div>
        )}

        {activeMode === 'camera' && !scannedResult && (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" />
            {isScanning && (
              <div className="absolute inset-8 border-2 border-[#635BFF] rounded-xl pointer-events-none flex flex-col justify-between p-2">
                <div className="h-0.5 bg-[#635BFF] animate-pulse w-full" />
                <p className="text-[11px] text-white/90 bg-black/60 px-2 py-0.5 rounded text-center mx-auto">
                  Align QR code inside this box
                </p>
              </div>
            )}
            {!isScanning && (
              <div className="text-slate-400 text-xs flex flex-col items-center gap-2">
                <VideoOff className="w-6 h-6" />
                <span>Starting camera...</span>
              </div>
            )}
          </div>
        )}

        {/* Scanned Result Card */}
        {scannedResult && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>QR Code Decoded Successfully!</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-100 font-mono text-xs text-slate-800 break-all max-h-40 overflow-y-auto select-all">
                {scannedResult}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-3 bg-white border border-[#E8EAF2] text-[#151B35] hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#635BFF]" />
                <span>{copied ? 'Copied!' : 'Copy Data'}</span>
              </button>

              {scannedResult.startsWith('http') && (
                <a
                  href={scannedResult}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-white border border-[#E8EAF2] text-[#635BFF] hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open URL</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  onLoadPayloadIntoGenerator(scannedResult);
                  stopCamera();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#635BFF] to-[#3678F6] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Edit in Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setScannedResult(null);
                  if (activeMode === 'camera') startCamera();
                }}
                className="text-xs font-semibold text-[#73798B] hover:text-[#151B35] underline"
              >
                Scan Another Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
