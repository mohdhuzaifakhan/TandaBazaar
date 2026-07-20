import React from 'react';
import { X, Scale, ExternalLink, Trash2, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function CompareDrawer() {
  const { compareList, toggleCompare, isCompareOpen, setIsCompareOpen, logLeadAction } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Compare Local Products ({compareList.length}/4)
            </h3>
          </div>
          <button 
            onClick={() => setIsCompareOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {compareList.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Scale className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="font-medium text-base">No products added for comparison.</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Click the compare icon on any product card in the marketplace to compare specs side-by-side.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {compareList.map(item => (
                <div key={item.id} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 relative flex flex-col justify-between">
                  <button
                    onClick={() => toggleCompare(item)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 rounded-full bg-white dark:bg-slate-800 shadow"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div>
                    <img src={item.images[0]} alt={item.title} className="w-full h-36 object-cover rounded-xl mb-3" />
                    <h4 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">{item.title}</h4>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{item.discount}% Off</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Shop: {item.shopName}</p>
                    <p className="text-[11px] text-slate-400">Area: {item.area}</p>

                    {/* Specs List */}
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 text-[11px]">
                      <div className="font-bold text-slate-500 uppercase tracking-wider">Specifications</div>
                      {item.specifications && Object.entries(item.specifications).map(([key, val]) => (
                        <div key={key} className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700/60">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{key}: </span>
                          <span className="text-slate-500 dark:text-slate-400">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <button
                      onClick={() => logLeadAction(item.shopId, item.id, 'whatsapp')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Shop</span>
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => setIsCompareOpen(false)}
                      className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
