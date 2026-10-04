"use client";

import { Bell, Search, X, BookOpen, Mic, MessageSquare, Star, BrainCircuit, CheckCircle2, Flame, Award, User, Settings, LogOut, HelpCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const searchableModules = [
  { name: "Grammar Quest", href: "/learn/grammar", icon: BookOpen, desc: "Learn grammar rules easily" },
  { name: "Speaking Practice", href: "/practice", icon: Mic, desc: "Practice real-world sentences" },
  { name: "AI Conversation", href: "/ai-chat", icon: MessageSquare, desc: "Chat with an AI tutor" },
  { name: "Personality Development", href: "/personality", icon: Star, desc: "Build confidence and skills" },
  { name: "Vocabulary & Idioms", href: "/learn/vocabulary", icon: BrainCircuit, desc: "Expand your word power" }
];

const initialNotifications = [
  { id: 1, title: "7-Day Streak! 🔥", desc: "You practiced for 7 days in a row.", time: "2h ago", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
  { id: 2, title: "New Badge Earned", desc: "You unlocked the 'Grammar Master' badge.", time: "5h ago", icon: Award, color: "text-yellow-500", bg: "bg-yellow-50" },
  { id: 3, title: "Daily Goal Reached", desc: "Great job completing your 15 mins today.", time: "1d ago", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" }
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [userName, setUserName] = useState("Guest");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const filteredModules = searchableModules.filter(mod => 
    mod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mod.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const closeDropdowns = () => {
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass border-b border-border bg-white/80 backdrop-blur-md relative">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md uppercase">
              {userName.charAt(0)}
            </div>
            <Link href="/" onClick={closeDropdowns} className="font-black text-xl tracking-tight text-slate-800">
              Speak<span className="text-blue-600">Mate</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 text-slate-500">
            <button 
              onClick={() => { closeDropdowns(); setIsSearchOpen(true); }}
              className="hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="relative">
              <button 
                onClick={() => { setIsProfileOpen(false); setIsNotifOpen(!isNotifOpen); }}
                className={`transition-colors p-2 rounded-full ${isNotifOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-600'}`}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <h3 className="font-black text-slate-800">Notifications</h3>
                      {notifications.length > 0 && (
                        <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {notifications.length} New
                        </span>
                      )}
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 group relative">
                            <div className={`w-10 h-10 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0`}>
                              <notif.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{notif.title}</h4>
                              <p className="text-xs text-slate-500 mb-1">{notif.desc}</p>
                              <p className="text-[10px] font-bold text-slate-400">{notif.time}</p>
                            </div>
                            <button 
                              onClick={() => removeNotification(notif.id)}
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded-full text-slate-400 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-slate-400">
                          <Bell className="w-10 h-10 mx-auto mb-3 opacity-20" />
                          <p className="font-medium text-sm">You're all caught up!</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(false); setIsProfileOpen(!isProfileOpen); }}
                className={`w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm ring-2 transition-all ${isProfileOpen ? 'ring-blue-500 scale-105' : 'ring-transparent hover:ring-blue-300'}`}
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`} alt="User Avatar" className="w-full h-full object-cover" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                  >
                    <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`} alt="User Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800 text-lg leading-tight">{userName}</h3>
                          <p className="text-xs font-bold text-blue-500">Intermediate (B1)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link href="/profile" onClick={closeDropdowns} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-600 font-medium">
                        <User className="w-5 h-5 text-slate-400" /> My Profile
                      </Link>
                      <Link href="/progress" onClick={closeDropdowns} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-600 font-medium">
                        <TrendingUp className="w-5 h-5 text-slate-400" /> Progress Report
                      </Link>
                      <Link href="/profile" onClick={closeDropdowns} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-600 font-medium">
                        <Settings className="w-5 h-5 text-slate-400" /> Settings
                      </Link>
                      <button onClick={closeDropdowns} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-600 font-medium">
                        <HelpCircle className="w-5 h-5 text-slate-400" /> Help & Support
                      </button>
                    </div>
                    
                    <div className="p-2 border-t border-slate-100 bg-slate-50">
                      <Link href="/login" onClick={closeDropdowns} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors text-left text-slate-600 font-medium">
                        <LogOut className="w-5 h-5" /> Sign Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col pt-16 px-4"
          >
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white w-full max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Search Input Area */}
              <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                <Search className="w-6 h-6 text-slate-400" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search for lessons, grammar, or practice..."
                  className="flex-1 text-lg outline-none font-medium text-slate-800 placeholder:text-slate-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results Area */}
              <div className="flex-1 overflow-y-auto p-2 bg-slate-50">
                {filteredModules.length > 0 ? (
                  <div className="space-y-1">
                    {filteredModules.map((mod, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push(mod.href);
                        }}
                        className="w-full text-left p-4 hover:bg-white rounded-2xl flex items-center gap-4 transition-all border border-transparent hover:border-slate-200 hover:shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <mod.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{mod.name}</h4>
                          <p className="text-sm text-slate-500">{mod.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
