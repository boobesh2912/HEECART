import React, { useState } from 'react';
import { X, Wand2, Upload, MessageSquare, ShoppingBag, Check, ShieldCheck, Sparkles, Image, RefreshCw, Star, Info, HelpCircle } from 'lucide-react';

export default function ProductCustomizerModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  // Customization Form States
  const [customText, setCustomText] = useState('Rahul & Ananya');
  const [customDate, setCustomDate] = useState('28.10.2023');
  const [songName, setSongName] = useState('Perfect - Ed Sheeran');
  const [fontFamily, setFontFamily] = useState('serif');
  const [engravingColor, setEngravingColor] = useState('silver');
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [userUploadedPhoto, setUserUploadedPhoto] = useState(null);
  const [giftWrap, setGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('With endless love and best wishes on your special milestone!');
  const [quantity, setQuantity] = useState(1);
  const [corporateLogoNote, setCorporateLogoNote] = useState('');

  // Handle Photo Upload Simulation
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserUploadedPhoto(url);
    }
  };

  // Determine current unit price based on corporate tiers
  let unitPrice = product.price;
  let activeDiscountLabel = '';
  if (product.corporateTierPricing && product.corporateTierPricing.length > 0) {
    const matchedTier = [...product.corporateTierPricing].reverse().find(tier => quantity >= tier.min);
    if (matchedTier) {
      unitPrice = matchedTier.price;
      activeDiscountLabel = matchedTier.discount;
    }
  }

  const wrapPrice = giftWrap ? 99 : 0;
  const totalPrice = (unitPrice * quantity) + wrapPrice;

  const fontOptions = [
    { id: 'serif', name: 'Signature Serif', style: 'font-serif italic' },
    { id: 'sans', name: 'Modern Minimal', style: 'font-sans font-bold uppercase tracking-wider' },
    { id: 'script', name: 'Luxury Cursive', style: 'italic tracking-wide' },
    { id: 'mono', name: 'Tech Precision', style: 'font-mono uppercase tracking-widest' },
  ];

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      unitPrice,
      totalPrice,
      customText,
      customDate,
      songName,
      fontFamily,
      engravingColor,
      userUploadedPhoto,
      giftWrap,
      giftNote,
      corporateLogoNote
    });
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const msg = `*NEW HEECART CUSTOM ORDER INQUIRY*%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Quantity:* ${quantity} units%0A` +
      `*Price:* ₹${totalPrice.toLocaleString('en-IN')}%0A` +
      `*Custom Name/Text:* ${customText}%0A` +
      (product.category === 'frames' ? `*Song/Barcode:* ${songName}%0A*Date:* ${customDate}%0A` : '') +
      `*Font Style:* ${fontFamily}%0A` +
      `*Gift Wrap:* ${giftWrap ? 'Yes (Luxury Red/Black Box)' : 'Standard'}%0A` +
      `*Gift Note:* ${giftNote}%0A` +
      (userUploadedPhoto ? `*Photo:* [Customer has uploaded a custom photo]%0A` : '') +
      (corporateLogoNote ? `*Corporate Logo Detail:* ${corporateLogoNote}%0A` : '') +
      `%0A_Please share the digital mockup preview for approval!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0f1118] border border-[#2a2e40] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-[#212434] bg-[#131622] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Wand2 size={16} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Personalize & Preview: {product.name}</span>
              </h2>
              <p className="text-xs text-slate-400">
                100% Free digital mockup sent to your WhatsApp before engraving
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1e2c] hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Content: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto p-4 sm:p-6 gap-6 sm:gap-8 flex-1">
          
          {/* Left Column: Interactive Live Preview Visualizer */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Visualizer Frame */}
            <div className="relative aspect-[4/4] rounded-2xl overflow-hidden bg-stone-900 border border-[#2b3044] shadow-inner flex items-center justify-center">
              
              {/* Product Background Image */}
              <img
                src={userUploadedPhoto && product.category === 'frames' ? userUploadedPhoto : selectedImage}
                alt="Product Preview"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Dynamic Engraving Overlay Simulation */}
              <div className="absolute inset-0 bg-black/35 pointer-events-none flex flex-col justify-end p-5 text-center">
                <div className="p-3 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 shadow-2xl">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-1">
                    ✦ Fiber Laser Engraving Live Preview ✦
                  </span>
                  
                  {/* Rendered Text with user's font */}
                  <p className={`text-base sm:text-lg text-white font-bold drop-shadow-md transition-all ${
                    fontFamily === 'serif' ? 'font-serif italic text-amber-100' :
                    fontFamily === 'sans' ? 'font-sans uppercase tracking-widest text-white' :
                    fontFamily === 'script' ? 'italic tracking-wider text-rose-100 font-medium' :
                    'font-mono tracking-widest text-emerald-200'
                  }`}>
                    {customText || 'Your Name / Logo Here'}
                  </p>

                  {product.category === 'frames' && (
                    <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-center gap-3 text-[11px] text-slate-300">
                      <span>♫ {songName || 'Your Favorite Song'}</span>
                      <span>•</span>
                      <span>{customDate || 'Special Date'}</span>
                    </div>
                  )}

                  <div className="mt-1 text-[9px] text-slate-400">
                    Finish: {engravingColor === 'silver' ? 'Metallic Silver Frost' : engravingColor === 'gold' ? 'Brushed Gold Foil' : 'Matte Obsidian'}
                  </div>
                </div>
              </div>

              {/* Uploaded photo badge */}
              {userUploadedPhoto && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                  <Check size={11} /> Photo Uploaded
                </div>
              )}

            </div>

            {/* Gallery Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.gallery?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setUserUploadedPhoto(null);
                  }}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img && !userUploadedPhoto ? 'border-red-500 scale-105' : 'border-[#262a3a] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust highlights */}
            <div className="p-3.5 rounded-xl bg-[#141622] border border-[#232737] space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-red-500 flex-shrink-0" />
                <span>Zero Risk: You approve the high-res 3D draft prior to crafting</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-amber-400 flex-shrink-0" />
                <span>Precision permanent etching guaranteed against fading</span>
              </div>
            </div>

          </div>

          {/* Right Column: Personalization Controls */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Title & Price Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  In Stock & Ready To Customize
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-white">
                  ₹{unitPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                {activeDiscountLabel && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded">
                    {activeDiscountLabel} (Corporate Slab Applied)
                  </span>
                )}
              </div>
            </div>

            {/* Corporate Slab Pricing Table (If bulk items) */}
            {product.corporateTierPricing?.length > 0 && (
              <div className="p-3 rounded-xl bg-[#141622] border border-[#242838] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-red-400" />
                    Corporate Quantity Discount Slabs
                  </span>
                  <span className="text-[11px] text-slate-400">Select quantity below to apply</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {product.corporateTierPricing.map((tier, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded-lg border transition-all ${
                        quantity >= tier.min && (idx === product.corporateTierPricing.length - 1 || quantity <= tier.max)
                          ? 'bg-red-600/20 border-red-500 text-white font-bold'
                          : 'bg-[#181a24] border-[#292c3c] text-slate-300'
                      }`}
                    >
                      <p className="text-[11px] text-slate-400">{tier.min}+ Units</p>
                      <p className="text-sm font-black text-white">₹{tier.price}</p>
                      <span className="text-[10px] text-emerald-400">{tier.discount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1. Enter Custom Text / Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>1. Engraved Text / Recipient Name or Company Name</span>
                <span className="text-[11px] text-slate-400 font-normal">Max 35 Characters</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={35}
                placeholder="e.g. Vikramaditya Singh / Google Team"
                className="w-full bg-[#161822] text-white px-4 py-2.5 rounded-xl border border-[#2b2f42] focus:outline-none focus:border-red-500 text-sm placeholder-slate-500"
              />
            </div>

            {/* Conditional fields for Spotify Plaque & Frames */}
            {product.category === 'frames' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">
                    Song Title & Artist (For Spotify Plaque)
                  </label>
                  <input
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="e.g. Kesariya - Arijit Singh"
                    className="w-full bg-[#161822] text-white px-3 py-2 rounded-xl border border-[#2b2f42] focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">
                    Significant Date or Milestone
                  </label>
                  <input
                    type="text"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    placeholder="e.g. 24.11.2023"
                    className="w-full bg-[#161822] text-white px-3 py-2 rounded-xl border border-[#2b2f42] focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Photo Upload Simulator */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>2. Upload Photo or Company Logo (Optional)</span>
                <span className="text-[11px] text-slate-400 font-normal">PNG, JPG, SVG up to 25MB</span>
              </label>
              <div className="relative border-2 border-dashed border-[#2d3144] hover:border-red-500 rounded-xl p-4 text-center bg-[#13151f] transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#1c1f2e] group-hover:bg-red-600/20 text-slate-400 group-hover:text-red-400 flex items-center justify-center transition-colors">
                    <Upload size={18} />
                  </div>
                  <p className="text-xs font-semibold text-slate-300">
                    {userUploadedPhoto ? 'Photo selected! Click to change' : 'Click to browse or drop your high-res photo'}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    You can also email or WhatsApp the photos directly after ordering.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Choose Font Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">
                3. Choose Engraving Typography Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {fontOptions.map(font => (
                  <button
                    key={font.id}
                    onClick={() => setFontFamily(font.id)}
                    className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                      fontFamily === font.id
                        ? 'bg-red-600/20 border-red-500 text-white font-bold shadow-sm'
                        : 'bg-[#151722] border-[#272b3b] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className={font.style}>{font.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Luxury Gift Box Wrapping Add-on */}
            <div className="p-3.5 rounded-xl bg-[#141622] border border-[#242838] flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-[#1e2230] border-[#31364a]"
                />
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Add Signature Heecart Luxury Red & Black Keepsake Box</span>
                    <span className="text-red-400 font-mono text-[11px]">+₹99</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Includes satin ribbon, wax seal emblem, and protective satin cushioned bed.
                  </p>
                </div>
              </label>
            </div>

            {/* 5. Quantity & Total Calculation */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1e2230]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center rounded-xl bg-[#161822] border border-[#2b2f42] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#202332] hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center bg-transparent text-white font-bold text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#202332] hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
                {quantity >= 25 && (
                  <span className="text-[11px] font-bold text-emerald-400">
                    Tier Discount Active!
                  </span>
                )}
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">Estimated Total (Incl. GST):</p>
                <p className="text-2xl font-black text-white">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Instant WhatsApp Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all active:scale-98"
              >
                <ShoppingBag size={17} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <MessageSquare size={17} />
                <span>Instant WhatsApp Order</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
