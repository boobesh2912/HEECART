import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, MessageSquare, Menu, X, ShieldCheck, Sparkles, Truck, Award } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenTracking, onOpenCorporateRFQ, selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0df2] backdrop-blur-md border-b border-[#222530]">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-xs text-red-100 py-1.5 px-4 border-b border-red-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white animate-pulse">
              FESTIVE OFFER
            </span>
            <span className="font-medium truncate">
              Use code <strong className="text-white underline">HEECART10</strong> for 10% OFF | Free Pan-India Delivery on orders over ₹999
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-[11px] font-medium text-slate-300">
            <button 
              onClick={onOpenTracking}
              className="hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Truck size={13} className="text-red-500" /> Track Your Order
            </button>
            <span className="text-slate-600">•</span>
            <a 
              href="https://wa.me/919876543210?text=Hi%20Heecart,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20gift%20order" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-green-400 transition-colors flex items-center gap-1 text-green-400 font-semibold"
            >
              <MessageSquare size={13} /> WhatsApp Design Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { onSelectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group text-left"
            >
              <div className="relative p-1.5 rounded-xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 group-hover:border-red-600/60 transition-all shadow-md">
                <img 
                  src="/heecart-logo.png" 
                  alt="HEECART Logo" 
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                    HEECART<span className="text-red-600">.</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-red-950 text-red-400 border border-red-800/40">
                    STUDIO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal tracking-wide">
                  Customized Keepsakes & Corporate Hampers
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className={`relative w-full transition-all duration-200 ${searchFocused ? 'ring-2 ring-red-600 shadow-glow-red' : ''} rounded-full`}>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search photo frames, LED bottles, hampers, plaques..."
                className="w-full bg-[#14161f] text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-full border border-[#272b3a] focus:outline-none focus:border-red-600"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Corporate RFQ CTA */}
            <button
              onClick={onOpenCorporateRFQ}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-[#161822] hover:bg-red-950/60 hover:text-white border border-[#2c3040] hover:border-red-600/50 transition-all shadow-sm"
            >
              <Award size={14} className="text-red-500" />
              <span>Bulk Gifting RFQ</span>
            </button>

            {/* Track Order CTA */}
            <button
              onClick={onOpenTracking}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#141620] transition-colors"
            >
              <Truck size={14} className="text-slate-400" />
              <span>Track Order</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">My Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-red-700 text-xs font-black">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#161924] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo frames, bottles, hampers..."
              className="w-full bg-[#12141c] text-slate-200 placeholder-slate-400 text-xs pl-9 pr-8 py-2 rounded-lg border border-[#252837] focus:outline-none focus:border-red-600"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Sub-Nav Bar */}
        <div className="hidden lg:flex items-center justify-between border-t border-[#1b1e2a] py-2.5 text-xs font-medium text-slate-300">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onSelectCategory('all')}
              className={`transition-colors pb-0.5 ${selectedCategory === 'all' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              All Masterpieces
            </button>
            <button 
              onClick={() => onSelectCategory('corporate')}
              className={`transition-colors pb-0.5 flex items-center gap-1 ${selectedCategory === 'corporate' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
              Corporate Gifting & Hampers
            </button>
            <button 
              onClick={() => onSelectCategory('frames')}
              className={`transition-colors pb-0.5 ${selectedCategory === 'frames' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              Photo Frames & Keepsakes
            </button>
            <button 
              onClick={() => onSelectCategory('bottles')}
              className={`transition-colors pb-0.5 ${selectedCategory === 'bottles' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              Smart LED Bottles & Drinkware
            </button>
            <button 
              onClick={() => onSelectCategory('keychains')}
              className={`transition-colors pb-0.5 ${selectedCategory === 'keychains' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              Keychains & Leather Sets
            </button>
            <button 
              onClick={() => onSelectCategory('hampers')}
              className={`transition-colors pb-0.5 ${selectedCategory === 'hampers' ? 'text-red-400 font-bold border-b-2 border-red-500' : 'hover:text-white'}`}
            >
              Luxury Gift Boxes
            </button>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Express 24H Dispatch Available
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#202330] bg-[#0c0d12] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              Browse Categories
            </p>
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'corporate', label: 'Corporate Gifting & Hampers' },
              { id: 'frames', label: 'Photo Frames & Keepsakes' },
              { id: 'bottles', label: 'LED Bottles & Drinkware' },
              { id: 'keychains', label: 'Keychains & Combos' },
              { id: 'hampers', label: 'Curated Gift Boxes' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id 
                    ? 'bg-red-600/20 text-red-400 border border-red-600/40' 
                    : 'text-slate-300 hover:bg-[#161822]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1e212c] space-y-2">
            <button
              onClick={() => {
                onOpenCorporateRFQ();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-300 border border-red-600/50"
            >
              <Award size={15} /> Request Corporate Bulk Quote
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium bg-[#161822] text-slate-200 border border-[#2a2e3e]"
            >
              <Truck size={15} /> Track Ongoing Order
            </button>
            <a
              href="https://www.instagram.com/heecart_com/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium text-pink-400 bg-pink-950/20 border border-pink-900/30"
            >
              Follow @heecart_com on Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
