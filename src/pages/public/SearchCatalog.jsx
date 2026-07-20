import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, Search, X, Check, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/product/ProductCard';

export default function SearchCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categoriesList, searchQuery, setSearchQuery } = useApp();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || searchQuery;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedArea, setSelectedArea] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(searchParams.get('featured') === 'true');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Text Search
      if (initialSearch.trim()) {
        const query = initialSearch.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesShop = product.shopName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesShop) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Area filter
      if (selectedArea !== 'all' && product.area !== selectedArea) {
        return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Featured filter
      if (onlyFeatured && !product.isFeatured) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.views - a.views; // Default popular
    });
  }, [products, initialSearch, selectedCategory, selectedArea, minPrice, maxPrice, onlyFeatured, sortBy]);

  const areasList = ['Main Market', 'Station Road', 'Chowk Bazaar', 'Moradabad Bye-pass', 'Sarafa Bazaar'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Local Catalog – Tanda Badli, Rampur
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showing {filteredProducts.length} local products available across neighborhood shops
          </p>
        </div>

        {/* View mode & Sort controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFilterMobileOpen(true)}
            className="md:hidden flex items-center space-x-1.5 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-xl text-xs font-bold border border-indigo-200 dark:border-slate-700"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="popular">Sort by: Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
            <option value="newest">Newest Additions</option>
          </select>

          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block space-y-6 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Filters</span>
            </h3>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedArea('all'); setMinPrice(0); setMaxPrice(200000); setOnlyFeatured(false); }}
              className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Categories</option>
              {categoriesList.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Area in Tanda Badli */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Area / Location</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Areas in Tanda Badli</option>
              {areasList.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Max Price:</span>
              <span className="text-indigo-600 dark:text-indigo-400">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="200000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => setOnlyFeatured(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Featured Premium Items Only</span>
            </label>
          </div>

        </div>

        {/* Product Grid / List Container */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700">
              <Search className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">No products found</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting your category or price filters to see more results.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedArea('all'); setMinPrice(0); setMaxPrice(200000); }}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
