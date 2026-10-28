import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Smartphone, Building, Truck, ArrowRight, MessageSquare, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderSuccess }) {
  if (!isOpen || !checkoutData) return null;

  const [fullName, setFullName] = useState('Anirudh Rao');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('anirudh@gmail.com');
  const [address, setAddress] = useState('Flat 402, Prestige Palms, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');
  const [gstin, setGstin] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isOrdered, setIsOrdered] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = `HEEC-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(newOrderId);
    setIsOrdered(true);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    onOrderSuccess();
  };

  const handleShareOnWhatsApp = () => {
    const msg = `*CONFIRMED HEECART ORDER #${generatedOrderId}*%0A%0A` +
      `*Customer:* ${fullName}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Address:* ${address}, ${city}, ${state} - ${pincode}%0A` +
      `*Total Amount Paid:* ₹${checkoutData.finalTotal}%0A` +
      `*Payment Method:* ${paymentMethod.toUpperCase()}%0A%0A` +
      `*Items Ordered:* ${checkoutData.cart.length} item(s)%0A` +
      `_Please prepare the digital mockups for my approval!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0f1118] border border-[#2b2f42] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-[#212435] bg-[#131622] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Lock size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">256-Bit Encrypted Secure Checkout</h2>
              <p className="text-xs text-slate-400">Heecart Bespoke Gifting & Corporate Fulfillment</p>
            </div>
          </div>

          {!isOrdered && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1b1e2c] hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {isOrdered ? (
            /* Order Confirmed Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Thank You, {fullName}!
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Your order reference is <strong className="text-white font-mono">{generatedOrderId}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#141622] border border-[#232738] text-left text-xs space-y-2 text-slate-300">
                <div className="flex justify-between border-b border-[#212434] pb-2">
                  <span className="text-slate-400">Total Paid:</span>
                  <span className="text-white font-black text-sm">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Address:</span>
                  <span className="text-white text-right max-w-[200px] truncate">{address}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Dispatch:</span>
                  <span className="text-emerald-400 font-bold">Within 24 to 48 Hours</span>
                </div>
              </div>

              {/* Next Step Info Box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-950/30 border border-red-800/40 text-left text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <Sparkles size={15} />
                  <span>Next Step: Digital Mockup Verification</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Our graphic designers will prepare a 3D digital mockup of your personalized item and send it to your WhatsApp (<strong className="text-white">+91 {phone}</strong>) within 2 hours. Once you give 100% approval, our laser artisans begin crafting!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleShareOnWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare size={16} />
                  <span>Open WhatsApp to Confirm Design</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1a1d2c] hover:bg-[#222638] text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Back to Store
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Truck size={14} className="text-red-500" />
                  <span>1. Delivery & Recipient Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Full Recipient Name*</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">WhatsApp / Phone Number*</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400 block mb-1">Street Address / House No. / Landmark*</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">City*</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Postal Pincode*</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Corporate GSTIN field (Optional) */}
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Corporate GSTIN (Optional for Business Tax Credit)</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 29AAAAA0000A1Z5"
                    className="w-full bg-[#161822] text-white px-3.5 py-2 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={14} className="text-red-500" />
                  <span>2. Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'upi', name: 'Instant UPI', desc: 'GPay, PhonePe, Paytm QR', icon: Smartphone },
                    { id: 'card', name: 'Cards / NetBanking', desc: 'Credit & Debit Cards', icon: CreditCard },
                    { id: 'cod', name: 'COD (Custom 50% Adv)', desc: 'Remaining on doorstep', icon: Building },
                  ].map(method => {
                    const Icon = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === method.id
                            ? 'bg-red-600/20 border-red-500 shadow-sm'
                            : 'bg-[#151722] border-[#252839] hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon size={16} className={paymentMethod === method.id ? 'text-red-400' : 'text-slate-400'} />
                          {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                        </div>
                        <p className="text-xs font-bold text-white">{method.name}</p>
                        <p className="text-[10px] text-slate-400">{method.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-2xl bg-[#141620] border border-[#232738] space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Items Total ({checkoutData.cart.length} unique):</span>
                  <span className="font-semibold text-white">₹{checkoutData.rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {checkoutData.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Applied:</span>
                    <span>- ₹{checkoutData.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Pan-India Shipping:</span>
                  <span className="text-emerald-400 font-bold">
                    {checkoutData.shippingFee === 0 ? 'FREE' : `₹${checkoutData.shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-[#202332]">
                  <span>Total Amount:</span>
                  <span className="text-red-400 text-lg">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all active:scale-98"
              >
                <ShieldCheck size={18} />
                <span>Authorize & Place Order (₹{checkoutData.finalTotal.toLocaleString('en-IN')})</span>
              </button>

              <div className="text-center text-[10px] text-slate-400">
                🔒 All orders backed by Heecart's 100% Mockup Approval & Transit Damage Replacement Guarantee.
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
