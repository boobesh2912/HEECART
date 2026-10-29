import React, { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { linkHandler } from '../lib/router';
import { findCoupon } from '../lib/store';
import { couponDiscount, formatINR, minOrderQty, unitPrice } from '../lib/pricing';
import { buildEnquiryMessage, openWhatsApp } from '../lib/whatsapp';

const CUSTOMER_KEY = 'heecart_customer';

export default function EnquiryDrawer({ isOpen, onClose, items, settings, onUpdate, onRemove, onClear }) {
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponState, setCouponState] = useState('');
  const [customer, setCustomer] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CUSTOMER_KEY)) || {}; } catch (e) { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer)); } catch (e) {}
  }, [customer]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const subtotal = items.reduce((sum, i) => sum + (unitPrice(i.product, i.qty) || 0) * i.qty, 0);
  const discount = couponDiscount(coupon, subtotal);

  const applyCoupon = e => {
    e.preventDefault();
    const found = findCoupon(couponCode);
    setCoupon(found);
    setCouponState(found ? 'applied' : 'invalid');
  };

  const send = () => openWhatsApp(settings.whatsapp, buildEnquiryMessage({ items, coupon: discount ? coupon : null, customer }));

  const field = key => ({
    value: customer[key] || '',
    onChange: e => setCustomer(c => ({ ...c, [key]: e.target.value })),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Enquiry list">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="animate-fade-in relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-extrabold">Your enquiry list</h2>
            <p className="text-xs text-ink/50">Send it to us on WhatsApp. We'll confirm the final price and branding.</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream" aria-label="Close"><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag size={40} className="text-gold-500" />
            <p className="font-semibold">Your list is empty</p>
            <p className="text-sm text-ink/60">Add gift sets from the catalog, then send everything in one WhatsApp message.</p>
            <button onClick={onClose} className="btn-dark mt-2">Browse gift sets</button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item, index) => {
                const price = unitPrice(item.product, item.qty);
                const minQty = minOrderQty(item.product);
                const href = `/p/${item.product.id}`;
                return (
                  <div key={item.product.id + index} className="flex gap-3 rounded-2xl border border-ink/10 p-3">
                    <a href={href} onClick={e => { linkHandler(href)(e); onClose(); }} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                      <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                    </a>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug">{item.product.name}</p>
                        <button onClick={() => onRemove(item)} className="text-ink/40 hover:text-red-600" aria-label={`Remove ${item.product.name}`}><Trash2 size={15} /></button>
                      </div>
                      {item.printText && <p className="mt-0.5 truncate text-[11px] text-ink/50">Print: {item.printText}</p>}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-ink/15">
                          <button onClick={() => onUpdate(item, { qty: Math.max(minQty, item.qty - 1) })} className="grid h-8 w-8 place-items-center text-ink/60" aria-label="Decrease"><Minus size={13} /></button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={item.qty}
                            min={minQty}
                            onChange={e => onUpdate(item, { qty: Math.max(minQty, Math.floor(Number(e.target.value)) || minQty) })}
                            className="h-8 w-14 border-x border-ink/15 text-center text-xs font-bold focus:outline-none"
                            aria-label="Quantity"
                          />
                          <button onClick={() => onUpdate(item, { qty: item.qty + 1 })} className="grid h-8 w-8 place-items-center text-ink/60" aria-label="Increase"><Plus size={13} /></button>
                        </div>
                        {price != null && (
                          <div className="text-right">
                            <p className="text-sm font-bold">{formatINR(price * item.qty)}</p>
                            <p className="text-[10px] text-ink/50">{formatINR(price)}/pc</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <form onSubmit={applyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    value={couponCode}
                    onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponState(''); }}
                    placeholder="Coupon code"
                    className="input pl-9 uppercase"
                  />
                </div>
                <button className="btn-outline px-4 py-2.5" disabled={!couponCode.trim()}>Apply</button>
              </form>
              {couponState === 'invalid' && <p className="-mt-2 text-xs text-red-600">That coupon isn't valid right now.</p>}
              {couponState === 'applied' && coupon && (
                <p className="-mt-2 text-xs font-semibold text-green-700">
                  {coupon.code} applied{coupon.description ? ` · ${coupon.description}` : ''}
                  {!discount && coupon.min_amount ? ` (needs ${formatINR(coupon.min_amount)}+ order)` : ''}
                </p>
              )}

              <div className="space-y-2 rounded-2xl bg-cream p-4">
                <p className="text-xs font-semibold text-ink/70">Your details (optional, added to the message)</p>
                <input className="input" placeholder="Your name" {...field('name')} />
                <input className="input" placeholder="Company" {...field('company')} />
                <input className="input" placeholder="Delivery city" {...field('city')} />
              </div>

              <button onClick={onClear} className="text-xs font-semibold text-ink/50 underline hover:text-ink">Clear list</button>
            </div>

            <div className="border-t border-ink/10 p-5">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-ink/60"><span>Estimated total</span><span>{formatINR(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-700"><span>Coupon {coupon.code}</span><span>-{formatINR(discount)}</span></div>}
                <div className="flex justify-between text-lg font-extrabold"><span>Estimate</span><span>{formatINR(subtotal - discount)}</span></div>
                <p className="text-[11px] text-ink/50">GST & shipping extra. Pay by GPay/UPI once we confirm on WhatsApp.</p>
              </div>
              <button onClick={send} className="btn-whatsapp mt-4 w-full py-3.5 text-base">
                <WhatsAppIcon size={20} /> Send enquiry on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
