import React from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Phone, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { cityConfig, categoriesList } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & City Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-950 flex items-center justify-center font-extrabold">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Tanda<span className="text-slate-500 font-semibold">Bazaar</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Official digital lead marketplace for local retailers in <strong>{cityConfig.name}</strong>. Empowering small local shopkeepers to connect directly with nearby buyers via Call, WhatsApp, and Store Visits.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>Primary City: {cityConfig.name}, Pin Code {cityConfig.pincode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>Admin Helpline: +91 8433043426</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Admin WhatsApp: +91 8433043426</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Explore Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition">Marketplace Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Product Catalog</Link></li>
              <li><Link to="/shops" className="hover:text-white transition">Local Shops Directory</Link></li>
              <li><Link to="/feed" className="hover:text-white transition">Market Social Feed</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Seller Pricing (₹1000/mo)</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Popular Categories</h4>
            <ul className="space-y-2 text-xs">
              {categoriesList.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <Link to={`/search?category=${cat.id}`} className="hover:text-white transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seller Monetization */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">For Business Owners</h4>
            <p className="text-xs text-slate-400">
              Grow your local sales in Tanda Badli for <strong>₹1,000/month</strong> with homepage featured listings.
            </p>
            <a
              href={`https://wa.me/${cityConfig.formattedWhatsapp}?text=Hi%20Admin,%20I%20want%20to%20upgrade%20my%20shop%20to%20₹1000/month%20Premium%20Membership`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Admin WhatsApp</span>
            </a>
            <div className="pt-2 text-xs space-y-1">
              <Link to="/seller" className="text-slate-300 hover:text-white block">Seller Portal Login →</Link>
              <Link to="/admin" className="text-amber-400 hover:underline block">Admin Panel Login →</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Tanda Badli Digital Marketplace. Built for local shops in Rampur district.
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Powered by</span>
            <span className="font-bold text-white">Tanda Badli Administration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
