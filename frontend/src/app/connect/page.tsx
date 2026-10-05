"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import AdBanner from "@/components/ads/AdBanner";
import { Phone, Video, Search, MapPin, Star, ShieldAlert, X, Mic, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const onlineUsers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    country: "USA",
    level: "Native",
    rating: 4.9,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true,
    tags: ["Friendly", "Patient"]
  },
  {
    id: 2,
    name: "Rahul Sharma",
    country: "India",
    level: "Advanced (C1)",
    rating: 4.7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    isOnline: true,
    tags: ["Grammar Pro", "Talkative"]
  },
  {
    id: 3,
    name: "Elena Rossi",
    country: "Italy",
    level: "Intermediate (B2)",
    rating: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    isOnline: true,
    tags: ["Beginner Friendly"]
  }
];

export default function ConnectPage() {
  const [activeCall, setActiveCall] = useState<{ user: any, type: 'audio' | 'video' } | null>(null);

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-slate-50 dark:bg-[#0f172a] flex flex-col relative font-sans transition-colors">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/10 dark:bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header />
      
      {/* Top Banner */}
      <div className="sticky top-16 z-20 px-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/60 shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-slate-900 dark:text-white font-black text-2xl tracking-tight">Global Connect</div>
            <div className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide uppercase">Practice with real humans 🌍</div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl relative z-10">
        
        <div className="relative mb-10 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by country, language, or level..." 
            className="w-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-white rounded-3xl py-4 pl-14 pr-6 shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 placeholder-slate-400 dark:placeholder-slate-500 font-medium transition-all text-lg"
          />
        </div>

        <AdBanner size="banner" className="mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineUsers.map((user) => (
            <motion.div 
              key={user.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white dark:bg-slate-800/60 backdrop-blur-md rounded-[2rem] p-6 shadow-lg dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-500/50 transition-all relative overflow-hidden group flex flex-col"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
              
              {/* Online Pulse */}
              <div className="absolute top-5 right-5 flex items-center justify-center">
                <span className="absolute w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75"></span>
                <span className="relative w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></span>
              </div>
              
              <div className="flex flex-col items-center text-center mb-6 mt-2 relative z-10">
                <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-blue-200 dark:bg-blue-500/30 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={user.avatar} alt={user.name} className="relative w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-md object-cover" />
                </div>
                
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{user.name}</h3>
                
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold text-sm mt-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400" /> {user.country}
                </div>
                
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                    {user.level}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 px-2 relative z-10">
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-2xl border border-amber-200/50 dark:border-amber-500/20">
                  <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-current" />
                  <span className="font-black text-amber-700 dark:text-amber-500 text-sm">{user.rating}</span>
                </div>
                <button className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-2.5 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10">
                  <ShieldAlert className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button 
                  onClick={() => setActiveCall({ user, type: 'audio' })}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-black border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:border-slate-500 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Audio
                </button>
                <button 
                  onClick={() => setActiveCall({ user, type: 'video' })}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md dark:shadow-lg dark:shadow-blue-600/20 transition-all"
                >
                  <Video className="w-4 h-4 text-white" /> Video
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Full Screen Call Overlay */}
      <AnimatePresence>
        {activeCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 z-0"></div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              
              {/* Ripple Animation */}
              <div className="relative flex justify-center items-center mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} 
                  className="absolute w-32 h-32 bg-blue-500 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1 }} 
                  className="absolute w-32 h-32 bg-blue-500 rounded-full"
                />
                <img src={activeCall.user.avatar} alt="User" className="relative w-40 h-40 rounded-full bg-slate-800 border-4 border-blue-500 shadow-2xl z-10" />
              </div>
              
              <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {activeCall.user.name}
              </h2>
              
              <div className="flex items-center gap-2 text-slate-300 font-bold bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                <MapPin className="w-4 h-4 text-rose-400" /> {activeCall.user.country} • {activeCall.user.level}
              </div>
              
              <p className="mt-8 text-blue-400 font-black tracking-widest uppercase text-sm animate-pulse">
                {activeCall.type === 'audio' ? 'Connecting Audio...' : 'Connecting Video...'}
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md p-8 pb-12 rounded-t-[3rem] flex justify-center gap-8 relative z-10 border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
              <button className="w-16 h-16 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center hover:bg-slate-600 transition-all text-white">
                <Mic className="w-6 h-6" />
              </button>
              {activeCall.type === 'video' && (
                <button className="w-16 h-16 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center hover:bg-slate-600 transition-all text-white">
                  <Video className="w-6 h-6" />
                </button>
              )}
              <button 
                onClick={() => setActiveCall(null)}
                className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/30 hover:scale-110"
              >
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
