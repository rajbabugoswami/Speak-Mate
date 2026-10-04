"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Mic, Check, AlertTriangle, Zap, Star, Flame, Trophy, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none z-50"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 800, opacity: 0, rotate: 720 }}
      transition={{ duration: 2.5, delay, ease: "easeIn" }} />
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    color: ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"][i % 5],
    delay: Math.random() * 0.5, x: Math.random() * 100,
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">{pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}</div>;
}

const TOPICS = [
  "Describe your favorite movie and why you like it so much.",
  "What is the most interesting place you have ever visited?",
  "If you could have any superpower, what would it be and why?",
  "Talk about a hobby you enjoy doing in your free time.",
  "Describe a person who has had a big impact on your life."
];

export default function ChallengePage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(false);

  // Player stats
  const [xp, setXp] = useState(240);
  const [streak, setStreak] = useState(3);
  const [stars, setStars] = useState(12);

  useEffect(() => {
    // Pick random topic on mount
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRecording) {
      finishChallenge();
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const finishChallenge = () => {
    setIsRecording(false);
    setIsFinished(true);
    
    // Calculate simulated score based on time spent (more time = better score)
    const timeSpent = 60 - timeLeft;
    const calcScore = Math.min(100, Math.floor(40 + (timeSpent * 1.5)));
    setScore(calcScore);
    
    if (calcScore > 60) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
      setXp(x => x + 50);
      setStars(s => s + 3);
      setStreak(s => s + 1);
    }
  };

  const toggleRecording = () => {
    if (!isRecording && !isFinished) {
      setIsRecording(true);
    } else if (isRecording) {
      finishChallenge();
    }
  };

  const resetChallenge = () => {
    setIsRecording(false);
    setIsFinished(false);
    setTimeLeft(60);
    setScore(null);
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Color for the timer circle
  const getTimerColor = () => {
    if (timeLeft > 30) return "text-emerald-400";
    if (timeLeft > 10) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 flex flex-col font-sans" style={{ background: "linear-gradient(135deg, #0f172a, #3b0764, #1e1b4b)" }}>
      <Confetti active={confetti} />
      <Header />
      
      {/* Top Stats Bar */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-black text-xl leading-tight">Challenge</div>
              <div className="text-fuchsia-300 text-xs font-bold">Daily Speaking 🗣️</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-inner">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">{stars}</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-inner">
              <Zap className="w-4 h-4 text-emerald-400"/><span className="text-white font-black text-sm">{xp}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div key="recording" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl relative border-4 border-fuchsia-100 overflow-hidden">
              
              {/* Progress Line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                <motion.div 
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / 60) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>
              
              <div className="text-center mt-4">
                <div className="inline-block bg-fuchsia-100 text-fuchsia-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  60-Second Challenge
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 leading-snug">"{topic}"</h2>

                {/* Animated Timer */}
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-10">
                  {isRecording && (
                    <motion.div className="absolute inset-0 border-8 border-fuchsia-200 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }} />
                  )}
                  <div className={`text-6xl font-black ${getTimerColor()} tabular-nums tracking-tighter`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRecording}
                  className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-colors relative z-10 ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50" 
                      : "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-fuchsia-500/50"
                  }`}
                >
                  {isRecording ? (
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <div className="w-8 h-8 bg-white rounded-sm" />
                    </motion.div>
                  ) : (
                    <Mic className="w-10 h-10" />
                  )}
                </motion.button>
                <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {isRecording ? "Tap square to stop early" : "Tap mic to start recording"}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl relative border-4 border-slate-100">
              
              <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ${
                  (score || 0) >= 60 ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30 text-white" : "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30 text-white"
                }`}>
                  {(score || 0) >= 60 ? <Trophy className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
                </div>
                
                <h2 className="text-3xl font-black text-slate-800 mb-2">
                  {(score || 0) >= 60 ? "Challenge Conquered!" : "Good Try!"}
                </h2>
                <p className="text-slate-500 font-bold">You spoke for {60 - timeLeft} seconds.</p>
              </div>

              {/* Score breakdown */}
              <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-200">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">AI Analysis Score</h3>
                <div className="flex items-end justify-center gap-2 mb-6">
                  <div className={`text-7xl font-black tracking-tighter ${
                    (score || 0) >= 80 ? "text-emerald-500" : (score || 0) >= 60 ? "text-fuchsia-500" : "text-amber-500"
                  }`}>{score}</div>
                  <div className="text-2xl font-bold text-slate-300 mb-2">/ 100</div>
                </div>
                
                <div className="space-y-4">
                  {(score || 0) >= 60 ? (
                    <>
                      <div className="flex items-center gap-3 bg-emerald-100/50 p-3 rounded-2xl">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0"><Check className="w-5 h-5 text-emerald-600" /></div>
                        <div className="font-bold text-emerald-800 text-sm">Great fluency and steady pacing!</div>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="font-bold text-slate-500 text-sm">Vocabulary Usage</span>
                        <span className="font-black text-emerald-500">+10 XP</span>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="font-bold text-slate-500 text-sm">Pronunciation</span>
                        <span className="font-black text-emerald-500">+20 XP</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 bg-amber-100/50 p-3 rounded-2xl">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
                        <div className="font-bold text-amber-800 text-sm">Try to speak a bit longer next time!</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={resetChallenge}
                  className="py-4 rounded-2xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200 transition-colors">
                  Try Again
                </button>
                <button onClick={() => {}} // Could link to next challenge or home
                  className="py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black shadow-lg shadow-fuchsia-500/30 hover:-translate-y-1 transition-all">
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </main>
  );
}
