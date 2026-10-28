import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustFeatures from './components/TrustFeatures';
import ProductCard from './components/ProductCard';
import ProductCustomizerModal from './components/ProductCustomizerModal';
import CorporateQuoteCalculator from './components/CorporateQuoteCalculator';
import OrderTrackingModal from './components/OrderTrackingModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReviewsSection from './components/ReviewsSection';
import InstagramShowcase from './components/InstagramShowcase';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Filter, SlidersHorizontal, Sparkles, Check, ArrowRight, MessageSquare, Award } from 'lucide-react';

export default function App() {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_bag');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('heecart_bag', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Modal States
  const [customizerProduct, setCustomizerProduct] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Add Item to Cart
  const handleAddToCart = (customizedItem) => {
    setCart((prev) => [...prev, customizedItem]);
    showToast(`Added "${customizedItem.product.name}" to your bag!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCart((prev) => {
      const updated = [...prev];
      const item = updated[index];
      let newUnitPrice = item.product.price;
      
      // Update corporate tier if bulk
      if (item.product.corporateTierPricing?.length > 0) {
        const matchedTier = [...item.product.corporateTierPricing].reverse().find(t => newQty >= t.min);
        if (matchedTier) newUnitPrice = matchedTier.price;
      }

      const wrapCost = item.giftWrap ? 99 : 0;
      item.quantity = newQty;
      item.unitPrice = newUnitPrice;
      item.totalPrice = (newUnitPrice * newQty) + wrapCost;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from bag');
  };

  const handleOpenCustomizer = (product) => {
    setCustomizerProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleQuickInquiry = (product) => {
    const msg = `Hi Heecart Studio! I'm interested in customizing "${product.name}" (Base Price: ₹${product.price}). Could you please share options and mockup details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleScrollToCorporate = () => {
    const el = document.getElementById('corporate-rfq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProducts = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Search Logic
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'corporate' ? (item.category === 'corporate' || item.corporateTierPricing?.length > 0) :
      item.category === selectedCategory;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  return (
    <div className="min-h-screen bg-[#08090b] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold shadow-glow-red-lg animate-bounce">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenCorporateRFQ={handleScrollToCorporate}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleScrollToProducts}
        onCorporateClick={handleScrollToCorporate}
      />

      {/* Trust & Corporate Assurance Strip */}
      <TrustFeatures />

      {/* Main Catalog Section */}
      <section id="catalog-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-bold mb-2">
              <Sparkles size={12} />
              <span>THE HEECART GALLERY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Curated Customized Creations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
              Every item is tailored with your photos, names, dates, or corporate branding. Approved via WhatsApp before crafting.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <SlidersHorizontal size={13} /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141622] text-xs font-semibold text-slate-200 py-2 px-3 rounded-xl border border-[#272b3c] focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-glow-red'
                  : 'bg-[#13151f] text-slate-400 hover:text-white border border-[#222536] hover:border-slate-600'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.id ? 'bg-red-900 text-red-200' : 'bg-[#1e2230] text-slate-400'
              }`}>
                {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => cat.id === 'corporate' ? (p.category === 'corporate' || p.corporateTierPricing?.length > 0) : p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#11131c] rounded-3xl border border-[#232738] p-8">
            <p className="text-lg font-bold text-white">No products found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-400">Try searching for "hamper", "bottle", "frame", or reset categories.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={handleOpenCustomizer}
                onQuickInquiry={handleQuickInquiry}
              />
            ))}
          </div>
        )}

      </section>

      {/* Corporate Slab Quotation & RFQ Calculator */}
      <CorporateQuoteCalculator />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* Instagram Community Showcase */}
      <InstagramShowcase />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenCorporateRFQ={handleScrollToCorporate}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductCustomizerModal
        product={customizerProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(data) => {
          setCheckoutData(data);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={() => {
          setCart([]);
          try {
            localStorage.removeItem('heecart_bag');
          } catch (e) {}
        }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

    </div>
  );
}
