import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, MessageSquare, Star, CheckCircle, Clock, 
  Share2, Heart, ShieldCheck, Award, Calendar, Tag, ChevronRight, UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ShopProfile() {
  const { id } = useParams();
  const { shops, products, reviews, wishlist, toggleWishlist, addToInquiryCart, logLeadAction } = useApp();

  const shop = shops.find(s => s.id === id) || shops.find(s => s.id === 'shop-cellular-world') || shops[0];
  const shopProducts = products.filter(p => p.shopId === shop.id || p.shopName === shop.name);

  const [activeTab, setActiveTab] = useState('about');
  const [isFollowing, setIsFollowing] = useState(false);

  const shopReviews = reviews.filter(r => r.shopId === shop.id || r.shopId === 'shop-cellular-world');

  const customerReviewsData = [
    {
      id: "rev-101",
      userName: "Amit Verma",
      date: "2 days ago",
      rating: 5,
      comment: "Great collection and genuine products. Very good customer service!",
      photos: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80"
      ]
    },
    {
      id: "rev-102",
      userName: "Priya Sharma",
      date: "1 week ago",
      rating: 5,
      comment: "Best shop in Indore for Apple products. Original bill and brand warranty provided.",
      photos: []
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Cover Photo Banner & Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative">
        
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-900 relative">
          <img 
            src={shop.coverImage || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80"}
            alt={shop.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        {/* Store Profile Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative z-10 -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Avatar & Main Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-3 sm:space-y-0 sm:space-x-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                <img
                  src={shop.logoImage}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                  <span>{shop.name}</span>
                  <CheckCircle className="w-6 h-6 text-blue-600 fill-blue-600 stroke-white shrink-0" />
                </h1>

                <div className="flex items-center space-x-3 text-xs text-slate-600">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{shop.rating || 4.7}</span>
                    <span className="text-slate-400 font-medium">({shop.reviewCount || 400} reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">{shop.positiveFeedback || '95%'} Positive Feedback</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Follow, Share, WhatsApp */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 sm:flex-none py-2.5 px-5 rounded-full text-xs font-bold transition flex items-center justify-center space-x-1.5 ${isFollowing ? 'bg-slate-200 text-slate-800' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </button>

              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Shop link copied to clipboard!'); }}
                className="p-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-bold transition"
                title="Share shop"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => logLeadAction(shop.id, null, 'whatsapp')}
                className="flex-1 sm:flex-none py-2.5 px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Store Location & Phone Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{shop.address || shop.city}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{shop.openingHours || "10:00 AM - 9:00 PM"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{shop.phone || "+91 98260 12345"}</span>
            </div>
          </div>

        </div>

        {/* Nav Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
          <div className="flex items-center space-x-8 text-xs font-bold">
            {[
              { id: 'about', label: 'About' },
              { id: 'products', label: `Products (${shopProducts.length || 128})` },
              { id: 'reviews', label: `Reviews (${shop.reviewCount || 400})` },
              { id: 'photos', label: 'Photos' },
              { id: 'offers', label: 'Offers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 border-b-2 transition ${activeTab === tab.id ? 'border-blue-600 text-blue-600 font-black' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Tab Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* About Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">About Shop</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {shop.about || "Cellular World Indore is your one stop destination for the latest mobiles, gadgets and accessories. We provide 100% original products with brand warranty and the best prices."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Shop Since</span>
                    <span className="font-bold text-slate-900">{shop.establishedYear || 'Jan 2015'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Shop Type</span>
                    <span className="font-bold text-slate-900">{shop.shopType || 'Retailer'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Business ID</span>
                    <span className="font-bold text-slate-900">{shop.businessId || 'CW123456'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">GSTIN</span>
                    <span className="font-bold text-slate-900">{shop.gstin || '23ABCDE1234F1Z5'}</span>
                  </div>
                </div>
              </div>

              {/* Top Products inside About */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Top Products</h3>
                  <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-blue-600 hover:underline">
                    View all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {shopProducts.slice(0, 4).map(prod => (
                    <div key={prod.id} className="bg-white border border-slate-200/80 rounded-2xl p-3 hover:shadow-md transition group">
                      <img
                        src={prod.images?.[0] || prod.images}
                        alt={prod.title}
                        className="w-full aspect-square object-cover rounded-xl mb-2 bg-slate-50"
                      />
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">{prod.title}</h4>
                      <p className="text-xs font-black text-slate-900 mt-1">₹{prod.price.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Customer Reviews */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Customer Reviews</h3>
                  <span className="text-xs font-bold text-blue-600">View all reviews</span>
                </div>

                <div className="space-y-4">
                  {customerReviewsData.map(rev => (
                    <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                            {rev.userName[0]}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900">{rev.userName}</h5>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-amber-400 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-slate-900 ml-1">{rev.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700">{rev.comment}</p>

                      {rev.photos.length > 0 && (
                        <div className="flex items-center space-x-2 pt-1">
                          {rev.photos.map((p, idx) => (
                            <img key={idx} src={p} alt="Review attachment" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {shopProducts.map(prod => (
              <div key={prod.id} className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg transition group">
                <Link to={`/product/${prod.id}`}>
                  <img src={prod.images?.[0] || prod.images} alt={prod.title} className="w-full aspect-square object-cover rounded-xl mb-3 bg-slate-50 group-hover:scale-105 transition duration-300" />
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px] leading-snug group-hover:text-blue-600">{prod.title}</h3>
                </Link>
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                  <span className="text-xs sm:text-sm font-black text-slate-900">₹{prod.price.toLocaleString('en-IN')}</span>
                  <button onClick={() => addToInquiryCart(prod)} className="bg-blue-600 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-blue-700">Inquire</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
