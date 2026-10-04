"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ActionGrid from "@/components/dashboard/ActionGrid";
import DailyHighlights from "@/components/dashboard/DailyHighlights";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      window.location.href = "/login";
    } else {
      setUserName(storedName);
    }
  }, []);

  if (!userName) return null; // Show nothing while checking

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground">You're currently at an <span className="font-semibold text-primary">Intermediate (B1)</span> level. Keep up the good work!</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 md:p-8 mb-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Daily Goal Progress</h2>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-5xl font-black">45</span>
              <span className="text-lg font-medium text-white/80 mb-1">/ 60 mins</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 mb-2">
              <div className="bg-white rounded-full h-3 transition-all duration-1000 ease-out" style={{ width: "75%" }}></div>
            </div>
            <p className="text-sm text-white/80 font-medium">Just 15 more minutes to reach your goal today!</p>
          </div>
        </div>

        <DashboardStats />
        
        <h2 className="text-xl font-bold text-foreground mb-4">What would you like to do?</h2>
        <ActionGrid />

        <h2 className="text-xl font-bold text-foreground mb-4">Daily Highlights</h2>
        <DailyHighlights />
      </div>

      <BottomNav />
    </main>
  );
}
