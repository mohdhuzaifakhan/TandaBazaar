import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, Phone, MessageSquare, ShieldCheck, Eye, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, compareList, toggleCompare, logLeadAction } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some(p => p.id === product.id);

  return (
    <div className="group bg-white dark:bg-[#111726] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 ease-out flex flex-col justify-between">
      
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-900/60 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-lg tracking-wide shadow-subtle">
              {product.discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center space-x-1 shadow-subtle">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Quick Floating Actions (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col space-y-1.5 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-subtle ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 hover:bg-white'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-subtle ${
              isCompared
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 hover:bg-white'
            }`}
            title="Compare product"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Availability Status Pill */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-medium px-2.5 py-0.5 rounded-md flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{product.inStock ? 'In Store Tanda Badli' : 'Order On Request'}</span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Shop Meta Header */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
            <Link to={`/shop/${product.shopId}`} className="hover:text-slate-950 dark:hover:text-white font-medium truncate flex items-center space-x-1 transition-colors">
              <span className="truncate">{product.shopName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100 shrink-0" />
            </Link>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300 font-medium">
              {product.area}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline space-x-2">
            <span className="font-heading font-bold text-base sm:text-lg text-slate-950 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-1.5 text-[11px]">
          <button
            onClick={() => logLeadAction(product.shopId, product.id, 'whatsapp')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-semibold flex items-center justify-center space-x-1 transition-colors duration-200 shadow-subtle"
            title="WhatsApp Shop Owner"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => logLeadAction(product.shopId, product.id, 'call')}
            className="bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 py-2 rounded-xl font-semibold flex items-center justify-center space-x-1 transition-colors duration-200 shadow-subtle"
            title="Call Shop Owner"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>

          <Link
            to={`/product/${product.id}`}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-xl font-semibold flex items-center justify-center space-x-1 transition-colors duration-200 text-center"
            title="View Product Details"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
