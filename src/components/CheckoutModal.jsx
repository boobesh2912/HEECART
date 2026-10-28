import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, Smartphone, Truck, ArrowRight, MessageSquare, Tag, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderSuccess, onSaveCustomerLead }) {
  if (!isOpen || !checkoutData) return null;

  const [fullName, setFullName] = useState('Anirudh Rao');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('anirudh@gmail.com');
  const [address, setAddress] = useState('Flat 402, Prestige Palms, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');
  const [company, setCompany] = useState('Infosys / Personal');
  const [deliveryDate, setDeliveryDate] = useState('Urgent (Within 3 days)');
  const [notes, setNotes] = useState('Please send WhatsApp digital mockup preview before laser engraving.');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const handleSubmitLeadAndRedirectWhatsApp = (e) => {
    e.preventDefault();
    const orderId = `HEEC-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(orderId);

    // 1. Save customer details to Admin CRM Database for marketing & follow-up
    const customerLead = {
      id: orderId,
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      company: company.trim() || 'Personal',
      address: `${address}, ${city}, ${state} - ${pincode}`,
      items: checkoutData.cart.map(i => `${i.product.name} (x${i.quantity})`).join(', '),
      amount: checkoutData.finalTotal,
      status: 'New Inquiry',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      city: `${city}, ${state}`,
      type: company && company.toLowerCase() !== 'personal' ? 'Corporate' : 'Personal',
      courierName: 'Pending Courier Dispatch',
      awbNumber: 'Will be generated on dispatch',
      notes
    };

    if (onSaveCustomerLead) {
      onSaveCustomerLead(customerLead);
    }

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // 2. Format pre-filled WhatsApp message with product details, quantity, custom engravings & lead ID
    let itemsText = '';
    checkoutData.cart.forEach((item, idx) => {
      itemsText += `%0A${idx + 1}. *${encodeURIComponent(item.product.name)}* (Qty: ${item.quantity})` +
        `%0A   • Engraved Text: "${encodeURIComponent(item.customText || 'N/A')}"` +
        `%0A   • Typography: ${encodeURIComponent(item.fontFamily || 'Standard')}` +
        `%0A   • Item Price: ₹${item.totalPrice.toLocaleString('en-IN')}`;
    });

    const msg = `*NEW HEECART ORDER INQUIRY - REF %23${orderId}*%0A%0A` +
      `*Customer Details:*%0A` +
      `• *Name:* ${encodeURIComponent(fullName)}%0A` +
      `• *Phone:* ${encodeURIComponent(phone)}%0A` +
      `• *Email:* ${encodeURIComponent(email)}%0A` +
      `• *Company/Event:* ${encodeURIComponent(company)}%0A` +
      `• *Delivery Address:* ${encodeURIComponent(address)}, ${encodeURIComponent(city)} - ${encodeURIComponent(pincode)}%0A` +
      `• *Required By:* ${encodeURIComponent(deliveryDate)}%0A%0A` +
      `*ORDERED PRODUCTS:*${itemsText}%0A%0A` +
      `*Total Order Value:* ₹${checkoutData.finalTotal.toLocaleString('en-IN')}%0A` +
      (checkoutData.promoApplied ? `*Coupon Applied:* ${encodeURIComponent(checkoutData.promoApplied)}%0A` : '') +
      `*Special Notes:* ${encodeURIComponent(notes)}%0A%0A` +
      `_Hi Heecart! I have submitted my details on your website. Please confirm availability and share the digital mockup preview on WhatsApp!_`;

    // Trigger WhatsApp redirect
    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    }, 400);

    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            <div>
              <h2 className="text-sm sm:text-base font-bold">1-Click Order & WhatsApp Mockup Checkout</h2>
              <p className="text-[11px] text-red-100">Zero payment upfront. Submit details & finalize on WhatsApp.</p>
            </div>
          </div>

          {!isSubmitted && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center font-bold text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 bg-white text-xs">
          
          {isSubmitted ? (
            /* Confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded uppercase">
                  Details Captured & WhatsApp Launched!
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your Order Reference ID is <strong className="text-slate-900 font-mono">{generatedOrderId}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Order Estimate:</span>
                  <span className="font-bold text-slate-900">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery To:</span>
                  <span className="font-medium text-slate-900">{city}, {pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-700 font-bold">Details Saved to Heecart CRM</span>
                </div>
              </div>

              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-red-50 border border-red-200 text-left text-xs space-y-1 text-slate-700">
                <p className="font-bold text-red-700">What happens next?</p>
                <p className="text-[11px] text-slate-600">
                  Our WhatsApp chat has opened with your order summary pre-filled. Simply press "Send" in WhatsApp to confirm your design draft!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const msg = `Hi Heecart! My order reference is ${generatedOrderId}. Please confirm my digital mockup.`;
                    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>Re-open WhatsApp Chat</span>
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
            /* Lead Capture Form */
            <form onSubmit={handleSubmitLeadAndRedirectWhatsApp} className="space-y-4">
              
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2 text-red-800 text-[11px]">
                <UserCheck size={16} className="text-red-600 flex-shrink-0" />
                <span>
                  <strong>No online payment required!</strong> Enter your contact details below so our design team can prepare your free mockups and finalize order over WhatsApp.
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Truck size={14} className="text-red-600" />
                  <span>1. Contact & Delivery Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Full Recipient Name*</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anirudh Rao"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">WhatsApp Mobile Number*</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Email Address (For Invoices)*</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anirudh@gmail.com"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Company Name / Occasion</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Cognizant / 5th Anniversary"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-slate-600 block mb-1 font-medium">Delivery Address / Landmark*</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Building, Flat No."
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">City*</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">State*</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Postal Pincode*</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560038"
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1 font-medium">Special Instructions / Required By Date</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please courier before Friday"
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>
              </div>

              {/* Order total line */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px]">Estimated Total Value:</span>
                  <p className="text-base font-black text-slate-900">₹{checkoutData.finalTotal.toLocaleString('en-IN')}</p>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {checkoutData.cart.length} Item(s) • Free Shipping
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare size={17} />
                <span>Submit Details & Open WhatsApp Chat (₹{checkoutData.finalTotal.toLocaleString('en-IN')})</span>
              </button>

              <div className="text-center text-[10px] text-slate-400">
                🔒 Your details are saved in Heecart CRM for order confirmation and priority dispatch.
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
