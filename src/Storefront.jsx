import React, { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { store } from './lib/store';
import { minOrderQty } from './lib/pricing';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import ProductPage from './components/ProductPage';
import EnquiryDrawer from './components/EnquiryDrawer';
import { HowToOrder, PricingGuide, FAQ } from './components/InfoSections';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import NotFound from './components/NotFound';

const ENQUIRY_KEY = 'heecart_enquiry';

function readEnquiry() {
  try {
    return JSON.parse(localStorage.getItem(ENQUIRY_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export default function Storefront({ route }) {
  const [enquiry, setEnquiry] = useState(readEnquiry);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try { localStorage.setItem(ENQUIRY_KEY, JSON.stringify(enquiry)); } catch (e) {}
  }, [enquiry]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Saved enquiry items keep only the product id; use the current product data (prices may have changed)
  // and drop products that were removed or hidden since.
  const enquiryItems = useMemo(() => {
    const byId = Object.fromEntries(store.products.map(p => [p.id, p]));
    return enquiry.filter(item => byId[item.id]).map(item => ({ ...item, product: byId[item.id] }));
  }, [enquiry]);

  const addToEnquiry = (product, qty = minOrderQty(product), printText = '') => {
    setEnquiry(prev => {
      const existing = prev.findIndex(i => i.id === product.id && i.printText === printText);
      if (existing >= 0) {
        return prev.map((item, i) => (i === existing ? { ...item, qty: item.qty + qty } : item));
      }
      return [...prev, { id: product.id, qty, printText }];
    });
    setToast(`Added "${product.name}" to your enquiry list`);
  };

  // The drawer works with enquiryItems, so match items by id + print text rather than by index.
  const sameItem = target => item => item.id === target.product.id && item.printText === target.printText;
  const updateEnquiry = (target, patch) => setEnquiry(prev => prev.map(item => (sameItem(target)(item) ? { ...item, ...patch } : item)));
  const removeFromEnquiry = target => setEnquiry(prev => prev.filter(item => !sameItem(target)(item)));

  const { path, search } = route;
  const productId = path.startsWith('/p/') ? decodeURIComponent(path.slice(3)) : null;
  const product = productId && store.products.find(p => p.id === productId);

  useEffect(() => {
    document.title = product
      ? `${product.name} | Heecart Gifts and More`
      : 'Heecart Gifts and More | Corporate Combo Gifts, Chennai';
  }, [product]);

  const shared = { settings: store.settings, onAddToEnquiry: addToEnquiry };
  const enquiryCount = enquiryItems.length;

  let page;
  if (path === '/') {
    page = (
      <>
        <Hero products={store.products} settings={store.settings} />
        <Features />
        <Catalog products={store.products} categories={store.categories} search={search} {...shared} />
        <PricingGuide />
        <HowToOrder settings={store.settings} />
        <FAQ settings={store.settings} />
      </>
    );
  } else if (product) {
    page = <ProductPage key={product.id} product={product} products={store.products} categories={store.categories} {...shared} />;
  } else {
    page = <NotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header settings={store.settings} search={search} enquiryCount={enquiryCount} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <main className="flex-1">{page}</main>
      <Footer settings={store.settings} categories={store.categories} />
      <MobileNav settings={store.settings} enquiryCount={enquiryCount} onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <EnquiryDrawer
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        items={enquiryItems}
        settings={store.settings}
        onUpdate={updateEnquiry}
        onRemove={removeFromEnquiry}
        onClear={() => setEnquiry([])}
      />

      {toast && (
        <div className="animate-fade-in fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white shadow-xl md:bottom-6">
          <Check size={15} className="text-gold-400" />
          <span>{toast}</span>
          <button onClick={() => { setToast(''); setIsEnquiryOpen(true); }} className="ml-2 text-gold-400 underline">View</button>
        </div>
      )}
    </div>
  );
}
