"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { Star, Zap, Home, RotateCcw, ArrowLeft, CheckCircle2, XCircle, Trophy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const wordPool = [
  { word:"CAT",  hi:"बिल्ली",  img:"🐱" }, { word:"DOG",  hi:"कुत्ता", img:"🐶" },
  { word:"SUN",  hi:"सूरज",    img:"☀️" }, { word:"BUS",  hi:"बस",     img:"🚌" },
  { word:"EGG",  hi:"अंडा",    img:"🥚" }, { word:"ANT",  hi:"चींटी",  img:"🐜" },
  { word:"COW",  hi:"गाय",     img:"🐄" }, { word:"PIG",  hi:"सुअर",   img:"🐷" },
  { word:"HEN",  hi:"मुर्गी",  img:"🐔" }, { word:"FOX",  hi:"लोमड़ी", img:"🦊" },
  { word:"OWL",  hi:"उल्लू",   img:"🦉" }, { word:"BAT",  hi:"चमगादड़",img:"🦇" },
  { word:"MAP",  hi:"नक्शा",   img:"🗺️" }, { word:"CUP",  hi:"कप",     img:"☕" },
  { word:"FAN",  hi:"पंखा",    img:"💨" }, { word:"KEY",  hi:"चाबी",   img:"🔑" },
  { word:"BOX",  hi:"डब्बा",   img:"📦" }, { word:"HAT",  hi:"टोपी",   img:"🎩" },
  { word:"BEE",  hi:"मधुमक्खी",img:"🐝" }, { word:"ICE",  hi:"बर्फ",   img:"🧊" },
  { word:"JAR",  hi:"जार",     img:"🫙" }, { word:"NET",  hi:"जाल",    img:"🥅" },
  { word:"OAR",  hi:"चप्पू",   img:"🚣" }, { word:"PEN",  hi:"कलम",    img:"🖊️" },
  { word:"RAT",  hi:"चूहा",    img:"🐭" }, { word:"SAP",  hi:"रस",     img:"🌿" },
  { word:"TAP",  hi:"नल",      img:"🚰" }, { word:"VAN",  hi:"वैन",    img:"🚐" },
  { word:"WAX",  hi:"मोम",     img:"🕯️" }, { word:"YAK",  hi:"याक",    img:"🐂" },
];

const missingLetterPool = [
  { word:"_AT",  answer:"C", hint:"🐱 बिल्ली", full:"CAT"  },
  { word:"DO_",  answer:"G", hint:"🐶 कुत्ता",  full:"DOG"  },
  { word:"S_N",  answer:"U", hint:"☀️ सूरज",    full:"SUN"  },
  { word:"_GG",  answer:"E", hint:"🥚 अंडा",    full:"EGG"  },
  { word:"AN_",  answer:"T", hint:"🐜 चींटी",   full:"ANT"  },
  { word:"_OX",  answer:"F", hint:"🦊 लोमड़ी",  full:"FOX"  },
  { word:"_WL",  answer:"O", hint:"🦉 उल्लू",   full:"OWL"  },
  { word:"HA_",  answer:"T", hint:"🎩 टोपी",    full:"HAT"  },
  { word:"_EE",  answer:"B", hint:"🐝 मधुमक्खी",full:"BEE"  },
  { word:"IC_",  answer:"E", hint:"🧊 बर्फ",    full:"ICE"  },
  { word:"P_N",  answer:"E", hint:"🖊️ कलम",    full:"PEN"  },
  { word:"_AT",  answer:"R", hint:"🐭 चूहा",    full:"RAT"  },
  { word:"_AN",  answer:"V", hint:"🚐 वैन",     full:"VAN"  },
  { word:"_EY",  answer:"K", hint:"🔑 चाबी",    full:"KEY"  },
  { word:"CU_",  answer:"P", hint:"☕ कप",      full:"CUP"  },
  { word:"_OW",  answer:"C", hint:"🐄 गाय",     full:"COW"  },
  { word:"_AP",  answer:"T", hint:"🚰 नल",      full:"TAP"  },
  { word:"B_X",  answer:"O", hint:"📦 डब्बा",   full:"BOX"  },
  { word:"_EN",  answer:"H", hint:"🐔 मुर्गी",  full:"HEN"  },
  { word:"PI_",  answer:"G", hint:"🐷 सुअर",    full:"PIG"  },
];

const matchPool = [
  { word:"APPLE",    img:"🍎" }, { word:"BANANA",   img:"🍌" },
  { word:"GRAPES",   img:"🍇" }, { word:"MANGO",    img:"🥭" },
  { word:"LION",     img:"🦁" }, { word:"TIGER",    img:"🐅" },
  { word:"ELEPHANT", img:"🐘" }, { word:"MONKEY",   img:"🐒" },
  { word:"CAR",      img:"🚗" }, { word:"TRAIN",    img:"🚆" },
  { word:"ROCKET",   img:"🚀" }, { word:"BICYCLE",  img:"🚲" },
  { word:"PIZZA",    img:"🍕" }, { word:"CAKE",     img:"🎂" },
  { word:"STAR",     img:"⭐" }, { word:"RAINBOW",  img:"🌈" },
];

const sentencePool = [
  { jumbled:["a","cat","is","This"], correct:"This is a cat",   img:"🐱" },
  { jumbled:["big","The","is","elephant"], correct:"The elephant is big", img:"🐘" },
  { jumbled:["runs","The","fast","dog"], correct:"The dog runs fast", img:"🐶" },
  { jumbled:["is","red","The","apple"], correct:"The apple is red", img:"🍎" },
  { jumbled:["can","fly","Birds"], correct:"Birds can fly",      img:"🐦" },
  { jumbled:["is","round","The","sun"], correct:"The sun is round", img:"☀️" },
  { jumbled:["is","cold","Ice"],  correct:"Ice is cold",         img:"🧊" },
  { jumbled:["eat","Cows","grass"], correct:"Cows eat grass",    img:"🐄" },
  { jumbled:["swim","Fish","in","water"], correct:"Fish swim in water", img:"🐟" },
  { jumbled:["shines","The","sun"], correct:"The sun shines",   img:"🌞" },
];

// ─── Types & Helpers ──────────────────────────────────────────────────────────

type PuzzleType = "home" | "scramble" | "missing" | "memory" | "sentence";

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none z-50"
      style={{ left:`${x}%`, backgroundColor:color }}
      initial={{ y:-20, opacity:1, rotate:0 }}
      animate={{ y:600, opacity:0, rotate:720 }}
      transition={{ duration:2, delay, ease:"easeIn" }} />
  );
}
function Confetti({ active }: { active:boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length:28 }, (_, i) => ({
    color:["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7","#ec4899","#06b6d4"][i%7],
    delay:Math.random()*0.4, x:Math.random()*100,
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">{pieces.map((p,i)=><ConfettiPiece key={i} {...p}/>)}</div>;
}

function ScoreBar({ stars, xp }: { stars:number; xp:number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/30 rounded-full px-3 py-1.5">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400"/><span className="text-white font-black text-sm">{stars}</span>
      </div>
      <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1.5">
        <Zap className="w-4 h-4 text-emerald-400"/><span className="text-white font-black text-sm">{xp} XP</span>
      </div>
    </div>
  );
}

// ─── SCRAMBLE PUZZLE ──────────────────────────────────────────────────────────

function ScramblePuzzle({ onBack, onStars }: { onBack:()=>void; onStars:(n:number,xp:number)=>void }) {
  const [pool] = useState(() => shuffle(wordPool).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [chosen, setChosen] = useState<{letter:string; fromIdx:number}[]>([]);
  const [feedback, setFeedback] = useState<"none"|"correct"|"wrong">("none");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => { reset(idx); }, [idx]);

  const reset = (i:number) => {
    setLetters(shuffle(pool[i].word.split("")));
    setChosen([]);
    setFeedback("none");
  };

  const pick = (letter:string, fromIdx:number) => {
    if (feedback !== "none") return;
    const next = [...chosen, { letter, fromIdx }];
    setChosen(next);
    if (next.length === pool[idx].word.length) {
      const formed = next.map(c=>c.letter).join("");
      if (formed === pool[idx].word) {
        setFeedback("correct");
        setScore(s=>s+1);
        setConfetti(true);
        onStars(1, 15);
        setTimeout(()=>setConfetti(false), 1800);
        setTimeout(()=>{ if (idx+1 < pool.length) setIdx(i=>i+1); else setDone(true); }, 1200);
      } else {
        setFeedback("wrong");
        setTimeout(()=>{ setFeedback("none"); setChosen([]); }, 800);
      }
    }
  };

  const removeLast = () => {
    if (chosen.length > 0) setChosen(c=>c.slice(0,-1));
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Confetti active={confetti} />
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring"}}
        className="bg-white/10 rounded-3xl p-8 text-center border border-white/20 max-w-sm w-full">
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-3xl font-black text-white mb-2">Word Scramble Done!</div>
        <div className="text-xl text-purple-200 mb-6">{score} / {pool.length} correct</div>
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl">Back</button>
          <button onClick={()=>{ setIdx(0); setScore(0); setDone(false); }}
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4"/> Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );

  const item = pool[idx];
  const usedIndices = new Set(chosen.map(c=>c.fromIdx));
  const answerDisplay = Array.from({length: item.word.length}, (_, i) => chosen[i]?.letter || "");

  return (
    <div className="px-4 max-w-lg mx-auto">
      <Confetti active={confetti} />
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-white/50 text-sm font-bold">
        <span>Word {idx+1} / {pool.length}</span>
        <span>✅ {score} correct</span>
      </div>
      <div className="bg-white/5 rounded-full h-2 mb-6">
        <div className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500"
          style={{ width:`${(idx/pool.length)*100}%` }} />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}
          className={`rounded-3xl p-8 text-center mb-6 border transition-all ${
            feedback==="correct" ? "bg-emerald-500/20 border-emerald-400" :
            feedback==="wrong"   ? "bg-red-500/20 border-red-400" :
            "bg-white/10 border-white/20"
          }`}>
          <div className="text-7xl mb-4">{item.img}</div>
          <div className="text-purple-300 font-bold text-lg">{item.hi}</div>
          <div className="text-white/50 font-bold text-sm mt-1">Unscramble the letters!</div>

          {/* Answer slots */}
          <div className="flex justify-center gap-2 mt-5 flex-wrap">
            {answerDisplay.map((l,i)=>(
              <div key={i} onClick={removeLast}
                className={`w-12 h-12 rounded-xl border-b-4 flex items-center justify-center text-2xl font-black cursor-pointer transition-all
                  ${l ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/20 text-transparent"}`}>
                {l || "_"}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Letter options */}
      <div className="flex justify-center gap-3 flex-wrap mb-4">
        {letters.map((l, i) => (
          <button key={i} onClick={()=>pick(l,i)} disabled={usedIndices.has(i) || feedback!=="none"}
            className={`w-14 h-14 rounded-2xl border-b-4 text-2xl font-black transition-all ${
              usedIndices.has(i) ? "opacity-20 cursor-not-allowed bg-white/5 border-white/10 text-white/20"
              : "bg-white text-slate-800 border-slate-300 hover:scale-110 active:scale-95 shadow-lg"
            }`}>
            {l}
          </button>
        ))}
      </div>
      <button onClick={()=>setChosen([])} className="w-full text-white/50 font-bold py-2 text-sm">
        🔄 Clear & Retry
      </button>
    </div>
  );
}

// ─── MISSING LETTER PUZZLE ────────────────────────────────────────────────────

function MissingLetterPuzzle({ onBack, onStars }: { onBack:()=>void; onStars:(n:number,xp:number)=>void }) {
  const [pool] = useState(() => shuffle(missingLetterPool).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<"none"|"correct"|"wrong">("none");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(()=>{
    const correct = pool[idx].answer;
    const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const wrong = shuffle(allLetters.filter(l=>l!==correct)).slice(0,3);
    setOptions(shuffle([correct,...wrong]));
    setFeedback("none");
  }, [idx]);

  const pick = (letter:string) => {
    if (feedback!=="none") return;
    const isRight = letter === pool[idx].answer;
    setFeedback(isRight ? "correct" : "wrong");
    if (isRight) {
      setScore(s=>s+1);
      setConfetti(true);
      onStars(1, 12);
      setTimeout(()=>setConfetti(false), 1800);
      setTimeout(()=>{ if (idx+1<pool.length) setIdx(i=>i+1); else setDone(true); }, 1000);
    } else {
      setTimeout(()=>setFeedback("none"), 900);
    }
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring"}}
        className="bg-white/10 rounded-3xl p-8 text-center border border-white/20 max-w-sm w-full">
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-3xl font-black text-white mb-2">All Done!</div>
        <div className="text-xl text-purple-200 mb-6">{score} / {pool.length} correct</div>
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl">Back</button>
          <button onClick={()=>{ setIdx(0); setScore(0); setDone(false); }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4"/> Again
          </button>
        </div>
      </motion.div>
    </div>
  );

  const item = pool[idx];
  const displayWord = item.word.replace("_", `[?]`);

  return (
    <div className="px-4 max-w-lg mx-auto">
      <Confetti active={confetti} />
      <div className="flex justify-between mb-4 text-white/50 text-sm font-bold">
        <span>Q {idx+1} / {pool.length}</span><span>✅ {score}</span>
      </div>
      <div className="bg-white/5 rounded-full h-2 mb-6">
        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all"
          style={{ width:`${(idx/pool.length)*100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
          className={`rounded-3xl p-8 text-center mb-6 border transition-all ${
            feedback==="correct" ? "bg-emerald-500/20 border-emerald-400" :
            feedback==="wrong"   ? "bg-red-500/20 border-red-400" :
            "bg-white/10 border-white/20"
          }`}>
          <div className="text-2xl font-bold text-purple-200 mb-3">{item.hint}</div>
          {/* Word with blank */}
          <div className="flex justify-center gap-2 mb-3">
            {item.word.split("").map((ch, i)=>(
              <div key={i} className={`w-14 h-16 rounded-2xl border-b-4 flex items-center justify-center text-3xl font-black
                ${ch==="_"
                  ? feedback==="correct" ? "bg-emerald-500/40 border-emerald-400 text-emerald-300" : "bg-white/5 border-white/30 text-blue-300"
                  : "bg-white/20 border-white/40 text-white"}`}>
                {ch==="_" ? (feedback==="correct" ? item.answer : "?") : ch}
              </div>
            ))}
          </div>
          <div className="text-white/50 font-bold text-sm">Fill in the missing letter</div>
        </motion.div>
      </AnimatePresence>

      {/* Letter options */}
      <div className="grid grid-cols-4 gap-3">
        {options.map((letter,i)=>(
          <button key={i} onClick={()=>pick(letter)} disabled={feedback!=="none"}
            className={`h-16 rounded-2xl border-b-4 text-2xl font-black transition-all
              ${feedback!=="none" && letter===item.answer ? "bg-emerald-500/30 border-emerald-400 text-emerald-300"
              : feedback!=="none" ? "bg-white/5 border-white/10 text-white/30"
              : "bg-white text-slate-800 border-slate-300 hover:scale-105 active:scale-95 shadow-lg"}`}>
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MEMORY MATCH PUZZLE ──────────────────────────────────────────────────────

type MemCard = { id:number; type:"word"|"emoji"; value:string; matched:boolean; flipped:boolean };

function MemoryMatchPuzzle({ onBack, onStars }: { onBack:()=>void; onStars:(n:number,xp:number)=>void }) {
  const [cards, setCards] = useState<MemCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [locked, setLocked] = useState(false);
  const total = 6;

  const initGame = useCallback(()=>{
    const pairs = shuffle(matchPool).slice(0, total);
    const cardArr: MemCard[] = shuffle([
      ...pairs.map((p,i)=>({ id:i*2, type:"word" as const, value:p.word, matched:false, flipped:false })),
      ...pairs.map((p,i)=>({ id:i*2+1, type:"emoji" as const, value:p.img, matched:false, flipped:false })),
    ]);
    setCards(cardArr);
    setFlipped([]); setMoves(0); setMatched(0); setDone(false); setLocked(false);
  }, []);

  useEffect(()=>{ initGame(); }, []);

  const handleFlip = (card: MemCard) => {
    if (locked || card.flipped || card.matched) return;
    const newFlipped = [...flipped, card.id];
    setCards(cs=>cs.map(c=>c.id===card.id ? {...c,flipped:true}:c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m=>m+1);
      setLocked(true);
      const [a,b] = newFlipped.map(id=>cards.find(c=>c.id===id)!);
      // Check match: one word, one emoji from same pair
      const aBase = Math.floor(a.id/2);
      const bBase = Math.floor(b.id/2);
      if (aBase === bBase && a.type !== b.type) {
        setTimeout(()=>{
          setCards(cs=>cs.map(c=>newFlipped.includes(c.id)?{...c,matched:true}:c));
          setMatched(m=>{
            const nm=m+1;
            if (nm>=total) { setDone(true); setConfetti(true); onStars(3,25); setTimeout(()=>setConfetti(false),2000); }
            return nm;
          });
          setFlipped([]);
          setLocked(false);
        }, 600);
      } else {
        setTimeout(()=>{
          setCards(cs=>cs.map(c=>newFlipped.includes(c.id)?{...c,flipped:false}:c));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="px-4 max-w-lg mx-auto">
      <Confetti active={confetti} />
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/60 font-bold text-sm">Moves: {moves}</span>
        <span className="text-white/60 font-bold text-sm">Matched: {matched}/{total}</span>
        <button onClick={initGame} className="text-white/60 font-bold text-sm flex items-center gap-1"><RotateCcw className="w-3 h-3"/>Reset</button>
      </div>

      {done ? (
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring"}}
          className="bg-white/10 rounded-3xl p-8 text-center border border-white/20">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-3xl font-black text-white mb-2">You matched them all!</div>
          <div className="text-purple-200 font-bold mb-6">Completed in {moves} moves!</div>
          <div className="flex gap-3">
            <button onClick={onBack} className="flex-1 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl">Back</button>
            <button onClick={initGame}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4"/> Play Again
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5">
          {cards.map(card=>(
            <motion.button key={card.id} onClick={()=>handleFlip(card)}
              whileTap={!card.flipped && !card.matched ? {scale:0.92}:{}}
              className={`h-20 rounded-2xl border-2 flex items-center justify-center font-black text-sm transition-all duration-300 ${
                card.matched ? "bg-emerald-500/30 border-emerald-400" :
                card.flipped ? "bg-white border-slate-200 text-slate-800" :
                "bg-white/10 border-white/20 hover:bg-white/15 cursor-pointer"
              }`}>
              <AnimatePresence mode="wait">
                {card.flipped || card.matched ? (
                  <motion.span key="front" initial={{rotateY:90}} animate={{rotateY:0}}
                    className={card.type==="emoji" ? "text-3xl" : "text-xs font-black text-slate-800 text-center px-1 leading-tight"}>
                    {card.value}
                  </motion.span>
                ) : (
                  <motion.span key="back" className="text-2xl">❓</motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      )}
      <p className="text-center text-white/40 text-sm font-bold mt-4">Match each word with its emoji!</p>
    </div>
  );
}

// ─── SENTENCE SCRAMBLE ────────────────────────────────────────────────────────

function SentencePuzzle({ onBack, onStars }: { onBack:()=>void; onStars:(n:number,xp:number)=>void }) {
  const [pool] = useState(() => shuffle(sentencePool).slice(0, 8));
  const [idx, setIdx] = useState(0);
  const [available, setAvailable] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"none"|"correct"|"wrong">("none");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(()=>{
    setAvailable(shuffle([...pool[idx].jumbled]));
    setChosen([]); setFeedback("none");
  }, [idx]);

  const pickWord = (word:string, i:number) => {
    if (feedback!=="none") return;
    setChosen(c=>[...c,word]);
    setAvailable(a=>a.filter((_,ai)=>ai!==i));
  };

  const removeWord = (i:number) => {
    if (feedback!=="none") return;
    const word = chosen[i];
    setChosen(c=>c.filter((_,ci)=>ci!==i));
    setAvailable(a=>[...a, word]);
  };

  const checkAnswer = () => {
    if (chosen.length !== pool[idx].jumbled.length) return;
    const formed = chosen.join(" ");
    const isRight = formed === pool[idx].correct;
    setFeedback(isRight ? "correct" : "wrong");
    if (isRight) {
      setScore(s=>s+1); setConfetti(true); onStars(1,15);
      setTimeout(()=>setConfetti(false),1800);
      setTimeout(()=>{ if (idx+1<pool.length) setIdx(i=>i+1); else setDone(true); },1200);
    } else {
      setTimeout(()=>{
        setFeedback("none");
        setAvailable(shuffle([...pool[idx].jumbled]));
        setChosen([]);
      }, 1000);
    }
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring"}}
        className="bg-white/10 rounded-3xl p-8 text-center border border-white/20 max-w-sm w-full">
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-3xl font-black text-white mb-2">Sentence Master!</div>
        <div className="text-xl text-purple-200 mb-6">{score} / {pool.length} correct</div>
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl">Back</button>
          <button onClick={()=>{ setIdx(0);setScore(0);setDone(false); }}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4"/> Again
          </button>
        </div>
      </motion.div>
    </div>
  );

  const item = pool[idx];
  return (
    <div className="px-4 max-w-lg mx-auto">
      <Confetti active={confetti}/>
      <div className="flex justify-between mb-4 text-white/50 text-sm font-bold">
        <span>Sentence {idx+1}/{pool.length}</span><span>✅ {score}</span>
      </div>
      <div className="bg-white/5 rounded-full h-2 mb-6">
        <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all"
          style={{ width:`${(idx/pool.length)*100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}}
          className={`rounded-3xl p-6 text-center mb-5 border transition-all ${
            feedback==="correct" ? "bg-emerald-500/20 border-emerald-400" :
            feedback==="wrong"   ? "bg-red-500/20 border-red-400" :
            "bg-white/10 border-white/20"
          }`}>
          <div className="text-6xl mb-3">{item.img}</div>
          <div className="text-white/60 font-bold text-sm mb-3">Arrange these words to make a sentence:</div>

          {/* Answer area */}
          <div className="min-h-[52px] bg-white/10 rounded-2xl p-3 flex flex-wrap gap-2 justify-center mb-2 border border-white/20">
            {chosen.length === 0 && <span className="text-white/30 font-bold self-center">Tap words below...</span>}
            {chosen.map((w,i)=>(
              <button key={i} onClick={()=>removeWord(i)}
                className="bg-white text-slate-800 font-black px-3 py-1.5 rounded-xl text-sm shadow hover:bg-slate-100 transition-colors">
                {w}
              </button>
            ))}
          </div>
          {feedback==="correct" && (
            <div className="text-emerald-300 font-bold text-sm">✅ {item.correct}</div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {available.map((w,i)=>(
          <button key={i} onClick={()=>pickWord(w,i)} disabled={feedback!=="none"}
            className="bg-white/10 border border-white/30 text-white font-black px-4 py-2.5 rounded-xl hover:bg-white/20 transition-colors active:scale-95">
            {w}
          </button>
        ))}
      </div>

      {/* Check button */}
      {chosen.length === item.jumbled.length && feedback==="none" && (
        <motion.button onClick={checkAnswer} initial={{scale:0}} animate={{scale:1}}
          whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-4 rounded-2xl text-lg shadow-lg">
          ✅ Check Sentence!
        </motion.button>
      )}
    </div>
  );
}

// ─── MAIN PUZZLES PAGE ────────────────────────────────────────────────────────

export default function PuzzlesPage() {
  const [screen, setScreen] = useState<PuzzleType>("home");
  const [stars, setStars] = useState(0);
  const [xp, setXp] = useState(0);

  const addStars = (n:number, x:number) => { setStars(s=>s+n); setXp(p=>p+x); };

  const puzzles = [
    {
      id: "scramble" as PuzzleType,
      title: "Word Scramble",
      desc: "Unscramble the letters to make a word",
      emoji: "🔤",
      from: "#f43f5e", to: "#fb7185", border: "#e11d48",
    },
    {
      id: "missing" as PuzzleType,
      title: "Missing Letter",
      desc: "Find the missing letter in the word",
      emoji: "❓",
      from: "#3b82f6", to: "#60a5fa", border: "#2563eb",
    },
    {
      id: "memory" as PuzzleType,
      title: "Memory Match",
      desc: "Match each word with its emoji picture",
      emoji: "🃏",
      from: "#10b981", to: "#34d399", border: "#059669",
    },
    {
      id: "sentence" as PuzzleType,
      title: "Sentence Builder",
      desc: "Arrange words to build a correct sentence",
      emoji: "📝",
      from: "#f59e0b", to: "#fbbf24", border: "#d97706",
    },
  ];

  // HOME
  if (screen === "home") return (
    <main className="min-h-screen pb-24" style={{ background:"linear-gradient(135deg,#1e1b4b,#312e81 50%,#4c1d95)" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background:"rgba(30,27,75,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/kids" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5"/>
            </Link>
            <div>
              <div className="text-white font-black text-xl">🧩 Puzzles</div>
              <div className="text-purple-300 text-xs font-bold">पहेलियाँ — Fun brain games!</div>
            </div>
          </div>
          <ScoreBar stars={stars} xp={xp} />
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-8 px-4">
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
          <div className="text-6xl mb-3">🧩</div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Kids Puzzles!</h1>
          <p className="text-purple-200 font-bold">4 fun games · Learn English while playing!</p>
        </motion.div>
      </div>

      {/* Puzzle Cards */}
      <div className="px-4 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 pb-10">
        {puzzles.map((p, i) => (
          <motion.button key={p.id} onClick={()=>setScreen(p.id)}
            initial={{opacity:0,y:30,scale:0.9}} animate={{opacity:1,y:0,scale:1}} transition={{delay:i*0.1}}
            whileHover={{scale:1.04,y:-4}} whileTap={{scale:0.96}}
            className="relative rounded-3xl p-6 text-white shadow-2xl overflow-hidden border-b-4 text-left"
            style={{ background:`linear-gradient(135deg,${p.from},${p.to})`, borderBottomColor:p.border }}>
            <div className="absolute inset-0" style={{background:"radial-gradient(circle at 20% 20%,rgba(255,255,255,0.2),transparent 65%)"}} />
            <div className="text-5xl mb-4">{p.emoji}</div>
            <div className="font-black text-xl mb-1">{p.title}</div>
            <div className="text-white/80 font-bold text-sm">{p.desc}</div>
            <div className="absolute bottom-4 right-4">
              <ChevronRight className="w-5 h-5 text-white/60"/>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Back to Kids Zone */}
      <div className="text-center pb-8">
        <Link href="/kids" className="text-white/50 hover:text-white/80 font-bold transition-colors flex items-center justify-center gap-2">
          <Home className="w-4 h-4"/> Back to Kids Zone
        </Link>
      </div>
      <BottomNav />
    </main>
  );

  // PUZZLE SCREENS
  const puzzleInfo = puzzles.find(p=>p.id===screen)!;
  return (
    <main className="min-h-screen pb-24" style={{ background:"linear-gradient(135deg,#1e1b4b,#312e81 50%,#4c1d95)" }}>
      {/* Puzzle Header */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background:"rgba(30,27,75,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button onClick={()=>setScreen("home")} className="flex items-center gap-2 text-white/60 hover:text-white font-bold transition-colors">
            <ArrowLeft className="w-4 h-4"/> Back
          </button>
          <div className="text-center">
            <div className="text-white font-black">{puzzleInfo.emoji} {puzzleInfo.title}</div>
          </div>
          <ScoreBar stars={stars} xp={xp} />
        </div>
      </div>

      <div className="pt-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
            {screen==="scramble"  && <ScramblePuzzle  onBack={()=>setScreen("home")} onStars={addStars}/>}
            {screen==="missing"   && <MissingLetterPuzzle onBack={()=>setScreen("home")} onStars={addStars}/>}
            {screen==="memory"    && <MemoryMatchPuzzle onBack={()=>setScreen("home")} onStars={addStars}/>}
            {screen==="sentence"  && <SentencePuzzle  onBack={()=>setScreen("home")} onStars={addStars}/>}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav />
    </main>
  );
}
