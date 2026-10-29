import React from 'react';
import { Home, LayoutGrid, ShoppingCart } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { navigate } from '../lib/router';
import { whatsappLink } from '../lib/whatsapp';

function goToCatalog() {
  if (window.location.pathname !== '/') navigate('/');
  requestAnimationFrame(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }));
}

export default function MobileNav({ settings, cartCount, onOpenCart }) {
  const waHref = whatsappLink(settings.whatsapp, 'Hi Heecart! I am looking for corporate gifts.');
  const item = 'flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold';

  return (
    <>
      {/* Phones: bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-white/95 backdrop-blur md:hidden">
        <button className={item} onClick={() => navigate('/')}><Home size={20} />Home</button>
        <button className={item} onClick={goToCatalog}><LayoutGrid size={20} />Shop</button>
        <button className={`${item} relative`} onClick={onOpenCart}>
          <ShoppingCart size={20} />Cart
          {cartCount > 0 && (
            <span className="absolute right-[calc(50%-18px)] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[9px] font-bold">{cartCount}</span>
          )}
        </button>
        <a className={`${item} text-[#128c4a]`} href={waHref} target="_blank" rel="noopener"><WhatsAppIcon size={20} />WhatsApp</a>
      </nav>

      {/* Larger screens: floating button */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl transition hover:scale-105 md:grid"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
