import React, { useState } from 'react';
import { Award, Calculator, CheckCircle2, MessageSquare, Building2, Truck, FileCheck } from 'lucide-react';

export default function CorporateQuoteCalculator({ products = [] }) {
  const corporateItems = products.filter(p => p.category === 'hampers' || p.category === 'bottles' || p.corporateTierPricing?.length > 0);

  const [selectedProductId, setSelectedProductId] = useState(corporateItems[0]?.id || 'corp-royal-hamper');
  const [quantity, setQuantity] = useState(50);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [brandingOption, setBrandingOption] = useState('both');

  const selectedProduct = corporateItems.find(p => p.id === selectedProductId) || corporateItems[0] || products[0];

  let unitPrice = selectedProduct?.price || 1899;
  let slabDiscount = '0%';
  if (selectedProduct?.corporateTierPricing?.length > 0) {
    const matchedTier = [...selectedProduct.corporateTierPricing].reverse().find(tier => quantity >= tier.min);
    if (matchedTier) {
      unitPrice = matchedTier.price;
      slabDiscount = matchedTier.discount;
    }
  }

  const subtotal = unitPrice * quantity;
  const standardTotal = (selectedProduct?.price || 1899) * quantity;
  const totalSavings = standardTotal - subtotal;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    const msg = `*CORPORATE BULK GIFTING RFQ - HEECART*%0A%0A` +
      `*Company:* ${companyName || 'Not specified'}%0A` +
      `*Contact Person:* ${contactPerson || 'Not specified'}%0A` +
      `*Phone/WhatsApp:* ${phone}%0A` +
      `*Email:* ${email}%0A%0A` +
      `*Selected Kit:* ${selectedProduct?.name}%0A` +
      `*Required Quantity:* ${quantity} units%0A` +
      `*Unit Price (Slab):* ₹${unitPrice}%0A` +
      `*Estimated Subtotal:* ₹${subtotal.toLocaleString('en-IN')}%0A` +
      `*Estimated Savings:* ₹${totalSavings.toLocaleString('en-IN')} (${slabDiscount})%0A` +
      `*Branding:* ${brandingOption === 'both' ? 'Both Logo & Individual Names' : brandingOption === 'logo' ? 'Company Logo Only' : 'Individual Names'}` +
      `%0A%0A_Please confirm dispatch timeline and share mockup!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <section id="corporate-rfq" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-red-600 font-bold text-xs uppercase tracking-wider">
            Enterprise Procurement
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Corporate Gifting Quotation & Slab Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select your hamper, slide to your desired volume, and instantly view tier rates and GST tax credit estimates.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-sm">
            <form onSubmit={handleSubmitQuote} className="space-y-5">
              
              {/* Product Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">
                  Select Corporate Kit or Hamper:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {corporateItems.slice(0, 4).map(item => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedProductId(item.id)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                        selectedProductId === item.id
                          ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                      <div className="overflow-hidden">
                        <p className="text-xs truncate">{item.name}</p>
                        <span className="text-[10px] text-red-600 font-bold">Base: ₹{item.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Order Quantity</span>
                  <span className="text-lg font-black text-red-600">{quantity} units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10 pcs</span>
                  <span>50 pcs</span>
                  <span>100 pcs</span>
                  <span>250 pcs</span>
                  <span>500+ pcs</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name (e.g. Infosys)*"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Contact Person Name*"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone / WhatsApp Number*"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Official Work Email*"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare size={16} />
                <span>Submit RFQ & Get Digital Mockup on WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Quotation Slip */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Estimated Proposal</span>
                <h3 className="text-sm font-bold text-slate-900">Heecart Bulk Slab Breakdown</h3>
              </div>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                {slabDiscount} Slab
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 py-2 border-b border-slate-200">
              <div className="flex justify-between">
                <span>Selected Item:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[180px]">{selectedProduct?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-bold text-slate-900">{quantity} units</span>
              </div>
              <div className="flex justify-between">
                <span>Discounted Slab Rate:</span>
                <span className="text-red-600 font-bold">₹{unitPrice} / unit</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Estimated Volume Savings:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>18% GST (Input Tax Credit):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-700">Total Payable:</span>
              <span className="text-2xl font-black text-slate-900">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <FileCheck size={13} className="text-emerald-600" />
                <span>GST Tax Invoices</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={13} className="text-red-600" />
                <span>Multi-drop Pan-India</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
