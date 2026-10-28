import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Smartphone, Building, Truck, ArrowRight, MessageSquare } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isOrdered, setIsOrdered] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = `HEEC-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(newOrderId);
    setIsOrdered(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-red-600" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Secure Order Checkout</h2>
              <p className="text-[11px] text-slate-500">Heecart Customized Gifting & Corporate Fulfillment</p>
            </div>
          </div>

          {!isOrdered && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-white text-xs">
          
          {isOrdered ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  Order Confirmed
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Order ID: <strong className="text-slate-900 font-mono">{generatedOrderId}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Total Amount:</span>
                  <span className="font-bold text-slate-900">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="text-slate-800 text-right max-w-[200px] truncate">{address}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Dispatch:</span>
                  <span className="text-emerald-700 font-bold">Within 24-48 Hours</span>
                </div>
              </div>

              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-red-50 border border-red-200 text-left text-xs space-y-1 text-slate-700">
                <p className="font-bold text-red-700">Next Step: Mockup Approval on WhatsApp</p>
                <p className="text-[11px] text-slate-600">
                  Our designers will send a digital preview of your personalized engraving to +91 {phone} within 2 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleShareOnWhatsApp}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>Confirm Mockup on WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Back to Store
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Truck size={14} className="text-red-600" />
                  <span>1. Recipient & Shipping Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1">Full Recipient Name*</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Phone / WhatsApp Number*</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-slate-600 block mb-1">Street Address / Landmark*</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">City*</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">State*</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Postal Pincode*</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CreditCard size={14} className="text-red-600" />
                  <span>2. Payment Option</span>
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', name: 'Instant UPI', desc: 'GPay, PhonePe, Paytm' },
                    { id: 'card', name: 'Debit/Credit Cards', desc: 'Visa, Master, RuPay' },
                    { id: 'cod', name: 'Cash on Delivery', desc: 'Doorstep Payment' },
                  ].map(method => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <p className="text-xs">{method.name}</p>
                      <p className="text-[10px] text-slate-400">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order total line */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Total Payable Amount:</span>
                  <p className="text-base font-black text-slate-900">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</p>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">Free Pan-India Shipping</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                Place Order (₹{checkoutData.finalTotal.toLocaleString('en-IN')})
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
