import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck, MessageSquare, Check } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout,
  coupons = [] 
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [promoError, setPromoError] = useState('');

  const rawSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || appliedCoupon?.code === 'BULKFREE';
  const shippingFee = isFreeShipping || rawSubtotal === 0 ? 0 : 99;

  // Calculate discount based on dynamic coupon
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((rawSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    // Search active coupons created by admin
    const matched = coupons.find(c => c.code === code && c.active);

    if (matched) {
      if (rawSubtotal < matched.minOrder) {
        setPromoError(`Minimum order value for ${code} is ₹${matched.minOrder}.`);
      } else {
        setAppliedCoupon(matched);
      }
    } else if (code === 'HEECART10') {
      setAppliedCoupon({ code: 'HEECART10', name: 'Welcome 10%', type: 'percent', value: 10, minOrder: 499 });
    } else {
      setPromoError('Invalid coupon. Try code HEECART10 or check active offers.');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let msg = `*NEW HEECART STORE CART ORDER*%0A%0A`;
    cart.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.product.name}* (Qty: ${item.quantity})%0A` +
        `   • Price: ₹${item.totalPrice}%0A` +
        `   • Custom Text: ${item.customText || 'N/A'}%0A` +
        `   • Font: ${item.fontFamily}%0A` +
        `   • Gift Wrap: ${item.giftWrap ? 'Yes' : 'No'}%0A` +
        (item.userUploadedPhoto ? `   • Custom Photo: [Uploaded]%0A` : '') +
        `%0A`;
    });
    msg += `*Subtotal:* ₹${rawSubtotal}%0A` +
      `*Shipping:* ${shippingFee === 0 ? 'FREE' : '₹' + shippingFee}%0A` +
      (discountAmount > 0 ? `*Discount (${appliedCoupon?.code}):* -₹${discountAmount}%0A` : '') +
      `*Total Order Value:* ₹${finalTotal}%0A%0A` +
      `_Please confirm availability and share mockups for review!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-red-600" size={18} />
              <h2 className="text-sm font-bold text-slate-900">Your Shopping Bag</h2>
              <span className="px-2 py-0.2 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Strip */}
          <div className="p-3 bg-red-50/70 border-b border-red-100 text-xs">
            {rawSubtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Truck size={14} className="text-emerald-600" />
                <span>You've unlocked <strong>FREE Pan-India Delivery!</strong></span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Add <strong>₹{freeShippingThreshold - rawSubtotal}</strong> more for Free Shipping!</span>
                  <span className="font-bold text-red-600">{Math.round((rawSubtotal / freeShippingThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-12">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag size={24} />
                </div>
                <p className="text-xs font-bold text-slate-700">Your shopping bag is empty</p>
                <p className="text-[11px] text-slate-400">Discover our personalized gifts and hampers.</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs">
                  <div className="flex gap-2.5">
                    <img
                      src={item.userUploadedPhoto || item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-white flex-shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-600"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        Text: "{item.customText}"
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-black text-slate-900">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center rounded border border-slate-300 bg-white">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="w-5 h-5 text-slate-700 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-slate-900 text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-5 h-5 text-slate-700 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
              
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon: HEECART10"
                  className="flex-1 bg-slate-50 text-slate-900 text-xs px-3 py-1.5 rounded-lg border border-slate-300 uppercase focus:outline-none focus:border-red-600 font-mono font-bold"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="p-2 bg-emerald-50 rounded border border-emerald-200 flex items-center justify-between text-[11px] text-emerald-800">
                  <span className="font-semibold">✓ Coupon {appliedCoupon.code} applied ({appliedCoupon.type === 'percent' ? `${appliedCoupon.value}% Off` : `₹${appliedCoupon.value} Off`})</span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-slate-400 hover:text-slate-600 font-bold ml-2">✕</button>
                </div>
              )}
              {promoError && <p className="text-[10px] text-red-600 font-semibold">{promoError}</p>}

              {/* Price lines */}
              <div className="space-y-1 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-900">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Festival Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery:</span>
                  <span className={shippingFee === 0 ? 'text-emerald-700 font-bold' : 'text-slate-900 font-medium'}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total:</span>
                  <span className="text-red-600 text-base font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout({
                      cart,
                      rawSubtotal,
                      discountAmount,
                      shippingFee,
                      finalTotal,
                      promoApplied: appliedCoupon ? appliedCoupon.code : ''
                    });
                  }}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Submit Details & Proceed</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare size={14} />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
