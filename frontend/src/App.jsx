import React, { useState, useEffect } from 'react';
import { 
  Flower, Activity, Droplet, Heart, Upload, Settings, User, 
  Calendar, MessageSquare, Plus, Check, ChevronDown, Sparkles, 
  Clock, ClipboardList, Bell, ArrowRight, Search, Menu, X, 
  FileText, Moon, Footprints, Apple, AlertTriangle, ShieldAlert,
  ChevronRight, RefreshCw, Send, Award, Volume2, Globe, ZoomIn, CheckSquare, Download, Camera, MapPin
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
}

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
    "Doctor Audio visit Recorder": "डॉक्टर ऑडियो परामर्श रिकॉर्डर",
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
    "Cycle Calendar & Logs": "चक्र कैलेंडर और लॉग",
    "Day 12 Follicular Phase": "दिन १२ फॉलिकुलर चरण",
    "Predicted Period: 4 Days left": "पूर्वानुमानित अवधि: ४ दिन बचे हैं",
    "Packed in Handbag!": "हैंडबैग में पैक किया गया!",
    "Not Packed yet": "अभी पैक नहीं किया गया",
    "Demo Hackathon Quick Access (Log in as Aditi)": "हैकथॉन त्वरित पहुँच (अदिति के रूप में लॉग इन करें)"
  },
  bn: {
    "Sakhi": "সখী",
    "Your Everyday AI Health Companion": "আপনার দৈনন্দিন এআই স্বাস্থ্য সঙ্গী",
    "One Intelligent Companion for Every Woman.": "প্রতিটি নারীর জন্য একটি বুদ্ধিমান সঙ্গী।",
    "One Intelligent Companion for": "প্রতিটি নারীর জন্য",
    "Every Woman.": "একটি বুদ্ধিমান সঙ্গী।",
    "Good Morning, Aditi!": "সুপ্রভাত, অদিতি!",
    "Health Twin Active": "হেলথ টুইন সক্রিয়",
    "Today's Wellness Score": "আজকের স্বাস্থ্য স্কোর",
    "Calculated": "হিসাবকৃত",
    "Daily AI Welcome Summary": "দৈনিক এআই স্বাগত সারসংক্ষেপ",
    "Water Intake": "জল গ্রহণ",
    "Sleep Quality": "ঘুমের গুণমান",
    "Exercise": "ব্যায়াম",
    "Cycle Tracker": "মাসিক চক্র ট্র্যাকার",
    "Weekly Recommendations": "সাপ্তাহিক সুপারিশ",
    "Log Your Vibe": "আপনার অনুভূতি নথিভুক্ত করুন",
    "Today's Medicine Checklist": "আজকের ওষুধের তালিকা",
    "Smart Reminders": "smart অনুস্মারক",
    "Upcoming Appointments": "আসন্ন অ্যাপয়েন্টমেন্ট",
    "Explore Stages": "ধাপগুলি অন্বেষণ করুন",
    "Start Your Journey": "আপনার যাত্রা শুরু করুন",
    "Dashboard": "ড্যাশবোর্ড",
    "Health Insights": "স্বাস্থ্য অন্তর্দৃষ্টি",
    "Health Wrapped": "স্বাস্থ্য র‍্যাপড",
    "Wellness Coach": "ওয়েলনেস কোচ",
    "AI Clinic Room": "এআই ক্লিনিক রুম",
    "Sakhi AI Chat": "সখী এআই চ্যাট",
    "Menstrual Tracker": "মাসিক চক্র",
    "Meal & Grocery": "খাবার ও মুদি",
    "Report Analyzer": "রিপোর্ট বিশ্লেষক",
    "Health Passport": "হেলথ পাসপোর্ট",
    "Community Support": "কমিউনিটি সহায়তা",
    "Settings": "সেটিংস",
    "Log Out": "লগ আউট",
    "Doctor Audio visit Recorder": "ডাক্তার অডিও ভিজিট রেকর্ডার",
    "Anonymous Discussion Forums": "বেনামী আলোচনা ফোরাম",
    "Nearby Healthcare Finder": "নিকটস্থ স্বাস্থ্যসেবা সন্ধানকারী",
    "Weekly Challenges": "সাপ্তাহিক চ্যালেঞ্জ",
    "Family Health Sharing Profile": "পারিবারিক স্বাস্থ্য ভাগ করার প্রোফাইল",
    "Spotify Wrapped for Health": "স্বাস্থ্যের জন্য র্যাপড",
    "Google Maps + Health AI Router": "গুগল ম্যাপস + হেলথ এআই রাউটার",
    "Zomato + Nutrition Recommendation": "জোম্যাটো + পুষ্টি সুপারিশ",
    "PCOS Screening Tool": "PCOS স্ক্রীনিং টুল",
    "Daily Brain Fog Tracker": "দৈনিক ব্রেন ফগ ট্র্যাকার",
    "Carry Pads Handbag Reminder": "প্যাড হ্যান্ডব্যাগ অনুস্মারক",
    "Menstrual Product Tracker": "মাসিক পণ্য ট্র্যাকার",
    "First Period Puberty Guide": "প্রথম মাসিক ও বয়ঃসন্ধি নির্দেশিকা",
    "Weekly Meal Planner": "সাপ্তাহিক খাবার পরিকল্পনাকারী",
    "Healthy Grocery Planner": "স্বাস্থ্যকর মুদি পরিকল্পনাকারী",
    "Chronological Timeline": "কালানুক্রমিক সময়রেখা",
    "Vaccination Records": "টিকা রেকর্ড",
    "Prescription History": "প্রেসক্রিপশন ইতিহাস",
    "Consultation Audio Transcripts": "পরামর্শ অডিও প্রতিলিপি",
    "Digital Medical Card": "ডিজিটাল মেডিকেল কার্ড",
    "Night wind-down Habits": "রাতের বিশ্রামের অভ্যাস",
    "Tick off warm habits before sleeping to log melatonin cycles.": "ঘুমের আগে স্বাস্থ্যকর অভ্যাসগুলি চিহ্নিত করুন।",
    "Dim screens & blue light filters": "স্ক্রিন ম্লান করুন এবং ব্লু লাইট ফিল্টার লাগান",
    "10 mins mindfulness / box breathing": "১০ মিনিট মাইন্ডফুলনেস / বক্স ব্রিদিং",
    "Drink warm chamomile / herbal tea": "ঈষদুষ্ণ ক্যামোমাইল / ভেষজ চা পান করুন",
    "Log sleep hours & cycle symptoms": "ঘুমের সময় এবং চক্রের লক্ষণগুলি নথিভুক্ত করুন",
    "Check off when you have packed pads in your school/work handbag.": "স্কুল/কাজের ব্যাগে প্যাড প্যাক করার সময় চিহ্নিত করুন।",
    "Enter Pin Code...": "পিন কোড লিখুন...",
    "Select symptoms you are experiencing to analyze wellness insights.": "লক্ষণগুলি চয়ন করুন স্বাস্থ্য অন্তর্দৃষ্টি বিশ্লেষণের জন্য।",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "আপনার পরামর্শ থেকে অডিও নোট রেকর্ড করুন। জেমিনি এআই স্বয়ংক্রিয়ভাবে প্রতিলিপি করবে...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "এআই আপনাকে ঘাটতি থেকে স্বাস্থ্যকর বেসলাইনে ফিরিয়ে নিতে পথনির্দেশ তৈরি করে।",
    "First Period Guide": "প্রথম মাসিক গাইড",
    "Cycle Calendar & Logs": "মাসিক চক্র ক্যালেন্ডার ও লগ",
    "Day 12 Follicular Phase": "১২ তম দিন ফলিকুলার পর্যায়",
    "Predicted Period: 4 Days left": "সম্ভাব্য মাসিক: ৪ দিন বাকি",
    "Packed in Handbag!": "হ্যান্ডব্যাগে প্যাক করা হয়েছে!",
    "Not Packed yet": "এখনো প্যাক করা হয়নি",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ডেমো হ্যাকাথন কুইক অ্যাক্সেস (অদিতি হিসেবে লগইন করুন)"
  },
  te: {
    "Sakhi": "సఖి",
    "Your Everyday AI Health Companion": "మీ రోజువారీ AI ఆరోగ్య సహచరి",
    "One Intelligent Companion for Every Woman.": "ప్రతి మహిళకు ఒక తెలివైన సహచరి।",
    "One Intelligent Companion for": "ప్రతి మహిళకు",
    "Every Woman.": "ఒక తెలివైన సహచరి।",
    "Good Morning, Aditi!": "శుభోదయం, అదితి!",
    "Health Twin Active": "హెల్త్ ట్విన్ యాక్టివ్‌గా ఉంది",
    "Today's Wellness Score": "ఈరోజు ఆరోగ్యం స్కోర్",
    "Calculated": "లెక్కించబడింది",
    "Daily AI Welcome Summary": "రోజువారీ AI స్వాగత సారాంశం",
    "Water Intake": "నీటి వినియోగం",
    "Sleep Quality": "నిద్ర నాణ్యత",
    "Exercise": "వ్యాయామం",
    "Cycle Tracker": "నెలసరి చక్ర ట్రాకర్",
    "Weekly Recommendations": "వారపు సిఫార్సులు",
    "Log Your Vibe": "మీ మానసిక స్థితిని నమోదు చేయండి",
    "Today's Medicine Checklist": "ఈరోజు మందుల జాబితా",
    "Smart Reminders": "స్మార్ట్ రిమైండర్లు",
    "Upcoming Appointments": "రాబోయే అపాయింట్‌మెంట్‌లు",
    "Explore Stages": "దశలను అన్వేషించండి",
    "Start Your Journey": "మీ ప్రయాణాన్ని ప్రారంభించండి",
    "Dashboard": "డాష్‌బోర్డ్",
    "Health Insights": "ఆరోగ్య అంతర్దృష్టులు",
    "Health Wrapped": "ఆరోగ్య ర్యాప్డ్",
    "Wellness Coach": "వెల్నెస్ కోచ్",
    "AI Clinic Room": "AI క్లినిక్ గది",
    "Sakhi AI Chat": "సఖి AI చాట్",
    "Menstrual Tracker": "నెలసరి ట్రాకర్",
    "Meal & Grocery": "భోజనం & కిరాణా",
    "Report Analyzer": "రిపోర్ట్ అనలైజర్",
    "Health Passport": "హెల్త్ పాస్‌పోర్ట్",
    "Community Support": "కమ్యూనిటీ మద్దతు",
    "Settings": "సెట్టింగ్‌లు",
    "Log Out": "లాగ్ అవుట్",
    "Doctor Audio visit Recorder": "డాక్టర్ ఆడియో విజిట్ రికార్డర్",
    "Anonymous Discussion Forums": "అనామక చర్చా వేదికలు",
    "Nearby Healthcare Finder": "సమీప ఆరోగ్య కేంద్రాల గుర్తింపు",
    "Weekly Challenges": "వారపు సవాళ్లు",
    "Family Health Sharing Profile": "కుటుంబ ఆరోగ్య భాగస్వామ్య ప్రొఫైల్",
    "Spotify Wrapped for Health": "ఆరోగ్యం కొరకు ర్యాప్డ్",
    "Google Maps + Health AI Router": "గూగుల్ మ్యాప్స్ + హెల్త్ AI రూటర్",
    "Zomato + Nutrition Recommendation": "జొమాటో + పోషకాహార సిఫార్సు",
    "PCOS Screening Tool": "PCOS స్క్రీనింగ్ సాధనం",
    "Daily Brain Fog Tracker": "రోజువారీ బ్రెయిన్ ఫాగ్ ట్రాకర్",
    "Carry Pads Handbag Reminder": "ప్యాడ్ల హ్యాండ్‌బ్యాగ్ రిమైండర్",
    "Menstrual Product Tracker": "నెలసరి ఉత్పత్తుల ట్రాకర్",
    "First Period Puberty Guide": "మొదటి నెలసరి & యుక్తవయస్సు గైడ్",
    "Weekly Meal Planner": "వారపు భోజన ప్రణాళిక",
    "Healthy Grocery Planner": "ఆరోగ్యకరమైన కిరాణా ప్రణాళిక",
    "Chronological Timeline": "కాలక్రమానుసార టైమ్‌లైన్",
    "Vaccination Records": "టీకాల రికార్డులు",
    "Prescription History": "ప్రిస్క్రిప్షన్ల చరిత్ర",
    "Consultation Audio Transcripts": "కన్సల్టేషన్ ఆడియో ట్రాన్స్క్రిప్ట్",
    "Digital Medical Card": "డిజిటల్ మెడికల్ కార్డ్",
    "Night wind-down Habits": "రాత్రి నిద్ర అలవాట్లు",
    "Tick off warm habits before sleeping to log melatonin cycles.": "నిద్రపోయే ముందు మంచి అలవాట్లను గుర్తించండి.",
    "Dim screens & blue light filters": "స్క్రీన్ వెలుతురు తగ్గించి బ్లూ లైట్ ఫిల్టర్ ఆన్ చేయండి",
    "10 mins mindfulness / box breathing": "10 నిమిషాల మైండ్‌ఫుల్‌నెస్ / బాక్స్ బ్రీతింగ్",
    "Drink warm chamomile / herbal tea": "గోరువెచ్చని చామంతి / మూలికా టీ తాగండి",
    "Log sleep hours & cycle symptoms": "నిద్ర గంటలు మరియు నెలసరి లక్షణాలను నమోదు చేయండి",
    "Check off when you have packed pads in your school/work handbag.": "స్కూల్/ఆఫీస్ బ్యాగులో ప్యాడ్లు సర్దినప్పుడు టిక్ చేయండి.",
    "Enter Pin Code...": "పిన్ కోడ్ ఎంటర్ చేయండి...",
    "Select symptoms you are experiencing to analyze wellness insights.": "మీకు ఉన్న లక్షణాలను ఎంచుకోండి.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "మీ క్లినికల్ సంప్రదింపుల ఆడియో నోట్లను రికార్డ్ చేయండి. జెమిని AI సారాంశం ఇస్తుంది...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "ఆరోగ్యకరమైన స్థితికి చేరుకోవడానికి AI దశల వారీ ప్రణాళికను అందిస్తుంది.",
    "First Period Guide": "మొదటి నెలసరి గైడ్",
    "Cycle Calendar & Logs": "నెలసరి క్యాలెండర్ & లాగ్స్",
    "Day 12 Follicular Phase": "12 వ రోజు ఫోలిక్యులర్ దశ",
    "Predicted Period: 4 Days left": "నెలసరి అంచనా: ఇంకా 4 రోజులు ఉంది",
    "Packed in Handbag!": "హ్యాండ్‌బ్యాగ్‌లో సర్దబడింది!",
    "Not Packed yet": "ఇంకా సర్దలేదు",
    "Demo Hackathon Quick Access (Log in as Aditi)": "డెమో హ్యాకథాన్ త్వరిత ప్రాప్యత (అదితిగా లాగిన్ అవ్వండి)"
  },
  mr: {
    "Sakhi": "सखी",
    "Your Everyday AI Health Companion": "तुमची दैनंदिन एआय आरोग्य सोबती",
    "One Intelligent Companion for Every Woman.": "प्रत्येक महिलेसाठी एक बुद्धिमान सोबती।",
    "One Intelligent Companion for": "प्रत्येक महिलेसाठी",
    "Every Woman.": "एक बुद्धिमान सोबती।",
    "Good Morning, Aditi!": "शुभ प्रभात, अदिती!",
    "Health Twin Active": "हेल्थ ट्विन सक्रिय आहे",
    "Today's Wellness Score": "आजचा आरोग्य स्कोअर",
    "Calculated": "मोजलेले",
    "Daily AI Welcome Summary": "दैनिक एआय स्वागत सारांश",
    "Water Intake": "पाणी पिण्याची नोंद",
    "Sleep Quality": "झोपेची गुणवत्ता",
    "Exercise": "व्यायाम",
    "Cycle Tracker": "मासिक पाळी ट्रॅकर",
    "Weekly Recommendations": "साप्ताहिक शिफारसी",
    "Log Your Vibe": "तुमची मनस्थिती नोंदवा",
    "Today's Medicine Checklist": "आजच्या औषधांची यादी",
    "Smart Reminders": "स्मार्ट स्मरणपत्रे",
    "Upcoming Appointments": "पुढील अपॉइंटमेंट्स",
    "Explore Stages": "टप्पे एक्सप्लोर करा",
    "Start Your Journey": "तुमचा प्रवास सुरू करा",
    "Dashboard": "डॅशबोर्ड",
    "Health Insights": "आरोग्य अंतर्दृष्टी",
    "Health Wrapped": "आरोग्य रॅप्ड",
    "Wellness Coach": "वेलनेस कोच",
    "AI Clinic Room": "एआय क्लिनिक रूम",
    "Sakhi AI Chat": "सखी एआय चॅट",
    "Menstrual Tracker": "मासिक पाळी",
    "Meal & Grocery": "जेवण आणि किराणा",
    "Report Analyzer": "रिपोर्ट विश्लेषक",
    "Health Passport": "हेल्थ पासपोर्ट",
    "Community Support": "सामुदायिक समर्थन",
    "Settings": "सेटिंग्ज",
    "Log Out": "लॉग आउट",
    "Doctor Audio visit Recorder": "डॉक्टर ऑडिओ भेट रेकॉर्डर",
    "Anonymous Discussion Forums": "अनामित चर्चा मंच",
    "Nearby Healthcare Finder": "जवळचे आरोग्य केंद्र शोधक",
    "Weekly Challenges": "साप्ताहिक आव्हाने",
    "Family Health Sharing Profile": "कौटुंबिक आरोग्य सामायिकरण प्रोफाइल",
    "Spotify Wrapped for Health": "आरोग्यासाठी रॅप्ड",
    "Google Maps + Health AI Router": "गूगल मॅप्स + हेल्थ एआय राउटर",
    "Zomato + Nutrition Recommendation": "झोमॅटो + पोषण शिफारस",
    "PCOS Screening Tool": "PCOS स्क्रीनिंग टूल",
    "Daily Brain Fog Tracker": "दैनिक ब्रेन फॉग ट्रॅकर",
    "Carry Pads Handbag Reminder": "पॅड्स हँडबॅग स्मरणपत्र",
    "Menstrual Product Tracker": "मासिक पाळी उत्पादन ट्रॅकर",
    "First Period Puberty Guide": "पहिली मासिक पाळी आणि यौवन मार्गदर्शिका",
    "Weekly Meal Planner": "साप्ताहिक जेवण नियोजनकार",
    "Healthy Grocery Planner": "आरोग्यदायी किराणा माल नियोजनकार",
    "Chronological Timeline": "कालानुक्रमिक टाइमलाइन",
    "Vaccination Records": "लसीकरण रेकॉर्ड",
    "Prescription History": "औषधोपचार इतिहास",
    "Consultation Audio Transcripts": "परामर्श ऑडिओ ट्रान्सक्रिप्ट",
    "Digital Medical Card": "डिजिटल वैद्यकीय कार्ड",
    "Night wind-down Habits": "रात्रीचे विश्रांतीचे नियम",
    "Tick off warm habits before sleeping to log melatonin cycles.": "झोपण्यापूर्वी निरोगी सवयींची नोंद करा.",
    "Dim screens & blue light filters": "स्क्रीन मंद करा आणि ब्लू लाईट फिल्टर वापरा",
    "10 mins mindfulness / box breathing": "१० मिनिटे माइंडफुलनेस / बॉक्स ब्रीदिंग",
    "Drink warm chamomile / herbal tea": "कोमट कॅमोमाइल / हर्बल चहा प्या",
    "Log sleep hours & cycle symptoms": "झोपेचे तास आणि चक्राचे लक्षणे नोंदवा",
    "Check off when you have packed pads in your school/work handbag.": "शाळेच्या/कामाच्या बॅगेत पॅड्स भरल्यावर खूण करा.",
    "Enter Pin Code...": "पिन कोड प्रविष्ट करा...",
    "Select symptoms you are experiencing to analyze wellness insights.": "तुमची लक्षणे निवडा.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "तुमच्या वैद्यकीय सल्ल्याची ऑडिओ नोंद करा. जेमिनी एआय सारांश करेल...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "एआय तुम्हाला कमतरतेतून निरोगी आरोग्याकडे नेण्यासाठी रोडमॅप तयार करतो.",
    "First Period Guide": "पहिली मासिक पाळी मार्गदर्शिका",
    "Cycle Calendar & Logs": "चक्र कॅलेंडर आणि लॉग",
    "Day 12 Follicular Phase": "दिवस १२ फॉलिक्युलर टप्पा",
    "Predicted Period: 4 Days left": "मासिक पाळीचा अंदाज: ४ दिवस उरले",
    "Packed in Handbag!": "हँडबॅगमध्ये पॅक केले!",
    "Not Packed yet": "अजून पॅक केले नाही",
    "Demo Hackathon Quick Access (Log in as Aditi)": "डेमो हॅकाथॉन क्विक ॲक्सेस (अदिती म्हणून लॉग इन करा)"
  },
  ta: {
    "Sakhi": "சகி",
    "Your Everyday AI Health Companion": "உங்கள் அன்றாட AI சுகாதார துணை",
    "One Intelligent Companion for Every Woman.": "ஒவ்வொரு பெண்ணுக்கும் ஒரு புத்திசாலித்தனமான துணை।",
    "One Intelligent Companion for": "ஒவ்வொரு பெண்ணுக்கும்",
    "Every Woman.": "ஒரு புத்திசாலித்தனமான துணை।",
    "Good Morning, Aditi!": "காலை வணக்கம், அதிதி!",
    "Health Twin Active": "ஹெல்த் ட்வின் செயலில் உள்ளது",
    "Today's Wellness Score": "இன்றைய ஆரோக்கிய மதிப்பெண்",
    "Calculated": "கணக்கிடப்பட்டது",
    "Daily AI Welcome Summary": "தினசரி AI வரவேற்பு சுருக்கம்",
    "Water Intake": "நீர் உட்கொள்ளல்",
    "Sleep Quality": "தூக்கத்தின் தரம்",
    "Exercise": "உடற்பயிற்சி",
    "Cycle Tracker": "மாதவிடாய் சுழற்சி டிராக்கர்",
    "Weekly Recommendations": "வாராந்திர பரிந்துரைகள்",
    "Log Your Vibe": "உங்கள் மனநிலையை பதிவு செய்யவும்",
    "Today's Medicine Checklist": "இன்றைய மருந்து பட்டியல்",
    "Smart Reminders": "ஸ்மார்ட் நினைவூட்டல்கள்",
    "Upcoming Appointments": "வரவிருக்கும் சந்திப்புகள்",
    "Explore Stages": "நிலைகளை ஆராயுங்கள்",
    "Start Your Journey": "உங்கள் பயணத்தைத் தொடங்குங்கள்",
    "Dashboard": "டாஷ்போர்டு",
    "Health Insights": "ஆரோக்கிய நுண்ணறிவு",
    "Health Wrapped": "ஆரோக்கிய ரேப்டு",
    "Wellness Coach": "வெல்னஸ் கோச்",
    "AI Clinic Room": "AI கிளினிக் அறை",
    "Sakhi AI Chat": "சகி AI அரட்டை",
    "Menstrual Tracker": "மாதவிடாய் டிராக்கர்",
    "Meal & Grocery": "உணவு & மளிகை",
    "Report Analyzer": "அறிக்கை பகுப்பாய்வி",
    "Health Passport": "ஹெல்த் பாஸ்போர்ட்",
    "Community Support": "சமூக ஆதரவு",
    "Settings": "அமைப்புகள்",
    "Log Out": "வெளியேறு",
    "Doctor Audio visit Recorder": "மருத்துவர் ஆடியோ பதிவி கருவி",
    "Anonymous Discussion Forums": "அநாமதேய விவாத மன்றங்கள்",
    "Nearby Healthcare Finder": "அருகிலுள்ள மருத்துவ உதவி தேடல்",
    "Weekly Challenges": "வாராந்திர சவால்கள்",
    "Family Health Sharing Profile": "குடும்ப சுகாதார பகிர்வு சுயவிவரம்",
    "Spotify Wrapped for Health": "சுகாதாரத்திற்கான ரேப்டு",
    "Google Maps + Health AI Router": "கூகுள் மேப்ஸ் + ஹெல்த் AI ரூட்டர்",
    "Zomato + Nutrition Recommendation": "சொமாட்டோ + ஊட்டச்சத்து பரிந்துரை",
    "PCOS Screening Tool": "PCOS பரிசோதனை கருவி",
    "Daily Brain Fog Tracker": "தினசரி மூளை சோர்வு கண்காணிப்பு",
    "Carry Pads Handbag Reminder": "பேடு கைப்பைகள் நினைவூட்டல்",
    "Menstrual Product Tracker": "மாதவிடாய் தயாரிப்பு கண்காணிப்பு",
    "First Period Puberty Guide": "முதல் மாதவிடாய் மற்றும் பூப்படைதல் வழிகாட்டி",
    "Weekly Meal Planner": "வாராந்திர உணவு திட்டமிடுபவர்",
    "Healthy Grocery Planner": "ஆரோக்கியமான மளிகை திட்டமிடுபவர்",
    "Chronological Timeline": "காலவரிசைப்படி டைம்லைன்",
    "Vaccination Records": "தடுப்பூசி பதிவுகள்",
    "Prescription History": "மருந்து பரிந்துரை வரலாறு",
    "Consultation Audio Transcripts": "ஆலோசனையின் ஆடியோ டிரான்ஸ்கிரிப்ட்",
    "Digital Medical Card": "டிஜிட்டல் மருத்துவ அட்டை",
    "Night wind-down Habits": "இரவு ஓய்வு பழக்கங்கள்",
    "Tick off warm habits before sleeping to log melatonin cycles.": "தூங்குவதற்கு முன் ஆரோக்கியமான பழக்கங்களை குறிக்கவும்.",
    "Dim screens & blue light filters": "திரை வெளிச்சத்தை குறைத்து ப்ளூ லைட் ஃபில்டர் ஆன் செய்யவும்",
    "10 mins mindfulness / box breathing": "10 நிமிடம் மன அமைதி / மூச்சுப் பயிற்சி",
    "Drink warm chamomile / herbal tea": "மிதமான காமோமில் / மூலிகை டீ குடிக்கவும்",
    "Log sleep hours & cycle symptoms": "தூக்க நேரம் மற்றும் மாதவிடாய் அறிகுறிகளை பதிவு செய்யவும்",
    "Check off when you have packed pads in your school/work handbag.": "பள்ளி/அலுவலக பையில் பேடுகளை வைக்கும் போது டிக் செய்யவும்.",
    "Enter Pin Code...": "பின் கோடை உள்ளிடவும்...",
    "Select symptoms you are experiencing to analyze wellness insights.": "உங்கள் அறிகுறிகளை தேர்வு செய்யவும்.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "மருத்துவ ஆலோசனையின் ஆடியோ குறிப்புகளை பதிவு செய்யவும். ஜெமினி AI சுருக்கம் தரும்...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "உகந்த ஆரோக்கியத்தை பெற AI உங்களுக்கு படிப்படியான வழிகாட்டுதலை வழங்கும்.",
    "First Period Guide": "முதல் மாதவிடாய் வழிகாட்டி",
    "Cycle Calendar & Logs": "மாதவிடாய் காலண்டர் & பதிவுகள்",
    "Day 12 Follicular Phase": "12 வது நாள் ஃபோலிகுலர் நிலை",
    "Predicted Period: 4 Days left": "மாதவிடாய் கணிப்பு: இன்னும் 4 நாட்கள் உள்ளன",
    "Packed in Handbag!": "கைப்பையில் வைக்கப்பட்டது!",
    "Not Packed yet": "இன்னும் வைக்கப்படவில்லை",
    "Demo Hackathon Quick Access (Log in as Aditi)": "டெமோ ஹேக்கத்தான் விரைவு அணுகல் (அதிதியாக உள்நுழையவும்)"
  },
  gu: {
    "Sakhi": "સખી",
    "Your Everyday AI Health Companion": "તમારી દૈનિક AI આરોગ્ય સાથી",
    "One Intelligent Companion for Every Woman.": "દરેક મહિલા માટે એક બુદ્ધિશાળી સાથી।",
    "One Intelligent Companion for": "દરેક મહિલા માટે",
    "Every Woman.": "એક બુદ્ધિશાળી સાથી।",
    "Good Morning, Aditi!": "શુભ સવાર, અદિતિ!",
    "Health Twin Active": "હેલ્થ ટ્વીન સક્રિય છે",
    "Today's Wellness Score": "આજનો વેલનેસ સ્કોર",
    "Calculated": "ગણતરી કરેલ",
    "Daily AI Welcome Summary": "દૈનિક AI સ્વાગત સારાંશ",
    "Water Intake": "પાણી પીવાની નોંધ",
    "Sleep Quality": "ઊંઘની ગુણવત્તા",
    "Exercise": "વ્યાયામ",
    "Cycle Tracker": "માસિક ચક્ર ટ્રેકર",
    "Weekly Recommendations": "સાપ્તાહિક ભલામણો",
    "Log Your Vibe": "તમારી સ્થિતિની નોંધ કરો",
    "Today's Medicine Checklist": "આજની દવાઓની સૂચિ",
    "Smart Reminders": "સ્માર્ટ રીમાઇન્ડર્સ",
    "Upcoming Appointments": "આગામી એપોઇન્ટમેન્ટ્સ",
    "Explore Stages": "તબક્કાઓ અન્વેષણ કરો",
    "Start Your Journey": "તમારી યાત્રા શરૂ કરો",
    "Dashboard": "ડેશબોર્ડ",
    "Health Insights": "આરોગ્ય આંતરદૃષ્ટિ",
    "Health Wrapped": "આરોગ્ય રેપ્ડ",
    "Wellness Coach": "વેલનેસ કોચ",
    "AI Clinic Room": "AI ક્લિનિક રૂમ",
    "Sakhi AI Chat": "સખી AI ચેટ",
    "Menstrual Tracker": "માસિક ચક્ર",
    "Meal & Grocery": "ભોજન અને કરિયાણું",
    "Report Analyzer": "રિપોર્ટ વિશ્લેષક",
    "Health Passport": "હેલ્થ પાસપોર્ટ",
    "Community Support": "સમુદાય સપોર્ટ",
    "Settings": "સેટિંગ્સ",
    "Log Out": "લોગ આઉટ",
    "Doctor Audio visit Recorder": "ડોક્ટર ઓડિયો વિઝિટ રેકોર્ડર",
    "Anonymous Discussion Forums": "અનામી ચર્ચા મંચ",
    "Nearby Healthcare Finder": "નજીકનું આરોગ્ય કેન્દ્ર શોધક",
    "Weekly Challenges": "સાપ્તાહિક પડકારો",
    "Family Health Sharing Profile": "કૌટુંબિક આરોગ્ય શેરિંગ પ્રોફાઇલ",
    "Spotify Wrapped for Health": "આરોગ્ય માટે રેપ્ડ",
    "Google Maps + Health AI Router": "ગૂગલ મેપ્સ + હેલ્થ AI રૂટર",
    "Zomato + Nutrition Recommendation": "ઝોમેટો + પોષણ ભલામણ",
    "PCOS Screening Tool": "PCOS સ્ક્રીનીંગ સાધન",
    "Daily Brain Fog Tracker": "દૈનિક બ્રેઇન ફોગ ટ્રેકર",
    "Carry Pads Handbag Reminder": "પેડ્સ હેન્ડબેગ રીમાઇન્ડર",
    "Menstrual Product Tracker": "માસિક ચક્ર પ્રોડક્ટ ટ્રેકર",
    "First Period Puberty Guide": "પ્રથમ માસિક સ્રાવ અને ગર્ભાવસ્થા માર્ગદર્શિકા",
    "Weekly Meal Planner": "સાપ્તાહિક ભોજન આયોજક",
    "Healthy Grocery Planner": "આરોગ્યપ્રદ કરિયાણું આયોજક",
    "Chronological Timeline": "કાલક્રમિક સમયરેખા",
    "Vaccination Records": "રસીકરણ રેકોર્ડ્સ",
    "Prescription History": "પ્રિસ્ક્રિપ્શન ઇતિહાસ",
    "Consultation Audio Transcripts": "પરામર્શ ઓડિયો ટ્રાન્સક્રિપ્ટ",
    "Digital Medical Card": "ડિજિટલ મેડિકલ કાર્ડ",
    "Night wind-down Habits": "રાત્રિની આરામ કરવાની ટેવો",
    "Tick off warm habits before sleeping to log melatonin cycles.": "સૂતા પહેલા તંદુરસ્ત ટેવો નોંધી લો.",
    "Dim screens & blue light filters": "સ્ક્રીન ધીમી કરો અને બ્લુ લાઇટ ફિલ્ટર લગાવો",
    "10 mins mindfulness / box breathing": "૧૦ મિનિટ માઇન્ડફુલનેસ / બોક્સ બ્રીધિંગ",
    "Drink warm chamomile / herbal tea": "હૂંફાળી કેમોમાઈલ / હર્બલ ચા પીઓ",
    "Log sleep hours & cycle symptoms": "ઊંઘના કલાકો અને ચક્રના લક્ષણોની નોંધ કરો",
    "Check off when you have packed pads in your school/work handbag.": "સ્કૂલ/કામની બેગમાં પેડ્સ પેક કરો ત્યારે ટીક કરો.",
    "Enter Pin Code...": "પિન કોડ દાખલ કરો...",
    "Select symptoms you are experiencing to analyze wellness insights.": "તમારા લક્ષણો પસંદ કરો.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "પરામર્શની ઓડિયો નોંધો રેકોર્ડ કરો. જેમિની એઆઈ સારાંશ આપશે...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "એઆઈ તમને ઉણપમાંથી તંદુરસ્ત સ્વાસ્થ્ય તરફ લઈ જવા રોડમેપ બનાવે છે.",
    "First Period Guide": "પ્રથમ માસિક માર્ગદર્શિકા",
    "Cycle Calendar & Logs": "ચક્ર કેલેન્ડર અને લોગ",
    "Day 12 Follicular Phase": "દિવસ ૧૨ ફોલિક્યુલર તબક્કો",
    "Predicted Period: 4 Days left": "અંદાજિત માસિક: ૪ દિવસ બાકી",
    "Packed in Handbag!": "હેન્ડબેગમાં પેક કર્યું!",
    "Not Packed yet": "હજી પેક નથી કર્યું",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ડેમો હેકાથોન ક્વિક એક્સેસ (અદિતી તરીકે લોગિન કરો)"
  },
  kn: {
    "Sakhi": "ಸಖಿ",
    "Your Everyday AI Health Companion": "ನಿಮ್ಮ ದೈನಂದಿನ AI ಆರೋಗ್ಯ ಸಂಗಾತಿ",
    "One Intelligent Companion for Every Woman.": "ಪ್ರತಿ महिलाಗೆ ಒಂದು ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ।",
    "One Intelligent Companion for": "ಪ್ರತಿ మహిళకు",
    "Every Woman.": "ಒಂದು ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ।",
    "Good Morning, Aditi!": "ಶುಭೋದಯ, ಅದಿತಿ!",
    "Health Twin Active": "ಹೆಲ್ತ್ ಟ್ವಿನ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    "Today's Wellness Score": "ಇಂದಿನ ವೆಲ್ನೆಸ್ ಸ್ಕೋರ್",
    "Calculated": "ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ",
    "Daily AI Welcome Summary": "ದೈನಂದಿನ AI ಸ್ವಾಗತ ಸಾರಾಂಶ",
    "Water Intake": "ನೀರಿನ ಸೇವನೆ",
    "Sleep Quality": "ನಿದ್ರೆಯ ಗುಣಮಟ್ಟ",
    "Exercise": "ವ್ಯಾಯಾಮ",
    "Cycle Tracker": "ಋತುಚಕ್ರ ಟ್ರ್ಯಾಕರ್",
    "Weekly Recommendations": "ಸಾಪ್ತಾಹಿಕ ಶಿಫಾರಸುಗಳು",
    "Log Your Vibe": "ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ದಾಖಲಿಸಿ",
    "Today's Medicine Checklist": "ಇಂದಿನ ಔಷಧಿಗಳ ಪಟ್ಟಿ",
    "Smart Reminders": "ಸ್ಮಾರ್ಟ್ ಜ್ಞಾಪನೆಗಳು",
    "Upcoming Appointments": "ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    "Explore Stages": "ಹಂತಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "Start Your Journey": "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    "Dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Health Insights": "ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
    "Health Wrapped": "ಆರೋಗ್ಯ ರಾಪ್ಡ್",
    "Wellness Coach": "ವೆಲ್ನೆಸ್ ಕೋಚ್",
    "AI Clinic Room": "AI ಕ್ಲಿನಿಕ್ ಕೊಠಡಿ",
    "Sakhi AI Chat": "ಸಖಿ AI ಚಾಟ್",
    "Menstrual Tracker": "ಋತುಚಕ್ರ ಟ್ರ್ಯಾಕರ್",
    "Meal & Grocery": "ಊಟ ಮತ್ತು ದಿನಸಿ",
    "Report Analyzer": "ವರದಿ ವಿಶ್ಲೇಷಕ",
    "Health Passport": "ಹೆಲ್ತ್ ಪಾಸ್‌ಪೋರ್ಟ್",
    "Community Support": "ಸಮುದಾಯ ಬೆಂಬಲ",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Log Out": "ಲಾಗ್ ಔಟ್",
    "Doctor Audio visit Recorder": "ವೈದ್ಯರ ಆಡಿಯೋ ಭೇಟಿ ರೆಕಾರ್ಡರ್",
    "Anonymous Discussion Forums": "ಅನಾಮಧೇಯ ಚರ್ಚಾ ವೇದಿಕೆಗಳು",
    "Nearby Healthcare Finder": "ಸಮೀಪದ ಆರೋಗ್ಯ ಸೇವೆಗಳ ಪತ್ತೆ",
    "Weekly Challenges": "ಸಾಪ್ತಾಹಿಕ ಸವಾಲುಗಳು",
    "Family Health Sharing Profile": "ಕುಟುಂಬ ಆರೋಗ್ಯ ಹಂಚಿಕೆ ಪ್ರೊಫೈಲ್",
    "Spotify Wrapped for Health": "ಆರೋಗ್ಯಕ್ಕಾಗಿ ರ‌್ಯಾಪ್ಡ್",
    "Google Maps + Health AI Router": "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ + ಹೆಲ್ತ್ AI ರೂಟರ್",
    "Zomato + Nutrition Recommendation": "ಜೊಮ್ಯಾಟೊ + ಪೌಷ್ಟಿಕಾಂಶದ ಶಿಫಾರಸು",
    "PCOS Screening Tool": "PCOS ತಪಾಸಣಾ ಸಾಧನ",
    "Daily Brain Fog Tracker": "ದೈನಂದಿನ ಬ್ರೈನ್ ಫಾಗ್ ಟ್ರ್ಯಾಕರ್",
    "Carry Pads Handbag Reminder": "ಪ್ಯಾಡ್ ಬ್ಯಾಗ್ ರಿಮೈಂಡರ್",
    "Menstrual Product Tracker": "ಋತುಚಕ್ರ ಉತ್ಪನ್ನಗಳ ಟ್ರ್ಯಾಕರ್",
    "First Period Puberty Guide": "ಮೊದಲ ಋತುಚಕ್ರ ಮತ್ತು ಪ್ರೌಢಾವಸ್ಥೆಯ ಗೈಡ್",
    "Weekly Meal Planner": "ಸಾಪ್ತಾಹಿಕ ಊಟದ ಯೋಜಕ",
    "Healthy Grocery Planner": "ಆರೋಗ್ಯಕರ ದಿನಸಿ ಯೋಜಕ",
    "Chronological Timeline": "ಕಾಲಾನುಕ್ರಮದ ಟೈಮ್‌ಲೈನ್",
    "Vaccination Records": "ಲಸಿಕೆ ದಾಖಲೆಗಳು",
    "Prescription History": "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಇತಿಹಾಸ",
    "Consultation Audio Transcripts": "ಸಮಾಲೋಚನೆಯ ಆಡಿಯೋ ಪ್ರತಿಲಿಪಿ",
    "Digital Medical Card": "ಡಿಜಿಟಲ್ ವೈದ್ಯಕೀಯ ಕಾರ್ಡ್",
    "Night wind-down Habits": "ರಾತ್ರಿ ವಿಶ್ರಾಂತಿಯ ಅಭ್ಯಾಸಗಳು",
    "Tick off warm habits before sleeping to log melatonin cycles.": "ಮಲಗುವ ಮುನ್ನ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಗುರುತಿಸಿ.",
    "Dim screens & blue light filters": "ಸ್ಕ್ರೀನ್ ಬೆಳಕನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಬ್ಲೂ ಲೈಟ್ ಫಿಲ್ಟರ್ ಆನ್ ಮಾಡಿ",
    "10 mins mindfulness / box breathing": "10 ನಿಮಿಷಗಳ ಮೈಂಡ್‌ಫುಲ್‌ನೆಸ್ / ಬಾಕ್ಸ್ ಬ್ರೀಥಿಂಗ್",
    "Drink warm chamomile / herbal tea": "ಬಿಸಿ ಚಾಮೊಮೈಲ್ / ಗಿಡಮೂಲಿಕೆ ಚಹಾವನ್ನು ಕುಡಿಯಿರಿ",
    "Log sleep hours & cycle symptoms": "ನಿದ್ರೆಯ ಸಮಯ ಮತ್ತು ಋತುಚಕ್ರದ ಲಕ್ಷಣಗಳನ್ನು ದಾಖಲಿಸಿ",
    "Check off when you have packed pads in your school/work handbag.": "ಸ್ಕೂಲ್/ಕೆಲಸದ ಬ್ಯಾಗಿನಲ್ಲಿ ಪ್ಯಾಡ್‌ಗಳನ್ನು ಇರಿಸಿದಾಗ ಗುರುತು ಮಾಡಿ.",
    "Enter Pin Code...": "ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ...",
    "Select symptoms you are experiencing to analyze wellness insights.": "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "ಆಡಿಯೋ ಟಿಪ್ಪಣಿಗಳನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ. ಜೆಮಿನಿ AI ಸಾರಾಂಶವನ್ನು ನೀಡುತ್ತದೆ...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "ಉತ್ತಮ ಆರೋಗ್ಯಕ್ಕೆ ಮರಳಲು AI ಹಂತ ಹಂತದ ಯೋಜನೆಯನ್ನು ನೀಡುತ್ತದೆ.",
    "First Period Guide": "ಮೊದಲ ಋತುಚಕ್ರ ಮಾರ್ಗದರ್ಶಿ",
    "Cycle Calendar & Logs": "ಋತುಚಕ್ರ ಕ್ಯಾಲೆಂಡರ್ ಮತ್ತು ಲಾಗ್‌ಗಳು",
    "Day 12 Follicular Phase": "12 ನೇ ದಿನ ಫೋಲಿಕ್ಯುಲರ್ ಹಂತ",
    "Predicted Period: 4 Days left": "ಋತುಚಕ್ರದ ಮುನ್ಸೂಚನೆ: 4 ದಿನಗಳು ಬಾಕಿ ಇವೆ",
    "Packed in Handbag!": "ಬ್ಯಾಗಿನಲ್ಲಿ ಇರಿಸಲಾಗಿದೆ!",
    "Not Packed yet": "ಇನ್ನೂ ಇರಿಸಿಲ್ಲ",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ಡೆಮೊ ಹ್ಯಾಕಥಾನ್ ತ್ವರಿತ ಪ್ರವೇಶ (ಅದಿತಿ ಎಂದು ಲಾಗಿನ್ ಮಾಡಿ)"
  },
  ml: {
    "Sakhi": "സഖി",
    "Your Everyday AI Health Companion": "നിങ്ങളുടെ ദൈനദിന AI ആരോഗ്യ കൂട്ടാളി",
    "One Intelligent Companion for Every Woman.": "ഓരോ സ്ത്രീക്കും ഒരു ബുദ്ധിമാനായ കൂട്ടാളി।",
    "One Intelligent Companion for": "ഓരോ സ്ത്രീക്കും",
    "Every Woman.": "ഒരു ബുദ്ധിമാനായ കൂട്ടാളി।",
    "Good Morning, Aditi!": "സുപ്രഭാതം, അതിഥി!",
    "Health Twin Active": "ഹെൽത്ത് ട്വിൻ സജീവമാണ്",
    "Today's Wellness Score": "ഇന്നത്തെ വെൽനസ് സ്കോർ",
    "Calculated": "കണക്കാക്കിയത്",
    "Daily AI Welcome Summary": "ദൈനദിന AI സ്വാഗത സംഗ്രഹം",
    "Water Intake": "വെള്ളം കുടിക്കുന്നതിന്റെ അളവ്",
    "Sleep Quality": "ഉറക്കത്തിന്റെ ഗുണനിലവാരം",
    "Exercise": "വ്യായാമം",
    "Cycle Tracker": "ആർത്തവ ചക്ര ട്രാക്കർ",
    "Weekly Recommendations": "പ്രതിവാര നിർദ്ദേശങ്ങൾ",
    "Log Your Vibe": "നിങ്ങളുടെ മാനസികാവസ്ഥ രേഖപ്പെടുത്തുക",
    "Today's Medicine Checklist": "ഇന്നത്തെ മരുന്നുകളുടെ ലിസ്റ്റ്",
    "Smart Reminders": "സ്മാർട്ട് ഓർമ്മപ്പെടുത്തലുകൾ",
    "Upcoming Appointments": "വരാനിരിക്കുന്ന കൂടിക്കാഴ്ചകൾ",
    "Explore Stages": "ഘട്ടങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക",
    "Start Your Journey": "നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക",
    "Dashboard": "ഡാഷ്‌ബോർഡ്",
    "Health Insights": "ആരോഗ്യ സ്ഥിതിവിവരങ്ങൾ",
    "Health Wrapped": "ആരോഗ്യം റാപ്പ്ഡ്",
    "Wellness Coach": "വെൽനസ് കോച്ച്",
    "AI Clinic Room": "AI ക്ലിനിക് റൂം",
    "Sakhi AI Chat": "സഖി AI ചാറ്റ്",
    "Menstrual Tracker": "ആർത്തവ ട്രാക്കർ",
    "Meal & Grocery": "ഭക്ഷണവും പലചരക്കും",
    "Report Analyzer": "റിപ്പോർട്ട് അനലൈസർ",
    "Health Passport": "ഹെൽത്ത് പാസ്‌പോർട്ട്",
    "Community Support": "കമ്മ്യൂണിറ്റി പിന്തുണ",
    "Settings": "ക്രമീകരണങ്ങൾ",
    "Log Out": "ലോഗ് ഔട്ട്",
    "Doctor Audio visit Recorder": "ഡോക്ടർ ഓഡിയോ സന്ദർശന റെക്കോർഡർ",
    "Anonymous Discussion Forums": "അജ്ഞാത ചർച്ചാ വേദികൾ",
    "Nearby Healthcare Finder": "അടുത്തുള്ള ആരോഗ്യ കേന്ദ്രം കണ്ടെത്തൽ",
    "Weekly Challenges": "പ്രതിവാര വെല്ലുവിളികൾ",
    "Family Health Sharing Profile": "കുടുംബ ആരോഗ്യ പങ്കിടൽ പ്രൊഫൈൽ",
    "Spotify Wrapped for Health": "ആരോഗ്യത്തിന് റാപ്പ്ഡ്",
    "Google Maps + Health AI Router": "ഗൂഗിൾ മാപ്‌സ് + ഹെൽത്ത് AI റൂട്ടർ",
    "Zomato + Nutrition Recommendation": "സൊമാറ്റോ + പോഷകാഹാര ശുപാർശ",
    "PCOS Screening Tool": "PCOS പരിശോധനാ ഉപകരണം",
    "Daily Brain Fog Tracker": "പ്രതിദിന ബ്രെയിൻ ഫോഗ് ട്രാക്കർ",
    "Carry Pads Handbag Reminder": "പാഡുകൾ ബാഗിൽ വെച്ചോ റിമൈൻഡർ",
    "Menstrual Product Tracker": "ആർത്തവ ഉൽപ്പന്ന ട്രാക്കർ",
    "First Period Puberty Guide": "ആദ്യ ആർത്തവവും പ്രായപൂർത്തിയാകലും ഗൈഡ്",
    "Weekly Meal Planner": "പ്രതിവാര ഭക്ഷണ ആസൂത്രകൻ",
    "Healthy Grocery Planner": "ആരോഗ്യകരമായ പലചരക്ക് ആസൂത്രകൻ",
    "Chronological Timeline": "കാലാനുസൃതമായ സമയരേഖ",
    "Vaccination Records": "വാക്സിനേഷൻ രേഖകൾ",
    "Prescription History": "പ്രിസ്ക്രിപ്ഷൻ ചരിത്രം",
    "Consultation Audio Transcripts": "കൺസൾട്ടേഷൻ ഓഡിയോ ട്രാൻസ്ക്രിപ്റ്റ്",
    "Digital Medical Card": "ഡിജിറ്റൽ മെഡിക്കൽ കാർഡ്",
    "Night wind-down Habits": "രാത്രി ഉറക്ക ശീലങ്ങൾ",
    "Tick off warm habits before sleeping to log melatonin cycles.": "ഉറങ്ങുന്നതിനുമുമ്പ് നല്ല ശീലങ്ങൾ അടയാളപ്പെടുത്തുക.",
    "Dim screens & blue light filters": "സ്ക്രീൻ വെളിച്ചം കുറച്ച് ബ്ലൂ ലൈറ്റ് ഫിൽട്ടർ ഓൺ ചെയ്യുക",
    "10 mins mindfulness / box breathing": "10 മിനിറ്റ് മൈൻഡ്ഫുൾനസ് / ബോക്സ് ബ്രീത്തിങ്",
    "Drink warm chamomile / herbal tea": "ചെറുചൂടുള്ള ചമോമൈൽ / ഹെർബൽ ചായ കുടിക്കുക",
    "Log sleep hours & cycle symptoms": "ഉറക്ക സമയവും ആർത്തവ ലക്ഷണങ്ങളും രേഖപ്പെടുത്തുക",
    "Check off when you have packed pads in your school/work handbag.": "സ്കൂൾ/ഓഫീസ് ബാഗിൽ പാഡുകൾ പാക്ക് ചെയ്യുമ്പോൾ ടിക്ക് ചെയ്യുക.",
    "Enter Pin Code...": "പിൻ കോഡ് നൽകുക...",
    "Select symptoms you are experiencing to analyze wellness insights.": "ലക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കുക.",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "ആലോചനകളുടെ ഓഡിയോ കുറിപ്പുകൾ റെക്കോർഡ് ചെയ്യുക. ജെമിനി AI സംഗ്രഹം നൽകും...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "ആരോഗ്യകരമായ സ്ഥിതിയിലേക്ക് മടങ്ങാൻ AI ഘട്ടം ഘട്ടമായുള്ള പദ്ധതി നൽകുന്നു.",
    "First Period Guide": "ആദ്യ ആർത്തവ ഗൈഡ്",
    "Cycle Calendar & Logs": "ആർത്തവ കലണ്ടറും ലോഗുകളും",
    "Day 12 Follicular Phase": "12-ാം ദിവസം ഫോളിക്കുലാർ ഘട്ടം",
    "Predicted Period: 4 Days left": "പ്രതീക്ഷിക്കുന്ന ആർത്തവം: 4 ദിവസങ്ങൾ കൂടി",
    "Packed in Handbag!": "ഹാൻഡ്‌ബാഗിൽ പാക്ക് ചെയ്തു!",
    "Not Packed yet": "ഇതുവരെ പാക്ക് ചെയ്തിട്ടില്ല",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ഡെമോ ഹാക്കത്തോൺ ദ്രുത പ്രവേശനം (അതിഥിയായി ലോഗിൻ ചെയ്യുക)"
  },
  pa: {
    "Sakhi": "ਸਖੀ",
    "Your Everyday AI Health Companion": "ਤੁਹਾਡੀ ਰੋਜ਼ਾਨਾ ਦੀ ਏਆਈ ਸਿਹਤ ਸਾਥੀ",
    "One Intelligent Companion for Every Woman.": "ਹਰ ਔਰਤ ਲਈ ਇੱਕ ਬੁੱਧੀਮਾਨ ਸਾਥੀ।",
    "One Intelligent Companion for": "ਹਰ ਔਰਤ ਲਈ",
    "Every Woman.": "ਇੱਕ ਬੁੱਧੀਮਾਨ ਸਾਥੀ।",
    "Good Morning, Aditi!": "ਸ਼ੁਭ ਸਵੇਰ, ਅਦਿਤੀ!",
    "Health Twin Active": "ਹੈਲਥ ਟਵਿਨ ਸਰਗਰਮ ਹੈ",
    "Today's Wellness Score": "ਅੱਜ ਦਾ ਵੈਲਨੈੱਸ ਸਕੋਰ",
    "Calculated": "ਗਣਨਾ ਕੀਤੀ ਗਈ",
    "Daily AI Welcome Summary": "ਰੋਜ਼ਾਨਾ ਏਆਈ ਸਵਾਗਤ ਸਾਰਾਂਸ਼",
    "Water Intake": "ਪਾਣੀ ਪੀਣ ਦੀ ਮਾਤਰਾ",
    "Sleep Quality": "ਨੀਂਦ ਦੀ ਗੁਣਵੱਤਾ",
    "Exercise": "ਕਸਰਤ",
    "Cycle Tracker": "ਮਾਹਵਾਰੀ ਚੱਕਰ ਟ੍ਰੈਕਰ",
    "Weekly Recommendations": "ਹਫਤਾਵਾਰੀ ਸਿਫਾਰਸ਼ਾਂ",
    "Log Your Vibe": "ਆਪਣੀ ਸਥਿਤੀ ਦਰਜ ਕਰੋ",
    "Today's Medicine Checklist": "ਅੱਜ ਦੀਆਂ ਦਵਾਈਆਂ ਦੀ ਸੂਚੀ",
    "Smart Reminders": "ਸਮਾਰਟ ਰੀਮਾਈਂਡਰ",
    "Upcoming Appointments": "ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ",
    "Explore Stages": "ਪੜਾਵਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ",
    "Start Your Journey": "ਆਪਣੀ ਯਾਰਤਾ ਸਭਾਵਾਂ",
    "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "Health Insights": "ਸਿਹਤ ਸੂਝ",
    "Health Wrapped": "ਸਿਹਤ ਰੈਪਡ",
    "Wellness Coach": "ਵੈਲਨੈਸ ਕੋਚ",
    "AI Clinic Room": "ਏਆਈ ਕਲੀਨਿਕ ਰੂਮ",
    "Sakhi AI Chat": "ਸਖੀ ਏਆਈ ਚੈਟ",
    "Menstrual Tracker": "ਮਾਹਵਾਰੀ ਟ੍ਰੈਕਰ",
    "Meal & Grocery": "ਭੋਜਨ ਅਤੇ ਕਰਿਆਨਾ",
    "Report Analyzer": "ਰਿਪੋਰਟ ਐਨਾਲਾਈਜ਼ਰ",
    "Health Passport": "ਹੈਲਥ ਪਾਸਪੋਰਟ",
    "Community Support": "ਭਾਈਚਾਰਕ ਸਹਾਇਤਾ",
    "Settings": "ਸੈਟਿੰਗਜ਼",
    "Log Out": "ਲੌਗ ਆਉਟ",
    "Doctor Audio visit Recorder": "ਡਾਕਟਰ ਆਡੀਓ ਮੁਲਾਕਾਤ ਰਿਕਾਰਡਰ",
    "Anonymous Discussion Forums": "ਗੁਮਨਾਮ ਵਿਚਾਰ-ਵਟਾਂਦਰਾ ਫੋਰਮ",
    "Nearby Healthcare Finder": "ਨੇੜਲੇ ਸਿਹਤ ਕੇਂਦਰ ਦੀ ਖੋਜ",
    "Weekly Challenges": "ਹਫ਼ਤਾਵਾਰੀ ਚੁਣੌਤੀਆਂ",
    "Family Health Sharing Profile": "ਪਰਿਵਾਰਕ ਸਿਹਤ ਸਾਂਝਾਕਰਨ ਪ੍ਰੋਫਾਈਲ",
    "Spotify Wrapped for Health": "ਸਿਹਤ ਲਈ ਰੈਪਡ",
    "Google Maps + Health AI Router": "ਗੂਗਲ ਮੈਪਸ + ਹੈਲਥ AI ਰੂਟਰ",
    "Zomato + Nutrition Recommendation": "ਜ਼ੋਮੈਟੋ + ਪੋਸ਼ਣ ਸੰਬੰਧੀ ਸਿਫਾਰਸ਼",
    "PCOS Screening Tool": "PCOS ਸਕ੍ਰੀਨਿੰਗ ਟੂਲ",
    "Daily Brain Fog Tracker": "ਰੋਜ਼ਾਨਾ ਦਿਮਾਗੀ ਧੁੰਦ ਟ੍ਰੈਕਰ",
    "Carry Pads Handbag Reminder": "ਪੈਡ ਹੈਂਡਬੈਗ ਰੀਮਾਈਂਡਰ",
    "Menstrual Product Tracker": "ਮਾਹਵਾਰੀ ਉਤਪਾਦ ਟ੍ਰੈਕਰ",
    "First Period Puberty Guide": "ਪਹਿਲੀ ਮਾਹਵਾਰੀ ਅਤੇ ਜਵਾਨੀ ਗਾਈਡ",
    "Weekly Meal Planner": "ਹਫ਼ਤਾਵਾਰੀ ਭੋਜਨ ਯੋਜਨਾਕਾਰ",
    "Healthy Grocery Planner": "ਸਿਹਤਮੰਦ ਕਰਿਆਨਾ ਯੋਜਨਾਕਾਰ",
    "Chronological Timeline": "ਸਮਾਂਰੇਖਾ",
    "Vaccination Records": "ਟੀਕਾਕਰਨ ਰਿਕਾਰਡ",
    "Prescription History": "ਪਰਚੀ ਇਤਿਹਾਸ",
    "Consultation Audio Transcripts": "ਸਲਾਹ-ਮਸ਼ਵਰੇ ਦੀ ਆਡੀਓ ਲਿਖਤ",
    "Digital Medical Card": "ਡਿਜੀਟਲ ਮੈਡੀਕਲ ਕਾਰਡ",
    "Night wind-down Habits": "ਰਾਤ ਦੇ ਆਰਾਮ ਦੀਆਂ ਆਦਤਾਂ",
    "Tick off warm habits before sleeping to log melatonin cycles.": "ਸੌਣ ਤੋਂ ਪਹਿਲਾਂ ਸਿਹਤਮੰਦ ਆਦਤਾਂ ਨੂੰ ਨਿਸ਼ਾਨਬੱਧ ਕਰੋ।",
    "Dim screens & blue light filters": "ਸਕ੍ਰੀਨ ਲਾਈਟ ਘਟਾਓ ਅਤੇ ਬਲੂ ਲਾਈਟ ਫਿਲਟਰ ਲਗਾਓ",
    "10 mins mindfulness / box breathing": "10 ਮਿੰਟ ਮਾਈਂਡਫੁਲਨੈਸ / ਬਾਕਸ ਬ੍ਰੀਥਿੰਗ",
    "Drink warm chamomile / herbal tea": "ਗਰਮ ਚਮੋਮਾਈਲ / ਜੜੀ-ਬੂਟੀਆਂ ਵਾਲੀ ਚਾਹ ਪੀਓ",
    "Log sleep hours & cycle symptoms": "ਨੀਂਦ ਦੇ ਘੰਟੇ ਅਤੇ ਮਾਹਵਾਰੀ ਦੇ ਲੱਛਣ ਦਰਜ ਕਰੋ",
    "Check off when you have packed pads in your school/work handbag.": "ਜਦੋਂ ਤੁਸੀਂ ਸਕੂਲ/ਕੰਮ ਵਾਲੇ ਬੈਗ ਵਿੱਚ ਪੈਡ ਪੈਕ ਕਰ ਲਏ ਹੋਣ ਤਾਂ ਟਿੱਕ ਕਰੋ।",
    "Enter Pin Code...": "ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ...",
    "Select symptoms you are experiencing to analyze wellness insights.": "ਆਪਣੇ ਲੱਛਣਾਂ ਦੀ ਚੋਣ ਕਰੋ।",
    "Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...": "ਡਾਕਟਰੀ ਸਲਾਹ ਦੇ ਆਡੀਓ ਨੋਟਸ ਰਿਕਾਰਡ ਕਰੋ। ਜੈਮਿਨੀ ਏਆਈ ਸਾਰਾਂਸ਼ ਦੇਵੇਗਾ...",
    "AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.": "ਏਆਈ ਤੁਹかに ਘਾਟ ਤੋਂ ਵਾਪਸ ਸਿਹਤਮੰਦ ਬੇਸਲਾਈਨ ਵੱਲ ਲੈ ਜਾਣ ਲਈ ਪ੍ਰੋਗਰਾਮ ਤਿਆਰ ਕਰਦੀ ਹੈ।",
    "First Period Guide": "ਪਹਿਲੀ ਮਾਹਵਾਰੀ ਗਾਈਡ",
    "Cycle Calendar & Logs": "ਮਾਹਵਾਰੀ ਕੈਲੰਡਰ ਅਤੇ ਲੌਗ",
    "Day 12 Follicular Phase": "ਦਿਨ 12 ਫੋਲੀਕੂਲਰ ਪੜਾਅ",
    "Predicted Period: 4 Days left": "ਮਾਹਵਾਰੀ ਦਾ ਅੰਦਾਜ਼ਾ: 4 ਦਿਨ ਬਾਕੀ",
    "Packed in Handbag!": "ਹੈਂਡਬੈਗ ਵਿੱਚ ਪੈਕ ਕੀਤਾ ਗਿਆ!",
    "Not Packed yet": "ਅਜੇ ਪੈਕ ਨਹੀਂ ਕੀਤਾ ਗਿਆ",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ਡੈਮੋ ਹੈਕਾਥਨ ਤੁਰੰਤ ਪਹੁੰਚ (ਅਦਿਤੀ ਵਜੋਂ ਲੌਗਇਨ ਕਰੋ)"
  }
};

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
  const [pregnancyTests, setPregnancyTests] = useState([]);
  const [errandsList, setErrandsList] = useState([]);
  const [errandStreak, setErrandStreak] = useState(0);
  const [newErrandInput, setNewErrandInput] = useState('');
  const [showTeenGuide, setShowTeenGuide] = useState(false);

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
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [skinScanning, setSkinScanning] = useState(false);
  const [nearbyPin, setNearbyPin] = useState('560001');
  const [nearbyCategory, setNearbyCategory] = useState('Gynecologists');
  
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
    handleMockLogin();
  }, []);

  const handleMockLogin = async () => {
    setLoading(true);
    try {
      const data = await api.login('aditi@sakhi.ai', 'password123');
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
        setUser(data.user);
        setOnboardForm(prev => ({ ...prev, name: authName }));
        setView('onboarding');
      } else {
        const data = await api.login(authEmail, authPassword);
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
  // 🔥🔥🔥 DYNAMIC ACTIONS FOR NEW VIEWS 🔥🔥🔥
  // ==========================================

  // Synthesize relaxing lofi/meditative hums physically inside the browser!
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

  // Web Audio Context continuous hum synthesizer
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
  const handleSkinScan = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSkinFile(file);
    setSkinScanning(true);
    setSkinAnalysis(null);
    setTimeout(() => {
      setSkinScanning(false);
      setSkinAnalysis({
        acne: 'Mild inflammatory sebum bumps detected on chin',
        pigmentation: 'Optimal/Low',
        hydration: '62% (Slightly Dry)',
        hormonalLink: 'Progesterone levels are elevating in current Luteal window, triggering increased gland oil secretion. Focus on water intake & tea tree cleansers.'
      });
      setUserPoints(prev => prev + 25);
    }, 4000);
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

  // Log sunlight exposure
  const handleAddSunlight = (mins) => {
    setSunlightLog(prev => prev + mins);
    alert(`Logged ${mins} minutes of sunlight! Keep your Vitamin D stores high.`);
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

  // Zomato + Nutrition Recommendation
  const handleZomatoQuery = (e) => {
    e.preventDefault();
    if (!zomatoInput.trim()) return;
    const inputLower = zomatoInput.toLowerCase();
    if (inputLower.includes('pizza') || inputLower.includes('burger')) {
      setZomatoSuggestion({
        original: zomatoInput,
        substitute: 'Paneer Wrap / Grilled Tandoori Tofu salad with mint dressing',
        why: 'Pizza flour spikes blood sugar. The low-glycemic wrap keeps insulin levels stable, supporting PCOS hormone regulation.'
      });
    } else if (inputLower.includes('biryani') || inputLower.includes('rice')) {
      setZomatoSuggestion({
        original: zomatoInput,
        substitute: 'Quinoa Veg Biryani / Brown Rice lentil bowl',
        why: 'Provides complex fiber carbs and plant proteins. Perfect for high-energy phase workouts.'
      });
    } else {
      setZomatoSuggestion({
        original: zomatoInput,
        substitute: 'Spiced Lentil Soup / Sauteed green vegetables & Paneer tikka',
        why: 'Rich in iron, magnesium, and dietary fiber supporting follicular replenishment cycles.'
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-tr from-[#FFF8F6] via-[#FFF3F8] to-[#FFF9EC] text-[#5E5A66] transition-all ${
      largeText ? 'text-lg font-medium' : 'text-sm'
    }`}>
      
      {/* 🌸 BACKGROUND GRAPHICS - FLOATING PASTEL BLOBS 🌸 */}
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
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)} 
                  className="bg-transparent text-[11px] font-semibold text-[#7E7A88] focus:outline-none cursor-pointer"
                >
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
                <a href="#stages" className="bg-white/80 border text-[#7E7A88] hover:text-[#5E5A66] font-semibold px-6 py-3.5 rounded-2xl shadow-sm">{t("Explore Stages")}</a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center relative">
              <div className="w-full max-w-[420px] relative animate-float">
                <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
                  <circle cx="250" cy="250" r="180" fill="url(#hero-circle-grad)" fillOpacity="0.4" stroke="#FFF6FB" strokeWidth="4"/>
                  <path d="M250 140 C280 140, 310 180, 310 240 C310 320, 250 370, 250 380 C250 370, 190 320, 190 240 C190 180, 220 140, 250 140 Z" fill="url(#lotus-grad)" />
                  <path d="M250 160 C260 210, 290 230, 320 230 C290 250, 270 280, 250 310 C230 280, 210 250, 180 230 C210 230, 240 210, 250 160 Z" fill="#FFF6FB" fillOpacity="0.6"/>
                  <defs>
                    <linearGradient id="hero-circle-grad" x1="250" y1="70" x2="250" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#FFF9EC" /><stop offset="1" stopColor="#FFF2FC" /></linearGradient>
                    <linearGradient id="lotus-grad" x1="250" y1="140" x2="250" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB3D9" /><stop offset="1" stopColor="#FF8A80" /></linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-[8%] -left-8 bg-white/95 border rounded-2xl p-3 shadow-lg flex items-center gap-3"><span className="text-xl">🧬</span><div><span className="text-[9px] text-[#A09BAA] block uppercase font-bold">{t("Wellness Index")}</span><span className="text-xs font-bold">{t("92% Excellent")}</span></div></div>
                <div className="absolute bottom-[2%] right-4 bg-white/95 border rounded-2xl p-3 shadow-lg flex items-center gap-3"><span className="text-xl">🧘‍♀️</span><div><span className="text-[9px] text-[#A09BAA] block uppercase font-bold">{t("Logged Vibe")}</span><span className="text-xs font-bold">{t("Mindful Calm")}</span></div></div>
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
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
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
                  </div>
                  <button type="button" onClick={() => setOnboardStep(2)} className="w-full bg-[#FF8A80] text-white py-3 rounded-2xl font-bold mt-4">{t("Next Step")}</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* --- DASHBOARD SHELL CONTAINER --- */}
      {view !== 'landing' && view !== 'auth' && view !== 'onboarding' && (
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
                  { id: 'wellness', label: 'Wellness Coach', icon: Heart },
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

          {/* Bottom mobile Nav */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FFF6FB]/95 border-t border-[#FFF3F8] px-4 py-2 z-40 flex justify-around">
            {[
              { id: 'dashboard', label: 'Home', icon: Activity },
              { id: 'insights', label: 'Insights', icon: Sparkles },
              { id: 'wrapped', label: 'Wrapped', icon: Award },
              { id: 'wellness', label: 'Coach', icon: Heart },
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
              <div>
                <span className="text-[10px] text-[#A09BAA] uppercase font-bold tracking-wider">{t("Health Twin Active")}</span>
                <h1 className="text-2xl font-bold font-sans text-[#5E5A66] mt-0.5">
                  {lang !== 'en' ? `नमस्ते, ${profile?.name || 'अदिति'} 🌸` : `${t("Good Morning, Aditi!")}`}
                </h1>
              </div>
              <div className="flex items-center gap-4 relative">
                
                {/* Points indicator */}
                <div className="bg-[#FFE79A] text-[#5E5A66] font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                  🏅 {userPoints} XP {t("Level")} 3
                </div>

                <div className="relative flex items-center gap-1 bg-white border rounded-xl px-2.5 py-1.5 shadow-sm">
                  <Globe size={13} className="text-[#A09BAA]" />
                  <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value)} 
                    className="bg-transparent text-[11px] font-semibold text-[#7E7A88] focus:outline-none cursor-pointer"
                  >
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

                <button onClick={handleSOS} className="bg-[#FF8A80]/15 hover:bg-[#FF8A80]/20 border border-[#FF8A80]/40 text-[#FF8A80] font-bold px-4 py-2 rounded-2xl text-[10px] tracking-wider uppercase">🚨 {t("SOS")}</button>
                <button onClick={() => setNotificationOpen(!notificationOpen)} className="w-10 h-10 rounded-2xl bg-white border flex items-center justify-center text-[#7E7A88] hover:text-[#5E5A66] shadow-sm relative">
                  <Bell size={18} />
                  {dashboardData?.notifications?.some(n => !n.seen) && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF8A80]"></span>}
                </button>
              </div>
            </header>

            {/* --- PANEL 1: DASHBOARD VIEW PANEL --- */}
            {view === 'dashboard' && dashboardData && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Daily AI Health Briefing */}
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
                  
                  {/* Wellness Score Circle Card */}
                  <div className="lg:col-span-4 bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#FFB3D9]/10 rounded-full"></div>
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

                  {/* Smart Daily Routine Planner */}
                  <div className="lg:col-span-8 bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-[#5E5A66]">{t("Weekly Recommendations")}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {routineList.map((rt, idx) => (
                        <div key={idx} className="bg-white/80 border rounded-2xl p-4 shadow-sm flex gap-3 items-center">
                          <span className="bg-[#FFE79A] text-xs font-bold px-2 py-1 rounded-lg text-[#5E5A66] whitespace-nowrap">{rt.time}</span>
                          <span className="text-xs font-semibold text-[#7E7A88]">{rt.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Chores checklist */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-lg text-[#5E5A66]">{t("Household & Errands Checklist")}</h3>
                    </div>
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
                            {e.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily targets */}
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

                {/* Smart Hydration Intelligence */}
                <h3 className="text-xl font-bold font-sans text-[#5E5A66] border-b pb-1">{t("Water Intake")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Water Intake")}</span>
                    </div>
                    <div className="text-center py-1">
                      <span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.today_metrics.water}L</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Sleep Quality")}</span></div>
                    <div className="text-center py-2">
                      <span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.today_metrics.sleep}h</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Exercise")}</span>
                    </div>
                    <div className="text-center py-1">
                      <span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{actSteps} {t("Steps")}</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Cycle Tracker")}</span></div>
                    <div className="text-center py-2"><span className="text-3xl font-extrabold text-[#5E5A66] font-sans">Day {dashboardData.today_metrics.cycle_day}</span></div>
                  </div>

                </div>

              </div>
            )}

            {/* --- PANEL 2: SAKHI AI ASSISTANT CHAT --- */}
            {view === 'chat' && (
              <div className="bg-white border rounded-3xl shadow-sm h-[75vh] flex flex-col overflow-hidden animate-fade-in">
                <div className="bg-[#FFF6FB] border-b px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white animate-bounce" size={20} /></div>
                    <div><h2 className="font-bold text-lg text-[#5E5A66]">{t("Sakhi AI Chat")}</h2></div>
                  </div>
                </div>
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`w-full max-w-[75%] rounded-3xl p-4 text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#FF8A80] text-white rounded-tr-none' : 'bg-[#FFF6FB] text-[#5E5A66] rounded-tl-none'}`}>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-3">
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about PCOS, delay..." className="flex-grow bg-[#FFF8F6] border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
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
                
                {/* Zomato Healthy Choices recommendation card */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-lg text-[#5E5A66] flex items-center gap-1.5">
                      🍔 {t("Zomato + Nutrition Recommendation")}
                    </h3>
                  </div>
                  <form onSubmit={handleZomatoQuery} className="flex gap-2">
                    <input 
                      type="text" 
                      value={zomatoInput} 
                      onChange={(e) => setZomatoInput(e.target.value)} 
                      placeholder="e.g. Cheese Pizza..." 
                      className="flex-grow bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                    <button type="submit" className="bg-[#FF8A80] text-white font-bold px-4 py-2 rounded-xl text-xs">{t("Swap")}</button>
                  </form>
                  {zomatoSuggestion && (
                    <div className="bg-[#FFF6FB] border p-4 rounded-2xl text-xs space-y-2">
                      <div><strong className="text-[#FF8A80]">{t("Original Dish")}:</strong> <span className="line-through text-[#A09BAA]">{zomatoSuggestion.original}</span></div>
                      <div><strong className="text-[#B9F4D0]">{t("Healthier AI Swap")}:</strong> <span className="font-bold text-[#5E5A66]">{zomatoSuggestion.substitute}</span></div>
                    </div>
                  )}
                </div>

                {/* Weekly Meal Planner & Grocery Checklist */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Meal Plan */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">
                      🍳 {t("Weekly Meal Planner")}
                    </h3>
                    <div className="space-y-3.5">
                      {Object.keys(weeklyMealPlan).map(mealKey => (
                        <div key={mealKey} className="bg-[#FFF6FB] border p-4 rounded-2xl space-y-1 text-xs">
                          <span className="font-bold text-[#FF8A80] uppercase tracking-wider block text-[9px]">{t(mealKey)}</span>
                          <span className="font-semibold text-[#5E5A66] text-sm block">{weeklyMealPlan[mealKey]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grocery Planner */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🛒 {t("Healthy Grocery Planner")}</h3>
                    <div className="space-y-2.5">
                      {groceries.map(item => (
                        <div 
                          key={item.id} 
                          onClick={() => handleToggleGrocery(item.id)}
                          className="flex items-center justify-between bg-[#FFF9EC]/50 border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9]"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-semibold ${item.bought ? 'line-through text-[#A09BAA]' : 'text-[#5E5A66]'}`}>{t(item.name)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* --- PANEL 4: BLOOD REPORT & HEREDITY HISTORY --- */}
            {view === 'reports' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Report Analyzer")}</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🧬 {t("Family Health Sharing Profile")}</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[#7E7A88]">
                      {Object.keys(familyHealthHistory).map(cond => (
                        <label key={cond} className="flex items-center gap-3 p-3 bg-[#FFF6FB] rounded-xl border cursor-pointer hover:border-[#FFB3D9]">
                          <span className="capitalize">{t(cond)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🧾 {t("Medical Expense Tracker")}</h3>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {expenses.map(exp => (
                        <div key={exp.id} className="flex justify-between items-center text-xs bg-[#FFF6FB] border p-2.5 rounded-xl">
                          <div>
                            <span className="font-semibold text-[#5E5A66]">{t(exp.category)}</span>
                          </div>
                          <span className="font-bold text-[#FF8A80]">₹{exp.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    <button 
                      onClick={() => setShowTeenGuide(!showTeenGuide)}
                      className="bg-[#C9B6FF] hover:bg-[#C9B6FF]/95 text-white font-bold px-4 py-2 rounded-2xl text-xs transition-all flex items-center gap-1"
                    >
                      🌸 {t("First Period Guide")}
                    </button>
                    <span className="bg-[#FF8A80]/20 text-[#5E5A66] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center">{t("Predicted Period: 4 Days left")}</span>
                  </div>
                </div>

                {/* Carry pads Handbag reminder */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-6 bg-[#FFF9EC] border border-[#FFD59A]/30 rounded-3xl p-5 shadow-sm space-y-3">
                    <h3 className="font-bold text-sm text-[#5E5A66] flex items-center gap-1.5">🎒 {t("Carry Pads Handbag Reminder")}</h3>
                    <p className="text-xs text-[#7E7A88]">{t("Check off when you have packed pads in your school/work handbag.")}</p>
                    <button 
                      onClick={handleTogglePadKit}
                      className={`w-full py-2.5 rounded-2xl text-xs font-extrabold transition-all border ${
                        padReminderPacked 
                          ? 'bg-[#B9F4D0]/40 border-[#B9F4D0] text-[#5E5A66]' 
                          : 'bg-white border-[#FFD59A] text-[#7E7A88]'
                      }`}
                    >
                      {padReminderPacked ? t('Packed in Handbag!') : t('Not Packed yet')}
                    </button>
                  </div>

                  {/* Menstrual product inventory tracker */}
                  <div className="md:col-span-6 bg-white border rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold text-[#7E7A88]">
                    <h3 className="font-bold text-sm text-[#5E5A66] border-b pb-1.5 flex items-center gap-1">🌸 {t("Menstrual Product Tracker")}</h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-[#FFF6FB] p-2 rounded-xl">
                        <span className="text-[10px] text-[#A09BAA] block">{t("Stock left")}</span>
                        <span className="text-lg font-bold text-[#FF8A80]">{padStock} Pads</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brain Fog tracker */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#5E5A66] border-b pb-1.5 flex items-center gap-1.5">
                    <span>🧠</span> {t("Daily Brain Fog Tracker")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-[#7E7A88]">
                    <div>
                      <label className="block mb-1">{t("Memory Recall")} ({brainFogLog.memory}/10)</label>
                    </div>
                  </div>
                </div>

                {/* PCOS screening quiz */}
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#5E5A66]">{t("PCOS Screening Tool")}</h3>
                    <button onClick={() => setPcosQuizOpen(!pcosQuizOpen)} className="bg-white border rounded-2xl px-4 py-2 text-xs font-bold">{pcosQuizOpen ? t('Close') : t('Start Screening')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 6: HEALTH PASSPORT --- */}
            {view === 'passport' && dashboardData && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Health Passport")}</h2>
                  <p className="text-xs text-[#7E7A88] mt-2">{t("Unified record repository of vaccinations, visits, prescriptions, and scanned files.")}</p>
                </div>
                
                {/* Doctor Audio visit Recorder */}
                <div className="bg-[#FFF6FB] border border-[#FFB3D9]/20 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                    <span>🎙️ {t("Doctor Audio visit Recorder")}</span>
                  </h3>
                  <p className="text-xs text-[#7E7A88]">{t("Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize...")}</p>
                  
                  <div className="flex gap-4 items-center">
                    <button onClick={handleRecordAudioNotes} className="bg-[#C9B6FF] text-white px-5 py-2.5 rounded-xl text-xs font-bold">
                      {t("Record Doctor Visit")}
                    </button>
                  </div>
                </div>

                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-bold text-lg text-[#5E5A66]">{t("Chronological Timeline")}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 7: HEALTH INSIGHTS --- */}
            {view === 'insights' && risks && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border border-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold font-sans text-[#5E5A66]">{t("Health Insights")}</h2>
                </div>
              </div>
            )}

            {/* --- PANEL 8: GUIDED WELLNESS & VOICE MOOD --- */}
            {view === 'wellness' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("Wellness Coach")}</h2>
                </div>
              </div>
            )}

            {/* --- PANEL 9: CLINIC ROOM (Symptom Checker, Acne, finder) --- */}
            {view === 'clinic' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">{t("AI Clinic Room")}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Symptom Checker */}
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">🩺 {t("AI Symptom Checker")}</h3>
                    <p className="text-xs text-[#7E7A88]">{t("Select symptoms you are experiencing to analyze wellness insights.")}</p>
                    
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
                  </div>

                  {/* Face visual analyzer */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">
                      <Camera size={18} className="text-[#FFB3D9]" /> {t("Visual Skin & Acne Analyzer")}
                    </h3>
                  </div>

                </div>

                {/* Healthcare Finder */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2">📍 {t("Nearby Healthcare Finder")}</h3>
                  <div className="flex flex-wrap gap-3">
                    <input 
                      type="text" 
                      value={nearbyPin} 
                      onChange={(e) => setNearbyPin(e.target.value)} 
                      placeholder={t("Enter Pin Code...")} 
                      className="bg-[#FFF8F6] border rounded-xl px-3 py-2 text-xs focus:outline-none w-32"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-[#7E7A88] pt-2">
                    {HEALTHCARE_PROVIDERS[nearbyCategory]?.map((loc, idx) => (
                      <div key={idx} className="bg-[#FFF6FB] border p-4 rounded-2xl flex justify-between items-start">
                        <div>
                          <span className="font-bold text-sm text-[#5E5A66] block">{loc.name}</span>
                          <span className="block mt-0.5 text-[#7E7A88]">{loc.address}</span>
                        </div>
                      </div>
                    ))}
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
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm flex flex-col h-[400px]">
                    <div className="flex justify-between items-center border-b pb-2 mb-3">
                      <h3 className="font-bold text-base text-[#5E5A66]">💬 {t("Anonymous Discussion Forums")}</h3>
                    </div>
                  </div>

                  {/* Weekly challenges */}
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                      <span>🔬</span> {t("Weekly Challenges")}
                    </h3>
                  </div>

                </div>

                {/* Night wind-down checklist widget */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Melatonin Wind-down checklist */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">
                      <span>🌙</span> {t("Night wind-down Habits")}
                    </h3>
                    <p className="text-xs text-[#7E7A88]">{t("Tick off warm habits before sleeping to log melatonin cycles.")}</p>
                    <div className="space-y-3 text-xs font-semibold text-[#7E7A88]">
                      {[
                        { key: 'dimScreens', label: 'Dim screens & blue light filters' },
                        { key: 'mindfulness', label: '10 mins mindfulness / box breathing' },
                        { key: 'herbalTea', label: 'Drink warm chamomile / herbal tea' },
                        { key: 'sleepLog', label: 'Log sleep hours & cycle symptoms' }
                      ].map(habit => (
                        <div 
                          key={habit.key}
                          onClick={() => setNightModeWindDown(prev => ({ ...prev, [habit.key]: !prev[habit.key] }))}
                          className="flex items-center gap-3 bg-[#FFF6FB] border p-3 rounded-2xl cursor-pointer hover:border-[#FFB3D9]"
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${nightModeWindDown[habit.key] ? 'bg-[#FF8A80] border-[#FF8A80]' : 'border-[#FFB3D9]/60'}`}>
                            {nightModeWindDown[habit.key] && <Check size={10} className="text-white" />}
                          </div>
                          <span>{t(habit.label)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family sharing profile */}
                  <div className="lg:col-span-6 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1.5">
                      <Upload size={18} className="text-[#B9F4D0]" /> {t("Family Health Sharing Profile")}
                    </h3>
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
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-1">
                      <MapPin size={18} className="text-[#FF8A80]" /> {t("Google Maps + Health AI Router")}
                    </h3>
                    <p className="text-xs text-[#7E7A88]">{t("AI plots a sequential step-by-step roadmap to guide you from deficiency back to optimal baseline health.")}</p>
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

                {/* Accessibility */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">
                    <ZoomIn size={20} className="text-[#F48FB1]" /> {t("Accessibility Options")}
                  </h3>
                </div>

                {/* Personal Profile Health Twin Editor */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2"><span>🧬</span> {t("Personal Profile Health Twin Editor")}</h3>
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
