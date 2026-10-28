import React from 'react';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export default function InstagramShowcase() {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      caption: 'Dispatching 300 custom Royale Hampers for corporate onboarding. Laser engraved bottles & diaries! 💼',
      likes: '482'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      caption: 'Wedding anniversary mosaic frame with 50 memories woven together in pine wood framing. ❤️🖼️',
      likes: '891'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      caption: 'Crisp fiber laser test on our matte black smart LED temperature bottles. Permanent metallic finish! 🔥',
      likes: '624'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      caption: 'Glowing Spotify acrylic plaques on beechwood LED base. Scan the code to play your song instantly! 🎵',
      likes: '1,120'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider">
              Follow Us on Instagram
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Behind the Scenes at @heecart_com
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              See real unboxings, corporate bulk packaging, and personalized gift deliveries.
            </p>
          </div>

          <a
            href="https://www.instagram.com/heecart_com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition-colors self-start sm:self-auto"
          >
            <InstagramIcon size={15} />
            <span>Visit @heecart_com</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/heecart_com/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:border-red-500 transition-all block shadow-sm"
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-pink-600 font-semibold">
                    <Heart size={12} fill="currentColor" /> {post.likes}
                  </span>
                  <span className="text-red-600 font-bold">View post →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
