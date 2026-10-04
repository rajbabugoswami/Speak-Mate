"use client";

import { Megaphone } from "lucide-react";

interface AdBannerProps {
  size?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

export default function AdBanner({ size = "banner", className = "" }: AdBannerProps) {
  // Toggle this to true when you have Google AdSense ready
  const SHOW_ADS = false;

  if (!SHOW_ADS) {
    return null;
  }

  // Define heights based on standard ad unit sizes
  let heightClass = "h-24"; // Standard Mobile Banner
  if (size === "rectangle") heightClass = "h-64 w-full md:w-80"; // Medium Rectangle (often used in articles)
  if (size === "leaderboard") heightClass = "h-32"; // Leaderboard (Desktop/Tablet)

  return (
    <div className={`w-full flex justify-center items-center my-6 ${className}`}>
      <div 
        className={`w-full max-w-3xl ${heightClass} bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 relative overflow-hidden`}
      >
        <div className="absolute top-2 right-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-full">
          Advertisement
        </div>
        <Megaphone className="w-6 h-6 mb-2 opacity-50 text-blue-500" />
        <p className="text-sm font-bold opacity-75">Your Ad Here</p>
        <p className="text-[10px] font-medium opacity-50 mt-1">Placeholder for Google AdSense</p>
      </div>
    </div>
  );
}
