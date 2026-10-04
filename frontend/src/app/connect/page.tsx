"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Phone, Video, Search, MapPin, Star, ShieldAlert, X, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const onlineUsers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    country: "USA",
    level: "Native",
    rating: 4.9,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true
  },
  {
    id: 2,
    name: "Rahul Sharma",
    country: "India",
    level: "Advanced (C1)",
    rating: 4.7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    isOnline: true
  },
  {
    id: 3,
    name: "Elena Rossi",
    country: "Italy",
    level: "Intermediate (B2)",
    rating: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    isOnline: true
  }
];

export default function ConnectPage() {
  const [activeCall, setActiveCall] = useState<{ user: any, type: 'audio' | 'video' } | null>(null);

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-background flex flex-col relative">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">Find a Partner</h1>
          <p className="text-muted-foreground">Practice English with real humans from around the world.</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by country, language, or level..." 
            className="w-full bg-white border border-border/50 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineUsers.map((user) => (
            <motion.div 
              key={user.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white z-10 shadow-sm"></div>
              
              <div className="flex flex-col items-center text-center mb-6">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full bg-slate-100 mb-4 border-4 border-slate-50" />
                <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                  <MapPin className="w-4 h-4" /> {user.country}
                </div>
                <div className="mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {user.level}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-bold text-slate-700">{user.rating}</span>
                </div>
                <button className="text-slate-400 hover:text-red-500 transition-colors">
                  <ShieldAlert className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveCall({ user, type: 'audio' })}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-100 text-orange-700 font-bold hover:bg-orange-200 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Audio
                </button>
                <button 
                  onClick={() => setActiveCall({ user, type: 'video' })}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-pink-100 text-pink-700 font-bold hover:bg-pink-200 transition-colors"
                >
                  <Video className="w-4 h-4" /> Video
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Full Screen Call Overlay Mockup */}
      <AnimatePresence>
        {activeCall && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col text-white"
          >
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Background gradient/blur */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-slate-900 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <img src={activeCall.user.avatar} alt="User" className="w-40 h-40 rounded-full bg-slate-800 mb-6 border-4 border-white/10" />
                <h2 className="text-3xl font-bold mb-2">{activeCall.user.name}</h2>
                <p className="text-white/60 mb-8">{activeCall.type === 'audio' ? 'Calling...' : 'Video Calling...'}</p>
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md p-8 pb-safe rounded-t-3xl flex justify-center gap-6 relative z-10 border-t border-white/10">
              <button className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors">
                <Mic className="w-6 h-6" />
              </button>
              {activeCall.type === 'video' && (
                <button className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <Video className="w-6 h-6" />
                </button>
              )}
              <button 
                onClick={() => setActiveCall(null)}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
