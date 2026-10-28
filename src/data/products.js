export const PRODUCTS = [
  {
    id: 'corp-royal-hamper',
    name: 'The Royale Executive Welcome Hamper',
    tagline: 'An impression that commands authority. Perfect for employee onboarding & VIP clientele.',
    category: 'corporate',
    categoryName: 'Corporate Hampers',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'Bestseller',
    badgeType: 'hot',
    leadTime: '24-48 Hours Express Dispatch',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Impeccably curated for enterprise distinction. The Royale Hamper combines everyday business essentials with refined aesthetic appeal. Includes a Smart LED Temperature Flask, premium stitched PU Leather Organizer Diary with magnetic closure, Matte Black Ballpoint Pen with German ink refill, and a 16GB Metal Swivel USB drive — each laser-engraved with your recipient’s name and company emblem.',
    customizationType: 'corporate_bulk',
    features: [
      'Precision Fiber Laser Engraving on all metallic items',
      '500ml Double-Walled 304 Stainless Steel Temperature Flask',
      'A5 Luxury Notebook with 192 lined pages & ribbon marker',
      'Rigid matte black magnetic gift box with custom ribbon & gold-foiled brand logo',
      'Free digital mockup preview sent within 2 hours of order'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 1899, discount: 'Standard' },
      { min: 25, max: 49, price: 1649, discount: '13% Off' },
      { min: 50, max: 99, price: 1499, discount: '21% Off' },
      { min: 100, max: 499, price: 1299, discount: '32% Off' },
      { min: 500, max: 9999, price: 1099, discount: '42% Off' },
    ]
  },
  {
    id: 'corp-temp-flask',
    name: 'Smart LED Temperature Flask (500ml)',
    tagline: 'Precision laser-etched with individual names & company branding in silky matte black.',
    category: 'bottles',
    categoryName: 'Drinkware & Bottles',
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 520,
    badge: 'Popular Corporate Choice',
    badgeType: 'corporate',
    leadTime: 'Same-day Mockup Preview',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A daily touchpoint of your gratitude. Crafted from food-grade SUS304 stainless steel with double-wall vacuum insulation that holds cold brews icy for 24 hours and hot coffee steaming for 12 hours. The smart touch LCD display on the cap instantly illuminates real-time beverage temperature.',
    customizationType: 'text_only',
    features: [
      'Touch-sensitive waterproof LCD temperature display (No charging needed, 50,000 touches)',
      'Leakproof silicone seal with removable stainless steel infuser basket',
      'Permanent scratch-resistant metallic fiber laser engraving',
      'Individual personalized name on front, corporate logo on reverse'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 599, discount: 'Standard' },
      { min: 25, max: 99, price: 449, discount: '25% Off' },
      { min: 100, max: 299, price: 389, discount: '35% Off' },
      { min: 300, max: 9999, price: 329, discount: '45% Off' },
    ]
  },
  {
    id: 'pers-mosaic-frame',
    name: 'Heecart Heritage Mosaic Photo Frame',
    tagline: 'Weave 35 to 50 cherished snapshots into one breathtaking masterwork portrait.',
    category: 'frames',
    categoryName: 'Photo Frames & Keepsakes',
    price: 1199,
    originalPrice: 1699,
    rating: 5.0,
    reviewsCount: 780,
    badge: 'Best For Anniversaries',
    badgeType: 'romantic',
    leadTime: 'Handcrafted & Dispatched in 48 Hrs',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Turn an entire camera roll of unforgettable laughter, travels, and celebrations into an emotional centerpiece. Our master digital artists meticulously arrange up to 50 mini photos around a central focal portrait, printed on 350 GSM luster photo media with non-reflective UV matte lamination framed in deep black pine synthetic moulding.',
    customizationType: 'photo_text',
    features: [
      'Supports 30 to 50 mini photos + 1 main high-resolution hero photo',
      'Anti-glare museum-grade protective acrylic glass',
      'Solid backboard with both wall hanging hooks & dual table easel',
      'Digital draft sent over WhatsApp for 100% approval before printing'
    ],
    corporateTierPricing: []
  },
  {
    id: 'pers-spotify-acrylic',
    name: 'Illuminated Acrylic Spotify Plaque with Warm Wood LED',
    tagline: 'Freeze that special song and your favorite memory in crystal-clear glowing acrylic.',
    category: 'frames',
    categoryName: 'Photo Frames & Keepsakes',
    price: 849,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 612,
    badge: 'Trending Gift',
    badgeType: 'hot',
    leadTime: 'Fast 24-Hr Crafting',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Whether it was the track playing on your first road trip, your wedding dance, or a melody that always brings tears of joy. Features high-grade 4mm cast acrylic with scuff-resistant UV direct printing, complete with scannable Spotify code that launches your chosen song instantly upon scanning.',
    customizationType: 'photo_text',
    features: [
      'Scannable Spotify Soundwave Barcode (links directly in the Spotify app)',
      'Natural beechwood base with warm glowing LEDs & USB on/off toggle cable',
      'Ultra-clear scratch-resistant optical grade acrylic sheet',
      'Free custom title, artist subtitle, and timestamp personalization'
    ],
    corporateTierPricing: []
  },
  {
    id: 'corp-leather-duo',
    name: 'Executive Diary, Metal Pen & Keychain Trilogy',
    tagline: 'Sophistication for the modern professional. Custom etched in high contrast silver.',
    category: 'corporate',
    categoryName: 'Corporate Hampers',
    price: 899,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 418,
    badge: 'Conference Favorite',
    badgeType: 'corporate',
    leadTime: 'Pan-India Express Logistics',
    image: 'https://images.unsplash.com/photo-1585336261026-6d60cfa5c2c7?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1585336261026-6d60cfa5c2c7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Handcrafted for high-stake boardroom presentations and everyday executive planning. Includes an undulating grain textured PU leather notebook with pen loop, a weighted heavy-metal twist ballpoint pen, and a matching leather-metal keychain. Packaged in a cushioned gift box ready to present.',
    customizationType: 'corporate_bulk',
    features: [
      'Customized with recipient’s name and your company logo on all 3 items',
      'Non-bleed 100 GSM cream archival paper',
      'Smooth writing twist action pen with replaceable metal refill',
      'Sturdy zinc alloy keychain with genuine stitched leather loop'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 899, discount: 'Standard' },
      { min: 25, max: 99, price: 699, discount: '22% Off' },
      { min: 100, max: 299, price: 579, discount: '35% Off' },
      { min: 300, max: 9999, price: 479, discount: '46% Off' },
    ]
  },
  {
    id: 'pers-wallet-combo',
    name: 'Gentleman’s Bespoke Leather Wallet & Keychain Set',
    tagline: 'Personalized RFID-protected top-grain finish wallet paired with heavy metal keychain.',
    category: 'keychains',
    categoryName: 'Keychains & Accessories',
    price: 799,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 294,
    badge: 'Perfect For Him',
    badgeType: 'gift',
    leadTime: '24-48 Hours Express Dispatch',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A timeless gift that accompanies him everywhere. Featuring a slim bi-fold RFID-blocking wallet that shields sensitive cards from contactless theft, debossed with his full name or initials, and an industrial-grade laser-engraved metal hook keychain.',
    customizationType: 'text_only',
    features: [
      'Military-grade RFID blocking liner for card security',
      'Holds 8+ credit cards, currency notes, and dual coin pocket',
      'Matching metal keychain with laser engraving that never fades',
      'Presented in a premium Heecart gift box with personalized ribbon'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 799, discount: 'Standard' },
      { min: 25, max: 99, price: 599, discount: '25% Off' },
      { min: 100, max: 500, price: 499, discount: '37% Off' }
    ]
  },
  {
    id: 'corp-gourmet-hamper',
    name: 'Artisan Gourmet & Wellness Festive Hamper',
    tagline: 'A royal feast for Diwali, New Year, milestones, and high-value client relations.',
    category: 'hampers',
    categoryName: 'Hampers & Combos',
    price: 2499,
    originalPrice: 3299,
    rating: 5.0,
    reviewsCount: 188,
    badge: 'Festive Bestseller',
    badgeType: 'luxury',
    leadTime: 'Curated On-Demand',
    image: 'https://images.unsplash.com/photo-1543157148-f81513253088?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1543157148-f81513253088?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Elevate your gifting tradition. Each hamper is encased in our signature Heecart red and gold trimmed keepsake chest, bursting with slow-roasted California almonds, organic cashews, brass tea light holders, artisanal soy wax scented candles, and customized insulated travel tumbler engraved with your branding.',
    customizationType: 'corporate_bulk',
    features: [
      'Includes premium dry fruits in reusable airtight glass decanters (150g x 2)',
      'Aromatherapy soy wax candle in matte black vessel',
      'Customized 350ml double-insulated thermal tumbler with laser branding',
      'Gold foil personalized company greeting card included'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 2499, discount: 'Standard' },
      { min: 25, max: 49, price: 2199, discount: '12% Off' },
      { min: 50, max: 99, price: 1899, discount: '24% Off' },
      { min: 100, max: 500, price: 1699, discount: '32% Off' }
    ]
  },
  {
    id: 'pers-3d-crystal',
    name: '3D Laser Engraved Optical Crystal Keepsake',
    tagline: 'Convert your favorite portrait into a hyper-realistic 3D holographic crystal sculpture.',
    category: 'frames',
    categoryName: 'Photo Frames & Keepsakes',
    price: 1399,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 460,
    badge: 'Hypnotic Glow',
    badgeType: 'hot',
    leadTime: 'Specialized 3D Modeling (48 Hrs)',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Using sub-surface laser etching technology with millions of microscopic points, our German-engineered optical crystal captures every smile, eyelash, and contour in volumetric 3D depth that will never deteriorate or discolor over lifetimes.',
    customizationType: 'photo_text',
    features: [
      'K9 grade high-purity optical crystal with hand-beveled edges',
      'Proprietary 2D-to-3D human facial modeling conversion included',
      'Includes USB-powered multicolor LED luminous display stand',
      'Silk-lined velvet presentation case'
    ],
    corporateTierPricing: []
  },
  {
    id: 'corp-bamboo-set',
    name: 'The Eco-Conscious Natural Bamboo Gift Ensemble',
    tagline: 'Sustainable, sustainable, impactful. Show your team and clients your commitment to Earth.',
    category: 'corporate',
    categoryName: 'Corporate Hampers',
    price: 1049,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 215,
    badge: 'Eco Friendly',
    badgeType: 'eco',
    leadTime: 'Rapid Bulk Delivery',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A responsible statement of refined taste. Combines an authentic polished bamboo outer insulated thermos flask, bamboo casing twist-pen, and bamboo spiral-bound journal with recycled unbleached kraft paper. All engraved with non-toxic CO2 laser technology.',
    customizationType: 'corporate_bulk',
    features: [
      '100% natural organic bamboo exterior with SUS304 steel core',
      'Plantable seed pen and bookmark embedded with basil seeds',
      'Zero-plastic packaging in recycled corrugated kraft presentation box',
      'Discounts for corporate CSR and eco-initiatives'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 1049, discount: 'Standard' },
      { min: 25, max: 99, price: 849, discount: '19% Off' },
      { min: 100, max: 299, price: 729, discount: '30% Off' },
      { min: 300, max: 9999, price: 599, discount: '43% Off' }
    ]
  },
  {
    id: 'pers-couple-mug',
    name: 'Custom Couple Monogram Ceramic Mug Set',
    tagline: 'Start every morning reminiscing together with scratch-proof matte black ceramic.',
    category: 'bottles',
    categoryName: 'Drinkware & Bottles',
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    reviewsCount: 380,
    badge: 'Under ₹500',
    badgeType: 'gift',
    leadTime: 'Dispatched in 24 Hrs',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crafted from heavy-duty ceramic with a velvety matte black exterior and glossy interior finish. Sublimation printed with lasting color intensity that handles dishwasher cycles and microwave warming without flaking.',
    customizationType: 'text_only',
    features: [
      'Pair of 330ml premium grade ceramic mugs',
      'Customized with bride & groom names, significant date, or initial monograms',
      'Microwave, dishwasher, and oven safe',
      'Comes packaged in shockproof thermo-form safety boxing'
    ],
    corporateTierPricing: []
  },
  {
    id: 'corp-tech-hamper',
    name: 'Tech Prodigy 4-in-1 Executive Desk Hamper',
    tagline: 'Power up their daily productivity with fast wireless charging and sleek desk accessories.',
    category: 'corporate',
    categoryName: 'Corporate Hampers',
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 164,
    badge: 'High-Tech Gift',
    badgeType: 'corporate',
    leadTime: 'Pan-India 48 Hrs',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Designed for high-growth tech firms, remote workforces, and executive leadership. Includes a 15W Qi-certified fast wireless charging mousepad, a sleek 10,000mAh slim powerbank, a dual USB-C metal flash drive, and an aerodynamic metal stylus pen.',
    customizationType: 'corporate_bulk',
    features: [
      'Custom UV color printing or metallic laser engraving of company logo',
      'Safe IC smart chip protection against over-voltage and heating',
      'Full black presentation box with magnetic clasp and custom sleeve',
      'Free individual name personalization for key executives'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 2199, discount: 'Standard' },
      { min: 25, max: 99, price: 1799, discount: '18% Off' },
      { min: 100, max: 499, price: 1499, discount: '31% Off' }
    ]
  },
  {
    id: 'pers-car-hanging-keychain',
    name: 'Personalized Stainless Steel Vehicle Keychain & Car Charm',
    tagline: 'Carry safety prayers and cherished faces everywhere the journey leads.',
    category: 'keychains',
    categoryName: 'Keychains & Accessories',
    price: 349,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 512,
    badge: 'Budget Favorite',
    badgeType: 'gift',
    leadTime: 'Fast 24-Hr Dispatch',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Constructed from aerospace-grade mirror polished 316L stainless steel that is impervious to rust, bending, or discoloration. Engraved with photo on one side and car registration number or loving safety quote on the other.',
    customizationType: 'photo_text',
    features: [
      'Dual-sided deep laser engraving that never wears off',
      'Includes heavy-duty titanium alloy split key-ring',
      'Optional barcode or QR code with emergency contact',
      'Velvet pouch packaging included'
    ],
    corporateTierPricing: [
      { min: 1, max: 49, price: 349, discount: 'Standard' },
      { min: 50, max: 199, price: 249, discount: '28% Off' },
      { min: 200, max: 1000, price: 179, discount: '48% Off' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Collections', count: 12, icon: 'Sparkles' },
  { id: 'corporate', name: 'Corporate Hampers', count: 5, icon: 'Briefcase' },
  { id: 'frames', name: 'Photo Frames & Acrylics', count: 3, icon: 'Image' },
  { id: 'bottles', name: 'Bottles & Drinkware', count: 2, icon: 'CupSoda' },
  { id: 'keychains', name: 'Keychains & Combos', count: 2, icon: 'Key' },
  { id: 'hampers', name: 'Luxury Gift Boxes', count: 3, icon: 'Gift' }
];

export const CORPORATE_CLIENTS = [
  { name: 'Nexus Technologies', logo: 'NEXUS', count: '1,400+ Kits' },
  { name: 'Apex Global Logistics', logo: 'APEX', count: '650+ Kits' },
  { name: 'Vanguard Media Group', logo: 'VANGUARD', count: '890+ Kits' },
  { name: 'Synthetix Cloud', logo: 'SYNTHETIX', count: '2,100+ Kits' },
  { name: 'Titanium Wealth Capital', logo: 'TITANIUM', count: '450+ Luxury Hampers' },
  { name: 'Zenith Life Sciences', logo: 'ZENITH', count: '1,200+ Kits' }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Rajesh Kulkarni',
    role: 'VP Human Resources, Infoserve',
    type: 'Corporate Order (250 Welcome Kits)',
    stars: 5,
    date: '2 days ago',
    comment: 'Heecart managed our annual onboarding hampers with incredible finesse. All 250 LED bottles and diary sets had individual employee names perfectly laser-etched without a single flaw. The mockup process on WhatsApp took under 1 hour. Will definitely partner again!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Sneha & Arjun Verma',
    role: 'Bangalore',
    type: 'Personalized Mosaic Frame (A3)',
    stars: 5,
    date: 'Last week',
    comment: 'Gifted the 50-photo mosaic frame to my husband for our 5th wedding anniversary. He was literally moved to tears! The matte finish, wooden framing, and how clearly each little picture comes out is phenomenal. Heecart is our forever gift shop now.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Devansh Parekh',
    role: 'Marketing Director, BrandPulse',
    type: 'Diwali Corporate Gift Hampers (120 Sets)',
    stars: 5,
    date: '3 weeks ago',
    comment: 'We used to order from local vendors who always missed deadlines. Heecart delivered all 120 artisan dry fruit and tech hampers 3 days ahead of schedule, each boxed with our gold-embossed brand seal. Our clients couldn’t stop messaging us praises.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  }
];

export const FAQS = [
  {
    q: 'How does the personalization process work for custom gifts?',
    a: 'It is seamless! You can either enter the custom name/text and upload your photos directly on our product page, or place your order and our design team will instantly reach out to you via WhatsApp (+91 98765 43210). We generate a photorealistic digital mockup for your approval before laser engraving or printing begins.'
  },
  {
    q: 'Do you offer bulk discounts and sample pieces for corporate gifting?',
    a: 'Yes, absolutely. We have transparent slab pricing (starting from 25 units up to 10,000+ units) with up to 45% discount. You can also order a single custom-branded physical sample kit with your company logo before finalizing bulk procurement.'
  },
  {
    q: 'What is the standard delivery timeframe across India?',
    a: 'Standard production and laser engraving takes 24 to 48 hours once mockup approval is given. We ship via express air logistics (BlueDart, Delhivery, DTDC). Metro cities receive packages within 2–4 days, and all other Indian locations within 4–6 days.'
  },
  {
    q: 'Can you deliver gifts directly to individual employees at their home addresses?',
    a: 'Yes! For distributed and remote corporate teams, you can share a single CSV of recipient addresses. We will individually package, personalize, and courier each gift box directly to their doorsteps with tracking notifications.'
  },
  {
    q: 'What happens if a gift arrives damaged or with incorrect engraving?',
    a: 'We offer an ironclad 100% Replacement Guarantee. If any product arrives damaged in transit or contains any misspelling from our end, we send a brand-new replacement immediately without any questions asked.'
  }
];
