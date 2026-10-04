"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Award, Clock, Trophy, Target, Zap, ChevronDown, ChevronRight, BookOpen, Mic } from "lucide-react";

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState("Weekly");

  const weeklyData = [
    { day: "Mon", score: 65, height: "h-[65%]" },
    { day: "Tue", score: 80, height: "h-[80%]" },
    { day: "Wed", score: 45, height: "h-[45%]" },
    { day: "Thu", score: 90, height: "h-[90%]" },
    { day: "Fri", score: 75, height: "h-[75%]" },
    { day: "Sat", score: 100, height: "h-[100%]" },
    { day: "Sun", score: 85, height: "h-[85%]" },
  ];

  const recentAchievements = [
    { id: 1, title: "7 Day Streak", desc: "Practiced every day for a week", icon: Zap, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20" },
    { id: 2, title: "Vocab Master", desc: "Learned 50 new words", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
    { id: 3, title: "Fluent Speaker", desc: "Completed 2h of speaking", icon: Mic, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20" },
  ];

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-slate-50 dark:bg-[#0f172a] transition-colors flex flex-col font-sans relative">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-500" />
              Progress Report
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Track your English learning journey</p>
          </div>
          
          <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            {timeframe} <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Overall Fluency", value: "B2", sub: "Upper Int.", icon: Target, color: "text-blue-600 dark:text-blue-400" },
            { label: "Total XP", value: "2,450", sub: "Top 10%", icon: Trophy, color: "text-yellow-500 dark:text-yellow-400" },
            { label: "Speaking Time", value: "14h", sub: "This month", icon: Clock, color: "text-emerald-500 dark:text-emerald-400" },
            { label: "Accuracy", value: "87%", sub: "+2% from last wk", icon: BarChart2, color: "text-purple-500 dark:text-purple-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1e293b] rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col transition-colors">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors flex flex-col"
          >
            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6">Activity Highlights</h3>
            <div className="flex-1 flex items-end gap-2 sm:gap-4 h-48 sm:h-64 mt-auto">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-3 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10">
                    {data.score} XP
                  </div>
                  <div className={`w-full max-w-[40px] rounded-t-xl transition-all duration-500 ${data.day === 'Sat' ? 'bg-gradient-to-t from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-200 dark:group-hover:bg-slate-600'} ${data.height}`} />
                  <span className={`text-xs font-bold ${data.day === 'Sat' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>{data.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Breakdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6">Skill Mastery</h3>
            <div className="space-y-6">
              {[
                { name: "Grammar", score: 92, color: "bg-purple-500" },
                { name: "Vocabulary", score: 78, color: "bg-blue-500" },
                { name: "Pronunciation", score: 85, color: "bg-emerald-500" },
                { name: "Listening", score: 65, color: "bg-orange-500" },
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{skill.name}</span>
                    <span className="text-sm font-black text-slate-800 dark:text-white">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`h-full rounded-full ${skill.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" /> Recent Achievements
            </h3>
            <button className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {recentAchievements.map((badge) => (
              <div key={badge.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${badge.bg} ${badge.border} transition-colors`}>
                <div className={`w-12 h-12 rounded-full bg-white dark:bg-[#1e293b] shadow-sm flex items-center justify-center shrink-0`}>
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{badge.title}</h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
