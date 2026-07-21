import React from 'react';
import { X, Trash2, ShoppingBag, Send, Plus, Minus, Store } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function InquiryCartDrawer() {
  const { 
    products, inquiryCart, removeFromInquiryCart, updateCartQuantity, 
    clearInquiryCart, isInquiryCartOpen, setIsInquiryCartOpen, logLeadAction 
  } = useApp();

  if (!isInquiryCartOpen) return null;

  // Resolve full product object for each cart item
  const resolvedItems = inquiryCart.map(item => {
    const product = products.find(p => p.id === item.productId) || {
      id: item.productId,
      title: item.title || "Product Inquiry",
      images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"],
      shopName: item.shopName || "Local Shop",
      price: item.price || 0
    };
    return { ...item, product };
  });

  const handleSendInquiry = () => {
    if (resolvedItems.length === 0) return;
    
    // Create WhatsApp inquiry text listing all items grouped by shop
    let text = `🛒 *New Product Inquiry from ShopLocal*\n\n`;
    resolvedItems.forEach((item, index) => {
      text += `${index + 1}. *${item.product.title}*\n   Color/Variant: ${item.color}\n   Qty: ${item.quantity}\n   Shop: ${item.product.shopName || item.shopName}\n\n`;
    });
    text += `Please confirm availability & best pricing. Thank you!`;

    // Open WhatsApp with populated message
    window.open(`https://wa.me/918433043426?text=${encodeURIComponent(text)}`, '_blank');
    
    // Log lead actions
    resolvedItems.forEach(item => {
      if (item.product?.shopId) {
        logLeadAction(item.product.shopId, item.product.id, 'whatsapp');
      }
    });

    setIsInquiryCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end max-md:items-end">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsInquiryCartOpen(false)} 
      />

      <div className="relative w-full max-w-md bg-white flex flex-col h-full max-md:h-[85vh] max-md:rounded-t-3xl z-10 overflow-hidden">
        
        {/* Mobile Pull Indicator Handle */}
        <div className="md:hidden w-12 h-1 bg-slate-300 rounded-full mx-auto my-2" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <span>My Inquiry Cart ({resolvedItems.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">These items will be sent to the shop for inquiry.</p>
          </div>
          <button 
            onClick={() => setIsInquiryCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {resolvedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
              <p className="font-semibold text-slate-700 text-sm">Your inquiry cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Browse products and add items to inquire directly with local shop owners.</p>
            </div>
          ) : (
            resolvedItems.map((item, idx) => (
              <div 
                key={`${item.productId}-${item.color}-${idx}`}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center space-x-3 hover:border-blue-200 transition"
              >
                {/* Thumbnail */}
                <img 
                  src={item.product.images?.[0] || item.product.images} 
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.product.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{item.color}</p>
                  <p className="text-[11px] text-blue-600 font-semibold flex items-center space-x-1 mt-0.5">
                    <Store className="w-3 h-3 text-slate-400" />
                    <span>{item.product.shopName || item.shopName}</span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.color, -1)}
                    className="p-1 hover:bg-slate-100 text-slate-600 rounded transition"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-800 px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.color, 1)}
                    className="p-1 hover:bg-slate-100 text-slate-600 rounded transition"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromInquiryCart(item.productId, item.color)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Action Bar */}
        {resolvedItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={clearInquiryCart}
                className="w-1/3 py-3 px-4 border border-slate-300 text-slate-700 hover:bg-slate-200 rounded-full text-xs font-bold transition"
              >
                Clear Cart
              </button>
              
              <button
                onClick={handleSendInquiry}
                className="w-2/3 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry to Shops</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
