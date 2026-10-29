import React from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { lowestPrice, formatINR } from '../lib/pricing';
import { whatsappLink } from '../lib/whatsapp';

export default function Hero({ products, settings }) {
  const prices = products.map(lowestPrice).filter(Boolean);
  const from = prices.length ? Math.min(...prices) : null;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(245,179,1,0.28),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 sm:text-xs">
            Custom gifts · Corporate gifts · Personalized gifts
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Corporate <span className="text-gold-500">Combo Gifts</span>
          </h1>
          <p className="mt-3 font-script text-2xl text-gold-200 sm:text-3xl">Thoughtful gifts for a stronger business bond</p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Pens, diaries, bottles, laptop bags and complete welcome kits, branded with your company name or logo.
            {from && <> Bulk prices start at <strong className="text-white">{formatINR(from)} per piece</strong>.</>}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalog" className="btn-gold">
              Browse {products.length} gift sets <ArrowRight size={16} />
            </a>
            <a
              href={whatsappLink(settings.whatsapp, 'Hi Heecart! I am looking for corporate gifts.')}
              target="_blank"
              rel="noopener"
              className="btn border border-white/20 text-white hover:bg-white/10"
            >
              <WhatsAppIcon size={17} className="text-whatsapp" /> Chat on WhatsApp
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center sm:text-left">
            <div>
              <dt className="text-[11px] text-white/50">Gift sets</dt>
              <dd className="text-xl font-bold text-gold-400">{products.length}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-white/50">Order from</dt>
              <dd className="text-xl font-bold text-gold-400">1 pc</dd>
            </div>
            <div>
              <dt className="text-[11px] text-white/50">Branding</dt>
              <dd className="text-xl font-bold text-gold-400">Custom</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/30" />
          <img
            src="/products/hero-cover.jpg"
            alt="Diary, pen and bottle corporate combo gift set with custom name engraving"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-gold-500/10"
          />
          <span className="absolute -bottom-4 left-6 rotate-[-4deg] rounded-xl bg-gold-500 px-4 py-2 font-script text-lg font-semibold text-ink shadow-lg">
            Perfect for corporate gifting
          </span>
        </div>
      </div>
    </section>
  );
}
