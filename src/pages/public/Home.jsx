import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Sparkles, Store, ShieldCheck, ArrowRight, Zap, 
  Tag, ChevronRight, Phone, MessageSquare, CheckCircle2, Star, Check, Award, Users, Shield, ArrowUpRight, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/product/ProductCard';
import ShopCard from '../../components/shop/ShopCard';

export default function Home() {
  const { 
    cityConfig, categoriesList, products, shops, offers, 
    searchQuery, setSearchQuery, setIsAiModalOpen, upgradeToPremiumWhatsapp, logLeadAction 
  } = useApp();
  
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredProducts = products.filter(p => p.isFeatured);
  const trendingProducts = products.filter(p => p.isTrending);
  const premiumShops = shops.filter(s => s.isPremium || s.isVerified);
  const spotlightShop = shops[1] || shops[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-white dark:bg-[#090D16]">
      
      {/* 1. Distinctive Split Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* City Pill */}
              <div className="inline-flex items-center space-x-2.5 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-900 dark:text-slate-200 shadow-subtle">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Verified Shops in <strong>{cityConfig.name}</strong></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Editorial Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                Local Commerce Redefined in <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">{cityConfig.district}</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Connect directly with nearby shop owners for smartphones, ethnic fashion, furniture, electronics, and jewellery. Zero middleman fees.
              </p>

              {/* Search Box */}
              <div className="pt-2 max-w-xl">
                <form onSubmit={handleHeroSearch} className="relative p-2 bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center shadow-subtle">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products or shops in Tanda Badli..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-[#0F172A] hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center space-x-1 shadow-subtle"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="text-slate-400 font-medium">Quick Filters:</span>
                  {[
                    { label: '📱 Mobiles', query: 'Mobile' },
                    { label: '👗 Ethnic Wear', query: 'Lehenga' },
                    { label: '📺 Smart TV', query: 'TV' },
                    { label: '🛋️ Furniture', query: 'Sofa' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSearchQuery(item.query); navigate(`/search?q=${item.query}`); }}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-xl text-[11px] font-medium transition"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics Row */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="font-heading font-extrabold text-2xl text-slate-950 dark:text-white">15+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Categories</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-slate-950 dark:text-white">100+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Verified Sellers</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">0%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Commission</div>
                </div>
              </div>

            </div>

            {/* Right Spotlight Store Widget Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#111726] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-float space-y-5 relative">
                
                {/* Badge Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Spotlight Store Today</span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    VERIFIED RETAILER
                  </span>
                </div>

                {/* Shop Snapshot */}
                <div className="flex items-center space-x-4">
                  <img
                    src={spotlightShop.logoImage}
                    alt={spotlightShop.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-950 dark:text-white flex items-center space-x-1.5">
                      <span>{spotlightShop.name}</span>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{spotlightShop.area}, Tanda Badli</p>
                    <div className="flex items-center space-x-3 mt-1.5 text-xs font-semibold">
                      <span className="text-amber-500 flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{spotlightShop.rating} ({spotlightShop.reviewCount})</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Open Now</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Products Mini Reel */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Store Stock</div>
                  <div className="grid grid-cols-2 gap-2">
                    {products.filter(p => p.shopId === spotlightShop.id).slice(0, 2).map(item => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl flex items-center space-x-2 hover:border-slate-400 transition"
                      >
                        <img src={item.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-slate-900 dark:text-white truncate">{item.title}</p>
                          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => logLeadAction(spotlightShop.id, null, 'whatsapp')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Shop</span>
                  </button>

                  <Link
                    to={`/shop/${spotlightShop.id}`}
                    className="bg-[#0F172A] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition"
                  >
                    <span>Visit Shop</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white tracking-tight">
              Browse Categories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Explore 15+ business categories available in Tanda Badli
            </p>
          </div>
          <Link to="/search" className="text-xs font-semibold text-slate-950 dark:text-white hover:underline flex items-center space-x-1">
            <span>All Categories ({categoriesList.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categoriesList.map(cat => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.id}`}
              className="group bg-white dark:bg-[#111726] border border-slate-200/90 dark:border-slate-800 p-5 rounded-2xl hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 flex flex-col items-center text-center space-y-2 shadow-subtle"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-200/80 dark:border-slate-700">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-normal">{cat.count}+ Products</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg mb-2 border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>Premium Listings</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white tracking-tight">
              Featured Products in Tanda Badli
            </h2>
          </div>
          <Link to="/search?featured=true" className="text-xs font-semibold text-slate-950 dark:text-white hover:underline">
            View All Featured →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Top Rated Shops Spotlight */}
      <section className="bg-slate-50/80 dark:bg-[#0E131F] py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white tracking-tight">
                Top Rated Local Shops
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verified stores in Tanda Badli, Rampur
              </p>
            </div>
            <Link to="/shops" className="text-xs font-semibold text-slate-950 dark:text-white hover:underline">
              Explore All Shops →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumShops.slice(0, 3).map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Today's Special Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg mb-2 border border-slate-200/80 dark:border-slate-700">
              <Tag className="w-3.5 h-3.5" />
              <span>Discount Vouchers</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white tracking-tight">
              Today's Store Offers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111726] flex flex-col justify-between shadow-subtle">
              <div className="h-32 relative overflow-hidden">
                <img src={offer.banner} alt={offer.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-slate-950 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                  {offer.discountText}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">{offer.shopName}</span>
                  <h3 className="font-heading font-bold text-sm text-slate-950 dark:text-white mt-1 leading-snug">{offer.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{offer.terms}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-slate-200 border border-dashed border-slate-300 dark:border-slate-700">
                    {offer.code}
                  </div>
                  <Link to={`/shop/${offer.shopId}`} className="text-xs font-semibold text-slate-950 dark:text-white hover:underline">
                    Claim Deal →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Shop Owner Membership Plan (₹1000/month) -> Direct WhatsApp to Admin 8433043426 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden shadow-float">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>Shop Owner Membership</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl leading-tight">
                Grow Your Tanda Badli Store Sales Online
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Get your products featured on the marketplace homepage and receive direct customer phone & WhatsApp call leads for just <strong>₹1,000 / month</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Homepage Featured Placement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Verified Seller Badge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited Product Listings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Lead Calls</span>
                </div>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-4 shadow-xl">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Premium Plan</span>
              <div className="font-heading font-extrabold text-4xl text-white">
                ₹1,000 <span className="text-xs font-normal text-slate-400">/ month</span>
              </div>
              <p className="text-[10px] text-slate-400">Instant Admin Activation • Zero Commission</p>

              <button
                onClick={() => upgradeToPremiumWhatsapp("Tanda Shop Owner", "Seller", "")}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 shadow-subtle"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Now via Admin WhatsApp</span>
              </button>

              <p className="text-[10px] text-slate-400">Admin WhatsApp Number: +91 8433043426</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
