import React, { useState } from 'react';
import { UploadCloud, Check, Copy, ExternalLink, X, Server, Folder, FileCode, CheckCircle2 } from 'lucide-react';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedHtaccess, setCopiedHtaccess] = useState(false);

  if (!isOpen) return null;

  const buildCmd = 'npm run build';
  const htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>`;

  const copyCommand = () => {
    navigator.clipboard.writeText(buildCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyHtaccess = () => {
    navigator.clipboard.writeText(htaccessCode);
    setCopiedHtaccess(true);
    setTimeout(() => setCopiedHtaccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E8EAF2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#151B35]">Hostinger Deployment Guide</h3>
              <p className="text-xs text-[#73798B]">How to upload and publish QRCodeCraft on Hostinger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Simple Steps */}
        <div className="space-y-5">
          {/* Step 1 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-7 h-7 rounded-full bg-[#635BFF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-[#151B35]">
                Generate the Production Build
              </h4>
              <p className="text-xs text-[#73798B]">
                Run the build command in your terminal. This compiles the entire application into a fast, standalone <code className="text-[#635BFF] font-semibold bg-slate-100 px-1 py-0.5 rounded">dist/</code> folder.
              </p>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded-xl text-xs font-mono text-slate-200">
                <span className="text-[#635BFF]">$</span>
                <span className="flex-1">{buildCmd}</span>
                <button
                  type="button"
                  onClick={copyCommand}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-sans text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-7 h-7 rounded-full bg-[#635BFF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1 space-y-1.5">
              <h4 className="text-sm font-bold text-[#151B35]">
                Open Hostinger File Manager
              </h4>
              <p className="text-xs text-[#73798B] leading-relaxed">
                Log into your <strong>Hostinger hPanel</strong>, select your domain under <strong>Websites</strong>, and open <strong>File Manager</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#20243A] flex items-center gap-2 font-mono">
                <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Navigate to: <strong>public_html/</strong></span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-7 h-7 rounded-full bg-[#635BFF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-[#151B35]">
                Upload Files from <code>dist/</code>
              </h4>
              <p className="text-xs text-[#73798B] leading-relaxed">
                Upload all contents of your <code className="font-semibold text-slate-800">dist/</code> directory directly into <code className="font-semibold text-slate-800">public_html/</code>. You should see:
              </p>
              <ul className="text-xs text-[#73798B] space-y-1 list-disc pl-5">
                <li><code className="text-[#151B35] font-semibold">index.html</code> (Main HTML document)</li>
                <li><code className="text-[#151B35] font-semibold">assets/</code> (Compiled JS, CSS, and fonts)</li>
                <li><code className="text-[#151B35] font-semibold">.htaccess</code> (Pre-configured for SPA routing, gzip, and caching)</li>
                <li><code className="text-[#151B35] font-semibold">robots.txt</code> &amp; <code className="text-[#151B35] font-semibold">sitemap.xml</code> (SEO indexing)</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-7 h-7 rounded-full bg-[#16A36A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ✓
            </div>
            <div className="flex-1 space-y-1.5">
              <h4 className="text-sm font-bold text-[#16A36A]">
                Done! Your Website Is Live Worldwide
              </h4>
              <p className="text-xs text-[#73798B]">
                Your QR generator is now live with lightning-fast local processing, responsive mobile design, and zero server backend dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Pre-configured .htaccess reminder */}
        <div className="mt-6 p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#151B35]">
              <FileCode className="w-4 h-4 text-[#635BFF]" />
              <span>Included Hostinger .htaccess file</span>
            </div>
            <button
              type="button"
              onClick={copyHtaccess}
              className="text-[11px] font-bold text-[#635BFF] hover:underline flex items-center gap-1"
            >
              {copiedHtaccess ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedHtaccess ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#73798B]">
            We have already pre-configured <code className="font-semibold text-slate-800">public/.htaccess</code> in this project so it will be automatically copied into your <code className="font-semibold text-slate-800">dist/</code> build folder.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-[#E8EAF2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-[#151B35] hover:bg-[#20243A] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
