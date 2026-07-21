import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Heart, ShoppingBag, User, Bell, Search, 
  ChevronDown, Store, Sparkles, Menu, X, ShieldCheck, Tag, Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { 
    products, shops, wishlist, inquiryCart, setIsInquiryCartOpen, 
    searchQuery, setSearchQuery, selectedLocation, setSelectedLocation,
    openAuthModal, setIsAiModalOpen 
  } = useApp();
  
  const { currentUser, switchRole } = useAuth();
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const navigate = useNavigate();

  const locations = [
    "Indore, MP",
    "Tanda Badli, Rampur",
    "Bhopal, MP",
    "Delhi NCR",
    "Mumbai, MH"
  ];

  const filteredProducts = searchQuery.trim() 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  const filteredShops = searchQuery.trim()
    ? shops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.city.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const totalCartCount = inquiryCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 transition-colors">
      
      {/* Top Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-blue-600" />
            </div>
            <span className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Shop<span className="text-blue-600">Local</span>
            </span>
          </Link>

          {/* Mobile Quick Location Pill */}
          <div className="md:hidden relative">
            <button
              type="button"
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
              className="flex items-center space-x-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200"
            >
              <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
              <span className="truncate max-w-[80px]">{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLocationMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-2xl py-2 z-50 shadow-xl">
                <div className="px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Location</div>
                {locations.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocationMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition ${selectedLocation === loc ? 'font-bold text-blue-600 bg-blue-50/60' : 'text-slate-700'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar with Embedded Location Picker */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white border border-slate-200 rounded-full p-1 transition-all">
              
              {/* Search Icon & Input */}
              <div className="flex items-center flex-1 pl-4">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search for products, shops and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Location Picker Pill */}
              <div className="relative border-l border-slate-300 px-3">
                <button
                  type="button"
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 py-1 transition"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[100px]">{selectedLocation}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isLocationMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl py-2 z-50">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Location</div>
                    {locations.map(loc => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          setIsLocationMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition ${selectedLocation === loc ? 'font-bold text-blue-600 bg-blue-50/60' : 'text-slate-700'}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-bold transition shrink-0"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Suggestions Box */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl z-50 overflow-hidden">
                {filteredProducts.length > 0 && (
                  <div className="p-2 border-b border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Products</div>
                    {filteredProducts.map(prod => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition"
                      >
                        <img src={prod.images[0]} alt={prod.title} className="w-9 h-9 object-cover rounded-lg border" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 truncate">{prod.title}</p>
                          <p className="text-[11px] text-blue-600 font-bold">₹{prod.price.toLocaleString('en-IN')}</p>
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
                        className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition"
                      >
                        <img src={shop.logoImage} alt={shop.name} className="w-7 h-7 object-cover rounded-full border" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">{shop.name}</p>
                          <p className="text-[11px] text-slate-400">{shop.city}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Seller Button */}
          <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
            
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Inquiry Cart */}
            <button
              onClick={() => setIsInquiryCartOpen(true)}
              className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
              title="Inquiry Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Modal */}
            <button
              onClick={() => openAuthModal('login')}
              className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => alert('Notifications clicked')}
              className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Become a Seller Button */}
            <Link
              to="/seller"
              className="hidden sm:flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become a Seller</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Inline Search Bar */}
        <div className="md:hidden px-4 pb-2.5 pt-0.5">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products, shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/90 rounded-full text-xs outline-none border border-slate-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* Sub Navigation Bar (Hidden on mobile as MobileBottomNav handles page navigation) */}
      <nav className="hidden md:block border-t border-slate-100 bg-slate-50/90 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-11">
          
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none py-1">
            <Link 
              to="/search?category=mobile-phones" 
              className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition shrink-0 font-semibold"
            >
              <Menu className="w-3.5 h-3.5 text-blue-600" />
              <span>Categories</span>
            </Link>

            <Link to="/shops" className="text-slate-600 hover:text-blue-600 transition shrink-0">
              Shops
            </Link>

            <Link to="/search?filter=offers" className="text-slate-600 hover:text-blue-600 transition flex items-center space-x-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Offers</span>
            </Link>

            <Link to="/shops?premium=true" className="text-slate-600 hover:text-blue-600 transition flex items-center space-x-1 shrink-0">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Premium Stores</span>
            </Link>
          </div>

          {/* Quick Role Switcher Pill */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0 relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center space-x-1 bg-white border border-slate-200 hover:border-blue-500 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="capitalize">{currentUser?.role || 'Customer'} View</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Portal View</div>
                <button
                  onClick={() => { switchRole('customer'); setIsRoleMenuOpen(false); navigate('/'); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 font-medium text-slate-700"
                >
                  Customer Marketplace
                </button>
                <button
                  onClick={() => { switchRole('seller'); setIsRoleMenuOpen(false); navigate('/seller'); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 font-medium text-blue-600"
                >
                  Seller Dashboard
                </button>
                <button
                  onClick={() => { switchRole('admin'); setIsRoleMenuOpen(false); navigate('/admin'); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 font-medium text-amber-600"
                >
                  Admin Control
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products, shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-full text-xs outline-none border border-slate-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-xl">Home</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-xl">All Products</Link>
            <Link to="/shops" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-xl">Shops Directory</Link>
            <Link to="/seller" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">Seller Dashboard</Link>
          </div>
        </div>
      )}

    </header>
  );
}
