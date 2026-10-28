import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, Wand2, Upload, MessageSquare, ShoppingBag, ArrowLeft, Check, CheckCircle2, Clock, Box, Share2, Tag } from 'lucide-react';

export default function ProductPage({ product, onBack, onAddToCart, reviews = [], onAddReview }) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [customText, setCustomText] = useState('Rahul Sharma');
  const [fontFamily, setFontFamily] = useState('sans');
  const [userUploadedPhoto, setUserUploadedPhoto] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState('');
  const [activeTab, setActiveTab] = useState('desc'); // desc, specs, reviews

  // Review Form in Product Page
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Corporate tier pricing calculation
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
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserUploadedPhoto(URL.createObjectURL(file));
    }
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`✓ Delivery available! Estimated dispatch within 24-48 hrs via BlueDart Express.`);
    } else {
      setPincodeStatus(`Please enter a valid 6-digit Indian PIN code.`);
    }
  };

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
  };

  const handleWhatsAppOrder = () => {
    const msg = `*HEECART PRODUCT ORDER INQUIRY*%0A%0A` +
      `*Product:* ${product.name}%0A` +
      `*Quantity:* ${quantity} units%0A` +
      `*Total Price:* ₹${totalPrice.toLocaleString('en-IN')}%0A` +
      `*Custom Engraved Text:* ${customText}%0A` +
      `*Font:* ${fontFamily}%0A` +
      `*Gift Wrap:* ${giftWrap ? 'Yes' : 'No'}%0A` +
      (userUploadedPhoto ? `*Photo:* [Customer has uploaded photo]%0A` : '') +
      `%0A_Please share digital mockup on WhatsApp for approval!_`;

    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    onAddReview({
      id: `rev-${Date.now()}`,
      name: newReviewName,
      role: 'Verified Customer',
      productName: product.name,
      productId: product.id,
      stars: parseInt(newReviewRating),
      date: 'Just now',
      comment: newReviewComment,
      verified: true
    });

    setReviewSubmitted(true);
    setNewReviewName('');
    setNewReviewComment('');
  };

  const productReviews = reviews.filter(r => r.productId === product.id || !r.productId);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link / Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Products</span>
          </button>

          <span className="text-xs text-slate-400">
            Home / {product.categoryName} / <strong className="text-slate-700">{product.name}</strong>
          </span>
        </div>

        {/* Main Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          {/* Left Column: Image Gallery & Mockup Preview */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={userUploadedPhoto && product.category === 'frames' ? userUploadedPhoto : selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Live Engraved Text Preview Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Live Laser Engraving Preview
                </span>
                <p className={`text-sm sm:text-base font-bold text-slate-900 ${
                  fontFamily === 'serif' ? 'font-serif italic' :
                  fontFamily === 'sans' ? 'font-sans uppercase tracking-wider' :
                  fontFamily === 'script' ? 'italic' : 'font-mono'
                }`}>
                  {customText || 'Your Name / Logo Here'}
                </p>
              </div>

              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.gallery?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setUserUploadedPhoto(null);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img && !userUploadedPhoto ? 'border-red-600' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">100% Mockup Approval on WhatsApp</span>
              </div>
              <p className="pl-6 text-[11px] text-slate-500">
                We never laser-engrave or print until you review and approve the realistic 3D draft sent to your phone.
              </p>
            </div>

          </div>

          {/* Right Column: Pricing, Customization & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-red-600 font-bold uppercase tracking-wider text-[11px]">
                  {product.categoryName}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Made to order'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-xs pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹{unitPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Inclusive of all taxes & free laser engraving</p>
              </div>

              {activeDiscountLabel && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  {activeDiscountLabel} (Bulk Tier Applied)
                </span>
              )}
            </div>

            {/* Corporate Tier Slab Pricing (If available) */}
            {product.corporateTierPricing?.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Corporate Bulk Slab Rates (Units vs Rate)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {product.corporateTierPricing.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-xs ${
                        quantity >= tier.min && (idx === product.corporateTierPricing.length - 1 || quantity <= tier.max)
                          ? 'bg-red-50 border-red-500 font-bold text-red-700'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <p className="text-[10px] text-slate-400">{tier.min}+ pcs</p>
                      <p className="text-sm font-black text-slate-900">₹{tier.price}</p>
                      <span className="text-[10px] text-emerald-600">{tier.discount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1. Customization Inputs */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Personalization Name / Text or Company Name</span>
                <span className="text-[10px] text-slate-400 font-normal">Included Free</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={35}
                placeholder="Enter recipient name or company logo text"
                className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs sm:text-sm"
              />

              {/* Typography options */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-600">Choose Font Style:</span>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'sans', name: 'Modern Sans' },
                    { id: 'serif', name: 'Signature Serif' },
                    { id: 'script', name: 'Luxury Cursive' },
                    { id: 'mono', name: 'Tech Mono' },
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontFamily(f.id)}
                      className={`py-1.5 px-2 rounded-md border text-center text-xs ${
                        fontFamily === f.id
                          ? 'bg-red-600 text-white font-bold border-red-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload photo or logo */}
              <div className="pt-1">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Upload Photo or Company Logo (Optional):
                </label>
                <div className="relative border border-dashed border-slate-300 hover:border-red-500 rounded-lg p-3 text-center bg-slate-50 transition-colors">
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

              {/* Gift Wrap Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-slate-300"
                  />
                  <span>Add Heecart Signature Gift Box & Ribbon (+₹99)</span>
                </label>
              </div>

            </div>

            {/* 2. Pincode Delivery Check */}
            <form onSubmit={handleCheckPincode} className="pt-2 border-t border-slate-200 space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                Check Delivery Time to Your City
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="w-48 bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <p className="text-[11px] text-emerald-700 font-semibold">{pincodeStatus}</p>
              )}
            </form>

            {/* 3. Quantity & Total */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Quantity:</span>
                <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Total:</span>
                <p className="text-xl font-black text-slate-900">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <ShoppingBag size={16} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare size={16} />
                <span>Instant WhatsApp Order</span>
              </button>
            </div>

          </div>

        </div>

        {/* Tabbed Info Section: Description, Specs, Reviews */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2 transition-colors ${activeTab === 'desc' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 transition-colors ${activeTab === 'specs' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Key Specifications & Packing
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition-colors ${activeTab === 'reviews' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Customer Reviews ({productReviews.length})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                <p>{product.description}</p>
                <div className="pt-2">
                  <h4 className="font-bold text-slate-900 mb-2">Key Highlights:</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    {product.features?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 max-w-2xl">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Customization Tech</span>
                  <span>Fiber Metallic Laser Engraving / High-Definition UV Direct Print</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Lead Time</span>
                  <span>{product.leadTime || '24-48 Hours Express Dispatch'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Packaging</span>
                  <span>Shock-absorbing protective boxing with optional luxury satin wrap</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Warranty</span>
                  <span>100% Free transit replacement against physical damage</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Add Review on your own */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 max-w-xl">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Write a Review for {product.name}
                  </h4>
                  
                  {reviewSubmitted ? (
                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>Thank you! Your review has been added live to the store.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Your Name*</label>
                          <input
                            type="text"
                            required
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder="e.g. Ramesh Chandra"
                            className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-medium">Rating*</label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(e.target.value)}
                            className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-medium"
                          >
                            <option value="5">★★★★★ (5 Stars)</option>
                            <option value="4">★★★★☆ (4 Stars)</option>
                            <option value="3">★★★☆☆ (3 Stars)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-600 block mb-1 font-medium">Your Review Comment*</label>
                        <textarea
                          required
                          rows={3}
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="Share your experience regarding the laser quality, packaging, and delivery..."
                          className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs"
                      >
                        Publish Review Live
                      </button>
                    </form>
                  )}
                </div>

                {/* Existing Reviews List */}
                <div className="space-y-3 pt-2">
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-slate-500">No reviews yet for this product. Be the first to add one above!</p>
                  ) : (
                    productReviews.map(r => (
                      <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{r.name}</span>
                            {r.verified && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 text-[11px]">{r.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(r.stars || 5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
