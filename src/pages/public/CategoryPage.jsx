import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ChevronRight, Heart, Star, SlidersHorizontal, ChevronDown, Check, Filter 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CategoryPage() {
  const { products, wishlist, toggleWishlist, addToInquiryCart } = useApp();
  const [searchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'mobile-phones';
  const [selectedSubcat, setSelectedSubcat] = useState('Smartphones');
  const [selectedBrands, setSelectedBrands] = useState(['Apple', 'Samsung', 'OnePlus']);
  const [selectedRating, setSelectedRating] = useState(4);
  const [priceRange, setPriceRange] = useState(150000);
  const [sortBy, setSortBy] = useState('popular');
  const [activePage, setActivePage] = useState(1);

  const categories = [
    { name: "All Mobiles", count: 180 },
    { name: "Smartphones", count: 124 },
    { name: "Feature Phones", count: 22 },
    { name: "Accessories", count: 85 },
    { name: "Tablets", count: 18 },
    { name: "Smartwatches", count: 40 },
    { name: "Power Banks", count: 25 },
    { name: "Headphones", count: 60 }
  ];

  const brands = [
    { name: "Apple", count: 24 },
    { name: "Samsung", count: 32 },
    { name: "OnePlus", count: 18 },
    { name: "Xiaomi", count: 28 },
    { name: "Oppo", count: 15 },
    { name: "Vivo", count: 20 },
    { name: "Realme", count: 16 }
  ];

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // Filter items
  const filteredProducts = products.filter(prod => {
    if (selectedBrands.length > 0 && prod.brand) {
      if (!selectedBrands.includes(prod.brand)) return false;
    }
    if (prod.price > priceRange) return false;
    if (selectedRating && prod.rating < selectedRating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Top Header & Breadcrumb Container */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/search" className="hover:text-blue-600">Electronics</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-semibold text-slate-800">Mobiles</span>
          </div>

          {/* Banner Card inside page */}
          <div className="bg-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200/80">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Mobiles & Smartphones
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Find the latest mobiles at the best prices from verified local shops near you.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=200&q=80" 
                alt="Latest phones"
                className="w-14 h-14 object-cover rounded-xl shadow-sm border border-white"
              />
              <img 
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80" 
                alt="Latest phones"
                className="w-14 h-14 object-cover rounded-xl shadow-sm border border-white"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Categories Accordion Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Categories
              </h3>
              <div className="space-y-1.5 text-xs font-medium text-slate-600">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedSubcat(cat.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${selectedSubcat === cat.name ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-50'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Price Range</h3>
                <span className="text-xs font-bold text-blue-600">₹5,000 - ₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Brand Checkboxes Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Brand
              </h3>
              <div className="space-y-2 text-xs">
                {brands.map(brand => (
                  <label key={brand.name} className="flex items-center justify-between cursor-pointer group text-slate-700 hover:text-blue-600">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => toggleBrand(brand.name)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{brand.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Checkboxes Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Rating
              </h3>
              <div className="space-y-2 text-xs">
                {[4, 3, 2, 1].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setSelectedRating(stars)}
                    className={`w-full flex items-center space-x-2 p-1.5 rounded-lg text-left transition ${selectedRating === stars ? 'bg-blue-50 font-bold text-blue-600' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`w-3.5 h-3.5 ${idx < stars ? 'fill-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <span>{stars}★ & above</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Count & Sort */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-700 outline-none focus:border-blue-600"
                >
                  <option value="popular">Popularity</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 transition group relative"
                >
                  {/* Top Bar: Discount Tag & Heart */}
                  <div className="flex items-center justify-between mb-2 z-10">
                    {prod.discount ? (
                      <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
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

                  {/* Main Product Image */}
                  <Link to={`/product/${prod.id}`} className="block w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
                    <img
                      src={prod.images?.[0] || prod.images}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <Link to={`/product/${prod.id}`} className="block">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
                        {prod.title}
                      </h3>
                    </Link>

                    {/* Ratings */}
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="flex items-center text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        {prod.rating}
                      </span>
                      <span className="text-[11px] text-slate-400">({prod.reviewCount || 45})</span>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-base font-black text-slate-900">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <p className="text-[11px] text-slate-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => addToInquiryCart(prod)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Inquire
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Component */}
            <div className="flex items-center justify-center space-x-2 pt-6">
              {[1, 2, 3, 4, '...', 20].map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof page === 'number' && setActivePage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition ${activePage === page ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
