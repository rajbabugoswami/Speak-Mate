"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ActionGrid from "@/components/dashboard/ActionGrid";
import DailyHighlights from "@/components/dashboard/DailyHighlights";
import AdBanner from "@/components/ads/AdBanner";
import { motion } from "framer-motion";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [goalMins, setGoalMins] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      window.location.href = "/login";
    } else {
      setUserName(storedName);
      setGoalMins(parseInt(localStorage.getItem("speakingMin") || "5"));
    }
  }, []);

  if (!userName) return null; // Show nothing while checking

  const goalPercentage = Math.min(100, Math.round((goalMins / 60) * 100));

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-slate-50 dark:bg-[#0f172a] font-sans relative overflow-hidden transition-colors">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px]" />
      </div>

      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Ready to master English, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{userName}</span>? 🚀</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Every practice session brings you closer to fluency. Let's make today count!</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-6 md:p-8 mb-10 text-white shadow-2xl shadow-blue-500/25 dark:shadow-[0_10px_40px_rgba(79,70,229,0.4)] relative overflow-hidden dark:border dark:border-indigo-500/50 group"
        >
          <div className="absolute right-0 top-0 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000 ease-out" />
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 group-hover:scale-125 transition-transform duration-700 ease-in-out" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 tracking-tight">Daily Goal Progress</h2>
            <div className="flex items-end gap-2 mb-5">
              <span className="text-6xl font-black tracking-tighter drop-shadow-md">{goalMins}</span>
              <span className="text-lg font-bold text-white/80 mb-1.5 uppercase tracking-wider">/ 60 mins</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 mb-3 shadow-inner overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${goalPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-blue-200 to-white rounded-full h-full relative"
              >
                <div className="absolute inset-0 bg-white/40 w-full h-full animate-pulse"></div>
              </motion.div>
            </div>
            <p className="text-sm text-white/90 font-medium">Just <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md">{Math.max(0, 60 - goalMins)}</span> more minutes to reach your goal today!</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardStats />
        </motion.div>
        
        <AdBanner size="banner" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
            What would you like to do?
          </h2>
          <ActionGrid />
        </motion.div>

        <AdBanner size="rectangle" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 mt-10 flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
            Daily Highlights
          </h2>
          <DailyHighlights />
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
