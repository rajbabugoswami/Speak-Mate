const fs = require('fs');
const path = require('path');

const grammarCurriculum = [
  {
    id: "class-8-1",
    title: "Class 8: Parts of Speech (Basics)",
    description: "Nouns, Pronouns, Adjectives, and Adverbs.",
    topics: [
      {
        id: "nouns-pronouns",
        title: "Nouns & Pronouns",
        description: "Names, Types, and Pronoun replacements.",
        lessons: [
          {
            id: "nouns-types",
            title: "Nouns: Types, Number, Gender",
            explanation: "A Noun is the name of a person, place, animal, thing, or abstract idea. (संज्ञा किसी व्यक्ति, वस्तु, स्थान, जानवर या भाव के नाम को कहते हैं।)\n\nTypes of Nouns (संज्ञा के प्रकार):\n1. Proper Noun (व्यक्तिवाचक): Specific names like India, Rahul. (विशेष नाम। हमेशा Capital letter से शुरू होते हैं।)\n2. Common Noun (जातिवाचक): General names like Boy, City. (सामान्य नाम।)\n3. Collective Noun (समूहवाचक): Groups like Army, Class. (समूह का नाम।)\n4. Material Noun (द्रव्यवाचक): Substances like Gold, Wood. (पदार्थों के नाम।)\n5. Abstract Noun (भाववाचक): Feelings/Ideas like Love, Honesty. (भाव या विचार जिन्हें छुआ नहीं जा सकता।)\n\nNumber (वचन): Singular (एकवचन - Boy) vs Plural (बहुवचन - Boys).\nGender (लिंग): Masculine (पुल्लिंग - Man), Feminine (स्त्रीलिंग - Woman), Neuter (नपुंसकलिंग - Book).",
            rule: "Proper nouns are always capitalized. Possessive case uses an apostrophe ('s). (Proper nouns हमेशा बड़े अक्षर से शुरू होते हैं।)",
            examples: [
              { en: "Honesty is the best policy.", hi: "ईमानदारी सबसे अच्छी नीति है।" },
              { en: "The herd of cattle is grazing.", hi: "मवेशियों का झुंड चर रहा है।" },
              { en: "This is Ram's book.", hi: "यह राम की किताब है।" },
              { en: "Delhi is the capital of India.", hi: "दिल्ली भारत की राजधानी है।" },
              { en: "Gold is a precious metal.", hi: "सोना एक कीमती धातु है।" }
            ]
          },
          {
            id: "pronouns-types",
            title: "Pronouns: Personal & Relative",
            explanation: "Pronouns replace nouns to avoid repetition. (संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं, ताकि एक ही नाम बार-बार न लेना पड़े।)\n\nTypes of Pronouns (सर्वनाम के प्रकार):\n1. Personal (पुरुषवाचक): I (मैं), We (हम), You (तुम), He (वह), She (वह), They (वे)।\n2. Reflexive (निजवाचक): Myself, Yourself. (जब काम का असर खुद पर हो, जैसे: मैंने खुद किया)।\n3. Demonstrative (निश्चयवाचक): This (यह), That (वह), These (ये), Those (वे)।\n4. Relative (संबंधवाचक): Who (जो), Which (जो), That (जो). (वाक्यों को जोड़ने वाले शब्द।)",
            rule: "A relative pronoun must agree with its antecedent (the noun it replaces). (Relative pronoun हमेशा उस संज्ञा के अनुसार लगता है जिसकी जगह वह आता है।)",
            examples: [
              { en: "I myself saw him.", hi: "मैंने खुद उसे देखा।" },
              { en: "The man who is standing there is my brother.", hi: "जो आदमी वहां खड़ा है वह मेरा भाई है।" },
              { en: "Someone has stolen my pen.", hi: "किसी ने मेरा पेन चुरा लिया है।" },
              { en: "These are my books.", hi: "ये मेरी किताबें हैं।" },
              { en: "She did the work herself.", hi: "उसने खुद काम किया।" }
            ]
          }
        ]
      },
      {
        id: "adj-adv",
        title: "Adjectives & Adverbs",
        description: "Modifiers for Nouns and Verbs.",
        lessons: [
          {
            id: "adjectives",
            title: "Adjectives & Degrees",
            explanation: "Adjectives describe or give more information about Nouns. (जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं।)\nTypes: Quality (अच्छा/बुरा), Quantity (कुछ/थोड़ा), Number (पांच/दस)।\n\nDegrees of Comparison (तुलना की अवस्थाएँ):\n1. Positive Degree (मूल अवस्था): Tall (लंबा)\n2. Comparative Degree (तुलनात्मक): Taller (से लंबा - Used to compare 2 things. इसके साथ 'than' लगता है।)\n3. Superlative Degree (उत्तम अवस्था): Tallest (सबसे लंबा - Used to compare all. इसके साथ 'the' लगता है।)",
            rule: "Use 'the' before superlative degrees. (Superlative degree से पहले हमेशा 'the' का प्रयोग करें। जैसे: The tallest boy).",
            examples: [
              { en: "He is the tallest boy in the class.", hi: "वह कक्षा में सबसे लंबा लड़का है।" },
              { en: "Gold is more precious than silver.", hi: "सोना चांदी से अधिक कीमती है।" },
              { en: "I have some milk.", hi: "मेरे पास थोड़ा दूध है।" },
              { en: "This puzzle is very difficult.", hi: "यह पहेली बहुत कठिन है।" },
              { en: "She wears a red dress.", hi: "वह लाल रंग की पोशाक पहनती है।" }
            ]
          },
          {
            id: "adverbs",
            title: "Adverbs: Types & Position",
            explanation: "Adverbs modify Verbs, Adjectives, or other Adverbs. (जो शब्द क्रिया, विशेषण या दूसरे क्रिया-विशेषण की विशेषता बताते हैं, उन्हें क्रिया विशेषण कहते हैं।)\n\nTypes (प्रकार):\n1. Manner (कैसे? - How?): slowly (धीरे से), quickly (तेजी से)।\n2. Time (कब? - When?): now (अभी), tomorrow (कल)।\n3. Place (कहाँ? - Where?): here (यहाँ), everywhere (हर जगह)।\n4. Frequency (कितनी बार? - How often?): always (हमेशा), never (कभी नहीं)।",
            rule: "Adverbs of frequency usually come BEFORE the main verb. (हमेशा या कभी नहीं बताने वाले शब्द मुख्य क्रिया से पहले आते हैं। जैसे: He ALWAYS comes late).",
            examples: [
              { en: "She sings very beautifully.", hi: "वह बहुत सुंदर गाती है।" },
              { en: "He always speaks the truth.", hi: "वह हमेशा सच बोलता है।" },
              { en: "Go there immediately.", hi: "वहां तुरंत जाओ।" },
              { en: "The tortoise walked slowly.", hi: "कछुआ धीरे-धीरे चला।" },
              { en: "I will call you tomorrow.", hi: "मैं तुम्हें कल कॉल करूंगा।" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class-8-2",
    title: "Class 8: Connections",
    description: "Prepositions, Conjunctions & Articles.",
    topics: [
      {
        id: "prep-conj",
        title: "Prepositions & Conjunctions",
        description: "Connecting words and phrases.",
        lessons: [
          {
            id: "prepositions",
            title: "Prepositions of Time & Place",
            explanation: "Prepositions show the relationship between a noun and other words. (ये शब्द बताते हैं कि कोई चीज़ कहाँ है या कब हुई।)\n\nTime (समय): \n• in (महीने/साल के लिए - in May)\n• on (दिन/तारीख के लिए - on Monday)\n• at (निश्चित समय के लिए - at 5 PM)\n\nPlace (स्थान):\n• in (अंदर के लिए - in a room)\n• on (ऊपर, सतह पर - on the table)\n• at (निश्चित स्थान के लिए - at the station)",
            rule: "Always use the objective case of a pronoun after a preposition. (Preposition के बाद हमेशा Me, Him, Us का प्रयोग करें, I, He, We का नहीं)।",
            examples: [
              { en: "He is afraid of dogs.", hi: "उसे कुत्तों से डर लगता है।" },
              { en: "The book is on the table.", hi: "किताब मेज पर है।" },
              { en: "I will meet you at 5 PM on Monday.", hi: "मैं आपसे सोमवार को शाम 5 बजे मिलूंगा।" },
              { en: "She is fond of music.", hi: "उसे संगीत का शौक है।" },
              { en: "Look at the blackboard.", hi: "ब्लैकबोर्ड की ओर देखें।" }
            ]
          },
          {
            id: "conjunctions",
            title: "Coordinating & Subordinating",
            explanation: "Conjunctions are joining words. (ये शब्दों या वाक्यों को जोड़ने का काम करते हैं।)\n\n1. Coordinating (स्वतंत्र वाक्यों को जोड़ना - FANBOYS): For, And (और), Nor, But (लेकिन), Or (या), Yet (फिर भी), So (इसलिए)।\n2. Subordinating (आश्रित वाक्यों को जोड़ना): Because (क्योंकि), Although (हालाँकि), If (यदि), When (जब)।\n3. Correlative (जोड़े में आने वाले): Either...or (या तो...या), Neither...nor (न तो...न ही)।",
            rule: "When using 'Neither...nor', the verb agrees with the closest subject. (Neither/nor में क्रिया पास वाले कर्ता के अनुसार लगती है।)",
            examples: [
              { en: "Neither Ram nor his friends are coming.", hi: "न राम और न ही उसके दोस्त आ रहे हैं।" },
              { en: "I was sleeping when he called.", hi: "मैं सो रहा था जब उसने फोन किया।" },
              { en: "He is poor but honest.", hi: "वह गरीब है लेकिन ईमानदार है।" },
              { en: "Work hard lest you should fail.", hi: "कड़ी मेहनत करो कहीं ऐसा न हो कि तुम असफल हो जाओ।" },
              { en: "He failed because he didn't study.", hi: "वह असफल रहा क्योंकि उसने पढ़ाई नहीं की।" }
            ]
          }
        ]
      },
      {
        id: "articles-det",
        title: "Articles & Determiners",
        description: "A, An, The, and Quantifiers.",
        lessons: [
          {
            id: "articles",
            title: "Definite vs Indefinite",
            explanation: "Articles point out nouns. (Articles यह बताते हैं कि हम किसी विशेष चीज़ की बात कर रहे हैं या किसी आम चीज़ की।)\n\n1. Indefinite (A / An - कोई एक):\n• An: Use before VOWEL SOUNDS (स्वर ध्वनि - अ, आ, इ, ई). (An hour, An apple)।\n• A: Use before CONSONANT SOUNDS (व्यंजन ध्वनि - क, ख, ग). (A university, A book)।\n\n2. Definite (The - विशेष):\n• The: Used for specific nouns, unique things, superlatives (विशेष चीज़ें, दुनिया में एक ही चीज़ें - The sun, The best)।",
            rule: "Do not use 'The' before proper nouns like names of people or cities. (लोगों या शहरों के नाम के आगे 'The' न लगाएं)।",
            examples: [
              { en: "He is an honest man.", hi: "वह एक ईमानदार आदमी है।" },
              { en: "The sun rises in the east.", hi: "सूरज पूर्व में उगता है।" },
              { en: "I saw a European riding an elephant.", hi: "मैंने एक यूरोपीय को हाथी की सवारी करते देखा।" },
              { en: "She is a university student.", hi: "वह एक विश्वविद्यालय की छात्रा है।" },
              { en: "The Ganga is a holy river.", hi: "गंगा एक पवित्र नदी है।" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class-9-1",
    title: "Class 9: Tenses Mastery",
    description: "Complete rules for all 12 Tenses.",
    topics: [
      {
        id: "present-past",
        title: "Present & Past Tenses",
        description: "Formulas and usages.",
        lessons: [
          {
            id: "present-tense",
            title: "Present Tense (4 Types)",
            explanation: "Present Tense (वर्तमान काल - जो अभी हो रहा है या रोज़ होता है):\n\n1. Simple Present (सामान्य): Sub + V1(s/es). Habit, truth. (वह खेलता है - He plays.)\n2. Present Continuous (अपूर्ण): Sub + is/am/are + V1+ing. Happening now. (वह खेल रहा है - He is playing.)\n3. Present Perfect (पूर्ण): Sub + has/have + V3. Just finished. (वह खेल चुका है - He has played.)\n4. Present Perfect Continuous: Sub + has/have been + V1+ing + since/for. Started in past, still going on. (वह 2 घंटे से खेल रहा है - He has been playing for 2 hours.)",
            rule: "Use 'since' for a fixed point in time (Monday), 'for' for a duration (2 hours). ('Since' निश्चित समय के लिए और 'For' समय की अवधि के लिए प्रयोग होता है)।",
            examples: [
              { en: "I play cricket every day.", hi: "मैं हर दिन क्रिकेट खेलता हूँ।" },
              { en: "She is singing a song now.", hi: "वह अभी गाना गा रही है।" },
              { en: "He has already finished his work.", hi: "उसने पहले ही अपना काम पूरा कर लिया है।" },
              { en: "I have been living here since 2010.", hi: "मैं 2010 से यहां रह रहा हूं।" },
              { en: "Water boils at 100 degrees.", hi: "पानी 100 डिग्री पर उबलता है।" }
            ]
          },
          {
            id: "past-tense",
            title: "Past Tense (4 Types)",
            explanation: "Past Tense (भूतकाल - जो हो चुका है):\n\n1. Simple Past: Sub + V2. Completed action. (उसने खेला - He played.)\n2. Past Continuous: Sub + was/were + V1+ing. Was happening in past. (वह खेल रहा था - He was playing.)\n3. Past Perfect: Sub + had + V3. Finished BEFORE another past action. (ट्रेन जा चुकी थी - Train had left.)\n4. Past Perfect Continuous: Sub + had been + V1+ing + time. (वह 2 घंटे से खेल रहा था)।",
            rule: "In Simple Past negative/question, use 'did' + V1. Never use V2 with 'did'. (Did के साथ हमेशा Verb की 1st form आती है)।",
            examples: [
              { en: "I went to the market yesterday.", hi: "मैं कल बाजार गया था।" },
              { en: "They were sleeping when the thief entered.", hi: "चोर घुसा तब वे सो रहे थे।" },
              { en: "The train had left before I reached.", hi: "मेरे पहुंचने से पहले ट्रेन जा चुकी थी।" },
              { en: "I had been working for 5 hours.", hi: "मैं 5 घंटे से काम कर रहा था।" },
              { en: "Did you watch the movie?", hi: "क्या तुमने फिल्म देखी?" }
            ]
          }
        ]
      },
      {
        id: "future-tense",
        title: "Future Tense",
        description: "Future rules and structures.",
        lessons: [
          {
            id: "future-all",
            title: "Future Tense (4 Types)",
            explanation: "Future Tense (भविष्य काल - जो होगा):\n\n1. Simple Future: Sub + will + V1 (वह खेलेगा - He will play).\n2. Future Continuous: Sub + will be + V1+ing (वह खेल रहा होगा - He will be playing).\n3. Future Perfect: Sub + will have + V3 (वह खेल चुका होगा - He will have played by 5 PM).\n4. Future Perfect Continuous: Sub + will have been + V1+ing + time. (वह 2 घंटे से खेल रहा होगा)।",
            rule: "'By the time' is a strong indicator of Future Perfect tense. (जब तक ऐसा होगा, तब तक काम पूरा हो चुका होगा)।",
            examples: [
              { en: "I will call you later.", hi: "मैं तुम्हें बाद में कॉल करूँगा।" },
              { en: "She will be traveling tomorrow.", hi: "वह कल यात्रा कर रही होगी।" },
              { en: "I will have finished the syllabus by March.", hi: "मैं मार्च तक पाठ्यक्रम पूरा कर चुका हूँगा।" },
              { en: "By next year, I will have been living here for ten years.", hi: "अगले साल तक, मैं यहां दस साल से रह रहा हूँगा।" },
              { en: "Will you help me?", hi: "क्या तुम मेरी मदद करोगे?" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class-10-1",
    title: "Class 10: Voice & Modals",
    description: "Active/Passive voice and Modals.",
    topics: [
      {
        id: "voice",
        title: "Active & Passive Voice",
        description: "Transformation rules by Tense.",
        lessons: [
          {
            id: "voice-rules",
            title: "Voice Transformation",
            explanation: "Active Voice (कर्तृवाच्य): कर्ता (Subject) खुद काम करता है। (Subject + Verb + Object)\nPassive Voice (कर्मवाच्य): काम पर ज़ोर दिया जाता है, कर्ता पर नहीं। (Object + Helping Verb + V3 + by + Subject)\n\nRules by Tense (नियम):\n• Simple Present: is/am/are + V3\n• Present Cont: is/am/are + being + V3\n• Simple Past: was/were + V3\n• Past Cont: was/were + being + V3\n• Perfect Tenses: has/have/had + been + V3\n• Modals: Modal + be + V3",
            rule: "Passive voice ALWAYS uses the 3rd form of the verb (V3). (Passive Voice में हमेशा Verb की तीसरी form लगती है)।",
            examples: [
              { en: "Active: He writes a letter. -> Passive: A letter is written by him.", hi: "उसके द्वारा एक पत्र लिखा जाता है।" },
              { en: "Active: She is cooking food. -> Passive: Food is being cooked by her.", hi: "खाना उसके द्वारा पकाया जा रहा है।" },
              { en: "Active: I had completed the work. -> Passive: The work had been completed by me.", hi: "काम मेरे द्वारा पूरा किया जा चुका था।" },
              { en: "Active: You must follow rules. -> Passive: Rules must be followed by you.", hi: "नियमों का पालन तुम्हारे द्वारा किया जाना चाहिए।" },
              { en: "Active: Open the door. -> Passive: Let the door be opened.", hi: "दरवाजा खोला जाए।" }
            ]
          }
        ]
      },
      {
        id: "modals",
        title: "Modal Auxiliaries",
        description: "Can, Could, Should, Must.",
        lessons: [
          {
            id: "modals-all",
            title: "Usage of Modals",
            explanation: "Modals are auxiliary verbs that express mood, ability, permission, or obligation. (ये क्रियाएँ वक्ता का मूड, क्षमता, या सलाह बताती हैं।)\n\n• Can/Could: Ability (क्षमता), Request (निवेदन)।\n• May/Might: Permission (अनुमति), Possibility (संभावना)।\n• Will/Would: Future intention, Polite request (विनम्र निवेदन)।\n• Shall/Should: Suggestion/Advice (सलाह)।\n• Must: Strong obligation (अत्यंत आवश्यक)।\n• Ought to: Moral duty (नैतिक कर्तव्य)।",
            rule: "Modals never take 's' or 'ing'. They are always followed by V1. (Modals के बाद हमेशा Verb की 1st form आती है)।",
            examples: [
              { en: "You must wear a seatbelt.", hi: "तुम्हें सीटबेल्ट जरूर पहननी चाहिए।" },
              { en: "May God bless you!", hi: "भगवान आपका भला करे!" },
              { en: "I could run fast when I was young.", hi: "जब मैं छोटा था तो तेज दौड़ सकता था।" },
              { en: "You should respect your elders.", hi: "तुम्हें अपने बड़ों का सम्मान करना चाहिए।" },
              { en: "Can I come in?", hi: "क्या मैं अंदर आ सकता हूँ?" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class-11-1",
    title: "Class 11: Narration & Syntax",
    description: "Direct/Indirect Speech and Subject-Verb Agreement.",
    topics: [
      {
        id: "narration",
        title: "Direct & Indirect Speech",
        description: "Rules for reporting speech.",
        lessons: [
          {
            id: "narration-rules",
            title: "Narration Tense Changes",
            explanation: "Direct Speech: किसी की कही गई बात को उसी के शब्दों में कहना। (Ram said, 'I am busy.')\nIndirect Speech: उसकी बात को अपने शब्दों में कहना। (Ram said that he was busy.)\n\nTense Changes (अगर reporting verb Past में है - He said):\n• Present Simple -> Past Simple\n• Present Cont -> Past Cont\n• Present Perfect -> Past Perfect\n• Past Simple -> Past Perfect\n• Will/Can/May -> Would/Could/Might.\n\nQuestions (प्रश्नों के लिए): Use 'if/whether' and change 'said' to 'asked'.",
            rule: "If reporting verb is Present (says), or if quote is a Universal Truth, TENSE DOES NOT CHANGE. (सच्चाई या Present tense में Tense नहीं बदलता)।",
            examples: [
              { en: "Direct: He said, 'I am busy.' -> Indirect: He said that he was busy.", hi: "उसने कहा कि वह व्यस्त था।" },
              { en: "Direct: Teacher said, 'The earth is round.' -> Indirect: Teacher said that the earth is round.", hi: "शिक्षक ने कहा कि पृथ्वी गोल है।" },
              { en: "Direct: She said to him, 'Are you okay?' -> Indirect: She asked him if he was okay.", hi: "उसने उससे पूछा कि क्या वह ठीक था।" },
              { en: "Direct: He says, 'I am tired.' -> Indirect: He says that he is tired.", hi: "वह कहता है कि वह थका हुआ है।" },
              { en: "Direct: Doctor said, 'Take medicine.' -> Indirect: Doctor advised to take medicine.", hi: "डॉक्टर ने दवा लेने की सलाह दी।" }
            ]
          }
        ]
      },
      {
        id: "syntax",
        title: "Subject-Verb Agreement",
        description: "Matching Subjects and Verbs.",
        lessons: [
          {
            id: "syntax-rules",
            title: "Syntax Critical Rules",
            explanation: "Subject-Verb Agreement: क्रिया (Verb) हमेशा कर्ता (Subject) के अनुसार होनी चाहिए। (Singular subject = Singular verb, Plural subject = Plural verb)।\n\nनियम (Rules):\n1. 'Either...or', 'Neither...nor' में Verb पास वाले Subject के अनुसार लगती है।\n2. 'Everyone, Nobody, Each, Every' हमेशा Singular Verb लेते हैं।\n3. 'As well as', 'Along with' से जुड़े वाक्यों में Verb पहले Subject के अनुसार लगती है।\n4. 'A number of' के साथ Plural verb आती है, जबकि 'The number of' के साथ Singular verb।",
            rule: "Identify the TRUE subject, ignore prepositional phrases in the middle. (असली कर्ता को पहचानें)।",
            examples: [
              { en: "Neither Ram nor his friends are coming.", hi: "न तो राम और न ही उसके दोस्त आ रहे हैं।" },
              { en: "Each of the boys is guilty.", hi: "लड़कों में से हर एक दोषी है।" },
              { en: "The captain, along with his team, was rewarded.", hi: "कप्तान को उसकी टीम के साथ पुरस्कृत किया गया।" },
              { en: "Everyone is happy.", hi: "हर कोई खुश है।" },
              { en: "A number of students are absent.", hi: "कई छात्र अनुपस्थित हैं।" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class-12-1",
    title: "Class 12: Advanced Structures",
    description: "Conditionals, Clauses, Synthesis, Figures of Speech.",
    topics: [
      {
        id: "conditionals-clauses",
        title: "Conditionals & Clauses",
        description: "If-sentences and Dependent Clauses.",
        lessons: [
          {
            id: "conditionals",
            title: "Conditional Sentences (0 to 3)",
            explanation: "Conditional Sentences शर्त वाले वाक्य होते हैं (अगर ऐसा हुआ, तो वैसा होगा)।\n\n0. Zero (तथ्य/Facts): If + Present, Present. (तथ्यों के लिए)।\n1. First (भविष्य की संभावना): If + Present, Future(Will). (अगर तुम पढ़ोगे, तो पास हो जाओगे)।\n2. Second (काल्पनिक वर्तमान): If + Past, Would + V1. (अगर मैं पक्षी होता, तो उड़ता)।\n3. Third (काल्पनिक भूतकाल): If + Past Perfect, Would have + V3. (अगर तुम आए होते, तो मैं तुम्हारी मदद करता)।",
            rule: "In Second Conditional, always use 'were' for all subjects (If I were a king...). (कल्पना में I, He, She के साथ 'were' लगता है)।",
            examples: [
              { en: "If you heat ice, it melts.", hi: "यदि आप बर्फ को गर्म करते हैं, तो यह पिघलती है।" },
              { en: "If she invites me, I will go.", hi: "अगर वह मुझे बुलाएगी, तो मैं जाऊंगा।" },
              { en: "If I were the PM, I would ban plastics.", hi: "अगर मैं प्रधानमंत्री होता, तो प्लास्टिक पर प्रतिबंध लगा देता।" },
              { en: "If I had known, I would have helped you.", hi: "अगर मुझे पता होता, तो मैंने आपकी मदद की होती।" },
              { en: "If he had driven carefully, he would not have crashed.", hi: "अगर उसने सावधानी से गाड़ी चलाई होती, तो वह दुर्घटनाग्रस्त नहीं होता।" }
            ]
          },
          {
            id: "clauses-types",
            title: "Noun, Adjective & Adverb Clauses",
            explanation: "A Clause is a group of words with a Subject and a Verb (उपवाक्य)।\n\nTypes of Dependent Clauses (आश्रित उपवाक्य):\n• Noun Clause: संज्ञा का काम करता है। 'क्या?' का जवाब देता है। (I know THAT HE IS HONEST).\n• Adjective Clause: संज्ञा की विशेषता बताता है। who/which/that का प्रयोग होता है। (The boy WHO WON is my brother).\n• Adverb Clause: समय, कारण, या शर्त बताता है। when/because/if का प्रयोग होता है। (I will go WHEN HE COMES).",
            rule: "An Adjective clause immediately follows the noun it describes. (Adjective clause हमेशा उस संज्ञा के ठीक बाद आता है)।",
            examples: [
              { en: "I don't know where he lives. (Noun Clause)", hi: "मुझे नहीं पता कि वह कहाँ रहता है।" },
              { en: "The book which is on the table is mine. (Adj Clause)", hi: "जो किताब मेज पर है वह मेरी है।" },
              { en: "He cried because he was hurt. (Adverb Clause)", hi: "वह रोया क्योंकि उसे चोट लगी थी।" },
              { en: "I will call you when I reach. (Adverb Clause)", hi: "जब मैं पहुँचूँगा तो तुम्हें कॉल करूँगा।" },
              { en: "Tell me why you are late. (Noun Clause)", hi: "मुझे बताओ कि तुम लेट क्यों हो।" }
            ]
          }
        ]
      },
      {
        id: "synthesis-figures",
        title: "Synthesis & Figures of Speech",
        description: "Joining sentences and poetic devices.",
        lessons: [
          {
            id: "synthesis",
            title: "Simple, Complex, Compound Sentences",
            explanation: "वाक्यों को जोड़ना (Synthesis of Sentences):\n\n1. Simple Sentence (सरल वाक्य): 1 Subject, 1 Verb. (शेर को देखकर वह भाग गया - Seeing the tiger, he ran away.)\n2. Compound Sentence (संयुक्त वाक्य): FANBOYS (and, but, or) से जुड़े होते हैं। (उसने शेर देखा और वह भाग गया - He saw the tiger AND he ran away.)\n3. Complex Sentence (मिश्रित वाक्य): आश्रित उपवाक्य (because, when, if) होते हैं। (जब उसने शेर देखा, तो वह भाग गया - WHEN he saw the tiger, he ran away.)",
            rule: "To synthesize into Simple, use Participles (Seeing), Infinitives (To see). (Simple वाक्य बनाने के लिए Participle का प्रयोग करें)।",
            examples: [
              { en: "Simple: In spite of being poor, he is honest.", hi: "गरीब होने के बावजूद वह ईमानदार है।" },
              { en: "Compound: He is poor but he is honest.", hi: "वह गरीब है लेकिन वह ईमानदार है।" },
              { en: "Complex: Although he is poor, he is honest.", hi: "हालाँकि वह गरीब है, वह ईमानदार है।" },
              { en: "Simple: He is too weak to walk.", hi: "वह चलने के लिए बहुत कमजोर है।" },
              { en: "Complex: He is so weak that he cannot walk.", hi: "वह इतना कमजोर है कि चल नहीं सकता।" }
            ]
          },
          {
            id: "figures-of-speech",
            title: "Figures of Speech (Literary Devices)",
            explanation: "Figures of Speech (अलंकार) भाषा को और अधिक सुंदर और प्रभावशाली बनाते हैं।\n\n1. Simile (उपमा): 'like' या 'as' का प्रयोग करके तुलना। (शेर की तरह बहादुर - As brave as a lion).\n2. Metaphor (रूपक): 'like/as' के बिना सीधी तुलना। (वह शेर है - He is a lion).\n3. Personification (मानवीकरण): निर्जीव वस्तुओं को मानव गुण देना। (हवा फुसफुसाई - The wind whispered).\n4. Oxymoron (विरोधाभास): दो विपरीत शब्द एक साथ। (Open secret).",
            rule: "Figures of speech are used to make English more poetic, expressive, and impactful. (ये अंग्रेजी को अधिक काव्यात्मक बनाते हैं)।",
            examples: [
              { en: "She fights like a lioness. (Simile)", hi: "वह शेरनी की तरह लड़ती है।" },
              { en: "Time is money. (Metaphor)", hi: "समय ही धन है।" },
              { en: "The stars danced in the night sky. (Personification)", hi: "रात के आसमान में तारे नाच रहे थे।" },
              { en: "It is an open secret. (Oxymoron)", hi: "यह एक खुला रहस्य है।" },
              { en: "I have told you a million times. (Hyperbole)", hi: "मैंने तुम्हें दस लाख बार बताया है।" }
            ]
          }
        ]
      }
    ]
  }
];

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'grammar.json'), JSON.stringify(grammarCurriculum, null, 2));
console.log("Successfully generated BILINGUAL (Hindi+English) 8-12 SYLLABUS Grammar Curriculum!");
