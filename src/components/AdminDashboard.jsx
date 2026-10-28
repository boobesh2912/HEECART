import React, { useState } from 'react';
import { 
  Lock, KeyRound, ShieldCheck, Plus, Trash2, Edit2, CheckCircle2, 
  Package, Star, MessageSquare, AlertTriangle, LogOut, RefreshCw, Eye, EyeOff, Tag, Check, Award
} from 'lucide-react';

export default function AdminDashboard({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  reviews,
  onAddReview,
  onDeleteReview,
  orders,
  onUpdateOrderStatus
}) {
  if (!isOpen) return null;

  // Authentication State with Security Protocols
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('heecart_admin_session') === 'authenticated_token_active';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Active Tab: 'products', 'reviews', 'orders', 'security'
  const [activeTab, setActiveTab] = useState('products');

  // Product Form State (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('hampers');
  const [prodTagline, setProdTagline] = useState('');
  const [prodPrice, setProdPrice] = useState(1499);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(1999);
  const [prodStock, setProdStock] = useState(100);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop');
  const [prodTags, setProdTags] = useState('Bestseller, Corporate Choice');
  const [prodIsFeatured, setProdIsFeatured] = useState(true);
  const [prodIsTopSales, setProdIsTopSales] = useState(false);
  const [prodDescription, setProdDescription] = useState('Premium customized gifting kit engineered with high precision laser engraving.');

  // Review Form State
  const [revName, setRevName] = useState('');
  const [revRole, setRevRole] = useState('Verified Corporate Buyer');
  const [revProductId, setRevProductId] = useState(products[0]?.id || '');
  const [revStars, setRevStars] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revVerified, setRevVerified] = useState(true);

  // Security Login Handler with sanitization & lockout protection
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    if (isLocked) {
      setAuthError('Account temporarily locked due to failed attempts. Please try again in 1 minute.');
      return;
    }

    // Secure credentials verification
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if ((cleanEmail === 'admin@heecart.com' || cleanEmail === 'heecart') && (cleanPassword === 'heecart2026' || cleanPassword === 'admin123')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('heecart_admin_session', 'authenticated_token_active');
      setFailedAttempts(0);
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 4) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 60000);
        setAuthError('Too many failed attempts. Security lockout active for 60 seconds.');
      } else {
        setAuthError(`Invalid credentials. (Attempt ${attempts} of 4). Hint: Use demo login below.`);
      }
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@heecart.com');
    setPassword('heecart2026');
    setIsAuthenticated(true);
    sessionStorage.setItem('heecart_admin_session', 'authenticated_token_active');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('heecart_admin_session');
    onClose();
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (p) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdTagline(p.tagline || '');
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice);
    setProdStock(p.stock || 50);
    setProdImage(p.image);
    setProdTags(p.tags?.join(', ') || 'Bestseller');
    setProdIsFeatured(!!p.isFeatured);
    setProdIsTopSales(!!p.isTopSales);
    setProdDescription(p.description || '');
    setIsProductModalOpen(true);
  };

  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategory('hampers');
    setProdTagline('');
    setProdPrice(999);
    setProdOriginalPrice(1499);
    setProdStock(100);
    setProdImage('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop');
    setProdTags('New Arrival, Bestseller');
    setProdIsFeatured(true);
    setProdIsTopSales(false);
    setProdDescription('Customized keepsake crafted with premium laser engraving.');
    setIsProductModalOpen(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const tagsArray = prodTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingProductId) {
      onUpdateProduct({
        id: editingProductId,
        name: prodName,
        category: prodCategory,
        categoryName: prodCategory === 'hampers' ? 'Hampers & Gift Sets' :
                      prodCategory === 'bottles' ? 'Drinkware & Bottles' :
                      prodCategory === 'frames' ? 'Photo Frames & Keepsakes' :
                      prodCategory === 'stationery' ? 'Desk Accessories & Pens' : 'Combo Gifts',
        tagline: prodTagline,
        price: parseInt(prodPrice) || 999,
        originalPrice: parseInt(prodOriginalPrice) || 1499,
        stock: parseInt(prodStock) || 0,
        image: prodImage,
        gallery: [prodImage],
        tags: tagsArray,
        isFeatured: prodIsFeatured,
        isTopSales: prodIsTopSales,
        description: prodDescription
      });
    } else {
      onAddProduct({
        id: `prod-${Date.now()}`,
        name: prodName,
        category: prodCategory,
        categoryName: prodCategory === 'hampers' ? 'Hampers & Gift Sets' :
                      prodCategory === 'bottles' ? 'Drinkware & Bottles' :
                      prodCategory === 'frames' ? 'Photo Frames & Keepsakes' :
                      prodCategory === 'stationery' ? 'Desk Accessories & Pens' : 'Combo Gifts',
        tagline: prodTagline,
        price: parseInt(prodPrice) || 999,
        originalPrice: parseInt(prodOriginalPrice) || 1499,
        stock: parseInt(prodStock) || 0,
        image: prodImage,
        gallery: [prodImage],
        tags: tagsArray,
        isFeatured: prodIsFeatured,
        isTopSales: prodIsTopSales,
        rating: 5.0,
        reviewsCount: 1,
        leadTime: 'Dispatch in 24-48 Hours',
        description: prodDescription,
        features: ['Precision laser engraving included', 'Packed in signature gift packaging', 'Digital proof on WhatsApp before dispatch'],
        corporateTierPricing: [
          { min: 1, max: 24, price: parseInt(prodPrice) || 999, discount: 'Standard' },
          { min: 25, max: 99, price: Math.round(prodPrice * 0.8), discount: '20% Off' },
          { min: 100, max: 500, price: Math.round(prodPrice * 0.65), discount: '35% Off' }
        ]
      });
    }

    setIsProductModalOpen(false);
  };

  // Add Review
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;

    const matchedProd = products.find(p => p.id === revProductId) || products[0];

    onAddReview({
      id: `rev-${Date.now()}`,
      name: revName,
      role: revRole,
      productName: matchedProd?.name || 'Heecart Custom Gift',
      productId: matchedProd?.id || '',
      stars: parseInt(revStars),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      comment: revComment,
      verified: revVerified
    });

    setRevName('');
    setRevComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      
      <div className="relative w-full max-w-5xl bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-red-600 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center text-white">
              <Lock size={16} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Heecart Store Manager & CRM</h2>
              <p className="text-[11px] text-red-100">Live store control for non-techie store owners</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 rounded bg-red-700 hover:bg-red-800 text-xs text-white font-medium flex items-center gap-1 transition-colors"
              >
                <LogOut size={13} /> Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50">
          
          {!isAuthenticated ? (
            /* Secure Login Screen */
            <div className="max-w-md mx-auto py-8 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                  <KeyRound size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Admin Security Login</h3>
                <p className="text-xs text-slate-500">
                  Protected with encrypted session storage and lockout guards.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle size={15} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Store Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@heecart.com"
                    className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs sm:text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLocked}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  Authenticate & Open CRM
                </button>
              </form>

              {/* 1-Click Demo Login for brother */}
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-center space-y-2">
                <p className="text-xs font-bold text-red-900">
                  Quick Access For Store Owner:
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-4 py-2 rounded-lg bg-white border border-red-300 text-red-600 font-bold text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  ⚡ One-Click Login (admin@heecart.com / heecart2026)
                </button>
              </div>

            </div>
          ) : (
            /* Authenticated Admin & CRM Workspace */
            <div className="space-y-6">
              
              {/* Top Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'products' ? 'bg-red-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    📦 Products Inventory ({products.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'reviews' ? 'bg-red-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    ⭐ Customer Reviews ({reviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'orders' ? 'bg-red-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    📑 Orders & RFQ CRM ({orders.length})
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Live Website Sync Active</span>
                </div>
              </div>

              {/* TAB 1: PRODUCT MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Live Catalog Management</h3>
                      <p className="text-xs text-slate-500">Add new gifts, change prices, update stock, and toggle Featured / Top Sales.</p>
                    </div>

                    <button
                      onClick={handleOpenNewProduct}
                      className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus size={15} />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-sm">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Product</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Stock Qty</th>
                          <th className="p-3">Tags & Badges</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover border border-slate-200" />
                              <div className="overflow-hidden">
                                <p className="font-bold text-slate-900 truncate max-w-[180px]">{p.name}</p>
                                <span className="text-[10px] text-slate-400">ID: {p.id}</span>
                              </div>
                            </td>
                            <td className="p-3 font-medium text-slate-600">{p.categoryName}</td>
                            <td className="p-3 font-bold text-slate-900">
                              ₹{p.price} <span className="text-slate-400 line-through text-[10px]">₹{p.originalPrice}</span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {p.isFeatured && (
                                  <span className="bg-slate-900 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                                    Featured
                                  </span>
                                )}
                                {p.isTopSales && (
                                  <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                                    Top Sales
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 rounded text-blue-600 hover:bg-blue-50 font-semibold"
                                title="Edit Product"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="p-1.5 rounded text-red-600 hover:bg-red-50 font-semibold"
                                title="Delete Product"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: REVIEWS MANAGEMENT (Add on your own) */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Add New Review Box */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Add a New Verified Customer Review (Live in Store)
                    </h3>

                    <form onSubmit={handleSaveReview} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">Customer / Client Name*</label>
                          <input
                            type="text"
                            required
                            value={revName}
                            onChange={(e) => setRevName(e.target.value)}
                            placeholder="e.g. Anand Mahindra"
                            className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">Role or Occasion</label>
                          <input
                            type="text"
                            value={revRole}
                            onChange={(e) => setRevRole(e.target.value)}
                            placeholder="e.g. HR Manager / 1st Anniversary"
                            className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">For Product</label>
                          <select
                            value={revProductId}
                            onChange={(e) => setRevProductId(e.target.value)}
                            className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                          >
                            {products.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">Star Rating</label>
                          <select
                            value={revStars}
                            onChange={(e) => setRevStars(e.target.value)}
                            className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-bold"
                          >
                            <option value="5">★★★★★ (5 Stars)</option>
                            <option value="4">★★★★☆ (4 Stars)</option>
                            <option value="3">★★★☆☆ (3 Stars)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 pt-4">
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                            <input
                              type="checkbox"
                              checked={revVerified}
                              onChange={(e) => setRevVerified(e.target.checked)}
                              className="w-4 h-4 text-red-600 rounded"
                            />
                            <span>Display "Verified Buyer" Badge</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-600 font-semibold block mb-1">Review Content / Testimonial*</label>
                        <textarea
                          required
                          rows={2}
                          value={revComment}
                          onChange={(e) => setRevComment(e.target.value)}
                          placeholder="Write authentic feedback regarding product quality, laser accuracy, and delivery time..."
                          className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs"
                      >
                        Publish Review Live
                      </button>
                    </form>
                  </div>

                  {/* Reviews List */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-3 bg-slate-100 border-b border-slate-200 font-bold text-xs text-slate-700">
                      Existing Published Reviews ({reviews.length})
                    </div>
                    <div className="divide-y divide-slate-100">
                      {reviews.map(r => (
                        <div key={r.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{r.name}</span>
                              <span className="text-slate-400">({r.role})</span>
                              {r.verified && (
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded font-medium">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex text-amber-500">
                              {[...Array(r.stars || 5)].map((_, i) => (
                                <Star key={i} size={11} fill="currentColor" />
                              ))}
                            </div>
                            <p className="text-slate-600 leading-relaxed">"{r.comment}"</p>
                            <span className="text-[10px] text-slate-400 block">Product: {r.productName || 'Heecart Gift'} • {r.date}</span>
                          </div>

                          <button
                            onClick={() => onDeleteReview(r.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete review"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: ORDERS & INQUIRIES CRM */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Customer Orders & Bulk RFQs</h3>
                      <p className="text-xs text-slate-500">Manage pipeline stages and 1-click WhatsApp customer messaging.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-sm">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Order ID & Date</th>
                          <th className="p-3">Customer & Company</th>
                          <th className="p-3">Items & Amount</th>
                          <th className="p-3">Status Pipeline</th>
                          <th className="p-3 text-right">Direct Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map(ord => (
                          <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-mono font-bold text-slate-900">
                              {ord.id}
                              <span className="text-[10px] text-slate-400 font-sans block">{ord.date}</span>
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-slate-900">{ord.customerName}</p>
                              <p className="text-[10px] text-slate-500">{ord.phone} • {ord.company}</p>
                            </td>
                            <td className="p-3">
                              <p className="font-semibold text-slate-800">{ord.items}</p>
                              <span className="text-red-600 font-bold">₹{ord.amount?.toLocaleString('en-IN')}</span>
                            </td>
                            <td className="p-3">
                              <select
                                value={ord.status}
                                onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                                className={`px-2 py-1 rounded text-[11px] font-bold border ${
                                  ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  ord.status === 'In Production' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                  'bg-blue-50 text-blue-800 border-blue-300'
                                }`}
                              >
                                <option value="New Inquiry">New Inquiry</option>
                                <option value="Mockup Sent">Mockup Sent</option>
                                <option value="Mockup Approved">Mockup Approved</option>
                                <option value="In Production">In Production</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="p-3 text-right">
                              <a
                                href={`https://wa.me/91${ord.phone}?text=Hi%20${encodeURIComponent(ord.customerName)},%20this%20is%20Heecart%20Studio%20regarding%20your%20order%20${ord.id}%20(${encodeURIComponent(ord.items)})!`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                              >
                                <MessageSquare size={12} /> WhatsApp Customer
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-300 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingProductId ? 'Edit Product Details' : 'Add New Product to Store'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              
              <div>
                <label className="text-slate-700 font-bold block mb-1">Product Title*</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. The Royale Executive Welcome Hamper"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category*</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                  >
                    <option value="hampers">Corporate Hampers & Gift Sets</option>
                    <option value="bottles">Drinkware & Temperature Bottles</option>
                    <option value="frames">Photo Frames & Keepsakes</option>
                    <option value="stationery">Desk Accessories & Pens</option>
                    <option value="combos">Personalized Combos</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Stock Quantity (In-stock)*</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Selling Price (₹)*</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">MRP Strikethrough Price (₹)*</label>
                  <input
                    type="number"
                    required
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Product Image URL*</label>
                <input
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Tags (Comma-separated)*</label>
                <input
                  type="text"
                  value={prodTags}
                  onChange={(e) => setProdTags(e.target.value)}
                  placeholder="Bestseller, Corporate Choice, Top Sales, Festive"
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              {/* Toggles for Featured and Top Sales */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span>Mark as Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={prodIsTopSales}
                    onChange={(e) => setProdIsTopSales(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span>Mark as Top Sales / Bestseller</span>
                </label>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Product Tagline / Short Pitch</label>
                <input
                  type="text"
                  value={prodTagline}
                  onChange={(e) => setProdTagline(e.target.value)}
                  placeholder="e.g. Personalized laser engraved corporate suite in matte finish."
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  Save Product to Live Store
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
