import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITY_CONFIG, MOCK_SHOPS, MOCK_PRODUCTS, MOCK_OFFERS, MOCK_FEED_POSTS, MOCK_REVIEWS, MOCK_LEADS, CATEGORIES } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // City settings
  const [cityConfig, setCityConfig] = useState(CITY_CONFIG);
  
  // Dynamic Datasets
  const [shops, setShops] = useState(() => {
    const saved = localStorage.getItem('app-shops');
    return saved ? JSON.parse(saved) : MOCK_SHOPS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('app-products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('app-offers');
    return saved ? JSON.parse(saved) : MOCK_OFFERS;
  });

  const [feedPosts, setFeedPosts] = useState(() => {
    const saved = localStorage.getItem('app-feed-posts');
    return saved ? JSON.parse(saved) : MOCK_FEED_POSTS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('app-reviews');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('app-leads');
    return saved ? JSON.parse(saved) : MOCK_LEADS;
  });

  const [categoriesList, setCategoriesList] = useState(CATEGORIES);

  // User Interactive States
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('app-wishlist');
    return saved ? JSON.parse(saved) : ["prod-1", "prod-4"];
  });

  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['OnePlus 12R', 'Samsung 4K TV', 'Lehenga', 'Teakwood Sofa']);

  // Homepage Section Order (Admin manageable)
  const [homepageSections, setHomepageSections] = useState([
    { id: 'hero', name: 'Hero Search Banner', visible: true },
    { id: 'categories', name: 'Popular Categories', visible: true },
    { id: 'featured-products', name: 'Featured Products (Premium Shops)', visible: true },
    { id: 'premium-shops', name: 'Verified & Premium Shops', visible: true },
    { id: 'todays-deals', name: 'Today\'s Special Offers', visible: true },
    { id: 'trending-products', name: 'Trending Local Products', visible: true },
    { id: 'how-it-works', name: 'How Local Discovery Works', visible: true },
    { id: 'testimonials', name: 'Customer & Shop Testimonials', visible: true },
    { id: 'pricing', name: 'Shop Owner Membership Plan', visible: true }
  ]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('app-shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('app-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('app-offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('app-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlist logic
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Compare logic
  const toggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 products at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };

  // Lead Generation Logging (Call, WhatsApp, Visit Store)
  const logLeadAction = (shopId, productId, type) => {
    const shop = shops.find(s => s.id === shopId);
    const product = products.find(p => p.id === productId);
    const newLead = {
      id: `lead-${Date.now()}`,
      shopId,
      shopName: shop ? shop.name : "Local Shop",
      productTitle: product ? product.title : "Direct Inquiry",
      type,
      customerPhone: "+91 Customer",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setLeads(prev => [newLead, ...prev]);

    // Update views/leads count on product
    if (productId) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, leadsCount: (p.leadsCount || 0) + 1 } : p));
    }

    // Execute direct external actions
    if (type === 'whatsapp' && shop) {
      const text = encodeURIComponent(`Hello ${shop.name}, I found your listing on Tanda Badli Marketplace: "${product ? product.title : 'Shop Enquiry'}". Is this available?`);
      window.open(`https://wa.me/${shop.whatsapp}?text=${text}`, '_blank');
    } else if (type === 'call' && shop) {
      window.location.href = `tel:${shop.phone}`;
    } else if (type === 'visit' && shop) {
      const query = encodeURIComponent(`${shop.name}, ${shop.address}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  // Upgrade to Premium Subscription -> Redirects to Admin WhatsApp 8433043426
  const upgradeToPremiumWhatsapp = (shopName, ownerName, phone) => {
    const text = encodeURIComponent(`Hi Admin, I want to upgrade my shop "${shopName || 'My Local Shop'}" to the Premium Membership (₹1000/month) on Tanda Badli Marketplace.\n\nOwner Name: ${ownerName || 'Seller'}\nPhone: ${phone || ''}\nCity: Tanda Badli, Rampur.\nPlease activate my featured listing.`);
    window.open(`https://wa.me/${cityConfig.formattedWhatsapp}?text=${text}`, '_blank');
  };

  // Seller CRUD helper actions
  const addProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const updateShopProfile = (updatedShop) => {
    setShops(prev => prev.map(s => s.id === updatedShop.id ? updatedShop : s));
  };

  // Admin Actions
  const toggleShopVerification = (shopId) => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, isVerified: !s.isVerified } : s));
  };

  const toggleShopPremium = (shopId) => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, isPremium: !s.isPremium } : s));
  };

  const addCategory = (newCat) => {
    setCategoriesList(prev => [...prev, newCat]);
  };

  const addFeedPost = (newPost) => {
    setFeedPosts(prev => [newPost, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      cityConfig,
      shops,
      products,
      offers,
      feedPosts,
      reviews,
      leads,
      categoriesList,
      wishlist,
      toggleWishlist,
      compareList,
      toggleCompare,
      isCompareOpen,
      setIsCompareOpen,
      isAiModalOpen,
      setIsAiModalOpen,
      searchQuery,
      setSearchQuery,
      recentSearches,
      homepageSections,
      setHomepageSections,
      logLeadAction,
      upgradeToPremiumWhatsapp,
      addProduct,
      updateProduct,
      deleteProduct,
      updateShopProfile,
      toggleShopVerification,
      toggleShopPremium,
      addCategory,
      addFeedPost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
