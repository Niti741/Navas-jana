import React, { useState, useEffect } from 'react';
import { 
  Flower, Activity, Droplet, Heart, Upload, Settings, User, 
  Calendar, MessageSquare, Plus, Check, ChevronDown, Sparkles, 
  Clock, ClipboardList, Bell, ArrowRight, Search, Menu, X, 
  FileText, Moon, Footprints, Apple, AlertTriangle, ShieldAlert,
  ChevronRight, RefreshCw, Send, Award, Volume2, Globe, ZoomIn, CheckSquare, Download, Camera, MapPin, Dumbbell, Trash2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, LineChart, Line
} from 'recharts';
import { api } from './services/api';

// 🌐 Dynamic Healthcare Finder Providers Database 🌐
const HEALTHCARE_PROVIDERS = {
  Gynecologists: [
    { name: 'Dr. Meera Sen Gynecological Clinic', address: '24 Park Street, Landmark Building', dist: '1.2 km away', phone: '+91 98765 00112' },
    { name: 'Dr. Priya Nair Maternity Care Center', address: '88 Residency Road, Richmond Town', dist: '2.5 km away', phone: '+91 98765 00344' }
  ],
  Hospitals: [
    { name: 'Fortis Health Women Care Specialty Hospital', address: '12 Bannerghatta Main Road', dist: '3.4 km away', phone: '+91 98765 00445' },
    { name: 'Apollo Women & Child Special Care Hospital', address: '15 Shaheed Bhagat Singh Marg', dist: '4.1 km away', phone: '+91 98765 00988' }
  ],
  Pharmacies: [
    { name: 'MedPlus 24/7 Pharmacy & Wellness Store', address: '48 Brigade Road, Near Metro Gate', dist: '0.5 km away', phone: '+91 99999 11223' },
    { name: 'Apollo Pharmacy 24/7 Store', address: '102 MG Road, Opposite Central Mall', dist: '0.9 km away', phone: '+91 99999 44332' }
  ],
  'Diagnostic labs': [
    { name: 'Dr. Lal PathLabs & Diagnostics Center', address: '55 Commercial Street, Next to SBI', dist: '1.5 km away', phone: '+91 99999 88877' },
    { name: 'SRL Diagnostics & Blood Scan Lab', address: '90 Indiranagar Double Road', dist: '2.1 km away', phone: '+91 99999 55566' }
  ]
};

// 🌐 Indian Languages Translation Map - Sentence Level 🌐
const TRANSLATIONS = {
  en: {},
  hi: {
    "Sakhi": "सखी",
    "Your Everyday AI Health Companion": "आपकी दैनिक एआई स्वास्थ्य साथी",
    "One Intelligent Companion for Every Woman.": "हर महिला के लिए एक बुद्धिमान साथी।",
    "One Intelligent Companion for": "के लिए एक बुद्धिमान साथी",
    "Every Woman.": "हर महिला।",
    "Good Morning, Aditi!": "शुभ प्रभात, अदिति!",
    "Health Twin Active": "हेल्थ ट्विन सक्रिय है",
    "Today's Wellness Score": "आज का कल्याण स्कोर",
    "Calculated": "आंकड़ा",
    "Daily AI Welcome Summary": "दैनिक एआई स्वागत सारांश",
    "Water Intake": "पानी का सेवन",
    "Sleep Quality": "नींद की गुणवत्ता",
    "Exercise": "व्यायाम",
    "Cycle Tracker": "मासिक चक्र ट्रैकर",
    "Weekly Recommendations": "साप्ताहिक सिफारिशें",
    "Log Your Vibe": "अपनी स्थिति दर्ज करें",
    "Today's Medicine Checklist": "आज की दवा सूची",
    "Smart Reminders": "स्मार्ट अनुस्मारक",
    "Upcoming Appointments": "आने वाले अपॉइंटमेंट",
    "Explore Stages": "चरणों का अन्वेषण करें",
    "Start Your Journey": "यात्रा शुरू करें",
    "Dashboard": "डैशबोर्ड",
    "Health Insights": "स्वास्थ्य अंतर्दृष्टि",
    "Health Wrapped": "स्वास्थ्य रैप्ड",
    "Wellness Coach": "कल्याण कोच",
    "AI Clinic Room": "एआई क्लिनिक कक्ष",
    "Sakhi AI Chat": "सखी एआई चैट",
    "Menstrual Tracker": "मासिक चक्र",
    "Meal & Grocery": "भोजन और किराना",
    "Report Analyzer": "रिपोर्ट विश्लेषक",
    "Health Passport": "स्वास्थ्य पासपोर्ट",
    "Community Support": "सामुदायिक सहायता",
    "Settings": "सेटिंग्स",
    "Log Out": "लॉग आउट",
    "Doctor Audio visit Recorder": "डॉक्टर ऑडिओ परामर्श रिकॉर्डर",
    "Anonymous Discussion Forums": "अनाम चर्चा मंच",
    "Nearby Healthcare Finder": "निकटतम स्वास्थ्य केंद्र खोजक",
    "Weekly Challenges": "साप्ताहिक चुनौतियाँ",
    "Family Health Sharing Profile": "पारिवारिक स्वास्थ्य साझाकरण प्रोफाइल",
    "Spotify Wrapped for Health": "स्वास्थ्य के लिए रैप्ड",
    "Google Maps + Health AI Router": "गूगल मैप्स + स्वास्थ्य एआई राउटर",
    "Zomato + Nutrition Recommendation": "ज़ोमैटो + पोषण सिफारिश",
    "PCOS Screening Tool": "पीसीओएस स्क्रीनिंग टूल",
    "Daily Brain Fog Tracker": "दैनिक मानसिक धुंधलापन ट्रैकर",
    "Carry Pads Handbag Reminder": "पैड हैंडबैग रिमाइंडर",
    "Menstrual Product Tracker": "मासिक धर्म उत्पाद ट्रैकर",
    "First Period Puberty Guide": "प्रथम मासिक धर्म यौवन मार्गदर्शिका",
    "Weekly Meal Planner": "साप्ताहिक भोजन योजनाकार",
    "Healthy Grocery Planner": "स्वस्थ किराना योजनाकार",
    "Chronological Timeline": "कालानुक्रमिक समयरेखा",
    "Vaccination Records": "टीकाकरण रिकॉर्ड",
    "Prescription History": "नुस्खा इतिहास",
    "Consultation Audio Transcripts": "परामर्श ऑडियो प्रतिलेख",
    "Digital Medical Card": "डिजिटल मेडिकल कार्ड",
    "Night wind-down Habits": "रात्रि विश्राम आदतें",
    "Tick off warm habits before sleeping to log melatonin cycles.": "नींद से पहले स्वस्थ आदतों को चिन्हित करें।",
    "Dim screens & blue light filters": "स्क्रीन धीमी करें और ब्लू लाइट फिल्टर लगाएं",
    "10 mins mindfulness / box breathing": "१० मिनट माइंडफुलनेस / बॉक्स ब्रीदिंग",
    "Drink warm chamomile / herbal tea": "गुनगुनी कैमोमाइल / हर्बल चाय पिएं",
    "Log sleep hours & cycle symptoms": "नींद के घंटे और चक्र के लक्षण दर्ज करें",
    "Check off when you have packed pads in your school/work handbag.": "जब आपने अपने स्कूल/काम के हैंडबैग में पैड रख लिए हों तो चिन्हित करें।",
    "Enter Pin Code...": "पिन कोड दर्ज करें...",
    "Select symptoms you are experiencing to analyze wellness insights.": "कल्याण अंतर्दृष्टि का विश्लेषण करने के लिए अपने लक्षणों का चयन करें।",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "अपने नैदानिक परामर्श से ऑडियो नोट्स रिकॉर्ड करें। जेमिनी एआई स्वचालित रूप से ट्रांसक्राइब करेगा...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "एआई आपको कमी से वापस इष्टतम आधारभूत स्वास्थ्य की ओर ले जाने के लिए एक चरण-दर-चरण रोडमैप तैयार करता है।",
    "First Period Guide": "प्रथम मासिक धर्म मार्गदर्शिका",
    "Cycle Calendar & Logs": "ಚಕ್ರ ಕ್ಯಾಲೆಂಡರ್ ಮತ್ತು ಲಾಗ್ಸ್",
    "Day 12 Follicular Phase": "दिन १२ फॉलिकुलर चरण",
    "Predicted Period: 4 Days left": "पूर्वानुमानित अवधि: ४ दिन बचे हैं",
    "Packed in Handbag!": "हैंडबैग में पैक किया गया!",
    "Not Packed yet": "अभी पैक नहीं किया गया",
    "Demo Hackathon Quick Access (Log in as Aditi)": "डैमों हैकाथॉन त्वरित पहुँच (अदिति के रूप में लॉग इन करें)"
  }
};

const ExerciseCard = ({ ex }) => (
  <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-base text-[#5E5A66] leading-tight">{ex.title}</h3>
        {ex.renderAnimation()}
      </div>
      <p className="text-xs text-[#7E7A88] leading-relaxed">{ex.desc}</p>
    </div>
    
    <div className="border-t border-[#FFB3D9]/10 pt-3 flex justify-between items-center text-[10px] font-bold text-[#A09BAA]">
      <div className="flex gap-2">
        <span className="bg-[#FFF9EC] text-[#B88E2F] px-2 py-0.5 rounded-full border border-[#B88E2F]/10">⏱️ {ex.time}</span>
        <span className="bg-[#FFF6FB] text-[#FF8A80] px-2 py-0.5 rounded-full border border-[#FF8A80]/10">🔥 {ex.cals}</span>
      </div>
      <span className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white px-2.5 py-0.5 rounded-full shadow-sm">{ex.intensity}</span>
    </div>
  </div>
);

export default function App() {
  // Global App States
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [goals, setGoals] = useState([]);
  const [badges, setBadges] = useState([]);
  
  // Accessibility States
  const [largeText, setLargeText] = useState(false);
  const [lang, setLang] = useState('en'); 

  // Onboarding Quiz Form State
  const [onboardStep, setOnboardStep] = useState(1);
  const [onboardForm, setOnboardForm] = useState({
    name: 'Aditi Sharma', age: 26, height: 163, weight: 58.5,
    blood_group: 'O+', allergies: 'Gluten sensitive', conditions: 'Mild PCOS symptoms',
    pregnancy: false, menopause: false, lifestyle: 'Moderately Active', goals: 'Improve energy & sleep'
  });

  // UI Interactive States
  const [loading, setLoading] = useState(false);
  const [activeStage, setActiveStage] = useState('reproductive');
  const [sosActive, setSosActive] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline'); 
  
  // Chat States
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Vision Scanner States
  const [mealFile, setMealFile] = useState(null);
  const [mealAnalysis, setMealAnalysis] = useState(null);
  const [mealScanning, setMealScanning] = useState(false);
  const [reportFile, setReportFile] = useState(null);
  const [reportAnalysis, setReportAnalysis] = useState(null);
  const [reportScanning, setReportScanning] = useState(false);

  // Core Mock States
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingText, setBreathingText] = useState('Inhale');
  const [breathingScale, setBreathingScale] = useState(1);
  
  const [pcosQuizOpen, setPcosQuizOpen] = useState(false);
  const [pcosAnswers, setPcosAnswers] = useState({ periods: 'regular', hair: 'no', weight: 'stable', acne: 'none', mood: 'rarely' });
  const [pcosResult, setPcosResult] = useState(null);
  
  const [doctorReportText, setDoctorReportText] = useState('');
  const [doctorReportLoading, setDoctorReportLoading] = useState(false);
  const [cycleForecast, setCycleForecast] = useState(null);
  
  const [risks, setRisks] = useState([]);
  const [pregnancyDetails, setPregnancyDetails] = useState(null);
  const [menopauseDetails, setMenopauseDetails] = useState(null);
  const [audioNotes, setAudioNotes] = useState([]);
  const [recordingAudio, setRecordingAudio] = useState(false);

  const [padReminderPacked, setPadReminderPacked] = useState(false);
  const [padCount, setPadCount] = useState(3);
  const [pregnancyTests, setPregnancyTests] = useState([]);
  const [errandsList, setErrandsList] = useState([]);
  const [errandStreak, setErrandStreak] = useState(0);
  const [newErrandInput, setNewErrandInput] = useState('');
  const [showTeenGuide, setShowTeenGuide] = useState(false);
  const [customHabits, setCustomHabits] = useState([]);
  const [newHabitInput, setNewHabitInput] = useState('');
  const [customChallengeInput, setCustomChallengeInput] = useState('');
  const [familyShareLink, setFamilyShareLink] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, type: "Vaccination", date: "2026-06-10", title: "HPV Dose 2 vaccine", details: "Administered at Care Clinic. Next dose due in December." },
    { id: 2, type: "Prescription", date: "2026-07-02", title: "Metformin 500mg daily", details: "Prescribed by Dr. Sen for insulin sensitivity management." },
    { id: 3, type: "Medical Visit", date: "2026-06-15", title: "Annual Gynecologist consultation", details: "Pelvic ultrasound normal. Cycle regularity improving." }
  ]);
  const [newRecordType, setNewRecordType] = useState('Vaccination');
  const [newRecordDate, setNewRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [newRecordTitle, setNewRecordTitle] = useState('');
  const [newRecordDetails, setNewRecordDetails] = useState('');
  const [deficiencyInput, setDeficiencyInput] = useState('');
  const [deficiencyResult, setDeficiencyResult] = useState(null);
  const [deficiencyLoading, setDeficiencyLoading] = useState(false);
  const [mealPlannerPrompt, setMealPlannerPrompt] = useState('');
  const [newGroceryItem, setNewGroceryItem] = useState('');

  // Input Logging Forms
  const [logMoodStr, setLogMoodStr] = useState('Calm');
  const [logStressLevel, setLogStressLevel] = useState(3);
  const [logMoodNotes, setLogMoodNotes] = useState('');
  
  // Sleep and Activity Logging
  const [sleepHours, setSleepHours] = useState(7.0);
  const [sleepQuality, setSleepQuality] = useState('Good');
  const [sleepBedtime, setSleepBedtime] = useState('22:30');
  const [sleepWaketime, setSleepWaketime] = useState('06:30');
  
  const [actSteps, setActSteps] = useState(8000);
  const [actCal, setActCal] = useState(300);
  const [actDuration, setActDuration] = useState(30);
  const [actType, setActType] = useState('Jogging');

  // Auth Form State
  const [isRegister, setIsRegister] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Guided Wellness & AI Coach Tab
  const [wellnessTab, setWellnessTab] = useState('coach');
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceAnalysisResult, setVoiceAnalysisResult] = useState(null);
  
  // AI Clinic, Symptom Checker & Face Acne analyzer
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomResult, setSymptomResult] = useState(null);
  const [skinFile, setSkinFile] = useState(null);
  const [skinImagePreview, setSkinImagePreview] = useState(null);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [skinScanning, setSkinScanning] = useState(false);
  const [nearbyPin, setNearbyPin] = useState('560001');
  const [nearbyCategory, setNearbyCategory] = useState('Gynecologists');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedExercisePhase, setSelectedExercisePhase] = useState('Follicular');
  // Community Forums & winddown
  const [communityTab, setCommunityTab] = useState('pcos');
  const [communityMessages, setCommunityMessages] = useState({
    pcos: [
      { id: 1, user: 'Anonymous Rose 🌸', message: 'Has anyone tried spearmint tea for facial hair? Does it work?', date: '10:00 AM' },
      { id: 2, user: 'Anonymous Lily 💮', message: 'Yes! It has helped me lower my androgen levels a bit. Worth a try.', date: '10:15 AM' }
    ],
    pregnancy: [
      { id: 1, user: 'Anonymous Mom 🤰', message: 'At 24 weeks today, feeling so many kicks!', date: '09:30 AM' }
    ],
    menopause: [
      { id: 1, user: 'Anonymous Sage 🍂', message: 'Hot flashes are waking me up at 3 AM. Any suggestions?', date: '08:45 AM' }
    ]
  });
  const [newCommunityInput, setNewCommunityInput] = useState('');
  const [familyContact, setFamilyContact] = useState({ name: 'Rahul Sharma', phone: '+91 98765 43210', shareReports: true, shareSOS: true });
  const [nightModeWindDown, setNightModeWindDown] = useState({ dimScreens: false, mindfulness: false, herbalTea: false, sleepLog: false });
  const [weeklyChallenges, setWeeklyChallenges] = useState([
    { id: 1, name: 'Drink 2.5L water daily', completed: true, points: 50 },
    { id: 2, name: 'Walk 8,000 steps daily', completed: true, points: 50 },
    { id: 3, name: 'Eat leafy greens 3 times', completed: false, points: 70 },
    { id: 4, name: 'Sleep before 11 PM', completed: false, points: 60 }
  ]);
  const [userPoints, setUserPoints] = useState(100);

  // Meal calendar & dynamic hydration
  const [groceries, setGroceries] = useState([
    { id: 1, name: 'Organic Spinach (Iron rich)', category: 'Fresh Produce', bought: false },
    { id: 2, name: 'Chia Seeds (Omega 3)', category: 'Pantry', bought: true },
    { id: 3, name: 'Lentils & Chickpeas (Protein)', category: 'Pantry', bought: false },
    { id: 4, name: 'Almond Milk (Calcium)', category: 'Dairy/Alt', bought: false },
    { id: 5, name: 'Tofu / Paneer (Protein)', category: 'Proteins', bought: false },
    { id: 6, name: 'Broccoli (Folic Acid)', category: 'Fresh Produce', bought: false }
  ]);

  const weeklyMealPlan = {
    Breakfast: 'Oatmeal with chia seeds & almonds',
    Lunch: 'Quinoa bowl with spinach, chickpeas & tofu',
    Dinner: 'Baked salmon (or paneer tikka) with steamed broccoli',
    Snacks: 'Walnuts & dark chocolate'
  };

  // trackers inventory, sunlight, expenses
  const [padStock, setPadStock] = useState(12);
  const [monthlyUsage, setMonthlyUsage] = useState(8);
  const [refillCost, setRefillCost] = useState(160);
  const [brainFogLog, setBrainFogLog] = useState({ memory: 4, focus: 4, concentration: 5 });

  const [weatherMultiplier, setWeatherMultiplier] = useState('Normal'); 
  const [exerciseMultiplier, setExerciseMultiplier] = useState(false); 
  const [pregnancyMultiplier, setPregnancyMultiplier] = useState(false); 

  const [sunlightLog, setSunlightLog] = useState(15); 

  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Doctor fees', amount: 500, date: 'Jun 15' },
    { id: 2, category: 'Medicines', amount: 350, date: 'Jul 01' },
    { id: 3, category: 'Lab tests', amount: 1200, date: 'Jul 05' }
  ]);
  const [expenseCategory, setExpenseCategory] = useState('Doctor fees');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [routineList, setRoutineList] = useState([
    { time: '07:00 AM', activity: 'Hydration & stretching' },
    { time: '08:30 AM', activity: 'Breakfast (high protein/fiber)' },
    { time: '01:00 PM', activity: 'Nutritious lunch + water check' },
    { time: '08:00 PM', activity: 'Medicine check (Iron Tablet)' },
    { time: '10:00 PM', activity: 'Night wind-down & sleep logs' }
  ]);

  const [familyHealthHistory, setFamilyHealthHistory] = useState({ diabetes: true, hypertension: false, thyroid: true, pcos: false });

  // ==========================================
  // 🔥🔥🔥 SUPER INTEGRATIONS STATE 🔥🔥🔥
  // ==========================================
  const [zomatoInput, setZomatoInput] = useState('');
  const [zomatoSuggestion, setZomatoSuggestion] = useState(null);
  const [zomatoLoading, setZomatoLoading] = useState(false);
  const [nutritionInputFood, setNutritionInputFood] = useState('');
  const [nutritionLogLoading, setNutritionLogLoading] = useState(false);
  const [nutritionLogHistory, setNutritionLogHistory] = useState([
    { food_name: "Oatmeal with chia seeds & almonds", calories: 310, protein: 9.5, iron: 2.1, fiber: 6.0, time: "08:30 AM" },
    { food_name: "Grilled salmon & steamed broccoli", calories: 420, protein: 32.0, iron: 1.8, fiber: 3.5, time: "01:15 PM" }
  ]);
  const [currentWrappedSlide, setCurrentWrappedSlide] = useState(0);
  const [kindleSlideIndex, setKindleSlideIndex] = useState(0);

  // Music Synth Player States
  const [playingAudio, setPlayingAudio] = useState(false);
  const [playingAudioTitle, setPlayingAudioTitle] = useState('');
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeAudioInterval, setActiveAudioInterval] = useState(null);
  const [audioContextRef, setAudioContextRef] = useState(null);
  const [audioOscRef, setAudioOscRef] = useState(null);

  const kindleLessons = [
    { title: "Estrogen Peaks (Day 6-13)", content: "Estrogen levels are rising, boosting your memory, verbal recall, and concentration levels. This is the optimal window to schedule complex meetings, study, or start new workflows." },
    { title: "Progesterone Surge (Day 15-22)", content: "Progesterone spikes after ovulation, naturally slowing digestion. Adding magnesium-rich dark chocolate and drinking 2.7L water prevents bloating, fatigue, and breakouts." },
    { title: "Iron & Menstruation Care", content: "Blood losses during cycles drop your body iron reserves. Eating spinach stews or taking Vitamin C rich lemon juice alongside iron pills boosts absorption by up to 300%." }
  ];

  const wrappedSlides = [
    {
      title: "💤 Your Sleep Story",
      stat: "7.4 Hours Average",
      desc: "You logged sleep times consistently! Your sleep quality remained 85% Good, curing luteal phase fatigue.",
      color: "from-[#FFB3D9] to-[#C9B6FF]"
    },
    {
      title: "💧 Hydration Champion",
      stat: "72 Liters Hydrated",
      desc: "You cleared your hydration targets on sunny days! Your skin moisture index increased to 68%.",
      color: "from-[#AEE7FF] to-[#CDECCF]"
    },
    {
      title: "🧘 Vibe & Stress Trends",
      stat: "Mostly Calm & Balanced",
      desc: "Daily box breathing reduced stress spikes. Average cortisol ratings stayed at a healthy 3/10.",
      color: "from-[#FFE79A] to-[#FF8A80]"
    },
    {
      title: "🧠 Coach AI Wrapped Advice",
      stat: "Iron levels need focus",
      desc: "Next month, focus on getting at least 15mg Iron daily to maintain step streaks during follicular days.",
      color: "from-[#B9F4D0] to-[#CDECCF]"
    }
  ];

  // Translation Function
  const t = (key) => {
    if (lang === 'en') return key;
    return TRANSLATIONS[lang]?.[key] || key;
  };

  // Onboarding Auto-Login Check
  useEffect(() => {
    const savedToken = localStorage.getItem('sakhi_token');
    const savedUser = localStorage.getItem('sakhi_user');
    if (savedToken && savedUser) {
      api.setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setLoading(true);
      (async () => {
        try {
          await fetchDashboardData();
          await fetchAnalyticsData();
          const profileData = await api.getProfile();
          setProfile(profileData);
          setOnboardForm(profileData);
          setGoals(await api.getGoals());
          setBadges(await api.getBadges());
          setRisks(await api.getRiskIndicators());
          setPregnancyDetails(await api.getPregnancyDetails());
          setMenopauseDetails(await api.getMenopauseDetails());
          setAudioNotes(await api.getAudioNotes());
          setPadReminderPacked(await api.getPadKitStatus());
          setPregnancyTests(await api.getPregnancyTests());
          setErrandsList(await api.getErrands());
          setErrandStreak(4);
        } catch (err) {
          console.error(err);
          handleLogout();
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setView('landing');
    }
  }, []);

  // Strict Authentication Guard
  useEffect(() => {
    if (!user && view !== 'landing' && view !== 'auth' && view !== 'onboarding') {
      setView('landing');
    }
  }, [user, view]);

  const handleMockLogin = async () => {
    setLoading(true);
    try {
      const data = await api.login('aditi@sakhi.ai', 'password123');
      api.setToken(data.access_token);
      localStorage.setItem('sakhi_user', JSON.stringify(data.user));
      setUser(data.user);
      await fetchDashboardData();
      await fetchAnalyticsData();
      const profileData = await api.getProfile();
      setProfile(profileData);
      setOnboardForm(profileData);
      
      setGoals(await api.getGoals());
      setBadges(await api.getBadges());
      setRisks(await api.getRiskIndicators());
      setPregnancyDetails(await api.getPregnancyDetails());
      setMenopauseDetails(await api.getMenopauseDetails());
      setAudioNotes(await api.getAudioNotes());

      setPadReminderPacked(await api.getPadKitStatus());
      setPregnancyTests(await api.getPregnancyTests());
      setErrandsList(await api.getErrands());
      setErrandStreak(4);
      setView('dashboard');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboard();
      setDashboardData(data);
      const chatHist = await api.getChatHistory();
      setChatMessages(chatHist);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const data = await api.getAnalytics();
      setAnalyticsData(data);
    } catch (e) {
      console.error(e);
    }
  };

  // 4-7-8 Breathing Circle Timer
  useEffect(() => {
    let timer;
    if (breathingActive) {
      let step = 0; 
      const runBreathing = () => {
        if (step === 0) {
          setBreathingText(lang !== 'en' ? 'सांस लें...' : 'Inhale...');
          setBreathingScale(1.4);
          timer = setTimeout(() => {
            step = 1;
            runBreathing();
          }, 4000);
        } else if (step === 1) {
          setBreathingText(lang !== 'en' ? 'रोकें...' : 'Hold...');
          timer = setTimeout(() => {
            step = 2;
            runBreathing();
          }, 4000);
        } else {
          setBreathingText(lang !== 'en' ? 'सांस छोड़ें...' : 'Exhale...');
          setBreathingScale(1.0);
          timer = setTimeout(() => {
            step = 0;
            runBreathing();
          }, 4000);
        }
      };
      runBreathing();
    } else {
      setBreathingScale(1.0);
    }
    return () => clearTimeout(timer);
  }, [breathingActive, lang]);

  // Load cycle forecast
  useEffect(() => {
    if (user) {
      api.getCycleForecast().then(data => setCycleForecast(data.phases));
    }
  }, [user]);

  // Dynamic calculated hydration target
  const getCalculatedHydrationTarget = () => {
    let base = 2.5; 
    if (weatherMultiplier === 'Sunny') base += 0.5;
    if (weatherMultiplier === 'Cold') base -= 0.3;
    if (exerciseMultiplier) base += 0.75;
    if (pregnancyMultiplier || profile?.pregnancy) base += 0.3;
    return parseFloat(base.toFixed(2));
  };

  // Update Goal values
  const handleProgressGoal = async (id, step) => {
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        const newVal = Math.max(0, parseFloat((g.current + step).toFixed(1)));
        return { ...g, current: newVal };
      }
      return g;
    });
    setGoals(updatedGoals);
    localStorage.setItem('sakhi_goals', JSON.stringify(updatedGoals));
    
    const g = updatedGoals.find(x => x.id === id);
    if (g.type === 'water') {
      await api.logWater(g.current);
    } else if (g.type === 'sleep') {
      await api.logSleep(sleepBedtime, sleepWaketime, sleepQuality, g.current);
    }
    fetchDashboardData();
  };

  const handleUpdateWater = async (amount) => {
    if (!dashboardData) return;
    const current = dashboardData.today_metrics.water;
    const newLiters = Math.max(0, parseFloat((current + amount).toFixed(1)));
    
    setDashboardData(prev => ({
      ...prev,
      today_metrics: { ...prev.today_metrics, water: newLiters }
    }));
    await api.logWater(newLiters);
    
    const goalsList = await api.getGoals();
    setGoals(goalsList);
    fetchDashboardData();
  };

  const handleToggleMed = async (medId) => {
    setDashboardData(prev => ({
      ...prev,
      medicines: prev.medicines.map(m => m.id === medId ? { ...m, taken: !m.taken } : m)
    }));
    await api.toggleMedicine(medId);
    fetchDashboardData();
  };

  const handleLogMood = async (e) => {
    e.preventDefault();
    await api.logMood(logMoodStr, logStressLevel, logMoodNotes);
    setLogMoodNotes('');
    fetchDashboardData();
    fetchAnalyticsData();
    setRisks(await api.getRiskIndicators());
    alert(lang !== 'en' ? "दैनिक स्थिति सफलतापूर्वक दर्ज की गई!" : "Daily mood logged successfully!");
  };

  const handleLogSleep = async (e) => {
    e.preventDefault();
    await api.logSleep(sleepBedtime, sleepWaketime, sleepQuality, sleepHours);
    fetchDashboardData();
    fetchAnalyticsData();
    setGoals(await api.getGoals());
    alert(lang !== 'en' ? "नींद का विवरण दर्ज किया गया!" : "Sleep details logged successfully!");
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    await api.logActivity(actSteps, actCal, actDuration, actType);
    fetchDashboardData();
    fetchAnalyticsData();
    setGoals(await api.getGoals());
    alert(lang !== 'en' ? "व्यायाम विवरण दर्ज किया गया!" : "Activity details logged successfully!");
  };

  // Errand Loggers
  const handleToggleErrand = async (id) => {
    const result = await api.toggleErrand(id);
    setErrandsList(result.errands);
    setErrandStreak(result.streak);
  };

  const handleAddErrand = async (e) => {
    e.preventDefault();
    if (!newErrandInput.trim()) return;
    const list = await api.addErrand(newErrandInput);
    setErrandsList(list);
    setNewErrandInput('');
  };

  // Toggle Pad kit
  const handleTogglePadKit = async () => {
    const val = await api.togglePadKit();
    setPadReminderPacked(val);
    fetchDashboardData();
  };

  // Toggle pregnancy clinical tests
  const handleTogglePregTest = async (id) => {
    const list = await api.togglePregnancyTest(id);
    setPregnancyTests(list);
  };

  // 💾 Backup/Export Health Data locally
  const handleExportData = () => {
    const backup = {};
    const keys = ['profile', 'water', 'sleep', 'exercise', 'nutrition', 'medicines', 'cycle', 'chat', 'reports', 'notifications', 'appointments', 'goals', 'badges', 'pregnancyCompanion', 'menopauseCompanion', 'audioNotes', 'padReminderPacked', 'pregnancyTests', 'errands', 'errandStreak'];
    keys.forEach(key => {
      backup[key] = JSON.parse(localStorage.getItem(`sakhi_${key}`));
    });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sakhi_health_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 💾 Import / Restore Health Data locally
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backup = JSON.parse(event.target.result);
        Object.keys(backup).forEach(key => {
          localStorage.setItem(`sakhi_${key}`, JSON.stringify(backup[key]));
        });
        alert(lang !== 'en' ? "डेटा सफलतापूर्वक आयात किया गया!" : "Health database imported successfully!");
        window.location.reload();
      } catch (err) {
        alert(lang !== 'en' ? "आयात विफल! अमान्य फ़ाइल स्वरूप।" : "Import failed! Invalid JSON format.");
      }
    };
    reader.readAsText(file);
  };

  // 💾 Clear local space
  const handleResetData = () => {
    if (window.confirm(lang !== 'en' ? "क्या आप वाकई अपना सारा स्वास्थ्य डेटा रीसेट करना चाहते हैं?" : "Are you sure you want to reset all your health data? This cannot be undone.")) {
      const keys = ['profile', 'water', 'sleep', 'exercise', 'nutrition', 'medicines', 'cycle', 'chat', 'reports', 'notifications', 'appointments', 'goals', 'badges', 'pregnancyCompanion', 'menopauseCompanion', 'audioNotes', 'padReminderPacked', 'pregnancyTests', 'errands', 'errandStreak'];
      keys.forEach(key => {
        localStorage.removeItem(`sakhi_${key}`);
      });
      alert(lang !== 'en' ? "डेटा रीसेट सफल!" : "Data reset successful! Reloading defaults...");
      window.location.reload();
    }
  };

  // Calculate local space storage volume
  const getStorageSize = () => {
    let total = 0;
    const keys = ['profile', 'water', 'sleep', 'exercise', 'nutrition', 'medicines', 'cycle', 'chat', 'reports', 'notifications', 'appointments', 'goals', 'badges', 'pregnancyCompanion', 'menopauseCompanion', 'audioNotes', 'padReminderPacked', 'pregnancyTests', 'errands', 'errandStreak'];
    keys.forEach(key => {
      const val = localStorage.getItem(`sakhi_${key}`);
      if (val) total += val.length;
    });
    return (total / 1024).toFixed(2);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', message: chatInput, timestamp: new Date().toISOString() };
    setChatMessages(prev => [...prev, userMsg]);
    const prompt = chatInput;
    setChatInput('');
    setIsTyping(true);
    
    try {
      const reply = await api.sendChatMessage(prompt);
      setChatMessages(prev => [...prev, reply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (text) => {
    setView('chat');
    setChatInput(text);
  };

  const handleMealScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMealFile(file);
    setMealScanning(true);
    setMealAnalysis(null);
    try {
      const result = await api.analyzeMeal(file);
      setMealAnalysis(result);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    } finally {
      setMealScanning(false);
    }
  };

  const handleReportScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setReportFile(file);
    setReportScanning(true);
    setReportAnalysis(null);
    try {
      const result = await api.analyzeReport(file);
      setReportAnalysis(result);
      fetchDashboardData();
      setRisks(await api.getRiskIndicators());
    } catch (err) {
      console.error(err);
    } finally {
      setReportScanning(false);
    }
  };

  const handleRecordAudioNotes = async () => {
    // 🔊 Synthesize start beep sound 🔊
    playAmbientSound('beep');
    setRecordingAudio(true);
    setTimeout(async () => {
      setRecordingAudio(false);
      // 🔊 Synthesize stop beep sound 🔊
      playAmbientSound('beep');
      await api.transcribeAudioNotes(null);
      setAudioNotes(await api.getAudioNotes());
      alert(lang !== 'en' ? "ऑडियो परामर्श का ट्रांसक्रिप्शन पूरा हुआ!" : "Doctor audio consult transcribed successfully!");
    }, 4000);
  };

  const handleLogKick = async () => {
    const details = await api.logKick();
    setPregnancyDetails(details);
  };

  const handleLogHotFlash = async () => {
    const details = await api.logHotFlash();
    setMenopauseDetails(details);
  };

  const handleSOS = async () => {
    setSosActive(true);
    await api.triggerSOS([familyContact.phone]);
    fetchDashboardData();
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await api.updateProfile(onboardForm);
      setProfile(updated);
      await fetchDashboardData();
      setView('dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail || !authPassword) {
      setAuthError('Please fill in all fields.');
      return;
    }
    try {
      if (isRegister) {
        if (!authName) {
          setAuthError('Name is required.');
          return;
        }
        const data = await api.register(authName, authEmail, authPassword);
        api.setToken(data.access_token);
        localStorage.setItem('sakhi_user', JSON.stringify(data.user));
        setUser(data.user);
        setOnboardForm(prev => ({ ...prev, name: authName }));
        setView('onboarding');
      } else {
        const data = await api.login(authEmail, authPassword);
        api.setToken(data.access_token);
        localStorage.setItem('sakhi_user', JSON.stringify(data.user));
        setUser(data.user);
        setView('dashboard');
      }
      setProfile(await api.getProfile());
      fetchDashboardData();
      fetchAnalyticsData();
    } catch (err) {
      setAuthError(err.response?.data?.detail || 'Authentication failed.');
    }
  };

  const handleLogout = () => {
    api.setToken(null);
    localStorage.removeItem('sakhi_user');
    setUser(null);
    setView('landing');
  };

  const handleGenerateDoctorReport = async () => {
    setDoctorReportLoading(true);
    try {
      const data = await api.getDoctorSummary();
      setDoctorReportText(data.pdf_content_text);
    } catch (e) {
      console.error(e);
    } finally {
      setDoctorReportLoading(false);
    }
  };

  const handleSubmitPcosQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.checkPcosQuiz(pcosAnswers);
      setPcosResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (field, val) => {
    const updated = { ...profile, [field]: val };
    setProfile(updated);
    await api.updateProfile(updated);
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      'Happy': '😊', 'Calm': '🧘‍♀️', 'Energetic': '⚡',
      'Tired': '😴', 'Anxious': '🥺', 'Irritable': '🗯️'
    };
    return emojis[mood] || '🌸';
  };

  // ==========================================
  // 🔊 CONTINUOUS BROWSER-NATIVE SYNTHESIZER 🔊
  // ==========================================
  const playAmbientSound = (type) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (type === 'meditation') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(136.1, ctx.currentTime); 
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 6);
      } else if (type === 'focus') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime); 
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 4);
      } else if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime); 
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startAmbientSynth = (title, type) => {
    try {
      if (activeAudioInterval) clearInterval(activeAudioInterval);
      if (audioOscRef) {
        try { audioOscRef.stop(); } catch (e) {}
      }

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = audioContextRef || new AudioContextClass();
      if (!audioContextRef) setAudioContextRef(ctx);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'meditation') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(136.1, ctx.currentTime); 
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime); 
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setAudioOscRef(osc);

      setPlayingAudio(true);
      setPlayingAudioTitle(title);
      setAudioProgress(0);

      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            osc.stop();
            setPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 1000);
      setActiveAudioInterval(interval);

    } catch (err) {
      console.error(err);
    }
  };

  const stopAmbientSynth = () => {
    if (activeAudioInterval) clearInterval(activeAudioInterval);
    if (audioOscRef) {
      try { audioOscRef.stop(); } catch (e) {}
      setAudioOscRef(null);
    }
    setPlayingAudio(false);
    setAudioProgress(0);
  };

  // Voice recording mood analysis
  const handleRecordVoiceMood = () => {
    playAmbientSound('beep');
    setVoiceRecording(true);
    setVoiceAnalysisResult(null);
    setTimeout(() => {
      setVoiceRecording(false);
      playAmbientSound('beep');
      setVoiceAnalysisResult({
        stressScore: Math.floor(Math.random() * 30) + 20, 
        tone: 'Warm, calm, slightly fatigued cadence',
        fatigueLevel: 'Low-to-moderate',
        exerciseSuggestion: '10 mins of Box Breathing & Child Pose stretching.'
      });
      setUserPoints(prev => prev + 15);
    }, 4000);
  };

  // Perform symptoms check
  const handleCheckSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    setSymptomResult({
      insights: selectedSymptoms.includes('Irregular periods') || selectedSymptoms.includes('Bloating')
        ? 'Indicates potential hormonal imbalances associated with estrogen fluctuations or PCOS markers.'
        : 'Indicates minor systemic fatigue or nutritional deficits (such as iron/ferritin deficiency).',
      remedies: 'Rest adequately, consume iron-dense foods (spinach/beets), and stay hydrated (target 2.7L water today). Try warm chamomile tea.',
      urgency: selectedSymptoms.includes('Irregular periods') ? 'Routine screening recommended - schedule Gynecologist consult within 2-4 weeks.' : 'Mild - self care & hydration checks.'
    });
  };

  // Skin Visual analyzer
  const handleSkinScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSkinFile(file);
    setSkinImagePreview(URL.createObjectURL(file));
    setSkinScanning(true);
    setSkinAnalysis(null);
    try {
      const result = await api.analyzeSkin(file);
      setSkinAnalysis(result);
      setUserPoints(prev => prev + 25);
    } catch (err) {
      console.error(err);
    } finally {
      setSkinScanning(false);
    }
  };

  // Community message submit
  const handleSendCommunityMessage = (e) => {
    e.preventDefault();
    if (!newCommunityInput.trim()) return;
    const msgObj = {
      id: Date.now(),
      user: 'Anonymous Sakhi 🌸',
      message: newCommunityInput,
      date: 'Just now'
    };
    setCommunityMessages(prev => ({
      ...prev,
      [communityTab]: [...prev[communityTab], msgObj]
    }));
    setNewCommunityInput('');
  };

  // Toggle groceries checklist
  const handleToggleGrocery = (id) => {
    setGroceries(prev => prev.map(g => g.id === id ? { ...g, bought: !g.bought } : g));
  };

  // Log medical expenses
  const handleAddExpense = (e) => {
    e.preventDefault();
    const val = parseFloat(expenseAmount);
    if (isNaN(val) || val <= 0) return;
    const expObj = {
      id: Date.now(),
      category: expenseCategory,
      amount: val,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    };
    setExpenses(prev => [...prev, expObj]);
    setExpenseAmount('');
    alert('Expense logged successfully!');
  };

  const handleAddCustomChallenge = (e) => {
    e.preventDefault();
    if (!customChallengeInput.trim()) return;
    const newChal = {
      id: Date.now(),
      name: customChallengeInput,
      points: 40,
      completed: false
    };
    setWeeklyChallenges(prev => [...prev, newChal]);
    setCustomChallengeInput('');
  };

  const handleAddMedicalRecord = (e) => {
    e.preventDefault();
    if (!newRecordTitle.trim()) return;
    const recordObj = {
      id: Date.now(),
      type: newRecordType,
      date: newRecordDate,
      title: newRecordTitle,
      details: newRecordDetails
    };
    setMedicalRecords(prev => [recordObj, ...prev]);
    setNewRecordTitle('');
    setNewRecordDetails('');
    alert(lang !== 'en' ? "रिकॉर्ड सफलतापूर्वक जोड़ा गया!" : "Medical record logged successfully!");
  };

  const handleDeficiencySubmit = async (e) => {
    e.preventDefault();
    if (!deficiencyInput.trim()) return;
    setDeficiencyLoading(true);
    setDeficiencyResult(null);
    try {
      const res = await api.getDeficiencyRecommendations(deficiencyInput);
      setDeficiencyResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setDeficiencyLoading(false);
    }
  };

  const handleGenerateCustomMeal = async (e) => {
    if (e) e.preventDefault();
    setZomatoLoading(true);
    try {
      const res = await api.generateMealPlan(mealPlannerPrompt);
      setWeeklyMealPlan({
        breakfast: res.breakfast,
        lunch: res.lunch,
        snack: res.snack,
        dinner: res.dinner
      });
      alert(lang !== 'en' ? "नया मील प्लान तैयार है!" : "New weekly meal plan generated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setZomatoLoading(false);
    }
  };

  const handleAddNewGrocery = (e) => {
    e.preventDefault();
    if (!newGroceryItem.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newGroceryItem,
      bought: false
    };
    setGroceries(prev => [...prev, newItem]);
    setNewGroceryItem('');
  };

  const handleAddCustomHabit = (e) => {
    e.preventDefault();
    if (!newHabitInput.trim()) return;
    const newHabit = {
      key: `custom_${Date.now()}`,
      label: newHabitInput,
      completed: false
    };
    setCustomHabits(prev => [...prev, newHabit]);
    setNewHabitInput('');
  };

  const handleGenerateShareLink = () => {
    const link = `https://saakhi-s.netlify.app/share/health-passport-${user?.id || 'demo'}`;
    setFamilyShareLink(link);
    navigator.clipboard.writeText(link);
    alert(lang !== 'en' ? "एक्सेस लिंक क्लिपबोर्ड पर कॉपी किया गया!" : "Secure family access link copied to clipboard!");
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const handleLogNutritionFood = async (e) => {
    e.preventDefault();
    if (!nutritionInputFood.trim()) return;
    setNutritionLogLoading(true);
    try {
      const result = await api.estimateMeal(nutritionInputFood);
      setNutritionLogHistory(prev => [
        {
          food_name: result.food_name,
          calories: result.calories,
          protein: result.protein,
          iron: result.iron,
          fiber: result.fiber,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
      setNutritionInputFood('');
      alert(lang !== 'en' ? "भोजन पोषण लॉग किया गया!" : "Food nutrition logged successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setNutritionLogLoading(false);
    }
  };

  const handleZomatoQuery = async (e) => {
    e.preventDefault();
    if (!zomatoInput.trim()) return;
    setZomatoLoading(true);
    setZomatoSuggestion(null);
    try {
      const result = await api.checkFood(zomatoInput);
      setZomatoSuggestion(result);
    } catch (err) {
      console.error(err);
    } finally {
      setZomatoLoading(false);
    }
  };

  const handleNearbyCategoryChange = (e) => {
    setNearbyCategory(e.target.value);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-tr from-[#FFF8F6] via-[#FFF3F8] to-[#FFF9EC] text-[#5E5A66] transition-all ${
      largeText ? 'text-lg font-medium' : 'text-sm'
    }`}>
      
      {/* 🌸 BACKGROUND FLOATING PASTEL BLOBS 🌸 */}
      <div className="absolute top-10 left-[5%] w-72 h-72 bg-[#C9B6FF]/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-[#FFB3D9]/25 rounded-full blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[20%] left-[15%] w-80 h-80 bg-[#FFE79A]/20 rounded-full blur-[90px] pointer-events-none animate-float-reverse"></div>

      {/* --- SOS EMERGENCY MODAL --- */}
      {sosActive && (
        <div className="fixed inset-0 bg-[#FFF8F6]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF6FB] border-2 border-[#FF8A80] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <button onClick={() => setSosActive(false)} className="absolute top-4 right-4 p-2 text-[#7E7A88] hover:text-[#FF8A80]"><X size={20} /></button>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#FF8A80]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <ShieldAlert size={42} className="text-[#FF8A80]" />
              </div>
              <h2 className="text-3xl font-bold text-[#FF8A80] font-sans">{t("SOS Activated")}</h2>
              <p className="text-[#7E7A88] mt-2">{t("Emergency alerts and medical details dispatched to registered contacts.")}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-[#FFF6FB] rounded-2xl p-5 mb-6 space-y-3 shadow-sm">
              <h3 className="font-semibold text-lg border-b border-[#FFB3D9]/30 pb-2 flex items-center gap-2">
                <ClipboardList size={18} className="text-[#F48FB1]" /> {t("Digital Medical Card")}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-[#A09BAA] block text-[9px] uppercase">{t("Full Name")}</span><span className="font-semibold">{profile?.name || 'Aditi Sharma'}</span></div>
                <div><span className="text-[#A09BAA] block text-[9px] uppercase">{t("Blood Group")}</span><span className="font-bold text-[#FF8A80]">{profile?.blood_group || 'O+'}</span></div>
                <div className="col-span-2"><span className="text-[#A09BAA] block text-[9px] uppercase">{t("Allergies")}</span><span className="font-medium">{profile?.allergies || 'Gluten sensitive'}</span></div>
                <div className="col-span-2"><span className="text-[#A09BAA] block text-[9px] uppercase">{t("Conditions")}</span><span className="font-medium">{profile?.conditions || 'Mild PCOS'}</span></div>
                <div className="col-span-2"><span className="text-[#A09BAA] block text-[9px] uppercase">{t("Emergency Contact")}</span><span className="font-medium">{familyContact.name} ({familyContact.phone})</span></div>
              </div>
            </div>
            <button onClick={() => setSosActive(false)} className="w-full bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold py-3.5 rounded-2xl shadow-lg">
              {t("I am Safe Now")}
            </button>
          </div>
        </div>
      )}

      {/* --- LANDING VIEW --- */}
      {view === 'landing' && (
        <div className="relative z-10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between sticky top-0 bg-[#FFF8F6]/85 backdrop-blur-md z-40 border-b border-[#FFF3F8]">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white" size={22} /></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent font-sans">{t("Sakhi")}</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[#7E7A88] font-medium text-xs">
              <a href="#features" className="hover:text-[#FF8A80] transition-colors">{t("Features")}</a>
              <a href="#stages" className="hover:text-[#FF8A80] transition-colors">{t("Life Stages")}</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-1 bg-white border rounded-xl px-2.5 py-1.5 shadow-sm">
                <Globe size={13} className="text-[#A09BAA]" />
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-[11px] font-semibold text-[#7E7A88] focus:outline-none cursor-pointer">
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                  <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                </select>
              </div>
              {user ? (
                <button onClick={() => setView('dashboard')} className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm">
                  {t("Dashboard")} <ArrowRight size={14} />
                </button>
              ) : (
                <>
                  <button onClick={() => { setIsRegister(false); setView('auth'); }} className="text-[#7E7A88] hover:text-[#FF8A80] font-semibold text-xs px-3 py-2">{t("Sign In")}</button>
                  <button onClick={() => { setIsRegister(true); setView('auth'); }} className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-5 py-2.5 rounded-2xl text-xs shadow-sm">{t("Start Your Journey")}</button>
                </>
              )}
            </div>
          </nav>

          <header className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-[#FFB3D9]/20 text-[#F48FB1] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={11} /> {t("Powered by Gemini AI")}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#5E5A66] font-sans">
                {t("One Intelligent Companion for")} <span className="bg-gradient-to-r from-[#FF8A80] via-[#F48FB1] to-[#C9B6FF] bg-clip-text text-transparent">{t("Every Woman.")}</span>
              </h1>
              <p className="text-[#7E7A88] text-base leading-relaxed max-w-xl">
                {t("Your Everyday AI Health Companion")}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button onClick={() => { if (user) setView('dashboard'); else { setIsRegister(true); setView('auth'); } }} className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2">
                  {t("Start Your Journey")} <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="w-full max-w-[420px] relative animate-float">
                <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
                  <circle cx="250" cy="250" r="180" fill="url(#hero-circle-grad)" fillOpacity="0.4" stroke="#FFF6FB" strokeWidth="4"/>
                  <path d="M250 140 C280 140, 310 180, 310 240 C310 320, 250 370, 250 380 C250 370, 190 320, 190 240 C190 180, 220 140, 250 140 Z" fill="url(#lotus-grad)" />
                  <defs>
                    <linearGradient id="hero-circle-grad" x1="250" y1="70" x2="250" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#FFF9EC" /><stop offset="1" stopColor="#FFF2FC" /></linearGradient>
                    <linearGradient id="lotus-grad" x1="250" y1="140" x2="250" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB3D9" /><stop offset="1" stopColor="#FF8A80" /></linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </header>
        </div>
      )}

      {/* --- AUTHENTICATION SCREEN --- */}
      {view === 'auth' && (
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-md bg-[#FFF6FB] border border-white/60 rounded-3xl p-8 shadow-xl space-y-6 relative">
            <button onClick={() => setView('landing')} className="absolute top-4 right-4 p-2 text-[#7E7A88] hover:text-[#FF8A80]"><X size={20} /></button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] rounded-2xl flex items-center justify-center mx-auto shadow-sm"><Flower className="text-white" size={24} /></div>
              <h2 className="text-3xl font-bold text-[#5E5A66]">{isRegister ? t('Register') : t('Login')}</h2>
            </div>
            {authError && <div className="bg-[#FF8A80]/15 text-[#FF8A80] p-3 rounded-xl text-xs text-center border border-[#FF8A80]/30 font-semibold">{authError}</div>}
            <form onSubmit={handleAuth} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">{t("Name")}</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Full Name" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">{t("Email")}</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">{t("Password")}</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md">
                {isRegister ? t('Create Account') : t('Sign In')}
              </button>
            </form>
            <div className="text-center">
              <button onClick={() => { setIsRegister(!isRegister); setAuthError(''); }} className="text-xs text-[#F48FB1] hover:underline">
                {isRegister ? t('Already have an account? Sign In') : t("Don't have an account? Register")}
              </button>
            </div>
            <button onClick={() => { handleMockLogin(); setView('dashboard'); }} className="w-full bg-white border text-[#7E7A88] hover:text-[#5E5A66] py-3 rounded-2xl text-[10px] font-bold shadow-sm">
              {t("Demo Hackathon Quick Access (Log in as Aditi)")}
            </button>
          </div>
        </div>
      )}

      {/* --- ONBOARDING: HEALTH TWIN SETUP --- */}
      {view === 'onboarding' && (
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10 animate-fade-in">
          <div className="w-full max-w-lg bg-[#FFF6FB] border rounded-3xl p-8 shadow-xl space-y-6">
            <div className="text-center">
              <span className="text-xs text-[#F48FB1] uppercase font-bold tracking-wider">{t("Step")} {onboardStep} {t("of")} 3</span>
              <h2 className="text-3xl font-bold font-sans text-[#5E5A66] mt-1">{t("Setup Health Twin")}</h2>
            </div>
            <form onSubmit={handleOnboardingSubmit} className="space-y-4 text-xs font-semibold text-[#7E7A88]">
              {onboardStep === 1 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">{t("Biological Attributes")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block mb-1">{t("Name")}</label>
                      <input type="text" value={onboardForm.name} onChange={(e) => setOnboardForm({...onboardForm, name: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">{t("Age")}</label>
                      <input type="number" value={onboardForm.age} onChange={(e) => setOnboardForm({...onboardForm, age: parseInt(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">{t("Blood Group")}</label>
                      <input type="text" value={onboardForm.blood_group} onChange={(e) => setOnboardForm({...onboardForm, blood_group: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">{t("Height (cm)")}</label>
                      <input type="number" value={onboardForm.height} onChange={(e) => setOnboardForm({...onboardForm, height: parseFloat(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">{t("Weight (kg)")}</label>
                      <input type="number" value={onboardForm.weight} onChange={(e) => setOnboardForm({...onboardForm, weight: parseFloat(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                  </div>
                  <button type="button" onClick={() => setOnboardStep(2)} className="w-full bg-[#FF8A80] text-white py-3 rounded-2xl font-bold mt-4">{t("Next Step")}</button>
                </div>
              )}

              {onboardStep === 2 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">{t("Medical Markers")}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block mb-1">{t("Allergies")}</label>
                      <input type="text" value={onboardForm.allergies} onChange={(e) => setOnboardForm({...onboardForm, allergies: e.target.value})} placeholder="e.g. Gluten sensitive" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">{t("Existing Conditions")}</label>
                      <input type="text" value={onboardForm.conditions} onChange={(e) => setOnboardForm({...onboardForm, conditions: e.target.value})} placeholder="e.g. PCOS" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={onboardForm.pregnancy} onChange={(e) => setOnboardForm({...onboardForm, pregnancy: e.target.checked})} className="rounded text-[#FF8A80]" /> {t("Pregnant")}</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={onboardForm.menopause} onChange={(e) => setOnboardForm({...onboardForm, menopause: e.target.checked})} className="rounded text-[#FF8A80]" /> {t("Menopause")}</label>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setOnboardStep(1)} className="w-1/2 bg-white border py-3 rounded-2xl font-bold">{t("Back")}</button>
                    <button type="button" onClick={() => setOnboardStep(3)} className="w-1/2 bg-[#FF8A80] text-white py-3 rounded-2xl font-bold">{t("Next Step")}</button>
                  </div>
                </div>
              )}

              {onboardStep === 3 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">{t("Goals & Lifestyle")}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block mb-1">{t("Lifestyle Level")}</label>
                      <select value={onboardForm.lifestyle} onChange={(e) => setOnboardForm({...onboardForm, lifestyle: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                        <option value="Sedentary">{t("Sedentary")}</option>
                        <option value="Moderately Active">{t("Moderately Active")}</option>
                        <option value="Highly Active">{t("Highly Active")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">{t("Fitness Goals")}</label>
                      <input type="text" value={onboardForm.goals} onChange={(e) => setOnboardForm({...onboardForm, goals: e.target.value})} placeholder="e.g. improve energy" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setOnboardStep(2)} className="w-1/2 bg-white border py-3 rounded-2xl font-bold">{t("Back")}</button>
                    <button type="submit" className="w-1/2 bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white py-3 rounded-2xl font-bold">{t("Complete Setup")}</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* --- DASHBOARD SHELL CONTAINER --- */}
      {view !== 'landing' && view !== 'auth' && view !== 'onboarding' && user && (
        <div className="flex min-h-screen relative z-10">
          
          {/* Sidebar */}
          <aside className="w-64 bg-[#FFF6FB]/85 backdrop-blur-md border-r border-[#FFF3F8] p-6 flex flex-col justify-between hidden lg:flex">
            <div className="space-y-6">
              <div className="flex items-center gap-2 cursor-pointer border-b pb-2.5" onClick={() => setView('landing')}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white" size={18} /></div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent font-sans">{t("Sakhi")}</span>
              </div>
              
              {/* Sidebar Ambient Audio Controller Widget */}
              {playingAudio && (
                <div className="bg-[#FFF9EC] p-3 rounded-2xl border border-[#FFB68A]/30 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-[#5E5A66] truncate block max-w-[120px]">🎶 {playingAudioTitle}</span>
                    <button onClick={stopAmbientSynth} className="text-[#FF8A80] hover:text-[#FF8A80]/80 font-bold">{t("Stop")}</button>
                  </div>
                  <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border">
                    <div className="bg-[#FF8A80] h-full transition-all duration-1000" style={{ width: `${audioProgress}%` }}></div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Activity },
                  { id: 'insights', label: 'Health Insights', icon: Sparkles },
                  { id: 'wrapped', label: 'Health Wrapped', icon: Award },
                  { id: 'exercise', label: 'Exercise & Fitness', icon: Dumbbell },
                  { id: 'clinic', label: 'AI Clinic Room', icon: ShieldAlert },
                  { id: 'chat', label: 'Sakhi AI Chat', icon: MessageSquare },
                  { id: 'tracker', label: 'Menstrual Tracker', icon: Calendar },
                  { id: 'nutrition', label: 'Meal & Grocery', icon: Apple },
                  { id: 'reports', label: 'Report Analyzer', icon: FileText },
                  { id: 'passport', label: 'Health Passport', icon: ClipboardList },
                  { id: 'community', label: 'Community Support', icon: Globe },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-2xl text-[11px] font-bold transition-all ${
                        view === item.id 
                          ? 'bg-[#FF8A80]/15 text-[#FF8A80] border-l-4 border-[#FF8A80]'
                          : 'text-[#7E7A88] hover:bg-[#FFF3F8]/30 hover:text-[#5E5A66]'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{t(item.label)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-[#FFB3D9]/20 pt-4 space-y-2">
              <div className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-[#FFE79A] flex items-center justify-center font-bold text-xs">{profile?.name ? profile.name[0] : 'A'}</div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-[11px] truncate">{profile?.name || 'Aditi Sharma'}</h4>
                  <span className="text-[9px] text-[#A09BAA] block truncate">{user?.email}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left text-[11px] font-bold text-[#FF8A80] hover:underline px-2">{t("Log Out")}</button>
            </div>
          </aside>

          {/* Mobile Slide-Over Sidebar Drawer */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Backdrop Blur Overlay */}
              <div 
                className="fixed inset-0 bg-[#5E5A66]/30 backdrop-blur-sm transition-opacity" 
                onClick={() => setMobileSidebarOpen(false)}
              ></div>
              
              {/* Drawer Content */}
              <div className="relative w-64 max-w-xs bg-[#FFF6FB] p-6 flex flex-col justify-between shadow-2xl h-full z-50 animate-slide-in">
                {/* Close Button */}
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white border flex items-center justify-center text-[#7E7A88] z-50 shadow-sm"
                >
                  <X size={14} />
                </button>
                
                <div className="space-y-6 overflow-y-auto pr-1">
                  <div className="flex items-center gap-2 cursor-pointer border-b pb-2.5" onClick={() => { setView('landing'); setMobileSidebarOpen(false); }}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white" size={18} /></div>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent font-sans">{t("Sakhi")}</span>
                  </div>
                  
                  {/* Sidebar Ambient Audio Controller Widget */}
                  {playingAudio && (
                    <div className="bg-[#FFF9EC] p-3 rounded-2xl border border-[#FFB68A]/30 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-[#5E5A66] truncate block max-w-[120px]">🎶 {playingAudioTitle}</span>
                        <button onClick={stopAmbientSynth} className="text-[#FF8A80] hover:text-[#FF8A80]/80 font-bold">{t("Stop")}</button>
                      </div>
                      <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border">
                        <div className="bg-[#FF8A80] h-full transition-all duration-1000" style={{ width: `${audioProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-1">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: Activity },
                      { id: 'insights', label: 'Health Insights', icon: Sparkles },
                      { id: 'wrapped', label: 'Health Wrapped', icon: Award },
                      { id: 'exercise', label: 'Exercise & Fitness', icon: Dumbbell },
                      { id: 'clinic', label: 'AI Clinic Room', icon: ShieldAlert },
                      { id: 'chat', label: 'Sakhi AI Chat', icon: MessageSquare },
                      { id: 'tracker', label: 'Menstrual Tracker', icon: Calendar },
                      { id: 'nutrition', label: 'Meal & Grocery', icon: Apple },
                      { id: 'reports', label: 'Report Analyzer', icon: FileText },
                      { id: 'passport', label: 'Health Passport', icon: ClipboardList },
                      { id: 'community', label: 'Community Support', icon: Globe },
                      { id: 'settings', label: 'Settings', icon: Settings }
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => { setView(item.id); setMobileSidebarOpen(false); }}
                          className={`flex items-center gap-3 px-4 py-2 rounded-2xl text-[11.5px] font-extrabold transition-all text-left ${
                            view === item.id 
                              ? 'bg-[#FF8A80]/15 text-[#FF8A80] border-l-4 border-[#FF8A80]'
                              : 'text-[#7E7A88] hover:bg-[#FFF3F8]/30 hover:text-[#5E5A66]'
                          }`}
                        >
                          <Icon size={14} className="flex-shrink-0" />
                          <span>{t(item.label)}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="border-t border-[#FFB3D9]/20 pt-4 space-y-3">
                  {/* Mobile-only tools (XP badge and Language Select) */}
                  <div className="flex flex-col gap-2 bg-[#FFF3F8]/50 p-3 rounded-2xl border border-[#FFB3D9]/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5E5A66]">
                      <span>🏅 {userPoints} XP {t("Level")} 3</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border rounded-xl px-2.5 py-1.5 shadow-sm mt-1 border-[#FFB3D9]/20">
                      <Globe size={12} className="text-[#A09BAA]" />
                      <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-transparent text-[11px] font-semibold text-[#7E7A88] focus:outline-none cursor-pointer">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="gu">ગુજરાતી (Gujarati)</option>
                        <option value="kn">ಕನ್ನಡ (Kannada)</option>
                        <option value="ml">മലയാളം (Malayalam)</option>
                        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFE79A] flex items-center justify-center font-bold text-xs">{profile?.name ? profile.name[0] : 'A'}</div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-[11px] truncate">{profile?.name || 'Aditi Sharma'}</h4>
                      <span className="text-[9px] text-[#A09BAA] block truncate">{user?.email}</span>
                    </div>
                  </div>
                  <button onClick={() => { handleLogout(); setMobileSidebarOpen(false); }} className="w-full text-left text-[11px] font-bold text-[#FF8A80] hover:underline px-2">{t("Log Out")}</button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom mobile Nav */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FFF6FB]/95 border-t border-[#FFF3F8] px-4 py-2 z-40 flex justify-around">
            {[
              { id: 'dashboard', label: 'Home', icon: Activity },
              { id: 'insights', label: 'Insights', icon: Sparkles },
              { id: 'wrapped', label: 'Wrapped', icon: Award },
              { id: 'exercise', label: 'Exercise', icon: Dumbbell },
              { id: 'tracker', label: 'Cycle', icon: Calendar }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setView(item.id)} className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl ${view === item.id ? 'text-[#FF8A80]' : 'text-[#A09BAA]'}`}>
                  <Icon size={18} />
                  <span className="text-[9px] font-bold">{t(item.label)}</span>
                </button>
              );
            })}
          </div>

          {/* Main Container */}
          <main className="flex-grow p-6 lg:p-8 pb-24 lg:pb-10 overflow-y-auto">
            
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-[#FFF3F8]/30 pb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-2xl bg-[#FFF6FB] border flex items-center justify-center text-[#FF8A80] hover:bg-[#FF8A80]/10 shadow-sm border-[#FFB3D9]/25 flex-shrink-0"
                >
                  <Menu size={18} />
                </button>
                <div>
                  <span className="text-[10px] text-[#A09BAA] uppercase font-bold tracking-wider">{t("Health Twin Active")}</span>
                  <h1 className="text-xl lg:text-2xl font-bold font-sans text-[#5E5A66] mt-0.5">
                    {lang !== 'en' ? `नमस्ते, ${profile?.name || 'अदिति'} 🌸` : `${t("Good Morning, Aditi!")}`}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-4 relative">
                <div className="hidden sm:flex bg-[#FFE79A] text-[#5E5A66] font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm items-center gap-1">
                  🏅 {userPoints} XP {t("Level")} 3
                </div>
                <div className="hidden sm:flex relative items-center gap-1 bg-white border rounded-xl px-2.5 py-1.5 shadow-sm">
                  <Globe size={13} className="text-[#A09BAA]" />
                  <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-[11px] font-semibold text-[#7E7A88] focus:outline-none cursor-pointer">
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                  </select>
                </div>
                <button onClick={handleSOS} className="bg-[#FF8A80]/15 hover:bg-[#FF8A80]/20 border border-[#FF8A80]/40 text-[#FF8A80] font-bold px-3 py-2 rounded-xl text-[10px] tracking-wider uppercase">🚨 {t("SOS")}</button>
                <button onClick={() => setNotificationOpen(!notificationOpen)} className="w-10 h-10 rounded-2xl bg-white border flex items-center justify-center text-[#7E7A88] hover:text-[#5E5A66] shadow-sm relative flex-shrink-0">
                  <Bell size={18} />
                  {dashboardData?.notifications?.some(n => !n.seen) && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF8A80]"></span>}
                </button>
              </div>
            </header>

            {/* --- PANEL 1: DASHBOARD VIEW PANEL --- */}
            {view === 'dashboard' && dashboardData && (
              <div className="space-y-8 animate-fade-in">
                
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border border-[#FFB3D9]/20 rounded-3xl p-6 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FFE79A]/15 rounded-full"></div>
                  <span className="inline-flex items-center gap-1 bg-[#FFE79A]/50 text-[#7E7A88] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    <Sparkles size={10} /> {t("Daily AI Welcome Summary")}
                  </span>
                  <p className="text-xs text-[#7E7A88] leading-relaxed max-w-2xl font-medium">
                    "Good Morning {profile?.name || 'Aditi'} 🌸. Your Wellness Score is at <strong className="text-[#F48FB1]">{dashboardData.wellness_score}%</strong> today. <strong>Coaching Tip:</strong> You've slept less than 7 hours for three days. Try winding down and going to bed 30 minutes earlier tonight. Keep hydrated; we calculated a sunlight exposure recommendation of 15 minutes."
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
                    <span className="text-xs font-bold text-[#A09BAA] uppercase tracking-wider">{t("Today's Wellness Score")}</span>
                    <div className="w-36 h-36 my-4 relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="60" stroke="#FFE79A" strokeWidth="8" fill="transparent" opacity="0.3"/>
                        <circle cx="72" cy="72" r="60" stroke="url(#wellness-grad)" strokeWidth="8" fill="transparent" strokeDasharray={2*Math.PI*60} strokeDashoffset={2*Math.PI*60*(1-dashboardData.wellness_score/100)} strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.wellness_score}%</span>
                        <span className="text-[9px] text-[#A09BAA] uppercase font-bold tracking-wider">{t("Calculated")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <h3 className="text-lg font-bold text-[#5E5A66]">{t("Weekly Recommendations")}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {routineList.map((rt, idx) => (
                        <div key={idx} className="bg-white/80 border rounded-2xl p-4 shadow-sm flex gap-3 items-center">
                          <span className="bg-[#FFE79A] text-xs font-bold px-2 py-1 rounded-lg text-[#5E5A66]">{rt.time}</span>
                          <span className="text-xs font-semibold text-[#7E7A88]">{t(rt.activity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66]">{t("Household & Errands Checklist")}</h3>
                    <div className="space-y-2.5">
                      {errandsList.map(e => (
                        <div 
                          key={e.id} 
                          onClick={() => handleToggleErrand(e.id)}
                          className="flex items-center gap-3 bg-[#FFF6FB] border p-3.5 rounded-2xl cursor-pointer hover:border-[#FFB3D9]"
                        >
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${e.completed ? 'bg-[#B9F4D0] border-[#B9F4D0]' : 'border-[#FFB3D9]/60'}`}>
                            {e.completed && <Check size={12} />}
                          </div>
                          <span className={`text-xs font-semibold ${e.completed ? 'line-through text-[#A09BAA]' : 'text-[#5E5A66]'}`}>
                            {t(e.task)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">{t("Daily Health Targets")}</h3>
                    <div className="space-y-4">
                      {goals.map(g => (
                        <div key={g.id} className="space-y-1.5 bg-[#FFF6FB] border rounded-2xl p-4">
                          <div className="flex justify-between items-center text-xs font-bold text-[#5E5A66]">
                            <span>{t(g.title)}</span>
                            <span>{g.current} / {g.target} {g.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* --- PANEL 2: HEALTH INSIGHTS & AI RECOMMENDATIONS --- */}
            {view === 'insights' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Health Insights")}</h2>
                    <p className="text-xs text-[#7E7A88] mt-1">{t("Dynamic AI-generated wellness tips, hormone trends, and health tracking anomalies.")}</p>
                  </div>
                  <div className="bg-[#FF8A80]/10 border border-[#FF8A80]/20 text-[#FF8A80] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    ✨ {t("AI Engine Active")}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Side: Interactive Cycle Analysis & Vital Trends */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">📊 {t("Hormone Trend Analysis")}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#A09BAA] font-bold">{t("Estrogen Level:")}</span>
                          <span className="font-bold text-[#FF8A80] bg-[#FF8A80]/15 px-2.5 py-0.5 rounded-full border border-[#FF8A80]/30">{t("Rising (High Peak near)")}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#A09BAA] font-bold">{t("Progesterone Level:")}</span>
                          <span className="font-semibold text-[#7E7A88]">{t("Low/Baseline")}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#A09BAA] font-bold">{t("Metabolic Speed:")}</span>
                          <span className="font-semibold text-[#7E7A88]">{t("Moderate (+5% base)")}</span>
                        </div>
                      </div>
                      <div className="bg-[#FFF6FB] p-4 rounded-2xl border border-[#FFB3D9]/10 text-xs text-[#7E7A88] leading-relaxed">
                        <strong className="text-[#FF8A80] block mb-1">🧠 {t("AI Cycle Correlation:")}</strong>
                        {t("You are currently in your Follicular Phase. As estrogen rises, your physical strength, insulin sensitivity, and mood baseline are naturally increasing. This is the optimal phase for building muscle, trying new hobbies, and active social engagements. Keep hydration high to help liver-flush excess hormone byproducts.")}
                      </div>
                    </div>

                    <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">📈 {t("Tracked Anomalies (Last 7 Days)")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 bg-[#FFF9EC]/40 border border-[#FFD59A]/30 p-3 rounded-2xl">
                          <span className="text-xl">⚠️</span>
                          <div>
                            <h4 className="font-bold text-xs text-[#B88E2F]">{t("Sleep Debt Warning")}</h4>
                            <p className="text-[11px] text-[#7E7A88] mt-0.5">{t("Your average sleep duration dropped to 6.2 hours over the last 3 nights. This can lead to cortisol increases, which aggravates PCOS bloating.")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-[#FFF6FB] border border-[#FFB3D9]/10 p-3 rounded-2xl">
                          <span className="text-xl">💧</span>
                          <div>
                            <h4 className="font-bold text-xs text-[#FF8A80]">{t("Hydration Consistency")}</h4>
                            <p className="text-[11px] text-[#7E7A88] mt-0.5">{t("Excellent work! You reached your 2.2L target 5 times this week. This is helping keep pre-period water retention low.")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: AI Recommendations List */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">💡 {t("Personalized Recommendations")}</h3>
                    <div className="space-y-4">
                      {dashboardData?.recommendations?.map((rec, idx) => (
                        <div key={idx} className="bg-[#FFF6FB] border border-[#FFB3D9]/10 p-4 rounded-2xl space-y-2 relative hover:shadow-sm transition-all">
                          <div className="flex justify-between items-center">
                            <span className="bg-[#FF8A80]/15 text-[#FF8A80] font-bold px-2 py-0.5 rounded-full text-[9px] uppercase border border-[#FF8A80]/20">{t(rec.category)}</span>
                            <span className={`font-bold text-[9px] px-2 py-0.5 rounded-full border ${
                              rec.priority === 'High' ? 'bg-[#FF8A80]/10 text-[#FF8A80] border-[#FF8A80]/20' : 'bg-[#FFF9EC] text-[#B88E2F] border-[#FFD59A]/30'
                            }`}>{t(rec.priority)} {t("Priority")}</span>
                          </div>
                          <h4 className="font-bold text-xs text-[#5E5A66]">{t(rec.title)}</h4>
                          <p className="text-[11px] text-[#7E7A88] leading-relaxed">{t(rec.description)}</p>
                        </div>
                      ))}
                      {!dashboardData?.recommendations?.length && (
                        <div className="text-center py-8 text-xs text-[#A09BAA]">
                          {t("All recommendations resolved! Keep tracking values to refresh insights.")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 2: SAKHI AI ASSISTANT CHAT --- */}
            {view === 'chat' && (
              <div className="bg-white border rounded-3xl shadow-sm h-[75vh] flex flex-col overflow-hidden animate-fade-in">
                <div className="bg-[#FFF6FB] border-b px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white" size={20} /></div>
                    <h2 className="font-bold text-lg text-[#5E5A66]">{t("Sakhi AI Chat")}</h2>
                  </div>
                </div>
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`w-full max-w-[75%] rounded-3xl p-4 text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#FF8A80] text-white rounded-tr-none' : 'bg-[#FFF6FB] text-[#5E5A66] rounded-tl-none'}`}>
                        <p>{t(msg.message)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-3">
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={t("Ask about PCOS, delay...")} className="flex-grow bg-[#FFF8F6] border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
                  <button type="submit" className="bg-[#FF8A80] text-white w-12 h-12 rounded-2xl flex items-center justify-center"><Send size={18} /></button>
                </form>
              </div>
            )}

            {/* --- PANEL 3: NUTRITION, MEALS & ZOMATO MEAL ADVISOR --- */}
            {view === 'nutrition' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Meal & Grocery")}</h2>
                </div>
                
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#5E5A66] flex items-center gap-1.5">🍔 {t("Zomato + Nutrition Recommendation")}</h3>
                  <form onSubmit={handleZomatoQuery} className="flex gap-2">
                    <input type="text" value={zomatoInput} onChange={(e) => setZomatoInput(e.target.value)} placeholder={t("Search restaurant foods (e.g. Pizza, Biryani)...")} className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none" />
                    <button type="submit" className="bg-[#FF8A80] text-white font-bold px-4 py-2 rounded-xl text-xs">{t("Swap")}</button>
                  </form>
                  {zomatoLoading && (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#7E7A88] bg-[#FFF6FB] border p-4 rounded-2xl">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF8A80]"></div>
                      <span>{t("AI checking nutritional density...")}</span>
                    </div>
                  )}

                  {zomatoSuggestion && (
                    <div className="animate-fade-in">
                      {zomatoSuggestion.is_unhealthy === false || zomatoSuggestion.is_unhealthy === 'false' ? (
                        <div className="bg-[#B9F4D0]/10 border border-[#B9F4D0]/35 p-4 rounded-2xl text-xs space-y-2 border-dashed">
                          <div className="flex items-center gap-1.5 font-bold text-[#2E7D32] text-sm">
                            <span>✅ {t("Already a Nutritious Choice!")}</span>
                          </div>
                          <div className="text-[11px] text-[#5E5A66] leading-relaxed pt-1">
                            <strong>{t("Reason")}:</strong> {t(zomatoSuggestion.reason || zomatoSuggestion.why)}
                          </div>
                          <div className="text-[11px] text-[#7E7A88] leading-relaxed">
                            <strong>🧬 {t("Hormonal & Cycle Benefits")}:</strong> {t(zomatoSuggestion.benefits)}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#FFF6FB] border p-4 rounded-2xl text-xs space-y-2.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#FF8A80]">
                            <span>⚠️ {t("Healthier alternative recommended")}</span>
                          </div>
                          <div>
                            <strong className="text-[#7E7A88]">{t("Original Request")}:</strong>{" "}
                            <span className="line-through text-[#A09BAA]">{zomatoSuggestion.original}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#2E7D32]">{t("Healthier AI Swap")}:</strong>{" "}
                            <span className="font-bold text-[#2E7D32] bg-[#B9F4D0]/15 px-3 py-1 rounded-xl border border-[#B9F4D0]/35">
                              {t(zomatoSuggestion.healthy_swap || zomatoSuggestion.substitute)}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#7E7A88] leading-relaxed pt-1 border-t border-[#FFB3D9]/10">
                            <strong>{t("Reason")}:</strong> {t(zomatoSuggestion.reason || zomatoSuggestion.why)}
                          </div>
                          <div className="text-[11px] text-[#7E7A88] leading-relaxed">
                            <strong>🧬 {t("Hormonal & Cycle Benefits")}:</strong> {t(zomatoSuggestion.benefits)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Weekly Meal Planner */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                        <span>🍳 {t("Weekly Meal Planner")}</span>
                      </h3>
                      <div className="space-y-3 pt-2">
                        {Object.keys(weeklyMealPlan).map(mealKey => (
                          <div key={mealKey} className="bg-[#FFF6FB] border p-3.5 rounded-2xl space-y-1 text-xs">
                            <span className="font-bold text-[#FF8A80] uppercase tracking-wider block text-[9px]">{t(mealKey)}</span>
                            <span className="font-semibold text-[#5E5A66] text-sm block">{t(weeklyMealPlan[mealKey])}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleGenerateCustomMeal} className="border-t pt-3 space-y-2 mt-2">
                      <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#7E7A88]">{t("Dietary Opinion / Preference:")}</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={mealPlannerPrompt} 
                          onChange={(e) => setMealPlannerPrompt(e.target.value)} 
                          placeholder={t("e.g. Vegetarian high protein, low carb...")} 
                          className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                        />
                        <button 
                          type="submit" 
                          className="bg-[#FF8A80] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:opacity-95"
                        >
                          🔄 {t("Regenerate")}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Healthy Grocery Planner */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🛒 {t("Healthy Grocery Planner")}</h3>
                      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 mt-2.5">
                        {groceries.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => handleToggleGrocery(item.id)}
                            className="flex items-center justify-between bg-[#FFF9EC]/50 border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9] transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.bought ? 'bg-[#B9F4D0] border-[#B9F4D0]' : 'border-[#FFB3D9]/60'}`}>
                                  {item.bought && <Check size={10} />}
                              </div>
                              <span className={`text-xs font-semibold ${item.bought ? 'line-through text-[#A09BAA]' : 'text-[#5E5A66]'}`}>{t(item.name)}</span>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setGroceries(prev => prev.filter(g => g.id !== item.id));
                              }}
                              className="text-[#A09BAA] hover:text-[#FF8A80] p-1 rounded-lg hover:bg-[#FF8A80]/10"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleAddNewGrocery} className="border-t pt-3 flex gap-2 mt-3">
                      <input 
                        type="text" 
                        value={newGroceryItem} 
                        onChange={(e) => setNewGroceryItem(e.target.value)} 
                        placeholder={t("Add grocery item...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                        required
                      />
                      <button type="submit" className="bg-[#FF8A80] text-white font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90">+</button>
                    </form>
                  </div>

                  {/* NEW SECTION: Deficiency & AI Recommendations */}
                  <div className="lg:col-span-12 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">🥦 {t("AI Nutrition Deficiency Advisor")}</h3>
                    <p className="text-xs text-[#7E7A88]">{t("Input your nutrition deficiencies (e.g. Iron, Vitamin D, Zinc) to get custom cycle-friendly food sources.")}</p>
                    
                    <form onSubmit={handleDeficiencySubmit} className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={deficiencyInput} 
                        onChange={(e) => setDeficiencyInput(e.target.value)} 
                        placeholder={t("What deficiency do you want to target? (e.g., Vitamin B12, Iron, Calcium)...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-4 py-2.5 text-xs focus:outline-none" 
                        required 
                      />
                      <button 
                        type="submit" 
                        disabled={deficiencyLoading}
                        className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {deficiencyLoading ? (
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                        ) : "Get Recommendations"}
                      </button>
                    </form>

                    {deficiencyResult && (
                      <div className="bg-[#FFF9EC] border border-[#FFD59A]/30 p-5 rounded-3xl text-xs space-y-4 animate-fade-in">
                        <div>
                          <strong className="text-[#B88E2F] block text-sm mb-1">💡 {t("Why it's essential for Cycle/Hormone Health:")}</strong>
                          <p className="text-[#7E7A88] leading-relaxed">{t(deficiencyResult.why_essential)}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <strong className="text-[#5E5A66] block text-xs">🥘 {t("Recommended Wholesome Meals:")}</strong>
                            <div className="space-y-1.5">
                              {deficiencyResult.recommended_meals.map((meal, idx) => (
                                <div key={idx} className="bg-white border rounded-xl p-2.5 font-semibold text-[#5E5A66]">{t(meal)}</div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <strong className="text-[#5E5A66] block text-xs">🛒 {t("Target Groceries to Buy:")}</strong>
                              <button 
                                onClick={() => {
                                  deficiencyResult.recommended_groceries.forEach(item => {
                                    setGroceries(prev => {
                                      if (prev.some(g => g.name.toLowerCase() === item.toLowerCase())) return prev;
                                      return [...prev, { id: Date.now() + Math.random(), name: item, bought: false }];
                                    });
                                  });
                                  alert(lang !== 'en' ? "सामग्री ग्रोसरी लिस्ट में जोड़ी गई!" : "Ingredients added to grocery list successfully!");
                                }}
                                className="text-[10px] text-[#FF8A80] font-bold hover:underline"
                              >
                                {t("Add All to List")}
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {deficiencyResult.recommended_groceries.map((item, idx) => (
                                <span key={idx} className="bg-white border border-[#FFD59A]/40 text-[#5E5A66] px-3.5 py-1.5 rounded-full font-bold">{t(item)}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NEW SECTION: Daily Nutrition Logger */}
                  <div className="lg:col-span-12 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">🥑 {t("Add Daily Nutrition Logs")}</h3>
                    <p className="text-xs text-[#7E7A88]">{t("Log what you ate to automatically estimate your protein, iron, and fiber intake.")}</p>
                    
                    <form onSubmit={handleLogNutritionFood} className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={nutritionInputFood} 
                        onChange={(e) => setNutritionInputFood(e.target.value)} 
                        placeholder={t("What did you eat? (e.g., 2 eggs with avocado, bowl of lentil dal)...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-4 py-2.5 text-xs focus:outline-none" 
                        required 
                      />
                      <button 
                        type="submit" 
                        disabled={nutritionLogLoading}
                        className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {nutritionLogLoading ? (
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                        ) : "Log Food"}
                      </button>
                    </form>

                    {/* Today's Logged Foods List */}
                    {nutritionLogHistory.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs text-[#5E5A66]">{t("Today's Food Intake:")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {nutritionLogHistory.map((item, idx) => (
                            <div key={idx} className="bg-[#FFF6FB] border border-[#FFB3D9]/10 p-3.5 rounded-2xl flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-[#5E5A66] block">{t(item.food_name)}</span>
                                <span className="text-[10px] text-[#A09BAA]">{item.time || "Today"}</span>
                              </div>
                              <div className="flex gap-2 text-[10px] font-bold">
                                <span className="bg-[#FFF9EC] text-[#B88E2F] px-2 py-0.5 rounded-full">⏱️ {item.calories} kcal</span>
                                <span className="bg-[#FFF3F8] text-[#FF8A80] px-2 py-0.5 rounded-full">🥚 {item.protein}g protein</span>
                                <span className="bg-[#FFE79A]/40 text-[#5E5A66] px-2 py-0.5 rounded-full">🌾 {item.fiber}g fiber</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Daily Total Summary Metrics */}
                        <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] p-4 rounded-3xl border border-[#FFB3D9]/15 flex flex-wrap justify-around items-center text-center gap-4">
                          <div>
                            <span className="text-[10px] text-[#A09BAA] block uppercase font-bold">{t("Total Calories")}</span>
                            <span className="text-base font-extrabold text-[#5E5A66]">{nutritionLogHistory.reduce((sum, i) => sum + i.calories, 0)} kcal</span>
                          </div>
                          <div className="border-r h-8 hidden sm:block border-[#FFB3D9]/20"></div>
                          <div>
                            <span className="text-[10px] text-[#A09BAA] block uppercase font-bold">{t("Total Protein")}</span>
                            <span className="text-base font-extrabold text-[#5E5A66]">{nutritionLogHistory.reduce((sum, i) => sum + i.protein, 0).toFixed(1)}g</span>
                          </div>
                          <div className="border-r h-8 hidden sm:block border-[#FFB3D9]/20"></div>
                          <div>
                            <span className="text-[10px] text-[#A09BAA] block uppercase font-bold">{t("Total Iron")}</span>
                            <span className="text-base font-extrabold text-[#5E5A66]">{nutritionLogHistory.reduce((sum, i) => sum + i.iron, 0).toFixed(1)}mg</span>
                          </div>
                          <div className="border-r h-8 hidden sm:block border-[#FFB3D9]/20"></div>
                          <div>
                            <span className="text-[10px] text-[#A09BAA] block uppercase font-bold">{t("Total Fiber")}</span>
                            <span className="text-base font-extrabold text-[#5E5A66]">{nutritionLogHistory.reduce((sum, i) => sum + i.fiber, 0).toFixed(1)}g</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 4: BLOOD REPORT ANALYZER --- */}
            {view === 'reports' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Report Analyzer & Genetics")}</h2>
                    <p className="text-xs text-[#7E7A88] mt-1">{t("Upload clinical lab reports and select hereditary genetic markers to receive unified AI diagnostics.")}</p>
                  </div>
                  <div className="bg-[#FF8A80]/15 text-[#FF8A80] border border-[#FF8A80]/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    🔬 {t("AI Lab Analyzer")}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Upload Card */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-[#FFF6FB] rounded-2xl flex items-center justify-center text-[#FF8A80] border"><Upload size={30} /></div>
                    <div>
                      <h3 className="font-bold text-[#5E5A66] text-sm">{t("Upload Clinical PDF or Image")}</h3>
                      <p className="text-[10px] text-[#A09BAA] mt-1">{t("Supports CBC, Thyroid, and hormone lab panels.")}</p>
                    </div>
                    <label className="bg-[#FF8A80] hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-2xl text-xs cursor-pointer shadow-sm animate-pulse">
                      {reportScanning ? t("Analyzing Labs...") : t("Choose Report File")}
                      <input type="file" onChange={handleReportScan} className="hidden" accept=".pdf,image/*" />
                    </label>
                  </div>

                  {/* Analysis Report Card */}
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">📋 {t("Diagnostics & Insights")}</h3>
                    {reportAnalysis ? (
                      <div className="space-y-4 animate-fade-in text-xs leading-relaxed">
                        <div className="bg-[#FFF6FB] p-4 rounded-2xl border border-[#FFB3D9]/15">
                          <strong className="text-[#FF8A80] block text-sm mb-1">{reportAnalysis.status || "Completed"}</strong>
                          <p className="text-[#7E7A88]">{reportAnalysis.summary || "The lab report highlights mild iron deficiency anemia. All other hormone biomarkers are within normal range."}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 font-bold text-[#7E7A88]">
                          <div className="bg-[#FFF9EC] p-3 rounded-xl">
                            <span className="text-[10px] text-[#A09BAA] block">{t("Hemoglobin")}</span>
                            <span className="text-sm font-bold text-[#B88E2F]">{reportAnalysis.hemoglobin || "10.8 g/dL (Low)"}</span>
                          </div>
                          <div className="bg-[#FFF9EC] p-3 rounded-xl">
                            <span className="text-[10px] text-[#A09BAA] block">{t("TSH (Thyroid)")}</span>
                            <span className="text-sm font-bold text-[#B88E2F]">{reportAnalysis.tsh || "2.1 uIU/mL (Normal)"}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-xs text-[#A09BAA]">
                        {t("Upload a clinical report file to trigger AI diagnostics.")}
                      </div>
                    )}
                  </div>
                </div>

                {/* Family Health History Markers */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">🧬 {t("Family Health History Markers")}</h3>
                  <p className="text-xs text-[#7E7A88]">{t("Select genetic health risks present in your maternal line to map heredity factors:")}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-[#7E7A88]">
                    {Object.keys(familyHealthHistory).map(cond => (
                      <label 
                        key={cond} 
                        className={`flex items-center justify-center text-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          familyHealthHistory[cond] ? 'bg-[#FF8A80]/10 border-[#FF8A80] text-[#FF8A80] shadow-sm' : 'bg-[#FFF6FB] hover:border-[#FFB3D9]'
                        }`}
                        onClick={() => setFamilyHealthHistory(prev => ({ ...prev, [cond]: !prev[cond] }))}
                      >
                        <span className="capitalize">{t(cond)}</span>
                      </label>
                    ))}
                  </div>

                  {/* Dynamic AI Clinical Guidance alert box */}
                  {(familyHealthHistory.diabetes || familyHealthHistory.hypertension || familyHealthHistory.thyroid || familyHealthHistory.pcos) && (
                    <div className="bg-[#FFF9EC]/80 border border-[#FFD59A]/30 p-5 rounded-2xl text-xs space-y-2 mt-4 animate-fade-in">
                      <strong className="text-[#B88E2F] flex items-center gap-1">⚠️ {t("Maternal Genetic Guidance & Preventative Action:")}</strong>
                      <ul className="list-disc pl-4 space-y-2 text-[#7E7A88] leading-relaxed">
                        {familyHealthHistory.pcos && (
                          <li><strong>{t("PCOS link:")}</strong> {t("Maternal PCOS history elevates predisposition to insulin resistance and follicular follicle variability. Prioritize daily physical movement (especially post-meal walks) and high-fiber nutrition.")}</li>
                        )}
                        {familyHealthHistory.diabetes && (
                          <li><strong>{t("Diabetes link:")}</strong> {t("Increases maternal genetic risk for glucose crashes and metabolic slowdown. We recommend monitoring blood sugar levels annually and prioritizing slow-release carbohydrates.")}</li>
                        )}
                        {familyHealthHistory.thyroid && (
                          <li><strong>{t("Thyroid link:")}</strong> {t("Increases susceptibility to autoimmune hypothyroidism. Keep track of T3/T4/TSH levels and ensure sufficient dietary selenium/iodine (from seaweed, fish, or iodized salt).")}</li>
                        )}
                        {familyHealthHistory.hypertension && (
                          <li><strong>{t("Hypertension link:")}</strong> {t("Predisposition to vascular stiffness. Keep dietary sodium below 2,000mg/day, prioritize magnesium/potassium-rich foods, and log blood pressure during luteal phases.")}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- PANEL 5: MENSTRUAL CYCLE CALENDAR & TRACKER --- */}
            {view === 'tracker' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Cycle Calendar & Logs")}</h2>
                    <span className="text-xs text-[#FFB3D9] font-bold bg-[#FFB3D9]/20 px-2 py-0.5 rounded-full inline-block mt-2 font-mono">{t("Day 12 Follicular Phase")}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowTeenGuide(!showTeenGuide)} className="bg-[#C9B6FF] hover:bg-[#C9B6FF]/95 text-white font-bold px-4 py-2 rounded-2xl text-xs transition-all flex items-center gap-1">🌸 {t("First Period Guide")}</button>
                    <span className="bg-[#FF8A80]/20 text-[#5E5A66] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center">{t("Predicted Period: 4 Days left")}</span>
                  </div>
                </div>

                {showTeenGuide && (
                  <div className="bg-gradient-to-r from-[#FFF6FB] to-[#C9B6FF]/10 border border-[#C9B6FF]/20 rounded-3xl p-6 shadow-sm space-y-4 animate-fade-in relative">
                    <button 
                      onClick={() => setShowTeenGuide(false)}
                      className="absolute top-4 right-4 text-[#A09BAA] hover:text-[#5E5A66]"
                    >
                      <X size={16} />
                    </button>
                    <h3 className="font-bold text-lg text-[#5E5A66] flex items-center gap-2">🌸 {t("First Period Guide (Menarche)")}</h3>
                    <p className="text-xs text-[#7E7A88] leading-relaxed">{t("Getting your first period can bring up many questions. Remember: it is a completely natural milestone showing that your body is growing beautifully. Here is a quick guide to support you:")}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-2">
                      <div className="bg-white p-4 rounded-2xl border space-y-1.5 shadow-sm">
                        <strong className="text-[#C9B6FF] text-sm block">🩸 {t("1. What to Expect:")}</strong>
                        <p className="text-[#7E7A88] leading-relaxed">{t("The flow usually starts as light spotting (brown or pinkish) and might last 3-7 days. It happens once a month. Your early cycles can be irregular, and that is completely normal.")}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border space-y-1.5 shadow-sm">
                        <strong className="text-[#C9B6FF] text-sm block">🛡️ {t("2. Period Products:")}</strong>
                        <p className="text-[#7E7A88] leading-relaxed">{t("Use disposable sanitary pads (change them every 4-6 hours), reusable cloth pads, or period underwear. Wash your hands before and after changing products.")}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border space-y-1.5 shadow-sm">
                        <strong className="text-[#C9B6FF] text-sm block">💆‍♀️ {t("3. Self-Care Tips:")}</strong>
                        <p className="text-[#7E7A88] leading-relaxed">{t("If you feel cramps, apply a warm water bottle or take a warm shower. Stay hydrated, do light walking, and note the date on the Cycle Calendar above.")}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-6 bg-[#FFF9EC] border border-[#FFD59A]/30 rounded-3xl p-5 shadow-sm space-y-3">
                    <h3 className="font-bold text-sm text-[#5E5A66] flex items-center gap-1.5">🎒 {t("Carry Pads Handbag Reminder")}</h3>
                    <p className="text-xs text-[#7E7A88]">{t("Check off when you have packed pads in your school/work handbag.")}</p>
                    <button 
                      onClick={handleTogglePadKit}
                      className={`w-full py-2.5 rounded-2xl text-xs font-extrabold transition-all border ${
                        padReminderPacked ? 'bg-[#B9F4D0]/40 border-[#B9F4D0] text-[#5E5A66]' : 'bg-white border-[#FFD59A] text-[#7E7A88]'
                      }`}
                    >
                      {padReminderPacked ? t('Packed in Handbag!') : t('Not Packed yet')}
                    </button>
                  </div>

                  <div className="md:col-span-6 bg-white border rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold text-[#7E7A88]">
                    <h3 className="font-bold text-sm text-[#5E5A66] border-b pb-1.5 flex items-center gap-1">🌸 {t("Menstrual Product Tracker")}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-[#FFF6FB] p-3 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#A09BAA] block uppercase font-bold">{t("Stock left")}</span>
                          <span className="text-lg font-bold text-[#FF8A80]">{padStock} Pads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setPadStock(Math.max(0, padStock - 1))}
                            className="w-8 h-8 rounded-xl bg-[#FF8A80]/15 text-[#FF8A80] font-extrabold text-sm hover:bg-[#FF8A80]/25 transition-all flex items-center justify-center border border-[#FF8A80]/20"
                          >
                            -
                          </button>
                          <button 
                            onClick={() => setPadStock(padStock + 1)}
                            className="w-8 h-8 rounded-xl bg-[#B9F4D0]/35 text-[#2E7D32] font-extrabold text-sm hover:bg-[#B9F4D0]/50 transition-all flex items-center justify-center border border-[#B9F4D0]/30"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Brain Fog Tracker */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#5E5A66] border-b pb-1.5 flex items-center gap-1.5">🧠 {t("Daily Brain Fog Tracker")}</h3>
                  <p className="text-xs text-[#7E7A88]">{t("Log brain fog levels to trace hormone-induced concentration patterns.")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-bold text-[#7E7A88]">
                    <div>
                      <label className="block mb-1.5">{t("Memory Recall")} ({brainFogLog.memory}/10)</label>
                      <input type="range" min="1" max="10" value={brainFogLog.memory} onChange={(e) => setBrainFogLog({...brainFogLog, memory: parseInt(e.target.value)})} className="w-full accent-[#FF8A80]" />
                    </div>
                    <div>
                      <label className="block mb-1.5">{t("Focus Level")} ({brainFogLog.focus}/10)</label>
                      <input type="range" min="1" max="10" value={brainFogLog.focus} onChange={(e) => setBrainFogLog({...brainFogLog, focus: parseInt(e.target.value)})} className="w-full accent-[#FF8A80]" />
                    </div>
                    <div>
                      <label className="block mb-1.5">{t("Concentration")} ({brainFogLog.concentration}/10)</label>
                      <input type="range" min="1" max="10" value={brainFogLog.concentration} onChange={(e) => setBrainFogLog({...brainFogLog, concentration: parseInt(e.target.value)})} className="w-full accent-[#FF8A80]" />
                    </div>
                  </div>

                  {/* Dynamic Focus Improvement Guide */}
                  <div className="bg-[#FFF9EC]/75 border border-[#FFD59A]/30 p-4.5 rounded-2xl text-xs space-y-2 mt-4 animate-fade-in">
                    <strong className="text-[#B88E2F] flex items-center gap-1">💡 {t("Melatonin & Concentration Improvement Guide:")}</strong>
                    <ul className="list-disc pl-4 space-y-1.5 text-[#7E7A88] leading-relaxed font-semibold">
                      {(brainFogLog.focus <= 5 || brainFogLog.memory <= 5) ? (
                        <li>🚨 {t("Your concentration or recall is currently low. Estrogen drop can affect dopamine synthesis. Try a 15-minute brisk walk outside to stimulate blood flow, or drink a cup of organic ginger/green tea.")}</li>
                      ) : (
                        <li>✨ {t("Your brain fog level is optimal today! Maintain hydration (at least 2.5L) and do light stretching to keep energy levels balanced.")}</li>
                      )}
                      <li>🥑 {t("Dietary Booster: Consume foods rich in Omega-3 fatty acids (walnuts, chia seeds, flaxseeds) to support myelin sheaths and combat cognitive fatigue.")}</li>
                      <li>📵 {t("Habit tip: Turn off all digital screens at least 45 minutes before sleep to ensure deep delta-wave recovery (which clears neural waste).")}</li>
                    </ul>
                  </div>
                </div>

                {/* PCOS screening quiz */}
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-[#5E5A66]">{t("PCOS Screening Tool")}</h3>
                      <p className="text-xs text-[#7E7A88] mt-1">{t("A simple diagnostic quiz to screen high/low markers for Polycystic Ovary Syndrome.")}</p>
                    </div>
                    <button onClick={() => { setPcosQuizOpen(!pcosQuizOpen); setPcosResult(null); }} className="bg-white border rounded-2xl px-4 py-2 text-xs font-bold hover:bg-[#FFF6FB] transition-all">
                      {pcosQuizOpen ? t('Close Quiz') : t('Start Screening')}
                    </button>
                  </div>

                  {pcosQuizOpen && !pcosResult && (
                    <form onSubmit={handleSubmitPcosQuiz} className="space-y-4 text-xs font-semibold text-[#7E7A88] border-t pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1.5">{t("Period Regularity")}</label>
                          <select value={pcosAnswers.periods} onChange={(e) => setPcosAnswers({...pcosAnswers, periods: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                            <option value="regular">{t("Regular (21-35 days)")}</option>
                            <option value="irregular">{t("Irregular / Missed periods")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1.5">{t("Excessive Facial/Body Hair")}</label>
                          <select value={pcosAnswers.hair} onChange={(e) => setPcosAnswers({...pcosAnswers, hair: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                            <option value="no">{t("No / Normal")}</option>
                            <option value="yes">{t("Yes (Hirsutism)")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1.5">{t("Sudden Weight Gain")}</label>
                          <select value={pcosAnswers.weight} onChange={(e) => setPcosAnswers({...pcosAnswers, weight: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                            <option value="stable">{t("Stable / Easy to manage")}</option>
                            <option value="gain">{t("Sudden fluctuations")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1.5">{t("Acne Breakouts")}</label>
                          <select value={pcosAnswers.acne} onChange={(e) => setPcosAnswers({...pcosAnswers, acne: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                            <option value="none">{t("None")}</option>
                            <option value="severe">{t("Severe acne")}</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="bg-[#FF8A80] text-white px-5 py-2.5 rounded-xl font-bold">{t("Analyze Risk")}</button>
                    </form>
                  )}

                  {pcosResult && (
                    <div className="bg-white p-4 border rounded-2xl text-xs space-y-2.5">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-[#5E5A66]">{t("Quiz Assessment Result")}</span>
                        <span className="px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase bg-[#FF8A80]/15 text-[#FF8A80]">{t(pcosResult.risk)} {t("Risk")}</span>
                      </div>
                      <p className="text-[#7E7A88] leading-relaxed">{t(pcosResult.guideline)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- PANEL 6: HEALTH PASSPORT --- */}
            {view === 'passport' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Health Passport")}</h2>
                    <p className="text-xs text-[#7E7A88] mt-1">{t("Unified record repository of vaccinations, medical visits, prescriptions, and scanned files.")}</p>
                  </div>
                  <div className="bg-[#FF8A80]/15 text-[#FF8A80] border border-[#FF8A80]/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    🪪 {t("Maternal Health Repository")}
                  </div>
                </div>
                
                {/* Unified Records Input Form & List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Form to Add New Record */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-base text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">➕ {t("Log New Medical Record")}</h3>
                    <form onSubmit={handleAddMedicalRecord} className="space-y-3.5 text-xs font-bold text-[#7E7A88]">
                      <div>
                        <label className="block mb-1">{t("Record Type")}</label>
                        <select 
                          value={newRecordType} 
                          onChange={(e) => setNewRecordType(e.target.value)} 
                          className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                        >
                          <option value="Vaccination">{t("Vaccination")}</option>
                          <option value="Prescription">{t("Prescription")}</option>
                          <option value="Medical Visit">{t("Medical Visit")}</option>
                          <option value="Lab Report">{t("Lab Report")}</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block mb-1">{t("Record Date")}</label>
                          <input 
                            type="date" 
                            value={newRecordDate} 
                            onChange={(e) => setNewRecordDate(e.target.value)}
                            className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">{t("Record Title")}</label>
                          <input 
                            type="text" 
                            value={newRecordTitle} 
                            onChange={(e) => setNewRecordTitle(e.target.value)}
                            placeholder="e.g. HPV Vaccine Dose 1"
                            className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1">{t("Details / Comments")}</label>
                        <textarea 
                          value={newRecordDetails} 
                          onChange={(e) => setNewRecordDetails(e.target.value)}
                          placeholder="e.g. Next checkup in 6 months, no side effects noted..."
                          className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none h-16 resize-none"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-[#FF8A80] hover:bg-[#FF8A80]/90 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all"
                      >
                        {t("Save to Health Passport")}
                      </button>
                    </form>
                  </div>

                  {/* List of Logged Records */}
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-base text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                      <span>📄 {t("Your Medical Folder")}</span>
                      <span className="text-[10px] text-[#A09BAA] font-bold">{medicalRecords.length} {t("records saved")}</span>
                    </h3>
                    <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                      {medicalRecords.length === 0 ? (
                        <div className="text-center py-12 text-xs text-[#A09BAA]">{t("No medical records saved yet. Use the log form to add your first record.")}</div>
                      ) : (
                        medicalRecords.map(rec => (
                          <div key={rec.id} className="bg-[#FFF6FB] border border-[#FFB3D9]/10 p-3.5 rounded-2xl space-y-2 relative hover:shadow-sm transition-all">
                            <button 
                              onClick={() => setMedicalRecords(prev => prev.filter(r => r.id !== rec.id))}
                              className="absolute top-3.5 right-3.5 text-[#A09BAA] hover:text-[#FF8A80] p-1 rounded-lg hover:bg-[#FF8A80]/10 transition-all"
                            >
                              <Trash2 size={13} />
                            </button>
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                rec.type === 'Vaccination' ? 'bg-[#C9B6FF]/15 text-[#C9B6FF]' :
                                rec.type === 'Prescription' ? 'bg-[#FF8A80]/15 text-[#FF8A80]' :
                                rec.type === 'Medical Visit' ? 'bg-[#FFF9EC] text-[#B88E2F]' :
                                'bg-[#B9F4D0]/40 text-[#2E7D32]'
                              }`}>
                                {t(rec.type)}
                              </span>
                              <span className="text-[10px] font-bold text-[#A09BAA] font-mono">{rec.date}</span>
                            </div>
                            <h4 className="font-bold text-sm text-[#5E5A66]">{rec.title}</h4>
                            {rec.details && <p className="text-xs text-[#7E7A88] leading-relaxed">{rec.details}</p>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Chronological Timeline */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-bold text-lg text-[#5E5A66]">{t("Chronological Timeline")}</h3>
                  </div>
                  <div className="relative border-l-2 border-[#FFB3D9]/30 pl-6 space-y-6 ml-2 py-1">
                    {medicalRecords.map((rec) => (
                      <div key={rec.id} className="relative">
                        <span className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-white border border-[#FF8A80] flex items-center justify-center text-xs shadow-sm">
                          {rec.type === 'Vaccination' ? '💉' : rec.type === 'Prescription' ? '💊' : rec.type === 'Medical Visit' ? '🩺' : '📄'}
                        </span>
                        <div className="text-xs">
                          <span className="font-bold text-sm text-[#5E5A66] block">{rec.title}</span>
                          <span className="text-[10px] text-[#A09BAA] font-bold font-mono block mt-0.5">{rec.date}</span>
                          {rec.details && <p className="text-[#7E7A88] mt-1">{rec.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 8: EXERCISE & FITNESS RECOMMENDATIONS --- */}
            {view === 'exercise' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Exercise & Fitness")}</h2>
                    <p className="text-xs text-[#7E7A88] mt-1">{t("Sync your workouts with your menstrual cycle phases to maximize energy and support hormonal health.")}</p>
                  </div>
                  <div className="bg-[#FF8A80]/10 border border-[#FF8A80]/20 text-[#FF8A80] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    🌸 {t("Current Phase:")} <span className="underline">{profile?.phase || t("Follicular")}</span>
                  </div>
                </div>

                {/* Phase Selection Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#FFB3D9]/10">
                  {['Menstruation', 'Follicular', 'Ovulation', 'Luteal'].map(phase => (
                    <button 
                      key={phase} 
                      onClick={() => setSelectedExercisePhase(phase)} 
                      className={`text-xs font-bold py-2 px-5 rounded-full transition-all whitespace-nowrap ${
                        selectedExercisePhase === phase 
                          ? 'bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white shadow-sm' 
                          : 'bg-white border text-[#7E7A88] hover:bg-[#FFF6FB]'
                      }`}
                    >
                      {t(phase)} {t("Phase")}
                    </button>
                  ))}
                </div>

                {/* Recommended Exercises Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedExercisePhase === 'Menstruation' && [
                    {
                      title: "Restorative Butterfly Stretch",
                      desc: "Alleviates pelvic congestion, relieves cramping, and releases lower back compression.",
                      time: "15 mins",
                      cals: "40 kcal",
                      intensity: "Low",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FF8A80]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FF8A80]/20 flex-shrink-0">
                          {/* Calming expanding lotus flower effect */}
                          <div className="absolute w-8 h-8 bg-[#FF8A80]/30 rounded-full animate-lotus-pulse"></div>
                          <div className="absolute w-4 h-4 bg-[#FF8A80] rounded-full"></div>
                        </div>
                      )
                    },
                    {
                      title: "Cat-Cow Flow",
                      desc: "Gently stretches and stimulates abdominal organs while relieving spinal tension.",
                      time: "10 mins",
                      cals: "30 kcal",
                      intensity: "Low",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFB3D9]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFB3D9]/20 flex-shrink-0">
                          {/* Slow cow spine tilt effect */}
                          <div className="absolute w-10 h-1 bg-[#FFB3D9] rounded-full animate-squat-bar"></div>
                          <div className="absolute w-3 h-3 rounded-full bg-[#FFB3D9]/50 animate-squat-body"></div>
                        </div>
                      )
                    },
                    {
                      title: "Slow Mindful Walking",
                      desc: "Improves mood and moves stagnant energy without triggering excessive cortisol production.",
                      time: "30 mins",
                      cals: "110 kcal",
                      intensity: "Gentle",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFE79A]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFE79A]/20 flex-shrink-0">
                          {/* Alternating footstep bubble shift */}
                          <div className="absolute w-4 h-4 bg-[#FFE79A] rounded-full animate-squat-body" style={{ animationDelay: '0s' }}></div>
                          <div className="absolute w-4 h-4 bg-[#FFE79A]/50 rounded-full animate-squat-body" style={{ animationDelay: '0.9s' }}></div>
                        </div>
                      )
                    }
                  ].map((ex, idx) => (
                    <ExerciseCard key={idx} ex={ex} />
                  ))}

                  {selectedExercisePhase === 'Follicular' && [
                    {
                      title: "Dynamic Squats",
                      desc: "Estrogen levels are rising! Build strong lower body foundations during this high muscle-repair window.",
                      time: "15 mins",
                      cals: "120 kcal",
                      intensity: "Medium",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FF8A80]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FF8A80]/20 flex-shrink-0">
                          {/* Squatting bar and body animation */}
                          <div className="absolute w-10 h-2 bg-[#FF8A80] rounded-full animate-squat-bar"></div>
                          <div className="absolute w-4 h-4 rounded-full border-4 border-[#FF8A80] animate-squat-body"></div>
                        </div>
                      )
                    },
                    {
                      title: "Mountain Climbers",
                      desc: "Excellent high-intensity exercise that stimulates core stability and builds explosive energy.",
                      time: "12 mins",
                      cals: "95 kcal",
                      intensity: "High",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFB3D9]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFB3D9]/20 flex-shrink-0">
                          {/* Star jumping back and forth action */}
                          <div className="absolute w-8 h-8 bg-[#FFB3D9] rounded-xl animate-star-jump"></div>
                        </div>
                      )
                    },
                    {
                      title: "Resistance Band Thrusters",
                      desc: "Leverage rising hormone efficiency to work out your entire upper and lower body.",
                      time: "20 mins",
                      cals: "160 kcal",
                      intensity: "Medium",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFE79A]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFE79A]/20 flex-shrink-0">
                          {/* Orbiting band action */}
                          <div className="absolute w-8 h-8 rounded-full border-2 border-[#FFE79A] border-dashed animate-orbit-rotate"></div>
                          <div className="absolute w-3 h-3 bg-[#FFE79A] rounded-full"></div>
                        </div>
                      )
                    }
                  ].map((ex, idx) => (
                    <ExerciseCard key={idx} ex={ex} />
                  ))}

                  {selectedExercisePhase === 'Ovulation' && [
                    {
                      title: "High Intensity Jumping Jacks",
                      desc: "Your energy and testosterone peak today! Perfect time for a high-intensity cardio blast.",
                      time: "15 mins",
                      cals: "180 kcal",
                      intensity: "High",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFB3D9]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFB3D9]/20 flex-shrink-0">
                          {/* High energy jump star scaling */}
                          <div className="absolute w-8 h-8 bg-[#FFB3D9] rounded-full animate-star-jump"></div>
                          <div className="absolute w-4 h-4 bg-[#FF8A80] rounded-full animate-lotus-pulse"></div>
                        </div>
                      )
                    },
                    {
                      title: "Dumbbell Bicep Curls",
                      desc: "Push your muscle strength limiters. Peak estrogen helps you load heavier weights securely.",
                      time: "20 mins",
                      cals: "150 kcal",
                      intensity: "High",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FF8A80]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FF8A80]/20 flex-shrink-0">
                          {/* Dumbbell lift curl rotation */}
                          <div className="absolute w-10 h-2 bg-[#FF8A80] rounded-full animate-orbit-rotate"></div>
                          <div className="absolute w-3 h-3 bg-[#FF8A80] rounded-full animate-squat-bar"></div>
                        </div>
                      )
                    },
                    {
                      title: "HIIT Sprint Intervals",
                      desc: "Unleash peak cardiovascular capability and metabolic speed with short, active sprint bursts.",
                      time: "15 mins",
                      cals: "210 kcal",
                      intensity: "Maximum",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFE79A]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFE79A]/20 flex-shrink-0">
                          {/* Double rapid star jumping dots */}
                          <div className="absolute w-4 h-4 bg-[#FFE79A] rounded-full animate-star-jump" style={{ animationDelay: '0s' }}></div>
                          <div className="absolute w-4 h-4 bg-[#FFE79A] rounded-full animate-star-jump" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                      )
                    }
                  ].map((ex, idx) => (
                    <ExerciseCard key={idx} ex={ex} />
                  ))}

                  {selectedExercisePhase === 'Luteal' && [
                    {
                      title: "Flowing Vinyasa Yoga",
                      desc: "Estrogen is falling. Calming yoga sequences soothe Luteal-phase fatigue and mood swings.",
                      time: "25 mins",
                      cals: "90 kcal",
                      intensity: "Medium",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFE79A]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFE79A]/20 flex-shrink-0">
                          {/* Slow lotus pulsing flower */}
                          <div className="absolute w-6 h-6 bg-[#FFE79A] rounded-full animate-lotus-pulse"></div>
                          <div className="absolute w-10 h-10 border border-[#FFE79A]/40 rounded-full animate-lotus-pulse" style={{ animationDelay: '1.5s' }}></div>
                        </div>
                      )
                    },
                    {
                      title: "Pilates Core Leg Circles",
                      desc: "Progesterone relaxes your joints, so focus on low-impact deep core muscle stability work.",
                      time: "15 mins",
                      cals: "80 kcal",
                      intensity: "Medium",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FF8A80]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FF8A80]/20 flex-shrink-0">
                          {/* Leg tracing circle path animation */}
                          <div className="absolute w-6 h-6 border-2 border-dashed border-[#FF8A80] rounded-full animate-orbit-rotate"></div>
                          <div className="absolute w-2.5 h-2.5 bg-[#FF8A80] rounded-full animate-squat-bar"></div>
                        </div>
                      )
                    },
                    {
                      title: "Steady Swimming / Cycling",
                      desc: "Low-impact endurance cardio that maintains cardiovascular fitness without joint fatigue.",
                      time: "30 mins",
                      cals: "220 kcal",
                      intensity: "Medium",
                      renderAnimation: () => (
                        <div className="relative w-16 h-16 bg-[#FFB3D9]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[#FFB3D9]/20 flex-shrink-0">
                          {/* Waves / wheel rotation */}
                          <div className="absolute w-8 h-8 border-4 border-double border-[#FFB3D9] rounded-full animate-orbit-rotate"></div>
                        </div>
                      )
                    }
                  ].map((ex, idx) => (
                    <ExerciseCard key={idx} ex={ex} />
                  ))}
                </div>
              </div>
            )}

            {/* --- PANEL 9: CLINIC ROOM (Symptom Checker, Face Acne, finder) --- */}
            {view === 'clinic' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("AI Clinic Room")}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🩺 {t("AI Symptom Checker")}</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#7E7A88]">
                      {['Headache', 'Fatigue', 'Irregular periods', 'Hair fall', 'Bloating'].map(symp => {
                        const active = selectedSymptoms.includes(symp);
                        return (
                          <div 
                            key={symp} 
                            onClick={() => setSelectedSymptoms(prev => active ? prev.filter(x => x !== symp) : [...prev, symp])}
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${
                              active ? 'bg-[#FF8A80]/10 border-[#FF8A80]' : 'bg-[#FFF6FB]'
                            }`}
                          >
                            <span>{t(symp)}</span>
                          </div>
                        );
                      })}
                    </div>

                    {selectedSymptoms.length > 0 && (
                      <div className="bg-[#FFF6FB] border border-[#FFB3D9]/20 rounded-2xl p-4 mt-4 animate-fade-in space-y-2">
                        <h4 className="font-bold text-xs text-[#FF8A80] uppercase tracking-wider">🌸 {t("Sakhi AI Symptom Insights")}</h4>
                        <p className="text-xs text-[#7E7A88] leading-relaxed">
                          {selectedSymptoms.includes('Irregular periods') && selectedSymptoms.includes('Bloating') 
                            ? t("Your combination of irregular cycles and bloating suggests hormonal fluctuations typical of Luteal phase shifts or mild PCOS. Focus on high-fiber foods, seed cycling, and reducing dairy/gluten. Warm chamomile tea helps soothe abdominal discomfort.")
                            : selectedSymptoms.includes('Fatigue') && selectedSymptoms.includes('Hair fall')
                            ? t("Fatigue paired with hair thinning often points towards iron or thyroid level drops (very common in menstruating women). Consider adding iron-rich greens, vitamin C (to aid absorption), and scheduling a thyroid (TSH) checkup.")
                            : selectedSymptoms.includes('Bloating') || selectedSymptoms.includes('Headache')
                            ? t("Pre-menstrual water retention is likely causing your bloating/headaches. Reducing sodium intake, keeping up hydration (2.5L/day), and doing light neck stretches can relieve tension.")
                            : t("Hormones play a vital role in how you feel daily. Try logging these symptoms in your Menstrual Tracker to see if they align with your estrogen or progesterone drop phases.")
                          }
                        </p>
                        <div className="flex gap-2 pt-1">
                          <span className="text-[10px] bg-[#FF8A80]/10 text-[#FF8A80] font-bold px-2 py-0.5 rounded-full border border-[#FF8A80]/20">💡 {t("Actionable wellness tip")}</span>
                          <span className="text-[10px] bg-[#FFF9EC] text-[#B88E2F] font-bold px-2 py-0.5 rounded-full border border-[#B88E2F]/20">⚠️ {t("Not a medical diagnosis")}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">
                      <Camera size={18} className="text-[#FFB3D9]" /> {t("Visual Skin & Acne Analyzer")}
                    </h3>
                    
                    {!skinScanning && !skinAnalysis && (
                      <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-2xl bg-[#FFF6FB] relative hover:bg-[#FFF2FA] transition-colors cursor-pointer text-center">
                        <input type="file" accept="image/*" onChange={handleSkinScan} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="text-4xl mb-2">📷</span>
                        <p className="text-xs font-bold text-[#FF8A80]">{t("Upload selfie snapshot")}</p>
                        <p className="text-[10px] text-[#A09BAA] mt-1">{t("Correlate skin hydration to cycles")}</p>
                      </div>
                    )}

                    {skinScanning && (
                      <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-2xl bg-[#FFF6FB] text-center space-y-3">
                        {skinImagePreview && (
                          <img src={skinImagePreview} alt="Selfie preview" className="w-28 h-28 object-cover rounded-2xl border shadow-sm animate-pulse" />
                        )}
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF8A80]"></div>
                        <p className="text-xs font-bold text-[#7E7A88]">{t("Scanning pores & hormonal links...")}</p>
                      </div>
                    )}

                    {skinAnalysis && (
                      <div className="space-y-3 animate-fade-in">
                        {skinImagePreview && (
                          <div className="flex justify-center">
                            <img src={skinImagePreview} alt="Analyzed Selfie" className="w-28 h-28 object-cover rounded-2xl border shadow-sm" />
                          </div>
                        )}
                        <div className="bg-[#FFF6FB] border border-[#FFB3D9]/20 rounded-2xl p-4 space-y-2.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#A09BAA] font-bold">{t("Breakouts / Acne:")}</span>
                            <span className="font-bold text-[#FF8A80] bg-[#FF8A80]/10 px-2 py-0.5 rounded-full border border-[#FF8A80]/20">{t(skinAnalysis.acne)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#A09BAA] font-bold">{t("Pigmentation:")}</span>
                            <span className="font-semibold text-[#7E7A88]">{t(skinAnalysis.pigmentation)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#A09BAA] font-bold">{t("Moisture Level:")}</span>
                            <span className="font-semibold text-[#7E7A88]">{t(skinAnalysis.hydration)}</span>
                          </div>
                          <div className="border-t pt-2 text-[11px] text-[#7E7A88] leading-relaxed">
                            <strong className="text-[#FF8A80] block mb-0.5">🧬 {t("Cycle Hormone Correlation:")}</strong>
                            {t(skinAnalysis.hormonalLink)}
                          </div>
                        </div>
                        <button 
                          onClick={() => { setSkinFile(null); setSkinAnalysis(null); setSkinImagePreview(null); }}
                          className="w-full bg-[#FFF6FB] border text-[#FF8A80] hover:bg-[#FF8A80]/10 text-xs font-bold py-2 rounded-xl transition-all"
                        >
                          🔄 {t("Analyze Another Selfie")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 10: COMMUNITY, CHALLENGES & NIGHT CARE --- */}
            {view === 'community' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Community Support")}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Discussion boards */}
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[420px]">
                    <div className="flex justify-between items-center border-b pb-2 mb-3">
                      <h3 className="font-bold text-base text-[#5E5A66]">💬 {t("Anonymous Discussion Forums")}</h3>
                      <div className="flex gap-1.5 bg-[#FFF6FB] p-1 rounded-xl border">
                        {['pcos', 'pregnancy', 'menopause'].map(topic => (
                          <button 
                            key={topic} 
                            onClick={() => setCommunityTab(topic)}
                            className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg transition-all ${
                              communityTab === topic ? 'bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white shadow-sm' : 'text-[#7E7A88]'
                            }`}
                          >
                            {t(topic)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow space-y-3 overflow-y-auto pr-1">
                      {communityMessages[communityTab]?.map((msg) => (
                        <div key={msg.id} className="bg-[#FFF6FB] border p-3 rounded-2xl text-xs space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-[#FF8A80]">
                            <span>{t(msg.user)}</span>
                            <span className="text-[#A09BAA] font-mono">{msg.date}</span>
                          </div>
                          <p className="text-[#7E7A88] leading-relaxed">{t(msg.message)}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendCommunityMessage} className="flex gap-2 border-t pt-3 mt-3">
                      <input 
                        type="text" 
                        value={newCommunityInput} 
                        onChange={(e) => setNewCommunityInput(e.target.value)} 
                        placeholder={t("Post an anonymous message...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                      <button type="submit" className="bg-[#FF8A80] text-white px-4 py-2 rounded-xl text-xs font-bold">{t("Send")}</button>
                    </form>
                  </div>

                  {/* Weekly challenges */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                        <span>🔬</span> {t("Weekly Challenges")}
                      </h3>
                      <p className="text-xs text-[#7E7A88] mb-3">{t("Complete healthy lifestyle challenges to accumulate health twin XP points.")}</p>
                      <div className="space-y-3 text-xs font-semibold text-[#7E7A88] max-h-48 overflow-y-auto pr-1">
                        {weeklyChallenges.map(chal => (
                          <div 
                            key={chal.id}
                            onClick={() => {
                              setWeeklyChallenges(prev => prev.map(c => c.id === chal.id ? { ...c, completed: !c.completed } : c));
                              setUserPoints(prev => chal.completed ? Math.max(0, prev - chal.points) : prev + chal.points);
                            }}
                            className="flex items-center justify-between bg-[#FFF9EC]/40 border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9] transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${chal.completed ? 'bg-[#B9F4D0] border-[#B9F4D0]' : 'border-[#FFB3D9]/60'}`}>
                                {chal.completed && <Check size={10} />}
                              </div>
                              <span className={chal.completed ? 'line-through text-[#A09BAA]' : 'text-[#5E5A66]'}>{t(chal.name)}</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#FF8A80] font-mono">+{chal.points} XP</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleAddCustomChallenge} className="flex gap-2 border-t pt-3 mt-3">
                      <input 
                        type="text" 
                        value={customChallengeInput} 
                        onChange={(e) => setCustomChallengeInput(e.target.value)} 
                        placeholder={t("Write your own custom challenge...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                        required
                      />
                      <button type="submit" className="bg-[#FF8A80] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:opacity-90">+</button>
                    </form>
                  </div>
                </div>

                {/* Night wind-down Habits */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5"><span>🌙</span> {t("Night wind-down Habits")}</h3>
                      <p className="text-xs text-[#7E7A88] mb-3">{t("Tick off warm habits before sleeping to log melatonin cycles.")}</p>
                      <div className="space-y-3 text-xs font-semibold text-[#7E7A88] max-h-48 overflow-y-auto pr-1">
                        {[
                          { key: 'dimScreens', label: 'Dim screens & blue light filters' },
                          { key: 'mindfulness', label: '10 mins mindfulness / box breathing' },
                          { key: 'herbalTea', label: 'Drink warm chamomile / herbal tea' },
                          { key: 'sleepLog', label: 'Log sleep hours & cycle symptoms' }
                        ].map(habit => (
                          <div 
                            key={habit.key}
                            onClick={() => setNightModeWindDown(prev => ({ ...prev, [habit.key]: !prev[habit.key] }))}
                            className="flex items-center gap-3 bg-[#FFF6FB] border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9] transition-all"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${nightModeWindDown[habit.key] ? 'bg-[#FF8A80] border-[#FF8A80]' : 'border-[#FFB3D9]/60'}`}>
                              {nightModeWindDown[habit.key] && <Check size={10} className="text-white" />}
                            </div>
                            <span>{t(habit.label)}</span>
                          </div>
                        ))}

                        {/* Render Custom Habits */}
                        {customHabits.map(habit => (
                          <div 
                            key={habit.key}
                            onClick={() => setCustomHabits(prev => prev.map(h => h.key === habit.key ? { ...h, completed: !h.completed } : h))}
                            className="flex items-center gap-3 bg-[#FFF6FB] border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9] transition-all"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${habit.completed ? 'bg-[#FF8A80] border-[#FF8A80]' : 'border-[#FFB3D9]/60'}`}>
                              {habit.completed && <Check size={10} className="text-white" />}
                            </div>
                            <span className={habit.completed ? 'line-through text-[#A09BAA]' : ''}>{habit.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleAddCustomHabit} className="flex gap-2 border-t pt-3 mt-3">
                      <input 
                        type="text" 
                        value={newHabitInput} 
                        onChange={(e) => setNewHabitInput(e.target.value)} 
                        placeholder={t("Add your own wind-down habit...")} 
                        className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                        required
                      />
                      <button type="submit" className="bg-[#FF8A80] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:opacity-90">+</button>
                    </form>
                  </div>

                  {/* Family sharing profile */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">
                      <Upload size={18} className="text-[#B9F4D0]" /> {t("Family Health Sharing Profile")}
                    </h3>
                    <p className="text-xs text-[#7E7A88]">{t("Generate a secure, read-only dashboard link to share your health, cycles, and emergency logs with trusted members:")}</p>
                    
                    <div className="space-y-3 text-xs font-bold text-[#7E7A88]">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">{t("Contact Name")}</label>
                          <input 
                            type="text" 
                            value={familyContact.name} 
                            onChange={(e) => setFamilyContact({...familyContact, name: e.target.value})}
                            className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                            placeholder="e.g. Mother / Husband"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">{t("Contact Phone")}</label>
                          <input 
                            type="text" 
                            value={familyContact.phone} 
                            onChange={(e) => setFamilyContact({...familyContact, phone: e.target.value})}
                            className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                            placeholder="+91..."
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 pt-2 border-t text-[11px] font-semibold text-[#7E7A88]">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={familyContact.shareReports} 
                            onChange={(e) => setFamilyContact({...familyContact, shareReports: e.target.checked})}
                            className="rounded text-[#FF8A80]"
                          />
                          {t("Auto-sync health records & medical history")}
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={familyContact.shareSOS} 
                            onChange={(e) => setFamilyContact({...familyContact, shareSOS: e.target.checked})}
                            className="rounded text-[#FF8A80]"
                          />
                          {t("Enable SOS emergency auto-alerts & location sharing")}
                        </label>
                      </div>

                      <div className="pt-2 border-t space-y-3">
                        <button 
                          onClick={handleGenerateShareLink}
                          className="w-full bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm hover:opacity-90 flex items-center justify-center gap-2"
                        >
                          🔗 {familyShareLink ? t("Access Link Copied!") : t("Generate Secure Share Link")}
                        </button>
                        
                        {familyShareLink && (
                          <div className="bg-[#FFF9EC] border border-[#FFD59A]/30 p-3 rounded-2xl text-[10px] text-[#A09BAA] break-all leading-relaxed font-mono">
                            <strong>{t("Link")}:</strong> {familyShareLink}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* --- PANEL 11: HEALTH WRAPPED (Spotify Wrapped, AI Routing Maps) --- */}
            {view === 'wrapped' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Health Wrapped")}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[360px]">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-base text-[#5E5A66]">📊 {t("Spotify Wrapped for Health")}</h3>
                      <span className="text-[10px] bg-[#FF8A80] text-white px-2 py-0.5 rounded-full font-bold font-mono">{t("Slide")} {currentWrappedSlide + 1} {t("of")} 4</span>
                    </div>

                    <div className={`flex-grow my-4 rounded-2xl bg-gradient-to-tr ${wrappedSlides[currentWrappedSlide].color} p-6 flex flex-col justify-between text-[#5E5A66] shadow-sm relative overflow-hidden transition-all duration-500`}>
                      <span className="font-bold text-sm uppercase block tracking-wider opacity-85">{t(wrappedSlides[currentWrappedSlide].title)}</span>
                      <div className="my-2">
                        <span className="text-3xl font-extrabold block drop-shadow-sm font-sans">{t(wrappedSlides[currentWrappedSlide].stat)}</span>
                        <p className="text-xs mt-2 leading-relaxed opacity-95">{t(wrappedSlides[currentWrappedSlide].desc)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button onClick={() => setCurrentWrappedSlide(prev => Math.max(0, prev - 1))} className="bg-white border text-xs font-bold px-3 py-1.5 rounded-xl">{t("Previous")}</button>
                      <button onClick={() => setCurrentWrappedSlide(prev => Math.min(wrappedSlides.length - 1, prev + 1))} className="bg-[#FF8A80] text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-sm">{t("Next Slide")}</button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1">
                      <MapPin size={18} className="text-[#FF8A80]" /> {t("Google Maps + Health AI Router")}
                    </h3>
                    <div className="space-y-4 py-2">
                      {[
                        { step: "1. Current Assessment Node", label: "PCOS Cramps & Deficient Iron spotted in labs scan.", icon: "🩺", col: "border-[#FF8A80] bg-[#FF8A80]/15" },
                        { step: "2. Active Action Node", label: "Log 15 mins daily morning Sunlight + Eat Spinach stew.", icon: "🥦", col: "border-[#FFB68A] bg-[#FFF9EC]" },
                        { step: "3. Compliance Checkpoint", label: "Iron medicine supplementation scheduled at 8:00 PM.", icon: "💊", col: "border-[#CDECCF] bg-[#F7FCF6]" },
                        { step: "4. Target Destination", label: "Repeat Blood check in 30 Days. Normal values predicted.", icon: "🏅", col: "border-[#C9B6FF] bg-[#FFF6FB]" }
                      ].map((node, i) => (
                        <div key={i} className={`flex items-center gap-3 border-l-4 p-3 rounded-r-xl ${node.col}`}>
                          <span className="text-2xl">{node.icon}</span>
                          <div className="text-xs">
                            <span className="font-bold text-[#5E5A66] block">{t(node.step)}</span>
                            <span className="text-[#7E7A88]">{t(node.label)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 12: SETTINGS & LOCAL SPACE --- */}
            {view === 'settings' && profile && (
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Settings")}</h2>
                </div>

                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2 font-sans">🧬 {t("Personal Profile Health Twin Editor")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-[#7E7A88]">
                    <div>
                      <label className="block mb-1.5 uppercase">{t("Full Name")}</label>
                      <input type="text" value={profile.name || ''} onChange={(e) => handleUpdateProfile('name', e.target.value)} className="w-full bg-[#FFF8F6] border px-4 py-2.5 rounded-xl text-sm focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
