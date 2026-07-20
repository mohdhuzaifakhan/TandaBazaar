import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Heart, Scale, Moon, Sun, Store, 
  Sparkles, User, ShieldCheck, ChevronDown, Menu, X, Phone, MessageSquare, Rss, ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, switchRole } = useAuth();
  const { 
    cityConfig, wishlist, compareList, setIsCompareOpen, 
    setIsAiModalOpen, searchQuery, setSearchQuery, products, shops
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Autocomplete search filtering
  const filteredProducts = searchQuery.trim() 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  const filteredShops = searchQuery.trim()
    ? shops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.area.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      
      {/* Top Notification Ticker Bar */}
      <div className="bg-[#0F172A] text-white px-4 py-2 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate text-slate-300">
              Live Digital Bazaar for <strong className="text-white font-semibold">{cityConfig.name}</strong> • Direct Shop Contact
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-all text-xs font-medium border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Product Finder</span>
            </button>
            <a 
              href={`https://wa.me/${cityConfig.formattedWhatsapp}?text=Hi%20Admin,%20I%20want%20to%20register%20my%20shop%20on%20Tanda%20Badli%20Marketplace`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center space-x-1.5 transition text-slate-300"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin WhatsApp: +91 8433043426</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & City Badge */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] flex items-center justify-center font-extrabold text-xl shadow-subtle group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#0F172A] dark:text-white tracking-tight leading-none">
                  Tanda<span className="text-blue-600 dark:text-blue-400 font-semibold">Bazaar</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{cityConfig.name}</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Clean Search Input with Autocomplete */}
          <div className="hidden lg:block flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products, categories, or shops in Tanda Badli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-11 pr-28 py-2.5 bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-[#0F172A] hover:bg-black text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition shadow-subtle"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Suggestions Box */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-float z-50 overflow-hidden">
                {filteredProducts.length > 0 && (
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Products</div>
                    {filteredProducts.map(prod => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition"
                      >
                        <img src={prod.images[0]} alt={prod.title} className="w-9 h-9 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{prod.title}</p>
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">₹{prod.price.toLocaleString('en-IN')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredShops.length > 0 && (
                  <div className="p-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Shops</div>
                    {filteredShops.map(shop => (
                      <Link
                        key={shop.id}
                        to={`/shop/${shop.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition"
                      >
                        <img src={shop.logoImage} alt={shop.name} className="w-7 h-7 object-cover rounded-full" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{shop.name}</p>
                          <p className="text-[11px] text-slate-400">{shop.area}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* View Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-1.5 bg-slate-100 dark:bg-[#172033] hover:bg-slate-200 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition border border-slate-200 dark:border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="capitalize hidden sm:inline">{currentUser?.role || 'Customer'} View</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#121824] rounded-2xl shadow-float border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch View Mode</div>
                  <button
                    onClick={() => { switchRole('customer'); setIsRoleDropdownOpen(false); navigate('/'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${currentUser?.role === 'customer' ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Marketplace</span>
                  </button>
                  <button
                    onClick={() => { switchRole('seller'); setIsRoleDropdownOpen(false); navigate('/seller'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${currentUser?.role === 'seller' ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Seller Portal</span>
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setIsRoleDropdownOpen(false); navigate('/admin'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${currentUser?.role === 'admin' ? 'font-bold text-amber-500 bg-amber-50/50' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Admin Control Center</span>
                  </button>
                </div>
              )}
            </div>

            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Compare Products"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Action Button */}
            {currentUser?.role === 'seller' ? (
              <Link
                to="/seller"
                className="hidden sm:flex items-center space-x-1.5 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] hover:bg-slate-800 dark:hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Portal</span>
              </Link>
            ) : currentUser?.role === 'admin' ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            ) : (
              <a
                href={`https://wa.me/${cityConfig.formattedWhatsapp}?text=Hi%20Admin,%20I%20want%20to%20register%20my%20shop%20on%20Tanda%20Badli%20Marketplace`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center space-x-1.5 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] hover:bg-slate-800 dark:hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Become Seller</span>
              </a>
            )}

            {/* Mobile Drawer Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Secondary Clean Navigation Bar */}
      <nav className="hidden lg:block border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#090D16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10 text-xs font-medium">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition">Home</Link>
            <Link to="/search" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">All Products</Link>
            <Link to="/shops" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center space-x-1">
              <Store className="w-3.5 h-3.5 text-blue-500" />
              <span>Shops Directory</span>
            </Link>
            <Link to="/feed" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center space-x-1">
              <Rss className="w-3.5 h-3.5 text-amber-500" />
              <span>Market Feed</span>
            </Link>
            <Link to="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">Seller Pricing (₹1000/mo)</Link>
            <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">About Platform</Link>
          </div>

          <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
            <span>Direct Admin Support:</span>
            <a href="tel:8433043426" className="text-[#0F172A] dark:text-white font-bold hover:underline flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>8433043426</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#090D16] border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search in Tanda Badli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Home</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Catalog</Link>
            <Link to="/shops" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Shops</Link>
            <Link to="/feed" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Market Feed</Link>
            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Seller Pricing</Link>
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">Wishlist ({wishlist.length})</Link>
          </div>
        </div>
      )}

    </header>
  );
}
