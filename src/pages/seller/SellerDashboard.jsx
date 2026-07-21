import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Package, PhoneCall, MessageSquare, TrendingUp, Star, Tag, 
  Store, Settings, CreditCard, ShoppingBag, Users, Calendar, ChevronDown, 
  ExternalLink, Bell, Search, Edit, MoreVertical, Plus, Share2, Award, 
  Headphones, Rocket, CheckCircle2, MapPin, Mail, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SellerDashboard() {
  const { products, shops } = useApp();
  const shop = shops.find(s => s.id === 'shop-cellular-world') || shops[0];

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [dateRange, setDateRange] = useState('May 15 – May 21, 2025');

  // Top Performing Products Data matching mockup
  const topPerformingProducts = [
    { id: 1, title: "iPhone 15 Pro Max (256GB)", views: "1,245", count: 245, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80" },
    { id: 2, title: "Samsung S24 Ultra (256GB)", views: "980", count: 198, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=100&q=80" },
    { id: 3, title: "OnePlus 12 (512GB)", views: "732", count: 156, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=100&q=80" },
    { id: 4, title: "AirPods Pro (2nd Gen)", views: "620", count: 128, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=100&q=80" },
    { id: 5, title: "MacBook Air M2 (256GB)", views: "512", count: 96, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80" }
  ];

  // Recent Products Table Data matching mockup
  const recentProductsList = [
    {
      id: "prod-101",
      title: "iPhone 15 Pro Max (256GB)",
      category: "Smartphones",
      price: 134900,
      stock: "In Stock",
      stockColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      views: "1,245",
      status: "Active",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "prod-102",
      title: "Samsung Galaxy S24 Ultra (256GB)",
      category: "Smartphones",
      price: 124900,
      stock: "In Stock",
      stockColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      views: "980",
      status: "Active",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "prod-103",
      title: "OnePlus 12 (512GB)",
      category: "Smartphones",
      price: 64999,
      stock: "Low Stock",
      stockColor: "bg-amber-50 text-amber-600 border-amber-200",
      views: "732",
      status: "Active",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 hidden lg:flex">
        
        <div className="p-6 space-y-6">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
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
              onClick={() => setActiveMenu('Reviews')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeMenu === 'Reviews' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4" />
                <span>Reviews</span>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full">18</span>
            </button>

            <button
              onClick={() => setActiveMenu('Offers')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Offers' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Tag className="w-4 h-4" />
              <span>Offers & Coupons</span>
            </button>

            <button
              onClick={() => setActiveMenu('Store Profile')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Store Profile' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Store className="w-4 h-4" />
              <span>Store Profile</span>
            </button>

            <button
              onClick={() => setActiveMenu('Store Settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Store Settings' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>

            <button
              onClick={() => setActiveMenu('Subscription')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Subscription' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Subscription</span>
            </button>

            <button
              onClick={() => setActiveMenu('Payments')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Payments' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments</span>
            </button>

            <button
              onClick={() => setActiveMenu('Marketing Tools')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Marketing Tools' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Rocket className="w-4 h-4" />
              <span>Marketing Tools</span>
            </button>

          </nav>
        </div>

        {/* Bottom Promos */}
        <div className="p-4 space-y-3">
          
          {/* You're on Premium Plan Card */}
          <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-4 text-center space-y-2">
            <Award className="w-6 h-6 text-purple-600 mx-auto" />
            <h4 className="text-xs font-bold text-purple-900">You're on Premium Plan</h4>
            <p className="text-[11px] text-purple-700">Your plan is active until <br /><strong>15 Jun 2025</strong></p>
            <button 
              onClick={() => alert('Redirecting to subscription management...')}
              className="w-full py-1.5 bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              Manage Plan
            </button>
          </div>

          {/* Need Help */}
          <div className="p-3 bg-white border border-slate-200/80 rounded-2xl flex items-center space-x-3 text-xs">
            <Headphones className="w-4 h-4 text-slate-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Need Help?</p>
              <a href="#support" onClick={(e) => { e.preventDefault(); alert('Opening support desk...'); }} className="text-[11px] text-slate-500 hover:underline">
                Contact Support
              </a>
            </div>
          </div>

        </div>

      </aside>

      {/* 2. Main Center Body + Right Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
            <button className="text-slate-500 hover:text-slate-700 lg:hidden">
              <span className="text-xl">☰</span>
            </button>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-semibold text-slate-400 border border-slate-200 rounded px-1.5 py-0.2">
                ⌘ K
              </span>
            </div>
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-3">
            <Link
              to={`/shop/${shop.id}`}
              className="py-2 px-3 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition">
              <MessageSquare className="w-4 h-4" />
            </button>

            <button className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                8
              </span>
            </button>

            <img
              src={shop.logoImage}
              alt={shop.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
          </div>

        </header>

        {/* Main Body Grid: Center Content (8 cols) + Right Column (4 cols) */}
        <main className="p-6 sm:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Center Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Welcome Header & Date Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back, Amit! 👋</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Here's what's happening with your store today.</p>
                </div>

                <div className="flex items-center space-x-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shrink-0 shadow-2xs">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{dateRange}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* 4 Stat Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Views */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Total Views</span>
                    <h3 className="text-xl font-black text-slate-900">12,450</h3>
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                      <span>↑ 18.6%</span>
                      <span className="text-slate-400 font-normal">vs last 7 days</span>
                    </p>
                  </div>
                </div>

                {/* Product Views */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Product Views</span>
                    <h3 className="text-xl font-black text-slate-900">8,230</h3>
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                      <span>↑ 16.2%</span>
                      <span className="text-slate-400 font-normal">vs last 7 days</span>
                    </p>
                  </div>
                </div>

                {/* Contact Clicks */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Contact Clicks</span>
                    <h3 className="text-xl font-black text-slate-900">1,245</h3>
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                      <span>↑ 22.5%</span>
                      <span className="text-slate-400 font-normal">vs last 7 days</span>
                    </p>
                  </div>
                </div>

                {/* WhatsApp Clicks */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 fill-emerald-600 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">WhatsApp Clicks</span>
                    <h3 className="text-xl font-black text-slate-900">914</h3>
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                      <span>↑ 24.8%</span>
                      <span className="text-slate-400 font-normal">vs last 7 days</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Store Performance Chart & Top Performing Products Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Store Performance Chart Card */}
                <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Store Performance</h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-700 outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>

                  {/* Line Chart Graphic */}
                  <div className="h-48 w-full relative flex items-end pt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                      <defs>
                        <linearGradient id="storeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 0 80 Q 50 30 100 60 T 200 20 T 300 40 T 400 10 L 400 120 L 0 120 Z"
                        fill="url(#storeGradient)"
                      />

                      <path
                        d="M 0 80 Q 50 30 100 60 T 200 20 T 300 40 T 400 10"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <circle cx="0" cy="80" r="3.5" fill="#2563eb" />
                      <circle cx="100" cy="60" r="3.5" fill="#2563eb" />
                      <circle cx="200" cy="20" r="3.5" fill="#2563eb" />
                      <circle cx="300" cy="40" r="3.5" fill="#2563eb" />
                      <circle cx="400" cy="10" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] font-bold text-slate-400 pt-1 border-t border-slate-100">
                      <span>May 15</span>
                      <span>May 16</span>
                      <span>May 17</span>
                      <span>May 18</span>
                      <span>May 19</span>
                      <span>May 20</span>
                      <span>May 21</span>
                    </div>
                  </div>

                </div>

                {/* Top Performing Products Card */}
                <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Top Performing Products</h3>
                    <button className="text-[11px] font-bold text-blue-600 hover:underline">View all</button>
                  </div>

                  <div className="space-y-2.5">
                    {topPerformingProducts.map(prod => (
                      <div key={prod.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img src={prod.image} alt={prod.title} className="w-8 h-8 rounded-lg object-cover border shrink-0" />
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 truncate max-w-[130px]">{prod.title}</h4>
                            <p className="text-[10px] text-slate-400">Views: {prod.views}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 text-xs shrink-0">{prod.count}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Recent Products Table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Recent Products</h3>
                  <button className="text-[11px] font-bold text-blue-600 hover:underline">View all products</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Views</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 font-medium">
                      {recentProductsList.map(prod => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <img src={prod.image} alt={prod.title} className="w-9 h-9 rounded-xl object-cover border shrink-0" />
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
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${prod.stockColor}`}>
                              {prod.stock}
                            </span>
                          </td>

                          <td className="p-3 text-slate-600">
                            {prod.views}
                          </td>

                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                              {prod.status}
                            </span>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end space-x-1 text-slate-400">
                              <button className="p-1 hover:text-blue-600 rounded">
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1 hover:text-slate-800 rounded">
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-center">
                  <button 
                    onClick={() => alert('Opening Add New Product form...')}
                    className="py-2 px-4 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-2xs"
                  >
                    <Plus className="w-4 h-4 text-blue-600" />
                    <span>Add New Product</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column (4 cols) - Store Summary & Widgets */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Store Summary Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="h-32 w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={shop.coverImage || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"}
                    alt={shop.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
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
                      <span>{shop.address || "Indore, Madhya Pradesh"}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{shop.phone || "+91 98260 12345"}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>contact@cellularworld.in</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Mon - Sun (10:00 AM - 9:00 PM)</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert('Opening Edit Store Profile...')}
                    className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-2xs"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Store Profile</span>
                  </button>
                </div>
              </div>

              {/* Subscription Widget */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Subscription</h4>
                    <p className="text-[11px] text-purple-700 font-semibold">Premium Plan</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Valid until 15 Jun 2025</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Opening plan manager...')}
                  className="py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-bold shadow-xs transition"
                >
                  Manage Plan
                </button>
              </div>

              {/* Quick Actions Grid (4 buttons) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900">Quick Actions</h4>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <button onClick={() => alert('Add Product')} className="p-3 bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 rounded-2xl space-y-1.5 transition">
                    <Plus className="w-5 h-5 text-blue-600 mx-auto" />
                    <span className="block font-bold text-slate-700 text-[11px]">Add Product</span>
                  </button>

                  <button onClick={() => alert('Create Offer')} className="p-3 bg-slate-50 border border-slate-200/80 hover:bg-amber-50 hover:border-amber-200 rounded-2xl space-y-1.5 transition">
                    <Tag className="w-5 h-5 text-amber-500 mx-auto" />
                    <span className="block font-bold text-slate-700 text-[11px]">Create Offer</span>
                  </button>

                  <button onClick={() => alert('Share Store Link')} className="p-3 bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-200 rounded-2xl space-y-1.5 transition">
                    <Share2 className="w-5 h-5 text-purple-600 mx-auto" />
                    <span className="block font-bold text-slate-700 text-[11px]">Share Store</span>
                  </button>

                  <button onClick={() => alert('View Leads')} className="p-3 bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-200 rounded-2xl space-y-1.5 transition">
                    <Users className="w-5 h-5 text-emerald-600 mx-auto" />
                    <span className="block font-bold text-slate-700 text-[11px]">View Leads</span>
                  </button>
                </div>
              </div>

              {/* Grow Your Business Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 relative overflow-hidden shadow-2xs space-y-3">
                <div className="space-y-1 max-w-[200px] relative z-10">
                  <h4 className="text-sm font-black text-slate-900">Grow Your Business</h4>
                  <p className="text-[11px] text-slate-600">Promote your products to get more visibility and leads.</p>
                </div>

                <button 
                  onClick={() => alert('Explore Marketing Tools')}
                  className="py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition relative z-10 shadow-2xs"
                >
                  Explore Marketing Tools
                </button>

                {/* Rocket Graphic */}
                <div className="absolute right-2 bottom-2 w-24 h-24 opacity-90 pointer-events-none">
                  <Rocket className="w-20 h-20 text-blue-500 fill-blue-100" />
                </div>
              </div>

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}
