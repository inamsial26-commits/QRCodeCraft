import React, { useState } from 'react';
import { QRState, QRType } from '../../types/qr';
import { INITIAL_QR_STATE, QR_TYPES } from '../../constants/qrData';
import { QRTypeSelector } from './QRTypeSelector';
import { QRForm } from './QRForm';
import { QRCustomizer } from './QRCustomizer';
import { QRPreview } from './QRPreview';
import { Sparkles, SlidersHorizontal, FileEdit } from 'lucide-react';

interface MainGeneratorProps {
  state: QRState;
  setState: React.Dispatch<React.SetStateAction<QRState>>;
}

export const MainGenerator: React.FC<MainGeneratorProps> = ({ state, setState }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  const handleSelectType = (type: QRType) => {
    setState((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleFormChange = <K extends keyof QRState>(key: K, value: QRState[K]) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setState({
      ...INITIAL_QR_STATE,
      type: state.type, // keep current type
    });
  };

  const currentTypeMeta = QR_TYPES.find((t) => t.id === state.type);

  return (
    <section id="generator" className="py-12 lg:py-16 bg-[#F7F8FC] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8EAF2] shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#635BFF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#151B35]">
              Interactive QR Studio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight">
            Design & Download Your Custom QR Code
          </h2>
          <p className="mt-2 text-base text-[#73798B]">
            Select your content type, fill in your information, customize the visual palette, and download in crystal-clear quality.
          </p>
        </div>

        {/* Generator Main Workspace: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: QR Configuration */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8EAF2] p-6 sm:p-7 shadow-sm">
            {/* 1. Type selector pills */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#73798B] mb-2.5">
                Step 1: Select QR Code Type
              </label>
              <QRTypeSelector activeType={state.type} onSelectType={handleSelectType} />
            </div>

            {/* Sub-header info about active type */}
            <div className="mb-6 p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#151B35]">
                  {currentTypeMeta?.title}
                </h4>
                <p className="text-xs text-[#73798B]">
                  {currentTypeMeta?.description}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#635BFF] bg-white px-2.5 py-1 rounded-lg border border-[#E8EAF2]">
                {currentTypeMeta?.badge}
              </span>
            </div>

            {/* Toggle Tabs: Content Form vs Design Customization */}
            <div className="flex border-b border-[#E8EAF2] mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'content'
                    ? 'border-[#635BFF] text-[#635BFF]'
                    : 'border-transparent text-[#73798B] hover:text-[#151B35]'
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Enter Content</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('design')}
                className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'design'
                    ? 'border-[#635BFF] text-[#635BFF]'
                    : 'border-transparent text-[#73798B] hover:text-[#151B35]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Colors & Logo</span>
                {state.design.logoUrl && (
                  <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
                )}
              </button>
            </div>

            {/* Dynamic Content View */}
            {activeTab === 'content' ? (
              <QRForm state={state} onChange={handleFormChange} />
            ) : (
              <QRCustomizer
                design={state.design}
                onChange={(d) => handleFormChange('design', d)}
              />
            )}
          </div>

          {/* RIGHT PANEL: Live QR Preview */}
          <div className="lg:col-span-5 sticky top-24">
            <QRPreview state={state} onReset={handleReset} />
          </div>
        </div>
      </div>
    </section>
  );
};
