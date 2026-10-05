"use client";

import { Home, BookOpen, Mic, Users, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Learn", href: "/learn" },
  { icon: Mic, label: "Practice", href: "/practice" },
  { icon: Users, label: "Connect", href: "/connect" },
  { icon: UserCircle, label: "Profile", href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 pb-safe z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-300"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-blue-400/20")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
