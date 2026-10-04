"use client";

import { useEffect, useState } from "react";
import { Flame, Target, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardStats() {
  const [statsData, setStatsData] = useState({
    streak: "0",
    goal: "0%",
    words: "0",
    mins: "0"
  });

  useEffect(() => {
    // Load real stats from localStorage
    setStatsData({
      streak: localStorage.getItem("dayStreak") || "1",
      goal: localStorage.getItem("dailyGoal") || "10%",
      words: localStorage.getItem("wordsLearnt") || "12",
      mins: localStorage.getItem("speakingMin") || "5"
    });
  }, []);

  const stats = [
    { label: "Day Streak", value: statsData.streak, icon: Flame, lightColor: "text-orange-500", darkColor: "dark:text-orange-400", lightBg: "bg-orange-50 border-orange-100", darkBg: "dark:bg-orange-500/10 dark:border-orange-500/20" },
    { label: "Daily Goal", value: statsData.goal, icon: Target, lightColor: "text-blue-500", darkColor: "dark:text-blue-400", lightBg: "bg-blue-50 border-blue-100", darkBg: "dark:bg-blue-500/10 dark:border-blue-500/20" },
    { label: "Words Learnt", value: statsData.words, icon: Trophy, lightColor: "text-yellow-500", darkColor: "dark:text-yellow-400", lightBg: "bg-yellow-50 border-yellow-100", darkBg: "dark:bg-yellow-500/10 dark:border-yellow-500/20" },
    { label: "Speaking Min", value: statsData.mins, icon: Clock, lightColor: "text-emerald-500", darkColor: "dark:text-emerald-400", lightBg: "bg-emerald-50 border-emerald-100", darkBg: "dark:bg-emerald-500/10 dark:border-emerald-500/20" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div 
            key={i}
            className="bg-white dark:bg-[#1e293b] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-lg border border-slate-100 dark:border-slate-700 flex items-center space-x-4 hover:shadow-md dark:hover:border-slate-500 transition-all group md:hover:-translate-y-1"
          >
            <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform", stat.lightBg, stat.darkBg)}>
              <Icon className={cn("w-6 h-6 md:w-7 md:h-7", stat.lightColor, stat.darkColor)} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800 dark:text-white">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider md:mt-0.5">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
