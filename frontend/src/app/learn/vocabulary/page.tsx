"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Volume2, Check, RefreshCw, ArrowRight, ArrowLeft, BookOpen, Star, Zap, Flame, Trophy, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import vocabData from "@/data/vocabulary.json";

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none z-50"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 600, opacity: 0, rotate: 720 }}
      transition={{ duration: 2, delay, ease: "easeIn" }} />
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    color: ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"][i % 5],
    delay: Math.random() * 0.4, x: Math.random() * 100,
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">{pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}</div>;
}

export default function VocabularyGamePage() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Game state
  const [stars, setStars] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [phase, setPhase] = useState<"learn" | "practice" | "feedback" | "finished">("learn");

  // Practice inputs
  const [userSentence, setUserSentence] = useState("");
  const [feedbackState, setFeedbackState] = useState<"correct" | "almost" | null>(null);

  const currentWord = selectedCategory?.words[currentIndex];

  const playAudio = (text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startCategory = (cat: any) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setPhase("learn");
    setUserSentence("");
    setStreak(0);
  };

  const goNextPhase = () => {
    if (phase === "learn") {
      setPhase("practice");
    }
  };

  const checkSentence = () => {
    if (userSentence.trim().length < 5) return;
    
    // Simple validation (must contain the word)
    const hasWord = userSentence.toLowerCase().includes(currentWord.word.toLowerCase());
    
    if (hasWord) {
      setFeedbackState("correct");
      setStars(s => s + 2);
      setXp(x => x + 20);
      setStreak(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
      speakFeedback("Great job!");
    } else {
      setFeedbackState("almost");
      setStreak(0);
      speakFeedback("Almost. Make sure to use the word in your sentence.");
    }
    setPhase("feedback");
  };

  const speakFeedback = (text: string) => {
    if (typeof window !== "undefined") {
      const u = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  };

  const advanceWord = (retry = false) => {
    if (retry) {
      setPhase("practice");
      setUserSentence("");
      return;
    }
    
    const nextIdx = currentIndex + 1;
    if (nextIdx >= selectedCategory.words.length) {
      setPhase("finished");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    } else {
      setCurrentIndex(nextIdx);
      setPhase("learn");
      setUserSentence("");
    }
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 flex flex-col font-sans" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)" }}>
      <Confetti active={confetti} />
      <Header />
      
      {/* Top Bar - sticky */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="p-2 text-white/60 hover:text-white bg-white/5 rounded-full mr-2">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="text-white font-black text-xl leading-tight">Vocabulary</div>
              <div className="text-emerald-400 text-xs font-bold">Library 📚</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-inner">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">{stars}</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-inner">
              <Zap className="w-4 h-4 text-emerald-400"/><span className="text-white font-black text-sm">{xp} XP</span>
            </div>
            {streak > 1 && (
              <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-inner hidden sm:flex">
                <Flame className="w-4 h-4 text-orange-400"/><span className="text-white font-black text-sm">{streak}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <AnimatePresence mode="wait">
          
          {/* CATEGORY SELECTION */}
          {!selectedCategory && (
            <motion.div key="categories" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden border-b-4 border-emerald-700">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2), transparent 70%)" }} />
                <div className="relative">
                  <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                    <BookOpen className="w-8 h-8" /> Vocabulary Games
                  </h1>
                  <p className="text-emerald-100 font-bold">Pick a category, learn words, and write sentences to earn XP!</p>
                </div>
              </div>

              <div className="grid gap-4">
                {vocabData.map((cat: any, i: number) => (
                  <motion.button key={cat.id} onClick={() => startCategory(cat)}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="bg-white/10 rounded-2xl p-5 shadow-lg border border-white/20 text-left hover:bg-white/15 transition-all flex items-center justify-between group backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-white mb-0.5 group-hover:text-emerald-300 transition-colors">{cat.title}</h2>
                        <p className="text-sm text-white/50 font-medium line-clamp-1">{cat.description}</p>
                        <p className="text-xs font-bold text-emerald-400 mt-1.5 px-2 py-0.5 bg-emerald-500/20 rounded-full inline-block">{cat.words.length} Words</p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-2 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ACTIVE GAMEPLAY */}
          {selectedCategory && phase !== "finished" && currentWord && (
            <motion.div key="gameplay" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-white/50 text-xs font-bold mb-2">
                  <span>Word {currentIndex + 1} of {selectedCategory.words.length}</span>
                  <span className="uppercase text-emerald-400">{selectedCategory.title}</span>
                </div>
                <div className="bg-white/10 rounded-full h-3 border border-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex / selectedCategory.words.length) * 100}%` }}
                    transition={{ duration: 0.5 }} />
                </div>
              </div>

              {/* Card Area */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border-4 border-slate-100 relative">
                
                {/* Learn Phase */}
                <AnimatePresence mode="wait">
                  {phase === "learn" && (
                    <motion.div key="learn" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center">
                      <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        Step 1: Learn
                      </div>
                      <h2 className="text-5xl font-black text-slate-800 mb-2 capitalize">{currentWord.word}</h2>
                      <p className="text-2xl text-emerald-600 font-black mb-6">{currentWord.hindi}</p>
                      
                      <button onClick={() => playAudio(currentWord.word)}
                        className="mx-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 w-16 h-16 rounded-full transition-all shadow-sm mb-6 active:scale-95">
                        <Volume2 className="w-7 h-7" />
                      </button>

                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 text-left">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Meaning</h3>
                        <p className="text-slate-700 font-bold text-lg leading-relaxed">{currentWord.meaning}</p>
                      </div>

                      <button onClick={goNextPhase}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-lg hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                        I got it! Let's Practice <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Practice Phase */}
                  {phase === "practice" && (
                    <motion.div key="practice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="text-center mb-6">
                        <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                          Step 2: Practice
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-1 capitalize">{currentWord.word}</h2>
                        <p className="text-emerald-600 font-bold">{currentWord.hindi}</p>
                      </div>

                      <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl mb-6">
                        <p className="text-amber-800 font-bold mb-3">Write a sentence using the word <span className="font-black text-amber-900 bg-amber-200/50 px-1 rounded">"{currentWord.word}"</span></p>
                        <p className="text-xs text-amber-600 font-bold mb-2">Example: <i>{currentWord.example}</i></p>
                        
                        <textarea 
                          value={userSentence}
                          onChange={(e) => setUserSentence(e.target.value)}
                          placeholder="Type your sentence here..."
                          autoFocus
                          className="w-full bg-white border-2 border-amber-300 rounded-xl p-4 text-slate-700 font-medium focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all min-h-[100px] resize-none"
                        />
                      </div>

                      <button onClick={checkSentence} disabled={userSentence.trim().length < 5}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 shadow-emerald-500/30 shadow-lg">
                        Check Sentence
                      </button>
                    </motion.div>
                  )}

                  {/* Feedback Phase */}
                  {phase === "feedback" && (
                    <motion.div key="feedback" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className={`p-8 rounded-3xl text-center mb-6 border-4 ${feedbackState === "correct" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner ${feedbackState === "correct" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                          {feedbackState === "correct" ? <Check className="w-10 h-10" /> : <RefreshCw className="w-10 h-10" />}
                        </div>
                        <h2 className={`text-3xl font-black mb-2 ${feedbackState === "correct" ? "text-emerald-700" : "text-amber-700"}`}>
                          {feedbackState === "correct" ? "Excellent!" : "Almost there!"}
                        </h2>
                        
                        {feedbackState === "correct" ? (
                          <>
                            <p className="text-emerald-600 font-bold italic mb-4">"{userSentence}"</p>
                            <div className="inline-flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-black text-sm">
                              <Star className="w-4 h-4 fill-emerald-600" /> +2 Stars & 20 XP
                            </div>
                          </>
                        ) : (
                          <p className="text-amber-700 font-medium">Your sentence didn't seem to include the word <b className="text-amber-900">"{currentWord.word}"</b> clearly. Try again!</p>
                        )}
                      </div>

                      {feedbackState === "correct" ? (
                        <button onClick={() => advanceWord(false)}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg shadow-xl shadow-emerald-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                          Next Word <ArrowRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button onClick={() => advanceWord(true)}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg shadow-xl shadow-amber-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                          <RefreshCw className="w-5 h-5" /> Try Again
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* FINISHED STATE */}
          {selectedCategory && phase === "finished" && (
            <motion.div key="finished" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-8 shadow-2xl text-center relative border-4 border-emerald-100">
              
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 mt-4 shadow-lg shadow-emerald-500/30 text-white">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Category Mastered!</h2>
              <p className="text-slate-500 font-bold mb-8">
                You successfully learned and wrote sentences for all {selectedCategory.words.length} words in <span className="text-emerald-600">{selectedCategory.title}</span>.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="text-sm font-black text-amber-700 uppercase">Stars Earned</div>
                  <div className="text-2xl font-black text-amber-500">+{selectedCategory.words.length * 2}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <div className="text-3xl mb-1">⚡</div>
                  <div className="text-sm font-black text-emerald-700 uppercase">XP Earned</div>
                  <div className="text-2xl font-black text-emerald-500">+{selectedCategory.words.length * 20}</div>
                </div>
              </div>

              <button onClick={() => setSelectedCategory(null)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg hover:shadow-lg hover:-translate-y-1 transition-all shadow-emerald-500/30">
                Back to Library <BookOpen className="w-5 h-5" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <BottomNav />
    </main>
  );
}
