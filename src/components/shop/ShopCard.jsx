import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Phone, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ShopCard({ shop }) {
  const { logLeadAction } = useApp();

  return (
    <div className="bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 ease-out flex flex-col justify-between group">
      
      {/* Cover Header */}
      <div className="relative h-28 bg-slate-100 dark:bg-slate-900 overflow-hidden">
        <img src={shop.coverImage} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        
        {/* Premium Badge */}
        {shop.isPremium && (
          <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
            ⭐ Premium Retailer
          </div>
        )}
      </div>

      {/* Details Stage */}
      <div className="p-5 pt-0 relative flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Store Logo overlapping header */}
          <div className="flex items-end justify-between -mt-7 mb-3">
            <img
              src={shop.logoImage}
              alt={shop.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 bg-white"
            />
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200/80 dark:border-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{shop.rating} ({shop.reviewCount})</span>
            </div>
          </div>

          {/* Title & Verification */}
          <Link to={`/shop/${shop.id}`} className="block">
            <h3 className="font-heading font-bold text-base text-slate-950 dark:text-white flex items-center space-x-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="truncate">{shop.name}</span>
              {shop.isVerified && <ShieldCheck className="w-4 h-4 text-slate-950 dark:text-slate-100 shrink-0" />}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
            <span className="truncate">{shop.address}</span>
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {shop.about}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => logLeadAction(shop.id, null, 'whatsapp')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          
          <button
            onClick={() => logLeadAction(shop.id, null, 'call')}
            className="bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 p-2.5 rounded-xl transition-colors"
            title="Call Shop"
          >
            <Phone className="w-4 h-4" />
          </button>

          <Link
            to={`/shop/${shop.id}`}
            className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-2.5 rounded-xl hover:bg-slate-200 transition-colors"
            title="View Store"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
