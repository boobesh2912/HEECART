import React, { useEffect, useState } from 'react';
import { Phone, Search, ShoppingBag, X } from 'lucide-react';
import { linkHandler, navigate } from '../lib/router';

function SearchBox({ search, className = '' }) {
  const initial = new URLSearchParams(search).get('q') || '';
  const [value, setValue] = useState(initial);

  useEffect(() => setValue(initial), [initial]);

  const submit = text => {
    const params = new URLSearchParams(window.location.pathname === '/' ? window.location.search : '');
    if (text.trim()) params.set('q', text.trim());
    else params.delete('q');
    const qs = params.toString();
    navigate(`/${qs ? `?${qs}` : ''}`, { replace: window.location.pathname === '/', keepScroll: true });
    requestAnimationFrame(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <form
      className={`relative ${className}`}
      onSubmit={e => { e.preventDefault(); submit(value); }}
      role="search"
    >
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search diary, bottle, pen, bamboo…"
        className="input rounded-full bg-cream/60 py-2.5 pl-10 pr-9"
        aria-label="Search products"
      />
      {value && (
        <button type="button" onClick={() => { setValue(''); submit(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink" aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </form>
  );
}

export default function Header({ settings, search, enquiryCount, onOpenEnquiry }) {
  return (
    <header className="sticky top-0 z-40">
      {settings.announcement && (
        <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium tracking-wide text-gold-400 sm:text-xs">
          {settings.announcement}
        </div>
      )}
      <div className="border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" onClick={linkHandler('/')} className="shrink-0" aria-label="Heecart home">
            <img src="/logo.png" alt="Heecart Gifts and More" className="h-10 w-auto sm:h-12" />
          </a>

          <SearchBox search={search} className="mx-auto hidden max-w-md flex-1 md:block" />

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a href={`tel:+${settings.whatsapp}`} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-cream lg:flex">
              <Phone size={16} className="text-gold-600" />
              {settings.phone_display}
            </a>
            <button onClick={onOpenEnquiry} className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-700" aria-label={`Enquiry list, ${enquiryCount} items`}>
              <ShoppingBag size={17} className="text-gold-400" />
              <span className="hidden sm:inline">Enquiry list</span>
              {enquiryCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-ink">{enquiryCount}</span>
              )}
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <SearchBox search={search} />
        </div>
      </div>
    </header>
  );
}
