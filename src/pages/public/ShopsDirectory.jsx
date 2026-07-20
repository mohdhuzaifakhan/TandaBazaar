import React, { useState } from 'react';
import { Store, MapPin, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ShopCard from '../../components/shop/ShopCard';

export default function ShopsDirectory() {
  const { shops, categoriesList } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');
  const [shopQuery, setShopQuery] = useState('');

  const filteredShops = shops.filter(shop => {
    if (filterCategory !== 'all' && shop.category !== filterCategory) return false;
    if (shopQuery.trim()) {
      const q = shopQuery.toLowerCase();
      return shop.name.toLowerCase().includes(q) || shop.area.toLowerCase().includes(q) || shop.about.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          Local Shops Directory – Tanda Badli, Rampur
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Connect directly with verified local business owners across Tanda Badli
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search shop name or area in Tanda Badli..."
            value={shopQuery}
            onChange={(e) => setShopQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none"
        >
          <option value="all">All Shop Categories</option>
          {categoriesList.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredShops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
