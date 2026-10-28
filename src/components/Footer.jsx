import React from 'react';
import { MessageSquare, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { InstagramIcon, GithubIcon } from './BrandIcons';

export default function Footer({ onSelectCategory, onOpenCorporateRFQ, onOpenTracking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06070a] text-slate-300 border-t border-[#1a1d29] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181b28]">
          
          {/* Brand Info - 2 Cols */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 shadow-md">
                <img 
                  src="/heecart-logo.png" 
                  alt="HEECART" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  HEECART<span className="text-red-600">.</span>
                </span>
                <p className="text-[11px] text-slate-400">Customized Gifts & Corporate Hampers</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Heecart is India’s premier bespoke gifting atelier. From intricate mosaic photo frames that immortalize love to laser-etched corporate hampers that command boardroom respect, we craft every keepsake with uncompromising precision.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/heecart_com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141620] hover:bg-pink-600 hover:text-white border border-[#242738] flex items-center justify-center text-slate-400 transition-all shadow-sm"
                title="Follow @heecart_com on Instagram"
              >
                <InstagramIcon size={17} />
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Heecart,%20I%20have%20an%20order%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141620] hover:bg-emerald-600 hover:text-white border border-[#242738] flex items-center justify-center text-slate-400 transition-all shadow-sm"
                title="Chat on WhatsApp"
              >
                <MessageSquare size={17} />
              </a>

              <a
                href="https://github.com/boobesh2912/HEECART.git"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141620] hover:bg-slate-700 hover:text-white border border-[#242738] flex items-center justify-center text-slate-400 transition-all shadow-sm"
                title="View GitHub Repository"
              >
                <GithubIcon size={17} />
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Official Studio: Bengaluru, Karnataka, India
              </span>
            </div>
          </div>

          {/* Quick Links: Personalized Gifts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Personalized Gifts
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { onSelectCategory('frames'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Photo Mosaic Frames
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('frames'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Spotify LED Plaques
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('frames'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  3D Optical Laser Crystals
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('bottles'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Custom LED Temp Bottles
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('keychains'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Leather Wallets & Keychains
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('all'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Anniversary & Birthday Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Gifting */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Corporate Gifting
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { onSelectCategory('corporate'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  The Royale Welcome Hamper
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('corporate'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Executive Diary & Pen Sets
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('corporate'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Eco-Friendly Bamboo Kits
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('corporate'); scrollToTop(); }} className="hover:text-red-400 transition-colors">
                  Festive Dry Fruit Decanters
                </button>
              </li>
              <li>
                <button onClick={onOpenCorporateRFQ} className="text-red-400 hover:text-red-300 font-bold transition-colors">
                  Bulk RFQ Quotation Calculator →
                </button>
              </li>
              <li>
                <span className="text-[10px] text-emerald-400">GST Input Tax Credit Invoices</span>
              </li>
            </ul>
          </div>

          {/* Customer Care & Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Assurance & Orders
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenTracking} className="hover:text-red-400 transition-colors flex items-center gap-1">
                  Track Live Order
                </button>
              </li>
              <li>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">
                  WhatsApp Design Support
                </a>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-default">
                  100% Mockup Approval Policy
                </span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-default">
                  Transit Replacement Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-slate-200 cursor-default">
                  Pan-India Air Logistics (BlueDart)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© {new Date().getFullYear()} HEECART. All Rights Reserved. Crafted for emotional milestones & enterprise excellence.</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">Made with ❤️ for Heecart Family</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#141620] hover:bg-red-600 hover:text-white border border-[#242738] transition-colors"
              title="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
