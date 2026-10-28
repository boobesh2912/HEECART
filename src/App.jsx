import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustFeatures from './components/TrustFeatures';
import ProductCard from './components/ProductCard';
import ProductPage from './components/ProductPage';
import ProductCustomizerModal from './components/ProductCustomizerModal';
import CorporateQuoteCalculator from './components/CorporateQuoteCalculator';
import OrderTrackingModal from './components/OrderTrackingModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReviewsSection from './components/ReviewsSection';
import InstagramShowcase from './components/InstagramShowcase';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import MobileBottomNav from './components/MobileBottomNav';
import AuthOtpModal from './components/AuthOtpModal';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_COUPONS, CATEGORIES } from './data/products';
import { SlidersHorizontal, Check, Award, Lock, Sparkles, Filter } from 'lucide-react';

export default function App() {
  // Products, Reviews, Orders and Coupons with LocalStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_live_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_live_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch (e) {
      return INITIAL_REVIEWS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_live_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_live_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch (e) {
      return INITIAL_COUPONS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('heecart_user_auth');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // LocalStorage sync
  useEffect(() => {
    try { localStorage.setItem('heecart_live_products', JSON.stringify(products)); } catch (e) {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem('heecart_live_reviews', JSON.stringify(reviews)); } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem('heecart_live_orders', JSON.stringify(orders)); } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem('heecart_live_coupons', JSON.stringify(coupons)); } catch (e) {}
  }, [coupons]);

  useEffect(() => {
    try { 
      if (currentUser) {
        localStorage.setItem('heecart_user_auth', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('heecart_user_auth');
      }
    } catch (e) {}
  }, [currentUser]);

  // View state: 'home' or 'product-page'
  const [currentView, setCurrentView] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all'); // 'all', 'featured', 'top-sales'
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  // Cart State
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
    } catch (e) {}
  }, [cart]);

  // Modals
  const [customizerProduct, setCustomizerProduct] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cart operations
  const handleAddToCart = (customizedItem) => {
    setCart(prev => [...prev, customizedItem]);
    showToast(`Added "${customizedItem.product.name}" to your bag!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCart(prev => {
      const updated = [...prev];
      const item = updated[index];
      let newUnitPrice = item.product.price;

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
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from bag');
  };

  // Admin CRUD Handlers
  const handleAddProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`New product "${newProd.name}" added to store!`);
  };

  const handleUpdateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? { ...p, ...updatedProd } : p));
    showToast(`Product "${updatedProd.name}" updated live!`);
  };

  const handleDeleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
    showToast('Product removed from store.');
  };

  const handleAddReview = (newRev) => {
    setReviews(prev => [newRev, ...prev]);
    showToast('Customer review published live!');
  };

  const handleDeleteReview = (revId) => {
    setReviews(prev => prev.filter(r => r.id !== revId));
    showToast('Review removed.');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status set to ${newStatus}`);
  };

  const handleUpdateOrderCourier = (orderId, courierData) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...courierData } : o));
    showToast(`Courier tracking assigned for Order #${orderId}`);
  };

  const handleAddCoupon = (newCoupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Festival coupon ${newCoupon.code} created!`);
  };

  const handleDeleteCoupon = (couponId) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
    showToast('Coupon removed.');
  };

  const handleToggleCoupon = (couponId) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, active: !c.active } : c));
    showToast('Coupon status updated.');
  };

  const handleSaveCustomerLead = (lead) => {
    setOrders(prev => [lead, ...prev]);
  };

  // Open Dedicated Product Page
  const handleSelectProduct = (product) => {
    setActiveProduct(product);
    setCurrentView('product-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomizer = (product) => {
    setCustomizerProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleQuickInquiry = (product) => {
    const msg = `Hi Heecart! I want to inquire about "${product.name}" (Price: ₹${product.price}). Please share customization options.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleScrollToCorporate = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('corporate-rfq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('corporate-rfq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProducts = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Search Logic
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' ? true : item.category === selectedCategory;
    
    const matchesTag = 
      filterTag === 'all' ? true :
      filterTag === 'featured' ? !!item.isFeatured :
      filterTag === 'top-sales' ? !!item.isTopSales : true;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.reviewsCount || 0) - (a.reviewsCount || 0);
  });

  const cartTotalAmount = cart.reduce((acc, i) => acc + i.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 animate-fadeIn">
          <Check size={15} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenCorporateRFQ={handleScrollToCorporate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onGoHome={handleGoHome}
      />

      {/* Main Body: Switch between Home and Individual Product Page */}
      {currentView === 'product-page' && activeProduct ? (
        <ProductPage
          product={activeProduct}
          onBack={handleGoHome}
          onAddToCart={handleAddToCart}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      ) : (
        /* Home View (Printmine style) */
        <>
          {/* Dynamic Hero Section that changes based on selected category! */}
          <Hero
            selectedCategory={selectedCategory}
            onExploreClick={handleScrollToProducts}
            onCorporateClick={handleScrollToCorporate}
          />

          <TrustFeatures />

          {/* Catalog Section */}
          <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-red-600 font-bold text-xs uppercase tracking-wider">
                  The Heecart Collection
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {selectedCategory === 'hampers' ? 'Corporate Hampers & Gift Sets' :
                   selectedCategory === 'bottles' ? 'LED Temperature Bottles' :
                   selectedCategory === 'frames' ? 'Photo Frames & Spotify Plaques' :
                   selectedCategory === 'stationery' ? 'Diaries, Pens & Desk Sets' :
                   selectedCategory === 'combos' ? 'Personalized Combos' : 'All Personalized Gifts & Hampers'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Custom laser engraving and UV printing on all orders. Free digital mockups.
                </p>
              </div>

              {/* Filters & Sorting */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Tag Filter Chips */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setFilterTag('all')}
                    className={`px-2.5 py-1 rounded font-semibold ${filterTag === 'all' ? 'bg-red-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterTag('featured')}
                    className={`px-2.5 py-1 rounded font-semibold ${filterTag === 'featured' ? 'bg-red-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Featured
                  </button>
                  <button
                    onClick={() => setFilterTag('top-sales')}
                    className={`px-2.5 py-1 rounded font-semibold ${filterTag === 'top-sales' ? 'bg-red-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Top Sales
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <SlidersHorizontal size={13} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white text-xs font-semibold text-slate-700 py-1.5 px-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-red-600"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white rounded-xl border border-slate-200 p-8">
                <p className="text-base font-bold text-slate-800">No products found matching your filter</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setFilterTag('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={handleSelectProduct}
                    onCustomize={handleOpenCustomizer}
                    onQuickInquiry={handleQuickInquiry}
                  />
                ))}
              </div>
            )}

          </section>

          {/* Corporate RFQ Calculator */}
          <CorporateQuoteCalculator products={products} />

          {/* Reviews Section */}
          <ReviewsSection reviews={reviews} />

          {/* Instagram Showcase */}
          <InstagramShowcase />

          {/* FAQ Accordion */}
          <FAQSection />
        </>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
        }}
        onOpenCorporateRFQ={handleScrollToCorporate}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Sticky Mobile Bottom Navigation Bar (like Blinkit / Zepto) */}
      <MobileBottomNav
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onGoHome={handleGoHome}
        onOpenCategories={handleScrollToProducts}
      />

      {/* Modals */}
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
        coupons={coupons}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={() => {
          setCart([]);
          try { localStorage.removeItem('heecart_bag'); } catch (e) {}
        }}
        onSaveCustomerLead={handleSaveCustomerLead}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

      {/* Store Admin & CRM Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        reviews={reviews}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateOrderCourier={handleUpdateOrderCourier}
        coupons={coupons}
        onAddCoupon={handleAddCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        onToggleCoupon={handleToggleCoupon}
      />

      {/* Mobile OTP Auth Modal */}
      <AuthOtpModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={currentUser}
        onLoginSuccess={(usr) => {
          setCurrentUser(usr);
          showToast(`Welcome back, ${usr.name}!`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged out successfully.');
        }}
      />

    </div>
  );
}
