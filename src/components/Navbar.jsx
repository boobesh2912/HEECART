import React, { useState } from 'react';
import { ShoppingBag, Search, Truck, Menu, X, Shield, Lock, Award, MessageCircle, User } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onOpenCorporateRFQ,
  onOpenAdmin,
  onOpenAuth,
  currentUser,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onGoHome
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top Banner - Solid Red & White */}
      <div className="bg-red-600 text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-white text-red-600 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">
              Notice
            </span>
            <span className="truncate text-[11px] sm:text-xs">
              Fast 24-48 Hr Dispatch | Free Digital Mockup on WhatsApp | Use code <strong className="underline font-bold">HEECART10</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-[11px]">
            <button
              onClick={onOpenTracking}
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              <Truck size={13} /> Track Courier
            </button>
            <span>|</span>
            <button
              onClick={onOpenAuth}
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              <User size={13} /> {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Login / Signup'}
            </button>
            <span>|</span>
            <button
              onClick={onOpenAdmin}
              className="hover:underline flex items-center gap-1 font-semibold bg-red-700 hover:bg-red-800 px-2 py-0.5 rounded text-white"
            >
              <Lock size={12} /> Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onGoHome();
                onSelectCategory('all');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <img
                src="/heecart-logo.png"
                alt="HEECART Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  HEECART<span className="text-red-600">.</span>
                </span>
                <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  Customized Gifts & Corporate Hampers
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Center Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hampers, LED bottles, photo frames..."
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* WhatsApp Support CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Heecart,%20I%20want%20to%20inquire%20about%20a%20custom%20gift%20order"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>

            {/* Bulk RFQ CTA */}
            <button
              onClick={onOpenCorporateRFQ}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              <Award size={14} className="text-red-600" />
              <span>Corporate RFQ</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-red-600 rounded-full px-1.5 py-0.2 text-xs font-black min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Search Field */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hampers, bottles, frames..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs pl-9 pr-8 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
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

        {/* Desktop Category Sub-Nav (Printmine style) */}
        <div className="hidden lg:flex items-center space-x-8 border-t border-slate-100 py-3 text-xs font-semibold text-slate-700">
          <button
            onClick={() => { onGoHome(); onSelectCategory('all'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'all' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            All Products
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('hampers'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'hampers' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            Corporate Hampers & Gift Sets
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('bottles'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'bottles' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            LED Temperature Bottles
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('frames'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'frames' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            Photo Frames & Spotify Plaques
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('stationery'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'stationery' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            Diaries, Pens & Desk Sets
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('combos'); }}
            className={`transition-colors pb-0.5 ${selectedCategory === 'combos' ? 'text-red-600 font-bold border-b-2 border-red-600' : 'hover:text-red-600'}`}
          >
            Personalized Combos
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product Categories
            </p>
            {[
              { id: 'all', label: 'All Products' },
              { id: 'hampers', label: 'Hampers & Gift Sets' },
              { id: 'bottles', label: 'LED Temperature Bottles' },
              { id: 'frames', label: 'Photo Frames & Keepsakes' },
              { id: 'stationery', label: 'Diaries & Desk Sets' },
              { id: 'combos', label: 'Combo Gifts' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onGoHome();
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  selectedCategory === cat.id ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 font-semibold flex items-center gap-2"
            >
              <User size={14} className="text-red-600" />
              <span>{currentUser ? `Account (${currentUser.name})` : 'Login / Signup with OTP'}</span>
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 font-medium flex items-center gap-2"
            >
              <Truck size={14} className="text-red-600" />
              <span>Track Your Order</span>
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-red-700 font-bold flex items-center gap-2 bg-red-50 rounded-lg"
            >
              <Lock size={14} className="text-red-600" />
              <span>Admin & CRM Portal</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
