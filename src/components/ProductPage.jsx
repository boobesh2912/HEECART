import React, { useState } from 'react';
import { BadgeIndianRupee, Check, ChevronLeft, Leaf, Link2, Minus, Plus, Receipt, Share2, Sparkles, Truck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import ProductCard from './ProductCard';
import { linkHandler } from '../lib/router';
import { activeTierIndex, formatINR, minOrderQty, unitPrice } from '../lib/pricing';
import { buildEnquiryMessage, openWhatsApp, productUrl } from '../lib/whatsapp';

const NOTES = [
  { icon: Sparkles, text: 'Customization available' },
  { icon: Receipt, text: 'GST extra' },
  { icon: Truck, text: 'Shipping extra' },
  { icon: BadgeIndianRupee, text: 'Pay by GPay / UPI' },
];

export default function ProductPage({ product, products, categories, settings, onAddToEnquiry }) {
  const images = [product.image, ...(product.gallery || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);
  const minQty = minOrderQty(product);
  const [qty, setQty] = useState(minQty);
  const [printText, setPrintText] = useState('');
  const [copied, setCopied] = useState(false);

  const tiers = [...(product.tiers || [])].filter(t => t.price != null).sort((a, b) => a.min - b.min);
  const price = unitPrice(product, qty);
  const activeTier = activeTierIndex(product, qty);
  const category = categories.find(c => c.id === product.category);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const setQuantity = value => setQty(Math.max(minQty, Math.min(99999, Number.isFinite(value) ? Math.floor(value) : minQty)));

  const orderNow = () =>
    openWhatsApp(settings.whatsapp, buildEnquiryMessage({ items: [{ product, qty, printText: printText.trim() }] }));

  const share = async () => {
    const url = productUrl(product.id);
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch (e) {}
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1 text-xs text-ink/50">
        <a href="/" onClick={linkHandler('/')} className="flex items-center gap-1 hover:text-ink">
          <ChevronLeft size={14} /> All gifts
        </a>
        {category && (
          <>
            <span>/</span>
            <a href={`/?c=${category.id}`} onClick={linkHandler(`/?c=${category.id}`)} className="hover:text-ink">{category.name}</a>
          </>
        )}
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-ink/10 bg-cream">
            <img src={images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-lg bg-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold-400">{product.set_type} set</span>
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${i === activeImage ? 'border-gold-500' : 'border-transparent opacity-70'}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge && <span className="rounded-md bg-gold-500 px-2 py-0.5 text-[11px] font-bold uppercase">{product.badge}</span>}
            {product.tags?.includes('eco') && (
              <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold uppercase text-green-800">
                <Leaf size={12} /> Eco-friendly
              </span>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">{product.name}</h1>

          {product.includes?.length > 0 && (
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
              {product.includes.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold-600" /> {item}
                </li>
              ))}
            </ul>
          )}
          {product.description && <p className="mt-4 text-sm leading-relaxed text-ink/70">{product.description}</p>}

          {/* Price slabs, styled like the catalog table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
            <div className="grid grid-cols-2 bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wide">
              <span>Quantity</span>
              <span className="text-right">Price (per pc)</span>
            </div>
            {tiers.map((tier, i) => (
              <button
                key={tier.min}
                onClick={() => setQuantity(tier.min)}
                className={`grid w-full grid-cols-2 px-4 py-2.5 text-left text-sm transition ${
                  i === activeTier ? 'bg-ink font-bold text-gold-400' : 'bg-white hover:bg-cream'
                } ${i ? 'border-t border-ink/10' : ''}`}
              >
                <span>{tier.label}</span>
                <span className="text-right font-bold">{formatINR(tier.price)}</span>
              </button>
            ))}
          </div>

          {/* Quantity + estimate */}
          <div className="mt-5 flex flex-wrap items-end gap-4">
            <div>
              <label className="label" htmlFor="qty">Quantity{minQty > 1 ? ` (min ${minQty})` : ''}</label>
              <div className="flex items-center rounded-xl border border-ink/15">
                <button onClick={() => setQuantity(qty - 1)} className="grid h-11 w-11 place-items-center text-ink/60 hover:text-ink" aria-label="Decrease quantity"><Minus size={16} /></button>
                <input
                  id="qty"
                  type="number"
                  inputMode="numeric"
                  min={minQty}
                  value={qty}
                  onChange={e => setQty(e.target.value === '' ? '' : Number(e.target.value))}
                  onBlur={() => setQuantity(Number(qty))}
                  className="h-11 w-20 border-x border-ink/15 text-center text-sm font-bold focus:outline-none"
                />
                <button onClick={() => setQuantity(qty + 1)} className="grid h-11 w-11 place-items-center text-ink/60 hover:text-ink" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
            </div>
            {price != null && Number(qty) >= minQty && (
              <div className="pb-1">
                <p className="text-xs text-ink/50">{formatINR(price)} × {qty} pcs</p>
                <p className="text-2xl font-extrabold">{formatINR(price * qty)}</p>
                <p className="text-[11px] text-ink/50">Estimate · GST & shipping extra</p>
              </div>
            )}
          </div>

          <div className="mt-5">
            <label className="label" htmlFor="print-text">Name or company to print (optional)</label>
            <input
              id="print-text"
              className="input"
              value={printText}
              onChange={e => setPrintText(e.target.value)}
              placeholder="e.g. Acme Technologies"
              maxLength={80}
            />
            <p className="mt-1.5 text-[11px] text-ink/50">Need your logo printed? Send it to us on WhatsApp after you tap Order.</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <button onClick={orderNow} className="btn-whatsapp py-3.5 text-base">
              <WhatsAppIcon size={20} /> Order on WhatsApp
            </button>
            <button onClick={() => onAddToEnquiry(product, Number(qty) || minQty, printText.trim())} className="btn-outline py-3.5">
              <Plus size={16} /> Add to enquiry
            </button>
            <button onClick={share} className="btn-outline py-3.5" aria-label="Share product link">
              {copied ? <><Link2 size={16} /> Copied</> : <><Share2 size={16} /> Share</>}
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-cream p-4 sm:grid-cols-4">
            {NOTES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-[11px] font-semibold text-ink/70">
                <Icon size={16} className="shrink-0 text-gold-600" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-extrabold">More {category ? category.name.toLowerCase() : 'gift sets'}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {related.map(p => <ProductCard key={p.id} product={p} settings={settings} onAddToEnquiry={onAddToEnquiry} />)}
          </div>
        </section>
      )}
    </div>
  );
}
