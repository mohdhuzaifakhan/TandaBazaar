// Comprehensive mock dataset for Tanda Badli, Rampur Local Shop Marketplace

export const CITY_CONFIG = {
  name: "Tanda Badli, Rampur",
  district: "Rampur",
  state: "Uttar Pradesh",
  pincode: "244925",
  adminWhatsapp: "8433043426",
  formattedWhatsapp: "918433043426",
  tagline: "Your Local City Digital Bazaar"
};

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "Tv", color: "bg-blue-500", count: 48, subcategories: ["Mobiles", "Laptops", "Home Appliances", "Audio", "Accessories"] },
  { id: "mobile-phones", name: "Mobile Phones", icon: "Smartphone", color: "bg-indigo-500", count: 62, subcategories: ["Smartphones", "Feature Phones", "Refurbished", "Cases & Covers", "Repairs"] },
  { id: "fashion", name: "Fashion", icon: "ShoppingBag", color: "bg-purple-500", count: 85, subcategories: ["Men's Wear", "Women's Ethnic", "Kids Fashion", "Western Wear", "Fabrics"] },
  { id: "shoes", name: "Shoes & Footwear", icon: "Footprints", color: "bg-amber-500", count: 34, subcategories: ["Sneakers", "Formal Shoes", "Traditional Jutti", "Sports Shoes", "Sandals"] },
  { id: "jewellery", name: "Jewellery", icon: "Sparkles", color: "bg-yellow-500", count: 29, subcategories: ["Gold Jewellery", "Silver Ornaments", "Bridal Sets", "Fashion Jewellery", "Gemstones"] },
  { id: "furniture", name: "Furniture", icon: "Armchair", color: "bg-emerald-500", count: 22, subcategories: ["Sofa Sets", "Beds & Mattresses", "Dining Tables", "Study Desks", "Wooden Almirah"] },
  { id: "groceries", name: "Groceries & Daily", icon: "Apple", color: "bg-green-500", count: 110, subcategories: ["Atta & Pulses", "Dry Fruits", "Spices", "Oils", "Snacks"] },
  { id: "medical", name: "Medical & Pharmacy", icon: "Cross", color: "bg-red-500", count: 18, subcategories: ["Medicines", "Ayurvedic", "Health Supplements", "Orthopedic", "Baby Care"] },
  { id: "home-decor", name: "Home Decor", icon: "Home", color: "bg-rose-500", count: 31, subcategories: ["Curtains", "Lighting & Lamps", "Wall Art", "Rugs & Carpets", "Planters"] },
  { id: "sports", name: "Sports & Fitness", icon: "Dumbbell", color: "bg-cyan-500", count: 15, subcategories: ["Cricket Kits", "Gym Equipment", "Bicycles", "Sportswear", "Badminton"] },
  { id: "automobile", name: "Automobiles & Bikes", icon: "Bike", color: "bg-slate-700", count: 19, subcategories: ["Spare Parts", "Helmets & Gear", "Tyres & Batteries", "Services", "Two Wheelers"] },
  { id: "laptops", name: "Laptops & Computers", icon: "Laptop", color: "bg-teal-500", count: 26, subcategories: ["Gaming Laptops", "Office Laptops", "Monitors", "Printers", "PC Parts"] },
  { id: "restaurants", name: "Restaurants & Sweets", icon: "Utensils", color: "bg-orange-500", count: 42, subcategories: ["Mughlai Cuisine", "Sweets & Mithai", "Fast Food", "Bakeries", "Tea & Snacks"] },
  { id: "books", name: "Books & Stationery", icon: "BookOpen", color: "bg-sky-500", count: 14, subcategories: ["Competitive Exam Books", "School Textbooks", "Stationery", "Art Supplies"] },
  { id: "services", name: "Local Services", icon: "Wrench", color: "bg-violet-600", count: 38, subcategories: ["AC Repair", "Electrician", "Plumber", "Carpenter", "Tailoring"] },
];

export const MOCK_SHOPS = [
  {
    id: "shop-1",
    name: "Rampur Digital Electronics",
    sellerId: "seller-1",
    ownerName: "Mohd. Tariq",
    category: "electronics",
    isPremium: true,
    isVerified: true,
    rating: 4.8,
    reviewCount: 94,
    phone: "+91 9837123456",
    whatsapp: "919837123456",
    address: "Main Market Road, Near Jama Masjid, Tanda Badli, Rampur",
    area: "Main Market",
    city: "Tanda Badli, Rampur",
    openingHours: "09:30 AM - 09:00 PM (Mon-Sat)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    about: "Premier electronics showroom in Tanda Badli providing genuine Smart TVs, Refrigerators, Washing Machines, and Home Sound systems with official warranty.",
    followers: 430,
    establishedYear: "2012",
    coordinates: { lat: 28.9812, lng: 78.9642 }
  },
  {
    id: "shop-2",
    name: "Khan Mobile & Computer Hub",
    sellerId: "seller-2",
    ownerName: "Rashid Khan",
    category: "mobile-phones",
    isPremium: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 128,
    phone: "+91 9412345678",
    whatsapp: "919412345678",
    address: "Station Road, Opposite SBI Bank, Tanda Badli, Rampur",
    area: "Station Road",
    city: "Tanda Badli, Rampur",
    openingHours: "10:00 AM - 09:30 PM (Daily)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=200&q=80",
    about: "Authorized retailer for iPhone, OnePlus, Samsung, Xiaomi, and Realme. We offer quick instant mobile repairs, tempered glass, and original accessories.",
    followers: 610,
    establishedYear: "2015",
    coordinates: { lat: 28.9830, lng: 78.9660 }
  },
  {
    id: "shop-3",
    name: "Shree Ram Furniture World",
    sellerId: "seller-3",
    ownerName: "Rajesh Kumar",
    category: "furniture",
    isPremium: true,
    isVerified: true,
    rating: 4.7,
    reviewCount: 56,
    phone: "+91 9758112233",
    whatsapp: "919758112233",
    address: "Moradabad Highway Bye-pass, Tanda Badli, Rampur",
    area: "Moradabad Bye-pass",
    city: "Tanda Badli, Rampur",
    openingHours: "10:00 AM - 08:30 PM (Tue-Sun)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=200&q=80",
    about: "Custom Teakwood & Sheesham Furniture specialists. Bridal bedroom sets, comfortable L-shape sofas, dining tables, and office ergonomic chairs.",
    followers: 320,
    establishedYear: "2008",
    coordinates: { lat: 28.9845, lng: 78.9610 }
  },
  {
    id: "shop-4",
    name: "Royal Rampur Ethnic Fashion",
    sellerId: "seller-4",
    ownerName: "Farhan Ali",
    category: "fashion",
    isPremium: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 180,
    phone: "+91 9837998877",
    whatsapp: "919837998877",
    address: "Chowk Bazaar, Near Bus Stand, Tanda Badli, Rampur",
    area: "Chowk Bazaar",
    city: "Tanda Badli, Rampur",
    openingHours: "10:30 AM - 09:00 PM (Daily)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=200&q=80",
    about: "Famous for designer Sherwanis, Kurta Pajamas, Designer Sarees, Bridal Lehengas, and customized suit tailoring with traditional Rampuri embroidery.",
    followers: 890,
    establishedYear: "2010",
    coordinates: { lat: 28.9805, lng: 78.9655 }
  },
  {
    id: "shop-5",
    name: "Al-Madina Jewellers",
    sellerId: "seller-5",
    ownerName: "Haji Usman",
    category: "jewellery",
    isPremium: false,
    isVerified: true,
    rating: 4.8,
    reviewCount: 42,
    phone: "+91 9412111222",
    whatsapp: "919412111222",
    address: "Sarafa Bazaar, Tanda Badli, Rampur",
    area: "Sarafa Bazaar",
    city: "Tanda Badli, Rampur",
    openingHours: "11:00 AM - 08:30 PM (Mon-Sat)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80",
    about: "BIS Hallmarked 916 Gold ornaments, Antique Silver articles, Diamond Rings, and custom bridal jewellery design.",
    followers: 270,
    establishedYear: "1998",
    coordinates: { lat: 28.9818, lng: 78.9635 }
  },
  {
    id: "shop-6",
    name: "Modern Shoes & Sneaker House",
    sellerId: "seller-6",
    ownerName: "Vikas Sharma",
    category: "shoes",
    isPremium: false,
    isVerified: true,
    rating: 4.6,
    reviewCount: 39,
    phone: "+91 9760554433",
    whatsapp: "919760554433",
    address: "Main Market Complex, Shop #14, Tanda Badli, Rampur",
    area: "Main Market",
    city: "Tanda Badli, Rampur",
    openingHours: "10:00 AM - 09:00 PM (Daily)",
    isOpenNow: true,
    coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    logoImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80",
    about: "Latest trend sneakers, Red Chief formal leather boots, Nike running shoes, Woodland outdoor footwear, and comfortable ladies footwear.",
    followers: 195,
    establishedYear: "2018",
    coordinates: { lat: 28.9825, lng: 78.9648 }
  }
];

export const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    title: "OnePlus 12R 5G (Cool Blue, 256GB / 16GB RAM)",
    price: 39999,
    originalPrice: 44999,
    discount: 11,
    category: "mobile-phones",
    subcategory: "Smartphones",
    shopId: "shop-2",
    shopName: "Khan Mobile & Computer Hub",
    area: "Station Road",
    isFeatured: true,
    isTrending: true,
    isTodayDeal: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience ultra-fast performance with Snapdragon 8 Gen 2 processor, 120Hz ProXDR display, and 100W SUPERVOOC charging. Available right here in Tanda Badli with official 1-year brand warranty.",
    specifications: {
      "Display": "6.78 inch AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 2",
      "Camera": "50MP Sony IMX890 + 8MP Ultra-wide",
      "Battery": "5500 mAh + 100W Charger",
      "Warranty": "1 Year Official Brand Warranty"
    },
    views: 340,
    leadsCount: 42,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: "prod-2",
    title: "Samsung 55 Inch Crystal 4K UHD Smart TV (2024 Model)",
    price: 42500,
    originalPrice: 52900,
    discount: 19,
    category: "electronics",
    subcategory: "Home Appliances",
    shopId: "shop-1",
    shopName: "Rampur Digital Electronics",
    area: "Main Market",
    isFeatured: true,
    isTrending: true,
    isTodayDeal: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vibrant Crystal Processor 4K with AirSlim Design, HDR10+, Smart Hub, and Q-Symphony sound. Free home delivery and installation anywhere in Tanda Badli & nearby Rampur areas.",
    specifications: {
      "Screen Size": "55 Inches (138 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Smart TV OS": "Tizen OS",
      "Sound Output": "20W Stereo Speakers",
      "Warranty": "2 Years Comprehensive Samsung Warranty"
    },
    views: 520,
    leadsCount: 68,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: "prod-3",
    title: "Royal Teakwood 5-Seater Cushion Sofa Set with Center Table",
    price: 34999,
    originalPrice: 45000,
    discount: 22,
    category: "furniture",
    subcategory: "Sofa Sets",
    shopId: "shop-3",
    shopName: "Shree Ram Furniture World",
    area: "Moradabad Bye-pass",
    isFeatured: true,
    isTrending: false,
    isTodayDeal: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Handcrafted pure Teakwood sofa set with high-density premium velvet cushions. Includes 3-seater + 2 single chairs + glass-top center tea table.",
    specifications: {
      "Material": "100% Solid Teakwood",
      "Fabric": "Washable Premium Velvet",
      "Dimensions": "3 Seater: 72x30 in, Chairs: 30x30 in",
      "Color": "Royal Blue & Natural Polish",
      "Warranty": "10 Years Anti-Termite Guarantee"
    },
    views: 410,
    leadsCount: 29,
    rating: 4.7,
    reviewCount: 12
  },
  {
    id: "prod-4",
    title: "Hand-embroidered Designer Velvet Royal Bridal Lehenga",
    price: 28500,
    originalPrice: 38000,
    discount: 25,
    category: "fashion",
    subcategory: "Women's Ethnic",
    shopId: "shop-4",
    shopName: "Royal Rampur Ethnic Fashion",
    area: "Chowk Bazaar",
    isFeatured: true,
    isTrending: true,
    isTodayDeal: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Exquisite maroon velvet lehenga with zardozi, dabka, and Rampuri tilla handwork. Includes heavy matching blouse piece and double net dupatta.",
    specifications: {
      "Fabric": "Micro Velvet & Soft Net",
      "Work": "Heavy Zardozi & Tilla Hand Embroidery",
      "Stitching": "Semi-stitched (Custom tailoring available in-store)",
      "Set Contents": "Lehenga, Unstitched Blouse, 2 Dupattas"
    },
    views: 680,
    leadsCount: 95,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: "prod-5",
    title: "22K BIS Hallmarked Royal Gold Bridal Necklace Set (24g)",
    price: 168000,
    originalPrice: 178000,
    discount: 5,
    category: "jewellery",
    subcategory: "Gold Jewellery",
    shopId: "shop-5",
    shopName: "Al-Madina Jewellers",
    area: "Sarafa Bazaar",
    isFeatured: false,
    isTrending: true,
    isTodayDeal: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Genuine 22 Karat (916) BIS hallmarked traditional gold necklace with matching earrings. Certified weight and 100% buyback guarantee at shop.",
    specifications: {
      "Purity": "22 Karat (916 BIS Hallmarked)",
      "Gross Weight": "24.50 Grams",
      "Inclusions": "Necklace + Pair of Earrings",
      "Certification": "Govt. Hallmarked Tag"
    },
    views: 290,
    leadsCount: 18,
    rating: 4.9,
    reviewCount: 9
  },
  {
    id: "prod-6",
    title: "Nike Air Jordan Retro High Top Leather Sneakers",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    category: "shoes",
    subcategory: "Sneakers",
    shopId: "shop-6",
    shopName: "Modern Shoes & Sneaker House",
    area: "Main Market",
    isFeatured: false,
    isTrending: true,
    isTodayDeal: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Premium leather high-top sneaker with cushioned Air sole unit. Sizes available from UK 6 to UK 10. Visit shop for size fitting.",
    specifications: {
      "Material": "Genuine Leather & Rubber Sole",
      "Closure": "Lace-Up",
      "Color": "Red, White & Black",
      "Ideal For": "Casual & Streetwear Wear"
    },
    views: 310,
    leadsCount: 37,
    rating: 4.6,
    reviewCount: 14
  },
  {
    id: "prod-7",
    title: "Asus TUF Gaming F15 (Intel Core i5 12th Gen, RTX 3050, 16GB RAM, 512GB SSD)",
    price: 54999,
    originalPrice: 68990,
    discount: 20,
    category: "laptops",
    subcategory: "Gaming Laptops",
    shopId: "shop-2",
    shopName: "Khan Mobile & Computer Hub",
    area: "Station Road",
    isFeatured: true,
    isTrending: true,
    isTodayDeal: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-performance gaming laptop with 144Hz FHD screen, RGB backlit keyboard, and Military-grade durability. Ready for heavy gaming & video editing.",
    specifications: {
      "Processor": "Intel Core i5-12500H 12th Gen",
      "Graphics": "NVIDIA GeForce RTX 3050 4GB",
      "RAM": "16GB DDR4 (Expandable)",
      "Storage": "512GB PCIe NVMe M.2 SSD",
      "Display": "15.6 inch 144Hz Full HD"
    },
    views: 460,
    leadsCount: 51,
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "prod-8",
    title: "LG 260L 3-Star Smart Inverter Frost-Free Refrigerator",
    price: 26490,
    originalPrice: 32990,
    discount: 19,
    category: "electronics",
    subcategory: "Home Appliances",
    shopId: "shop-1",
    shopName: "Rampur Digital Electronics",
    area: "Main Market",
    isFeatured: false,
    isTrending: false,
    isTodayDeal: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Door Cooling+ technology, Smart Inverter Compressor, and Auto Smart Connect. Operates without stabilizer.",
    specifications: {
      "Capacity": "260 Litres",
      "Energy Rating": "3 Star",
      "Compressor": "Smart Inverter (10 Year Warranty)",
      "Color": "Shiny Steel finish"
    },
    views: 280,
    leadsCount: 22,
    rating: 4.7,
    reviewCount: 8
  }
];

export const MOCK_OFFERS = [
  {
    id: "offer-1",
    shopId: "shop-1",
    shopName: "Rampur Digital Electronics",
    title: "Monsoon Appliance Fest - Extra ₹2,000 Off on AC & Washing Machines",
    code: "RAMPURAC2000",
    discountText: "Flat ₹2,000 OFF",
    validUntil: "2026-08-15",
    banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    terms: "Show this offer banner at the store in Tanda Badli to claim discount."
  },
  {
    id: "offer-2",
    shopId: "shop-2",
    shopName: "Khan Mobile & Computer Hub",
    title: "Free Tempered Glass & Back Cover with Every Smartphone Purchase",
    code: "KHANFREEGIFT",
    discountText: "FREE Accessories",
    validUntil: "2026-08-31",
    banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    terms: "Valid on all 5G smartphones purchased at Station Road store."
  },
  {
    id: "offer-3",
    shopId: "shop-4",
    shopName: "Royal Rampur Ethnic Fashion",
    title: "Bridal Season Special: Free Custom Tailoring on Lehengas & Sherwanis",
    code: "ROYALBRIDAL",
    discountText: "100% Free Tailoring",
    validUntil: "2026-09-10",
    banner: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    terms: "Get custom fitting done by our expert tailors free of charge."
  }
];

export const MOCK_FEED_POSTS = [
  {
    id: "post-1",
    shopId: "shop-2",
    shopName: "Khan Mobile & Computer Hub",
    shopLogo: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=200&q=80",
    isVerified: true,
    timeAgo: "2 hours ago",
    content: "🔥 NEW ARRIVAL IN TANDA BADLI! Fresh stock of iPhone 15 Pro Max (256GB Natural Titanium) just landed at our Station Road store! Limited units available with official India bill & warranty. Call us now or visit store today!",
    media: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
    ],
    likes: 48,
    commentsCount: 12
  },
  {
    id: "post-2",
    shopId: "shop-4",
    shopName: "Royal Rampur Ethnic Fashion",
    shopLogo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=200&q=80",
    isVerified: true,
    timeAgo: "5 hours ago",
    content: "✨ Sneak peek of our new Rampuri Zardozi bridal collection! Each piece is lovingly hand-crafted by master artisans. Visit Chowk Bazaar store to try them on!",
    media: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    likes: 92,
    commentsCount: 23
  }
];

export const MOCK_REVIEWS = [
  {
    id: "rev-1",
    userName: "Amit Verma",
    userCity: "Tanda Badli",
    rating: 5,
    date: "July 14, 2026",
    shopId: "shop-1",
    productId: "prod-2",
    productTitle: "Samsung 55 Inch Crystal 4K Smart TV",
    comment: "Bought Samsung 55 inch TV from Tariq bhai's shop. Delivery was done to my home within 2 hours! Best price in Rampur district.",
    shopReply: "Thank you Amit ji! Glad you liked our service."
  },
  {
    id: "rev-2",
    userName: "Sohail Akhtar",
    userCity: "Rampur",
    rating: 5,
    date: "July 10, 2026",
    shopId: "shop-2",
    productId: "prod-1",
    productTitle: "OnePlus 12R 5G",
    comment: "Excellent experience! Rashid bhai gave me a free original back cover and screen protector. Highly recommend Khan Mobile Hub.",
    shopReply: "Appreciate your review Sohail bhai! Visit again anytime."
  }
];

export const MOCK_LEADS = [
  { id: "lead-101", shopId: "shop-1", shopName: "Rampur Digital Electronics", productTitle: "Samsung 55 Inch Smart TV", type: "whatsapp", customerPhone: "+91 9897******", timestamp: "2026-07-20 16:45:00" },
  { id: "lead-102", shopId: "shop-2", shopName: "Khan Mobile Hub", productTitle: "OnePlus 12R 5G", type: "call", customerPhone: "+91 9412******", timestamp: "2026-07-20 15:20:00" },
  { id: "lead-103", shopId: "shop-4", shopName: "Royal Rampur Ethnic", productTitle: "Velvet Royal Lehenga", type: "visit", customerPhone: "In-Store Visitor", timestamp: "2026-07-20 14:10:00" }
];
