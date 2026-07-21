import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Package, PhoneCall, MessageSquare, TrendingUp, Star, Tag, 
  Store, Settings, CreditCard, ShoppingBag, Users, Calendar, ChevronDown, 
  ExternalLink, Bell, Search, Edit, MoreVertical, Plus, Share2, Award, 
  Headphones, Rocket, CheckCircle2, MapPin, Mail, Clock, X, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SellerDashboard() {
  const { products, shops, addProduct, deleteProduct, updateShopProfile } = useApp();
  const shop = shops.find(s => s.id === 'shop-cellular-world') || shops[0];

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [dateRange, setDateRange] = useState('May 15 – May 21, 2025');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Form states for Add Product
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('Smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');

  // Form states for Store Profile
  const [shopName, setShopName] = useState(shop.name);
  const [shopPhone, setShopPhone] = useState(shop.phone || '+91 98260 12345');
  const [shopAddress, setShopAddress] = useState(shop.address || 'Indore, Madhya Pradesh');

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodPrice) return;

    const newProd = {
      id: `prod-${Date.now()}`,
      title: prodTitle,
      category: prodCategory,
      price: Number(prodPrice),
      stock: "In Stock",
      stockColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      views: "1",
      status: "Active",
      image: prodImage || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
      shopId: shop.id,
      shopName: shop.name
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    setProdTitle('');
    setProdPrice('');
    setProdImage('');
    alert('Product added successfully!');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateShopProfile({
      ...shop,
      name: shopName,
      phone: shopPhone,
      address: shopAddress
    });
    setIsProfileModalOpen(false);
    alert('Shop profile updated successfully!');
  };

  // Top Performing Products Data matching mockup
  const topPerformingProducts = [
    { id: 1, title: "iPhone 15 Pro Max (256GB)", views: "1,245", count: 245, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80" },
    { id: 2, title: "Samsung S24 Ultra (256GB)", views: "980", count: 198, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=100&q=80" },
    { id: 3, title: "OnePlus 12 (512GB)", views: "732", count: 156, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=100&q=80" },
    { id: 4, title: "AirPods Pro (2nd Gen)", views: "620", count: 128, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=100&q=80" },
    { id: 5, title: "MacBook Air M2 (256GB)", views: "512", count: 96, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 hidden lg:flex">
        
        <div className="p-6 space-y-6">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4 fill-white text-blue-600" />
            </div>
            <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
              Shop<span className="text-blue-600">Local</span>
            </span>
          </div>

          {/* Store Card Header */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center space-x-3">
            <img
              src={shop.logoImage}
              alt={shop.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{shop.name}</h3>
              <span className="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.2 rounded-md">
                Premium Plan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            
            <button
              onClick={() => setActiveMenu('Dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Dashboard' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Store className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveMenu('Products')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Products' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveMenu('Orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeMenu === 'Orders' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders (Inquiries)</span>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full">24</span>
            </button>

            <button
              onClick={() => setActiveMenu('Leads')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeMenu === 'Leads' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center space-x-3">
                <PhoneCall className="w-4 h-4" />
                <span>Leads</span>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full">12</span>
            </button>

            <button
              onClick={() => setActiveMenu('Analytics')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Analytics' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition"
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>

          </nav>
        </div>

        {/* Bottom Promos */}
        <div className="p-4 space-y-3">
          <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-4 text-center space-y-2">
            <Award className="w-6 h-6 text-purple-600 mx-auto" />
            <h4 className="text-xs font-bold text-purple-900">You're on Premium Plan</h4>
            <p className="text-[11px] text-purple-700">Your plan is active until <br /><strong>15 Jun 2025</strong></p>
          </div>
        </div>

      </aside>

      {/* 2. Main Center Body + Right Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-3">
            <Link
              to={`/shop/${shop.id}`}
              className="py-2 px-3 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

        </header>

        {/* Main Body Grid */}
        <main className="p-6 sm:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Center Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back, Amit! 👋</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Here's what's happening with your store today.</p>
                </div>
              </div>

              {/* 4 Stat Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Total Views</span>
                    <h3 className="text-xl font-black text-slate-900">12,450</h3>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Product Views</span>
                    <h3 className="text-xl font-black text-slate-900">8,230</h3>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Contact Clicks</span>
                    <h3 className="text-xl font-black text-slate-900">1,245</h3>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 fill-emerald-600 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">WhatsApp Clicks</span>
                    <h3 className="text-xl font-black text-slate-900">914</h3>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Manage Products ({products.length})</h3>
                  <button onClick={() => setIsAddModalOpen(true)} className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 font-medium">
                      {products.map(prod => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <img src={prod.images?.[0] || prod.image || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80"} alt={prod.title} className="w-9 h-9 rounded-xl object-cover border shrink-0" />
                              <div>
                                <h4 className="font-bold text-slate-900">{prod.title}</h4>
                                <span className="text-[10px] text-slate-400">{prod.category}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 font-bold text-slate-900">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </td>

                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                              In Stock
                            </span>
                          </td>

                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                              Active
                            </span>
                          </td>

                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${prod.title}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs font-bold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Store Summary Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden">
                <div className="h-32 w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={shop.coverImage || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"}
                    alt={shop.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>

                <div className="p-5 pt-0 relative z-10 -mt-8 space-y-4">
                  <div className="flex items-end space-x-3">
                    <img
                      src={shop.logoImage}
                      alt={shop.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center space-x-1">
                      <span>{shop.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600 stroke-white shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Electronics Store</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{shop.address}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{shop.phone}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Store Profile</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add New Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro Max"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                >
                  <option value="Smartphones">Smartphones</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 134900"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition mt-2"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Store Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Edit Store Profile</h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shop Name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={shopPhone}
                  onChange={(e) => setShopPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Store Address</label>
                <input
                  type="text"
                  required
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
