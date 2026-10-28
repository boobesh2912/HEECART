import React from 'react';
import { Eye, ShieldCheck, Zap, Truck, Award } from 'lucide-react';

export default function TrustFeatures() {
  const trustPillars = [
    {
      icon: Eye,
      title: 'WhatsApp Mockup First',
      desc: 'We share a photorealistic digital preview on WhatsApp and wait for your 100% approval before printing or engraving.'
    },
    {
      icon: Zap,
      title: 'Permanent Laser Etching',
      desc: 'Scratch-resistant fiber laser engraving on metal, wood, and acrylic that withstands years of everyday use.'
    },
    {
      icon: Truck,
      title: 'Pan-India Express Air Shipping',
      desc: 'Multi-layer protective thermo-molded packaging delivered securely across 19,000+ pin codes in India.'
    },
    {
      icon: ShieldCheck,
      title: '100% Replacement Warranty',
      desc: 'If anything arrives damaged in transit or differs from your approved design, we replace it immediately with zero hassle.'
    }
  ];

  const clients = ['Infoserve', 'Cognizant', 'BrandPulse', 'Titanium Wealth', 'Apex Global', 'Zenith Life'];

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Strip (Printmine style) */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center md:text-left">
            Trusted by corporate teams across India:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {clients.map((c, i) => (
              <span key={i} className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                {c}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
