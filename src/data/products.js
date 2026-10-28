export const INITIAL_PRODUCTS = [
  {
    id: 'corp-royal-hamper',
    name: 'The Royale Executive Welcome Hamper',
    tagline: 'Premium onboarding & client gift box with smart LED flask, PU leather diary, metal pen and flash drive.',
    category: 'hampers',
    categoryName: 'Hampers & Gift Sets',
    price: 1899,
    originalPrice: 2499,
    stock: 120,
    isFeatured: true,
    isTopSales: true,
    tags: ['Bestseller', 'Corporate Choice', 'Welcome Kit'],
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 342,
    leadTime: 'Dispatch in 24-48 Hours',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'The Royale Hamper includes a 500ml Smart LED Temperature Flask, an A5 PU Leather Organizer Diary with magnetic lock, a heavy metal twist pen with German ink, and a 16GB swivel metal USB drive. Each item is permanently laser-engraved with your recipient’s name and your company logo. Packaged in a rigid black gift box with gold or red ribbon.',
    customizationType: 'corporate_bulk',
    features: [
      'Permanent metallic fiber laser engraving on all 4 items',
      '500ml double-walled food-grade 304 stainless steel flask',
      'A5 192-page ruled executive diary with card slots',
      'Rigid matte finish gift box with magnetic closure',
      'Free digital mockup preview sent before engraving'
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
    name: 'Smart LED Temperature Bottle (500ml)',
    tagline: 'Double-walled vacuum insulated stainless steel with touch LCD temperature display cap.',
    category: 'bottles',
    categoryName: 'Drinkware & Bottles',
    price: 599,
    originalPrice: 899,
    stock: 250,
    isFeatured: true,
    isTopSales: true,
    tags: ['Top Sales', 'Drinkware', 'Laser Engraved'],
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 520,
    leadTime: 'Same-day Mockup Preview',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crafted from food-grade 304 stainless steel with double-wall insulation that holds cold drinks cold for 24 hours and hot beverages steaming for 12 hours. Features a waterproof touch LCD cap display showing beverage temperature. Laser-engraved with individual names or company logo.',
    customizationType: 'text_only',
    features: [
      'Touch-sensitive waterproof LCD temperature display',
      'Leakproof silicone seal with stainless steel tea infuser basket',
      'Permanent scratch-resistant metallic fiber laser engraving',
      'Choice of Matte Black, Crimson Red, or Brushed Silver'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 599, discount: 'Standard' },
      { min: 25, max: 99, price: 449, discount: '25% Off' },
      { min: 100, max: 299, price: 389, discount: '35% Off' },
      { min: 300, max: 9999, price: 329, discount: '45% Off' },
    ]
  },
  {
    id: 'corp-festive-hamper',
    name: 'Festive Gourmet Dry Fruits & Tumbler Hamper',
    tagline: 'Artisanal gift box with dry fruits in glass jars, scented soy candle and custom engraved tumbler.',
    category: 'hampers',
    categoryName: 'Hampers & Gift Sets',
    price: 2299,
    originalPrice: 2999,
    stock: 75,
    isFeatured: true,
    isTopSales: false,
    tags: ['Festive', 'Diwali', 'Gourmet', 'VIP Hamper'],
    badge: 'Festive Choice',
    rating: 5.0,
    reviewsCount: 188,
    leadTime: 'Dispatch in 48 Hours',
    image: 'https://images.unsplash.com/photo-1543157148-f81513253088?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1543157148-f81513253088?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Perfect for Diwali, New Year, and key business partner milestones. Includes 150g roasted California almonds in airtight glass decanter, 150g jumbo cashews, an aromatherapy soy wax candle, and a 350ml thermal stainless steel tumbler custom-engraved with your company branding.',
    customizationType: 'corporate_bulk',
    features: [
      'Premium dry fruits in reusable glass decanters (Almonds & Cashews)',
      '350ml insulated coffee tumbler with laser engraving',
      'Aromatherapy soy wax candle in matte vessel',
      'Gold-embossed corporate greeting card included',
      'Rigid gift chest with magnetic lid'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 2299, discount: 'Standard' },
      { min: 25, max: 49, price: 1999, discount: '13% Off' },
      { min: 50, max: 99, price: 1799, discount: '22% Off' },
      { min: 100, max: 500, price: 1549, discount: '33% Off' }
    ]
  },
  {
    id: 'pers-mosaic-frame',
    name: 'Custom Mosaic Photo Collage Frame (A3 Size)',
    tagline: 'Combine 35 to 50 family or couple snapshots into one stunning central portrait.',
    category: 'frames',
    categoryName: 'Photo Frames & Keepsakes',
    price: 1199,
    originalPrice: 1699,
    stock: 95,
    isFeatured: true,
    isTopSales: true,
    tags: ['Bestseller', 'Anniversary', 'Handcrafted'],
    badge: 'Top Gift',
    rating: 5.0,
    reviewsCount: 780,
    leadTime: 'Crafted & Dispatched in 48 Hours',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Transform multiple memories into one breathtaking framed collage. Up to 50 small photos are blended around a central hero photograph, printed on 350 GSM luster photo media with non-reflective matte lamination and framed in high-density synthetic pine wood.',
    customizationType: 'photo_text',
    features: [
      'Supports 30 to 50 mini photos + 1 main high-resolution photo',
      'Anti-glare protective acrylic shield',
      'Solid backboard with both wall hanging hooks and table easel',
      'WhatsApp digital proof sent for approval before final print'
    ],
    corporateTierPricing: []
  },
  {
    id: 'pers-spotify-acrylic',
    name: 'Glowing Spotify Acrylic Plaque with Wooden LED Base',
    tagline: 'Laser-engraved acrylic with scannable Spotify song code, photo and warm LED wood stand.',
    category: 'frames',
    categoryName: 'Photo Frames & Keepsakes',
    price: 849,
    originalPrice: 1299,
    stock: 150,
    isFeatured: true,
    isTopSales: false,
    tags: ['Trending', 'Birthday', 'Spotify Plaque'],
    badge: 'Trending',
    rating: 4.9,
    reviewsCount: 612,
    leadTime: '24-Hour Express Crafting',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Features 4mm optical grade cast acrylic with UV direct printing of your favorite photo, song title, artist, and scannable Spotify code. Fits into a solid beechwood base with warm LED illumination powered by USB cable.',
    customizationType: 'photo_text',
    features: [
      'Scannable Spotify barcode that opens song directly in app',
      'Solid beechwood base with warm glowing LEDs & USB switch cable',
      'High-clarity scratch-resistant acrylic sheet',
      'Free custom song title and timestamp personalization'
    ],
    corporateTierPricing: []
  },
  {
    id: 'corp-leather-duo',
    name: 'Executive Diary, Metal Pen & Keychain Set',
    tagline: 'Three-piece corporate kit with matching PU leather journal, rollerball pen and keychain.',
    category: 'stationery',
    categoryName: 'Desk Accessories & Pens',
    price: 899,
    originalPrice: 1299,
    stock: 180,
    isFeatured: false,
    isTopSales: true,
    tags: ['Conference', 'Executive', 'Bestseller'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 418,
    leadTime: 'Express Pan-India Logistics',
    image: 'https://images.unsplash.com/photo-1585336261026-6d60cfa5c2c7?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1585336261026-6d60cfa5c2c7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Professional three-piece gift set including an A5 textured leather notebook with pen loop, a weighted twist ballpoint pen, and a zinc alloy keychain with leather strap. Personalized with recipient name and corporate emblem.',
    customizationType: 'corporate_bulk',
    features: [
      'Personalized with employee name and company logo',
      'Non-bleed 100 GSM cream archival paper',
      'Weighted metal pen with smooth writing twist refill',
      'Cushioned gift box ready to present'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 899, discount: 'Standard' },
      { min: 25, max: 99, price: 699, discount: '22% Off' },
      { min: 100, max: 299, price: 579, discount: '35% Off' },
      { min: 300, max: 9999, price: 479, discount: '46% Off' },
    ]
  },
  {
    id: 'corp-bamboo-set',
    name: 'Eco-Friendly Bamboo Flask & Diary Set',
    tagline: 'Sustainable 3-piece gift set made with natural bamboo, plantable seed pen, and recycled journal.',
    category: 'hampers',
    categoryName: 'Hampers & Gift Sets',
    price: 1049,
    originalPrice: 1499,
    stock: 65,
    isFeatured: false,
    isTopSales: false,
    tags: ['Eco-Friendly', 'Bamboo', 'Corporate'],
    badge: 'Eco Friendly',
    rating: 4.8,
    reviewsCount: 215,
    leadTime: 'Fast Dispatch',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Show your team and clients your commitment to sustainability. Includes a natural polished bamboo insulated thermos, bamboo twist pen, and spiral journal with recycled kraft paper.',
    customizationType: 'corporate_bulk',
    features: [
      '100% natural organic bamboo exterior with SUS304 steel core',
      'Plantable seed pen embedded with basil seeds',
      'Zero-plastic packaging in recycled corrugated gift box',
      'Non-toxic laser engraving of company logo'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 1049, discount: 'Standard' },
      { min: 25, max: 99, price: 849, discount: '19% Off' },
      { min: 100, max: 299, price: 729, discount: '30% Off' },
      { min: 300, max: 9999, price: 599, discount: '43% Off' }
    ]
  },
  {
    id: 'pers-wallet-combo',
    name: 'Custom Leather Wallet & Metal Keychain Duo',
    tagline: 'Personalized RFID-blocking wallet debossed with name, paired with engraved metal keychain.',
    category: 'combos',
    categoryName: 'Combo Gifts',
    price: 799,
    originalPrice: 1199,
    stock: 110,
    isFeatured: false,
    isTopSales: true,
    tags: ['Gifts For Him', 'Leather', 'Wallet'],
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 294,
    leadTime: 'Dispatch in 24 Hours',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Slim bi-fold RFID-blocking wallet that shields contactless cards, custom engraved with name or initials, paired with a heavy-duty zinc alloy keychain.',
    customizationType: 'text_only',
    features: [
      'RFID protection against unauthorized card scanning',
      'Holds 8+ cards, currency notes, and coin compartment',
      'Permanent metallic fiber laser engraving',
      'Delivered in Heecart presentation box'
    ],
    corporateTierPricing: [
      { min: 1, max: 24, price: 799, discount: 'Standard' },
      { min: 25, max: 99, price: 599, discount: '25% Off' },
      { min: 100, max: 500, price: 499, discount: '37% Off' }
    ]
  }
];

export const INITIAL_COUPONS = [
  {
    id: 'coup-1',
    code: 'HEECART10',
    name: 'Welcome Discount',
    type: 'percent', // 'percent' or 'flat'
    value: 10, // 10%
    minOrder: 499,
    active: true
  },
  {
    id: 'coup-2',
    code: 'DIWALI20',
    name: 'Diwali Festive Dhamaka',
    type: 'percent',
    value: 20,
    minOrder: 1499,
    active: true
  },
  {
    id: 'coup-3',
    code: 'BULKFREE',
    name: 'Free Express Shipping',
    type: 'flat',
    value: 99,
    minOrder: 799,
    active: true
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Rajesh Kulkarni',
    role: 'HR Director, Infoserve',
    productName: 'The Royale Executive Welcome Hamper',
    productId: 'corp-royal-hamper',
    stars: 5,
    date: '28 Oct 2026',
    comment: 'Ordered 250 welcome hampers for our Bangalore batch. Every single bottle and diary had individual names laser-engraved with zero errors. Delivered 2 days before onboarding day!',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Sneha & Arjun Verma',
    role: 'Verified Buyer, Bangalore',
    productName: 'Custom Mosaic Photo Collage Frame (A3 Size)',
    productId: 'pers-mosaic-frame',
    stars: 5,
    date: '24 Oct 2026',
    comment: 'The 50-photo mosaic frame was our 5th wedding anniversary gift. Quality of framing and clarity of every single mini photo was outstanding. 10/10 recommend Heecart.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Devansh Parekh',
    role: 'Procurement Head, BrandPulse',
    productName: 'Festive Gourmet Dry Fruits & Tumbler Hamper',
    productId: 'corp-festive-hamper',
    stars: 5,
    date: '18 Oct 2026',
    comment: 'We used to order from local vendors who constantly missed deadlines. Heecart sent us digital mockups on WhatsApp within 2 hours and delivered 120 hampers right on time.',
    verified: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'HEEC-8924',
    customerName: 'Vikram Mehta',
    phone: '9845012345',
    email: 'vikram.mehta@gmail.com',
    company: 'Cognizant Tech',
    items: 'The Royale Executive Welcome Hamper (50 units)',
    amount: 74950,
    status: 'In Production',
    date: '27 Oct 2026',
    city: 'Bengaluru, Karnataka',
    type: 'Corporate',
    courierName: 'The Professional Couriers',
    awbNumber: 'TPC84920194BLR',
    trackingUrl: 'https://www.tpcindia.com/'
  },
  {
    id: 'HEEC-8919',
    customerName: 'Ananya Sharma',
    phone: '9820194829',
    email: 'ananya.s@outlook.com',
    company: 'Personal',
    items: 'Custom Mosaic Photo Collage Frame (1 unit)',
    amount: 1199,
    status: 'Dispatched',
    date: '26 Oct 2026',
    city: 'Mumbai, Maharashtra',
    type: 'Personal',
    courierName: 'BlueDart Express Air',
    awbNumber: 'BD839104829IN',
    trackingUrl: 'https://www.bluedart.com/'
  },
  {
    id: 'HEEC-8890',
    customerName: 'Karthik Raja',
    phone: '9789012345',
    email: 'karthik@titaniumwealth.com',
    company: 'Titanium Wealth',
    items: 'Smart LED Temperature Bottle (100 units)',
    amount: 38900,
    status: 'Mockup Approved',
    date: '25 Oct 2026',
    city: 'Chennai, Tamil Nadu',
    type: 'Corporate',
    courierName: 'Delhivery Surface',
    awbNumber: 'DEL9948102948',
    trackingUrl: 'https://www.delhivery.com/'
  }
];

export const CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Products',
    heroTitle: 'Personalized Gifts & Custom Corporate Hampers',
    heroSubtitle: 'Custom laser engraving on drinkware, executive diaries, luxury gift hampers & photo frames. Free digital mockup sent on WhatsApp before printing.',
    heroBadge: 'Bestseller Corporate Hamper',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'The Royale Executive Hamper',
    featuredPrice: '₹1,899',
    featuredBulk: 'Bulk: ₹1,099'
  },
  { 
    id: 'hampers', 
    name: 'Hampers & Gift Sets',
    heroTitle: 'Curated Corporate Hampers & Onboarding Kits',
    heroSubtitle: 'Leave a lasting impression on your employees and VIP clients. Premium rigid gift chests with laser-engraved smart flasks, diaries, and gourmet treats.',
    heroBadge: 'Top Enterprise Choice',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'The Royale Onboarding Suite',
    featuredPrice: '₹1,899',
    featuredBulk: 'Slabs from ₹1,099/pc'
  },
  { 
    id: 'bottles', 
    name: 'Drinkware & Bottles',
    heroTitle: 'Smart LED Temperature Bottles & Steel Tumblers',
    heroSubtitle: 'SUS304 food-grade double-walled vacuum flasks with touch LCD temperature caps. Laser engraved with individual employee names or company emblems.',
    heroBadge: '50,000+ Touches LCD',
    heroImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'Smart LED Temp Bottle (500ml)',
    featuredPrice: '₹599',
    featuredBulk: 'Bulk: ₹329/pc'
  },
  { 
    id: 'frames', 
    name: 'Photo Frames & Keepsakes',
    heroTitle: 'Handcrafted Mosaic Photo Frames & Spotify Plaques',
    heroSubtitle: 'Preserve your family milestones, weddings, and anniversaries with museum-grade UV matte laminated photo frames and glowing optical acrylic plaques.',
    heroBadge: 'Top Anniversary Gift',
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'Heritage 50-Photo Mosaic Frame',
    featuredPrice: '₹1,199',
    featuredBulk: 'Free WhatsApp Proof'
  },
  { 
    id: 'stationery', 
    name: 'Desk Accessories & Pens',
    heroTitle: 'Executive Leather Journals & Heavy Metal Pens',
    heroSubtitle: 'Boardroom-ready PU leather notebooks with magnetic clasps, weighted metal twist rollerballs, and matching zinc alloy keychains custom debossed.',
    heroBadge: 'Corporate Conference Hit',
    heroImage: 'https://images.unsplash.com/photo-1585336261026-6d60cfa5c2c7?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'Executive Diary & Pen Trio',
    featuredPrice: '₹899',
    featuredBulk: 'Bulk: ₹479/pc'
  },
  { 
    id: 'combos', 
    name: 'Combo Gifts',
    heroTitle: 'Personalized Leather Wallets & Keychain Combos',
    heroSubtitle: 'RFID-protected leather wallets debossed with names or monograms paired with laser-etched stainless steel keychains in luxury presentation boxes.',
    heroBadge: 'Perfect Milestone Gift',
    heroImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    featuredProductTitle: 'Gentleman’s RFID Wallet & Key Duo',
    featuredPrice: '₹799',
    featuredBulk: 'Dispatched in 24 Hrs'
  }
];

export const FAQS = [
  {
    q: 'How does the personalization and mockup approval process work?',
    a: 'Once you place your order or submit an inquiry, our graphic design desk sends a realistic digital mockup of your engraved item to your WhatsApp (+91 98765 43210) within 2 hours. We only start production after your 100% sign-off.'
  },
  {
    q: 'Do you offer bulk volume discounts for corporate hampers?',
    a: 'Yes, we provide transparent slab pricing starting from 25 units up to 1,000+ units, with up to 45% discount. You can also request a physical branded sample piece with your company logo before ordering in bulk.'
  },
  {
    q: 'How does your automated courier tracking work?',
    a: 'Once we dispatch your parcel via The Professional Couriers, BlueDart, or Delhivery, we update your AWB tracking number in our system. You can enter your Order ID directly on our website to see live status or click to view tracking on the official courier portal.'
  },
  {
    q: 'Can you deliver hampers directly to employees at multiple addresses across India?',
    a: 'Yes! You can share an Excel/CSV file with individual employee home addresses and pin codes. We pack and courier each gift box safely with individual tracking numbers.'
  },
  {
    q: 'What is your transit replacement warranty?',
    a: 'If any gift is damaged during shipping or has any spelling discrepancy from your approved design, we send a brand-new replacement immediately with zero return hassles.'
  }
];
