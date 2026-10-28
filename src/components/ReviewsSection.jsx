import React from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';

export default function ReviewsSection({ reviews = [] }) {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-red-600 font-bold text-xs uppercase tracking-wider">
            Verified Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Loved By Couples, Families & Enterprises
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real experiences from people who trusted Heecart for their milestones and corporate hampers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4 hover:border-red-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.stars || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                    {rev.verified && (
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">{rev.role}</p>
                </div>

                <span className="text-[10px] text-red-600 font-semibold max-w-[120px] truncate text-right">
                  {rev.productName || 'Heecart Gift'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
