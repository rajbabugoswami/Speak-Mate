"use client";

import { PlayCircle, ArrowRight, Sparkles, BookOpen, Volume2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import vocabularyData from "@/data/vocabulary.json";

export default function DailyHighlights() {
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  
  const [dailySentence, setDailySentence] = useState({ text: "The journey of a thousand miles begins with a single step.", meaning: "Great things start with small beginnings." });
  const [wordOfDay, setWordOfDay] = useState({ word: "Resilient", meaning: "Able to withstand or recover quickly from difficult conditions.", example: "She showed how resilient she was by bouncing back after the failure." });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const allWords = vocabularyData.flatMap(cat => cat.words);
      if (allWords.length > 0) {
        // Use today's date as a seed so it remains the same for the entire day
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        const random = (s: number) => {
          let x = Math.sin(s) * 10000;
          return x - Math.floor(x);
        };

        const wordIndex = Math.floor(random(seed) * allWords.length);
        const sentenceIndex = Math.floor(random(seed + 1) * allWords.length);

        const w = allWords[wordIndex];
        const s = allWords[sentenceIndex];

        setWordOfDay({
          word: w.word,
          meaning: w.meaning,
          example: w.example || `Let's learn the word ${w.word}.`
        });

        setDailySentence({
          text: s.example || `A good way to use the word ${s.word}.`,
          meaning: s.hindi || s.meaning
        });
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  const speakText = (text: string, type: 'sentence' | 'word') => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9; // Slightly slower for clear pronunciation
      
      if (type === 'sentence') {
        setIsPlayingSentence(true);
        utterance.onend = () => setIsPlayingSentence(false);
      } else {
        setIsPlayingWord(true);
        utterance.onend = () => setIsPlayingWord(false);
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
      {/* Daily Sentence */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-xl border border-slate-100 dark:border-2 dark:border-slate-700 relative overflow-hidden group hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-lg transition-all dark:transition-colors">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 dark:bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Daily Sentence</h3>
        </div>
        
        <p className="text-2xl font-black text-slate-900 dark:text-white mb-2 relative z-10 leading-tight">
          "{dailySentence.text}"
        </p>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-6 relative z-10 bg-slate-50 dark:bg-[#0f172a] inline-block px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
          <span className="text-blue-600 dark:text-blue-400 mr-2">Meaning:</span>{dailySentence.meaning}
        </p>
        
        <div className="flex items-center gap-3 relative z-10 mt-auto">
          <button 
            onClick={() => speakText(dailySentence.text, 'sentence')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${
              isPlayingSentence 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 animate-pulse border-blue-600 dark:border-blue-500' 
                : 'bg-slate-50 dark:bg-[#0f172a] text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isPlayingSentence ? <Volume2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
          </button>
          <Link 
            href="/practice"
            className="flex-1 bg-slate-900 dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 text-white font-bold dark:font-black rounded-full py-3 px-6 text-center hover:bg-blue-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 transition-colors shadow-md hover:shadow-xl hover:shadow-blue-600/20 dark:shadow-lg"
          >
            Practice Saying This
          </Link>
        </div>
      </div>

      {/* Word of the Day */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-black text-white/90 uppercase tracking-widest">Word of the Day</h3>
        </div>

        <div className="flex items-end gap-3 mb-3 relative z-10">
          <h2 className="text-4xl font-black tracking-tight capitalize">{wordOfDay.word}</h2>
        </div>
        
        <p className="text-white/90 mb-8 font-medium text-lg leading-snug relative z-10 max-w-[90%]">
          {wordOfDay.meaning}
        </p>
        
        <div className="flex items-center gap-3 relative z-10 mt-auto">
          <button 
            onClick={() => speakText(wordOfDay.word, 'word')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
              isPlayingWord 
                ? 'bg-white text-purple-600 shadow-lg animate-pulse' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }`}
          >
            {isPlayingWord ? <Volume2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={() => speakText(wordOfDay.example, 'word')}
            className="flex-1 bg-white text-purple-700 font-bold rounded-full py-3 px-6 text-center hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Play Example <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
