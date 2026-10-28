import React from 'react';
import { Home, Grid, MessageSquare, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function MobileBottomNav({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTracking,
  onGoHome,
  onOpenCategories
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl pb-safe">
      
      {/* Floating Zepto / Blinkit style Cart Bar if items exist */}
      {cartCount > 0 && (
        <div className="px-3 pt-2 pb-1 bg-red-600 text-white flex items-center justify-between cursor-pointer" onClick={onOpenCart}>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white text-red-600 font-black text-xs flex items-center justify-center">
              {cartCount}
            </span>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">{cartCount} {cartCount === 1 ? 'Item' : 'Items'} Added</p>
              <p className="text-[10px] text-red-100 leading-tight">Total: ₹{cartTotal.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-red-700 hover:bg-red-800 px-3 py-1 rounded-md">
            <span>View Bag</span>
            <ArrowRight size={13} />
          </div>
        </div>
      )}

      {/* Main 4-5 Navigation Icon Tabs */}
      <div className="grid grid-cols-5 h-14 items-center text-center text-[10px] font-semibold text-slate-600">
        
        {/* 1. Home */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center justify-center h-full active:text-red-600 focus:text-red-600"
        >
          <Home size={18} />
          <span className="mt-0.5">Home</span>
        </button>

        {/* 2. Categories */}
        <button
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center h-full active:text-red-600 focus:text-red-600"
        >
          <Grid size={18} />
          <span className="mt-0.5">Explore</span>
        </button>

        {/* 3. Direct WhatsApp */}
        <a
          href="https://wa.me/919876543210?text=Hi%20Heecart,%20I%20want%20to%20inquire%20about%20a%20custom%20gift"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center h-full text-emerald-600 font-bold"
        >
          <MessageSquare size={18} />
          <span className="mt-0.5">WhatsApp</span>
        </a>

        {/* 4. Track Order */}
        <button
          onClick={onOpenTracking}
          className="flex flex-col items-center justify-center h-full active:text-red-600 focus:text-red-600"
        >
          <Truck size={18} />
          <span className="mt-0.5">Track</span>
        </button>

        {/* 5. Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center h-full active:text-red-600 focus:text-red-600"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="mt-0.5">Cart</span>
        </button>

      </div>

    </div>
  );
}
