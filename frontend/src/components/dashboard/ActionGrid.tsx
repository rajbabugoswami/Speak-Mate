"use client";

import { Mic, Bot, Users, Phone, Video, BookText, PenTool, Sparkles, Baby, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const actions = [
  { label: "Kids (Zero Se)", icon: Baby, href: "/kids", lightColor: "text-rose-500 bg-rose-50 border-rose-100 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-rose-500/30", darkColor: "dark:from-rose-500 dark:to-pink-500 dark:shadow-rose-500/20" },
  { label: "Dictionary", icon: BookText, href: "/dictionary", lightColor: "text-emerald-500 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-500/30", darkColor: "dark:from-emerald-500 dark:to-teal-500 dark:shadow-emerald-500/20" },
  { label: "Grammar", icon: PenTool, href: "/learn/grammar", lightColor: "text-cyan-500 bg-cyan-50 border-cyan-100 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-cyan-500/30", darkColor: "dark:from-cyan-500 dark:to-blue-500 dark:shadow-cyan-500/20" },
  { label: "Practice Speaking", icon: Mic, href: "/practice", lightColor: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-600/30", darkColor: "dark:from-blue-600 dark:to-indigo-600 dark:shadow-blue-500/20" },
  { label: "AI Conversation", icon: Bot, href: "/ai-chat", lightColor: "text-purple-600 bg-purple-50 border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-purple-600/30", darkColor: "dark:from-purple-500 dark:to-fuchsia-500 dark:shadow-purple-500/20" },
  { label: "Vocabulary", icon: BookText, href: "/learn/vocabulary", lightColor: "text-indigo-500 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-indigo-500/30", darkColor: "dark:from-indigo-500 dark:to-violet-500 dark:shadow-indigo-500/20" },
  { label: "Personality", icon: UserCheck, href: "/personality", lightColor: "text-slate-700 bg-slate-100 border-slate-200 group-hover:bg-slate-700 group-hover:text-white group-hover:shadow-slate-500/30", darkColor: "dark:from-slate-600 dark:to-slate-800 dark:shadow-slate-500/20" },
  { label: "Daily Challenge", icon: Sparkles, href: "/challenge", lightColor: "text-amber-500 bg-amber-50 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-amber-500/30", darkColor: "dark:from-amber-400 dark:to-orange-500 dark:shadow-amber-500/20" },
];

export default function ActionGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <Link key={i} href={action.href}>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-3xl p-6 flex flex-col items-center justify-center gap-3 h-32 relative overflow-hidden group cursor-pointer transition-all duration-300",
                "shadow-sm border border-slate-100 bg-white", // Light mode base
                "dark:shadow-lg dark:text-white dark:bg-gradient-to-br dark:border-white/10", // Dark mode base
                action.lightColor,
                action.darkColor
              )}
            >
              <div className="hidden dark:block absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
              <Icon className="w-8 h-8 dark:drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold dark:font-black text-sm text-center tracking-wide leading-tight dark:drop-shadow-md">{action.label}</span>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
