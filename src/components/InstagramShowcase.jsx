import React from 'react';
import { Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export default function InstagramShowcase() {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      caption: 'Dispatching 300 custom Royale Hampers for an executive leadership retreat. Silk ribbons & laser engraved details! 💼✨',
      likes: '482',
      comments: '34'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      caption: 'A 50-photo wedding anniversary mosaic that stopped everyone in their tracks. Moments crafted into eternity. ❤️🖼️',
      likes: '891',
      comments: '76'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      caption: 'Precision fiber laser test on our Matte Black smart temperature flasks. Look at that crisp silver glow! 🔥',
      likes: '624',
      comments: '41'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      caption: 'Spotify acrylic plaques glowing in warm beechwood bases. Scan to play their special memories. 🎵💫',
      likes: '1,120',
      comments: '98'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0e] border-b border-[#1b1e2a] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-800/40 text-pink-400 text-xs font-bold">
              <InstagramIcon size={13} />
              <span>LIVE FROM THE STUDIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Crafted With Passion. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-red-400">
                Shared on @heecart_com
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Follow our daily behind-the-scenes laser crafting, client unboxing reactions, and festive hampers.
            </p>
          </div>

          <a
            href="https://www.instagram.com/heecart_com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 self-start md:self-auto"
          >
            <InstagramIcon size={16} />
            <span>Follow @heecart_com</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/heecart_com/"
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-[#141620] border border-[#242838] hover:border-pink-500/50 transition-all duration-300 block shadow-card-dark"
            >
              <div className="aspect-square w-full overflow-hidden bg-stone-900">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay with engagement stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-xs text-white line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/20 mt-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-pink-400">
                      <Heart size={14} fill="currentColor" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} /> {post.comments}
                    </span>
                  </div>
                  <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">
                    View on IG →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>

    </section>
  );
}
