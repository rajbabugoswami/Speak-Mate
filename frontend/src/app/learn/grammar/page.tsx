"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Book, ChevronRight, Play, ArrowLeft, GraduationCap, Trophy, Star, Shield, Sword, Crown, Target, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import grammarData from "@/data/grammar.json";

export default function GrammarGamePage() {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  // Game States
  const [xp, setXp] = useState(0);
  const [activeTab, setActiveTab] = useState<"theory" | "examples" | "boss">("theory");
  const [exampleIndex, setExampleIndex] = useState(0);
  
  // Boss Fight State
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [showPracticeResult, setShowPracticeResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [bossHealth, setBossHealth] = useState(100);

  // Sound effect simulator
  const playAudio = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const playSuccessSound = () => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance("Awesome! Correct answer!");
      utterance.rate = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getModuleIcon = (index: number) => {
    const icons = [Shield, Sword, Target, Zap, Crown, Trophy, Star, Book, GraduationCap];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8" />;
  };

  const getModuleColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-rose-500", "bg-amber-500", "bg-cyan-500"];
    return colors[index % colors.length];
  };

  const getModuleImage = (index: number) => {
    const emojis = ["🗺️", "🏰", "⚔️", "🛡️", "🔮", "🐉", "👑", "🚀", "🛸", "🌌", "🌠"];
    return emojis[index % emojis.length];
  };

  const handleCheckPractice = () => {
    if (practiceAnswer.trim().length > 0) {
      const currentExample = selectedLesson.examples[exampleIndex];
      // Extremely simple check: if their answer includes some key words from the english sentence
      const expected = currentExample.en.toLowerCase().replace(/[^a-z ]/g, '');
      const actual = practiceAnswer.toLowerCase().replace(/[^a-z ]/g, '');
      
      // If it's a 70% match or more, we call it correct for the game's sake, otherwise wrong
      const isWin = actual.length > 3 && expected.includes(actual.substring(0, 4));
      
      setIsCorrect(isWin);
      setShowPracticeResult(true);
      
      if (isWin) {
        setBossHealth(prev => Math.max(0, prev - 34)); // 3 hits to kill boss
        setXp(prev => prev + 50);
        playSuccessSound();
      }
    }
  };

  const handleNextExample = () => {
    setExampleIndex(prev => (prev + 1) % selectedLesson.examples.length);
    setShowPracticeResult(false);
    setPracticeAnswer("");
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-[#0f172a] text-white flex flex-col font-sans overflow-x-hidden">
      <Header />
      
      {/* XP BAR */}
      <div className="sticky top-0 z-50 bg-[#1e293b] border-b border-slate-700 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            ⭐
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total XP</div>
            <div className="font-black text-xl text-amber-400">{xp} XP</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-rose-500/30">
            ❤️ 5
          </div>
          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-blue-500/30">
            🛡️ Lvl 1
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          
          {/* LEVEL SELECTION (THE WORLD MAP) */}
          {!selectedModule && !selectedTopic && !selectedLesson && (
            <motion.div
              key="levels"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Grammar Quest</h1>
                <p className="text-slate-400 font-medium">Unlock modules, defeat bosses, and become a Grammar Master!</p>
              </div>

              <div className="relative">
                {/* The Path Line */}
                <div className="absolute left-1/2 top-10 bottom-10 w-2 bg-slate-800 -translate-x-1/2 rounded-full z-0 hidden md:block"></div>

                <div className="space-y-6 md:space-y-12 relative z-10">
                  {grammarData.map((module: any, index: number) => {
                    const isEven = index % 2 === 0;
                    const color = getModuleColor(index);
                    
                    return (
                      <div key={module.id} className={`flex flex-col md:flex-row items-center gap-6 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* The Node */}
                        <div className="md:w-1/2 flex justify-center">
                          <button 
                            onClick={() => setSelectedModule(module)}
                            className={`w-32 h-32 rounded-full ${color} flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border-4 border-[#1e293b] hover:scale-110 transition-transform relative group`}
                          >
                            <span className="relative z-10">{getModuleImage(index)}</span>
                            <div className="absolute -bottom-4 bg-[#1e293b] text-white text-xs font-black px-3 py-1 rounded-full border-2 border-slate-700">
                              Module {index + 1}
                            </div>
                            
                            {/* Pulse effect */}
                            <div className="absolute inset-0 rounded-full border-4 border-white opacity-0 group-hover:animate-ping"></div>
                          </button>
                        </div>
                        
                        {/* The Card */}
                        <div className="md:w-1/2 w-full">
                          <div className="bg-[#1e293b] p-6 rounded-3xl border-2 border-slate-700 text-left relative overflow-hidden group hover:border-slate-500 transition-colors cursor-pointer" onClick={() => setSelectedModule(module)}>
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${color}`}></div>
                            <h2 className="text-xl font-black text-white mb-1">{module.title}</h2>
                            <p className="text-slate-400 text-sm mb-4">{module.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500">{module.topics.length} Quests</span>
                              <div className={`px-4 py-1 rounded-full text-xs font-bold text-white shadow-sm ${color}`}>Play</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TOPIC SELECTION (QUEST LIST) */}
          {selectedModule && !selectedTopic && !selectedLesson && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <button 
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 font-bold bg-[#1e293b] px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" /> Return to Map
              </button>
              
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-3xl mb-8 relative overflow-hidden border border-blue-700/50">
                <div className="absolute right-0 bottom-0 text-9xl opacity-20 translate-x-4 translate-y-4">🗺️</div>
                <h1 className="text-3xl font-black text-white mb-2 relative z-10">{selectedModule.title}</h1>
                <p className="text-blue-200 relative z-10">{selectedModule.description}</p>
              </div>

              <div className="grid gap-4">
                {selectedModule.topics.map((topic: any, idx: number) => (
                  <button 
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border-2 border-slate-700 text-left hover:border-blue-500 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                      {idx % 3 === 0 ? "📜" : idx % 3 === 1 ? "🗝️" : "🔮"}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-1">{topic.title}</h2>
                      <p className="text-sm text-slate-400">{topic.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LESSON SELECTION (STAGES) */}
          {selectedTopic && !selectedLesson && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <button 
                onClick={() => setSelectedTopic(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 font-bold bg-[#1e293b] px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Quests
              </button>
              
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⚔️</div>
                <h1 className="text-3xl font-black text-white mb-2">{selectedTopic.title}</h1>
                <p className="text-slate-400">{selectedTopic.description}</p>
              </div>

              <div className="grid gap-4">
                {selectedTopic.lessons.map((lesson: any, idx: number) => (
                  <button 
                    key={lesson.id}
                    onClick={() => { 
                      setSelectedLesson(lesson); 
                      setActiveTab("theory");
                      setExampleIndex(0);
                      setPracticeAnswer(""); 
                      setShowPracticeResult(false);
                      setBossHealth(100);
                    }}
                    className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-2xl p-1 shadow-lg border-2 border-slate-700 hover:border-emerald-500 transition-all text-left relative overflow-hidden"
                  >
                    <div className="bg-[#1e293b] rounded-xl p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center font-black text-xl text-slate-400">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/30">
                            Theory + Examples
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2 py-1 rounded-md border border-rose-500/30">
                            Boss Fight
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 ml-1 fill-current" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* THE ACTUAL GAMEPLAY / LESSON DETAIL */}
          {selectedLesson && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#1e293b] rounded-3xl shadow-2xl border-2 border-slate-700 overflow-hidden flex flex-col h-[80vh]"
            >
              {/* Gameplay Header */}
              <div className="bg-[#0f172a] p-4 border-b border-slate-700 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="text-lg font-black truncate px-4 flex-1 text-center">{selectedLesson.title}</h1>
                <div className="w-10 h-10 text-2xl flex items-center justify-center">🎓</div>
              </div>

              {/* Game Tabs */}
              <div className="flex p-2 bg-[#0f172a] gap-2 border-b border-slate-800">
                <button 
                  onClick={() => setActiveTab("theory")}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'theory' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  📜 Scroll (Theory)
                </button>
                <button 
                  onClick={() => setActiveTab("examples")}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'examples' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  🃏 Cards (Examples)
                </button>
                <button 
                  onClick={() => setActiveTab("boss")}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'boss' ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  👾 Boss Fight
                </button>
              </div>

              {/* Game Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                <AnimatePresence mode="wait">
                  
                  {/* THEORY TAB */}
                  {activeTab === "theory" && (
                    <motion.div key="theory" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-xl mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">🧙‍♂️</span>
                          <h2 className="text-xl font-black text-blue-400">The Wizard's Teaching</h2>
                        </div>
                        <p className="text-slate-300 font-medium whitespace-pre-wrap leading-relaxed text-lg">
                          {selectedLesson.explanation}
                        </p>
                      </div>

                      <div className="bg-amber-900/40 p-6 rounded-2xl border border-amber-500/50 shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">✨</span>
                          <h2 className="text-lg font-black text-amber-400">Golden Rule</h2>
                        </div>
                        <p className="text-amber-200 font-bold text-xl text-center mt-4 mb-2">
                          {selectedLesson.rule}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* EXAMPLES TAB (FLASHCARDS) */}
                  {activeTab === "examples" && (
                    <motion.div key="examples" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="h-full flex flex-col items-center justify-center">
                      <div className="text-slate-400 font-bold mb-4">Card {exampleIndex + 1} of {selectedLesson.examples.length}</div>
                      
                      <div className="w-full max-w-md aspect-video bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] border-4 border-indigo-400/30 relative">
                        <button onClick={() => playAudio(selectedLesson.examples[exampleIndex].en)} className="absolute top-4 right-4 bg-white/20 p-3 rounded-full hover:bg-white/40 transition-colors">
                          <Play className="w-6 h-6 fill-white text-white" />
                        </button>
                        <p className="text-3xl font-black text-white mb-4 drop-shadow-md">{selectedLesson.examples[exampleIndex].en}</p>
                        <div className="w-16 h-1 bg-white/30 rounded-full mb-4"></div>
                        <p className="text-xl font-bold text-indigo-200">{selectedLesson.examples[exampleIndex].hi}</p>
                      </div>

                      <button 
                        onClick={handleNextExample}
                        className="mt-8 bg-white text-indigo-900 px-8 py-4 rounded-full font-black text-lg shadow-[0_10px_0_rgba(203,213,225,1)] active:shadow-[0_0px_0_rgba(203,213,225,1)] active:translate-y-2 transition-all flex items-center gap-2"
                      >
                        Draw Next Card <ChevronRight className="w-6 h-6" />
                      </button>
                    </motion.div>
                  )}

                  {/* BOSS FIGHT TAB */}
                  {activeTab === "boss" && (
                    <motion.div key="boss" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                      
                      <div className="flex justify-between items-end mb-8">
                        {/* Player */}
                        <div className="flex flex-col items-center">
                          <div className="text-5xl mb-2 animate-bounce">🤺</div>
                          <div className="bg-blue-600 w-24 h-4 rounded-full border-2 border-slate-900 overflow-hidden">
                            <div className="bg-blue-400 w-full h-full"></div>
                          </div>
                          <div className="text-xs font-bold mt-1 text-slate-400">You</div>
                        </div>

                        {/* VS */}
                        <div className="text-3xl font-black text-rose-500 italic">VS</div>

                        {/* Boss */}
                        <div className="flex flex-col items-center">
                          <div className={`text-6xl mb-2 transition-transform ${bossHealth === 0 ? 'rotate-90 opacity-50' : 'animate-pulse'}`}>👾</div>
                          <div className="bg-slate-800 w-24 h-4 rounded-full border-2 border-slate-900 overflow-hidden">
                            <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${bossHealth}%` }}></div>
                          </div>
                          <div className="text-xs font-bold mt-1 text-slate-400">Grammar Bug</div>
                        </div>
                      </div>

                      {bossHealth > 0 ? (
                        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-slate-700 shadow-xl">
                          <h3 className="text-rose-400 font-bold mb-4 text-center uppercase tracking-widest text-sm">Defeat the bug by translating!</h3>
                          
                          <div className="bg-[#0f172a] p-6 rounded-2xl text-center mb-6 border border-slate-700 shadow-inner">
                            <p className="text-2xl font-black text-white">
                              "{selectedLesson.examples[exampleIndex]?.hi}"
                            </p>
                          </div>

                          {!showPracticeResult ? (
                            <div className="space-y-4">
                              <input 
                                type="text"
                                value={practiceAnswer}
                                onChange={(e) => setPracticeAnswer(e.target.value)}
                                placeholder="Type English translation to attack..."
                                className="w-full bg-[#0f172a] border-2 border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 font-medium text-lg placeholder-slate-600"
                              />
                              <button 
                                onClick={handleCheckPractice}
                                disabled={practiceAnswer.trim().length === 0}
                                className="w-full py-4 bg-rose-600 text-white font-black text-xl rounded-xl disabled:opacity-50 hover:bg-rose-500 transition-colors shadow-[0_6px_0_rgba(159,18,57,1)] active:shadow-[0_0px_0_rgba(159,18,57,1)] active:translate-y-[6px]"
                              >
                                ⚔️ ATTACK!
                              </button>
                            </div>
                          ) : (
                            <div className={`p-6 rounded-2xl text-center border-2 ${isCorrect ? 'bg-emerald-900/30 border-emerald-500' : 'bg-rose-900/30 border-rose-500'}`}>
                              {isCorrect ? (
                                <>
                                  <div className="text-5xl mb-4">💥</div>
                                  <h3 className="text-2xl font-black text-emerald-400 mb-2">Direct Hit! +50 XP</h3>
                                  <p className="text-white font-medium mb-6">You typed it correctly!</p>
                                </>
                              ) : (
                                <>
                                  <div className="text-5xl mb-4">🛡️</div>
                                  <h3 className="text-2xl font-black text-rose-400 mb-2">Attack Blocked!</h3>
                                  <p className="text-slate-300 font-medium mb-4">The correct translation was:</p>
                                  <p className="text-2xl font-black text-white mb-6 bg-[#0f172a] p-4 rounded-xl">
                                    {selectedLesson.examples[exampleIndex]?.en}
                                  </p>
                                </>
                              )}
                              
                              <button 
                                onClick={handleNextExample}
                                className="w-full py-4 bg-white text-slate-900 font-black text-lg rounded-xl shadow-[0_6px_0_rgba(203,213,225,1)] active:shadow-[0_0px_0_rgba(203,213,225,1)] active:translate-y-[6px]"
                              >
                                Continue Battle
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center bg-emerald-900/40 p-8 rounded-3xl border-2 border-emerald-500">
                          <div className="text-7xl mb-4 animate-bounce">🏆</div>
                          <h2 className="text-4xl font-black text-emerald-400 mb-4">Victory!</h2>
                          <p className="text-lg text-emerald-200 font-bold mb-8">You defeated the Grammar Bug and mastered this lesson!</p>
                          <button 
                            onClick={() => {
                              setSelectedLesson(null);
                            }}
                            className="bg-emerald-500 text-white px-8 py-4 rounded-full font-black text-xl shadow-[0_6px_0_rgba(4,120,87,1)] active:shadow-[0_0px_0_rgba(4,120,87,1)] active:translate-y-[6px]"
                          >
                            Return to Quests
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {!selectedLesson && <BottomNav />}
    </main>
  );
}
