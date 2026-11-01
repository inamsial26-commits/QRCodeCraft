import React from 'react';
import {
  Briefcase,
  UtensilsCrossed,
  GraduationCap,
  TrendingUp,
  Ticket,
  Palette,
} from 'lucide-react';

export const UseCases: React.FC = () => {
  const cases = [
    {
      title: 'Businesses',
      desc: 'Share website links, product catalogs, customer feedback surveys, and Google reviews on store counters, packaging, and invoices.',
      icon: Briefcase,
      badge: 'B2B & Retail',
    },
    {
      title: 'Restaurants & Cafes',
      desc: 'Replace physical touchpoints with contactless digital menus, instant guest Wi-Fi connection cards, and table ordering links.',
      icon: UtensilsCrossed,
      badge: 'Hospitality',
    },
    {
      title: 'Students & Educators',
      desc: 'Link research papers, syllabus PDFs, submission folders, and study groups directly on course handouts and lecture slides.',
      icon: GraduationCap,
      badge: 'Education',
    },
    {
      title: 'Growth Marketers',
      desc: 'Bridge offline campaigns—billboards, direct mail, conference badges, and magazines—to trackable UTM campaign landing pages.',
      icon: TrendingUp,
      badge: 'Advertising',
    },
    {
      title: 'Event Organizers',
      desc: 'Deliver seamless ticketing, venue GPS coordinates, live session schedules, and calendar invites directly to attendees’ phones.',
      icon: Ticket,
      badge: 'Events & Expos',
    },
    {
      title: 'Freelancers & Creators',
      desc: 'Embed a vCard or portfolio QR code on business cards, pitch decks, and invoices for instant client connection.',
      icon: Palette,
      badge: 'Creative',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#F7F8FC] border-b border-[#E8EAF2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] bg-white border border-[#E8EAF2] px-3.5 py-1 rounded-full shadow-2xs">
            Practical Applications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151B35] tracking-tight mt-3">
            QR Codes for Every Part of Your Life
          </h2>
          <p className="mt-3 text-base text-[#73798B]">
            From local coffee shops to international marketing campaigns, discover how industries connect physical and digital worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[#E8EAF2] p-7 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#73798B] bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#151B35] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#73798B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
