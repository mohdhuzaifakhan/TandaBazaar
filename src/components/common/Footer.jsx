import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, RefreshCw, Headphones, Lock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-sans">
      
      {/* 1. Feature Guarantees Strip */}
      <div className="border-b border-slate-200/80 py-5 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-bold text-slate-800">
          <div className="flex items-center justify-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Trusted by 10,000+ Customers</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Lock className="w-5 h-5 text-blue-600 shrink-0" />
            <span>100% Secure Payments</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Easy Returns</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Headphones className="w-5 h-5 text-blue-600 shrink-0" />
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* 2. Main Multi-column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80">
          
          {/* Brand & Social Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <MapPin className="w-4 h-4 fill-white text-blue-600" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                Shop<span className="text-blue-600">Local</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Local shops, trusted by thousands. Connecting nearby buyers directly with authorized shop owners for genuine products and best prices.
            </p>

            <div className="flex items-center space-x-3 text-slate-400 pt-1">
              <a href="#facebook" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-pink-600 hover:text-white rounded-full transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-blue-400 hover:text-white rounded-full transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" onClick={(e) => e.preventDefault()} className="p-2 bg-slate-100 hover:bg-red-600 hover:text-white rounded-full transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/search?category=electronics" className="hover:text-blue-600 transition">Electronics</Link></li>
              <li><Link to="/search?category=fashion" className="hover:text-blue-600 transition">Fashion</Link></li>
              <li><Link to="/search?category=home-decor" className="hover:text-blue-600 transition">Home & Kitchen</Link></li>
              <li><Link to="/search?category=beauty" className="hover:text-blue-600 transition">Beauty & Health</Link></li>
              <li><Link to="/search" className="hover:text-blue-600 transition">More Categories</Link></li>
            </ul>
          </div>

          {/* For Customers (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">For Customers</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/about" className="hover:text-blue-600 transition">How it Works</Link></li>
              <li><Link to="/wishlist" className="hover:text-blue-600 transition">Track Order</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition">Help Center</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition">Returns</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* For Sellers (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">For Sellers</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/seller" className="hover:text-blue-600 transition">Sell on ShopLocal</Link></li>
              <li><Link to="/seller" className="hover:text-blue-600 transition">Seller Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-600 transition">Resources</Link></li>
              <li><Link to="/seller" className="hover:text-blue-600 transition">Support</Link></li>
            </ul>
          </div>

          {/* Subscribe Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Subscribe to our newsletter</h4>
            <p className="text-xs text-slate-500">Get the latest offers and updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ShopLocal newsletter!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
              />
              <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div>
            © 2024 <strong className="text-slate-800">ShopLocal</strong>. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition">Terms & Conditions</a>
            <a href="#refund" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
