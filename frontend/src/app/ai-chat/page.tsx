"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Mic, Send, Bot, User, Play, ArrowLeft, Briefcase, Coffee, MessageSquare, Volume2, Sparkles, StopCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  correction?: string;
  explanation?: string;
};

const SCENARIOS = [
  {
    id: "interview",
    title: "Job Interview",
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-blue-600 to-indigo-600",
    desc: "Practice answering common HR interview questions.",
    aiPrompts: [
      "Hello! Welcome to the interview. Could you please start by telling me a little about yourself?",
      "That's great. What would you say is your biggest strength?",
      "Interesting! Where do you see yourself in 5 years?",
      "Why do you want to work for our company?",
      "Thank you for your time. Do you have any questions for me?"
    ]
  },
  {
    id: "coffee",
    title: "Coffee Shop",
    icon: <Coffee className="w-8 h-8" />,
    color: "from-amber-500 to-orange-600",
    desc: "Practice ordering food and casual cafe talk.",
    aiPrompts: [
      "Hi there! Welcome to Star Cafe. What would you like to order today?",
      "Would you like that hot or iced?",
      "Great choice. What size would you like? Small, medium, or large?",
      "Would you like anything to eat with that? We have fresh muffins today.",
      "Your total is $5.50. Will you be paying with cash or card?"
    ]
  },
  {
    id: "casual",
    title: "Casual Chat",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-600",
    desc: "Friendly daily conversation and small talk.",
    aiPrompts: [
      "Hey! How is your day going so far?",
      "That's cool! What do you like to do in your free time?",
      "Oh, I love that too! Have you watched any good movies lately?",
      "Sounds fun! What's your favorite kind of food?",
      "It was really nice talking to you today!"
    ]
  }
];

export default function AIChatPage() {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [xp, setXp] = useState(0);
  
  const [micError, setMicError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-IN'; // Indian English accent recognition

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
              setInputText(prev => prev + " " + finalTranscript);
              setIsListening(false);
            }
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setMicError("Microphone blocked. Please allow permissions.");
          } else {
            setMicError(`Mic error: ${event.error}. Please type your message.`);
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setMicError("Voice recognition not supported in this browser.");
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setMicError("Voice recognition not supported in this browser. Please type.");
      return;
    }
    setMicError("");
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setMicError("Could not start microphone.");
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const startScenario = (scenario: any) => {
    setSelectedScenario(scenario);
    setAiStep(1);
    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: scenario.aiPrompts[0]
      }
    ]);
  };

  const checkGrammar = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("i is")) {
      return { correction: text.replace(/i is/ig, "I am"), exp: "Always use 'am' with 'I'." };
    }
    if (lower.includes("i am agree")) {
      return { correction: text.replace(/i am agree/ig, "I agree"), exp: "'Agree' is a verb. Never say 'am agree'." };
    }
    if (lower.includes("he do")) {
      return { correction: text.replace(/he do/ig, "He does"), exp: "Use 'does' with singular subjects (He/She/It)." };
    }
    if (lower.includes("did not went") || lower.includes("didn't went")) {
      return { correction: text.replace(/did not went/ig, "did not go").replace(/didn't went/ig, "didn't go"), exp: "Always use V1 (base form) after 'did'." };
    }
    if (lower.includes("more better")) {
      return { correction: text.replace(/more better/ig, "better"), exp: "'Better' is already comparative. Don't use 'more' with it." };
    }
    return null;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);
    setXp(prev => prev + 15);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      const grammarCheck = checkGrammar(newUserMsg.text);
      
      if (grammarCheck) {
        // If there's a grammar error, correct it first, then continue conversation
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I got what you mean! But let's look at the grammar quickly. " + (selectedScenario.aiPrompts[aiStep] || "What else?"),
          correction: grammarCheck.correction,
          explanation: grammarCheck.exp
        };
        setAiStep(prev => prev + 1);
      } else {
        // Normal conversation flow
        const nextPrompt = selectedScenario.aiPrompts[aiStep] || "That's wonderful! Can you tell me more?";
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: nextPrompt
        };
        setAiStep(prev => prev + 1);
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Auto-play AI response
      playAudio(aiResponse.text);
      
    }, 1500);
  };

  const playAudio = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="h-screen bg-[#0f172a] flex flex-col font-sans">
      <Header />
      
      {!selectedScenario ? (
        <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl overflow-y-auto pb-24">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Conversation
            </h1>
            <p className="text-slate-400 font-medium">Practice real English conversations with our smart AI Tutor. Use your voice!</p>
          </div>

          <div className="grid gap-6">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => startScenario(scenario)}
                className={`bg-gradient-to-br ${scenario.color} p-[2px] rounded-3xl hover:scale-[1.02] transition-transform text-left group`}
              >
                <div className="bg-[#1e293b] rounded-[22px] p-6 h-full flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    {scenario.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">{scenario.title}</h2>
                    <p className="text-slate-400">{scenario.desc}</p>
                  </div>
                  <div className="ml-auto w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                    <Play className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 container mx-auto px-4 py-4 max-w-3xl flex flex-col h-[calc(100vh-64px)]">
          
          {/* Chat Header */}
          <div className={`bg-gradient-to-r ${selectedScenario.color} rounded-t-3xl p-4 shadow-lg flex items-center justify-between z-10`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedScenario(null)} 
                className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="font-black text-white text-lg">{selectedScenario.title} Mode</h1>
                <p className="text-xs text-white/80 font-bold tracking-widest uppercase">AI Tutor Active</p>
              </div>
            </div>
            
            <div className="bg-black/20 px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-bold text-white">{xp} XP</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 bg-[#1e293b] border-x border-slate-700 p-4 overflow-y-auto flex flex-col gap-6 shadow-inner">
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  msg.sender === "ai" ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                }`}>
                  {msg.sender === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className={`max-w-[80%] flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`p-4 rounded-3xl ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-tr-sm shadow-md" 
                      : "bg-slate-700 text-white rounded-tl-sm shadow-md border border-slate-600"
                  }`}>
                    <p className="font-medium leading-relaxed">{msg.text}</p>
                  </div>
                  
                  {msg.sender === "ai" && (
                    <button 
                      onClick={() => playAudio(msg.text)}
                      className="flex items-center gap-2 text-xs text-slate-400 mt-2 hover:text-white transition-colors font-bold bg-slate-800 px-3 py-1.5 rounded-full"
                    >
                      <Volume2 className="w-3 h-3" /> Play Audio
                    </button>
                  )}

                  {msg.correction && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-left w-full shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Grammar Fix</div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3 bg-[#0f172a] p-3 rounded-xl">
                        <span className="line-through text-slate-500 font-medium">{messages.find(m => m.id === (parseInt(msg.id)-1).toString())?.text || "Your text"}</span>
                        <ArrowLeft className="w-4 h-4 text-slate-500 rotate-180 hidden md:block" />
                        <span className="font-black text-emerald-400">{msg.correction}</span>
                      </div>
                      <p className="text-sm text-slate-300 font-medium flex gap-2 items-start">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        {msg.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-700 p-5 rounded-3xl rounded-tl-sm flex items-center gap-2 border border-slate-600 shadow-md">
                  <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#1e293b] rounded-b-3xl p-4 shadow-lg border-2 border-slate-700 border-t-0">
            <div className="flex items-end gap-2 bg-[#0f172a] p-2 rounded-2xl border border-slate-600 focus-within:border-blue-500 transition-colors">
              <button 
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                {isListening ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={isListening ? "Listening... Speak now!" : "Type a message or use voice..."}
                className="flex-1 max-h-32 min-h-[50px] bg-transparent border-none focus:ring-0 resize-none py-3 text-white font-medium placeholder-slate-500"
                rows={1}
              />
              
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="p-3 bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-700 rounded-xl transition-colors shadow-lg"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            
            {micError && (
              <div className="bg-rose-500/20 border border-rose-500 text-rose-400 text-xs font-bold p-2 mt-2 rounded-lg text-center flex items-center justify-center gap-1">
                <StopCircle className="w-3 h-3" /> {micError}
              </div>
            )}
            
            {isListening && (
              <p className="text-center text-rose-400 text-xs font-bold mt-2 animate-pulse uppercase tracking-widest">
                Microphone Active - Speak Now
              </p>
            )}
          </div>

        </div>
      )}

      {!selectedScenario && <BottomNav />}
    </main>
  );
}
