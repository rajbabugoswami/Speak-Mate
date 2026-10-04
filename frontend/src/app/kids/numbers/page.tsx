"use client";

import { useState, useCallback } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { ArrowLeft, Star, Trophy, Zap, CheckCircle2, XCircle, RotateCcw, Home, Volume2, ChevronRight, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import numbersData from "@/data/numbers.json";

// ── Types ─────────────────────────────────────────────────────────────────────

type NumberItem = { num: number; word: string; hi: string };
type GameMode   = "home" | "learn" | "quiz" | "result";
type Level      = { id: string; label: string; emoji: string; from: number; to: number; color: string; dark: string };

const allNumbers: NumberItem[] = numbersData as NumberItem[];

const levels: Level[] = [
  { id: "l1",  label: "1 – 10",    emoji: "🔢", from: 1,   to: 10,  color: "#f43f5e", dark: "#e11d48" },
  { id: "l2",  label: "11 – 20",   emoji: "🔟", from: 11,  to: 20,  color: "#f97316", dark: "#ea580c" },
  { id: "l3",  label: "21 – 30",   emoji: "🔣", from: 21,  to: 30,  color: "#f59e0b", dark: "#d97706" },
  { id: "l4",  label: "31 – 50",   emoji: "5️⃣0️⃣", from: 31, to: 50, color: "#10b981", dark: "#059669" },
  { id: "l5",  label: "51 – 70",   emoji: "7️⃣0️⃣", from: 51, to: 70, color: "#3b82f6", dark: "#2563eb" },
  { id: "l6",  label: "71 – 100",  emoji: "💯", from: 71,  to: 100, color: "#8b5cf6", dark: "#7c3aed" },
];

// Extra special numbers
const specialNumbers: NumberItem[] = [
  { num: 0,    word: "Zero",       hi: "शून्य" },
  { num: 100,  word: "Hundred",    hi: "सौ" },
  { num: 1000, word: "Thousand",   hi: "हज़ार" },
  { num: 10000,word: "Ten Thousand",hi:"दस हज़ार" },
  { num: 100000,word:"Lakh",       hi: "लाख" },
  { num: 1000000,word:"Million",   hi: "दस लाख" },
];

const ordinals: { num: string; word: string; hi: string }[] = [
  { num:"1st", word:"First",       hi:"पहला" },
  { num:"2nd", word:"Second",      hi:"दूसरा" },
  { num:"3rd", word:"Third",       hi:"तीसरा" },
  { num:"4th", word:"Fourth",      hi:"चौथा" },
  { num:"5th", word:"Fifth",       hi:"पाँचवाँ" },
  { num:"6th", word:"Sixth",       hi:"छठा" },
  { num:"7th", word:"Seventh",     hi:"सातवाँ" },
  { num:"8th", word:"Eighth",      hi:"आठवाँ" },
  { num:"9th", word:"Ninth",       hi:"नौवाँ" },
  { num:"10th",word:"Tenth",       hi:"दसवाँ" },
  { num:"11th",word:"Eleventh",    hi:"ग्यारहवाँ" },
  { num:"12th",word:"Twelfth",     hi:"बारहवाँ" },
  { num:"20th",word:"Twentieth",   hi:"बीसवाँ" },
  { num:"50th",word:"Fiftieth",    hi:"पचासवाँ" },
  { num:"100th",word:"Hundredth",  hi:"सौवाँ" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function getLevelNumbers(level: Level): NumberItem[] {
  return allNumbers.filter(n => n.num >= level.from && n.num <= level.to);
}

function generateQuiz(pool: NumberItem[], correct: NumberItem): NumberItem[] {
  const wrong = shuffle(pool.filter(n => n.num !== correct.num)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

// ── Mini components ──────────────────────────────────────────────────────────

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 600, opacity: 0, rotate: 720 }}
      transition={{ duration: 1.8, delay, ease: "easeIn" }} />
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    color: ["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7","#ec4899"][i % 6],
    delay: Math.random() * 0.4, x: Math.random() * 100,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}
    </div>
  );
}

function Mascot({ mood }: { mood: "happy" | "thinking" | "celebrate" }) {
  const face = mood === "celebrate" ? "🎉" : mood === "happy" ? "🦉" : "🤔";
  return (
    <motion.div className="text-4xl select-none"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
      {face}
    </motion.div>
  );
}

// ── Number Card ───────────────────────────────────────────────────────────────

function NumberCard({
  item, learned, color, onClick
}: { item: NumberItem; learned: boolean; color: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.92 }}
      className={`relative bg-white rounded-3xl p-4 flex flex-col items-center shadow-md border-b-4 transition-all ${learned ? "ring-2" : ""}`}
      style={{ borderBottomColor: learned ? color : "#e2e8f0" }}>
      {learned && (
        <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle2 className="w-4 h-4" style={{ color }} />
        </motion.div>
      )}
      {/* Big digit */}
      <div className="text-5xl md:text-6xl font-black mb-1" style={{ color }}>
        {item.num}
      </div>
      {/* English word */}
      <div className="text-base font-black text-slate-800 text-center leading-tight">{item.word}</div>
      {/* Hindi */}
      <div className="text-sm font-bold mt-1" style={{ color }}>{item.hi}</div>
      {!learned && (
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 font-bold">
          <Volume2 className="w-3 h-3" /> tap
        </div>
      )}
    </motion.button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function NumbersPage() {
  // Navigation state
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeTab, setActiveTab] = useState<"levels" | "special" | "ordinals">("levels");
  const [gameMode, setGameMode] = useState<GameMode>("home");

  // Progress
  const [stars, setStars] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [learnedSet, setLearnedSet] = useState<Set<number>>(new Set());

  // Quiz state
  const [quizPool, setQuizPool] = useState<NumberItem[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizOptions, setQuizOptions] = useState<NumberItem[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotMood, setMascotMood] = useState<"happy" | "thinking" | "celebrate">("happy");
  const [quizMode, setQuizMode] = useState<"numToWord" | "wordToNum">("numToWord");

  const playAudio = useCallback((text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85; u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const levelNums = activeLevel ? getLevelNumbers(activeLevel) : [];
  const learnedInLevel = levelNums.filter(n => learnedSet.has(n.num)).length;

  // Start learn for a level
  const startLearn = (level: Level) => {
    setActiveLevel(level);
    setGameMode("learn");
  };

  // Start quiz for a level
  const startQuiz = (pool?: NumberItem[]) => {
    const p = pool ?? shuffle(levelNums).slice(0, Math.min(10, levelNums.length));
    setQuizPool(p);
    setQuizIdx(0); setQuizScore(0);
    setSelected(null); setIsCorrect(null);
    setLives(3); setStreak(0);
    setMascotMood("thinking");
    setQuizMode(Math.random() > 0.5 ? "numToWord" : "wordToNum");
    setQuizOptions(generateQuiz(p, p[0]));
    setGameMode("quiz");
  };

  // Learn tap
  const handleLearnTap = (item: NumberItem) => {
    playAudio(item.word + ". " + item.num);
    if (!learnedSet.has(item.num)) {
      setLearnedSet(prev => new Set([...prev, item.num]));
      setStars(s => s + 1);
      setTotalXP(x => x + 10);
    }
  };

  // Quiz answer
  const handleAnswer = (item: NumberItem) => {
    if (selected !== null) return;
    const correct = quizPool[quizIdx];
    const isRight = item.num === correct.num;
    setSelected(item.num);
    setIsCorrect(isRight);
    if (isRight) {
      playAudio("Correct! " + correct.word + " — " + correct.num);
      setQuizScore(s => s + 1);
      setStreak(s => s + 1);
      setStars(s => s + 1);
      setTotalXP(x => x + 15);
      setShowConfetti(true);
      setMascotMood("celebrate");
      setTimeout(() => setShowConfetti(false), 1800);
    } else {
      playAudio(correct.word + ". " + correct.num);
      setLives(l => l - 1);
      setStreak(0);
      setMascotMood("thinking");
    }
    setTimeout(() => {
      const nextIdx = quizIdx + 1;
      const outOfLives = lives - (isRight ? 0 : 1) <= 0;
      if (nextIdx >= quizPool.length || outOfLives) {
        setGameMode("result");
        setMascotMood("celebrate");
      } else {
        setQuizIdx(nextIdx);
        setQuizOptions(generateQuiz(quizPool, quizPool[nextIdx]));
        setSelected(null);
        setIsCorrect(null);
        setMascotMood("thinking");
      }
    }, 1300);
  };

  const goHome = () => { setActiveLevel(null); setGameMode("home"); };

  // ── LEARN SCREEN ─────────────────────────────────────────────────────────────
  if (gameMode === "learn" && activeLevel) {
    return (
      <main className="min-h-screen pb-24" style={{ background: `linear-gradient(160deg,${activeLevel.color}15,${activeLevel.color}05,#f8fafc)` }}>
        <Confetti active={showConfetti} />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/92 backdrop-blur-md border-b-2 border-slate-100 px-4 pt-4 pb-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button onClick={goHome} className="flex items-center gap-2 font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                <Home className="w-4 h-4" /> Levels
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-black text-amber-700 text-sm">{stars}</span>
                </div>
                <button onClick={() => startQuiz()}
                  className="flex items-center gap-2 text-white font-black px-4 py-2 rounded-full shadow-lg text-sm"
                  style={{ background: `linear-gradient(135deg,${activeLevel.color},${activeLevel.dark})` }}>
                  <Gamepad2 className="w-4 h-4" /> Quiz!
                </button>
              </div>
            </div>
            {/* Level info + progress */}
            <div className="flex items-center gap-3">
              <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{ background: `linear-gradient(135deg,${activeLevel.color},${activeLevel.dark})` }}>
                {activeLevel.emoji}
              </div>
              <div className="flex-1">
                <div className="font-black text-lg text-slate-800">Numbers {activeLevel.label}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                    <motion.div className="h-2.5 rounded-full"
                      style={{ background: `linear-gradient(90deg,${activeLevel.color},${activeLevel.dark})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(learnedInLevel / levelNums.length) * 100}%` }}
                      transition={{ duration: 0.5 }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 shrink-0">{learnedInLevel}/{levelNums.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center py-3 text-slate-500 font-bold text-sm">
          👆 Tap each number card to hear it · Earn ⭐ per new number!
        </p>

        {/* Number Cards */}
        <div className="px-4 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-32">
          {levelNums.map((item) => (
            <NumberCard
              key={item.num}
              item={item}
              learned={learnedSet.has(item.num)}
              color={activeLevel.color}
              onClick={() => handleLearnTap(item)}
            />
          ))}
        </div>

        {/* Floating quiz CTA */}
        {learnedInLevel >= Math.min(5, levelNums.length) && (
          <motion.div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30"
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <button onClick={() => startQuiz()}
              className="flex items-center gap-2 text-white font-black text-lg px-8 py-4 rounded-full shadow-2xl animate-bounce"
              style={{ background: `linear-gradient(135deg,${activeLevel.color},${activeLevel.dark})` }}>
              <Trophy className="w-5 h-5" /> 🎯 Play Quiz!
            </button>
          </motion.div>
        )}
        <BottomNav />
      </main>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────────────────────────────────
  if (gameMode === "quiz" && activeLevel && quizPool.length > 0) {
    const current = quizPool[quizIdx];
    const progressPct = (quizIdx / quizPool.length) * 100;

    return (
      <main className="min-h-screen pb-24" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
        <Confetti active={showConfetti} />
        <div className="px-4 pt-5 pb-4">
          <div className="max-w-lg mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setGameMode("learn")} className="text-white/60 hover:text-white flex items-center gap-1 font-bold text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < lives ? "" : "opacity-20"}`}>❤️</span>
                  ))}
                </div>
                <div className="bg-white/10 rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-black">{quizScore}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white/10 rounded-full h-3 mb-1">
              <motion.div className="h-3 rounded-full"
                style={{ background: `linear-gradient(90deg,${activeLevel.color},${activeLevel.dark})` }}
                initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.4 }} />
            </div>
            <div className="flex justify-between text-xs text-white/40 font-bold mb-5">
              <span>Q {quizIdx + 1} / {quizPool.length}</span>
              {streak > 1 && <span className="text-amber-400">🔥 {streak} streak!</span>}
            </div>

            {/* Mascot */}
            <div className="flex items-center gap-3 mb-5">
              <Mascot mood={mascotMood} />
              <div className="bg-white/10 rounded-2xl px-4 py-2 border border-white/20 text-white font-bold text-sm flex-1">
                {isCorrect === true
                  ? `🎉 Yes! ${current.num} = ${current.word}!`
                  : isCorrect === false
                  ? `😅 It was ${current.num} = ${current.word}`
                  : quizMode === "numToWord"
                  ? "👇 Which word matches this number?"
                  : "👇 Which number matches this word?"}
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div key={quizIdx}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                className="bg-white/10 rounded-3xl p-8 text-center mb-5 border border-white/20 backdrop-blur-sm">
                {quizMode === "numToWord" ? (
                  <>
                    <div className="text-8xl font-black mb-2 leading-none" style={{ color: activeLevel.color }}>
                      {current.num}
                    </div>
                    <div className="text-white/50 font-bold">{current.hi}</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-black text-white mb-2">{current.word}</div>
                    <div className="text-xl font-bold" style={{ color: activeLevel.color }}>{current.hi}</div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((opt, i) => {
                const isSel = selected === opt.num;
                const isRight = opt.num === current.num;
                let cls = "bg-white/10 border-white/20 text-white hover:bg-white/15";
                if (selected !== null) {
                  if (isRight) cls = "bg-emerald-500/30 border-emerald-400 text-emerald-200";
                  else if (isSel) cls = "bg-red-500/30 border-red-400 text-red-200";
                  else cls = "bg-white/5 border-white/10 text-white/25";
                }
                return (
                  <motion.button key={i} onClick={() => handleAnswer(opt)}
                    disabled={selected !== null}
                    whileHover={selected === null ? { scale: 1.04 } : {}}
                    whileTap={selected === null ? { scale: 0.96 } : {}}
                    className={`${cls} border-2 rounded-2xl p-4 font-black transition-all flex flex-col items-center justify-center gap-1 min-h-[80px]`}>
                    {selected !== null && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {selected !== null && isSel && !isRight && <XCircle className="w-4 h-4 text-red-400" />}
                    {/* Show digit big when asked for word, show word when asked for digit */}
                    {quizMode === "numToWord" ? (
                      <>
                        <span className="text-lg font-black">{opt.word}</span>
                        <span className="text-xs opacity-70">{opt.hi}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-black" style={selected !== null && isRight ? {} : { color: activeLevel.color }}>
                          {opt.num}
                        </span>
                        <span className="text-xs opacity-70">{opt.hi}</span>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
        <BottomNav />
      </main>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────────
  if (gameMode === "result" && activeLevel) {
    const pct = quizPool.length > 0 ? Math.round((quizScore / quizPool.length) * 100) : 0;
    const grade = pct >= 90 ? "🏆 Champion!" : pct >= 70 ? "⭐ Great Job!" : pct >= 50 ? "👍 Good Try!" : "💪 Keep Practicing!";
    const earnedXP = quizScore * 15;
    return (
      <main className="min-h-screen pb-24 flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)" }}>
        <Confetti active={pct >= 70} />
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full text-center border border-white/20 shadow-2xl"
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.7 }}>
          <Mascot mood="celebrate" />
          <motion.div className="text-4xl font-black text-white mt-4 mb-1"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
            {grade}
          </motion.div>
          <p className="text-white/50 font-bold mb-1">{activeLevel.emoji} {activeLevel.label}</p>
          <div className="text-2xl font-black text-white mb-5">{quizScore} / {quizPool.length} correct</div>

          {/* Score ring */}
          <div className="relative w-28 h-28 mx-auto mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke={activeLevel.color} strokeWidth="3.5"
                strokeLinecap="round" strokeDasharray={`${pct} 100`}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${pct} 100` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black text-white">{pct}%</span>
            </div>
          </div>

          {/* XP */}
          <motion.div className="rounded-2xl px-4 py-3 mb-5 flex items-center justify-center gap-2"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-black text-lg">+{earnedXP} XP Earned!</span>
          </motion.div>

          <div className="flex flex-col gap-3">
            <button onClick={() => startQuiz()}
              className="w-full text-white font-black py-4 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-lg"
              style={{ background: `linear-gradient(135deg,${activeLevel.color},${activeLevel.dark})` }}>
              <RotateCcw className="w-5 h-5" /> Play Again!
            </button>
            <button onClick={() => setGameMode("learn")}
              className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/15 transition-colors">
              <ChevronRight className="w-4 h-4" /> Back to Cards
            </button>
            <button onClick={goHome} className="text-white/50 hover:text-white/80 font-bold py-2 flex items-center justify-center gap-2 transition-colors">
              <Home className="w-4 h-4" /> Choose Level
            </button>
          </div>
        </motion.div>
        <BottomNav />
      </main>
    );
  }

  // ── HOME SCREEN ───────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen pb-24" style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81 50%,#4c1d95)" }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(30,27,75,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-white font-black text-2xl">🔢 Numbers</div>
            <div className="text-purple-300 text-sm font-bold">1 to 100 · गिनती सीखो!</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-black">{stars}</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-black">{totalXP} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto py-6">
        {/* Tab bar */}
        <div className="flex gap-2 mb-6 bg-white/10 rounded-2xl p-1 border border-white/20">
          {(["levels", "special", "ordinals"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-xl font-black text-sm capitalize transition-all ${
                activeTab === tab ? "bg-white text-purple-800 shadow" : "text-white/60 hover:text-white"
              }`}>
              {tab === "levels" ? "🔢 1-100" : tab === "special" ? "💯 Big Numbers" : "🥇 Ordinals"}
            </button>
          ))}
        </div>

        {/* LEVELS TAB */}
        {activeTab === "levels" && (
          <div className="space-y-5">
            {/* Quick all-100 quiz */}
            <motion.button
              onClick={() => {
                const level100 = levels[5]; // use last level's color
                setActiveLevel(levels[0]);
                const pool = shuffle(allNumbers).slice(0, 10);
                setQuizPool(pool); setQuizIdx(0); setQuizScore(0);
                setSelected(null); setIsCorrect(null); setLives(3); setStreak(0);
                setMascotMood("thinking");
                setQuizMode("numToWord");
                setQuizOptions(generateQuiz(pool, pool[0]));
                setGameMode("quiz");
                setActiveLevel({ id:"all", label:"1-100", emoji:"💯", from:1, to:100, color:"#f43f5e", dark:"#e11d48" });
              }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-5 text-white shadow-2xl border-b-4 border-orange-700">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎯</div>
                <div className="text-left">
                  <div className="font-black text-xl">Quick Quiz — All 100!</div>
                  <div className="text-amber-100 font-bold text-sm">Random mix from 1 to 100</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 shrink-0" />
            </motion.button>

            {/* Level cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {levels.map((level, i) => {
                const nums = getLevelNumbers(level);
                const learned = nums.filter(n => learnedSet.has(n.num)).length;
                const pct = Math.round((learned / nums.length) * 100);
                return (
                  <motion.div key={level.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="rounded-3xl p-5 text-white shadow-xl overflow-hidden border-b-4"
                    style={{ background: `linear-gradient(135deg,${level.color},${level.dark})`, borderBottomColor: level.dark }}>
                    {/* Level header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-3xl">{level.emoji}</div>
                        <div>
                          <div className="font-black text-lg">{level.label}</div>
                          <div className="text-white/70 text-xs font-bold">{nums.length} numbers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-lg">{pct}%</div>
                        <div className="text-white/70 text-xs">{learned}/{nums.length} done</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="bg-white/20 rounded-full h-2 mb-4">
                      <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    {/* Preview numbers */}
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {nums.slice(0, 8).map(n => (
                        <span key={n.num} className={`text-xs font-black px-2 py-1 rounded-full ${learnedSet.has(n.num) ? "bg-white/30" : "bg-white/10"}`}>
                          {n.num}
                        </span>
                      ))}
                      {nums.length > 8 && <span className="text-xs font-bold text-white/50 self-center">+{nums.length - 8}</span>}
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button onClick={() => startLearn(level)}
                        className="flex-1 bg-white/20 hover:bg-white/30 font-black py-2.5 rounded-2xl text-sm flex items-center justify-center gap-1.5 transition-colors border border-white/30">
                        📖 Learn
                      </button>
                      <button onClick={() => { setActiveLevel(level); startQuiz(shuffle(nums).slice(0, Math.min(10, nums.length))); }}
                        className="flex-1 bg-white text-gray-800 hover:bg-white/90 font-black py-2.5 rounded-2xl text-sm flex items-center justify-center gap-1.5 transition-colors shadow-md"
                        style={{ color: level.color }}>
                        🎮 Quiz!
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* SPECIAL NUMBERS TAB */}
        {activeTab === "special" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-purple-200 font-bold text-sm text-center mb-4">
              बड़ी गिनतियाँ — Tap to hear!
            </p>
            {specialNumbers.map((item, i) => (
              <motion.button key={item.num}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => { playAudio(item.word + ". " + item.num); }}
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-amber-400 min-w-[80px] text-right"
                    style={{ fontVariantNumeric: "tabular-nums" }}>
                    {item.num.toLocaleString()}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-black text-lg">{item.word}</div>
                    <div className="text-purple-300 font-bold text-sm">{item.hi}</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white/60" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ORDINALS TAB */}
        {activeTab === "ordinals" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-purple-200 font-bold text-sm text-center mb-4">
              क्रमवाचक संख्याएं — Tap to hear!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ordinals.map((item, i) => (
                <motion.button key={item.num}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => playAudio(item.word)}
                  className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-colors text-left">
                  <div className="text-2xl font-black text-blue-300 min-w-[50px] text-center">{item.num}</div>
                  <div>
                    <div className="text-white font-black">{item.word}</div>
                    <div className="text-purple-300 font-bold text-sm">{item.hi}</div>
                  </div>
                  <Volume2 className="w-4 h-4 text-white/40 ml-auto shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
