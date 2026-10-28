import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, Award } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#0c0d14] border-b border-[#1b1e2a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-bold">
            <Award size={13} />
            <span>VERIFIED BUYER EXPERIENCES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Loved By Over 50,000+ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
              Couples, Families & Enterprises
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Read real feedback from people who trusted Heecart for their most cherished milestones and corporate bulk events.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#12141d] border border-[#232738] hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between shadow-card-dark relative group"
            >
              <div className="space-y-4">
                {/* Top Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 mt-6 border-t border-[#1f2332] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-red-500/40 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate">{rev.name}</h4>
                    {rev.verified && (
                      <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{rev.role}</p>
                  <span className="text-[10px] font-medium text-red-400 block truncate mt-0.5">
                    {rev.type}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
