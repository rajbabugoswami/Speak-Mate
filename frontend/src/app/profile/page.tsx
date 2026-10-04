"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { User, Settings, Shield, Bell, HelpCircle, LogOut, Flame, Trophy, Star, ChevronRight, Edit3, BookOpen, Mic } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string>("Guest");
  const [statsData, setStatsData] = useState({ streak: "0", words: "0" });

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
    
    setStatsData({
      streak: localStorage.getItem("dayStreak") || "1",
      words: localStorage.getItem("wordsLearnt") || "12"
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"name" | "alert">("alert");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [tempName, setTempName] = useState("");

  const openAlert = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType("alert");
    setIsModalOpen(true);
  };

  const openNameEdit = () => {
    setTempName(userName === "Guest" ? "" : userName);
    setModalType("name");
    setIsModalOpen(true);
  };

  const saveName = () => {
    if (tempName.trim()) {
      localStorage.setItem("userName", tempName.trim());
      setUserName(tempName.trim());
    }
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-slate-50 flex flex-col font-sans relative">
      <Header />

      {/* Custom Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
          >
            {modalType === "alert" ? (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">{modalTitle}</h3>
                <p className="text-slate-600 mb-6 font-medium">{modalMessage}</p>
                <button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Got it!
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">Edit Account</h3>
                <p className="text-slate-600 mb-4 font-medium text-sm">Update your display name.</p>
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 mb-6 focus:border-blue-500 outline-none font-bold text-slate-800"
                  placeholder="Your Name"
                />
                <div className="flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button onClick={saveName} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                    Save
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-xl">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button onClick={openNameEdit} className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-slate-800">{userName}</h1>
              <p className="text-slate-500 font-medium mb-3">+91 98765 43210</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                  Intermediate (B1)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-bold">
                  <Star className="w-3.5 h-3.5" /> Pro Member
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-orange-200 hover:shadow-md transition-all">
            <Flame className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800">{statsData.streak}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Day Streak</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-blue-200 hover:shadow-md transition-all">
            <Trophy className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800">{parseInt(statsData.words) * 15}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total XP</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-purple-200 hover:shadow-md transition-all">
            <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800">12</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lessons</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:border-green-200 hover:shadow-md transition-all">
            <Mic className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800">92%</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
          </div>
        </motion.div>

        {/* Settings List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8"
        >
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-black text-slate-800 ml-2">Preferences</h3>
          </div>
          
          <div className="divide-y divide-slate-50">
            <button 
              onClick={openNameEdit} 
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Account Details</h4>
                  <p className="text-sm text-slate-500 font-medium">Update your name and phone number</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={() => openAlert("Notifications", "All practice reminders are currently ON by default.")} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Notifications</h4>
                  <p className="text-sm text-slate-500 font-medium">Manage practice reminders</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={() => openAlert("Privacy & Security", "Your account is secured with local storage encryption.")} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Privacy & Security</h4>
                  <p className="text-sm text-slate-500 font-medium">Password and security settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={() => openAlert("Help & Support", "Contact our team at: support@speakmate.com")} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Help & Support</h4>
                  <p className="text-sm text-slate-500 font-medium">Get help or contact us</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={handleSignOut} className="w-full bg-white text-red-500 font-bold border-2 border-red-100 py-4 rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
          <p className="text-center text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest">SpeakMate App Version 1.0.0</p>
        </motion.div>

      </div>

      <BottomNav />
    </main>
  );
}
