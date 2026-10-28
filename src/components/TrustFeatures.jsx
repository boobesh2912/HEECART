import React from 'react';
import { Eye, ShieldCheck, Zap, PackageCheck, Award, MessageCircle } from 'lucide-react';
import { CORPORATE_CLIENTS } from '../data/products';

export default function TrustFeatures() {
  const trustPillars = [
    {
      icon: Eye,
      title: 'WhatsApp Mockup First',
      desc: 'Zero surprises. We design a photorealistic digital preview and await your 100% approval before engraving or printing.'
    },
    {
      icon: Zap,
      title: 'Fiber Laser Precision',
      desc: 'Permanent, scratch-resistant fiber laser engraving on metal, wood, and acrylic that withstands years of daily use.'
    },
    {
      icon: PackageCheck,
      title: 'Pan-India Express Safe Shipping',
      desc: 'Custom engineered shock-absorbent thermo-molded packaging delivered securely across 19,000+ Indian postal codes.'
    },
    {
      icon: ShieldCheck,
      title: '100% Replacement Warranty',
      desc: 'If anything arrives damaged in transit or differs from your approved design, we replace it instantly with zero friction.'
    }
  ];

  return (
    <section className="py-12 bg-[#0c0d13] border-b border-[#1b1e2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#12141c] border border-[#212433] hover:border-red-600/40 transition-all duration-300 hover:shadow-card-dark group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Strip (Giftana inspired) */}
        <div className="mt-12 pt-8 border-t border-[#1b1e2a]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left flex-shrink-0">
              <span className="text-[11px] font-bold text-red-500 tracking-wider uppercase">Enterprise Trust</span>
              <p className="text-sm font-semibold text-slate-200">
                Trusted by 350+ Leading Organizations For Corporate Gifting
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {CORPORATE_CLIENTS.map((client, idx) => (
                <div 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-[#161822] border border-[#272a39] flex items-center gap-2"
                >
                  <span className="text-xs font-black tracking-wider text-slate-300 font-mono">
                    {client.logo}
                  </span>
                  <span className="text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded font-medium">
                    {client.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
