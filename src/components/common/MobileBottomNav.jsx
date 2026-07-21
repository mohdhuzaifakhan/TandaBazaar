import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, Heart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { wishlist, inquiryCart, setIsInquiryCartOpen, openAuthModal } = useApp();

  const totalCartCount = inquiryCart.reduce((sum, item) => sum + item.quantity, 0);

  const isHomeActive = pathname === '/';
  const isCategoryActive = pathname.startsWith('/category');
  const isWishlistActive = pathname === '/wishlist';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-1.5 pb-safe flex items-center justify-between select-none">
      
      {/* 1. Home Tab */}
      <Link
        to="/"
        className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${isHomeActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
      >
        {isHomeActive && (
          <span className="absolute -top-1.5 w-5 h-0.5 bg-blue-600 rounded-full" />
        )}
        <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Home</span>
      </Link>

      {/* 2. Categories Tab */}
      <Link
        to="/category"
        className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${isCategoryActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
      >
        {isCategoryActive && (
          <span className="absolute -top-1.5 w-5 h-0.5 bg-blue-600 rounded-full" />
        )}
        <Grid className={`w-5 h-5 ${isCategoryActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Categories</span>
      </Link>

      {/* 3. Inquiry Cart Tab */}
      <button
        onClick={() => setIsInquiryCartOpen(true)}
        className="flex-1 flex flex-col items-center justify-center py-1 text-slate-500 hover:text-blue-600 transition"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Cart</span>
      </button>

      {/* 4. Wishlist Tab */}
      <Link
        to="/wishlist"
        className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${isWishlistActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
      >
        {isWishlistActive && (
          <span className="absolute -top-1.5 w-5 h-0.5 bg-blue-600 rounded-full" />
        )}
        <div className="relative">
          <Heart className={`w-5 h-5 ${isWishlistActive ? 'fill-blue-600 text-blue-600 stroke-[2.5]' : 'stroke-[1.75]'}`} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Wishlist</span>
      </Link>

      {/* 5. Account / Profile Tab */}
      <button
        onClick={() => openAuthModal('login')}
        className="flex-1 flex flex-col items-center justify-center py-1 text-slate-500 hover:text-blue-600 transition"
      >
        <User className="w-5 h-5 stroke-[1.75]" />
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Profile</span>
      </button>

    </div>
  );
}
