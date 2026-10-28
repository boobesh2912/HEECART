import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Gift, MessageSquare, Truck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');

  const rawSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const freeShippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || promoApplied === 'BULKFREE';
  const shippingFee = isFreeShipping || rawSubtotal === 0 ? 0 : 99;

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'HEECART10') {
      setDiscountPercent(10);
      setPromoApplied('HEECART10 (10% Off)');
    } else if (promoCode.trim().toUpperCase() === 'BULKFREE') {
      setPromoApplied('BULKFREE (Free Express Delivery)');
    } else {
      setPromoError('Invalid coupon. Try code HEECART10');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let msg = `*NEW HEECART STORE CART ORDER*%0A%0A`;
    cart.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.product.name}* (Qty: ${item.quantity})%0A` +
        `   • Price: ₹${item.totalPrice}%0A` +
        `   • Custom Text: ${item.customText || 'N/A'}%0A` +
        `   • Typography: ${item.fontFamily}%0A` +
        `   • Gift Wrap: ${item.giftWrap ? 'Yes' : 'No'}%0A` +
        (item.userUploadedPhoto ? `   • Custom Photo: [Uploaded]%0A` : '') +
        `%0A`;
    });
    msg += `*Subtotal:* ₹${rawSubtotal}%0A` +
      `*Shipping:* ${shippingFee === 0 ? 'FREE' : '₹' + shippingFee}%0A` +
      (discountAmount > 0 ? `*Discount (${promoApplied}):* -₹${discountAmount}%0A` : '') +
      `*Total Order Value:* ₹${finalTotal}%0A%0A` +
      `_Please confirm availability and share mockups for review!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-[#0f1118] border-l border-[#242738] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#202333] bg-[#121520] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-red-500" size={19} />
              <h2 className="text-base font-bold text-white">Your Shopping Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-400 text-xs font-bold border border-red-800/40">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1d2c] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-[#151724] border-b border-[#212435] text-xs">
            {rawSubtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Truck size={15} />
                <span>🎉 Congratulations! You have unlocked <strong>FREE Pan-India Express Delivery</strong>.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Add <strong>₹{freeShippingThreshold - rawSubtotal}</strong> more for Free Delivery!</span>
                  <span className="text-red-400 font-bold">{Math.round((rawSubtotal / freeShippingThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#232738] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-[#181a26] border border-[#262a3d] flex items-center justify-center text-slate-500">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-sm font-bold text-slate-200">Your shopping bag is empty</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover our personalized photo frames, smart LED bottles, and corporate hampers.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-glow-red transition-all"
                >
                  Start Customizing
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#141622] border border-[#242839] space-y-3 relative group"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.userUploadedPhoto || item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-900 border border-[#2b3042] flex-shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="mt-1 space-y-0.5 text-[11px] text-slate-400">
                        <p className="truncate">
                          <strong className="text-slate-300">Text:</strong> "{item.customText}"
                        </p>
                        {item.giftWrap && (
                          <span className="inline-block text-[10px] text-red-400 bg-red-950/60 px-1.5 rounded">
                            + Luxury Red Gift Box
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-black text-white">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center rounded-lg bg-[#1b1e2c] border border-[#292c3d]">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 text-slate-300 hover:text-white flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-6 h-6 text-slate-300 hover:text-white flex items-center justify-center text-xs"
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

          {/* Drawer Footer / Checkout summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#202334] bg-[#12141e] space-y-3.5">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon: HEECART10"
                    className="w-full bg-[#171a26] text-white text-xs pl-8 pr-2 py-2 rounded-xl border border-[#2a2e40] uppercase focus:outline-none focus:border-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#222536] hover:bg-red-600 hover:text-white text-xs font-bold text-slate-200 transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  ✓ Promo applied: {promoApplied}
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-400">{promoError}</p>
              )}

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Express Shipping:</span>
                  <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#232738]">
                  <span>Total Payable:</span>
                  <span className="text-lg font-black text-red-400">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
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
                      promoApplied
                    });
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-[#161824] hover:bg-[#1d2030] text-green-400 border border-green-900/40 hover:border-green-600/50 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare size={15} />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>100% Mockup Approval & Safe Payment Guarantee</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
