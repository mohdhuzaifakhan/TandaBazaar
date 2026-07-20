import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Phone, MessageSquare, MapPin, ShieldCheck, Heart, Scale, Share2, 
  Clock, Star, ChevronRight, CheckCircle2, Store, ArrowLeft, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/product/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, shops, reviews, wishlist, toggleWishlist, toggleCompare, logLeadAction } = useApp();

  const product = products.find(p => p.id === id) || products[0];
  const shop = shops.find(s => s.id === product.shopId) || shops[0];
  const productReviews = reviews.filter(r => r.productId === product.id);

  const [activeImage, setActiveImage] = useState(product.images[0] || '');
  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} at ${product.shopName} in Tanda Badli, Rampur!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product URL copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/search" className="hover:text-indigo-600">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Hero Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-soft">
            <img
              src={activeImage || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-rose-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${activeImage === img ? 'border-indigo-600 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Direct Action CTA Buttons */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            {/* Shop Verified Pill */}
            <div className="flex items-center space-x-2 mb-2">
              <Link to={`/shop/${shop.id}`} className="inline-flex items-center space-x-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                <Store className="w-3.5 h-3.5" />
                <span>{shop.name}</span>
                {shop.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 fill-indigo-100" />}
              </Link>
              <span className="text-xs text-slate-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-indigo-500" />
                <span>{shop.area}</span>
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="mt-4 flex items-baseline space-x-3">
              <span className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Lead Generation CTA Box (No online checkout - direct shop contact) */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl space-y-4 shadow-xl border border-indigo-500/20">
            <div className="flex items-center justify-between text-xs text-indigo-200 border-b border-white/10 pb-3">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>In Stock at Tanda Badli Store</span>
              </span>
              <span>Direct Lead Model</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => logLeadAction(product.shopId, product.id, 'whatsapp')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Shop</span>
              </button>

              <button
                onClick={() => logLeadAction(product.shopId, product.id, 'call')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Shop Owner</span>
              </button>
            </div>

            <button
              onClick={() => logLeadAction(product.shopId, product.id, 'visit')}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-2xl text-xs transition flex items-center justify-center space-x-1.5 border border-white/10"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Get Directions to Store ({shop.area})</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
              <span>Shop Phone: <strong>{shop.phone}</strong></span>
              <span>Open: {shop.openingHours}</span>
            </div>
          </div>

          {/* Quick Actions (Wishlist, Compare, Share) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex-1 py-2.5 rounded-2xl text-xs font-bold border flex items-center justify-center space-x-2 transition ${
                isWishlisted 
                  ? 'bg-rose-500 text-white border-rose-500' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              <span>{isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
            </button>

            <button
              onClick={() => toggleCompare(product)}
              className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-50"
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-50"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Seller Snapshot Box */}
          <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={shop.logoImage} alt={shop.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{shop.name}</h4>
                  <p className="text-[11px] text-slate-400">Owner: {shop.ownerName}</p>
                </div>
              </div>
              <Link to={`/shop/${shop.id}`} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                Visit Shop →
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{shop.address}</p>
          </div>

        </div>

      </div>

      {/* Specifications & Description Tabs */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-8">
        <div>
          <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">
            Product Description
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specs Table */}
        {product.specifications && (
          <div>
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{key}:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
            Similar Products in Tanda Badli
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
