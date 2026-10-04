"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { User, Settings, Shield, Bell, HelpCircle, LogOut, Flame, Trophy, Star, ChevronRight, Edit3, BookOpen, Mic, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string>("Guest");
  const [gender, setGender] = useState<string>("Not set");
  const [dob, setDob] = useState<string>("Not set");
  const [phone, setPhone] = useState<string>("+91 98765 43210");
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(true);
  const [newChallenges, setNewChallenges] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [statsData, setStatsData] = useState({ streak: "0", words: "0" });
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
    const storedGender = localStorage.getItem("userGender");
    if (storedGender) setGender(storedGender);
    const storedDob = localStorage.getItem("userDob");
    if (storedDob) setDob(storedDob);
    const storedPhone = localStorage.getItem("userPhone");
    if (storedPhone) setPhone(storedPhone);
    const storedDaily = localStorage.getItem("notifyDaily");
    if (storedDaily !== null) setDailyReminders(storedDaily === "true");
    const storedWeekly = localStorage.getItem("notifyWeekly");
    if (storedWeekly !== null) setWeeklyProgress(storedWeekly === "true");
    const storedChallenges = localStorage.getItem("notifyChallenges");
    if (storedChallenges !== null) setNewChallenges(storedChallenges === "true");
    const storedPrivate = localStorage.getItem("privacyPrivateProfile");
    if (storedPrivate !== null) setPrivateProfile(storedPrivate === "true");
    const storedActivity = localStorage.getItem("privacyActivity");
    if (storedActivity !== null) setShowActivity(storedActivity === "true");
    
    setStatsData({
      streak: localStorage.getItem("dayStreak") || "1",
      words: localStorage.getItem("wordsLearnt") || "12"
    });
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"name" | "alert" | "notifications" | "privacy" | "help">("alert");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempGender, setTempGender] = useState("");
  const [tempDob, setTempDob] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  const openAlert = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType("alert");
    setIsModalOpen(true);
  };

  const openNotificationsEdit = () => {
    setModalType("notifications");
    setIsModalOpen(true);
  };

  const openPrivacyEdit = () => {
    setModalType("privacy");
    setIsModalOpen(true);
  };

  const openHelp = () => {
    setModalType("help");
    setIsModalOpen(true);
  };

  const togglePrivacy = (type: string, currentValue: boolean) => {
    const newValue = !currentValue;
    if (type === "private") {
      setPrivateProfile(newValue);
      localStorage.setItem("privacyPrivateProfile", String(newValue));
    } else if (type === "activity") {
      setShowActivity(newValue);
      localStorage.setItem("privacyActivity", String(newValue));
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleNotification = (type: string, currentValue: boolean) => {
    const newValue = !currentValue;
    if (type === "daily") {
      setDailyReminders(newValue);
      localStorage.setItem("notifyDaily", String(newValue));
    } else if (type === "weekly") {
      setWeeklyProgress(newValue);
      localStorage.setItem("notifyWeekly", String(newValue));
    } else if (type === "challenges") {
      setNewChallenges(newValue);
      localStorage.setItem("notifyChallenges", String(newValue));
    }
  };

  const openNameEdit = () => {
    setTempName(userName === "Guest" ? "" : userName);
    setTempGender(gender === "Not set" ? "" : gender);
    setTempDob(dob === "Not set" ? "" : dob);
    setTempPhone(phone);
    setModalType("name");
    setIsModalOpen(true);
  };

  const saveName = () => {
    if (tempName.trim()) {
      localStorage.setItem("userName", tempName.trim());
      setUserName(tempName.trim());
    }
    if (tempGender) {
      localStorage.setItem("userGender", tempGender);
      setGender(tempGender);
    }
    if (tempDob) {
      localStorage.setItem("userDob", tempDob);
      setDob(tempDob);
    }
    if (tempPhone) {
      localStorage.setItem("userPhone", tempPhone);
      setPhone(tempPhone);
    }
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-slate-50 dark:bg-[#0f172a] transition-colors flex flex-col font-sans relative">
      <Header />

      {/* Custom Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 w-full max-w-sm shadow-2xl transition-colors border dark:border-slate-700"
          >
            {modalType === "notifications" ? (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">Notifications</h3>
                <p className="text-slate-600 mb-6 font-medium text-sm">Manage your email and push alerts.</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Daily Reminders</h4>
                      <p className="text-xs text-slate-500 font-medium">Don't lose your streak!</p>
                    </div>
                    <button 
                      onClick={() => toggleNotification('daily', dailyReminders)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${dailyReminders ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${dailyReminders ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Weekly Progress</h4>
                      <p className="text-xs text-slate-500 font-medium">Summary of words learnt</p>
                    </div>
                    <button 
                      onClick={() => toggleNotification('weekly', weeklyProgress)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${weeklyProgress ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${weeklyProgress ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">New Challenges</h4>
                      <p className="text-xs text-slate-500 font-medium">When new lessons arrive</p>
                    </div>
                    <button 
                      onClick={() => toggleNotification('challenges', newChallenges)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${newChallenges ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${newChallenges ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Done
                </button>
              </>
            ) : modalType === "privacy" ? (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">Privacy & Security</h3>
                <p className="text-slate-600 mb-6 font-medium text-sm">Control how others see your account.</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Private Profile</h4>
                      <p className="text-xs text-slate-500 font-medium">Hide your stats from leaderboards</p>
                    </div>
                    <button 
                      onClick={() => togglePrivacy('private', privateProfile)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${privateProfile ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${privateProfile ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Activity Status</h4>
                      <p className="text-xs text-slate-500 font-medium">Let friends see when you're online</p>
                    </div>
                    <button 
                      onClick={() => togglePrivacy('activity', showActivity)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${showActivity ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${showActivity ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Done
                </button>
              </>
            ) : modalType === "help" ? (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">Help & Support</h3>
                <p className="text-slate-600 mb-6 font-medium text-sm">We're here to help you with your English journey.</p>
                
                <div className="space-y-3 mb-6">
                  <a href="mailto:support@speakmate.com" className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-slate-800">Email Support</h4>
                      <p className="text-xs text-slate-500 font-medium group-hover:text-blue-600 transition-colors">support@speakmate.com</p>
                    </div>
                  </a>
                  
                  <button onClick={() => {}} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">FAQs</h4>
                      <p className="text-xs text-slate-500 font-medium group-hover:text-blue-600 transition-colors">Find answers to common questions</p>
                    </div>
                  </button>
                  
                  <button onClick={() => {}} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Report a Bug</h4>
                      <p className="text-xs text-slate-500 font-medium group-hover:text-blue-600 transition-colors">Help us improve the app</p>
                    </div>
                  </button>
                </div>

                <button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Close
                </button>
              </>
            ) : modalType === "alert" ? (
              <>
                <h3 className="text-xl font-black text-slate-800 mb-2">{modalTitle}</h3>
                <p className="text-slate-600 mb-6 font-medium">{modalMessage}</p>
                <button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Got it!
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Edit Account</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium text-sm">Update your details.</p>
                <div className="space-y-3 mb-6">
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none font-bold text-slate-800 dark:text-white"
                    placeholder="Your Name"
                  />
                  <input 
                    type="tel" 
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none font-bold text-slate-800 dark:text-white"
                    placeholder="Phone Number"
                  />
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setTempGender("Male")}
                      className={`flex-1 py-3 rounded-xl font-bold border-2 transition-colors flex items-center justify-center gap-2 ${tempGender === 'Male' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      👦 Male
                    </button>
                    <button 
                      onClick={() => setTempGender("Female")}
                      className={`flex-1 py-3 rounded-xl font-bold border-2 transition-colors flex items-center justify-center gap-2 ${tempGender === 'Female' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      👧 Female
                    </button>
                  </div>
                  <input 
                    type="date" 
                    value={tempDob}
                    onChange={(e) => setTempDob(e.target.value)}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
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
          className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden transition-colors"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl">
                <img 
                  src={
                    gender === "Male" 
                      ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(userName)}`
                      : gender === "Female"
                      ? `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(userName)}`
                      : `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(userName)}`
                  } 
                  alt="Profile" 
                  className="w-full h-full object-cover bg-blue-50 dark:bg-blue-900" 
                />
              </div>
              <button onClick={openNameEdit} className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-slate-800 dark:text-white">{userName}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-3">{phone} • {gender}{dob !== "Not set" && dob !== "" ? ` • Born ${dob}` : ''}</p>
              
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
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:border-orange-200 dark:hover:border-orange-500 hover:shadow-md transition-all">
            <Flame className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">{statsData.streak}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Day Streak</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all">
            <Trophy className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">{parseInt(statsData.words) * 15}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total XP</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:border-purple-200 dark:hover:border-purple-500 hover:shadow-md transition-all">
            <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">12</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lessons</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:border-green-200 dark:hover:border-green-500 hover:shadow-md transition-all">
            <Mic className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">92%</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
          </div>
        </motion.div>

        {/* Settings List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-8 transition-colors"
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h3 className="font-black text-slate-800 dark:text-white ml-2">Preferences</h3>
          </div>
          
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            <button 
              onClick={openNameEdit} 
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 dark:text-white">Account Details</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Update your name and phone number</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={openNotificationsEdit} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 dark:text-white">Notifications</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage practice reminders</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={openPrivacyEdit} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 dark:text-white">Privacy & Security</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Password and security settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={toggleTheme} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 dark:text-white">Theme / Appearance</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>

            <button onClick={openHelp} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 dark:text-white">Help & Support</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Get help or contact us</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={handleSignOut} className="w-full bg-white dark:bg-red-500/10 text-red-500 font-bold border-2 border-red-100 dark:border-red-500/30 py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
          <p className="text-center text-slate-400 dark:text-slate-500 text-xs font-bold mt-4 uppercase tracking-widest">SpeakMate App Version 1.0.0</p>
        </motion.div>

      </div>

      <BottomNav />
    </main>
  );
}
