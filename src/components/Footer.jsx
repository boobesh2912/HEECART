import React from 'react';
import { MessageSquare, ArrowUp, Lock, Truck } from 'lucide-react';
import { InstagramIcon, GithubIcon } from './BrandIcons';

export default function Footer({ onSelectCategory, onOpenCorporateRFQ, onOpenTracking, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="/heecart-logo.png" 
                alt="HEECART" 
                className="h-10 w-auto object-contain bg-white p-1 rounded-md"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  HEECART<span className="text-red-500">.</span>
                </span>
                <p className="text-[11px] text-slate-400">Customized Gifts & Corporate Hampers</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              HEECART personalizes photo frames, customized acrylic plaques, vacuum insulated drinkware, and curated corporate gift hampers with laser engraving across India.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.instagram.com/heecart_com/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Follow @heecart_com on Instagram"
              >
                <InstagramIcon size={15} />
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Us"
              >
                <MessageSquare size={15} />
              </a>

              <a
                href="https://github.com/boobesh2912/HEECART.git"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="GitHub Repo"
              >
                <GithubIcon size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => { onSelectCategory('hampers'); scrollToTop(); }} className="hover:text-red-400">
                  Corporate Hampers & Gift Sets
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('bottles'); }} className="hover:text-red-400">
                  LED Temperature Bottles
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('frames'); }} className="hover:text-red-400">
                  Photo Mosaic Frames
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('frames'); }} className="hover:text-red-400">
                  Spotify Acrylic Plaques
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('stationery'); }} className="hover:text-red-400">
                  Diaries & Executive Pens
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Business & Bulk */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Bulk Gifting
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onOpenCorporateRFQ} className="text-red-400 font-bold hover:underline">
                  Instant RFQ Slab Calculator →
                </button>
              </li>
              <li>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-slate-200">
                  Request Sample Branded Kit
                </a>
              </li>
              <li>
                <span className="text-slate-400">GST Input Tax Credit Invoices</span>
              </li>
              <li>
                <span className="text-slate-400">Multi-drop Address Delivery</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Support & Admin */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Assurance & Admin
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onOpenTracking} className="hover:text-red-400 flex items-center gap-1">
                  <Truck size={13} /> Track Live Order
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-amber-400 font-bold hover:underline flex items-center gap-1 pt-1">
                  <Lock size={13} /> Admin & Store CRM Portal
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Email: support@heecart.com
              </li>
              <li className="text-[11px] text-slate-400">
                WhatsApp: +91 98765 43210
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HEECART. All rights reserved. Fast Pan-India Delivery.</p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/heecart_com/" target="_blank" rel="noreferrer" className="text-red-400 font-semibold hover:underline">
              @heecart_com
            </a>
            <span>•</span>
            <button onClick={scrollToTop} className="hover:text-white flex items-center gap-1 font-semibold">
              Top <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
