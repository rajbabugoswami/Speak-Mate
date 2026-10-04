"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { UserCheck, Briefcase, Mic, Smile, Star, ArrowRight, ArrowLeft, Clock, Users, Shirt, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const personalityTopics = [
  {
    id: "confidence",
    title: "Confidence Building",
    hindi: "आत्मविश्वास बढ़ाएं",
    icon: Star,
    color: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description: "Learn how to speak without fear and believe in yourself. True confidence comes from preparation and mindset.",
    tips: [
      { point: "Maintain Eye Contact", hi: "आँखें मिलाकर बात करें", detail: "It shows that you are confident and honest. Don't look at the floor while speaking." },
      { point: "Speak Clearly & Slowly", hi: "स्पष्ट और धीरे बोलें", detail: "Do not rush. Take pauses while speaking to sound more authoritative and composed." },
      { point: "Accept Mistakes Gracefully", hi: "गलतियाँ स्वीकारें", detail: "It's completely fine to make mistakes while learning. Own them and move on." },
      { point: "Stop Comparing", hi: "तुलना करना बंद करें", detail: "Everyone has their own journey. Compare yourself only to your past self." },
      { point: "Positive Self-Talk", hi: "खुद से सकारात्मक बात करें", detail: "Tell yourself 'I can do this' before entering a difficult situation." }
    ]
  },
  {
    id: "body-language",
    title: "Master Body Language",
    hindi: "बॉडी लैंग्वेज",
    icon: UserCheck,
    color: "from-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    description: "Your posture speaks before your words do. Master the silent language of success.",
    tips: [
      { point: "Sit & Stand Straight", hi: "सीधे बैठें और खड़े रहें", detail: "A straight posture shows high confidence. Pull your shoulders back and keep your chin up." },
      { point: "Use Hand Gestures", hi: "हाथों का सही इस्तेमाल करें", detail: "Use your hands naturally to explain things, don't keep them strictly in your pockets." },
      { point: "Smile Often", hi: "मुस्कुराएं", detail: "A slight smile makes you look friendly, approachable, and confident." },
      { point: "Uncross Arms", hi: "हाथ बांधकर न बैठें", detail: "Crossed arms make you look defensive. Keep your posture open and welcoming." },
      { point: "Firm Handshake", hi: "मजबूती से हाथ मिलाएं", detail: "A weak handshake shows low confidence. Keep it firm but polite." }
    ]
  },
  {
    id: "interview",
    title: "Interview Skills",
    hindi: "इंटरव्यू स्किल्स",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    description: "How to crack your dream job interview with preparation and poise.",
    tips: [
      { point: "Dress Professionally", hi: "पेशेवर कपड़े पहनें", detail: "Your first impression is highly based on how you dress for the role." },
      { point: "Prepare Your Introduction", hi: "परिचय तैयार रखें", detail: "Always have a strong 'Tell me about yourself' answer ready and rehearsed." },
      { point: "Ask Good Questions", hi: "सवाल पूछें", detail: "At the end, ask 1-2 good questions to the interviewer about the role or company." },
      { point: "Highlight Achievements", hi: "उपलब्धियों पर ज़ोर दें", detail: "Don't just list your skills, tell them what you achieved using those skills using the STAR method." },
      { point: "Be Honest", hi: "ईमानदार रहें", detail: "If you don't know an answer, simply say 'I am not sure, but I am eager to learn'." }
    ]
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    hindi: "पब्लिक स्पीकिंग",
    icon: Mic,
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1475721028070-2051152a4dfb?auto=format&fit=crop&w=800&q=80",
    description: "Conquer the stage and speak to crowds effortlessly without stage fright.",
    tips: [
      { point: "Know Your Audience", hi: "अपने श्रोताओं को जानें", detail: "Speak according to who is listening to you (kids, professionals, beginners)." },
      { point: "Tell a Story", hi: "कहानी सुनाएं", detail: "People remember stories better than facts. Start with a personal story or anecdote." },
      { point: "Vary Your Voice Tone", hi: "आवाज़ में बदलाव लाएं", detail: "Don't sound like a robot. Speak louder on important points and softer on emotional ones." },
      { point: "Breathe Deeply", hi: "गहरी सांस लें", detail: "If you feel nervous on stage, take a 3-second deep breath before starting." },
      { point: "End With a Bang", hi: "प्रभावशाली अंत करें", detail: "Leave the audience with a powerful quote or a strong call to action." }
    ]
  },
  {
    id: "communication",
    title: "Communication Skills",
    hindi: "संचार कौशल",
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Connect better with people around you by mastering the art of listening.",
    tips: [
      { point: "Listen Actively", hi: "ध्यान से सुनें", detail: "Listen to understand the other person, not just waiting for your turn to reply." },
      { point: "Keep It Simple", hi: "सरल रखें", detail: "Use easy words. Good communication is about clarity, not showing off heavy vocabulary." },
      { point: "Be Empathetic", hi: "सहानुभूति रखें", detail: "Try to understand the other person's point of view and feelings." },
      { point: "Ask Open Questions", hi: "विस्तृत प्रश्न पूछें", detail: "Ask questions that require more than a simple Yes or No answer." },
      { point: "Don't Interrupt", hi: "बीच में न टोकें", detail: "Let the other person finish their entire sentence before you start yours." }
    ]
  },
  {
    id: "dressing",
    title: "Dressing & Grooming",
    hindi: "पहनावा और ग्रूमिंग",
    icon: Shirt,
    color: "from-rose-400 to-red-500",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    description: "Look sharp to feel sharp. Your appearance is a reflection of your self-respect.",
    tips: [
      { point: "Wear Fitted Clothes", hi: "सही फिटिंग के कपड़े पहनें", detail: "Baggy or overly tight clothes ruin your impression. Fit is king." },
      { point: "Iron Your Clothes", hi: "कपड़ों पर इस्तरी करें", detail: "Wrinkled clothes make you look careless and unprepared." },
      { point: "Smell Good", hi: "अच्छी महक", detail: "Use a mild deodorant or perfume. Personal hygiene is non-negotiable." },
      { point: "Match Colors", hi: "रंगों का मिलान करें", detail: "Don't wear too many bright colors together. Keep it subtle and professional." },
      { point: "Neat Hair & Nails", hi: "साफ बाल और नाखून", detail: "Always keep your hair combed and your nails trimmed and clean." }
    ]
  }
];

export default function PersonalityPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const activeData = personalityTopics.find(t => t.id === selectedTopic);

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-[#0f172a] flex flex-col font-sans">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        
        <AnimatePresence mode="wait">
          {!selectedTopic ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Premium Hero Banner */}
              <div className="mb-10 rounded-3xl overflow-hidden relative shadow-2xl group border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  alt="Personality Development"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-12">
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold w-fit mb-4 border border-amber-500/30">
                    <Star className="w-3.5 h-3.5" /> Premium Course
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                    Personality <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Development</span>
                  </h1>
                  <p className="text-slate-300 font-medium max-w-md text-lg">
                    Build unstoppable confidence, master body language, and unlock your true potential.
                  </p>
                </div>
              </div>

              {/* Grid of Topics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalityTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className="group bg-[#1e293b] rounded-3xl overflow-hidden border-2 border-slate-700 hover:border-slate-500 hover:-translate-y-2 transition-all duration-300 text-left flex flex-col shadow-lg"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent z-10" />
                        <img 
                          src={topic.image} 
                          alt={topic.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center text-white shadow-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <div className="p-6 pt-2 flex-1 flex flex-col">
                        <h2 className="text-xl font-black text-white mb-1">{topic.title}</h2>
                        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 mb-3">{topic.hindi}</p>
                        <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-6">
                          {topic.description}
                        </p>
                        <div className="mt-auto flex items-center text-blue-400 font-bold text-sm group-hover:text-blue-300 transition-colors">
                          Start Module <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={() => setSelectedTopic(null)}
                className="mb-6 text-slate-400 font-bold hover:text-white flex items-center gap-2 transition-colors bg-[#1e293b] w-fit px-4 py-2 rounded-full border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Modules
              </button>

              <div className="bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700">
                {/* Banner */}
                <div className="h-64 md:h-80 relative">
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/60 to-transparent z-10`} />
                  <img 
                    src={activeData?.image} 
                    alt={activeData?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex items-end gap-6">
                    <div className={`hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br ${activeData?.color} items-center justify-center text-white shadow-xl rotate-3`}>
                      {activeData && <activeData.icon className="w-10 h-10" />}
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{activeData?.title}</h1>
                      <p className="text-xl font-bold text-slate-300">{activeData?.hindi}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-xl text-slate-300 font-medium mb-10 border-l-4 border-blue-500 pl-5 leading-relaxed bg-[#0f172a]/50 p-4 rounded-r-xl">
                    {activeData?.description}
                  </p>

                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-amber-400" /> Key Strategies
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeData?.tips.map((tip, idx) => (
                      <div key={idx} className="bg-[#0f172a] rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors group">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeData.color} text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-black text-white leading-tight">{tip.point}</h4>
                              <p className="text-sm font-bold text-blue-400">{tip.hi}</p>
                            </div>
                          </div>
                          <p className="text-slate-400 font-medium leading-relaxed mt-auto">
                            {tip.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </main>
  );
}
