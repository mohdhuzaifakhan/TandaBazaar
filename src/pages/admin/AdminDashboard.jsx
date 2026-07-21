import React, { useState } from 'react';
import { 
  Search, Sun, Bell, Download, Plus, MapPin, ChevronDown, 
  MoreVertical, CheckCircle2, Clock, XCircle, LayoutDashboard, Users, 
  Store, Package, Grid, ShoppingBag, Star, Tag, CreditCard, 
  FileText, BarChart2, Settings, HelpCircle, ChevronRight, Check, Filter, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { shops, toggleShopVerification, toggleShopPremium } = useApp();

  // Sidebar & Navigation State
  const [activeMenu, setActiveMenu] = useState('Shops');
  const [activeShopSubmenu, setActiveShopSubmenu] = useState('All Shops');
  const [activeTab, setActiveTab] = useState('All Shops'); // 'All Shops' | 'Approved' | 'Pending' | 'Rejected'
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  
  // Selection State
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);

  // Modals
  const [isAddShopModalOpen, setIsAddShopModalOpen] = useState(false);
  const [newShopData, setNewShopData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    category: 'Electronics',
    city: 'Indore, MP',
    plan: 'Premium'
  });

  // Sample Datastores matching mockup
  const [shopManagementList, setShopManagementList] = useState([
    {
      id: "shop-101",
      name: "Cellular World Indore",
      isVerified: true,
      email: "contact@cellularworld.in",
      ownerName: "Amit Verma",
      phone: "+91 98260 12345",
      category: "Electronics",
      city: "Indore, MP",
      status: "Approved",
      plan: "Premium",
      joinedOn: "Jan 15, 2025",
      logo: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-102",
      name: "Fashion Hub",
      isVerified: true,
      email: "hello@fashionhub.com",
      ownerName: "Neha Sharma",
      phone: "+91 97531 24680",
      category: "Fashion",
      city: "Bhopal, MP",
      status: "Approved",
      plan: "Premium",
      joinedOn: "Jan 18, 2025",
      logo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-103",
      name: "Tech Corner",
      isVerified: true,
      email: "support@techcorner.in",
      ownerName: "Rahul Mehta",
      phone: "+91 90011 22334",
      category: "Electronics",
      city: "Indore, MP",
      status: "Pending",
      plan: "Basic",
      joinedOn: "May 20, 2025",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-104",
      name: "Home Needs",
      isVerified: true,
      email: "info@homeneeds.com",
      ownerName: "Sanjay Patel",
      phone: "+91 98271 33445",
      category: "Home & Living",
      city: "Ujjain, MP",
      status: "Approved",
      plan: "Premium",
      joinedOn: "May 18, 2025",
      logo: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-105",
      name: "Book Haven",
      isVerified: false,
      email: "books@bookhaven.in",
      ownerName: "Priya Singh",
      phone: "+91 91111 22334",
      category: "Books",
      city: "Gwalior, MP",
      status: "Rejected",
      plan: "Basic",
      joinedOn: "May 10, 2025",
      logo: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-106",
      name: "Sports Zone",
      isVerified: true,
      email: "contact@sportszone.in",
      ownerName: "Vikram Rao",
      phone: "+91 93021 99887",
      category: "Sports",
      city: "Jabalpur, MP",
      status: "Approved",
      plan: "Premium",
      joinedOn: "May 8, 2025",
      logo: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "shop-107",
      name: "Jewels & Co.",
      isVerified: true,
      email: "care@jewelsco.com",
      ownerName: "Kavita Jain",
      phone: "+91 98930 11223",
      category: "Jewellery",
      city: "Indore, MP",
      status: "Pending",
      plan: "Premium",
      joinedOn: "May 12, 2025",
      logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=100&q=80"
    }
  ]);

  // Statistics Metrics
  const totalShopsCount = 1248;
  const pendingCount = shopManagementList.filter(s => s.status === 'Pending').length + 16;
  const approvedCount = 1180;
  const rejectedCount = 50;

  // Row Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(shopManagementList.map(s => s.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Status Change Handlers
  const updateStatus = (id, newStatus) => {
    setShopManagementList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    setActiveActionMenuId(null);
  };

  // Filter List Logic
  const filteredShops = shopManagementList.filter(shop => {
    // Tab Filter
    if (activeTab === 'Approved' && shop.status !== 'Approved') return false;
    if (activeTab === 'Pending' && shop.status !== 'Pending') return false;
    if (activeTab === 'Rejected' && shop.status !== 'Rejected') return false;

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = shop.name.toLowerCase().includes(q);
      const matchOwner = shop.ownerName.toLowerCase().includes(q);
      const matchCategory = shop.category.toLowerCase().includes(q);
      const matchCity = shop.city.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchCategory && !matchCity) return false;
    }

    // Dropdown Filters
    if (selectedCategory !== 'All Categories' && shop.category !== selectedCategory) return false;
    if (selectedCity !== 'All Cities' && shop.city !== selectedCity) return false;

    return true;
  });

  // Handle Add Shop Submission
  const handleAddShopSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `shop-${Date.now()}`,
      name: newShopData.name,
      isVerified: true,
      email: newShopData.email || `${newShopData.name.toLowerCase().replace(/\s+/g, '')}@shop.com`,
      ownerName: newShopData.ownerName,
      phone: newShopData.phone || "+91 98000 00000",
      category: newShopData.category,
      city: newShopData.city,
      status: "Approved",
      plan: newShopData.plan,
      joinedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80"
    };

    setShopManagementList(prev => [newEntry, ...prev]);
    setIsAddShopModalOpen(false);
    setNewShopData({ name: '', ownerName: '', email: '', phone: '', category: 'Electronics', city: 'Indore, MP', plan: 'Premium' });
  };

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

          {/* MAIN MENU */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Main Menu</div>
            
            <nav className="space-y-1 text-xs font-semibold">
              
              <button 
                onClick={() => setActiveMenu('Dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Dashboard' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => setActiveMenu('Users')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition ${activeMenu === 'Users' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Users className="w-4 h-4" />
                <span>Users</span>
              </button>

              {/* Shops (Active Expandable) */}
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveMenu('Shops')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeMenu === 'Shops' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Store className="w-4 h-4 text-blue-600" />
                    <span>Shops</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Submenu */}
                <div className="pl-9 space-y-1 pt-1 text-[11px] font-medium text-slate-600">
                  <button 
                    onClick={() => setActiveShopSubmenu('All Shops')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition ${activeShopSubmenu === 'All Shops' ? 'text-blue-600 font-bold bg-blue-50/60' : 'hover:text-slate-900'}`}
                  >
                    All Shops
                  </button>
                  <button 
                    onClick={() => { setActiveShopSubmenu('Pending Approval'); setActiveTab('Pending'); }}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition ${activeShopSubmenu === 'Pending Approval' ? 'text-blue-600 font-bold bg-blue-50/60' : 'hover:text-slate-900'}`}
                  >
                    <span>Pending Approval</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">18</span>
                  </button>
                  <button 
                    onClick={() => setActiveShopSubmenu('Top Shops')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition ${activeShopSubmenu === 'Top Shops' ? 'text-blue-600 font-bold bg-blue-50/60' : 'hover:text-slate-900'}`}
                  >
                    Top Shops
                  </button>
                  <button 
                    onClick={() => setActiveShopSubmenu('Shop Categories')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition ${activeShopSubmenu === 'Shop Categories' ? 'text-blue-600 font-bold bg-blue-50/60' : 'hover:text-slate-900'}`}
                  >
                    Shop Categories
                  </button>
                </div>
              </div>

              <button onClick={() => setActiveMenu('Products')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </button>

              <button onClick={() => setActiveMenu('Categories')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <Grid className="w-4 h-4" />
                <span>Categories</span>
              </button>

              <button onClick={() => setActiveMenu('Orders')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders (Inquiries)</span>
              </button>

              <button onClick={() => setActiveMenu('Reviews')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <Star className="w-4 h-4" />
                <span>Reviews</span>
              </button>

              <button onClick={() => setActiveMenu('Offers')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <Tag className="w-4 h-4" />
                <span>Offers & Ads</span>
              </button>

              <button onClick={() => setActiveMenu('Subscriptions')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <CreditCard className="w-4 h-4" />
                <span>Subscriptions</span>
              </button>

              <button onClick={() => setActiveMenu('Payments')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <FileText className="w-4 h-4" />
                <span>Payments</span>
              </button>

              <button onClick={() => setActiveMenu('Reports')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>

              <button onClick={() => setActiveMenu('Analytics')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <BarChart2 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

            </nav>
          </div>

          {/* SYSTEM */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System</div>
            
            <nav className="space-y-1 text-xs font-semibold">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">12</span>
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4" />
                  <span>Support Tickets</span>
                </div>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">6</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

        </div>

        {/* Bottom User Profile */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Admin User"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Admin User</h4>
                <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

      </aside>

      {/* 2. Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
            <button className="text-slate-500 hover:text-slate-700 lg:hidden">
              <span className="text-xl">☰</span>
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search shops, products, users..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition">
              <Sun className="w-4 h-4" />
            </button>

            <button className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                12
              </span>
            </button>

            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Admin User"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </div>
          </div>

        </header>

        {/* Main Body */}
        <main className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Page Title & Top Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Shop Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage all shops, approve new shops and view performance.</p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button 
                onClick={() => alert('Exporting shops database to CSV...')}
                className="py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-2xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export</span>
              </button>

              <button 
                onClick={() => setIsAddShopModalOpen(true)}
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Shop</span>
              </button>
            </div>
          </div>

          {/* 4 Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Total Shops */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500">Total Shops</span>
                <h3 className="text-2xl font-black text-slate-900">{totalShopsCount.toLocaleString()}</h3>
                <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                  <span>↑ 12.5%</span>
                  <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Store className="w-6 h-6" />
              </div>
            </div>

            {/* Pending Approval */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500">Pending Approval</span>
                <h3 className="text-2xl font-black text-slate-900">{pendingCount}</h3>
                <p className="text-[11px] text-slate-400 font-medium">vs last month</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Approved Shops */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500">Approved Shops</span>
                <h3 className="text-2xl font-black text-slate-900">{approvedCount.toLocaleString()}</h3>
                <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                  <span>↑ 8.2%</span>
                  <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Rejected Shops */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500">Rejected Shops</span>
                <h3 className="text-2xl font-black text-slate-900">{rejectedCount}</h3>
                <p className="text-[11px] text-red-600 font-bold flex items-center space-x-1">
                  <span>↓ 3.1%</span>
                  <span className="text-slate-400 font-normal">vs last month</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Shop Management Data Table Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
            
            {/* Tabs Row */}
            <div className="px-6 border-b border-slate-100 flex items-center space-x-8 text-xs font-bold">
              {['All Shops', 'Approved', 'Pending', 'Rejected'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 border-b-2 transition ${activeTab === tab ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter Toolbar */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Category & City Dropdowns */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-600"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                  <option value="Jewellery">Jewellery</option>
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-600"
                >
                  <option value="All Cities">All Cities</option>
                  <option value="Indore, MP">Indore, MP</option>
                  <option value="Bhopal, MP">Bhopal, MP</option>
                  <option value="Ujjain, MP">Ujjain, MP</option>
                  <option value="Gwalior, MP">Gwalior, MP</option>
                  <option value="Jabalpur, MP">Jabalpur, MP</option>
                </select>

                <button 
                  onClick={() => { setSelectedCategory('All Categories'); setSelectedCity('All Cities'); setSearchQuery(''); }}
                  className="py-2 px-3 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filter</span>
                </button>

              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-4 w-10">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll} 
                        checked={selectedRowIds.length === shopManagementList.length && shopManagementList.length > 0} 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                      />
                    </th>
                    <th className="p-4">Shop Details</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Plan</th>
                    <th className="p-4">Joined On</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredShops.map((shop) => (
                    <tr key={shop.id} className="hover:bg-slate-50/60 transition">
                      
                      {/* Checkbox */}
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedRowIds.includes(shop.id)}
                          onChange={() => handleSelectRow(shop.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>

                      {/* Shop Details */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={shop.logo}
                            alt={shop.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 flex items-center space-x-1">
                              <span>{shop.name}</span>
                              {shop.isVerified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600 stroke-white" />
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">{shop.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-slate-800">{shop.ownerName}</p>
                          <p className="text-[11px] text-slate-400">{shop.phone}</p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                          {shop.category}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="p-4">
                        <div className="flex items-center space-x-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{shop.city}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        {shop.status === 'Approved' && (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold">
                            Approved
                          </span>
                        )}
                        {shop.status === 'Pending' && (
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-bold">
                            Pending
                          </span>
                        )}
                        {shop.status === 'Rejected' && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[11px] font-bold">
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Plan Badge */}
                      <td className="p-4">
                        {shop.plan === 'Premium' ? (
                          <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-[11px] font-bold">
                            Premium
                          </span>
                        ) : (
                          <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                            Basic
                          </span>
                        )}
                      </td>

                      {/* Joined On */}
                      <td className="p-4 text-slate-500">
                        {shop.joinedOn}
                      </td>

                      {/* Actions Menu */}
                      <td className="p-4 text-right relative">
                        <button
                          onClick={() => setActiveActionMenuId(activeActionMenuId === shop.id ? null : shop.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Action Context Menu */}
                        {activeActionMenuId === shop.id && (
                          <div className="absolute right-4 top-full mt-1 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-left space-y-1">
                            {shop.status !== 'Approved' && (
                              <button
                                onClick={() => updateStatus(shop.id, 'Approved')}
                                className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 font-bold flex items-center space-x-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve Shop</span>
                              </button>
                            )}
                            {shop.status !== 'Rejected' && (
                              <button
                                onClick={() => updateStatus(shop.id, 'Rejected')}
                                className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-bold flex items-center space-x-2"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject Shop</span>
                              </button>
                            )}
                            <button
                              onClick={() => alert(`Editing details for ${shop.name}`)}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Edit Details
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
              
              <div>
                Showing 1 to {filteredShops.length} of {totalShopsCount.toLocaleString()} shops
              </div>

              {/* Page Selector Buttons */}
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  3
                </button>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  4
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  125
                </button>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center">
                  &gt;
                </button>
              </div>

              {/* Rows Per Page */}
              <div className="flex items-center space-x-2">
                <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 outline-none">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* Add Shop Modal */}
      {isAddShopModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative">
            <button
              onClick={() => setIsAddShopModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-black text-slate-900">Add New Shop</h3>
              <p className="text-xs text-slate-500">Register a new store on ShopLocal platform.</p>
            </div>

            <form onSubmit={handleAddShopSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Electronics"
                  value={newShopData.name}
                  onChange={(e) => setNewShopData({ ...newShopData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={newShopData.ownerName}
                  onChange={(e) => setNewShopData({ ...newShopData, ownerName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Owner Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98260 00000"
                  value={newShopData.phone}
                  onChange={(e) => setNewShopData({ ...newShopData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newShopData.category}
                    onChange={(e) => setNewShopData({ ...newShopData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  >
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Living</option>
                    <option>Books</option>
                    <option>Sports</option>
                    <option>Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <select
                    value={newShopData.city}
                    onChange={(e) => setNewShopData({ ...newShopData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  >
                    <option>Indore, MP</option>
                    <option>Bhopal, MP</option>
                    <option>Ujjain, MP</option>
                    <option>Gwalior, MP</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition mt-2"
              >
                Create & Approve Shop
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
