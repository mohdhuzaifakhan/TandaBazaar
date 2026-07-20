import React from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/product/ProductCard';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, products } = useApp();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-2">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          <span>My Saved Products ({wishlist.length})</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Your saved items from Tanda Badli marketplace</p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700">
          <Heart className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500 mt-1">Save your favorite local products by clicking the heart icon.</p>
          <Link to="/search" className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
