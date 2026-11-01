import React from 'react';

interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'leaderboard',
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#73798B]/70 mb-1.5">
        Advertisement / Sponsored
      </span>
      {format === 'leaderboard' ? (
        <div className="w-full max-w-[728px] h-[90px] min-h-[90px] rounded-xl border border-dashed border-[#E8EAF2] bg-[#F7F8FC] flex items-center justify-center p-3 text-center text-xs text-[#73798B]/80 shadow-2xs">
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-[#151B35]/70">728×90 Responsive Leaderboard Ad Slot</p>
            <p className="text-[11px] text-[#73798B]/60">Google AdSense / Publisher Network Ready</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[300px] h-[250px] min-h-[250px] rounded-xl border border-dashed border-[#E8EAF2] bg-[#F7F8FC] flex items-center justify-center p-4 text-center text-xs text-[#73798B]/80 shadow-2xs">
          <div className="space-y-1">
            <p className="font-semibold text-xs text-[#151B35]/70">300×250 Medium Rectangle</p>
            <p className="text-[11px] text-[#73798B]/60">Google AdSense / Publisher Network Ready</p>
          </div>
        </div>
      )}
    </div>
  );
};
