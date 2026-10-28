import React from 'react';
import { Star, Sparkles, Wand2, MessageCircle, ArrowUpRight, Award, Clock } from 'lucide-react';

export default function ProductCard({ product, onCustomize, onQuickInquiry }) {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#12141c] border border-[#232737] hover:border-red-600/50 transition-all duration-300 hover:shadow-card-dark overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              product.badgeType === 'corporate' 
                ? 'bg-blue-900/90 text-blue-200 border border-blue-700/50'
                : product.badgeType === 'eco'
                ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-700/50'
                : product.badgeType === 'luxury'
                ? 'bg-amber-900/90 text-amber-200 border border-amber-700/50'
                : 'bg-red-600/95 text-white shadow-sm'
            }`}>
              <Sparkles size={11} />
              {product.badge}
            </span>
          </div>
        )}

        {/* Lead time pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-black/75 backdrop-blur-md text-slate-300 border border-white/10">
          <Clock size={10} className="text-red-400" />
          <span>{product.leadTime}</span>
        </div>

        {/* Quick WhatsApp Inquiry Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickInquiry(product);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110"
          title="Inquire directly on WhatsApp"
        >
          <MessageCircle size={17} />
        </button>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-300">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key personalization highlight */}
          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>
              {product.customizationType === 'corporate_bulk' 
                ? 'Custom Logo & Individual Name Engraving' 
                : product.customizationType === 'photo_text' 
                ? 'Custom Photos + Names & Song Barcode'
                : 'Free Name Laser Engraving + Gift Box'}
            </span>
          </div>

          {/* Corporate Slab Pricing Note if applicable */}
          {product.corporateTierPricing?.length > 0 && (
            <div className="mt-2 py-1 px-2.5 rounded bg-[#181b26] border border-[#272b3a] flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Bulk Corporate Slab:</span>
              <span className="text-emerald-400 font-bold">
                From ₹{product.corporateTierPricing[product.corporateTierPricing.length - 1].price}/pc
              </span>
            </div>
          )}

        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-[#1f2331] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400">
              Save {discountPercent}% today
            </span>
          </div>

          <button
            onClick={() => onCustomize(product)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-red hover:shadow-glow-red-lg transition-all active:scale-95 flex-shrink-0"
          >
            <Wand2 size={13} />
            <span>Customize</span>
          </button>
        </div>

      </div>

    </div>
  );
}
