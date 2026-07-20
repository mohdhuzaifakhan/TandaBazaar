import React from 'react';
import { Check, ShieldCheck, Sparkles, MessageSquare, Phone, Store, Zap, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Pricing() {
  const { cityConfig, upgradeToPremiumWhatsapp } = useApp();

  const handleSubscribeClick = (planName) => {
    upgradeToPremiumWhatsapp("Local Shop", "Shop Owner", "");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1.5 bg-[#FAFAFA] dark:bg-slate-800 border border-[#ECECEC] dark:border-slate-700 text-[#111827] dark:text-slate-200 px-4 py-1.5 rounded-xl text-xs font-semibold">
          <Store className="w-4 h-4" />
          <span>Shop Owner Membership</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#111827] dark:text-white tracking-tight">
          Simple, Transparent Pricing for Tanda Badli Shops
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280]">
          Grow your local leads, get featured on the homepage, and connect directly with thousands of buyers across Rampur.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Free Starter */}
        <div className="bg-white dark:bg-[#121824] border border-[#ECECEC] dark:border-slate-800 rounded-2xl p-8 shadow-stripe flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Free Starter</span>
            <div className="font-heading font-extrabold text-4xl text-[#111827] dark:text-white">
              ₹0 <span className="text-sm font-normal text-[#6B7280]">/ forever</span>
            </div>
            <p className="text-xs text-[#6B7280]">Basic store profile for local business discovery.</p>

            <ul className="space-y-3 pt-4 border-t border-[#ECECEC] dark:border-slate-800 text-xs text-[#111827] dark:text-slate-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Up to 5 Product Listings</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Basic Store Address & Phone</span>
              </li>
              <li className="flex items-center space-x-2 opacity-40">
                <span className="w-4 h-4 text-[#6B7280] font-bold shrink-0">✕</span>
                <span className="line-through">Homepage Featured Placement</span>
              </li>
              <li className="flex items-center space-x-2 opacity-40">
                <span className="w-4 h-4 text-[#6B7280] font-bold shrink-0">✕</span>
                <span className="line-through">Verified Seller Blue Badge</span>
              </li>
            </ul>
          </div>

          <a
            href={`https://wa.me/${cityConfig.formattedWhatsapp}?text=Hi%20Admin,%20I%20want%20to%20register%20a%20Free%20basic%20shop%20profile`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#FAFAFA] dark:bg-slate-800 border border-[#ECECEC] dark:border-slate-700 hover:bg-slate-100 text-[#111827] dark:text-white font-semibold py-3 rounded-xl text-xs text-center transition block shadow-stripe"
          >
            Create Free Profile
          </a>
        </div>

        {/* Premium Membership (₹1,000 / month) -> Admin WhatsApp 8433043426 */}
        <div className="bg-[#111827] text-white border-2 border-[#F59E0B] rounded-2xl p-8 shadow-stripe-hover relative flex flex-col justify-between space-y-6">
          <div className="absolute -top-3.5 right-6 bg-[#F59E0B] text-[#111827] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-stripe">
            Recommended
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#F59E0B]" />
              <span>Premium Membership</span>
            </span>
            
            <div className="font-heading font-extrabold text-4xl text-white">
              ₹1,000 <span className="text-sm font-normal text-slate-300">/ month</span>
            </div>
            
            <p className="text-xs text-slate-300">Maximum visibility, featured placement, and priority leads.</p>

            <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Unlimited Product Uploads</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Homepage Featured Section Placement</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span><strong>Verified Seller Badge</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Direct WhatsApp & Phone Customer Leads</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleSubscribeClick("Premium Plan")}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-slate-950 font-semibold py-3.5 rounded-xl text-xs sm:text-sm transition shadow-stripe flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Subscribe via Admin WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">Admin WhatsApp Number: +91 8433043426</p>
          </div>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <h2 className="font-heading font-bold text-2xl text-[#111827] dark:text-white text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="p-5 bg-white dark:bg-[#121824] border border-[#ECECEC] dark:border-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-[#111827] dark:text-white">How do customers contact my shop?</h3>
            <p className="text-xs text-[#6B7280] mt-1">Customers click 'Call Shop' or 'WhatsApp' directly on your products. There are no middleman charges or commission fees.</p>
          </div>

          <div className="p-5 bg-white dark:bg-[#121824] border border-[#ECECEC] dark:border-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-[#111827] dark:text-white">How do I upgrade to the ₹1000/month plan?</h3>
            <p className="text-xs text-[#6B7280] mt-1">Simply click the subscribe button to message Admin on WhatsApp (+91 8433043426). Your featured plan will be activated within minutes!</p>
          </div>
        </div>
      </div>

    </div>
  );
}
