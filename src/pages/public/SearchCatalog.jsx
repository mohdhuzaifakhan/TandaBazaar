import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Heart, Star, SlidersHorizontal, ChevronRight, X, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SearchCatalog() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const { products, wishlist, toggleWishlist, addToInquiryCart } = useApp();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMax, setPriceMax] = useState(200000);
  const [sortBy, setSortBy] = useState('relevance');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products by query & category & brand
  const filteredProducts = products.filter(prod => {
    if (queryParam.trim()) {
      const q = queryParam.toLowerCase();
      const matchTitle = prod.title.toLowerCase().includes(q);
      const matchCategory = prod.category.toLowerCase().includes(q);
      const matchShop = prod.shopName.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchShop) return false;
    }

    if (categoryParam) {
      if (prod.category !== categoryParam) return false;
    }

    if (selectedBrands.length > 0 && prod.brand) {
      if (!selectedBrands.includes(prod.brand)) return false;
    }

    if (prod.price > priceMax) return false;

    return true;
  });

  const displayQuery = queryParam || categoryParam || 'All Products';

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Search Header Strip */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Results for <span className="text-blue-600">"{displayQuery}"</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-bold text-slate-700"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters</span>
              {(selectedBrands.length > 0 || priceMax < 200000) && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 font-semibold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 outline-none text-xs"
              >
                <option value="relevance">Relevance</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Slide-Up Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end lg:hidden">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Price Range</span>
              <input 
                type="range" 
                min="1000" 
                max="200000" 
                step="5000"
                value={priceMax} 
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>₹1,000</span>
                <span>₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">Brands</span>
              {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Sony', 'Nike'].map(b => (
                <label key={b} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => setSelectedBrands(prev => prev.includes(b) ? prev.filter(item => item !== b) : [...prev, b])}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Grid Layout: Desktop Sidebar Filters + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Filters</span>
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              </h3>

              {/* Price Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Price Range</span>
                <input 
                  type="range" 
                  min="1000" 
                  max="200000" 
                  step="5000"
                  value={priceMax} 
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>₹1,000</span>
                  <span>₹{priceMax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 block">Brands</span>
                {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Sony', 'Nike'].map(b => (
                  <label key={b} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => setSelectedBrands(prev => prev.includes(b) ? prev.filter(item => item !== b) : [...prev, b])}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>

            </div>
          </div>

          {/* Right Product Grid (2 columns on mobile!) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 space-y-3">
                <Search className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                <h3 className="text-base font-bold text-slate-700">No products found</h3>
                <p className="text-xs text-slate-400">Try searching for a different product name or clear your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map(prod => (
                  <div 
                    key={prod.id} 
                    className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:border-blue-200 transition group relative"
                  >
                    <div className="flex items-center justify-between mb-1.5 z-10">
                      {prod.discount ? (
                        <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-md">
                          -{prod.discount}%
                        </span>
                      ) : <span />}

                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition rounded-full"
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <Link to={`/product/${prod.id}`} className="block w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-slate-50">
                      <img
                        src={prod.images?.[0] || prod.images}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="space-y-1.5">
                      <Link to={`/product/${prod.id}`} className="block">
                        <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px] sm:min-h-[36px] leading-snug group-hover:text-blue-600 transition">
                          {prod.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <div>
                          <span className="text-xs sm:text-sm font-black text-slate-900">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 truncate">
                        {prod.shopName}
                      </p>

                      <button
                        onClick={() => addToInquiryCart(prod)}
                        className="w-full py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-xs font-bold transition mt-1"
                      >
                        Inquire Now
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
