import {
  Award,
  Battery,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Heart,
  Lock,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
  Smartphone,
  Star,
  Usb
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, shops, wishlist, toggleWishlist, addToInquiryCart, logLeadAction } = useApp();

  const product = products.find(p => p.id === id) || products[0];
  const shop = shops.find(s => s.id === product.shopId) || shops.find(s => s.id === 'shop-cellular-world') || shops[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const galleryImages = [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1695048065123-5e925b3a6288?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1695048132982-f1d2b77c5c06?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"
  ];

  // You May Also Like Product Cards matching mockup
  const relatedCarouselProducts = [
    {
      id: "prod-samsung-s24-ultra",
      title: "Samsung Galaxy S24 Ultra",
      specs: "256GB, Titanium Black",
      price: 124999,
      rating: 4.8,
      reviews: 96,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "prod-oneplus-12",
      title: "OnePlus 12",
      specs: "256GB, Silky Black",
      price: 64999,
      rating: 4.7,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "prod-pixel-8-pro",
      title: "Google Pixel 8 Pro",
      specs: "128GB, Bay",
      price: 74999,
      rating: 4.6,
      reviews: 52,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "prod-xiaomi-14",
      title: "Xiaomi 14",
      specs: "512GB, Black",
      price: 69999,
      rating: 4.6,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "prod-iphone-14-promax",
      title: "iPhone 14 Pro Max",
      specs: "256GB, Deep Purple",
      price: 99900,
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 font-sans">

      {/* 1. Breadcrumbs Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/search" className="hover:text-blue-600">Electronics</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/search?category=mobile-phones" className="hover:text-blue-600">Mobile Phones</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/category" className="hover:text-blue-600">Smartphones</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-slate-900 truncate">iPhone 15 Pro Max (256GB)</span>
        </div>
      </div>

      {/* 2. Top Grid Section: Left Image Gallery & Right Product Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column (5 cols): Gallery Preview & Thumbnails */}
          <div className="lg:col-span-5 space-y-4">

            {/* Big Main Image Container */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 relative aspect-square flex items-center justify-center shadow-2xs overflow-hidden group">
              {/* Discount Tag */}
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs z-10">
                -10%
              </span>

              {/* Heart & Share Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2.5 bg-white/90 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-full shadow-md transition"
                  title="Add to wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Product link copied!'); }}
                  className="p-2.5 bg-white/90 backdrop-blur-md text-slate-400 hover:text-slate-700 rounded-full shadow-md transition"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main Product Image */}
              <img
                src={galleryImages[activeImageIndex]}
                alt="iPhone 15 Pro Max"
                className="w-full h-full object-contain max-h-[400px] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-5 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition bg-white p-1 ${activeImageIndex === idx ? 'border-blue-600 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover rounded-xl" />
                  {idx === 4 && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold rounded-xl">
                      +2
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Lower Tabs Section (Below Gallery) */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-2xs mt-8">

              {/* Tab Header Buttons */}
              <div className="flex items-center space-x-8 border-b border-slate-200 text-xs font-bold">
                {['description', 'specifications', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 capitalize transition border-b-2 -mb-px ${activeTab === tab ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                  >
                    {tab === 'reviews' ? 'Reviews (128)' : tab}
                  </button>
                ))}
              </div>

              {/* Description Tab Content matching mockup */}
              {activeTab === 'description' && (
                <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                  <h3 className="text-sm font-black text-slate-900">
                    iPhone 15 Pro Max. Titanium. So strong. So light. So Pro.
                  </h3>
                  <p className="text-slate-600">
                    iPhone 15 Pro Max is crafted from lightweight titanium and features the powerful A17 Pro chip, a customizable Action button, and the most advanced iPhone camera system ever.
                  </p>

                  {/* Feature Highlights List */}
                  <div className="space-y-3 pt-2">

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-700 shrink-0 mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Titanium Design</h4>
                        <p className="text-slate-500 text-[11px]">Strong yet lightweight titanium with a textured matte finish.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-700 shrink-0 mt-0.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">A17 Pro Chip</h4>
                        <p className="text-slate-500 text-[11px]">The fastest chip in a smartphone. Built for Apple Intelligence.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-700 shrink-0 mt-0.5">
                        <Camera className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Pro Camera System</h4>
                        <p className="text-slate-500 text-[11px]">48MP Main camera with next-gen portraits and 5x Telephoto.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-700 shrink-0 mt-0.5">
                        <Battery className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">All-Day Battery</h4>
                        <p className="text-slate-500 text-[11px]">Up to 29 hours of video playback.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-700 shrink-0 mt-0.5">
                        <Usb className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">USB-C Connectivity</h4>
                        <p className="text-slate-500 text-[11px]">Faster transfers and universal compatibility.</p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-500">Display:</span><span className="font-bold">6.7" Super Retina XDR OLED 120Hz</span></div>
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-500">Chipset:</span><span className="font-bold">A17 Pro Bionic</span></div>
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-500">Camera:</span><span className="font-bold">48MP Main + 12MP Ultra Wide + 12MP Telephoto</span></div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <span className="font-bold">Customer Rating</span>
                    <span className="text-amber-500 font-bold">4.8 ★ (128 reviews)</span>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column (7 cols): Product Title, Price, Guarantees, Contact Shop & Sold By Card */}
          <div className="lg:col-span-7 space-y-6">

            {/* Top Info Box */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-5 shadow-2xs">

              {/* Premium Store Tag */}
              <div className="flex items-center space-x-2">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Premium Store</span>
                </span>
              </div>

              {/* Title & Color Variant */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  iPhone 15 Pro Max (256GB)
                </h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Natural Titanium</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-black text-slate-900">4.8</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-slate-400 font-medium">(128 reviews)</span>
              </div>

              {/* Price & In Stock Tag */}
              <div className="flex items-center justify-between border-y border-slate-100 py-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-black text-slate-900">₹1,34,900</span>
                  <span className="text-sm text-slate-400 line-through">₹1,49,900</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                    (10% OFF)
                  </span>
                </div>

                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  In Stock
                </span>
              </div>

              {/* 3 Value Proposition Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-[11px]">100% Original</h5>
                    <p className="text-[10px] text-slate-400">Sourced directly from brand</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-[11px]">1 Year Warranty</h5>
                    <p className="text-[10px] text-slate-400">Brand Warranty</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                  <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-[11px]">Secure Payments</h5>
                    <p className="text-[10px] text-slate-400">Contact shop for payments</p>
                  </div>
                </div>

              </div>

              {/* Contact the Shop Box */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Contact the Shop</h4>
                  <p className="text-[11px] text-slate-500">Get in touch with the shop owner</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => logLeadAction(shop.id, product.id, 'whatsapp')}
                    className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/20 transition"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => logLeadAction(shop.id, product.id, 'call')}
                    className="py-3 px-4 border border-blue-200 hover:bg-blue-50 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                </div>

                <button
                  onClick={() => logLeadAction(shop.id, product.id, 'visit')}
                  className="w-full py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition"
                >
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Get Directions</span>
                </button>
              </div>

            </div>

            {/* Sold by Shop Card Widget matching mockup */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sold by</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-black text-xl shrink-0">
                    {shop.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1">
                      <span>{shop.name}</span>
                      <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-600 stroke-white" />
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                      <span className="text-amber-500 font-bold">4.7 ★★★★★</span>
                      <span>(458 reviews)</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">95% Positive Feedback</p>
                  </div>
                </div>

                <Link
                  to={`/shop/${shop.id}`}
                  className="py-2 px-4 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold transition shrink-0"
                >
                  View Shop
                </Link>
              </div>

              {/* Details List */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">

                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Shop Address</span>
                    <span>16, Sapna Sangeeta Road, Indore, MP</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Open Hours</span>
                    <span>10:00 AM - 9:00 PM (All Days)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Phone</span>
                    <span>+91 98260 12345</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Shop Since</span>
                    <span>Jan 2018</span>
                  </div>
                </div>

              </div>

              {/* Bottom Badges Strip */}
              <div className="flex items-center space-x-3 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-600">
                <span className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Seller</span>
                </span>
                <span className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" />
                  <span>Premium Store</span>
                </span>
                <span className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Trusted Shop</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. "You May Also Like" Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">You May Also Like</h2>
            <div className="flex items-center space-x-3">
              <Link to="/search" className="text-xs font-bold text-slate-500 hover:text-blue-600">View All</Link>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedCarouselProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-lg transition group relative"
              >
                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-5 right-5 p-1 text-slate-400 hover:text-red-500 transition z-10"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <Link to={`/product/${prod.id}`} className="block w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="space-y-1">
                  <Link to={`/product/${prod.id}`}>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">{prod.title}</h3>
                  </Link>
                  <p className="text-[10px] text-slate-400">{prod.specs}</p>
                  <div className="flex items-center text-[10px] text-amber-500 font-bold space-x-1 pt-0.5">
                    <span>★ {prod.rating}</span>
                    <span className="text-slate-400 font-normal">({prod.reviews})</span>
                  </div>
                  <p className="text-xs font-black text-slate-900 pt-1">₹{prod.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Mobile Product Action Bar (Positioned cleanly above mobile bottom nav) */}
      <div className="md:hidden fixed bottom-[54px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center space-x-2 select-none pb-safe">
        <button
          onClick={() => logLeadAction(shop.id, product.id, 'whatsapp')}
          className="w-1/2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
        >
          <MessageSquare className="w-4 h-4 fill-white shrink-0" />
          <span>WhatsApp Chat</span>
        </button>
        <button
          onClick={() => addToInquiryCart(product)}
          className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
        >
          <span>Inquire Now</span>
        </button>
      </div>

    </div>
  );
}
