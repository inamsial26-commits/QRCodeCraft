import React from 'react';
import {
  Globe,
  FileText,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Contact2,
  MapPin,
  Calendar,
  Share2,
  Youtube,
} from 'lucide-react';
import { QRType } from '../../types/qr';

interface QRTypeSelectorProps {
  activeType: QRType;
  onSelectType: (type: QRType) => void;
}

const TYPE_CONFIG = [
  { id: 'url', label: 'URL / Link', icon: Globe },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: Contact2 },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
] as const;

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ activeType, onSelectType }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {TYPE_CONFIG.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectType(item.id as QRType)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border text-left ${
                isActive
                  ? 'bg-[#635BFF] text-white border-[#635BFF] shadow-xs'
                  : 'bg-white text-[#20243A] border-[#E8EAF2] hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#635BFF]'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
