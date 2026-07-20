import React, { useState } from 'react';
import { Sparkles, X, Send, Store, Phone, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function AiAssistantModal() {
  const { isAiModalOpen, setIsAiModalOpen, products, shops, logLeadAction } = useApp();
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  if (!isAiModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsThinking(true);
    setRecommendations(null);

    setTimeout(() => {
      const q = query.toLowerCase();
      const matchedProds = products.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );

      const matchedShops = shops.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.about.toLowerCase().includes(q)
      );

      setRecommendations({
        matchedProds: matchedProds.length > 0 ? matchedProds : products.slice(0, 3),
        matchedShops: matchedShops.length > 0 ? matchedShops : shops.slice(0, 2),
        summary: `Found ${matchedProds.length || 3} local recommendations in Tanda Badli matching "${query}".`
      });
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg leading-tight">AI Product Assistant</h3>
              <p className="text-xs text-indigo-200">Describe what you need in Tanda Badli, Rampur</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Input */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 'I need a 5G phone under ₹40,000' or 'Bridal lehenga in Chowk Bazaar'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
            />
            <button
              type="submit"
              disabled={isThinking}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="text-slate-400 self-center">Try:</span>
            {['5G Mobile Phone', 'Royal Teakwood Sofa', 'Samsung 4K Smart TV', 'Gold Jewellery'].map((sample, i) => (
              <button
                key={i}
                onClick={() => { setQuery(sample); }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl text-[11px] transition"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {isThinking && (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Scanning local shop inventory in Tanda Badli...</p>
            </div>
          )}

          {!isThinking && !recommendations && (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Sparkles className="w-10 h-10 mx-auto text-indigo-400 mb-2 opacity-60" />
              <p>Type your query above to get personalized local product recommendations.</p>
            </div>
          )}

          {!isThinking && recommendations && (
            <div className="space-y-6">
              <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl flex items-center space-x-2 text-xs text-indigo-900 dark:text-indigo-200">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{recommendations.summary}</span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-3">Recommended Products</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendations.matchedProds.map(prod => (
                    <div key={prod.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex space-x-3">
                      <img src={prod.images[0]} alt={prod.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{prod.title}</p>
                        <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">₹{prod.price.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-slate-400">{prod.shopName} ({prod.area})</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => logLeadAction(prod.shopId, prod.id, 'whatsapp')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </button>
                          <Link
                            to={`/product/${prod.id}`}
                            onClick={() => setIsAiModalOpen(false)}
                            className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
