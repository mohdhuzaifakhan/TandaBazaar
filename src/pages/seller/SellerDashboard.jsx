import React, { useState } from 'react';
import { 
  Store, Eye, Phone, MessageSquare, MapPin, Plus, Edit, Trash2, 
  TrendingUp, Sparkles, ShieldCheck, CheckCircle2, DollarSign, Image, X, Save 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function SellerDashboard() {
  const { currentUser } = useAuth();
  const { 
    shops, products, leads, addProduct, updateProduct, deleteProduct, 
    upgradeToPremiumWhatsapp, updateShopProfile 
  } = useApp();

  const currentShop = shops.find(s => s.id === currentUser?.shopId) || shops[1];
  const myProducts = products.filter(p => p.shopId === currentShop.id);
  const myLeads = leads.filter(l => l.shopId === currentShop.id);

  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: 'mobile-phones',
    description: '',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        title: formData.title,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        category: formData.category,
        description: formData.description,
        images: [formData.image],
        inStock: formData.inStock
      });
    } else {
      const newProd = {
        id: `prod-${Date.now()}`,
        title: formData.title,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        discount: formData.originalPrice ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0,
        category: formData.category,
        shopId: currentShop.id,
        shopName: currentShop.name,
        area: currentShop.area,
        isFeatured: false,
        isTrending: false,
        inStock: formData.inStock,
        images: [formData.image],
        description: formData.description,
        views: 1,
        leadsCount: 0,
        rating: 5.0,
        reviewCount: 0
      };
      addProduct(newProd);
    }
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      description: product.description,
      inStock: product.inStock,
      image: product.images[0]
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Seller Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="flex items-center space-x-4">
          <img src={currentShop.logoImage} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl">{currentShop.name}</h1>
              {currentShop.isVerified && <ShieldCheck className="w-5 h-5 text-indigo-400 fill-indigo-100" />}
              {currentShop.isPremium && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PREMIUM PLAN ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1">Owner: {currentShop.ownerName} • {currentShop.address}</p>
          </div>
        </div>

        {/* Upgrade Plan Action Button -> Direct WhatsApp to Admin 8433043426 */}
        <button
          onClick={() => upgradeToPremiumWhatsapp(currentShop.name, currentShop.ownerName, currentShop.phone)}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-emerald-500/30 flex items-center space-x-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Upgrade to ₹1,000 Premium via Admin</span>
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Product Views</span>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">1,420</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">WhatsApp Leads</span>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">84</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Phone Call Clicks</span>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">52</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Store Visit Directions</span>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">116</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500'}`}
        >
          Product Management ({myProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 border-b-2 transition ${activeTab === 'leads' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500'}`}
        >
          Customer Leads Log ({myLeads.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">All Store Products</h3>
            <button
              onClick={() => { setEditingProduct(null); setFormData({ title: '', price: '', originalPrice: '', category: 'mobile-phones', description: '', inStock: true, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' }); setIsAddModalOpen(true); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {myProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="p-4 flex items-center space-x-3">
                        <img src={prod.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{prod.title}</p>
                          <p className="text-[11px] text-slate-400">Leads Generated: {prod.leadsCount || 12}</p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300 font-medium capitalize">{prod.category}</td>
                      <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400">₹{prod.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${prod.inStock ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                          {prod.inStock ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-50 text-slate-700 dark:text-slate-200 rounded-lg"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-lg hover:bg-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-soft space-y-4">
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Recent Customer Lead Activity</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700 text-xs">
            {myLeads.map(lead => (
              <div key={lead.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{lead.productTitle}</p>
                  <p className="text-[11px] text-slate-400">Time: {lead.timestamp}</p>
                </div>
                <span className={`px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase ${lead.type === 'whatsapp' ? 'bg-emerald-100 text-emerald-800' : lead.type === 'call' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                  {lead.type} Lead
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add Product to Tanda Badli Shop'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OnePlus 12R 5G 256GB"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 mt-1 bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="39999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 mt-1 bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Original Price (₹)</label>
                  <input
                    type="number"
                    placeholder="44999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2.5 mt-1 bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Product Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 mt-1 bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 mt-1 bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white outline-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product to Shop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
