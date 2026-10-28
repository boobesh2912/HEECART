import React from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Hero({ selectedCategory, onExploreClick, onCorporateClick }) {
  // Find current category data or default to 'all'
  const currentCatData = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <section className="bg-gradient-to-b from-red-50/70 via-white to-white border-b border-slate-200 py-10 sm:py-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Category Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Category tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
              <Sparkles size={12} className="text-red-600" />
              <span>{currentCatData.name} Collection</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {currentCatData.heroTitle}
            </h1>

            {/* Dynamic Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {currentCatData.heroSubtitle}
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                <span>Free digital mockup on WhatsApp before engraving</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                <span>Bulk corporate slabs up to 45% discount</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                <span>Permanent fiber laser etching on metal & wood</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                <span>Automated courier tracking via BlueDart & TPC</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Explore {currentCatData.name}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onCorporateClick}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition-colors"
              >
                <span>Calculate Bulk Slab Quote</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-lg sm:text-xl font-black text-slate-900">50,000+</p>
                <p className="text-xs text-slate-500">Orders Delivered</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-slate-900">4.9 / 5</p>
                <p className="text-xs text-slate-500">Customer Rating</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-black text-slate-900">350+</p>
                <p className="text-xs text-slate-500">Corporate Clients</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Category Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 group">
                <img
                  src={currentCatData.heroImage}
                  alt={currentCatData.featuredProductTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                  {currentCatData.heroBadge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentCatData.featuredProductTitle}</h4>
                    <p className="text-[11px] text-slate-500">Free Logo Engraving & WhatsApp Mockup</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-red-600">{currentCatData.featuredPrice}</span>
                    <p className="text-[10px] text-emerald-600 font-bold">{currentCatData.featuredBulk}</p>
                  </div>
                </div>
              </div>

              {/* Sub features bar */}
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Free Pan-India Delivery on ₹999+</span>
                <span className="text-red-600 font-bold font-mono">Use code HEECART10</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
