import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Heart, Star, ChevronRight, Store, ArrowRight,
  Smartphone, Laptop, Footprints, Watch, Headphones, Tv, Home as HomeIcon, Sparkles, BookOpen, MoreHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Home() {
  const { 
    products, shops, wishlist, toggleWishlist, searchQuery, setSearchQuery, 
    selectedLocation, addToInquiryCart 
  } = useApp();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickCategories = [
    { id: "electronics", name: "Electronics", icon: Tv, color: "bg-blue-100 text-blue-600" },
    { id: "mobile-phones", name: "Mobiles", icon: Smartphone, color: "bg-indigo-100 text-indigo-600" },
    { id: "fashion", name: "Fashion", icon: Footprints, color: "bg-pink-100 text-pink-600" },
    { id: "home-decor", name: "Home Decor", icon: HomeIcon, color: "bg-rose-100 text-rose-600" },
    { id: "furniture", name: "Furniture", icon: HomeIcon, color: "bg-emerald-100 text-emerald-600" },
    { id: "beauty", name: "Beauty", icon: Sparkles, color: "bg-purple-100 text-purple-600" },
    { id: "books", name: "Books", icon: BookOpen, color: "bg-amber-100 text-amber-600" },
    { id: "more", name: "More", icon: MoreHorizontal, color: "bg-slate-100 text-slate-600" }
  ];

  const featuredCategoryCards = [
    { id: "mobile-phones", title: "Smartphones", count: "1,245 Products", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80" },
    { id: "electronics", title: "Laptops", count: "872 Products", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
    { id: "shoes", title: "Shoes", count: "1,560 Products", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { id: "watches", title: "Watches", count: "670 Products", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: "headphones", title: "Headphones", count: "910 Products", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" }
  ];

  const premiumStores = shops.filter(s => s.isPremium || s.rating >= 4.6).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending || p.isFeatured).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. Hero Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full">
                Discover the Best
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Products from <span className="text-blue-600">Local</span> Shops Near You
              </h1>

              <p className="text-slate-600 text-sm sm:text-base max-w-lg">
                Support local businesses and find amazing products at the best prices with direct store inquiries and instant contact.
              </p>

              {/* Big Search Input */}
              <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 flex items-center gap-2 max-w-xl">
                <div className="flex items-center flex-1 pl-3">
                  <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for products, shops and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 outline-none placeholder-slate-400"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition shrink-0"
                >
                  Search
                </button>
              </form>

              {/* Popular Searches Pills */}
              <div className="flex items-center space-x-2 text-xs text-slate-500 flex-wrap gap-y-2">
                <span className="font-semibold text-slate-700">Popular searches:</span>
                {["iPhone", "Shoes", "Furniture", "Watches"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/search?q=${tag}`)}
                    className="bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 px-3 py-1 rounded-full text-slate-600 transition shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column Hero Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Home & Local Shop Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">500+ Verified Stores</p>
                    <p className="text-[11px] text-slate-500">In {selectedLocation}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Quick Category Circular Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="flex overflow-x-auto snap-x scrollbar-none space-x-4 sm:space-x-0 sm:grid sm:grid-cols-8 sm:gap-4 text-center pb-2">
          {quickCategories.map(cat => {
            const IconComp = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/search?category=${cat.id}`}
                className="group flex flex-col items-center space-y-2 p-1.5 hover:scale-105 transition-transform shrink-0 snap-start w-18 sm:w-auto"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${cat.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition`}>
                  <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-blue-600 transition truncate max-w-[70px] sm:max-w-none">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Categories</h2>
          <Link to="/search" className="text-xs font-bold text-blue-600 hover:underline flex items-center">
            <span>View all</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategoryCards.map(cat => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.id}`}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg hover:border-blue-200 transition group"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">{cat.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Premium Stores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Premium Stores</h2>
          <Link to="/shops?premium=true" className="text-xs font-bold text-blue-600 hover:underline flex items-center">
            <span>View all</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {premiumStores.map(shop => (
            <Link
              key={shop.id}
              to={`/shop/${shop.id}`}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center space-x-3.5 hover:shadow-md hover:border-blue-200 transition group"
            >
              <img
                src={shop.logoImage}
                alt={shop.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate transition">
                  {shop.name}
                </h3>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                    {shop.rating}
                  </span>
                  <span>•</span>
                  <span className="truncate">{shop.city}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Trending Products</h2>
          <Link to="/search?filter=trending" className="text-xs font-bold text-blue-600 hover:underline flex items-center">
            <span>View all</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trendingProducts.map(prod => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between hover:shadow-lg hover:border-blue-200 transition group relative"
            >
              {/* Top Badge & Heart */}
              <div className="flex items-center justify-between mb-2">
                {prod.discount ? (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    -{prod.discount}%
                  </span>
                ) : <span />}
                
                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition rounded-full hover:bg-slate-100"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              {/* Product Image */}
              <Link to={`/product/${prod.id}`} className="block w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
                <img
                  src={prod.images?.[0] || prod.images}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Info */}
              <div className="space-y-1">
                <Link to={`/product/${prod.id}`} className="block">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px] group-hover:text-blue-600 transition leading-snug">
                    {prod.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through ml-1">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToInquiryCart(prod)}
                    className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-semibold transition"
                    title="Add to inquiry cart"
                  >
                    + Add
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 truncate pt-0.5">
                  {prod.shopName}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 6. Dual Promo CTA Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left CTA: Become a Seller */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="space-y-3 max-w-xs relative z-10">
              <h3 className="text-xl sm:text-2xl font-black">Become a Seller</h3>
              <p className="text-xs text-blue-100">Grow your business by showcasing your products directly to local customers.</p>
              <Link
                to="/seller"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-md"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=400&q=80" 
              alt="Become a seller"
              className="w-32 h-32 object-cover rounded-2xl shadow-md hidden sm:block shrink-0"
            />
          </div>

          {/* Right CTA: Premium Membership */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-slate-900 rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-3 max-w-xs relative z-10">
              <h3 className="text-xl sm:text-2xl font-black">Premium Membership</h3>
              <p className="text-xs text-slate-600">Get more visibility, top banner slots and grow 5x faster.</p>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">Only ₹999 / month</span>
                <Link to="/pricing" className="text-xs font-bold text-amber-700 hover:underline flex items-center">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
