import React, { useState } from 'react';
import { X, Wand2, Upload, MessageSquare, ShoppingBag, Check, ShieldCheck } from 'lucide-react';

export default function ProductCustomizerModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const [customText, setCustomText] = useState('Rahul Sharma');
  const [fontFamily, setFontFamily] = useState('sans');
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [userUploadedPhoto, setUserUploadedPhoto] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserUploadedPhoto(URL.createObjectURL(file));
    }
  };

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
    { id: 'sans', name: 'Modern Sans', style: 'font-sans uppercase tracking-wider' },
    { id: 'serif', name: 'Signature Serif', style: 'font-serif italic' },
    { id: 'script', name: 'Luxury Cursive', style: 'italic' },
    { id: 'mono', name: 'Tech Precision', style: 'font-mono' },
  ];

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      unitPrice,
      totalPrice,
      customText,
      fontFamily,
      userUploadedPhoto,
      giftWrap
    });
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const msg = `*HEECART QUICK CUSTOM ORDER*%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Quantity:* ${quantity} units%0A` +
      `*Price:* ₹${totalPrice.toLocaleString('en-IN')}%0A` +
      `*Custom Name/Logo:* ${customText}%0A` +
      `*Font:* ${fontFamily}%0A` +
      `*Gift Wrap:* ${giftWrap ? 'Yes' : 'No'}%0A` +
      (userUploadedPhoto ? `*Photo:* [Customer has uploaded a custom photo]%0A` : '') +
      `%0A_Please share digital mockup for approval!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Wand2 size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Personalize & Order: {product.name}
              </h2>
              <p className="text-[11px] text-slate-500">Free mockup preview sent on WhatsApp before engraving</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto p-5 sm:p-6 gap-6 flex-1 bg-white">
          
          {/* Left Column: Live Preview */}
          <div className="lg:col-span-5 space-y-3">
            
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={userUploadedPhoto && product.category === 'frames' ? userUploadedPhoto : selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {/* Rendered Laser Preview */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-200 text-center shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Laser Engraving Preview
                </span>
                <p className={`text-base font-bold text-slate-900 ${
                  fontFamily === 'serif' ? 'font-serif italic text-slate-800' :
                  fontFamily === 'sans' ? 'font-sans uppercase tracking-wider' :
                  fontFamily === 'script' ? 'italic text-red-800' :
                  'font-mono tracking-widest'
                }`}>
                  {customText || 'Your Name / Logo Here'}
                </p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.gallery?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setUserUploadedPhoto(null);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    selectedImage === img && !userUploadedPhoto ? 'border-red-600' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck size={16} className="text-red-600 flex-shrink-0" />
              <span>We share a 3D digital mockup on WhatsApp before engraving starts.</span>
            </div>

          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold uppercase tracking-wider text-[10px]">{product.categoryName}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px]">In Stock</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{product.name}</h3>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-xl font-black text-slate-900">₹{unitPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                {activeDiscountLabel && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {activeDiscountLabel} (Slab Applied)
                  </span>
                )}
              </div>
            </div>

            {/* Custom text */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                Enter Custom Name / Company Logo Text:
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={35}
                placeholder="Recipient name or company title"
                className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
              />
            </div>

            {/* Font Style */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                Choose Typography:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {fontOptions.map(font => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setFontFamily(font.id)}
                    className={`py-1.5 px-2 rounded-md border text-center text-xs ${
                      fontFamily === font.id
                        ? 'bg-red-600 text-white font-bold border-red-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload photo */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                Upload Photo / Logo (Optional):
              </label>
              <div className="relative border border-dashed border-slate-300 rounded-lg p-2.5 text-center bg-slate-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Upload size={14} className="text-red-600" />
                  <span>{userUploadedPhoto ? 'Photo selected! Click to change' : 'Upload photo / logo (or WhatsApp it later)'}</span>
                </div>
              </div>
            </div>

            {/* Gift Box Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span>Include Heecart Signature Gift Box & Ribbon (+₹99)</span>
              </label>
            </div>

            {/* Quantity & Total */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Qty:</span>
                <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-slate-400 text-[11px]">Total:</span>
                <p className="text-xl font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare size={15} />
                <span>Instant WhatsApp Order</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
