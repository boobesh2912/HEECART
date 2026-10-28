import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Award, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onCorporateClick }) {
  return (
    <section className="bg-gradient-to-b from-red-50/60 to-white border-b border-slate-200 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear, Honest E-Commerce Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Personalized Gifts & <br />
              <span className="text-red-600">
                Custom Corporate Hampers
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We personalize corporate onboarding hampers, vacuum temperature bottles, leather diary sets, and handcrafted photo frames with your company logo or custom recipient names.
            </p>

            {/* Clear value points */}
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
                <span>Pan-India express delivery with BlueDart</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onCorporateClick}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Shop Corporate Hampers</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
              >
                <span>View All Personalized Gifts</span>
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

          {/* Right Column: Clean Promo Showcase Cards */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
              
              {/* Main Banner Showcase */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
                  alt="Corporate Executive Welcome Hamper"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                  Bestseller Corporate Hamper
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">The Royale Executive Hamper</h4>
                    <p className="text-[11px] text-slate-500">LED Bottle + Diary + Pen + USB</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-red-600">₹1,899</span>
                    <p className="text-[10px] text-emerald-600 font-bold">Bulk: ₹1,099</p>
                  </div>
                </div>
              </div>

              {/* Secondary Promo Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                    alt="Photo Mosaic Frame"
                    className="w-11 h-11 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">Mosaic Frame</p>
                    <p className="text-[11px] text-red-600 font-bold">From ₹1,199</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=200&auto=format&fit=crop"
                    alt="Smart Temperature Flask"
                    className="w-11 h-11 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">Smart LED Flask</p>
                    <p className="text-[11px] text-red-600 font-bold">From ₹599</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
