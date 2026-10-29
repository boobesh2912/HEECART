import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { linkHandler } from '../lib/router';
import { whatsappLink } from '../lib/whatsapp';

export default function Footer({ settings, categories }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;

  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.4fr] lg:px-8">
        <div>
          <span className="inline-block rounded-2xl bg-cream px-4 py-3">
            <img src="/logo.png" alt="Heecart Gifts and More" className="h-10 w-auto" />
          </span>
          <p className="mt-4 max-w-xs text-sm">Your one-stop solution for custom, corporate and personalized gifts. Quality, trust and the best price.</p>
          <p className="mt-3 font-script text-xl text-gold-400">Gifting made meaningful</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Gift sets</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map(c => (
              <li key={c.id}>
                <a href={`/?c=${c.id}`} onClick={linkHandler(`/?c=${c.id}`)} className="hover:text-gold-400">{c.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:+${settings.whatsapp}`} className="flex items-center gap-3 hover:text-gold-400">
                <Phone size={16} className="shrink-0 text-gold-400" /> {settings.phone_display}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-gold-400">
                <Mail size={16} className="shrink-0 text-gold-400" /> {settings.email}
              </a>
            </li>
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-gold-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" /> {settings.address}
              </a>
            </li>
            {settings.instagram && (
              <li>
                <a href={`https://instagram.com/${settings.instagram.replace(/^@/, '')}`} target="_blank" rel="noopener" className="hover:text-gold-400">
                  Instagram: @{settings.instagram.replace(/^@/, '')}
                </a>
              </li>
            )}
          </ul>
          <a href={whatsappLink(settings.whatsapp, 'Hi Heecart!')} target="_blank" rel="noopener" className="btn-whatsapp mt-5">
            <WhatsAppIcon size={18} /> WhatsApp us
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Heecart Gifts and More, Chennai
      </div>
    </footer>
  );
}
