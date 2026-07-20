import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CompareDrawer from './components/common/CompareDrawer';
import AiAssistantModal from './components/ai/AiAssistantModal';

import Home from './pages/public/Home';
import SearchCatalog from './pages/public/SearchCatalog';
import ProductDetails from './pages/public/ProductDetails';
import ShopProfile from './pages/public/ShopProfile';
import ShopsDirectory from './pages/public/ShopsDirectory';
import MarketFeed from './pages/public/MarketFeed';
import Pricing from './pages/public/Pricing';
import WishlistPage from './pages/public/WishlistPage';
import About from './pages/public/About';

import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchCatalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop/:id" element={<ShopProfile />} />
            <Route path="/shops" element={<ShopsDirectory />} />
            <Route path="/feed" element={<MarketFeed />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<About />} />
            
            {/* Seller & Admin Portals */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Modals & Drawers */}
        <CompareDrawer />
        <AiAssistantModal />
      </div>
    </BrowserRouter>
  );
}
