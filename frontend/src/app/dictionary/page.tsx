"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import BottomNav from "@/components/layout/BottomNav";
import {
  Search, Volume2, Star, Zap, Trophy, BookOpen, Shuffle,
  CheckCircle2, XCircle, RotateCcw, ChevronRight, Heart,
  Flame, Target, X, ChevronLeft, Sparkles, ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────

type DictEntry = { id: number; word: string; hindi: string; meaning: string; example?: string };
type Tab = "search" | "quiz" | "flashcard" | "bookmarks";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function speak(text: string, rate = 0.85) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = rate; u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

// ─── Mini components ──────────────────────────────────────────────────────────

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 600, opacity: 0, rotate: 720 }}
      transition={{ duration: 2, delay, ease: "easeIn" }} />
  );
}
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    color: ["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7","#ec4899"][i % 6],
    delay: Math.random() * 0.4, x: Math.random() * 100,
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">{pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}</div>;
}

// Difficulty pill
function DiffPill({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Easy:   "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    Hard:   "bg-red-100 text-red-700",
  };
  return <span className={`text-xs font-black px-2 py-0.5 rounded-full ${colors[level] ?? colors.Medium}`}>{level}</span>;
}

function diffLevel(word: string): string {
  if (word.length <= 4) return "Easy";
  if (word.length <= 7) return "Medium";
  return "Hard";
}

// ─── Word Card (used in search + bookmarks) ────────────────────────────────────

function WordCard({
  item, bookmarked, onBookmark, xpAward,
}: { item: DictEntry; bookmarked: boolean; onBookmark: () => void; xpAward?: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header row */}
      <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => { setExpanded(e => !e); if (xpAward) xpAward(); }}>
        {/* Letter avatar */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow"
          style={{ background: `hsl(${(item.word.charCodeAt(0) * 13) % 360},65%,55%)` }}>
          {item.word[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-black text-slate-800 capitalize">{item.word}</span>
            <DiffPill level={diffLevel(item.word)} />
          </div>
          <div className="text-indigo-600 font-bold text-sm truncate">{item.hindi}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={e => { e.stopPropagation(); speak(item.word); }}
            className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>
          <button onClick={e => { e.stopPropagation(); onBookmark(); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${bookmarked ? "bg-amber-50 text-amber-500" : "bg-slate-50 text-slate-400 hover:text-amber-400"}`}>
            <Heart className={`w-4 h-4 ${bookmarked ? "fill-amber-400" : ""}`} />
          </button>
          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </div>
      {/* Expanded body */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-wide mb-1">Meaning</div>
                <p className="text-slate-700 font-medium text-sm">{item.meaning}</p>
              </div>
              {item.example && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wide mb-1">Example</div>
                  <p className="text-slate-600 italic text-sm">"{item.example}"</p>
                  <button onClick={() => speak(item.example ?? "")} className="mt-2 flex items-center gap-1 text-xs text-indigo-500 font-bold hover:text-indigo-700">
                    <Volume2 className="w-3 h-3" /> Hear example
                  </button>
                </div>
              )}
              <button onClick={() => speak(`${item.word}. ${item.meaning}`)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-black py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                <Volume2 className="w-4 h-4" /> Hear Full Definition
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── QUIZ COMPONENT ───────────────────────────────────────────────────────────

function QuizMode({
  dictionary, onStars, stars,
}: { dictionary: DictEntry[]; onStars: (s: number, x: number) => void; stars: number }) {
  const [quizType, setQuizType] = useState<"wordToMeaning" | "meaningToWord" | "fillBlank" | null>(null);
  const [pool, setPool] = useState<DictEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<DictEntry[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [fillInput, setFillInput] = useState("");
  const TOTAL = 10;

  const startQuiz = (type: typeof quizType) => {
    if (!type) return;
    const p = shuffle(dictionary).slice(0, TOTAL);
    setPool(p); setQuizType(type); setIdx(0); setScore(0);
    setStreak(0); setLives(3); setDone(false); setSelected(null);
    setIsCorrect(null); setFillInput("");
    makeOptions(p, 0);
  };

  const makeOptions = (p: DictEntry[], i: number) => {
    const correct = p[i];
    const wrong = shuffle(dictionary.filter(d => d.id !== correct.id)).slice(0, 3);
    setOptions(shuffle([correct, ...wrong]));
  };

  const handleAnswer = (item: DictEntry) => {
    if (selected !== null) return;
    const correct = pool[idx];
    const right = item.id === correct.id;
    setSelected(item.id); setIsCorrect(right);
    advance(right, correct);
  };

  const handleFill = () => {
    if (selected !== null) return;
    const correct = pool[idx];
    const right = fillInput.trim().toLowerCase() === correct.word.toLowerCase();
    setSelected(correct.id); setIsCorrect(right);
    advance(right, correct);
  };

  const advance = (right: boolean, correct: DictEntry) => {
    if (right) {
      speak("Correct! " + correct.word);
      setScore(s => s + 1); setStreak(s => s + 1);
      onStars(1, 15); setConfetti(true);
      setTimeout(() => setConfetti(false), 1800);
    } else {
      speak(correct.word + ". " + correct.meaning.substring(0, 40));
      setLives(l => l - 1); setStreak(0);
    }
    setTimeout(() => {
      const next = idx + 1;
      const outOfLives = lives - (right ? 0 : 1) <= 0;
      if (next >= TOTAL || outOfLives) {
        setDone(true);
      } else {
        setIdx(next); makeOptions(pool, next);
        setSelected(null); setIsCorrect(null); setFillInput("");
      }
    }, 1200);
  };

  // Pick quiz type screen
  if (!quizType) return (
    <div className="px-4 max-w-xl mx-auto py-6">
      <h2 className="text-2xl font-black text-white mb-2 text-center">🎮 Quiz Mode</h2>
      <p className="text-purple-200 font-bold text-center mb-6">Pick a challenge!</p>
      <div className="space-y-3">
        {[
          { type:"wordToMeaning" as const, emoji:"📖", title:"Word → Meaning", desc:"See the word, pick its meaning" },
          { type:"meaningToWord" as const, emoji:"🔍", title:"Meaning → Word",  desc:"Read the meaning, find the word" },
          { type:"fillBlank" as const,    emoji:"✍️", title:"Spell It Out",    desc:"Read the meaning, type the word" },
        ].map(q => (
          <motion.button key={q.type} onClick={() => startQuiz(q.type)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-left flex items-center gap-4 hover:bg-white/15 transition-colors">
            <div className="text-4xl shrink-0">{q.emoji}</div>
            <div>
              <div className="text-white font-black text-lg">{q.title}</div>
              <div className="text-purple-200 font-bold text-sm">{q.desc}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40 ml-auto shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );

  // Result screen
  if (done) {
    const pct = Math.round((score / TOTAL) * 100);
    const grade = pct >= 90 ? "🏆 Wordsmith!" : pct >= 70 ? "⭐ Brilliant!" : pct >= 50 ? "👍 Good Try!" : "💪 Keep Practicing!";
    return (
      <div className="flex items-center justify-center px-4 py-8">
        <Confetti active={pct >= 70} />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
          className="bg-white/10 rounded-3xl p-8 max-w-sm w-full text-center border border-white/20">
          <div className="text-6xl mb-3">{pct >= 70 ? "🏆" : "📚"}</div>
          <div className="text-3xl font-black text-white mb-1">{grade}</div>
          <div className="text-xl text-purple-200 mb-4">{score} / {TOTAL} correct</div>
          <div className="relative w-28 h-28 mx-auto mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
              <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="3.5"
                strokeLinecap="round" strokeDasharray={`${pct} 100`}
                initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: `${pct} 100` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white">{pct}%</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setQuizType(null); setDone(false); }}
              className="flex-1 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl text-sm">Change Quiz</button>
            <button onClick={() => startQuiz(quizType)}
              className="flex-1 bg-indigo-600 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4"/> Play Again</button>
          </div>
        </motion.div>
      </div>
    );
  }

  const current = pool[idx];
  const progressPct = (idx / TOTAL) * 100;

  return (
    <div className="px-4 max-w-xl mx-auto">
      <Confetti active={confetti} />
      {/* Bar */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => setQuizType(null)} className="text-white/50 hover:text-white text-sm font-bold flex items-center gap-1">
          <ArrowLeft className="w-4 h-4"/> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">{[...Array(3)].map((_, i) => <span key={i} className={`text-lg ${i < lives ? "" : "opacity-20"}`}>❤️</span>)}</div>
          {streak > 1 && <span className="text-amber-400 font-black text-sm">🔥 {streak}</span>}
          <div className="bg-white/10 rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">{score}</span>
          </div>
        </div>
      </div>
      <div className="bg-white/10 rounded-full h-2.5 mb-5">
        <motion.div className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          animate={{ width: `${progressPct}%` }} transition={{ duration: 0.4 }}/>
      </div>
      <div className="text-xs text-white/40 font-bold text-right mb-3">Q {idx+1} / {TOTAL} · {quizType === "wordToMeaning" ? "Word → Meaning" : quizType === "meaningToWord" ? "Meaning → Word" : "Spell It Out"}</div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          className={`rounded-3xl p-6 text-center mb-5 border transition-all ${
            isCorrect === true ? "bg-emerald-500/20 border-emerald-400" :
            isCorrect === false ? "bg-red-500/20 border-red-400" :
            "bg-white/10 border-white/20"
          }`}>
          {quizType === "wordToMeaning" && (
            <>
              <div className="text-4xl font-black text-white mb-2 capitalize">{current.word}</div>
              <div className="text-indigo-300 font-bold">{current.hindi}</div>
              <button onClick={() => speak(current.word)} className="mt-3 flex items-center gap-1 text-sm text-white/50 font-bold mx-auto hover:text-white/80">
                <Volume2 className="w-3 h-3"/> Hear word
              </button>
              <div className="text-purple-200 font-bold text-sm mt-3">Pick the correct meaning ↓</div>
            </>
          )}
          {quizType === "meaningToWord" && (
            <>
              <div className="text-sm font-black text-white/50 uppercase tracking-wide mb-2">Meaning</div>
              <div className="text-white font-bold text-base leading-relaxed">{current.meaning}</div>
              {current.example && <p className="text-white/40 italic text-xs mt-2">"{current.example}"</p>}
              <div className="text-purple-200 font-bold text-sm mt-3">Which word matches? ↓</div>
            </>
          )}
          {quizType === "fillBlank" && (
            <>
              <div className="text-sm font-black text-white/50 uppercase tracking-wide mb-2">Meaning</div>
              <div className="text-white font-bold text-base leading-relaxed mb-4">{current.meaning}</div>
              <div className="text-purple-200 font-bold text-sm mb-3">Type the English word:</div>
              <input
                value={fillInput}
                onChange={e => setFillInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && fillInput && handleFill()}
                disabled={selected !== null}
                placeholder="Type here..."
                className="w-full bg-white/10 border-2 border-white/30 rounded-xl px-4 py-3 text-white font-black text-lg text-center placeholder-white/30 focus:outline-none focus:border-indigo-400 disabled:opacity-60"
                autoFocus
              />
              {isCorrect === false && (
                <div className="text-red-300 font-bold mt-2 text-sm">Answer: <span className="font-black capitalize">{current.word}</span></div>
              )}
              {selected === null && fillInput.length > 0 && (
                <button onClick={handleFill}
                  className="mt-3 w-full bg-indigo-600 text-white font-black py-3 rounded-xl">✅ Check Answer</button>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* MCQ options */}
      {(quizType === "wordToMeaning" || quizType === "meaningToWord") && (
        <div className="space-y-3">
          {options.map(opt => {
            const isSel = selected === opt.id;
            const isRight = opt.id === current.id;
            let cls = "bg-white/10 border-white/20 text-white hover:bg-white/15";
            if (selected !== null) {
              if (isRight) cls = "bg-emerald-500/25 border-emerald-400 text-emerald-200";
              else if (isSel) cls = "bg-red-500/25 border-red-400 text-red-200";
              else cls = "bg-white/5 border-white/10 text-white/25";
            }
            return (
              <button key={opt.id} onClick={() => handleAnswer(opt)} disabled={selected !== null}
                className={`${cls} border-2 rounded-2xl p-4 font-bold text-sm w-full text-left transition-all flex items-center gap-3`}>
                {selected && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/>}
                {selected && isSel && !isRight && <XCircle className="w-4 h-4 text-red-400 shrink-0"/>}
                <span className="leading-relaxed">
                  {quizType === "wordToMeaning" ? opt.meaning : <span className="font-black capitalize text-base">{opt.word}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── FLASHCARD COMPONENT ─────────────────────────────────────────────────────

function FlashcardMode({
  dictionary, onStars,
}: { dictionary: DictEntry[]; onStars: (s: number, x: number) => void }) {
  const [deck, setDeck] = useState<DictEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const newDeck = useCallback(() => {
    setDeck(shuffle(dictionary).slice(0, 20));
    setIdx(0); setFlipped(false); setKnown(0); setLearning(0); setDone(false);
  }, [dictionary]);

  useEffect(() => { if (dictionary.length > 0) newDeck(); }, [dictionary.length]);

  const respond = (knows: boolean) => {
    if (knows) { setKnown(k => k + 1); onStars(1, 10); setConfetti(true); setTimeout(() => setConfetti(false), 1200); }
    else setLearning(l => l + 1);
    const next = idx + 1;
    if (next >= deck.length) setDone(true);
    else { setIdx(next); setFlipped(false); }
  };

  if (done) return (
    <div className="flex items-center justify-center px-4 py-8">
      <Confetti active={known >= deck.length * 0.7} />
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 rounded-3xl p-8 max-w-sm w-full text-center border border-white/20">
        <div className="text-6xl mb-3">🃏</div>
        <div className="text-3xl font-black text-white mb-2">Deck Complete!</div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-500/20 rounded-2xl p-4 border border-emerald-400/30">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1"/>
            <div className="text-2xl font-black text-emerald-300">{known}</div>
            <div className="text-emerald-400/80 text-xs font-bold">I knew it!</div>
          </div>
          <div className="bg-amber-500/20 rounded-2xl p-4 border border-amber-400/30">
            <BookOpen className="w-6 h-6 text-amber-400 mx-auto mb-1"/>
            <div className="text-2xl font-black text-amber-300">{learning}</div>
            <div className="text-amber-400/80 text-xs font-bold">Still learning</div>
          </div>
        </div>
        <button onClick={newDeck}
          className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">
          <Shuffle className="w-4 h-4"/> New Deck
        </button>
      </motion.div>
    </div>
  );

  if (deck.length === 0) return <div className="text-center text-white/50 py-20">Loading flashcards...</div>;

  const card = deck[idx];
  const progress = (idx / deck.length) * 100;

  return (
    <div className="px-4 max-w-xl mx-auto">
      <Confetti active={confetti} />
      {/* Progress */}
      <div className="flex justify-between text-white/50 text-xs font-bold mb-2">
        <span>Card {idx + 1} / {deck.length}</span>
        <span>✅ {known} known · 📚 {learning} learning</span>
      </div>
      <div className="bg-white/10 rounded-full h-2 mb-6">
        <motion.div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          animate={{ width: `${progress}%` }} />
      </div>
      <p className="text-center text-white/50 font-bold text-sm mb-4">Tap card to reveal • Then mark yourself!</p>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6 cursor-pointer" onClick={() => setFlipped(f => !f)} style={{ perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d", minHeight: "220px" } as any}
          className="relative w-full">
          {/* Front */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}>
            <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">Word</div>
            <div className="text-5xl font-black text-white mb-3 capitalize">{card.word}</div>
            <div className="text-indigo-200 font-bold text-xl">{card.hindi}</div>
            <button onClick={e => { e.stopPropagation(); speak(card.word); }}
              className="mt-4 flex items-center gap-1 text-sm text-white/50 font-bold hover:text-white/80">
              <Volume2 className="w-3 h-3"/> Tap to hear
            </button>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl border border-white/10"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">Meaning</div>
            <p className="text-white font-bold text-base leading-relaxed mb-3">{card.meaning}</p>
            {card.example && <p className="text-white/50 italic text-sm">"{card.example}"</p>}
            <button onClick={e => { e.stopPropagation(); speak(`${card.word}. ${card.meaning}`); }}
              className="mt-3 flex items-center gap-1 text-sm text-white/50 font-bold hover:text-white/80">
              <Volume2 className="w-3 h-3"/> Hear full
            </button>
          </div>
        </motion.div>
      </div>

      {/* Respond buttons */}
      {flipped && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          <button onClick={() => respond(false)}
            className="flex items-center justify-center gap-2 bg-red-500/20 border-2 border-red-400/40 text-red-300 font-black py-4 rounded-2xl hover:bg-red-500/30 transition-colors">
            <XCircle className="w-5 h-5"/> Still Learning
          </button>
          <button onClick={() => respond(true)}
            className="flex items-center justify-center gap-2 bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-300 font-black py-4 rounded-2xl hover:bg-emerald-500/30 transition-colors">
            <CheckCircle2 className="w-5 h-5"/> I Knew It! ⭐
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── MAIN DICTIONARY PAGE ─────────────────────────────────────────────────────

export default function DictionaryPage() {
  const [dictionary, setDictionary] = useState<DictEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("search");
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [results, setResults] = useState<DictEntry[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [stars, setStars] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wotd, setWotd] = useState<DictEntry | null>(null);
  const [wotdFlipped, setWotdFlipped] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetch("/data/dictionary.json")
      .then(r => r.json())
      .then((data: DictEntry[]) => {
        setDictionary(data);
        setResults(data.slice(0, 20));
        // Word of the Day: pick based on today's date
        const dayIndex = new Date().getDate() % data.length;
        setWotd(data[dayIndex]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addStars = useCallback((s: number, x: number) => {
    setStars(prev => prev + s); setXp(prev => prev + x); setStreak(prev => prev + 1);
  }, []);

  const doSearch = useCallback((val: string, letter?: string) => {
    if (!dictionary.length) return;
    if (letter) {
      setResults(dictionary.filter(d => d.word.toLowerCase().startsWith(letter.toLowerCase())).slice(0, 50));
    } else if (!val.trim()) {
      setResults(dictionary.slice(0, 20));
    } else {
      const v = val.toLowerCase();
      const out: DictEntry[] = [];
      for (const item of dictionary) {
        if (out.length >= 50) break;
        if (item.word.toLowerCase().includes(v) || item.hindi.includes(val) || item.meaning.toLowerCase().includes(v)) {
          out.push(item);
        }
      }
      setResults(out);
    }
  }, [dictionary]);

  const toggleBookmark = useCallback((id: number) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else { next.add(id); addStars(1, 5); }
      return next;
    });
  }, [addStars]);

  const bookmarkedWords = dictionary.filter(d => bookmarks.has(d.id));

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen pb-24" style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81 50%,#4c1d95)" }}>
      <Confetti active={confetti} />

      {/* ── HEADER ─── */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(30,27,75,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <div className="text-white font-black text-xl">Dictionary</div>
                <div className="text-purple-300 text-xs font-bold">Curated Words · शब्दकोश</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">{stars}</span>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400"/><span className="text-white font-black text-sm">{xp}</span>
              </div>
              {streak > 2 && (
                <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400"/><span className="text-white font-black text-sm">{streak}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/10 rounded-2xl p-1">
            {(["search","quiz","flashcard","bookmarks"] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 px-2 rounded-xl font-black text-xs capitalize transition-all ${
                  tab === t ? "bg-white text-indigo-800 shadow" : "text-white/60 hover:text-white"
                }`}>
                {t === "search" ? "🔍 Search" : t === "quiz" ? "🎮 Quiz" : t === "flashcard" ? "🃏 Cards" : `❤️ Saved (${bookmarks.size})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5">

        {/* ── SEARCH TAB ─── */}
        {tab === "search" && (
          <div>
            {/* Word of the Day */}
            {wotd && !loading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-5 border-b-4 border-orange-700 shadow-2xl cursor-pointer overflow-hidden relative"
                onClick={() => { setWotdFlipped(f => !f); if (!wotdFlipped) { addStars(1, 10); setConfetti(true); setTimeout(() => setConfetti(false), 1800); speak(wotd.word); } }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 50%,rgba(255,255,255,0.15),transparent 60%)" }}/>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-200"/>
                    <span className="text-amber-200 font-black text-xs uppercase tracking-widest">Word of the Day</span>
                    <span className="ml-auto text-amber-200/70 text-xs font-bold">Tap to reveal ↓</span>
                  </div>
                  <div className="text-4xl font-black text-white capitalize mb-1">{wotd.word}</div>
                  <div className="text-amber-100 font-bold">{wotd.hindi}</div>
                  <AnimatePresence>
                    {wotdFlipped && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-white/20 overflow-hidden">
                        <p className="text-white font-bold text-sm">{wotd.meaning}</p>
                        {wotd.example && <p className="text-amber-100/70 italic text-xs mt-1">"{wotd.example}"</p>}
                        <div className="text-amber-200/80 text-xs font-bold mt-2">⭐ +10 XP earned!</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Search box */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5"/>
              <input ref={searchRef} value={query}
                onChange={e => { setQuery(e.target.value); setActiveLetter(null); doSearch(e.target.value); }}
                placeholder={loading ? "Loading dictionary..." : "Search English or Hindi..."}
                disabled={loading}
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white font-bold placeholder-white/30 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
              />
              {query && <button onClick={() => { setQuery(""); doSearch(""); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><X className="w-4 h-4"/></button>}
            </div>

            {/* A-Z filter */}
            <div className="overflow-x-auto pb-3 mb-4">
              <div className="flex gap-1.5 min-w-max">
                <button onClick={() => { setActiveLetter(null); setQuery(""); doSearch(""); }}
                  className={`px-4 py-2 rounded-xl font-black text-sm transition-all ${activeLetter === null && !query ? "bg-white text-indigo-800 shadow" : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"}`}>
                  All
                </button>
                {ALPHABETS.map(l => (
                  <button key={l} onClick={() => { setActiveLetter(l); setQuery(""); doSearch("", l); }}
                    className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center transition-all ${activeLetter === l ? "bg-white text-indigo-800 shadow" : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="flex flex-col items-center py-16 text-white/50">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"/>
                <div className="font-bold">Loading dictionary...</div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
                <div className="text-5xl mb-4">🔍</div>
                <div className="text-white font-black text-xl mb-2">No results found</div>
                <div className="text-white/50 font-bold">Try a different spelling or Hindi word</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-white/40 font-bold text-xs">{results.length} words found {activeLetter ? `starting with "${activeLetter}"` : query ? `for "${query}"` : "(showing first 20)"}</div>
                {results.map(item => (
                  <WordCard key={item.id} item={item} bookmarked={bookmarks.has(item.id)}
                    onBookmark={() => toggleBookmark(item.id)}
                    xpAward={() => addStars(0, 2)} />
                ))}
                {results.length >= 50 && (
                  <div className="text-center text-white/40 font-bold text-sm py-4">Showing first 50 — refine your search for more</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── QUIZ TAB ─── */}
        {tab === "quiz" && !loading && (
          <QuizMode dictionary={dictionary} onStars={addStars} stars={stars} />
        )}

        {/* ── FLASHCARD TAB ─── */}
        {tab === "flashcard" && !loading && (
          <FlashcardMode dictionary={dictionary} onStars={addStars} />
        )}

        {/* ── BOOKMARKS TAB ─── */}
        {tab === "bookmarks" && (
          <div>
            {bookmarkedWords.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                <div className="text-5xl mb-4">❤️</div>
                <div className="text-white font-black text-xl mb-2">No saved words yet!</div>
                <div className="text-white/50 font-bold mb-4">Tap ❤️ on any word in Search to save it here</div>
                <button onClick={() => setTab("search")} className="bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl">
                  Browse Dictionary
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 font-bold text-sm">{bookmarkedWords.length} saved words</div>
                  <button onClick={() => { startQuizFromBookmarks(); }} className="text-indigo-300 font-black text-sm flex items-center gap-1">
                    <Target className="w-4 h-4"/> Quiz these words
                  </button>
                </div>
                {bookmarkedWords.map(item => (
                  <WordCard key={item.id} item={item} bookmarked={true}
                    onBookmark={() => toggleBookmark(item.id)} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      <BottomNav />
    </main>
  );

  function startQuizFromBookmarks() {
    setTab("quiz");
  }
}
