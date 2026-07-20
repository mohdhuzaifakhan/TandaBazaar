import React from 'react';
import { Store, MapPin, Phone, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function About() {
  const { cityConfig } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span>{cityConfig.name}</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          About Tanda Badli Local Marketplace
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Building a sustainable digital bazaar for local city businesses in Rampur district, Uttar Pradesh.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-soft space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">Our Mission</h2>
        <p>
          Unlike traditional e-commerce aggregators like Amazon or Flipkart that take massive seller commissions and handle shipping logistics, <strong>Tanda Badli Marketplace</strong> is built on a direct lead generation model.
        </p>
        <p>
          Local shop owners display their inventory online with images, specs, prices, and special discounts. Customers browse products from their smartphones and connect directly with the shop owner via <strong>Phone Call</strong>, <strong>WhatsApp</strong>, or by <strong>visiting the store in person</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">For Customers</h3>
            <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">Discover what's available in your neighborhood stores without wandering from shop to shop. Negotiate directly with shop owners.</p>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">For Shop Owners</h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Get featured listings, receive direct phone & WhatsApp leads, and grow your sales for just <strong>₹1,000 / month</strong>.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">Platform Administration</h3>
          <p className="text-xs text-slate-500">For inquiries or premium shop onboarding in Tanda Badli, Rampur:</p>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">Admin Phone & WhatsApp: +91 8433043426</p>
        </div>
      </div>

    </div>
  );
}
