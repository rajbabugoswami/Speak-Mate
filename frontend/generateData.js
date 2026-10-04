const fs = require('fs');
const path = require('path');

// --- GRAMMAR GENERATION (Unchanged) ---
const curriculum = [
  {
    levelId: "beginner", levelTitle: "Beginner (Class 5-6)", levelDesc: "Basic building blocks of English grammar.",
    topics: [
      { id: "nouns", title: "Nouns (संज्ञा)", desc: "Naming words" },
      { id: "pronouns", title: "Pronouns (सर्वनाम)", desc: "Words used in place of nouns" },
      { id: "verbs-basic", title: "Action Verbs (क्रिया)", desc: "Basic action words" },
      { id: "adjectives", title: "Adjectives (विशेषण)", desc: "Words that describe nouns" }
    ]
  },
  {
    levelId: "intermediate", levelTitle: "Intermediate (Class 7-8)", levelDesc: "Forming proper sentences and understanding time.",
    topics: [
      { id: "tenses-present", title: "Present Tenses", desc: "Simple, Continuous, Perfect" },
      { id: "tenses-past", title: "Past Tenses", desc: "Simple, Continuous, Perfect" },
      { id: "tenses-future", title: "Future Tenses", desc: "Simple, Continuous, Perfect" },
      { id: "prepositions", title: "Prepositions", desc: "In, On, At, Under, Over" },
      { id: "conjunctions", title: "Conjunctions", desc: "And, But, Or, Because" }
    ]
  },
  {
    levelId: "advanced", levelTitle: "Advanced (Class 9-12)", levelDesc: "Complex sentence structures for fluent speaking.",
    topics: [
      { id: "modals", title: "Modal Verbs", desc: "Can, Could, Should, Would, May, Might" },
      { id: "active-passive", title: "Active & Passive Voice", desc: "Subject vs Object focus" },
      { id: "direct-indirect", title: "Direct & Indirect Speech", desc: "Reporting speech/Narration" },
      { id: "conditionals", title: "Conditional Sentences", desc: "Zero, First, Second, Third conditionals" },
      { id: "question-tags", title: "Question Tags", desc: "Confirming statements (isn't it?)" }
    ]
  }
];

const grammarRulesDB = {
  "nouns": { explanation: "A Noun is the name of a person, place, animal, or thing.", rule: "Subject (Noun) + Verb + Object" },
  "pronouns": { explanation: "A Pronoun is a word used instead of a noun.", rule: "Pronoun + Verb + Object" },
  "verbs-basic": { explanation: "Verbs are action words.", rule: "Subject + Base Verb (V1) + Object" },
  "adjectives": { explanation: "An Adjective is a word that tells us more about a noun.", rule: "Subject + is/am/are + Adjective" },
  "tenses-present": { explanation: "Describes actions happening right now.", rule: "S + is/am/are + V1+ing." },
  "tenses-past": { explanation: "Describes actions in the past.", rule: "S + was/were + V1+ing." },
  "tenses-future": { explanation: "Describes future actions.", rule: "S + will + V1." },
  "prepositions": { explanation: "Shows relationship between words.", rule: "Noun + Preposition + Noun" },
  "conjunctions": { explanation: "Joins sentences together.", rule: "Sentence 1 + Conjunction + Sentence 2" },
  "modals": { explanation: "Expresses ability, permission, etc.", rule: "Sub + Modal + V1 + Obj" },
  "active-passive": { explanation: "Active vs Passive.", rule: "Active: S+V+O | Passive: O+is+V3+by+S" },
  "direct-indirect": { explanation: "Direct vs Indirect speech.", rule: "He said that..." },
  "conditionals": { explanation: "Result of a condition.", rule: "If + Present Simple, ... will + V1" },
  "question-tags": { explanation: "Short questions at the end.", rule: "Statement, isn't it?" }
};

const subjectsEn = ["I", "You", "He", "She", "We", "They", "Rahul", "Priya", "The teacher", "The students"];
const subjectsHi = ["मैं", "तुम", "वह (पु.)", "वह (स्त्री.)", "हम", "वे", "राहुल", "प्रिया", "शिक्षक", "छात्र"];
const verbsEn = ["play", "eat", "read", "write", "go", "sleep", "run", "work", "study", "watch"];
const verbsHi = ["खेलता हूँ/है/हैं", "खाता हूँ/है/हैं", "पढ़ता हूँ/है/हैं", "लिखता हूँ/है/हैं", "जाता हूँ/है/हैं", "सोता हूँ/है/हैं", "दौड़ता हूँ/है/हैं", "काम करता हूँ/है/हैं", "अध्ययन करता हूँ/है/हैं", "देखता हूँ/है/हैं"];
const objectsEn = ["cricket", "food", "a book", "a letter", "to school", "at home", "in the park", "in the office", "English", "a movie"];
const objectsHi = ["क्रिकेट", "खाना", "एक किताब", "एक पत्र", "स्कूल", "घर पर", "पार्क में", "ऑफिस में", "अंग्रेजी", "एक फिल्म"];

const grammarDB = [];
curriculum.forEach(level => {
  const levelData = { id: level.levelId, title: level.levelTitle, description: level.levelDesc, topics: [] };
  level.topics.forEach(topic => {
    const lessons = [];
    const ruleData = grammarRulesDB[topic.id] || { explanation: "Learn rules.", rule: "Sub + Verb + Obj" };
    for(let i=1; i<=4; i++) {
      const examples = [];
      for(let j=0; j<50; j++) {
        const sIdx = Math.floor(Math.random() * subjectsEn.length);
        const vIdx = Math.floor(Math.random() * verbsEn.length);
        const oIdx = Math.floor(Math.random() * objectsEn.length);
        examples.push({
          en: `${subjectsEn[sIdx]} ${verbsEn[vIdx]} ${objectsEn[oIdx]}.`,
          hi: `${subjectsHi[sIdx]} ${objectsHi[oIdx]} ${verbsHi[vIdx]}।`
        });
      }
      lessons.push({
        id: `${topic.id}-lesson-${i}`, title: `Chapter ${i}: ${topic.title}`,
        explanation: ruleData.explanation, rule: ruleData.rule, examples: examples
      });
    }
    levelData.topics.push({ id: topic.id, title: topic.title, description: topic.desc, lessons: lessons });
  });
  grammarDB.push(levelData);
});
fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'grammar.json'), JSON.stringify(grammarDB, null, 2));


// --- VOCABULARY GENERATION ---
const vocabularyCategories = [
  {
    id: "daily-use",
    title: "Daily Use Words (रोजमर्रा के शब्द)",
    description: "Common words used in everyday conversations.",
    words: [
      { word: "Always", hindi: "हमेशा", meaning: "At all times; on all occasions.", example: "I always wake up early." },
      { word: "Never", hindi: "कभी नहीं", meaning: "At no time in the past or future.", example: "I never lie to my friends." },
      { word: "Sometimes", hindi: "कभी-कभी", meaning: "Occasionally, rather than all of the time.", example: "Sometimes I like to read books." },
      { word: "Often", hindi: "अक्सर", meaning: "Frequently; many times.", example: "He often goes to the park." },
      { word: "Usually", hindi: "आमतौर पर", meaning: "Under normal conditions; generally.", example: "I usually drink coffee in the morning." }
    ]
  },
  {
    id: "interview",
    title: "Interview Vocabulary (इंटरव्यू के शब्द)",
    description: "Professional words to use in job interviews.",
    words: [
      { word: "Dedicated", hindi: "समर्पित", meaning: "Devoted to a task or purpose.", example: "I am a dedicated software developer." },
      { word: "Collaborate", hindi: "मिलकर काम करना", meaning: "Work jointly on an activity or project.", example: "I love to collaborate with my team." },
      { word: "Initiative", hindi: "पहल", meaning: "The ability to assess and initiate things independently.", example: "I always take initiative in projects." },
      { word: "Diligent", hindi: "मेहनती", meaning: "Having or showing care and conscientiousness.", example: "She is a diligent worker." }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Words (कठिन शब्द)",
    description: "High-level vocabulary to sound fluent.",
    words: [
      { word: "Resilient", hindi: "लचीला", meaning: "Able to withstand or recover quickly.", example: "He is resilient and strong." },
      { word: "Eloquent", hindi: "सुवक्ता", meaning: "Fluent or persuasive in speaking.", example: "She gave an eloquent speech." },
      { word: "Meticulous", hindi: "अति सावधान", meaning: "Showing great attention to detail.", example: "He is meticulous with his code." },
      { word: "Inevitable", hindi: "अपरिहार्य", meaning: "Certain to happen; unavoidable.", example: "Change is inevitable." }
    ]
  }
];

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'vocabulary.json'), JSON.stringify(vocabularyCategories, null, 2));

console.log("Grammar and Vocabulary databases generated!");
