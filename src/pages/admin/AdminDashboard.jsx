import React, { useState } from 'react';
import { 
  ShieldCheck, Store, ShoppingBag, DollarSign, Users, CheckCircle2, 
  XCircle, Plus, Edit, Trash2, ArrowUp, ArrowDown, MessageSquare, Phone 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { 
    shops, products, categoriesList, homepageSections, setHomepageSections, 
    toggleShopVerification, toggleShopPremium, deleteProduct, addCategory, cityConfig 
  } = useApp();

  const [activeTab, setActiveTab] = useState('shops');
  const [newCatName, setNewCatName] = useState('');

  const handleMoveSection = (index, direction) => {
    const updated = [...homepageSections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setHomepageSections(updated);
  };

  const handleAddCatSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName,
      icon: "Store",
      color: "bg-indigo-500",
      count: 0,
      subcategories: ["General"]
    });
    setNewCatName('');
    alert(`Category "${newCatName}" created successfully!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-slate-900/40 backdrop-blur px-3 py-1 rounded-full text-xs font-extrabold text-amber-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Platform Admin Control Center</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
            Tanda Badli Marketplace Admin
          </h1>
          <p className="text-xs text-amber-100 mt-1">
            Admin WhatsApp for Subscription Management: <strong>+91 {cityConfig.adminWhatsapp}</strong>
          </p>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
          <span className="text-xs text-slate-400 font-medium">Registered Shops</span>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mt-1">{shops.length}</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
          <span className="text-xs text-slate-400 font-medium">Active Premium (₹1000/mo)</span>
          <h3 className="font-heading font-extrabold text-2xl text-amber-500 mt-1">{shops.filter(s => s.isPremium).length}</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
          <span className="text-xs text-slate-400 font-medium">Total Products</span>
          <h3 className="font-heading font-extrabold text-2xl text-indigo-600 dark:text-indigo-400 mt-1">{products.length}</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft">
          <span className="text-xs text-slate-400 font-medium">Monthly Platform Revenue</span>
          <h3 className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 mt-1">₹4,000</h3>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6 text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('shops')}
          className={`pb-3 border-b-2 whitespace-nowrap transition ${activeTab === 'shops' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500'}`}
        >
          Manage Shops ({shops.length})
        </button>
        <button
          onClick={() => setActiveTab('homepage')}
          className={`pb-3 border-b-2 whitespace-nowrap transition ${activeTab === 'homepage' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500'}`}
        >
          Homepage Layout Drag & Reorder
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 whitespace-nowrap transition ${activeTab === 'products' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500'}`}
        >
          Product Moderation ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 border-b-2 whitespace-nowrap transition ${activeTab === 'categories' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500'}`}
        >
          Categories Manager
        </button>
      </div>

      {/* Tab 1: Manage Shops */}
      {activeTab === 'shops' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">Shop Name & Area</th>
                  <th className="p-4">Owner Phone</th>
                  <th className="p-4">Verified Badge</th>
                  <th className="p-4">Premium Membership (₹1000/mo)</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {shops.map(shop => (
                  <tr key={shop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={shop.logoImage} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{shop.name}</p>
                        <p className="text-[11px] text-slate-400">{shop.area}, Tanda Badli</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-mono">{shop.phone}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleShopVerification(shop.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${shop.isVerified ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {shop.isVerified ? '✓ Verified' : '+ Mark Verified'}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleShopPremium(shop.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${shop.isPremium ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {shop.isPremium ? '⭐ Premium Active' : 'Upgrade to Premium'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`https://wa.me/${shop.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold inline-flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat Seller</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Homepage Section Order Manager */}
      {activeTab === 'homepage' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-soft space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Homepage Layout Section Order</h3>
            <p className="text-xs text-slate-500">Re-order homepage components dynamically without touching code.</p>
          </div>

          <div className="space-y-2">
            {homepageSections.map((sec, idx) => (
              <div key={sec.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px]">{idx + 1}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{sec.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveSection(idx, 'up')}
                    className="p-1.5 bg-white dark:bg-slate-800 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === homepageSections.length - 1}
                    onClick={() => handleMoveSection(idx, 'down')}
                    className="p-1.5 bg-white dark:bg-slate-800 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Categories Manager */}
      {activeTab === 'categories' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-soft space-y-6">
          <form onSubmit={handleAddCatSubmit} className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="New Category Name (e.g. Toys & Games)"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold">
              Add Category
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categoriesList.map(cat => (
              <div key={cat.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Product Moderation */}
      {activeTab === 'products' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-soft space-y-4">
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Product Moderation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(prod => (
              <div key={prod.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img src={prod.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white truncate max-w-[140px]">{prod.title}</p>
                    <p className="text-[11px] text-indigo-600">₹{prod.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(prod.id)}
                  className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100"
                  title="Remove listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
