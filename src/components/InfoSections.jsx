import React, { useState } from 'react';
import { ChevronDown, CreditCard, MessageCircle, MousePointerClick, PackageCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { TIER_SLABS } from '../data/catalog';
import { whatsappLink } from '../lib/whatsapp';

export function PricingGuide() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Bulk pricing</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">The more you order, the less each gift costs</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Every gift set has four price slabs. Pick a quantity on any product page and you'll see the price per piece
            straight away. If your quantity falls between two slabs, we'll quote you on WhatsApp.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TIER_SLABS.map((slab, i) => (
            <div key={slab.min} className="rounded-2xl border border-gold-500/30 bg-white/5 p-4 text-center">
              <p className="text-[11px] uppercase tracking-wide text-white/50">Slab {i + 1}</p>
              <p className="mt-1 text-lg font-bold text-gold-400">{slab.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: MousePointerClick, title: 'Pick your gifts', text: 'Browse the catalog, choose a quantity and add the name or company to print.' },
  { icon: MessageCircle, title: 'Send on WhatsApp', text: 'Tap Order on WhatsApp. Your list, quantities and prices are filled in for you.' },
  { icon: CreditCard, title: 'Confirm & pay', text: 'We confirm branding, final price and delivery, then you pay by GPay / UPI.' },
  { icon: PackageCheck, title: 'Receive your gifts', text: 'Your custom-branded gift sets are packed and shipped to you.' },
];

export function HowToOrder({ settings }) {
  return (
    <section id="how-to-order" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">How to order</p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Four simple steps, all on WhatsApp</h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative rounded-2xl border border-ink/10 p-5">
            <span className="absolute right-4 top-4 text-3xl font-extrabold text-gold-500/30">{i + 1}</span>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold-400"><Icon size={20} /></span>
            <h3 className="mt-4 font-bold">{title}</h3>
            <p className="mt-1 text-sm text-ink/60">{text}</p>
          </li>
        ))}
      </ol>
      <a
        href={whatsappLink(settings.whatsapp, 'Hi Heecart! I have a question about corporate gifts.')}
        target="_blank"
        rel="noopener"
        className="btn-whatsapp mt-8"
      >
        <WhatsAppIcon size={18} /> Ask us anything on WhatsApp
      </a>
    </section>
  );
}

const faqs = settings => [
  {
    q: 'How do I place an order?',
    a: 'Add gift sets to your enquiry list (or open a product), then tap "Order on WhatsApp". The message is filled in for you. We confirm the details and final price, and you pay by GPay / UPI.',
  },
  {
    q: 'Can you print our company name or logo?',
    a: 'Yes, customization is available on every gift set. Type the name on the product page, and send your logo file to us on WhatsApp.',
  },
  {
    q: 'Do the prices include GST and shipping?',
    a: 'No. Prices shown are per piece. GST and shipping are extra and are added to your final quote.',
  },
  {
    q: 'What is the minimum order?',
    a: 'Most gift sets can be ordered from a single piece. Welcome kits start at 5 pieces. The price per piece drops at 5, 30 and 100 pieces.',
  },
  {
    q: 'Can you make a custom combo?',
    a: "Yes. If you don't see the exact mix you need, message us on WhatsApp with your budget and quantity and we'll suggest options.",
  },
  {
    q: 'Where are you located?',
    a: `${settings.address}. Call or WhatsApp ${settings.phone_display}, or email ${settings.email}.`,
  },
];

export function FAQ({ settings }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Questions customers ask us</h2>
        <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
          {faqs(settings).map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                aria-expanded={open === i}
              >
                {item.q}
                <ChevronDown size={18} className={`shrink-0 text-gold-600 transition ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <p className="px-5 pb-4 text-sm leading-relaxed text-ink/70">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
