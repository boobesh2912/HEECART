import React from 'react';
import { Sparkles, ShieldCheck, Truck, Clock, ArrowRight, CheckCircle2, Award, Users, Star } from 'lucide-react';

export default function Hero({ onExploreClick, onCorporateClick }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#1b1e28]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-red-700/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Persuasive Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>India’s Dedicated Bespoke & Corporate Gifting House</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Handcrafted Memories. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                Gifts That Leave a Lasting Mark.
              </span>
            </h1>

            {/* Persuasive Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Whether celebrating love with a breathtaking <strong className="text-white font-semibold">mosaic photo frame</strong> & illuminated Spotify acrylic, or commanding boardroom respect with <strong className="text-white font-semibold">custom laser-etched corporate hampers</strong> — Heecart transforms sentiment into pristine physical keepsakes.
            </p>

            {/* Value Proposition Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-500 flex-shrink-0" />
                <span><strong className="text-white font-medium">Free Digital Mockup</strong> sent before production</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-500 flex-shrink-0" />
                <span><strong className="text-white font-medium">Permanent Laser Etching</strong> & Ultra-HD UV Print</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-500 flex-shrink-0" />
                <span><strong className="text-white font-medium">Bulk Corporate Slabs</strong> up to 45% discount</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 size={16} className="text-red-500 flex-shrink-0" />
                <span><strong className="text-white font-medium">Doorstep Multi-Drop</strong> for distributed teams</span>
              </div>
            </div>

            {/* Dual High-Conversion Call To Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm tracking-wide shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Browse Personalized Catalog</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onCorporateClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#14161f] hover:bg-[#1a1e2c] text-white font-semibold text-sm border border-[#2b3042] hover:border-red-600/60 transition-all flex items-center justify-center gap-2"
              >
                <Award size={17} className="text-red-400" />
                <span>Corporate & Bulk Gifting RFQ</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-[#1e222e] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">50,000+</p>
                <p className="text-[11px] sm:text-xs text-slate-400">Smiles Delivered Pan-India</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-xl sm:text-2xl font-black text-white">4.9</span>
                  <div className="flex text-amber-400 text-xs">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">Verified Customer Score</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">350+</p>
                <p className="text-[11px] sm:text-xs text-slate-400">Corporate Enterprise Clients</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Hero Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#191b26] to-[#0e1017] border border-[#2e3346] shadow-2xl p-4 sm:p-5">
                
                {/* Floating Tag */}
                <div className="absolute top-7 left-7 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-red-500/50 text-[11px] font-semibold text-white shadow-lg">
                  <Sparkles size={12} className="text-red-400" />
                  <span>Flagship Corporate Kit</span>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
                    alt="Heecart Premium Executive Hamper"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Photo Frame preview inset */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0e1017f0] backdrop-blur-md border border-[#2b2f3e] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">The Royale Executive Suite</p>
                      <p className="text-[11px] text-slate-400">Custom LED Flask + Diary + Stylus Pen + USB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-red-400">₹1,899</p>
                      <span className="text-[10px] text-emerald-400 font-medium">Bulk Slabs From ₹1,099</span>
                    </div>
                  </div>
                </div>

                {/* Micro preview grid below hero */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-[#141620] border border-[#242838] flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop" 
                      alt="Heritage Mosaic Frame" 
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">Heritage Mosaic</p>
                      <p className="text-[10px] text-slate-400">50 Photos Blended</p>
                      <p className="text-[11px] font-bold text-red-400">₹1,199</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141620] border border-[#242838] flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300&auto=format&fit=crop" 
                      alt="Smart LED Temperature Bottle" 
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">Smart LED Flask</p>
                      <p className="text-[10px] text-slate-400">Name Laser Etched</p>
                      <p className="text-[11px] font-bold text-red-400">₹599</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Verified Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 items-center gap-3 p-3.5 rounded-xl bg-[#12141d] border border-red-900/60 shadow-xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Mockup Guarantee</p>
                  <p className="text-[10px] text-slate-400">Approved by you before laser craft</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
