import React from 'react';
import { Star, Wand2, MessageCircle, Eye } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, onCustomize, onQuickInquiry }) {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col rounded-xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {discountPercent}% OFF
          </span>
          {product.isTopSales && (
            <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              TOP SALE
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              FEATURED
            </span>
          )}
        </div>

        {/* WhatsApp Quick Chat */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickInquiry(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center shadow transition-colors"
          title="Inquire on WhatsApp"
        >
          <MessageCircle size={15} />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-xs">{product.rating || 4.9}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount || 120})</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Bulk Corporate slab note */}
          {product.corporateTierPricing?.length > 0 && (
            <div className="pt-1 flex items-center justify-between text-[11px] bg-red-50 text-red-700 px-2 py-0.5 rounded">
              <span className="font-medium">Bulk Slabs:</span>
              <span className="font-bold">From ₹{product.corporateTierPricing[product.corporateTierPricing.length - 1].price}/unit</span>
            </div>
          )}

        </div>

        {/* Pricing & Action */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Made to order'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCustomize(product);
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Wand2 size={12} />
              <span>Customize</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
