import React, { useState } from 'react';
import { Award, Calculator, CheckCircle2, Download, MessageSquare, Send, Sparkles, Building2, Truck, FileCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function CorporateQuoteCalculator({ isOpen, onClose }) {
  const corporateItems = PRODUCTS.filter(p => p.category === 'corporate' || p.category === 'bottles' || p.corporateTierPricing?.length > 0);

  const [selectedProductId, setSelectedProductId] = useState(corporateItems[0]?.id || 'corp-royal-hamper');
  const [quantity, setQuantity] = useState(50);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [brandingOption, setBrandingOption] = useState('both'); // logo, name, both
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = corporateItems.find(p => p.id === selectedProductId) || corporateItems[0];

  // Calculate pricing based on slab
  let unitPrice = selectedProduct.price;
  let slabDiscount = '0%';
  if (selectedProduct.corporateTierPricing?.length > 0) {
    const matchedTier = [...selectedProduct.corporateTierPricing].reverse().find(tier => quantity >= tier.min);
    if (matchedTier) {
      unitPrice = matchedTier.price;
      slabDiscount = matchedTier.discount;
    }
  }

  const subtotal = unitPrice * quantity;
  const standardTotal = selectedProduct.price * quantity;
  const totalSavings = standardTotal - subtotal;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `*CORPORATE BULK GIFTING RFQ - HEECART*%0A%0A` +
      `*Company:* ${companyName || 'Not specified'}%0A` +
      `*Contact Person:* ${contactPerson || 'Not specified'}%0A` +
      `*Phone/WhatsApp:* ${phone}%0A` +
      `*Email:* ${email}%0A%0A` +
      `*Selected Kit:* ${selectedProduct.name}%0A` +
      `*Required Quantity:* ${quantity} units%0A` +
      `*Unit Price (Slab):* ₹${unitPrice}%0A` +
      `*Estimated Subtotal:* ₹${subtotal.toLocaleString('en-IN')}%0A` +
      `*Estimated Savings:* ₹${totalSavings.toLocaleString('en-IN')} (${slabDiscount})%0A` +
      `*Branding:* ${brandingOption === 'both' ? 'Both Company Logo & Recipient Name Laser Engraved' : brandingOption === 'logo' ? 'Company Logo Only' : 'Individual Names Only'}%0A%0A` +
      `_Please confirm dispatch timeline and send digital sample mockup!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <section id="corporate-rfq" className="py-16 sm:py-20 bg-[#090a0f] border-b border-[#1c202d] relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-bold">
            <Award size={13} />
            <span>ENTERPRISE PROCUREMENT DESK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Instant Corporate Gifting <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
              Quotation & Slab Calculator
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Planning employee onboarding kits, client appreciation hampers, or festive corporate gifting? Calculate your volume discount in real time and receive a formal GST tax proposal within minutes.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Configuration */}
          <div className="lg:col-span-7 bg-[#11131c] rounded-3xl border border-[#232737] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              
              {/* Product Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200">
                  Select Corporate Kit or Hamper
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {corporateItems.map(item => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedProductId(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        selectedProductId === item.id
                          ? 'bg-red-600/20 border-red-500 shadow-sm'
                          : 'bg-[#151722] border-[#25293a] hover:border-slate-700'
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-400">Base: ₹{item.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#161824] border border-[#272b3c]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Order Quantity</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-red-400">{quantity}</span>
                    <span className="text-xs text-slate-400">Units</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer h-2 bg-[#232738] rounded-lg"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>10 pcs</span>
                  <span>50 pcs</span>
                  <span>100 pcs</span>
                  <span>250 pcs</span>
                  <span>500+ pcs</span>
                </div>
              </div>

              {/* Branding Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200">
                  Branding & Customization Scope
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'both', label: 'Logo + Individual Names' },
                    { id: 'logo', label: 'Company Logo Only' },
                    { id: 'name', label: 'Individual Names Only' },
                  ].map(b => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setBrandingOption(b.id)}
                      className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold border text-center transition-all ${
                        brandingOption === b.id
                          ? 'bg-red-600/20 border-red-500 text-white'
                          : 'bg-[#151722] border-[#25293a] text-slate-400 hover:text-white'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company & Contact Details */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-200">Contact & Organization Information</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name (e.g. Cognizant)*"
                    className="w-full bg-[#161822] text-white px-3.5 py-2.5 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs placeholder-slate-500"
                  />
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Contact Person Name*"
                    className="w-full bg-[#161822] text-white px-3.5 py-2.5 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Number / Phone*"
                    className="w-full bg-[#161822] text-white px-3.5 py-2.5 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs placeholder-slate-500"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Official Work Email*"
                    className="w-full bg-[#161822] text-white px-3.5 py-2.5 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 text-xs placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all active:scale-98"
              >
                <MessageSquare size={17} />
                <span>Submit RFQ & Get Instant Mockup on WhatsApp</span>
              </button>

            </form>

          </div>

          {/* Right Column: Live Instant Quotation Slip */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-[#12141d] rounded-3xl border border-[#292e42] p-6 sm:p-7 shadow-2xl relative">
              
              <div className="flex items-center justify-between border-b border-[#212536] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
                    LIVE ESTIMATE SLIP
                  </span>
                  <h3 className="text-base font-bold text-white">Heecart Corporate Proposal</h3>
                </div>
                <div className="px-2.5 py-1 rounded bg-red-950/60 border border-red-800/40 text-[11px] font-bold text-red-400">
                  {slabDiscount} Slab Applied
                </div>
              </div>

              {/* Breakdown lines */}
              <div className="py-5 space-y-3 text-xs border-b border-[#212536]">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Item:</span>
                  <span className="text-white font-semibold text-right max-w-[200px] truncate">{selectedProduct.name}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Quantity Units:</span>
                  <span className="text-white font-bold">{quantity} units</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Standard Retail Rate:</span>
                  <span className="text-slate-400 line-through">₹{selectedProduct.price} / pc</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Discounted Volume Rate:</span>
                  <span className="text-red-400 font-black text-sm">₹{unitPrice} / pc</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                  <span>Total Volume Savings:</span>
                  <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-1">
                  <span>Branding & Mockup Setup:</span>
                  <span className="text-emerald-400 font-bold">100% FREE</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Estimated 18% GST (Input Tax Credit):</span>
                  <span className="text-slate-300">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Block */}
              <div className="pt-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-300">Grand Total (Net):</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[10px] text-slate-400">All-inclusive of luxury packaging & GST</p>
                  </div>
                </div>
              </div>

              {/* Enterprise Guarantee badges */}
              <div className="mt-6 pt-5 border-t border-[#212536] grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>GST Tax Invoice Provided</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-red-400 flex-shrink-0" />
                  <span>Multi-Drop Courier Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
                  <span>Physical Sample Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-blue-400 flex-shrink-0" />
                  <span>Dedicated Account Manager</span>
                </div>
              </div>

            </div>

            {/* Quick Hotline Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 to-[#12141c] border border-red-900/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Need an immediate enterprise quote?</p>
                <p className="text-[11px] text-slate-400">Directly connect with our Senior Corporate Gifting Specialist</p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hello%20Heecart,%20I%20have%20an%20urgent%20corporate%20bulk%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              >
                <MessageSquare size={14} />
                <span>Chat Now</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
