"use client";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Link from "next/link";
import { BookOpen, BrainCircuit, LibraryBig, Languages, Mic, Trophy, Flame, Star, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LearnHub() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 font-sans" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b, #3b0764)" }}>
      <Header />
      
      {/* Top Stats Bar */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-black text-xl leading-tight">Learning Hub</div>
              <div className="text-indigo-300 text-xs font-bold">Choose your path 🚀</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-rose-500/20 border border-rose-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-400 fill-rose-400"/><span className="text-white font-black text-sm">3</span>
            </div>
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 hidden sm:flex">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">12</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 mb-10 shadow-2xl relative overflow-hidden border border-blue-500/50"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0 shadow-inner text-5xl">
              🎯
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-block bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3 border border-blue-400/30">
                Daily Goal
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Keep up the momentum!</h2>
              <p className="text-blue-100 font-medium">You need 50 more XP to hit your daily goal.</p>
              
              <div className="mt-5 bg-black/20 h-3 rounded-full overflow-hidden border border-white/10">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 w-[60%] h-full rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Grammar Quest */}
          <motion.div variants={item}>
            <Link href="/learn/grammar" className="block group h-full">
              <div className="bg-[#1e293b] rounded-3xl p-6 shadow-xl border-2 border-slate-700 hover:border-blue-500 transition-all h-full flex flex-col relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Grammar Quest</h2>
                <p className="text-slate-400 text-sm font-medium flex-1">
                  Master the rules of English from Class 8 to 12 through an RPG-style world map and boss fights.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level 0-5</span>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Vocabulary & Idioms */}
          <motion.div variants={item}>
            <Link href="/learn/vocabulary" className="block group h-full">
              <div className="bg-[#1e293b] rounded-3xl p-6 shadow-xl border-2 border-slate-700 hover:border-fuchsia-500 transition-all h-full flex flex-col relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-colors"></div>
                <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mb-6 border border-fuchsia-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Vocabulary Library</h2>
                <p className="text-slate-400 text-sm font-medium flex-1">
                  Expand your word power with 10,000+ words. Practice spelling, meaning, and translation.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">10,000 Words</span>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-fuchsia-600 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div variants={item}>
            <Link href="/challenge" className="block group h-full">
              <div className="bg-[#1e293b] rounded-3xl p-6 shadow-xl border-2 border-slate-700 hover:border-emerald-500 transition-all h-full flex flex-col relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <Mic className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Daily Challenge</h2>
                <p className="text-slate-400 text-sm font-medium flex-1">
                  Take the 60-second speaking challenge! Test your fluency and get instant AI feedback.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">+50 XP Reward</span>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Dictionary & Kids Row (Half size cards) */}
          <motion.div variants={item} className="grid grid-cols-2 gap-5 sm:gap-6">
            <Link href="/dictionary" className="block group h-full">
              <div className="bg-[#1e293b] rounded-3xl p-5 shadow-xl border-2 border-slate-700 hover:border-amber-500 transition-all h-full flex flex-col relative overflow-hidden items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-110 transition-transform">
                  <LibraryBig className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black text-white mb-1">Dictionary</h2>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-auto">Search</span>
              </div>
            </Link>
            
            <Link href="/kids" className="block group h-full">
              <div className="bg-[#1e293b] rounded-3xl p-5 shadow-xl border-2 border-slate-700 hover:border-rose-500 transition-all h-full flex flex-col relative overflow-hidden items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30 group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black text-white mb-1">Kids Zone</h2>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-auto">Ages 4-10</span>
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
