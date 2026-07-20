import React, { useState } from 'react';
import { Rss, Heart, MessageSquare, Share2, ShieldCheck, Sparkles, Send, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function MarketFeed() {
  const { feedPosts, addFeedPost, logLeadAction } = useApp();
  const { currentUser } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [likesMap, setLikesMap] = useState({});

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      shopId: currentUser?.shopId || "shop-2",
      shopName: currentUser?.shopName || "Khan Mobile & Computer Hub",
      shopLogo: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      timeAgo: "Just now",
      content: newPostContent,
      media: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"],
      likes: 1,
      commentsCount: 0
    };

    addFeedPost(newPost);
    setNewPostContent('');
    alert("Post published to Tanda Badli Market Feed!");
  };

  const toggleLike = (postId) => {
    setLikesMap(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Rss className="w-3.5 h-3.5 text-amber-300" />
            <span>Tanda Badli Social Feed</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
            Live Market Updates & Offers
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1">
            Real-time posts, new arrivals, and flash deals directly from local shop owners.
          </p>
        </div>
      </div>

      {/* Seller Post Creator Bar (If Seller Role) */}
      {currentUser?.role === 'seller' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-soft space-y-3">
          <div className="flex items-center space-x-3">
            <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-bold text-xs text-slate-900 dark:text-white">Post update for {currentUser.shopName}</span>
          </div>
          <form onSubmit={handlePostSubmit} className="space-y-3">
            <textarea
              placeholder="What's new in your shop today? (e.g. New stock arrived, 20% festival discount...)"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows="3"
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs outline-none focus:border-indigo-500"
            ></textarea>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">Post reaches 10,000+ local buyers</span>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Update</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feed Posts List */}
      <div className="space-y-6">
        {feedPosts.map(post => {
          const isLiked = likesMap[post.id];
          return (
            <div key={post.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-soft space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <Link to={`/shop/${post.shopId}`} className="flex items-center space-x-3">
                  <img src={post.shopLogo} alt={post.shopName} className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>{post.shopName}</span>
                      {post.isVerified && <ShieldCheck className="w-4 h-4 text-indigo-500 fill-indigo-100" />}
                    </h3>
                    <span className="text-[11px] text-slate-400">{post.timeAgo} • Tanda Badli</span>
                  </div>
                </Link>

                <button
                  onClick={() => logLeadAction(post.shopId, null, 'whatsapp')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Shop</span>
                </button>
              </div>

              {/* Content text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {post.content}
              </p>

              {/* Media Image */}
              {post.media && post.media.length > 0 && (
                <div className="rounded-2xl overflow-hidden max-h-96 bg-slate-100 dark:bg-slate-900">
                  <img src={post.media[0]} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-1.5 font-bold transition ${isLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{post.likes + (isLiked ? 1 : 0)} Likes</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </span>
                  <button className="hover:text-indigo-600 flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
