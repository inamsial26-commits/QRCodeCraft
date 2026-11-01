import React, { useRef } from 'react';
import { QRDesignConfig, ErrorCorrectionLevel } from '../../types/qr';
import { COLOR_PRESETS, PRESET_LOGOS } from '../../constants/qrData';
import { Upload, X, ShieldAlert, Sliders, Palette, Image as ImageIcon } from 'lucide-react';
import { getContrastRatio } from '../../utils/qrPayload';

interface QRCustomizerProps {
  design: QRDesignConfig;
  onChange: (design: QRDesignConfig) => void;
}

export const QRCustomizer: React.FC<QRCustomizerProps> = ({ design, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const contrast = getContrastRatio(design.fgColor, design.bgColor === 'transparent' ? '#FFFFFF' : design.bgColor);
  const isLowContrast = contrast < 3.2;

  const handleColorPreset = (fg: string, bg: string) => {
    onChange({
      ...design,
      fgColor: fg,
      bgColor: bg,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange({
        ...design,
        logoUrl: dataUrl,
        errorCorrectionLevel: 'H', // Enforce high error correction when logo is active
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({
      ...design,
      logoUrl: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 pt-4 border-t border-[#E8EAF2]">
      {/* SECTION: Colors & Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#151B35]">
            <Palette className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Colors & Theme</span>
          </div>
          <span className="text-[11px] text-[#73798B] font-mono">
            Contrast: {contrast.toFixed(1)}:1
          </span>
        </div>

        {/* Contrast Warning */}
        {isLowContrast && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Low contrast detected ({contrast.toFixed(1)}:1).</strong> Smartphones may struggle to scan this QR code. For maximum scan reliability, keep contrast above 3.5:1.
            </p>
          </div>
        )}

        {/* Color pickers */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#73798B] mb-1">
              QR Foreground Color
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E8EAF2] rounded-xl">
              <input
                type="color"
                value={design.fgColor}
                onChange={(e) => onChange({ ...design, fgColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
              />
              <input
                type="text"
                value={design.fgColor.toUpperCase()}
                onChange={(e) => onChange({ ...design, fgColor: e.target.value })}
                className="w-full text-xs font-mono font-bold text-[#151B35] focus:outline-none uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#73798B] mb-1">
              Background Color
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E8EAF2] rounded-xl">
              <input
                type="color"
                value={design.bgColor === 'transparent' ? '#ffffff' : design.bgColor}
                onChange={(e) => onChange({ ...design, bgColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
              />
              <input
                type="text"
                value={design.bgColor.toUpperCase()}
                onChange={(e) => onChange({ ...design, bgColor: e.target.value })}
                className="w-full text-xs font-mono font-bold text-[#151B35] focus:outline-none uppercase"
              />
            </div>
          </div>
        </div>

        {/* Quick color preset chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-[#73798B] mr-1">Presets:</span>
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleColorPreset(preset.fg, preset.bg)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-[#E8EAF2] hover:border-slate-300 bg-white text-[11px] font-semibold text-[#20243A] cursor-pointer transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                style={{ backgroundColor: preset.fg }}
              />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: Logo & Branding */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#151B35]">
            <ImageIcon className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Center Logo & Branding</span>
          </div>
          {design.logoUrl && (
            <button
              type="button"
              onClick={removeLogo}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E5484D] hover:underline cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Remove Logo</span>
            </button>
          )}
        </div>

        {/* Upload Custom Logo Button */}
        <div className="mb-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="qr-logo-upload"
          />
          <label
            htmlFor="qr-logo-upload"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-dashed border-[#635BFF]/40 hover:border-[#635BFF] bg-[#635BFF]/5 hover:bg-[#635BFF]/10 text-[#635BFF] text-xs font-bold rounded-xl cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>{design.logoUrl ? 'Replace Uploaded Logo' : 'Upload Custom Logo (PNG / SVG)'}</span>
          </label>
        </div>

        {/* Preset Icons Selection */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-[#73798B] block">Or choose a popular symbol:</span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PRESET_LOGOS.map((logo) => {
              const isSelected = design.logoUrl === logo.dataUrl;
              return (
                <button
                  key={logo.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...design,
                      logoUrl: logo.dataUrl,
                      errorCorrectionLevel: 'H',
                    })
                  }
                  title={logo.name}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#635BFF] bg-[#635BFF]/10 ring-2 ring-[#635BFF]/20'
                      : 'border-[#E8EAF2] hover:border-slate-300 bg-white'
                  }`}
                >
                  <img src={logo.dataUrl} alt={logo.name} className="w-6 h-6 object-contain" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo Size Slider if logo is present */}
        {design.logoUrl && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#151B35]">Logo Size in QR</span>
              <span className="font-mono text-[#73798B]">{design.logoSizePercent}%</span>
            </div>
            <input
              type="range"
              min="16"
              max="28"
              value={design.logoSizePercent}
              onChange={(e) =>
                onChange({
                  ...design,
                  logoSizePercent: parseInt(e.target.value, 10),
                })
              }
              className="w-full accent-[#635BFF] cursor-pointer"
            />
            <p className="text-[10px] text-[#73798B]">
              Auto-restricted to safe range (16% - 28%) to prevent blocking QR finder patterns.
            </p>
          </div>
        )}
      </div>

      {/* SECTION: Precision Geometry & Settings */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#151B35] mb-3">
          <Sliders className="w-3.5 h-3.5 text-[#635BFF]" />
          <span>Margin & Error Correction</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Error Correction Level */}
          <div>
            <label className="block text-[11px] font-semibold text-[#73798B] mb-1">
              Error Correction Level
            </label>
            <select
              value={design.logoUrl ? 'H' : design.errorCorrectionLevel}
              disabled={!!design.logoUrl}
              onChange={(e) =>
                onChange({
                  ...design,
                  errorCorrectionLevel: e.target.value as ErrorCorrectionLevel,
                })
              }
              className="w-full px-3 py-2 bg-white border border-[#E8EAF2] rounded-xl text-xs font-medium text-[#20243A] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="L">Low (7% recovery, best density)</option>
              <option value="M">Medium (15% recovery, standard)</option>
              <option value="Q">Quartile (25% recovery)</option>
              <option value="H">High (30% recovery, logo-ready)</option>
            </select>
            {design.logoUrl && (
              <p className="text-[10px] text-[#635BFF] font-medium mt-1">
                Locked to High (H) because a center logo is active.
              </p>
            )}
          </div>

          {/* Margin / Quiet Zone */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-[#73798B]">
                Quiet Zone Margin
              </label>
              <span className="text-[11px] font-mono text-[#73798B]">
                {design.margin} modules
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={design.margin}
              onChange={(e) =>
                onChange({ ...design, margin: parseInt(e.target.value, 10) })
              }
              className="w-full accent-[#635BFF] cursor-pointer mt-1"
            />
            <p className="text-[10px] text-[#73798B] mt-0.5">
              Standard 4 modules is recommended for clean camera detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
