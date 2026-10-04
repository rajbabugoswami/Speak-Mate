"use client";

import { PlayCircle, ArrowRight, Sparkles, BookOpen, Volume2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DailyHighlights() {
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);
  const [isPlayingWord, setIsPlayingWord] = useState(false);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
      {/* Daily Sentence */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Daily Sentence</h3>
        </div>
        
        <p className="text-2xl font-black text-slate-800 mb-2 relative z-10 leading-tight">
          "The journey of a thousand miles begins with a single step."
        </p>
        <p className="text-sm font-bold text-slate-500 mb-6 relative z-10 bg-slate-50 inline-block px-3 py-1.5 rounded-lg border border-slate-100">
          <span className="text-blue-500 mr-2">Meaning:</span>Great things start with small beginnings.
        </p>
        
        <div className="flex items-center gap-3 relative z-10 mt-auto">
          <button 
            onClick={() => speakText("The journey of a thousand miles begins with a single step.", 'sentence')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlayingSentence 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 animate-pulse' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {isPlayingSentence ? <Volume2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
          </button>
          <Link 
            href="/practice"
            className="flex-1 bg-slate-800 text-white font-bold rounded-full py-3 px-6 text-center hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
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
          <h2 className="text-4xl font-black tracking-tight">Resilient</h2>
          <span className="text-white/70 font-medium text-lg mb-1 bg-white/10 px-2 py-0.5 rounded-md">/rɪˈzɪl.i.ənt/</span>
        </div>
        
        <p className="text-white/90 mb-8 font-medium text-lg leading-snug relative z-10 max-w-[90%]">
          Able to withstand or recover quickly from difficult conditions.
        </p>
        
        <div className="flex items-center gap-3 relative z-10 mt-auto">
          <button 
            onClick={() => speakText("Resilient", 'word')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
              isPlayingWord 
                ? 'bg-white text-purple-600 shadow-lg animate-pulse' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }`}
          >
            {isPlayingWord ? <Volume2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={() => speakText("She showed how resilient she was by bouncing back after the failure.", 'word')}
            className="flex-1 bg-white text-purple-700 font-bold rounded-full py-3 px-6 text-center hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Play Example <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
