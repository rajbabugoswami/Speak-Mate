"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Mic, ArrowLeft, CheckCircle2, ChevronRight, MessageSquare, Volume2, Sparkles, Award, StopCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const practiceScenarios = [
  {
    id: "greetings",
    title: "Greetings & Basics",
    hindiTitle: "अभिवादन और सामान्य बातचीत",
    icon: "👋",
    color: "from-blue-500 to-cyan-500",
    sentences: [
      { hi: "आप कैसे हैं?", en: "How are you?", tips: "Formal greeting." },
      { hi: "आपसे मिलकर बहुत अच्छा लगा।", en: "It was very nice to meet you.", tips: "Use when saying goodbye to someone new." },
      { hi: "मैं ठीक हूँ, धन्यवाद।", en: "I am fine thank you.", tips: "Standard polite reply." },
      { hi: "आपका दिन कैसा रहा?", en: "How was your day?", tips: "Good evening conversation starter." },
      { hi: "क्या मैं आपकी मदद कर सकता हूँ?", en: "Can I help you?", tips: "Polite offer to help." },
      { hi: "मुझे समझ नहीं आया।", en: "I didn't understand.", tips: "Polite way to ask someone to say it again." },
      { hi: "यह मेरी गलती थी, मुझे माफ़ करें।", en: "It was my fault I apologize.", tips: "'I apologize' is more formal than 'I am sorry'." },
      { hi: "मैं आपसे सहमत हूँ।", en: "I agree with you.", tips: "Never say 'I am agree'." },
      { hi: "चिंता मत करो।", en: "Don't worry.", tips: "Used to comfort someone." },
      { hi: "बाद में मिलते हैं।", en: "See you later.", tips: "Casual goodbye." },
      { hi: "आपका नाम क्या है?", en: "What is your name?", tips: "Standard way to ask someone's name." },
      { hi: "आप कहाँ से हैं?", en: "Where are you from?", tips: "Asking about someone's origin." },
      { hi: "क्या आप अंग्रेजी बोलते हैं?", en: "Do you speak English?", tips: "Asking about language skills." },
      { hi: "मुझे थोड़ा समय चाहिए।", en: "I need some time.", tips: "Polite request for patience." },
      { hi: "कोई बात नहीं।", en: "No problem.", tips: "Polite response to an apology or thanks." },
      { hi: "क्या सब ठीक है?", en: "Is everything okay?", tips: "Checking on someone." },
      { hi: "यह बहुत अच्छा है।", en: "This is very good.", tips: "Giving a compliment." },
      { hi: "मुझे नहीं पता।", en: "I don't know.", tips: "Standard way to express lack of knowledge." },
      { hi: "क्या आप इसे दोहरा सकते हैं?", en: "Can you repeat that?", tips: "Asking someone to say something again." },
      { hi: "आपका स्वागत है।", en: "You are welcome.", tips: "Response to 'Thank you'." }
    ]
  },
  {
    id: "restaurant",
    title: "At the Restaurant",
    hindiTitle: "रेस्तरां में",
    icon: "🍔",
    color: "from-orange-500 to-amber-500",
    sentences: [
      { hi: "मुझे भूख लग रही है।", en: "I am feeling hungry.", tips: "Or simply 'I am hungry'." },
      { hi: "क्या मुझे मेन्यू मिल सकता है?", en: "Could I have the menu please?", tips: "'Could I have' is very polite." },
      { hi: "मैं एक कॉफी लेना चाहूँगा।", en: "I would like to have a coffee.", tips: "Use 'I would like' instead of 'I want' for politeness." },
      { hi: "कृपया मुझे नमक पास करें।", en: "Please pass me the salt.", tips: "Requesting something at the table." },
      { hi: "खाना बहुत स्वादिष्ट था।", en: "The food was delicious.", tips: "Complimenting the chef." },
      { hi: "बिल ले आइये कृपया।", en: "The bill please.", tips: "Or 'Could I have the check, please?'" },
      { hi: "क्या आप कार्ड स्वीकार करते हैं?", en: "Do you accept cards?", tips: "Asking for payment methods." },
      { hi: "मुझे थोड़ा पानी चाहिए।", en: "I would like some water.", tips: "Polite request." },
      { hi: "आज का विशेष व्यंजन क्या है?", en: "What is today's special?", tips: "Asking for recommendations." },
      { hi: "यह बहुत तीखा है।", en: "This is very spicy.", tips: "Describing food taste." },
      { hi: "क्या यहाँ कोई टेबल खाली है?", en: "Is there any table available?", tips: "Asking for seating." },
      { hi: "मैं शाकाहारी हूँ।", en: "I am a vegetarian.", tips: "Stating dietary preference." },
      { hi: "कृपया बिना प्याज के बनाएं।", en: "Please make it without onions.", tips: "Customizing your order." },
      { hi: "ऑर्डर आने में कितना समय लगेगा?", en: "How long will the order take?", tips: "Asking about waiting time." },
      { hi: "क्या यह ताज़ा है?", en: "Is this fresh?", tips: "Asking about food quality." },
      { hi: "बाकी पैसे रख लीजिए।", en: "Keep the change.", tips: "Tipping the waiter." },
      { hi: "खाना ठंडा हो गया है।", en: "The food has gotten cold.", tips: "Complaining politely." },
      { hi: "मुझे मीठे में कुछ चाहिए।", en: "I want something for dessert.", tips: "Ordering sweets." },
      { hi: "क्या आप इसे पैक कर सकते हैं?", en: "Can you pack this?", tips: "Asking for a takeaway container." },
      { hi: "सर्विस बहुत अच्छी थी।", en: "The service was very good.", tips: "Complimenting the staff." }
    ]
  },
  {
    id: "shopping",
    title: "Shopping & Money",
    hindiTitle: "खरीदारी और पैसे",
    icon: "🛒",
    color: "from-pink-500 to-rose-500",
    sentences: [
      { hi: "इसकी कीमत कितनी है?", en: "How much does this cost?", tips: "Asking for price." },
      { hi: "यह बहुत महंगा है।", en: "This is too expensive.", tips: "'Too' implies more than acceptable." },
      { hi: "क्या इसमें कोई छूट है?", en: "Is there any discount on this?", tips: "Bargaining polite phrase." },
      { hi: "मैं इसे खरीद लूँगा।", en: "I will take it.", tips: "Confirming a purchase." },
      { hi: "मुझे एक बड़ा साइज चाहिए।", en: "I need a larger size.", tips: "Asking for a different fit." },
      { hi: "क्या आपके पास यह नीले रंग में है?", en: "Do you have this in blue color?", tips: "Asking for options." },
      { hi: "मुझे केवल देखना है।", en: "I am just looking.", tips: "When a shopkeeper asks if you need help." },
      { hi: "कहाँ ट्रायल रूम है?", en: "Where is the fitting room?", tips: "Or 'trial room'." },
      { hi: "मैं नकद भुगतान करूँगा।", en: "I will pay in cash.", tips: "Specifying payment method." },
      { hi: "क्या मुझे रसीद मिल सकती है?", en: "Could I get a receipt?", tips: "Asking for the bill." },
      { hi: "क्या मैं इसे वापस कर सकता हूँ?", en: "Can I return this?", tips: "Asking about return policy." },
      { hi: "यह मुझे फिट नहीं हो रहा है।", en: "This doesn't fit me.", tips: "Explaining why clothes are wrong." },
      { hi: "क्या आप इसे बदल सकते हैं?", en: "Can you exchange this?", tips: "Asking for an exchange." },
      { hi: "यह खराब है।", en: "This is damaged.", tips: "Pointing out a defect." },
      { hi: "क्या इसके साथ गारंटी है?", en: "Does this come with a warranty?", tips: "Asking about product coverage." },
      { hi: "मुझे सस्ते विकल्प दिखाइए।", en: "Show me cheaper options.", tips: "Asking for lower priced items." },
      { hi: "मेरे पास छुट्टे पैसे नहीं हैं।", en: "I don't have change.", tips: "When you only have large bills." },
      { hi: "ATM कहाँ है?", en: "Where is the ATM?", tips: "Asking for cash machine." },
      { hi: "मैं इसे क्रेडिट कार्ड से दूँगा।", en: "I will pay by credit card.", tips: "Specifying card payment." },
      { hi: "दुकान कितने बजे बंद होती है?", en: "What time does the shop close?", tips: "Asking for store hours." }
    ]
  },
  {
    id: "travel",
    title: "Travel & Directions",
    hindiTitle: "यात्रा और दिशा",
    icon: "✈️",
    color: "from-indigo-500 to-purple-500",
    sentences: [
      { hi: "बस स्टैंड कहाँ है?", en: "Where is the bus stand?", tips: "Polite inquiry." },
      { hi: "रेलवे स्टेशन कितनी दूर है?", en: "How far is the railway station?", tips: "Asking for distance." },
      { hi: "मुझे हवाई अड्डे जाना है।", en: "I need to go to the airport.", tips: "Telling a taxi driver your destination." },
      { hi: "क्या यह बस दिल्ली जाती है?", en: "Does this bus go to Delhi?", tips: "Confirming routes." },
      { hi: "अगला स्टॉप कौन सा है?", en: "What is the next stop?", tips: "When travelling on a bus or train." },
      { hi: "कृपया यहाँ रुकें।", en: "Please stop here.", tips: "Telling the driver to halt." },
      { hi: "मुझे टिकट कहाँ से मिलेगा?", en: "Where can I get the ticket?", tips: "Locating the ticket counter." },
      { hi: "ट्रेन कितने बजे आएगी?", en: "What time will the train arrive?", tips: "Asking for schedule." },
      { hi: "दाएं मुड़ें फिर सीधे जाएं।", en: "Turn right then go straight.", tips: "Giving directions." },
      { hi: "मैं खो गया हूँ।", en: "I am lost.", tips: "When you can't find your way." },
      { hi: "किराया कितना है?", en: "How much is the fare?", tips: "Asking for travel cost." },
      { hi: "क्या यह सीट खाली है?", en: "Is this seat empty?", tips: "Asking to sit down." },
      { hi: "मेरी फ्लाइट छूट गई।", en: "I missed my flight.", tips: "Travel emergency." },
      { hi: "मुझे एक टैक्सी चाहिए।", en: "I need a taxi.", tips: "Requesting transport." },
      { hi: "बाएं मुड़ें।", en: "Turn left.", tips: "Giving basic direction." },
      { hi: "यह जगह नक्शे पर कहाँ है?", en: "Where is this place on the map?", tips: "Asking for visual location." },
      { hi: "हम कब पहुंचेंगे?", en: "When will we arrive?", tips: "Asking for ETA." },
      { hi: "क्या आप मुझे रास्ता दिखा सकते हैं?", en: "Can you show me the way?", tips: "Asking for guidance." },
      { hi: "मुझे एक होटल खोजना है।", en: "I need to find a hotel.", tips: "Looking for accommodation." },
      { hi: "यात्रा कैसी रही?", en: "How was the journey?", tips: "Asking about someone's trip." }
    ]
  },
  {
    id: "health",
    title: "Health & Emergencies",
    hindiTitle: "स्वास्थ्य और डॉक्टर",
    icon: "🏥",
    color: "from-emerald-500 to-teal-500",
    sentences: [
      { hi: "मुझे डॉक्टर के पास जाना है।", en: "I need to go to the doctor.", tips: "Expressing medical need." },
      { hi: "मुझे कल रात बुखार था।", en: "I had a fever last night.", tips: "Describing past symptoms." },
      { hi: "मेरे सिर में दर्द है।", en: "I have a headache.", tips: "Describing current pain." },
      { hi: "मुझे अच्छा महसूस नहीं हो रहा है।", en: "I am not feeling well.", tips: "General sickness phrase." },
      { hi: "मुझे थोड़ी देर हो जाएगी।", en: "I will be a little late.", tips: "Calling the clinic." },
      { hi: "कृपया मुझे दवा दें।", en: "Please give me the medicine.", tips: "At the pharmacy." },
      { hi: "सबसे करीबी अस्पताल कहाँ है?", en: "Where is the nearest hospital?", tips: "Emergency question." },
      { hi: "मुझे चक्कर आ रहे हैं।", en: "I am feeling dizzy.", tips: "Describing symptoms." },
      { hi: "मुझे मदद चाहिए।", en: "I need help.", tips: "Urgent call for assistance." },
      { hi: "एम्बुलेंस को बुलाओ।", en: "Call an ambulance.", tips: "Emergency command." },
      { hi: "मेरे पेट में दर्द है।", en: "I have a stomach ache.", tips: "Describing pain location." },
      { hi: "क्या आपके पास दर्द की दवा है?", en: "Do you have painkillers?", tips: "Asking for specific medicine." },
      { hi: "मुझे खांसी है।", en: "I have a cough.", tips: "Describing a common symptom." },
      { hi: "मुझे उल्टी आ रही है।", en: "I feel like vomiting.", tips: "Expressing nausea." },
      { hi: "डॉक्टर कितने बजे आएंगे?", en: "What time will the doctor come?", tips: "Asking about schedule." },
      { hi: "क्या यह गंभीर है?", en: "Is it serious?", tips: "Asking about severity." },
      { hi: "मुझे खून की जांच करवानी है।", en: "I need to get a blood test done.", tips: "Medical procedure request." },
      { hi: "मेरा पैर कट गया है।", en: "I cut my leg.", tips: "Describing an injury." },
      { hi: "क्या मुझे आराम करना चाहिए?", en: "Should I rest?", tips: "Asking for medical advice." },
      { hi: "पुलिस को बुलाओ।", en: "Call the police.", tips: "Emergency command." }
    ]
  },
  {
    id: "office",
    title: "Office & Work",
    hindiTitle: "दफ्तर और इंटरव्यू",
    icon: "🏢",
    color: "from-slate-600 to-slate-800",
    sentences: [
      { hi: "मैं रोज ऑफिस जाता हूँ।", en: "I go to the office every day.", tips: "Describing routine." },
      { hi: "मीटिंग कितने बजे है?", en: "What time is the meeting?", tips: "Checking schedule." },
      { hi: "मैंने अपना काम पूरा कर लिया है।", en: "I have completed my work.", tips: "Reporting status." },
      { hi: "क्या हम कल मिल सकते हैं?", en: "Can we meet tomorrow?", tips: "Scheduling a meeting." },
      { hi: "मुझे आज छुट्टी चाहिए।", en: "I need a leave today.", tips: "Asking for time off." },
      { hi: "मैं एक सॉफ्टवेयर इंजीनियर हूँ।", en: "I am a software engineer.", tips: "Self introduction." },
      { hi: "क्या आप मुझे वह फाइल भेज सकते हैं?", en: "Could you please send me that file?", tips: "Polite professional request." },
      { hi: "मैं इस प्रोजेक्ट पर काम कर रहा हूँ।", en: "I am working on this project.", tips: "Describing current task." },
      { hi: "मुझे बॉस से बात करनी है।", en: "I need to speak to the boss.", tips: "Formal request." },
      { hi: "आज बहुत काम है।", en: "There is a lot of work today.", tips: "Expressing workload." },
      { hi: "मैं प्रेजेंटेशन तैयार कर रहा हूँ।", en: "I am preparing the presentation.", tips: "Reporting current activity." },
      { hi: "क्या आप इसे कल तक कर सकते हैं?", en: "Can you do this by tomorrow?", tips: "Setting a deadline." },
      { hi: "मुझे आपकी मदद चाहिए।", en: "I need your help.", tips: "Asking a colleague for assistance." },
      { hi: "इंटरनेट काम नहीं कर रहा है।", en: "The internet is not working.", tips: "Reporting an IT issue." },
      { hi: "कृपया मुझे ईमेल करें।", en: "Please email me.", tips: "Directing communication." },
      { hi: "मैं मीटिंग में हूँ।", en: "I am in a meeting.", tips: "Explaining why you can't talk." },
      { hi: "मेरा इंटरव्यू अच्छा गया।", en: "My interview went well.", tips: "Sharing interview outcome." },
      { hi: "क्या मुझे प्रमोशन मिलेगा?", en: "Will I get a promotion?", tips: "Asking about career growth." },
      { hi: "यह प्रोजेक्ट कब खत्म होगा?", en: "When will this project finish?", tips: "Asking about timelines." },
      { hi: "धन्यवाद आपके समय के लिए।", en: "Thank you for your time.", tips: "Professional closing." }
    ]
  }
];

// Helper to normalize strings for comparison (remove punctuation, lower case)
const normalizeString = (str: string) => {
  return str.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
};

export default function SentencePracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  
  // Voice Recognition States
  const [inputText, setInputText] = useState("");
  const [micError, setMicError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xp, setXp] = useState(0);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-IN'; // Indian English accent

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
            setMicError(`Mic error: ${event.error}. Please type your answer instead.`);
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setMicError("Voice recognition not supported in this browser.");
      }
    }
  }, [selectedScenario, sentenceIndex]);

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

  const checkAnswer = () => {
    if (!inputText.trim()) return;
    
    const targetEn = practiceScenarios.find(s => s.id === selectedScenario.id)?.sentences[sentenceIndex].en || "";
    
    const normalizedTarget = normalizeString(targetEn);
    const normalizedSpoken = normalizeString(inputText);
    
    // Fuzzy match
    const isMatch = normalizedSpoken === normalizedTarget || 
                    normalizedSpoken.includes(normalizedTarget) || 
                    normalizedTarget.includes(normalizedSpoken);
                    
    setIsCorrect(isMatch);
    setShowResult(true);
    
    if (isMatch) {
      setXp(prev => prev + 50);
      playAudio("Excellent!");
    } else {
      playAudio("Good try, check the correct answer.");
    }
  };

  const playAudio = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextSentence = () => {
    setSentenceIndex(prev => (prev + 1) % selectedScenario.sentences.length);
    setShowResult(false);
    setInputText("");
  };

  const handleSkip = () => {
    setShowResult(true);
    setIsCorrect(false);
    setInputText("Skipped");
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-[#0f172a] text-white flex flex-col font-sans overflow-x-hidden">
      <Header />
      
      {/* Top XP Bar */}
      <div className="sticky top-0 z-50 bg-[#1e293b] border-b border-slate-700 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Speaking Score</div>
            <div className="font-black text-xl text-emerald-400">{xp} Points</div>
          </div>
        </div>
        <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-blue-500/30">
          <Mic className="w-4 h-4" /> Practice Mode
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* SCENARIO SELECTION MAP */}
          {!selectedScenario && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Real-World Speaking
                </h1>
                <p className="text-slate-400 font-medium text-lg">Use your MICROPHONE to practice translating everyday Hindi phrases into perfect English!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {practiceScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario);
                      setSentenceIndex(0);
                      setShowResult(false);
                      setInputText("");
                    }}
                    className="bg-[#1e293b] rounded-3xl p-6 border-2 border-slate-700 hover:border-emerald-500 hover:scale-[1.02] transition-all text-left group flex items-start gap-4 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${scenario.color} opacity-10 rounded-bl-full group-hover:scale-125 transition-transform`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.color} flex items-center justify-center text-3xl shadow-lg shrink-0 group-hover:animate-bounce`}>
                      {scenario.icon}
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <h2 className="text-xl font-black text-white mb-1">{scenario.title}</h2>
                      <p className="text-slate-400 font-medium mb-3">{scenario.hindiTitle}</p>
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                        <MessageSquare className="w-3 h-3" /> {scenario.sentences.length} Phrases
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SPEAKING PRACTICE ARENA */}
          {selectedScenario && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1e293b] rounded-3xl shadow-2xl border-2 border-slate-700 overflow-hidden flex-1 min-h-[70vh] flex flex-col relative"
            >
              {/* Background Icon Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[200px] pointer-events-none">
                {selectedScenario.icon}
              </div>

              {/* Header */}
              <div className={`bg-gradient-to-r ${selectedScenario.color} p-4 flex items-center gap-4 relative z-10`}>
                <button 
                  onClick={() => setSelectedScenario(null)}
                  className="w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex-1 text-center">
                  <h1 className="text-2xl font-black text-white">{selectedScenario.title}</h1>
                  <p className="text-white/80 font-bold text-sm">Phrase {sentenceIndex + 1} of {selectedScenario.sentences.length}</p>
                </div>
                <div className="w-10 h-10 text-2xl flex items-center justify-center drop-shadow-md">
                  {selectedScenario.icon}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-slate-800 w-full relative z-10">
                <div 
                  className={`h-full bg-gradient-to-r ${selectedScenario.color} transition-all duration-500`}
                  style={{ width: `${((sentenceIndex + 1) / selectedScenario.sentences.length) * 100}%` }}
                ></div>
              </div>

              {/* Play Area */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative z-10">
                
                {/* Hindi Question */}
                <div className="text-center mb-8">
                  <p className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-sm">Translate this to English:</p>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    "{selectedScenario.sentences[sentenceIndex].hi}"
                  </h2>
                </div>

                {!showResult ? (
                  <div className="flex flex-col gap-4 mt-4 max-w-lg mx-auto w-full">
                    
                    {/* The Textarea (Same as AI Chat) */}
                    <div className={`relative bg-[#0f172a] rounded-2xl border-2 transition-colors ${isListening ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'border-slate-600 focus-within:border-emerald-500'}`}>
                      
                      {isListening && (
                        <div className="absolute top-2 right-4 flex items-center gap-2">
                          <span className="text-rose-500 text-xs font-bold animate-pulse">Listening...</span>
                          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                        </div>
                      )}
                      
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Tap the mic to speak, or type here..."
                        className="w-full bg-transparent border-none text-white font-medium p-4 min-h-[120px] focus:ring-0 resize-none rounded-2xl"
                      />
                      
                      <div className="p-2 border-t border-slate-700/50 flex justify-between">
                        <button 
                          onClick={toggleListening}
                          className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        >
                          {isListening ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>
                        
                        <button 
                          onClick={checkAnswer}
                          disabled={!inputText.trim()}
                          className="px-6 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:bg-slate-700 transition-colors shadow-lg"
                        >
                          Check Answer
                        </button>
                      </div>
                    </div>
                    
                    {micError && (
                      <div className="bg-rose-500/20 border border-rose-500 text-rose-400 text-sm font-bold p-3 rounded-xl text-center flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" /> {micError}
                      </div>
                    )}

                    <button onClick={handleSkip} className="text-slate-500 hover:text-slate-300 font-medium text-sm mt-2 underline underline-offset-4 text-center">
                      Skip & Show Answer
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    {/* The Answer Reveal */}
                    <div className={`p-8 rounded-3xl border-2 shadow-xl text-center relative overflow-hidden ${
                      isCorrect ? 'bg-emerald-900/40 border-emerald-500/50' : 'bg-slate-800/80 border-slate-600'
                    }`}>
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        {isCorrect ? <CheckCircle2 className="w-32 h-32 text-emerald-500" /> : <XCircle className="w-32 h-32 text-slate-500" />}
                      </div>
                      
                      {/* What they said vs Target */}
                      {inputText !== "Skipped" && (
                        <div className="mb-6 bg-black/20 p-4 rounded-2xl relative z-10">
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Your Answer</p>
                          <p className={`text-lg font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>"{inputText}"</p>
                        </div>
                      )}
                      
                      <p className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-sm relative z-10">Correct Translation</p>
                      
                      <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
                        <h3 className="text-3xl md:text-4xl font-black text-white">{selectedScenario.sentences[sentenceIndex].en}</h3>
                        <button 
                          onClick={() => playAudio(selectedScenario.sentences[sentenceIndex].en)}
                          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors shadow-lg shrink-0"
                        >
                          <Volume2 className="w-6 h-6 text-white" />
                        </button>
                      </div>

                      {/* Grammar Tip */}
                      <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-700 flex items-start gap-3 text-left relative z-10">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-400 font-bold text-sm mb-1">Quick Tip</p>
                          <p className="text-slate-300 font-medium">{selectedScenario.sentences[sentenceIndex].tips}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextSentence}
                      className={`w-full mt-8 py-5 rounded-2xl font-black text-xl text-white shadow-[0_6px_0_rgba(0,0,0,0.4)] active:shadow-[0_0px_0_rgba(0,0,0,0.4)] active:translate-y-[6px] transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${selectedScenario.color}`}
                    >
                      Next Phrase <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}
                
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {!selectedScenario && <BottomNav />}
    </main>
  );
}
