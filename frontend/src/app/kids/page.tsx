"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { Volume2, ArrowLeft, Star, Trophy, Zap, CheckCircle2, XCircle, ChevronRight, RotateCcw, Home, BookOpen, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import numbersData from "@/data/numbers.json";

const categories = [
  { id: "alphabets",   title: "A B C",       hindi: "वर्णमाला",   icon: "🅰️",  from: "#f43f5e", to: "#fb7185", border: "#e11d48", count: 26 },
  { id: "numbers",     title: "Numbers",     hindi: "गिनती",      icon: "🔢",  from: "#3b82f6", to: "#60a5fa", border: "#2563eb", count: 20 },
  { id: "colors",      title: "Colors",      hindi: "रंग",         icon: "🎨",  from: "#10b981", to: "#34d399", border: "#059669", count: 14 },
  { id: "shapes",      title: "Shapes",      hindi: "आकार",        icon: "🔷",  from: "#06b6d4", to: "#22d3ee", border: "#0891b2", count: 10 },
  { id: "greetings",   title: "Greetings",   hindi: "अभिवादन",    icon: "👋",  from: "#f59e0b", to: "#fbbf24", border: "#d97706", count: 20 },
  { id: "days",        title: "Days",        hindi: "दिन",         icon: "📅",  from: "#8b5cf6", to: "#a78bfa", border: "#7c3aed", count: 7  },
  { id: "months",      title: "Months",      hindi: "महीने",       icon: "🗓️",  from: "#d946ef", to: "#e879f9", border: "#c026d3", count: 12 },
  { id: "seasons",     title: "Seasons",     hindi: "मौसम",        icon: "🌤️",  from: "#f97316", to: "#fb923c", border: "#ea580c", count: 4  },
  { id: "body",        title: "Body Parts",  hindi: "शरीर",        icon: "👀",  from: "#14b8a6", to: "#2dd4bf", border: "#0d9488", count: 25 },
  { id: "family",      title: "Family",      hindi: "परिवार",      icon: "👨‍👩‍👧‍👦",  from: "#6366f1", to: "#818cf8", border: "#4f46e5", count: 15 },
  { id: "animals",     title: "Animals",     hindi: "जानवर",       icon: "🦁",  from: "#f97316", to: "#fb923c", border: "#ea580c", count: 30 },
  { id: "birds",       title: "Birds",       hindi: "पक्षी",       icon: "🐦",  from: "#84cc16", to: "#a3e635", border: "#65a30d", count: 15 },
  { id: "fruits",      title: "Fruits",      hindi: "फल",          icon: "🍎",  from: "#ec4899", to: "#f472b6", border: "#db2777", count: 20 },
  { id: "vegetables",  title: "Vegetables",  hindi: "सब्जियां",    icon: "🥕",  from: "#84cc16", to: "#a3e635", border: "#65a30d", count: 20 },
  { id: "food",        title: "Food & Drinks",hindi: "खाना-पीना",  icon: "🍔",  from: "#f59e0b", to: "#fbbf24", border: "#d97706", count: 20 },
  { id: "vehicles",    title: "Vehicles",    hindi: "वाहन",        icon: "🚗",  from: "#06b6d4", to: "#22d3ee", border: "#0891b2", count: 20 },
  { id: "occupations", title: "Jobs",        hindi: "पेशे",        icon: "👨‍⚕️",  from: "#0ea5e9", to: "#38bdf8", border: "#0284c7", count: 20 },
  { id: "clothes",     title: "Clothes",     hindi: "कपड़े",       icon: "👗",  from: "#7c3aed", to: "#9333ea", border: "#6d28d9", count: 20 },
  { id: "actions",     title: "Action Words",hindi: "काम",         icon: "🏃",  from: "#ef4444", to: "#f87171", border: "#dc2626", count: 30 },
  { id: "emotions",    title: "Feelings",    hindi: "भावनाएं",     icon: "😊",  from: "#f43f5e", to: "#fb7185", border: "#e11d48", count: 15 },
];

// ── DATA SETS ────────────────────────────────────────────────────────────────

const alphabets = [
  { text:"A",en:"Apple",   hi:"सेब",         img:"🍎" },{ text:"B",en:"Ball",      hi:"गेंद",      img:"🏀" },
  { text:"C",en:"Cat",     hi:"बिल्ली",      img:"🐱" },{ text:"D",en:"Dog",       hi:"कुत्ता",    img:"🐶" },
  { text:"E",en:"Elephant",hi:"हाथी",        img:"🐘" },{ text:"F",en:"Fish",      hi:"मछली",     img:"🐟" },
  { text:"G",en:"Goat",    hi:"बकरी",        img:"🐐" },{ text:"H",en:"Horse",     hi:"घोड़ा",     img:"🐴" },
  { text:"I",en:"Ice Cream",hi:"आइसक्रीम",  img:"🍦" },{ text:"J",en:"Jug",       hi:"जग",        img:"🫙" },
  { text:"K",en:"Kite",    hi:"पतंग",        img:"🪁" },{ text:"L",en:"Lion",      hi:"शेर",       img:"🦁" },
  { text:"M",en:"Monkey",  hi:"बंदर",        img:"🐒" },{ text:"N",en:"Nest",      hi:"घोंसला",    img:"🪹" },
  { text:"O",en:"Orange",  hi:"संतरा",       img:"🍊" },{ text:"P",en:"Parrot",    hi:"तोता",      img:"🦜" },
  { text:"Q",en:"Queen",   hi:"रानी",        img:"👑" },{ text:"R",en:"Rabbit",    hi:"खरगोश",    img:"🐇" },
  { text:"S",en:"Sun",     hi:"सूरज",        img:"☀️" },{ text:"T",en:"Tiger",     hi:"बाघ",       img:"🐅" },
  { text:"U",en:"Umbrella",hi:"छाता",        img:"☂️" },{ text:"V",en:"Van",       hi:"वैन",       img:"🚐" },
  { text:"W",en:"Watermelon",hi:"तरबूज",    img:"🍉" },{ text:"X",en:"X-ray",    hi:"एक्स-रे",   img:"🩻" },
  { text:"Y",en:"Yak",     hi:"याक",         img:"🐂" },{ text:"Z",en:"Zebra",     hi:"ज़ेबरा",    img:"🦓" },
];

const colorsData = [
  {en:"Red",    hi:"लाल",      hex:"#ef4444"},{en:"Blue",     hi:"नीला",    hex:"#3b82f6"},
  {en:"Green",  hi:"हरा",      hex:"#22c55e"},{en:"Yellow",   hi:"पीला",    hex:"#facc15"},
  {en:"Orange", hi:"नारंगी",   hex:"#f97316"},{en:"Purple",   hi:"बैंगनी",  hex:"#a855f7"},
  {en:"Pink",   hi:"गुलाबी",   hex:"#ec4899"},{en:"Brown",    hi:"भूरा",    hex:"#92400e"},
  {en:"Black",  hi:"काला",     hex:"#1e293b"},{en:"White",    hi:"सफेद",    hex:"#f1f5f9"},
  {en:"Grey",   hi:"स्लेटी",   hex:"#64748b"},{en:"Violet",   hi:"बैंगनी",  hex:"#7c3aed"},
  {en:"Gold",   hi:"सुनहरा",   hex:"#f59e0b"},{en:"Silver",   hi:"चाँदी",   hex:"#94a3b8"},
];

const shapesData = [
  {en:"Circle",   hi:"वृत्त",       img:"⭕"},{en:"Square",    hi:"वर्ग",        img:"🔲"},
  {en:"Triangle", hi:"त्रिकोण",     img:"🔺"},{en:"Rectangle", hi:"आयत",         img:"▬"},
  {en:"Star",     hi:"तारा",        img:"⭐"},{en:"Heart",     hi:"दिल",          img:"❤️"},
  {en:"Diamond",  hi:"हीरा",        img:"💎"},{en:"Oval",      hi:"अंडाकार",     img:"🥚"},
  {en:"Pentagon", hi:"पंचभुज",      img:"⬠"},{en:"Arrow",     hi:"तीर",          img:"➡️"},
];

const greetings = [
  {en:"Hello",            hi:"नमस्ते",              img:"👋"},{en:"Good Morning",     hi:"शुभ प्रभात",       img:"🌅"},
  {en:"Good Afternoon",   hi:"शुभ दोपहर",           img:"☀️"},{en:"Good Evening",      hi:"शुभ संध्या",       img:"🌇"},
  {en:"Good Night",       hi:"शुभ रात्रि",          img:"🌙"},{en:"Thank You",         hi:"धन्यवाद",          img:"🙏"},
  {en:"Sorry",            hi:"माफ़ करना",            img:"😔"},{en:"Please",            hi:"कृपया",            img:"🥺"},
  {en:"Welcome",          hi:"स्वागत है",            img:"🤗"},{en:"How are you?",      hi:"आप कैसे हैं?",    img:"❓"},
  {en:"Goodbye",          hi:"अलविदा",               img:"🚶"},{en:"See you later",     hi:"बाद में मिलते हैं",img:"🕒"},
  {en:"Nice to meet you", hi:"आपसे मिलकर अच्छा लगा",img:"🤝"},{en:"Excuse me",         hi:"माफ़ कीजिए",       img:"☝️"},
  {en:"Yes",              hi:"हाँ",                  img:"👍"},{en:"No",                hi:"नहीं",             img:"👎"},
  {en:"Help",             hi:"मदद करो",              img:"🆘"},{en:"I love you",        hi:"मैं तुमसे प्यार करता हूँ",img:"❤️"},
  {en:"Happy Birthday",   hi:"जन्मदिन मुबारक",       img:"🎂"},{en:"Good Luck",         hi:"शुभकामनाएं",       img:"🍀"},
];

const daysData = [
  {en:"Monday",    hi:"सोमवार",  img:"🌙"},{en:"Tuesday",  hi:"मंगलवार", img:"🔥"},
  {en:"Wednesday", hi:"बुधवार",  img:"💧"},{en:"Thursday", hi:"गुरुवार",  img:"⚡"},
  {en:"Friday",    hi:"शुक्रवार",img:"🎉"},{en:"Saturday", hi:"शनिवार",  img:"🌟"},
  {en:"Sunday",    hi:"रविवार",  img:"☀️"},
];

const monthsData = [
  {en:"January",  hi:"जनवरी",   img:"❄️"},{en:"February",  hi:"फ़रवरी",  img:"💝"},
  {en:"March",    hi:"मार्च",    img:"🌸"},{en:"April",     hi:"अप्रैल",  img:"🌧️"},
  {en:"May",      hi:"मई",      img:"🌺"},{en:"June",      hi:"जून",     img:"☀️"},
  {en:"July",     hi:"जुलाई",   img:"🌊"},{en:"August",    hi:"अगस्त",   img:"🌿"},
  {en:"September",hi:"सितंबर",  img:"🍂"},{en:"October",   hi:"अक्टूबर", img:"🎃"},
  {en:"November", hi:"नवंबर",   img:"🍁"},{en:"December",  hi:"दिसंबर",  img:"🎄"},
];

const seasonsData = [
  {en:"Summer",  hi:"गर्मी",    img:"☀️"},{en:"Winter",   hi:"सर्दी",   img:"❄️"},
  {en:"Monsoon", hi:"बारिश",   img:"🌧️"},{en:"Autumn",   hi:"पतझड़",   img:"🍂"},
];

const bodyParts = [
  {en:"Head",     hi:"सिर",          img:"🗣️"},{en:"Face",      hi:"चेहरा",        img:"👱"},
  {en:"Hair",     hi:"बाल",          img:"💇"},{en:"Eye",       hi:"आँख",           img:"👁️"},
  {en:"Ear",      hi:"कान",          img:"👂"},{en:"Nose",      hi:"नाक",           img:"👃"},
  {en:"Mouth",    hi:"मुँह",         img:"👄"},{en:"Tooth",     hi:"दांत",           img:"🦷"},
  {en:"Tongue",   hi:"जीभ",          img:"👅"},{en:"Neck",      hi:"गर्दन",          img:"🧣"},
  {en:"Shoulder", hi:"कंधा",         img:"🤷"},{en:"Arm",       hi:"बांह",           img:"💪"},
  {en:"Elbow",    hi:"कोहनी",        img:"🦴"},{en:"Hand",      hi:"हाथ",            img:"✋"},
  {en:"Finger",   hi:"उंगली",        img:"👆"},{en:"Thumb",     hi:"अंगूठा",         img:"👍"},
  {en:"Chest",    hi:"छाती",         img:"🫁"},{en:"Stomach",   hi:"पेट",            img:"🤰"},
  {en:"Back",     hi:"पीठ",          img:"🔙"},{en:"Leg",       hi:"पैर",            img:"🦵"},
  {en:"Knee",     hi:"घुटना",        img:"🦵"},{en:"Foot",      hi:"पैर का पंजा",   img:"🦶"},
  {en:"Toe",      hi:"पैर की अंगुली",img:"👣"},{en:"Brain",     hi:"दिमाग",          img:"🧠"},
  {en:"Heart",    hi:"दिल",          img:"🫀"},
];

const familyData = [
  {en:"Mother",       hi:"माँ",                    img:"👩"},{en:"Father",         hi:"पिता",              img:"👨"},
  {en:"Brother",      hi:"भाई",                   img:"👦"},{en:"Sister",          hi:"बहन",               img:"👧"},
  {en:"Grandfather",  hi:"दादा जी",               img:"👴"},{en:"Grandmother",     hi:"दादी जी",           img:"👵"},
  {en:"Uncle",        hi:"चाचा / मामा",            img:"👨‍🦱"},{en:"Aunt",             hi:"चाची / बुआ",       img:"👩‍🦱"},
  {en:"Husband",      hi:"पति",                   img:"🤵‍♂️"},{en:"Wife",             hi:"पत्नी",             img:"👰‍♀️"},
  {en:"Son",          hi:"बेटा",                  img:"👦"},{en:"Daughter",         hi:"बेटी",              img:"👧"},
  {en:"Cousin",       hi:"चचेरा भाई / बहन",       img:"🧑‍🤝‍🧑"},{en:"Baby",              hi:"बच्चा",             img:"👶"},
  {en:"Friend",       hi:"दोस्त",                 img:"🤝"},
];

const animals = [
  {en:"Lion",     hi:"शेर",      img:"🦁"},{en:"Tiger",    hi:"बाघ",      img:"🐅"},
  {en:"Elephant", hi:"हाथी",     img:"🐘"},{en:"Monkey",   hi:"बंदर",     img:"🐒"},
  {en:"Dog",      hi:"कुत्ता",  img:"🐶"},{en:"Cat",      hi:"बिल्ली",   img:"🐱"},
  {en:"Cow",      hi:"गाय",      img:"🐄"},{en:"Horse",    hi:"घोड़ा",     img:"🐴"},
  {en:"Rabbit",   hi:"खरगोश",   img:"🐇"},{en:"Bear",     hi:"भालू",     img:"🐻"},
  {en:"Deer",     hi:"हिरण",     img:"🦌"},{en:"Fox",      hi:"लोमड़ी",  img:"🦊"},
  {en:"Wolf",     hi:"भेड़िया",  img:"🐺"},{en:"Camel",    hi:"ऊंट",      img:"🐫"},
  {en:"Zebra",    hi:"ज़ेबरा",   img:"🦓"},{en:"Giraffe",  hi:"जिराफ़",   img:"🦒"},
  {en:"Kangaroo", hi:"कंगारू",  img:"🦘"},{en:"Panda",    hi:"पांडा",    img:"🐼"},
  {en:"Crocodile",hi:"मगरमच्छ", img:"🐊"},{en:"Frog",     hi:"मेंढक",   img:"🐸"},
  {en:"Turtle",   hi:"कछुआ",    img:"🐢"},{en:"Snake",    hi:"सांप",     img:"🐍"},
  {en:"Fish",     hi:"मछली",     img:"🐟"},{en:"Dolphin",  hi:"डॉल्फिन", img:"🐬"},
  {en:"Whale",    hi:"व्हेल",    img:"🐋"},{en:"Sheep",    hi:"भेड़",      img:"🐑"},
  {en:"Goat",     hi:"बकरी",     img:"🐐"},{en:"Pig",      hi:"सुअर",     img:"🐷"},
  {en:"Mouse",    hi:"चूहा",     img:"🐭"},{en:"Ant",      hi:"चींटी",   img:"🐜"},
];

const birdsData = [
  {en:"Eagle",    hi:"बाज",      img:"🦅"},{en:"Parrot",   hi:"तोता",     img:"🦜"},
  {en:"Peacock",  hi:"मोर",      img:"🦚"},{en:"Owl",      hi:"उल्लू",    img:"🦉"},
  {en:"Penguin",  hi:"पेंगुइन", img:"🐧"},{en:"Flamingo", hi:"फ्लेमिंगो",img:"🦩"},
  {en:"Crow",     hi:"कौआ",      img:"🐦‍⬛"},{en:"Duck",     hi:"बत्तख",    img:"🦆"},
  {en:"Hen",      hi:"मुर्गी",   img:"🐔"},{en:"Pigeon",   hi:"कबूतर",   img:"🕊️"},
  {en:"Sparrow",  hi:"गौरेया",  img:"🐦"},{en:"Swan",     hi:"हंस",      img:"🦢"},
  {en:"Bat",      hi:"चमगादड़",  img:"🦇"},{en:"Turkey",   hi:"टर्की",    img:"🦃"},
  {en:"Toucan",   hi:"टूकन",     img:"🦜"},
];

const fruits = [
  {en:"Apple",      hi:"सेब",         img:"🍎"},{en:"Banana",     hi:"केला",        img:"🍌"},
  {en:"Orange",     hi:"संतरा",       img:"🍊"},{en:"Grapes",     hi:"अंगूर",       img:"🍇"},
  {en:"Mango",      hi:"आम",           img:"🥭"},{en:"Strawberry", hi:"स्ट्रॉबेरी", img:"🍓"},
  {en:"Watermelon", hi:"तरबूज",       img:"🍉"},{en:"Pineapple",  hi:"अनानास",      img:"🍍"},
  {en:"Cherry",     hi:"चेरी",        img:"🍒"},{en:"Peach",      hi:"आड़ू",         img:"🍑"},
  {en:"Lemon",      hi:"नींबू",       img:"🍋"},{en:"Coconut",    hi:"नारियल",      img:"🥥"},
  {en:"Kiwi",       hi:"कीवी",        img:"🥝"},{en:"Pear",       hi:"नाशपाती",     img:"🍐"},
  {en:"Avocado",    hi:"एवोकैडो",     img:"🥑"},{en:"Blueberry",  hi:"ब्लूबेरी",    img:"🫐"},
  {en:"Papaya",     hi:"पपीता",       img:"🥭"},{en:"Pomegranate",hi:"अनार",         img:"🍎"},
  {en:"Plum",       hi:"आलूबुखारा",   img:"🍑"},{en:"Melon",      hi:"खरबूजा",      img:"🍈"},
];

const vegetables = [
  {en:"Tomato",       hi:"टमाटर",         img:"🍅"},{en:"Potato",       hi:"आलू",           img:"🥔"},
  {en:"Onion",        hi:"प्याज",         img:"🧅"},{en:"Carrot",       hi:"गाजर",           img:"🥕"},
  {en:"Broccoli",     hi:"ब्रोकोली",      img:"🥦"},{en:"Corn",         hi:"मक्का",          img:"🌽"},
  {en:"Cucumber",     hi:"खीरा",          img:"🥒"},{en:"Garlic",       hi:"लहसुन",          img:"🧄"},
  {en:"Spinach",      hi:"पालक",          img:"🥬"},{en:"Cabbage",      hi:"पत्ता गोभी",     img:"🥬"},
  {en:"Cauliflower",  hi:"फूलगोभी",       img:"🥦"},{en:"Eggplant",     hi:"बैंगन",          img:"🍆"},
  {en:"Peas",         hi:"मटर",           img:"🫛"},{en:"Capsicum",     hi:"शिमला मिर्च",    img:"🫑"},
  {en:"Radish",       hi:"मूली",          img:"🥕"},{en:"Ginger",       hi:"अदरक",           img:"🫚"},
  {en:"Chili",        hi:"मिर्च",         img:"🌶️"},{en:"Mushroom",     hi:"मशरूम",          img:"🍄"},
  {en:"Pumpkin",      hi:"कद्दू",         img:"🎃"},{en:"Sweet Potato", hi:"शकरकंद",         img:"🍠"},
];

const foodData = [
  {en:"Rice",      hi:"चावल",      img:"🍚"},{en:"Bread",     hi:"रोटी",       img:"🍞"},
  {en:"Milk",      hi:"दूध",        img:"🥛"},{en:"Egg",       hi:"अंडा",        img:"🥚"},
  {en:"Butter",    hi:"मक्खन",     img:"🧈"},{en:"Cheese",    hi:"पनीर",        img:"🧀"},
  {en:"Pizza",     hi:"पिज़्ज़ा",  img:"🍕"},{en:"Burger",    hi:"बर्गर",       img:"🍔"},
  {en:"Cake",      hi:"केक",        img:"🎂"},{en:"Ice Cream", hi:"आइसक्रीम",   img:"🍦"},
  {en:"Chocolate", hi:"चॉकलेट",   img:"🍫"},{en:"Biscuit",   hi:"बिस्कुट",    img:"🍪"},
  {en:"Water",     hi:"पानी",       img:"💧"},{en:"Juice",     hi:"जूस",         img:"🧃"},
  {en:"Tea",       hi:"चाय",        img:"🍵"},{en:"Coffee",    hi:"कॉफ़ी",       img:"☕"},
  {en:"Soup",      hi:"सूप",        img:"🍲"},{en:"Noodles",   hi:"नूडल्स",     img:"🍜"},
  {en:"Sandwich",  hi:"सैंडविच",   img:"🥪"},{en:"Popcorn",   hi:"पॉपकॉर्न",   img:"🍿"},
];

const vehicles = [
  {en:"Car",         hi:"कार",          img:"🚗"},{en:"Bus",          hi:"बस",           img:"🚌"},
  {en:"Train",       hi:"ट्रेन",         img:"🚆"},{en:"Airplane",     hi:"हवाई जहाज",    img:"✈️"},
  {en:"Bicycle",     hi:"साइकिल",       img:"🚲"},{en:"Motorcycle",   hi:"मोटरसाइकिल",   img:"🏍️"},
  {en:"Boat",        hi:"नाव",           img:"⛵"},{en:"Helicopter",   hi:"हेलीकॉप्टर",   img:"🚁"},
  {en:"Truck",       hi:"ट्रक",          img:"🚚"},{en:"Tractor",      hi:"ट्रैक्टर",     img:"🚜"},
  {en:"Scooter",     hi:"स्कूटर",        img:"🛵"},{en:"Ship",         hi:"जहाज",          img:"🚢"},
  {en:"Rocket",      hi:"रॉकेट",         img:"🚀"},{en:"Ambulance",    hi:"एम्बुलेंस",    img:"🚑"},
  {en:"Fire Engine", hi:"दमकल",          img:"🚒"},{en:"Police Car",   hi:"पुलिस कार",    img:"🚓"},
  {en:"Taxi",        hi:"टैक्सी",        img:"🚕"},{en:"Auto Rickshaw",hi:"ऑटो रिक्शा",  img:"🛺"},
  {en:"Van",         hi:"वैन",           img:"🚐"},{en:"Submarine",    hi:"पनडुब्बी",     img:"🛳️"},
];

const occupations = [
  {en:"Teacher",     hi:"शिक्षक",         img:"👨‍🏫"},{en:"Doctor",      hi:"डॉक्टर",         img:"👨‍⚕️"},
  {en:"Police",      hi:"पुलिस",          img:"👮"}, {en:"Farmer",      hi:"किसान",          img:"🧑‍🌾"},
  {en:"Chef",        hi:"बावर्ची",         img:"👨‍🍳"},{en:"Mechanic",    hi:"मैकेनिक",        img:"👨‍🔧"},
  {en:"Pilot",       hi:"पायलट",           img:"👨‍✈️"},{en:"Artist",      hi:"कलाकार",         img:"🎨"},
  {en:"Nurse",       hi:"नर्स",            img:"👩‍⚕️"},{en:"Engineer",    hi:"इंजीनियर",        img:"👷"},
  {en:"Scientist",   hi:"वैज्ञानिक",      img:"🧑‍🔬"},{en:"Astronaut",   hi:"अंतरिक्ष यात्री",img:"🧑‍🚀"},
  {en:"Firefighter", hi:"दमकलकर्मी",      img:"🧑‍🚒"},{en:"Singer",      hi:"गायक",            img:"🧑‍🎤"},
  {en:"Dancer",      hi:"नर्तक",          img:"💃"}, {en:"Postman",     hi:"डाकिया",          img:"📬"},
  {en:"Carpenter",   hi:"बढ़ई",           img:"🪚"}, {en:"Tailor",      hi:"दर्जी",           img:"🧵"},
  {en:"Soldier",     hi:"सैनिक",          img:"🪖"}, {en:"Lawyer",      hi:"वकील",            img:"⚖️"},
];

const clothes = [
  {en:"Shirt",       hi:"कमीज़",      img:"👕"},{en:"T-shirt",     hi:"टी-शर्ट",    img:"👕"},
  {en:"Pants",       hi:"पतलून",      img:"👖"},{en:"Dress",        hi:"पोशाक",      img:"👗"},
  {en:"Skirt",       hi:"स्कर्ट",    img:"👗"},{en:"Shorts",       hi:"निक्कर",     img:"🩳"},
  {en:"Jacket",      hi:"जैकेट",      img:"🧥"},{en:"Coat",         hi:"कोट",        img:"🧥"},
  {en:"Sweater",     hi:"स्वेटर",    img:"🧶"},{en:"Socks",        hi:"मोज़े",      img:"🧦"},
  {en:"Shoes",       hi:"जूते",       img:"👞"},{en:"Sneakers",     hi:"स्नीकर्स",  img:"👟"},
  {en:"Hat",         hi:"टोपी",       img:"🎩"},{en:"Cap",          hi:"कैप",        img:"🧢"},
  {en:"Scarf",       hi:"स्कार्फ",   img:"🧣"},{en:"Gloves",       hi:"दस्ताने",    img:"🧤"},
  {en:"Tie",         hi:"टाई",        img:"👔"},{en:"Belt",         hi:"बेल्ट",      img:"🥋"},
  {en:"Glasses",     hi:"चश्मा",     img:"👓"},{en:"Sunglasses",   hi:"धूप का चश्मा",img:"🕶️"},
];

const actionWords = [
  {en:"Run",      hi:"दौड़ना",        img:"🏃"},{en:"Walk",      hi:"चलना",          img:"🚶"},
  {en:"Jump",     hi:"कूदना",         img:"🤸"},{en:"Sit",       hi:"बैठना",          img:"🪑"},
  {en:"Stand",    hi:"खड़े होना",     img:"🧍"},{en:"Sleep",     hi:"सोना",           img:"😴"},
  {en:"Eat",      hi:"खाना",          img:"🍽️"},{en:"Drink",     hi:"पीना",           img:"🥛"},
  {en:"Read",     hi:"पढ़ना",         img:"📖"},{en:"Write",     hi:"लिखना",          img:"✍️"},
  {en:"Play",     hi:"खेलना",         img:"⚽"},{en:"Dance",     hi:"नाचना",          img:"💃"},
  {en:"Sing",     hi:"गाना",          img:"🎤"},{en:"Swim",      hi:"तैरना",          img:"🏊"},
  {en:"Cry",      hi:"रोना",          img:"😢"},{en:"Laugh",     hi:"हँसना",          img:"😂"},
  {en:"Smile",    hi:"मुस्कुराना",   img:"🙂"},{en:"Talk",      hi:"बात करना",       img:"🗣️"},
  {en:"Listen",   hi:"सुनना",         img:"👂"},{en:"Look",      hi:"देखना",          img:"👀"},
  {en:"Think",    hi:"सोचना",         img:"🤔"},{en:"Cook",      hi:"खाना पकाना",    img:"🍳"},
  {en:"Draw",     hi:"चित्र बनाना",  img:"🖍️"},{en:"Fly",       hi:"उड़ना",          img:"🕊️"},
  {en:"Climb",    hi:"चढ़ना",         img:"🧗"},{en:"Push",      hi:"धक्का देना",    img:"🫷"},
  {en:"Pull",     hi:"खींचना",        img:"🫸"},{en:"Give",      hi:"देना",           img:"🎁"},
  {en:"Take",     hi:"लेना",          img:"🤲"},{en:"Open",      hi:"खोलना",          img:"🔓"},
  {en:"Close",    hi:"बंद करना",      img:"🔒"},{en:"Drive",     hi:"गाड़ी चलाना",  img:"🚗"},
];

const emotionsData = [
  {en:"Happy",     hi:"खुश",         img:"😊"},{en:"Sad",        hi:"दुखी",         img:"😢"},
  {en:"Angry",     hi:"गुस्सा",       img:"😠"},{en:"Surprised",  hi:"हैरान",        img:"😲"},
  {en:"Scared",    hi:"डरा हुआ",     img:"😨"},{en:"Excited",    hi:"उत्साहित",    img:"🤩"},
  {en:"Tired",     hi:"थका हुआ",     img:"😴"},{en:"Bored",      hi:"उब गया",       img:"😒"},
  {en:"Confused",  hi:"भ्रमित",       img:"😕"},{en:"Proud",      hi:"गर्वित",       img:"😤"},
  {en:"Shy",       hi:"शर्मीला",     img:"🫣"},{en:"Calm",       hi:"शांत",          img:"😌"},
  {en:"Jealous",   hi:"ईर्ष्यालु",   img:"😒"},{en:"Lonely",     hi:"अकेला",        img:"🥺"},
  {en:"Grateful",  hi:"आभारी",       img:"🙏"},
];

// ── TYPES & HELPERS ──────────────────────────────────────────────────────────

type WordItem = { en: string; hi: string; img?: string; text?: string; hex?: string; num?: number };
type GameMode = "home" | "learn" | "quiz" | "result";

function getCategoryData(id: string): WordItem[] {
  switch (id) {
    case "alphabets":    return alphabets.map(a => ({ en: a.en, hi: a.hi, img: a.img, text: a.text }));
    case "numbers":      return (numbersData as any[]).slice(0, 20).map((n: any) => ({ en: n.word, hi: n.hi, img: "🔢", num: n.num }));
    case "colors":       return colorsData;
    case "shapes":       return shapesData;
    case "greetings":    return greetings;
    case "days":         return daysData;
    case "months":       return monthsData;
    case "seasons":      return seasonsData;
    case "body":         return bodyParts;
    case "family":       return familyData;
    case "animals":      return animals;
    case "birds":        return birdsData;
    case "fruits":       return fruits;
    case "vegetables":   return vegetables;
    case "food":         return foodData;
    case "vehicles":     return vehicles;
    case "occupations":  return occupations;
    case "clothes":      return clothes;
    case "actions":      return actionWords;
    case "emotions":     return emotionsData;
    default:             return [];
  }
}

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function generateQuiz(data: WordItem[], idx: number) {
  const correct = data[idx];
  const wrong = shuffle(data.filter((_, i) => i !== idx)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

// ── MINI COMPONENTS ──────────────────────────────────────────────────────────

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 500, opacity: 0, rotate: 720 }}
      transition={{ duration: 1.8, delay, ease: "easeIn" }} />
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 32 }, (_, i) => ({
    color: ["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7","#ec4899","#06b6d4","#84cc16"][i % 8],
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
    <motion.div className="text-5xl select-none"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
      {face}
    </motion.div>
  );
}

function StarBar({ stars, total }: { stars: number; total: number }) {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }}>
          <Star className={`w-5 h-5 ${i < stars ? "text-amber-400 fill-amber-400" : "text-white/20"}`} />
        </motion.div>
      ))}
      {total > 10 && stars > 10 && <span className="text-amber-300 text-sm font-bold ml-1">+{stars - 10}</span>}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function KidsPage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>("home");
  const [stars, setStars] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [learnedSet, setLearnedSet] = useState<Set<number>>(new Set());
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizOptions, setQuizOptions] = useState<WordItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotMood, setMascotMood] = useState<"happy" | "thinking" | "celebrate">("happy");
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [quizData, setQuizData] = useState<WordItem[]>([]);

  // Scroll to top when page loads or game mode changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameMode]);

  const playAudio = useCallback((text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.8; u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const catInfo = categories.find(c => c.id === selectedCat);
  const data = selectedCat ? getCategoryData(selectedCat) : [];

  const startLearn = (catId: string) => {
    setSelectedCat(catId); setLearnedSet(new Set()); setGameMode("learn");
  };

  const startQuiz = () => {
    const shuffled = shuffle(data).slice(0, Math.min(10, data.length));
    setQuizData(shuffled); setQuizIdx(0); setQuizScore(0);
    setQuizTotal(shuffled.length); setSelected(null); setIsCorrect(null);
    setLives(3); setStreak(0); setMascotMood("thinking");
    setQuizOptions(generateQuiz(shuffled, 0)); setGameMode("quiz");
  };

  const handleLearnTap = (idx: number, word: string) => {
    playAudio(word);
    if (!learnedSet.has(idx)) {
      setLearnedSet(prev => new Set([...prev, idx]));
      setStars(s => s + 1); setTotalXP(x => x + 10);
    }
  };

  const handleQuizAnswer = (item: WordItem) => {
    if (selected) return;
    const correctItem = quizData[quizIdx];
    const correct = item.en === correctItem.en;
    setSelected(item.en); setIsCorrect(correct);
    if (correct) {
      playAudio("Correct! " + correctItem.en);
      setQuizScore(s => s + 1); setStreak(s => s + 1);
      setStars(s => s + 1); setTotalXP(x => x + 15);
      setShowConfetti(true); setMascotMood("celebrate");
      setTimeout(() => setShowConfetti(false), 1800);
    } else {
      playAudio(correctItem.en);
      setLives(l => l - 1); setStreak(0); setMascotMood("thinking");
    }
    setTimeout(() => {
      const nextIdx = quizIdx + 1;
      const outOfLives = lives - (correct ? 0 : 1) <= 0;
      if (nextIdx >= quizData.length || outOfLives) {
        setGameMode("result"); setMascotMood("celebrate");
      } else {
        setQuizIdx(nextIdx); setQuizOptions(generateQuiz(quizData, nextIdx));
        setSelected(null); setIsCorrect(null); setMascotMood("thinking");
      }
    }, 1200);
  };

  const goHome = () => { setSelectedCat(null); setGameMode("home"); setLearnedSet(new Set()); };

  // ── HOME ────────────────────────────────────────────────────────────────────
  if (gameMode === "home") return (
    <main className="min-h-screen pb-24" style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81 50%,#4c1d95)" }}>
      <Confetti active={showConfetti} />

      {/* Top Bar */}
      <div className="sticky top-0 z-20 px-4 pt-4 pb-3" style={{ background: "rgba(30,27,75,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mascot mood="happy" />
            <div>
              <div className="text-white font-black text-xl">Kids Zone 🎮</div>
              <div className="text-purple-300 text-sm font-bold">सीखो और खेलो! (Learn & Play)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-white font-black">{stars}</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /><span className="text-white font-black">{totalXP} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-8 px-4">
        <motion.div initial={{ opacity:0,y:-20 }} animate={{ opacity:1,y:0 }}>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2">🌟 Kids Zone</h1>
          <p className="text-purple-200 text-lg font-bold">20 Topics · Learn + Quiz · Earn Stars!</p>
        </motion.div>
      </div>

      {/* 🧩 Puzzles Featured Banner */}
      <div className="px-4 max-w-4xl mx-auto mb-4">
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.2 }}>
          <Link href="/kids/puzzles"
            className="flex items-center justify-between rounded-3xl p-5 text-white shadow-2xl overflow-hidden border-b-4 border-purple-800"
            style={{ background:"linear-gradient(135deg,#7c3aed,#6d28d9,#4c1d95)" }}>
            <div className="absolute inset-0" style={{ background:"radial-gradient(circle at 20% 50%,rgba(255,255,255,0.15),transparent 65%)" }} />
            <div className="flex items-center gap-4 relative">
              <div className="text-5xl bg-white/15 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-white/25 shadow-inner shrink-0">
                🧩
              </div>
              <div>
                <div className="font-black text-xl">Puzzles!</div>
                <div className="text-purple-200 font-bold text-sm">Word Scramble · Memory Match · Missing Letter · Sentence Builder</div>
              </div>
            </div>
            <div className="relative bg-white/20 rounded-full p-2 border border-white/30 shrink-0">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Category Grid */}
      <div className="px-4 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
        {categories.map((cat, i) => {
          const cardContent = (
            <>
              <div className="absolute inset-0" style={{ background:"radial-gradient(circle at 30% 30%,rgba(255,255,255,0.2),transparent 65%)" }} />
              <div className="text-5xl bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-inner shrink-0">
                {cat.icon}
              </div>
              <div className="text-center">
                <div className="font-black text-base leading-tight">{cat.title}</div>
                <div className="text-white/80 text-xs font-bold mt-0.5">{cat.hindi}</div>
              </div>
              <div className="absolute bottom-2 right-3 text-white/50 text-xs font-bold">{cat.count} words</div>
            </>
          );
          const sharedClass = "relative rounded-3xl p-5 flex flex-col items-center gap-3 text-white shadow-2xl overflow-hidden border-b-4 min-h-[160px]";
          const sharedStyle = { background:`linear-gradient(135deg,${cat.from},${cat.to})`, borderBottomColor:cat.border };

          if (cat.id === "numbers") {
            return (
              <motion.div key={cat.id}
                initial={{ opacity:0,scale:0.8,y:20 }} animate={{ opacity:1,scale:1,y:0 }} transition={{ delay: i*0.04 }}
                whileHover={{ scale:1.06,y:-4 }} whileTap={{ scale:0.94 }}>
                <Link href="/kids/numbers" className={sharedClass} style={sharedStyle}>
                  {cardContent}
                </Link>
              </motion.div>
            );
          }
          return (
            <motion.button key={cat.id} onClick={() => startLearn(cat.id)}
              initial={{ opacity:0,scale:0.8,y:20 }} animate={{ opacity:1,scale:1,y:0 }} transition={{ delay: i*0.04 }}
              whileHover={{ scale:1.06,y:-4 }} whileTap={{ scale:0.94 }}
              className={sharedClass} style={sharedStyle}>
              {cardContent}
            </motion.button>
          );
        })}
      </div>
      <BottomNav />
    </main>
  );

  // ── LEARN ───────────────────────────────────────────────────────────────────
  if (gameMode === "learn" && catInfo) {
    const progress = learnedSet.size / data.length;
    const isColor = selectedCat === "colors";
    const isAlpha = selectedCat === "alphabets";
    return (
      <main className="min-h-screen pb-24" style={{ background:`linear-gradient(160deg,${catInfo.from}15,${catInfo.to}08,#f8fafc)` }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 px-4 pt-4 pb-3 bg-white/92 backdrop-blur-md border-b-2 border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button onClick={goHome} className="flex items-center gap-2 font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                <Home className="w-4 h-4" /> Home
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="font-black text-amber-600 text-sm">{stars}</span>
                </div>
                <button onClick={startQuiz}
                  className="flex items-center gap-2 text-white font-black px-4 py-2 rounded-full shadow-lg text-sm"
                  style={{ background:`linear-gradient(135deg,${catInfo.from},${catInfo.to})` }}>
                  <Gamepad2 className="w-4 h-4" /> Play Quiz!
                </button>
              </div>
            </div>
            {/* Category title + progress */}
            <div className="flex items-center gap-3">
              <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{ background:`linear-gradient(135deg,${catInfo.from},${catInfo.to})` }}>{catInfo.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-lg text-slate-800 truncate">{catInfo.title}
                  <span className="text-slate-400 text-sm font-bold ml-2">({catInfo.hindi})</span></div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                    <motion.div className="h-2.5 rounded-full" style={{ background:`linear-gradient(90deg,${catInfo.from},${catInfo.to})` }}
                      initial={{ width:0 }} animate={{ width:`${progress*100}%` }} transition={{ duration:0.5 }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 shrink-0">{learnedSet.size}/{data.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center py-3 text-slate-500 font-bold text-sm">
          👆 Tap each card to hear it · Earn ⭐ per new word!
        </p>

        {/* Cards Grid */}
        <div className="px-4 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-32">
          {data.map((item, idx) => {
            const learned = learnedSet.has(idx);
            return (
              <motion.button key={idx}
                onClick={() => handleLearnTap(idx, item.text ? `${item.text} for ${item.en}` : item.en)}
                initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }} transition={{ delay:idx*0.015 }}
                whileHover={{ scale:1.05,y:-3 }} whileTap={{ scale:0.92 }}
                className={`relative bg-white rounded-3xl p-4 flex flex-col items-center shadow-md border-b-4 transition-all ${learned ? "ring-2" : ""}`}
                style={{ borderBottomColor:learned?catInfo.from:"#e2e8f0" }}>
                {learned && (
                  <motion.div className="absolute top-2 right-2" initial={{ scale:0 }} animate={{ scale:1 }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color:catInfo.from }} />
                  </motion.div>
                )}
                {/* Render based on category type */}
                {isColor ? (
                  <div className="w-16 h-16 rounded-full mb-3 border-4 border-white shadow-lg ring-4 ring-slate-100"
                    style={{ backgroundColor:item.hex }} />
                ) : isAlpha ? (
                  <>
                    <div className="text-4xl font-black mb-1" style={{ color:catInfo.from }}>{item.text}</div>
                    <div className="text-4xl mb-2">{item.img}</div>
                  </>
                ) : selectedCat === "numbers" ? (
                  <>
                    <div className="text-4xl font-black mb-1" style={{ color:catInfo.from }}>{item.num}</div>
                    <div className="text-2xl mb-2">🔢</div>
                  </>
                ) : (
                  <div className="text-5xl mb-3">{item.img}</div>
                )}
                <div className="text-base font-black text-slate-800 text-center leading-tight">{item.en}</div>
                <div className="text-sm font-bold mt-1 text-center" style={{ color:catInfo.from }}>{item.hi}</div>
                {!learned && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-400 font-bold">
                    <Volume2 className="w-3 h-3" /> tap to listen
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Static Quiz CTA at the bottom */}
        {learnedSet.size >= Math.min(5, data.length) && (
          <div className="flex justify-center mt-8 mb-12">
            <motion.button onClick={startQuiz}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2 text-white font-black text-lg px-8 py-4 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
              style={{ background: `linear-gradient(135deg, ${catInfo.from}, ${catInfo.to})` }}>
              <Trophy className="w-6 h-6" /> 🎯 Play Quiz Now!
            </motion.button>
          </div>
        )}
        <BottomNav />
      </main>
    );
  }

  // ── QUIZ ────────────────────────────────────────────────────────────────────
  if (gameMode === "quiz" && catInfo && quizData.length > 0) {
    const currentWord = quizData[quizIdx];
    const isColor = selectedCat === "colors";
    const progressPct = (quizIdx / quizTotal) * 100;
    return (
      <main className="min-h-screen pb-24 flex flex-col" style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
        <Confetti active={showConfetti} />
        <div className="px-4 pt-5 pb-4 flex-1">
          <div className="max-w-xl mx-auto">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setGameMode("learn")} className="text-white/60 hover:text-white flex items-center gap-1 font-bold text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.span key={i} className={`text-xl ${i < lives ? "" : "opacity-20"}`}
                      animate={i === lives && isCorrect === false ? { scale:[1,1.4,1] } : {}}>❤️</motion.span>
                  ))}
                </div>
                <div className="bg-white/10 rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-black">{quizScore}</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white/10 rounded-full h-3 mb-1">
              <motion.div className="h-3 rounded-full"
                style={{ background:`linear-gradient(90deg,${catInfo.from},${catInfo.to})` }}
                initial={{ width:0 }} animate={{ width:`${progressPct}%` }} transition={{ duration:0.4 }} />
            </div>
            <div className="flex justify-between text-xs text-white/50 font-bold mb-5">
              <span>Question {quizIdx+1} of {quizTotal}</span>
              {streak > 1 && <motion.span className="text-amber-400" animate={{ scale:[1,1.2,1] }} transition={{ duration:0.3 }}>🔥 {streak} streak!</motion.span>}
            </div>

            {/* Mascot speech bubble */}
            <div className="flex items-center gap-3 mb-5">
              <Mascot mood={mascotMood} />
              <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/20 text-white font-bold text-sm flex-1">
                {isCorrect === true ? "🎉 Amazing! You got it!" : isCorrect === false ? "😅 Oops! The correct answer is shown in green." : "👇 Pick the correct English word!"}
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div key={quizIdx} initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-40 }}
                className="bg-white/10 rounded-3xl p-6 text-center mb-5 border border-white/20 backdrop-blur-sm">
                {isColor
                  ? <div className="w-28 h-28 rounded-full mx-auto border-4 border-white/30 shadow-2xl mb-3"
                      style={{ backgroundColor:currentWord.hex }} />
                  : selectedCat === "numbers"
                  ? <div className="text-7xl font-black mb-2" style={{ color:catInfo.from }}>{currentWord.num}</div>
                  : <div className="text-7xl mb-3 leading-none">{currentWord.img}</div>
                }
                <div className="text-white/70 font-bold">What is this in English?</div>
                <div className="font-black text-xl mt-1" style={{ color:catInfo.to }}>{currentWord.hi}</div>
              </motion.div>
            </AnimatePresence>

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((opt, i) => {
                const isSel = selected === opt.en;
                const isRight = opt.en === currentWord.en;
                let cls = "bg-white/10 border-white/20 text-white hover:bg-white/15";
                if (selected) {
                  if (isRight) cls = "bg-emerald-500/30 border-emerald-400 text-emerald-200";
                  else if (isSel) cls = "bg-red-500/30 border-red-400 text-red-200";
                  else cls = "bg-white/5 border-white/10 text-white/25";
                }
                return (
                  <motion.button key={i} onClick={() => handleQuizAnswer(opt)} disabled={!!selected}
                    whileHover={!selected ? { scale:1.04 } : {}} whileTap={!selected ? { scale:0.96 } : {}}
                    className={`${cls} border-2 rounded-2xl p-4 font-black text-sm md:text-base transition-all flex items-center justify-center gap-2 min-h-[64px]`}>
                    {selected && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {selected && isSel && !isRight && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    {isColor && <div className="w-5 h-5 rounded-full border-2 border-white/30 shrink-0" style={{ backgroundColor:opt.hex }} />}
                    <span className="text-center leading-tight">{opt.en}</span>
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

  // ── RESULT ──────────────────────────────────────────────────────────────────
  if (gameMode === "result" && catInfo) {
    const pct = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0;
    const grade = pct >= 90 ? "🏆 Champion!" : pct >= 70 ? "⭐ Great Job!" : pct >= 50 ? "👍 Good Try!" : "💪 Keep Practicing!";
    const earnedXP = quizScore * 15;
    return (
      <main className="min-h-screen pb-24 flex flex-col items-center justify-center px-4"
        style={{ background:"linear-gradient(135deg,#1e1b4b,#312e81)" }}>
        <Confetti active={pct >= 70} />
        <motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full text-center border border-white/20 shadow-2xl"
          initial={{ scale:0.5,opacity:0 }} animate={{ scale:1,opacity:1 }} transition={{ type:"spring",duration:0.7 }}>
          <Mascot mood="celebrate" />
          <motion.div className="text-4xl font-black text-white mt-4 mb-2"
            initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.3,type:"spring" }}>
            {grade}
          </motion.div>
          <p className="text-white/60 font-bold mb-2">
            {catInfo.icon} {catInfo.title}
          </p>
          <div className="text-2xl font-black text-white mb-5">{quizScore} / {quizTotal} correct</div>

          {/* Circular score ring */}
          <div className="relative w-32 h-32 mx-auto mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke={catInfo.from} strokeWidth="3.5"
                strokeLinecap="round" strokeDasharray={`${pct} 100`}
                initial={{ strokeDasharray:"0 100" }} animate={{ strokeDasharray:`${pct} 100` }}
                transition={{ duration:1.5,ease:"easeOut",delay:0.4 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-black text-white">{pct}%</div>
            </div>
          </div>

          {/* XP earned */}
          <motion.div className="rounded-2xl px-4 py-3 mb-5 flex items-center justify-center gap-2"
            style={{ background:"rgba(245,158,11,0.15)", border:"1px solid rgba(251,191,36,0.3)" }}
            initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.6 }}>
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-black text-lg">+{earnedXP} XP Earned!</span>
          </motion.div>

          <StarBar stars={quizScore} total={quizTotal} />

          <div className="flex flex-col gap-3 mt-6">
            <button onClick={startQuiz}
              className="w-full text-white font-black py-4 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-lg"
              style={{ background:`linear-gradient(135deg,${catInfo.from},${catInfo.to})` }}>
              <RotateCcw className="w-5 h-5" /> Play Again!
            </button>
            <button onClick={() => setGameMode("learn")}
              className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/15 transition-colors">
              <BookOpen className="w-4 h-4" /> Continue Learning
            </button>
            <button onClick={goHome} className="text-white/50 hover:text-white/80 font-bold py-2 flex items-center justify-center gap-2 transition-colors">
              <Home className="w-4 h-4" /> Choose Another Topic
            </button>
          </div>
        </motion.div>
        <BottomNav />
      </main>
    );
  }

  return null;
}
