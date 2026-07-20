import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = {
  customer: {
    id: "user-100",
    name: "Mohd. Salim",
    email: "salim.rampur@gmail.com",
    role: "customer",
    city: "Tanda Badli, Rampur",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  seller: {
    id: "seller-2",
    name: "Rashid Khan (Seller)",
    email: "khanmobile.tanda@gmail.com",
    role: "seller",
    shopId: "shop-2",
    shopName: "Khan Mobile & Computer Hub",
    city: "Tanda Badli, Rampur",
    isPremium: true,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  },
  admin: {
    id: "admin-1",
    name: "Marketplace Admin",
    email: "admin@tandamarketplace.com",
    role: "admin",
    whatsapp: "8433043426",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('auth-user-role');
    return MOCK_USERS[saved] || MOCK_USERS.customer;
  });

  const switchRole = (roleKey) => {
    if (MOCK_USERS[roleKey]) {
      setCurrentUser(MOCK_USERS[roleKey]);
      localStorage.setItem('auth-user-role', roleKey);
    }
  };

  const login = (role = 'customer') => {
    switchRole(role);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth-user-role');
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, login, logout, roles: MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
