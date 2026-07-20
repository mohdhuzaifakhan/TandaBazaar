import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, MessageSquare, ShieldCheck, Star, Clock, 
  Store, Tag, ArrowRight, CheckCircle2, UserCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/product/ProductCard';

export default function ShopProfile() {
  const { id } = useParams();
  const { shops, products, offers, reviews, logLeadAction } = useApp();

  const shop = shops.find(s => s.id === id) || shops[0];
  const shopProducts = products.filter(p => p.shopId === shop.id);
  const shopOffers = offers.filter(o => o.shopId === shop.id);
  const shopReviews = reviews.filter(r => r.shopId === shop.id);

  const [activeTab, setActiveTab] = useState('products');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Cover Banner Header */}
      <div className="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
        <img src={shop.coverImage} alt={shop.name} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      {/* Shop Profile Header Info Overlapping Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={shop.logoImage}
                alt={shop.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-heading font-extrabold text-xl sm:text-3xl text-slate-900 dark:text-white">
                    {shop.name}
                  </h1>
                  {shop.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-indigo-500 fill-indigo-100" title="Verified Seller" />
                  )}
                  {shop.isPremium && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      PREMIUM
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center space-x-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{shop.address}</span>
                </p>

                <div className="flex items-center space-x-3 mt-2 text-xs font-semibold">
                  <span className="flex items-center space-x-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{shop.rating} ({shop.reviewCount} reviews)</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{shop.openingHours}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact & Follow Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition border flex items-center space-x-1.5 ${
                  isFollowing
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white border-slate-200 dark:border-slate-600'
                    : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{isFollowing ? 'Following' : 'Follow Shop'}</span>
              </button>

              <button
                onClick={() => logLeadAction(shop.id, null, 'whatsapp')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition shadow-md shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => logLeadAction(shop.id, null, 'call')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition shadow-md shadow-indigo-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
            </div>
          </div>

          {/* Shop Bio & Details */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {shop.about}
          </div>

        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 border-b-2 transition ${activeTab === 'products' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Products ({shopProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 border-b-2 transition ${activeTab === 'offers' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Active Offers ({shopOffers.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 border-b-2 transition ${activeTab === 'about' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            About & Map Pin
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shopProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shopOffers.length === 0 ? (
                <p className="text-xs text-slate-500 py-6">No active promo offers currently for this store.</p>
              ) : (
                shopOffers.map(offer => (
                  <div key={offer.id} className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl space-y-3">
                    <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-xl">{offer.discountText}</span>
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-2">{offer.title}</h3>
                    <p className="text-xs text-slate-500">{offer.terms}</p>
                    <div className="pt-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Use Coupon Code: {offer.code}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">Store Details</h3>
                <p className="text-xs text-slate-500">Owner: {shop.ownerName}</p>
                <p className="text-xs text-slate-500">Established: Year {shop.establishedYear}</p>
                <p className="text-xs text-slate-500 mt-2">Address: {shop.address}</p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-3">Google Maps Directions</h3>
                <div className="w-full h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-10 h-10 text-rose-500 mb-2 animate-bounce" />
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{shop.name}</p>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">{shop.address}</p>
                  <button
                    onClick={() => logLeadAction(shop.id, null, 'visit')}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Open Google Maps Navigation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
