import React from 'react';
import { Leaf, Plus } from 'lucide-react';
import { linkHandler } from '../lib/router';
import { formatINR, lowestPrice, minOrderQty, startingPrice } from '../lib/pricing';

export default function ProductCard({ product, onAddToEnquiry }) {
  const href = `/p/${product.id}`;
  const first = startingPrice(product);
  const lowest = lowestPrice(product);
  const minQty = minOrderQty(product);
  const summary = (product.includes || []).filter(i => !/gift box/i.test(i)).slice(0, 3).join(' · ');

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-lg">
      <a href={href} onClick={linkHandler(href)} className="relative block aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-400">
          {product.set_type}
        </span>
        {product.tags?.includes('eco') && (
          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-green-700" title="Eco-friendly">
            <Leaf size={14} />
          </span>
        )}
        {product.badge && (
          <span className="absolute bottom-2 left-2 rounded-md bg-gold-500 px-2 py-1 text-[10px] font-bold uppercase text-ink">{product.badge}</span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <a href={href} onClick={linkHandler(href)}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:text-gold-700">{product.name}</h3>
        </a>
        {summary && <p className="mt-1 line-clamp-1 text-[11px] text-ink/50">{summary}</p>}

        <div className="mt-auto pt-3">
          {first != null && (
            <p className="text-base font-bold sm:text-lg">
              {formatINR(first)}
              <span className="text-xs font-medium text-ink/50"> /pc{minQty > 1 ? ` · min ${minQty}` : ''}</span>
            </p>
          )}
          {lowest != null && lowest < first && (
            <p className="text-[11px] font-semibold text-gold-700">Bulk: as low as {formatINR(lowest)}/pc</p>
          )}
          <button
            onClick={() => onAddToEnquiry(product)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink/15 py-2 text-xs font-semibold hover:border-ink hover:bg-ink hover:text-gold-400"
          >
            <Plus size={14} /> Add to enquiry
          </button>
        </div>
      </div>
    </article>
  );
}
