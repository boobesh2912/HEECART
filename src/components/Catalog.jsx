import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Leaf, SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import { navigate } from '../lib/router';
import { startingPrice } from '../lib/pricing';

const PAGE_SIZE = 12;

function setParam(key, value) {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else params.delete(key);
  const qs = params.toString();
  navigate(`/${qs ? `?${qs}` : ''}`, { replace: true, keepScroll: true });
}

export default function Catalog({ products, categories, search, settings, onAddToCart }) {
  const params = new URLSearchParams(search);
  const category = params.get('c') || 'all';
  const query = (params.get('q') || '').toLowerCase();
  const [ecoOnly, setEcoOnly] = useState(false);
  const [sort, setSort] = useState('catalog');
  const [limit, setLimit] = useState(PAGE_SIZE);

  // start from the first page whenever the filters change
  useEffect(() => setLimit(PAGE_SIZE), [category, query, ecoOnly, sort]);

  const counts = useMemo(() => {
    const map = {};
    products.forEach(p => { map[p.category] = (map[p.category] || 0) + 1; });
    return map;
  }, [products]);

  const visible = useMemo(() => {
    const list = products.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (ecoOnly && !p.tags?.includes('eco')) return false;
      if (!query) return true;
      const haystack = [p.name, p.set_type, p.description, ...(p.includes || []), ...(p.tags || [])].join(' ').toLowerCase();
      return query.split(/\s+/).every(word => haystack.includes(word));
    });
    if (sort === 'price-asc') list.sort((a, b) => (startingPrice(a) ?? 0) - (startingPrice(b) ?? 0));
    if (sort === 'price-desc') list.sort((a, b) => (startingPrice(b) ?? 0) - (startingPrice(a) ?? 0));
    return list;
  }, [products, category, ecoOnly, query, sort]);

  const activeCategory = categories.find(c => c.id === category);

  const chip = active =>
    `shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
      active ? 'border-ink bg-ink text-gold-400' : 'border-ink/15 bg-white text-ink/70 hover:border-ink/40'
    }`;

  return (
    <section id="catalog" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Shop the collection</p>
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {query ? `Results for “${params.get('q')}”` : activeCategory ? activeCategory.name : 'Every gift, ready for your logo'}
        </h2>
        <p className="text-sm text-ink/60">Prices shown are per piece. Order more and every piece costs less.</p>
      </div>

      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        <button className={chip(category === 'all')} onClick={() => setParam('c', '')}>
          All gifts
        </button>
        {categories.filter(c => counts[c.id]).map(c => (
          <button key={c.id} className={chip(category === c.id)} onClick={() => setParam('c', c.id)}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEcoOnly(v => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${ecoOnly ? 'border-green-700 bg-green-50 text-green-800' : 'border-ink/15 text-ink/70'}`}
            aria-pressed={ecoOnly}
          >
            <Leaf size={14} /> Eco · Bamboo & cork
          </button>
        </div>
        <label className="flex items-center gap-2 text-xs text-ink/60">
          Sort
          <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg border border-ink/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink focus:border-gold-500 focus:outline-none">
            <option value="catalog">Catalog order</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/20 py-16 text-center">
          <SearchX className="text-ink/30" size={32} />
          <p className="font-semibold">No gift sets match that</p>
          <p className="max-w-sm text-sm text-ink/60">Try another word, or tell us what you need on WhatsApp and we'll put together a custom combo for you.</p>
          <button className="btn-dark mt-2" onClick={() => { setEcoOnly(false); navigate('/', { replace: true, keepScroll: true }); }}>
            Show all gift sets
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visible.slice(0, limit).map(product => (
              <ProductCard key={product.id} product={product} settings={settings} onAddToCart={onAddToCart} />
            ))}
          </div>
          {visible.length > limit && (
            <div className="mt-8 flex justify-center">
              <button className="btn-outline px-8" onClick={() => setLimit(l => l + PAGE_SIZE)}>
                Show more gifts <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
