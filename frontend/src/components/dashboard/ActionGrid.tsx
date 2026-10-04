"use client";

import { Mic, Bot, Users, Phone, Video, BookText, PenTool, Sparkles, Baby, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const actions = [
  { label: "Kids (Zero Se)", icon: Baby, href: "/kids", color: "bg-rose-500", text: "text-white" },
  { label: "Dictionary", icon: BookText, href: "/dictionary", color: "bg-emerald-500", text: "text-white" },
  { label: "Grammar", icon: PenTool, href: "/learn/grammar", color: "bg-teal-500", text: "text-white" },
  { label: "Practice Speaking", icon: Mic, href: "/practice", color: "bg-blue-500", text: "text-white" },
  { label: "AI Conversation", icon: Bot, href: "/ai-chat", color: "bg-purple-500", text: "text-white" },
  { label: "Vocabulary", icon: BookText, href: "/learn/vocabulary", color: "bg-indigo-500", text: "text-white" },
  { label: "Personality", icon: UserCheck, href: "/personality", color: "bg-slate-800", text: "text-white" },
  { label: "Daily Challenge", icon: Sparkles, href: "/challenge", color: "bg-amber-500", text: "text-white" },
];

export default function ActionGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <Link key={i} href={action.href}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-3 h-32 relative overflow-hidden group cursor-pointer",
                action.color, action.text
              )}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <Icon className="w-8 h-8" />
              <span className="font-semibold text-sm text-center">{action.label}</span>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
