import React, { useState, useEffect } from 'react';
import { 
  Flower, Activity, Droplet, Heart, Upload, Settings, User, 
  Calendar, MessageSquare, Plus, Check, ChevronDown, Sparkles, 
  Clock, ClipboardList, Bell, ArrowRight, Search, Menu, X, 
  FileText, Moon, Footprints, Apple, AlertTriangle, ShieldAlert,
  ChevronRight, RefreshCw, Send, Award, Volume2, Globe, ZoomIn
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, LineChart, Line
} from 'recharts';
import { api } from './services/api';

// 🌐 Indian Languages Translation Map 🌐
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
    "Sakhi AI Chat": "सखी एआई चैट",
    "Menstrual Tracker": "मासिक चक्र",
    "AI Meal Scanner": "एआई भोजन स्कैनर",
    "Report Analyzer": "रिपोर्ट विश्लेषक",
    "Health Passport": "स्वास्थ्य पासपोर्ट",
    "Analytics Trends": "रुझान",
    "Settings": "सेटिंग्स",
    "Health Insights": "स्वास्थ्य अंतर्दृष्टि",
    "Log Out": "लॉग आउट",
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
    "Smart Reminders": "স্মার্ট অনুস্মারক",
    "Upcoming Appointments": "আসন্ন অ্যাপয়েন্টমেন্ট",
    "Explore Stages": "ধাপগুলি অন্বেষণ করুন",
    "Start Your Journey": "আপনার যাত্রা শুরু করুন",
    "Dashboard": "ড্যাশবোর্ড",
    "Sakhi AI Chat": "সখী এআই চ্যাট",
    "Menstrual Tracker": "মাসিক চক্র",
    "AI Meal Scanner": "এআই খাবার স্ক্যানার",
    "Report Analyzer": "রিপোর্ট বিশ্লেষক",
    "Health Passport": "হেলথ পাসপোর্ট",
    "Analytics Trends": "বিশ্লেষণ প্রবণতা",
    "Settings": "সেটিংস",
    "Health Insights": "স্বাস্থ্য অন্তর্দৃষ্টি",
    "Log Out": "লগ আউট",
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
    "Sleep Quality": "निద్ర నాణ్యత",
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
    "Sakhi AI Chat": "సఖి AI చాట్",
    "Menstrual Tracker": "నెలసరి ట్రాకర్",
    "AI Meal Scanner": "AI మీల్ స్కానర్",
    "Report Analyzer": "రిపోర్ట్ అనలైజర్",
    "Health Passport": "హెల్త్ పాస్‌పోర్ట్",
    "Analytics Trends": "విశ్లేషణ ట్రెండ్‌లు",
    "Settings": "సెట్టింగ్‌లు",
    "Health Insights": "ఆరోగ్య అంతర్దృష్టులు",
    "Log Out": "లాగ్ అవుట్",
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
    "Sakhi AI Chat": "सखी एआय चॅट",
    "Menstrual Tracker": "मासिक पाळी",
    "AI Meal Scanner": "एआय मील स्कॅनर",
    "Report Analyzer": "रिपोर्ट विश्लेषक",
    "Health Passport": "हेल्थ पासपोर्ट",
    "Analytics Trends": "विश्लेषण ट्रेंड्स",
    "Settings": "सेटिंग्ज",
    "Health Insights": "आरोग्य अंतर्दृष्टी",
    "Log Out": "लॉग आउट",
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
    "Sleep Quality": "தூக்கத்தின் தരം",
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
    "Sakhi AI Chat": "சகி AI அரட்டை",
    "Menstrual Tracker": "மாதவிடாய் டிராக்கர்",
    "AI Meal Scanner": "AI உணவு ஸ்கேனர்",
    "Report Analyzer": "அறிக்கை பகுப்பாய்வி",
    "Health Passport": "ஹெல்த் பாஸ்போர்ட்",
    "Analytics Trends": "போக்குகள்",
    "Settings": "அமைப்புகள்",
    "Health Insights": "ஆரோக்கிய நுண்ணறிவு",
    "Log Out": "வெளியேறு",
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
    "Sakhi AI Chat": "સખી AI ચેટ",
    "Menstrual Tracker": "માસિક ચક્ર",
    "AI Meal Scanner": "AI ભોજન સ્કેનર",
    "Report Analyzer": "રિપોર્ટ વિશ્લેષક",
    "Health Passport": "હેલ્થ પાસપોર્ટ",
    "Analytics Trends": "વિશ્લેષણ પ્રવાહો",
    "Settings": "સેટિંગ્સ",
    "Health Insights": "આરોગ્ય આંતરદૃષ્ટિ",
    "Log Out": "લોગ આઉટ",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ડેમો હેકાથોન ક્વિક એક્સેસ (અદિતિ તરીકે લોગિન કરો)"
  },
  kn: {
    "Sakhi": "ಸಖಿ",
    "Your Everyday AI Health Companion": "ನಿಮ್ಮ ದೈನಂದಿನ AI ಆರೋಗ್ಯ ಸಂಗಾತಿ",
    "One Intelligent Companion for Every Woman.": "ಪ್ರತಿ ಮಹಿಳೆಗೆ ಒಂದು ಬುದ್ಧಿವಂತ ಸಂಗಾತಿ।",
    "One Intelligent Companion for": "ಪ್ರತಿ ಮಹಿಳೆಗೆ",
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
    "Sakhi AI Chat": "ಸಖಿ AI chating",
    "Menstrual Tracker": "ಋತುಚಕ್ರ ಟ್ರ್ಯಾಕರ್",
    "AI Meal Scanner": "AI ಊಟದ ಸ್ಕ್ಯಾನರ್",
    "Report Analyzer": "ವರದಿ ವಿಶ್ಲೇಷಕ",
    "Health Passport": "ಹೆಲ್ತ್ ಪಾಸ್‌ಪೋರ್ಟ್",
    "Analytics Trends": "ವಿಶ್ಲೇಷಣೆ ಪ್ರವೃತ್ತಿಗಳು",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Health Insights": "ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
    "Log Out": "ಲಾಗ್ ಔಟ್",
    "Demo Hackathon Quick Access (Log in as Aditi)": "ಡೆಮೊ ಹ್ಯಾಕಥಾನ್ ತ್ವರಿत ಪ್ರವೇಶ (ಅದಿತಿ ಎಂದು ಲಾಗಿನ್ ಮಾಡಿ)"
  },
  ml: {
    "Sakhi": "സഖി",
    "Your Everyday AI Health Companion": "നിങ്ങളുടെ ദൈനംദിന AI ആരോഗ്യ കൂട്ടാളി",
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
    "Sakhi AI Chat": "സഖി AI ചാറ്റ്",
    "Menstrual Tracker": "ആർത്തവ ട്രാക്കർ",
    "AI Meal Scanner": "AI മീൽ സ്കാനർ",
    "Report Analyzer": "റിപ്പോർട്ട് അനലൈസർ",
    "Health Passport": "ഹെൽത്ത് പാസ്‌പോർട്ട്",
    "Analytics Trends": "വിശകലന പ്രവണതകൾ",
    "Settings": "ക്രമീകരണങ്ങൾ",
    "Health Insights": "ആരോഗ്യ സ്ഥിതിവിവരങ്ങൾ",
    "Log Out": "ലോഗ് ഔട്ട്",
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
    "Start Your Journey": "ਆਪਣੀ ਯਾਰਤਾ ਸ਼ੁਰੂ ਕਰੋ",
    "Dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "Sakhi AI Chat": "ਸਖੀ ਏਆਈ ਚੈਟ",
    "Menstrual Tracker": "ਮਾਹਵਾਰੀ ਟ੍ਰੈਕਰ",
    "AI Meal Scanner": "ਏਆਈ ਮੀਲ ਸਕੈਨਰ",
    "Report Analyzer": "ਰਿਪੋਰਟ ਐਨਾਲਾਈਜ਼ਰ",
    "Health Passport": "ਹੈਲਥ ਪਾਸਪੋਰਟ",
    "Analytics Trends": "ਰੁਝਾਨ",
    "Settings": "ਸੈਟਿੰਗਜ਼",
    "Health Insights": "ਸਿਹਤ ਸੂਝ",
    "Log Out": "ਲੌਗ ਆਉਟ",
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
  const [lang, setLang] = useState('en'); // en, hi, bn, te, mr, ta, gu, kn, ml, pa

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

  // New Extension States
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

  // Input Logging Forms
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('09:00');
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
    setRecordingAudio(true);
    setTimeout(async () => {
      setRecordingAudio(false);
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
    await api.triggerSOS(["+91 98765 43210", "+91 99999 88888"]);
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

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      'Happy': '😊', 'Calm': '🧘‍♀️', 'Energetic': '⚡',
      'Tired': '😴', 'Anxious': '🥺', 'Irritable': '🗯️'
    };
    return emojis[mood] || '🌸';
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
              <h2 className="text-3xl font-bold text-[#FF8A80] font-sans">SOS Activated</h2>
              <p className="text-[#7E7A88] mt-2">Emergency alerts and medical details dispatched to registered contacts.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-[#FFF6FB] rounded-2xl p-5 mb-6 space-y-3 shadow-sm">
              <h3 className="font-semibold text-lg border-b border-[#FFB3D9]/30 pb-2 flex items-center gap-2">
                <ClipboardList size={18} className="text-[#F48FB1]" /> Digital Medical Card
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-[#A09BAA] block text-[9px] uppercase">Full Name</span><span className="font-semibold">Aditi Sharma</span></div>
                <div><span className="text-[#A09BAA] block text-[9px] uppercase">Blood Group</span><span className="font-bold text-[#FF8A80]">O+</span></div>
                <div className="col-span-2"><span className="text-[#A09BAA] block text-[9px] uppercase">Allergies</span><span className="font-medium">{profile?.allergies || 'Gluten sensitive'}</span></div>
                <div className="col-span-2"><span className="text-[#A09BAA] block text-[9px] uppercase">Conditions</span><span className="font-medium">{profile?.conditions || 'Mild PCOS'}</span></div>
              </div>
            </div>
            <button onClick={() => setSosActive(false)} className="w-full bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold py-3.5 rounded-2xl shadow-lg">
              I am Safe Now
            </button>
          </div>
        </div>
      )}

      {/* --- LANDING VIEW --- */}
      {view === 'landing' && (
        <div className="relative z-10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between sticky top-0 bg-[#FFF8F6]/85 backdrop-blur-md z-40 border-b border-[#FFF3F8]">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-md">
                <Flower className="text-white" size={22} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent font-sans">{t("Sakhi")}</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-[#7E7A88] font-medium text-xs">
              <a href="#features" className="hover:text-[#FF8A80] transition-colors">Features</a>
              <a href="#stages" className="hover:text-[#FF8A80] transition-colors">Life Stages</a>
            </div>

            <div className="flex items-center gap-3">
              {/* 🌐 Regional Indian Languages Selector Dropdown 🌐 */}
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
                  <button onClick={() => { setIsRegister(false); setView('auth'); }} className="text-[#7E7A88] hover:text-[#FF8A80] font-semibold text-xs px-3 py-2">Sign In</button>
                  <button onClick={() => { setIsRegister(true); setView('auth'); }} className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white font-bold px-5 py-2.5 rounded-2xl text-xs shadow-sm">{t("Start Your Journey")}</button>
                </>
              )}
            </div>
          </nav>

          <header className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-[#FFB3D9]/20 text-[#F48FB1] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={11} /> Powered by Gemini AI
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#5E5A66] font-sans">
                {t("One Intelligent Companion for")} <span className="bg-gradient-to-r from-[#FF8A80] via-[#F48FB1] to-[#C9B6FF] bg-clip-text text-transparent">{t("Every Woman.")}</span>
              </h1>
              <p className="text-[#7E7A88] text-base leading-relaxed max-w-xl">
                {t("Your Everyday AI Health Companion")} that supports women through every stage of life with personalized health insights, nutrition, cycle tracking, mental wellness, and preventive care.
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
                <div className="absolute top-[8%] -left-8 bg-white/95 border rounded-2xl p-3 shadow-lg flex items-center gap-3"><span className="text-xl">🧬</span><div><span className="text-[9px] text-[#A09BAA] block uppercase font-bold">Wellness Index</span><span className="text-xs font-bold">92% Excellent</span></div></div>
                <div className="absolute bottom-[2%] right-4 bg-white/95 border rounded-2xl p-3 shadow-lg flex items-center gap-3"><span className="text-xl">🧘‍♀️</span><div><span className="text-[9px] text-[#A09BAA] block uppercase font-bold">Logged Vibe</span><span className="text-xs font-bold">Mindful Calm</span></div></div>
              </div>
            </div>
          </header>

          <section id="features" className="max-w-7xl mx-auto px-6 py-20 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs text-[#F48FB1] uppercase font-bold">Features</span>
              <h2 className="text-4xl font-bold text-[#5E5A66] font-sans">Intelligent Health Companion</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI Health Twin", desc: "A personalized biological mirror aggregating cycle parameters, labs, and goals.", icon: Activity, bg: "#FFB3D9" },
                { title: "AI Meal Scanner", desc: "Scan plates with Gemini Vision to extract calorie counts and iron progress.", icon: Apple, bg: "#FFE79A" },
                { title: "Report Analyzer", desc: "OCR parsing of blood test files for Vitamin D, Thyroid, and Anemia.", icon: FileText, bg: "#AEE7FF" },
                { title: "Smart Notification System", desc: "Reminders for medicines, hydration, prenatal kicks, and visits.", icon: Bell, bg: "#CDECCF" },
                { title: "Emergency SOS Alert", desc: "Instant alert dispatch showing allergies and critical medical records.", icon: ShieldAlert, bg: "#FF8A80" },
                { title: "Health Passport", desc: "A secure repository of vaccine histories, visits, and clinical files.", icon: ClipboardList, bg: "#C9B6FF" }
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="glass-card glass-card-hover rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${f.bg}40` }}><Icon size={24} style={{ color: f.bg === '#FFE79A' ? '#FFB68A' : f.bg }} /></div>
                    <h3 className="text-xl font-bold text-[#5E5A66]">{f.title}</h3>
                    <p className="text-[#7E7A88] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="stages" className="bg-[#FFF6FB]/85 border-y border-[#FFF3F8] py-20 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs text-[#F48FB1] uppercase font-bold">Timeline</span>
                <h2 className="text-4xl font-bold text-[#5E5A66]">Every Stage of a Woman's Life</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 border-b border-[#FFB3D9]/20">
                {['teen', 'reproductive', 'pregnancy', 'motherhood', 'menopause', 'senior'].map(stage => (
                  <button
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                    className={`px-6 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeStage === stage ? 'bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white shadow-md' : 'bg-white border hover:bg-white/95'
                    }`}
                  >
                    {stage.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="bg-white/80 border rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-[#5E5A66] mb-3 capitalize">{activeStage} Care Suite</h3>
                <p className="text-[#7E7A88] leading-relaxed text-sm">
                  Sakhi adapts its core Health Twin calculations to match this biological timeline. Custom logs for prenatal folic acid during pregnancy or hot-flash logs for menopause load automatically on the user dashboard.
                </p>
              </div>
            </div>
          </section>

          <footer className="border-t border-[#FFF3F8] py-12 px-6 text-center text-xs text-[#A09BAA]">
            © {new Date().getFullYear()} Sakhi AI. Renders wellness metrics. Not a replacement for clinical diagnosis.
          </footer>
        </div>
      )}

      {/* --- AUTHENTICATION SCREEN --- */}
      {view === 'auth' && (
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-md bg-[#FFF6FB] border border-white/60 rounded-3xl p-8 shadow-xl space-y-6 relative">
            <button onClick={() => setView('landing')} className="absolute top-4 right-4 p-2 text-[#7E7A88] hover:text-[#FF8A80]"><X size={20} /></button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] rounded-2xl flex items-center justify-center mx-auto shadow-sm"><Flower className="text-white" size={24} /></div>
              <h2 className="text-3xl font-bold text-[#5E5A66]">{isRegister ? 'Register' : 'Login'}</h2>
              <p className="text-xs text-[#7E7A88]">Enter details to setup your health companion profile.</p>
            </div>
            {authError && <div className="bg-[#FF8A80]/15 text-[#FF8A80] p-3 rounded-xl text-xs text-center border border-[#FF8A80]/30 font-semibold">{authError}</div>}
            <form onSubmit={handleAuth} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">Name</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Full Name" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">Email</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#7E7A88] mb-1">Password</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/70 border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md">
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </form>
            <div className="text-center">
              <button onClick={() => { setIsRegister(!isRegister); setAuthError(''); }} className="text-xs text-[#F48FB1] hover:underline">
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
              </button>
            </div>
            <button onClick={() => { handleMockLogin(); setView('dashboard'); }} className="w-full bg-white border text-[#7E7A88] hover:text-[#5E5A66] py-3 rounded-2xl text-[10px] font-bold shadow-sm">
              {t("Demo Hackathon Quick Access (Log in as Aditi)")}
            </button>
          </div>
        </div>
      )}

      {/* --- ONBOARDING: DIGITAL HEALTH TWIN SETUP --- */}
      {view === 'onboarding' && (
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-lg bg-[#FFF6FB] border rounded-3xl p-8 shadow-xl space-y-6">
            <div className="text-center">
              <span className="text-xs text-[#F48FB1] uppercase font-bold tracking-wider">Step {onboardStep} of 3</span>
              <h2 className="text-3xl font-bold font-sans text-[#5E5A66] mt-1">Setup Health Twin</h2>
            </div>
            
            <form onSubmit={handleOnboardingSubmit} className="space-y-4 text-xs font-semibold text-[#7E7A88]">
              {onboardStep === 1 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">Biological Attributes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Age</label>
                      <input type="number" value={onboardForm.age} onChange={(e) => setOnboardForm({...onboardForm, age: parseInt(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">Blood Group</label>
                      <input type="text" value={onboardForm.blood_group} onChange={(e) => setOnboardForm({...onboardForm, blood_group: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">Height (cm)</label>
                      <input type="number" value={onboardForm.height} onChange={(e) => setOnboardForm({...onboardForm, height: parseFloat(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">Weight (kg)</label>
                      <input type="number" value={onboardForm.weight} onChange={(e) => setOnboardForm({...onboardForm, weight: parseFloat(e.target.value)})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                  </div>
                  <button type="button" onClick={() => setOnboardStep(2)} className="w-full bg-[#FF8A80] text-white py-3 rounded-2xl font-bold mt-4">Next Step</button>
                </div>
              )}

              {onboardStep === 2 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">Medical Markers</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block mb-1">Allergies</label>
                      <input type="text" value={onboardForm.allergies} onChange={(e) => setOnboardForm({...onboardForm, allergies: e.target.value})} placeholder="e.g. Gluten sensitive, Dust" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1">Existing Conditions</label>
                      <input type="text" value={onboardForm.conditions} onChange={(e) => setOnboardForm({...onboardForm, conditions: e.target.value})} placeholder="e.g. PCOS, Thyroid" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={onboardForm.pregnancy} onChange={(e) => setOnboardForm({...onboardForm, pregnancy: e.target.checked})} className="rounded text-[#FF8A80]" /> Pregnant</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={onboardForm.menopause} onChange={(e) => setOnboardForm({...onboardForm, menopause: e.target.checked})} className="rounded text-[#FF8A80]" /> Menopause</label>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setOnboardStep(1)} className="w-1/2 bg-white border py-3 rounded-2xl font-bold">Back</button>
                    <button type="button" onClick={() => setOnboardStep(3)} className="w-1/2 bg-[#FF8A80] text-white py-3 rounded-2xl font-bold">Next Step</button>
                  </div>
                </div>
              )}

              {onboardStep === 3 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b pb-1 text-[#5E5A66]">Goals & Lifestyle</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block mb-1">Lifestyle Level</label>
                      <select value={onboardForm.lifestyle} onChange={(e) => setOnboardForm({...onboardForm, lifestyle: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none">
                        <option value="Sedentary">Sedentary</option>
                        <option value="Moderately Active">Moderately Active</option>
                        <option value="Highly Active">Highly Active</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Fitness Goals</label>
                      <input type="text" value={onboardForm.goals} onChange={(e) => setOnboardForm({...onboardForm, goals: e.target.value})} placeholder="e.g. Lose weight, improve iron levels" className="w-full bg-white border rounded-xl px-3 py-2 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setOnboardStep(2)} className="w-1/2 bg-white border py-3 rounded-2xl font-bold">Back</button>
                    <button type="submit" className="w-1/2 bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white py-3 rounded-2xl font-bold">Complete Setup</button>
                  </div>
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
            <div className="space-y-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white" size={18} /></div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#FF8A80] to-[#F48FB1] bg-clip-text text-transparent font-sans">{t("Sakhi")}</span>
              </div>
              <nav className="flex flex-col gap-1.5">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Activity },
                  { id: 'insights', label: 'Health Insights', icon: Sparkles },
                  { id: 'chat', label: 'Sakhi AI Chat', icon: MessageSquare },
                  { id: 'tracker', label: 'Menstrual Tracker', icon: Calendar },
                  { id: 'nutrition', label: 'AI Meal Scanner', icon: Apple },
                  { id: 'reports', label: 'Report Analyzer', icon: FileText },
                  { id: 'passport', label: 'Health Passport', icon: ClipboardList },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        view === item.id 
                          ? 'bg-[#FF8A80]/15 text-[#FF8A80] border-l-4 border-[#FF8A80]'
                          : 'text-[#7E7A88] hover:bg-[#FFF3F8]/30 hover:text-[#5E5A66]'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{t(item.label)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-[#FFB3D9]/20 pt-6 space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-[#FFE79A] flex items-center justify-center font-bold text-xs">{profile?.name ? profile.name[0] : 'A'}</div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-[11px] truncate">{profile?.name || 'Aditi Sharma'}</h4>
                  <span className="text-[9px] text-[#A09BAA] block truncate">{user?.email}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left text-xs font-bold text-[#FF8A80] hover:underline px-2">{t("Log Out")}</button>
            </div>
          </aside>

          {/* Bottom mobile Nav */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FFF6FB]/95 border-t border-[#FFF3F8] px-4 py-2 z-40 flex justify-around">
            {[
              { id: 'dashboard', label: 'Home', icon: Activity },
              { id: 'insights', label: 'Insights', icon: Sparkles },
              { id: 'tracker', label: 'Cycle', icon: Calendar },
              { id: 'passport', label: 'Passport', icon: ClipboardList }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setView(item.id)} className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl ${view === item.id ? 'text-[#FF8A80]' : 'text-[#A09BAA]'}`}>
                  <Icon size={18} />
                  <span className="text-[9px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Container */}
          <main className="flex-grow p-6 lg:p-10 pb-24 lg:pb-10 overflow-y-auto">
            
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-[#FFF3F8]/30 pb-4">
              <div>
                <span className="text-[10px] text-[#A09BAA] uppercase font-bold tracking-wider">{t("Health Twin Active")}</span>
                <h1 className="text-3xl font-bold font-sans text-[#5E5A66] mt-0.5">
                  {lang !== 'en' ? `नमस्ते, ${profile?.name || 'अदिति'} 🌸` : `${t("Good Morning, Aditi!")}`}
                </h1>
              </div>
              <div className="flex items-center gap-4 relative">
                {/* 🌐 Regional Indian Languages Dropdown on Dashboard Header 🌐 */}
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

                <button onClick={handleSOS} className="bg-[#FF8A80]/15 hover:bg-[#FF8A80]/20 border border-[#FF8A80]/40 text-[#FF8A80] font-bold px-4 py-2 rounded-2xl text-[10px] tracking-wider uppercase">🚨 SOS</button>
                <button onClick={() => setNotificationOpen(!notificationOpen)} className="w-10 h-10 rounded-2xl bg-white border flex items-center justify-center text-[#7E7A88] hover:text-[#5E5A66] shadow-sm relative">
                  <Bell size={18} />
                  {dashboardData?.notifications?.some(n => !n.seen) && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF8A80]"></span>}
                </button>
                {notificationOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-white border rounded-3xl p-5 shadow-xl z-50 space-y-4">
                    <h3 className="font-bold border-b pb-2 flex justify-between items-center"><span>Alerts & Notifications</span><button onClick={() => setNotificationOpen(false)} className="text-[#A09BAA]"><X size={16} /></button></h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {dashboardData?.notifications?.map(notif => (
                        <div key={notif.id} className="bg-[#FFF6FB] border border-[#FFF6FB] rounded-2xl p-3 text-xs space-y-1">
                          <span className="font-bold text-[#5E5A66] block">{notif.title}</span>
                          <span className="text-[#7E7A88] leading-relaxed block">{notif.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* --- PANEL 1: DASHBOARD VIEW PANEL --- */}
            {view === 'dashboard' && dashboardData && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Daily AI Welcome Summary */}
                <div className="bg-gradient-to-r from-[#FFF6FB] to-[#FFF9EC] border border-[#FFB3D9]/20 rounded-3xl p-6 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FFE79A]/15 rounded-full"></div>
                  <span className="inline-flex items-center gap-1 bg-[#FFE79A]/50 text-[#7E7A88] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    <Sparkles size={10} /> {t("Daily AI Welcome Summary")}
                  </span>
                  <p className="text-xs text-[#7E7A88] leading-relaxed max-w-2xl font-medium">
                    "Good Morning Aditi 🌸. Your Wellness Score is at <strong className="text-[#F48FB1]">{dashboardData.wellness_score}%</strong> today. You logged adequate sleep of {dashboardData.today_metrics.sleep} hours, but your water intake was low yesterday. Remember to log at least 2.5L today. Take your Iron tablet scheduled at 8 PM. Have a beautiful day! ❤️"
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Wellness Circle Card */}
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
                    <p className="text-xs text-[#7E7A88] italic px-2">Hydration, sleep hours, stress logs, and medical compliance are optimal.</p>
                    <svg width="0" height="0"><defs><linearGradient id="wellness-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF8A80" /><stop offset="100%" stopColor="#FFB3D9" /></linearGradient></defs></svg>
                  </div>

                  {/* Recommendations */}
                  <div className="lg:col-span-8 bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                    <h3 className="text-xl font-bold text-[#5E5A66]">{t("Weekly Recommendations")}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {dashboardData.recommendations.map((rec, idx) => (
                        <div key={idx} className="bg-white/80 border rounded-2xl p-4 shadow-sm space-y-2 relative overflow-hidden">
                          <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${rec.priority === 'High' ? 'bg-[#FF8A80]/20 text-[#FF8A80]' : 'bg-[#D9C7FF]/40 text-[#5E5A66]'}`}>{rec.priority}</span>
                          <span className="text-[10px] text-[#A09BAA] font-semibold">{rec.category}</span>
                          <h4 className="font-bold text-sm text-[#5E5A66]">{rec.title}</h4>
                          <p className="text-xs text-[#7E7A88] leading-relaxed">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Health Goals & Badges */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Goals */}
                  <div className="lg:col-span-7 bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                      <span>🎯 Health Targets Checklist</span>
                      <span className="text-xs text-[#A09BAA] font-semibold">Active Targets</span>
                    </h3>
                    <div className="space-y-4">
                      {goals.map(g => (
                        <div key={g.id} className="space-y-1.5 bg-[#FFF6FB] border rounded-2xl p-4">
                          <div className="flex justify-between items-center text-xs font-bold text-[#5E5A66]">
                            <span>{g.title}</span>
                            <span>{g.current} / {g.target} {g.unit}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-grow h-2.5 bg-white border rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] h-full" style={{ width: `${Math.min((g.current / g.target) * 100, 100)}%` }}></div>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => handleProgressGoal(g.id, g.unit === 'L' ? -0.25 : g.unit === 'h' ? -0.5 : -500)} className="w-7 h-7 rounded-lg border bg-white flex items-center justify-center font-bold text-xs">-</button>
                              <button onClick={() => handleProgressGoal(g.id, g.unit === 'L' ? 0.25 : g.unit === 'h' ? 0.5 : 500)} className="w-7 h-7 rounded-lg bg-[#FFB68A]/35 flex items-center justify-center font-bold text-xs">+</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF6FB] to-[#FFF9EC] border rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b border-[#FFB3D9]/20 pb-2 flex items-center gap-2">
                        <Award size={20} className="text-[#FFB68A]" /> Gamification & Streaks
                      </h3>
                      <p className="text-xs text-[#7E7A88] mt-1">Unlock badges by logging your daily routines regularly!</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {badges.map((b, i) => (
                        <div key={i} className={`p-3 rounded-2xl border text-center space-y-1.5 relative overflow-hidden transition-all ${
                          b.unlocked ? 'bg-white border-[#FFE79A]/80 shadow-sm' : 'bg-white/40 border-dashed opacity-60'
                        }`}>
                          <span className="text-2xl block">{b.icon}</span>
                          <span className="text-[10px] font-bold text-[#5E5A66] block truncate">{b.name}</span>
                          <span className="text-[8px] text-[#A09BAA] block leading-snug">{b.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Pregnancy care suite */}
                {profile?.pregnancy && pregnancyDetails && (
                  <div className="bg-[#FFF6FB] border border-[#FF8A80]/30 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#FF8A80] border-b border-[#FF8A80]/20 pb-2 flex items-center gap-2">
                      🤰 Pregnancy Companion Suite
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-2">
                        <span className="text-4xl block">🥭</span>
                        <h4 className="font-bold text-sm">Baby Development Status</h4>
                        <span className="text-xs text-[#7E7A88] block">Week 19 (Size of a mango)</span>
                      </div>
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-3">
                        <span className="text-4xl block">👣</span>
                        <h4 className="font-bold text-sm">Fetal Kick Counter</h4>
                        <span className="text-lg font-bold text-[#FF8A80] block">{pregnancyDetails.kicksToday} Kicks today</span>
                        <button onClick={handleLogKick} className="bg-[#FF8A80]/25 text-[#FF8A80] hover:bg-[#FF8A80]/35 px-4 py-1.5 rounded-xl text-xs font-bold transition-all">Log Kick</button>
                      </div>
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-2">
                        <span className="text-4xl block">⚖️</span>
                        <h4 className="font-bold text-sm">Weight Tracking Tracker</h4>
                        <span className="text-xs text-[#7E7A88] block">Last logged: 58.5 kg</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Menopause care suite */}
                {profile?.menopause && menopauseDetails && (
                  <div className="bg-[#FFF9EC] border border-[#FFB68A]/30 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#FFB68A] border-b border-[#FFB68A]/20 pb-2 flex items-center gap-2">
                      🍂 Menopause Companion Suite
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-3">
                        <span className="text-4xl block">🥵</span>
                        <h4 className="font-bold text-sm">Hot Flash logs</h4>
                        <span className="text-lg font-bold text-[#FFB68A] block">{menopauseDetails.hotFlashesToday} Logs today</span>
                        <button onClick={handleLogHotFlash} className="bg-[#FFB68A]/25 text-[#FFB68A] hover:bg-[#FFB68A]/35 px-4 py-1.5 rounded-xl text-xs font-bold transition-all">Log Hot Flash</button>
                      </div>
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-2">
                        <span className="text-4xl block">🥛</span>
                        <h4 className="font-bold text-sm">Calcium & Bone Health</h4>
                        <span className="text-xs text-[#7E7A88] block">Today's Intake: {menopauseDetails.calciumLogs} mg / 1200 mg</span>
                      </div>
                      <div className="bg-white border rounded-2xl p-4 text-center space-y-2">
                        <span className="text-4xl block">💊</span>
                        <h4 className="font-bold text-sm">Symptom Trackers</h4>
                        <span className="text-xs text-[#7E7A88] block">{menopauseDetails.symptoms.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* HEALTH OVERVIEW INPUT WIDGETS */}
                <h3 className="text-xl font-bold font-sans text-[#5E5A66] border-b pb-1">Health Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Water Card */}
                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Water Intake")}</span><span className="text-lg">💧</span></div>
                    <div className="text-center py-2"><span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.today_metrics.water}L</span><span className="text-xs text-[#A09BAA] block">Goal: 2.5 Liters</span></div>
                    <div className="h-6 bg-[#AEE7FF]/10 rounded-full overflow-hidden border flex">
                      <div className="bg-gradient-to-r from-[#AEE7FF] to-[#C9B6FF] h-full transition-all duration-500" style={{ width: `${Math.min((dashboardData.today_metrics.water / 2.5) * 100, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleUpdateWater(-0.25)} className="w-10 h-10 rounded-full border hover:bg-[#FFF6FB] flex items-center justify-center font-bold">-</button>
                      <button onClick={() => handleUpdateWater(0.25)} className="w-10 h-10 rounded-full bg-[#AEE7FF]/40 hover:opacity-90 flex items-center justify-center font-bold">+</button>
                    </div>
                  </div>

                  {/* Sleep Card */}
                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Sleep Quality")}</span><span className="text-lg">🌙</span></div>
                    <div className="text-center py-2">
                      <span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.today_metrics.sleep}h</span>
                      <span className="text-xs text-[#B9F4D0] font-bold bg-[#B9F4D0]/30 px-2 py-0.5 rounded-full inline-block mt-1">{dashboardData.today_metrics.sleep_quality} Quality</span>
                    </div>
                    <p className="text-xs text-[#7E7A88] text-center italic">Consistent sleeping patterns help regulate hormones.</p>
                  </div>

                  {/* Exercise steps */}
                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Exercise")}</span><span className="text-lg">👟</span></div>
                    <div className="text-center py-2"><span className="text-3xl font-extrabold text-[#5E5A66] font-sans">{dashboardData.today_metrics.steps}</span><span className="text-xs text-[#A09BAA] block mt-1">{dashboardData.today_metrics.calories} kcal burned</span></div>
                    <div className="h-6 bg-[#CDECCF]/10 rounded-full overflow-hidden border">
                      <div className="bg-gradient-to-r from-[#B9F4D0] to-[#CDECCF] h-full transition-all" style={{ width: `${Math.min((dashboardData.today_metrics.steps / 10000) * 100, 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] text-[#A09BAA] text-center">Goal: 10,000 steps</p>
                  </div>

                  {/* Cycle tracker */}
                  <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start"><span className="text-xs text-[#A09BAA] font-bold uppercase">{t("Cycle Tracker")}</span><span className="text-lg">🌸</span></div>
                    <div className="text-center py-2"><span className="text-3xl font-extrabold text-[#5E5A66] font-sans">Day {dashboardData.today_metrics.cycle_day}</span><span className="text-xs text-[#FFB3D9] font-bold bg-[#FFB3D9]/20 px-2 py-0.5 rounded-full inline-block mt-1">Follicular</span></div>
                    <div className="text-center">
                      <span className="text-xs text-[#7E7A88] block">Next period: 4 days</span>
                      <button onClick={() => setView('tracker')} className="text-xs text-[#F48FB1] hover:underline mt-1 font-bold">Details Calendar →</button>
                    </div>
                  </div>

                </div>

                {/* BOTTOM ROW: LOGGERS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Quick log widgets */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Vibe Logger Form */}
                    <div className="bg-[#FFF6FB] border border-white rounded-3xl p-6 shadow-sm">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b border-[#FFB3D9]/25 pb-2 mb-4 flex items-center justify-between gap-2">
                        <span>🧘‍♀️ {t("Log Your Vibe")}</span>
                        <button type="button" onClick={() => setBreathingActive(!breathingActive)} className={`text-[10px] px-3 py-1.5 rounded-xl font-bold border ${breathingActive ? 'bg-[#C9B6FF]/35 border-[#C9B6FF]' : 'bg-white text-[#7E7A88]'}`}>
                          {breathingActive ? 'Stop Breath Coach' : '🌬️ 4-7-8 Breath Coach'}
                        </button>
                      </h3>
                      
                      {breathingActive ? (
                        <div className="flex flex-col items-center justify-center py-6 space-y-5 animate-pulse">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFB3D9] to-[#C9B6FF] flex items-center justify-center text-white font-extrabold text-xs shadow-lg border-4 border-white transition-transform duration-1000" style={{ transform: `scale(${breathingScale})` }}>
                            <span className="drop-shadow-sm font-sans">{breathingText}</span>
                          </div>
                          <p className="text-[11px] text-[#7E7A88] text-center max-w-xs leading-relaxed">Follow the expanding circle. Inhale (4s), Hold (4s), Exhale (4s) to reduce stress levels.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleLogMood} className="space-y-4">
                          <div className="grid grid-cols-6 gap-2">
                            {['Happy', 'Calm', 'Energetic', 'Tired', 'Anxious', 'Irritable'].map(mood => (
                              <button type="button" key={mood} onClick={() => setLogMoodStr(mood)} className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs gap-1.5 ${logMoodStr === mood ? 'bg-[#FFB3D9]/40 border-[#F48FB1] scale-105 shadow-sm' : 'bg-white text-[#7E7A88]'}`}>
                                <span className="text-2xl">{getMoodEmoji(mood)}</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider">{mood}</span>
                              </button>
                            ))}
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-[#7E7A88] font-bold flex justify-between"><span>Stress Level</span><span className="text-[#FF8A80]">{logStressLevel} / 10</span></label>
                            <input type="range" min="1" max="10" value={logStressLevel} onChange={(e) => setLogStressLevel(parseInt(e.target.value))} className="w-full accent-[#FF8A80] h-2 bg-white rounded-lg appearance-none cursor-pointer" />
                          </div>
                          <input type="text" value={logMoodNotes} onChange={(e) => setLogMoodNotes(e.target.value)} placeholder="Optional: How did you sleep? Any sweet cravings?" className="w-full bg-white border px-4 py-2.5 rounded-xl text-xs" />
                          <button type="submit" className="bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white px-5 py-2.5 rounded-2xl text-xs font-semibold shadow-sm w-full sm:w-auto">Log Daily Vibe</button>
                        </form>
                      )}
                    </div>

                    {/* Active Medicine Checklist */}
                    <div className="bg-white border border-[#FFF6FB] rounded-3xl p-6 shadow-sm">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 mb-4 flex justify-between items-center">
                        <span>💊 {t("Today's Medicine Checklist")}</span>
                      </h3>
                      <div className="space-y-3">
                        {dashboardData.medicines.map(med => (
                          <div key={med.id} onClick={() => handleToggleMed(med.id)} className="bg-[#FFF6FB] border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-[#FFB3D9] transition-all">
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${med.taken ? 'bg-[#B9F4D0] border-[#B9F4D0]' : 'border-[#FFB3D9]/60'}`}>{med.taken && <Check size={14} />}</div>
                              <div>
                                <span className={`font-semibold text-sm block ${med.taken ? 'line-through text-[#A09BAA]' : 'text-[#5E5A66]'}`}>{med.medicine_name}</span>
                                <span className="text-[10px] text-[#A09BAA]">{med.dosage}</span>
                              </div>
                            </div>
                            <span className="text-xs text-[#A09BAA] flex items-center gap-1"><Clock size={12} /> {med.scheduled_time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Reminders & Forms */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Sleep Logs */}
                    <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                        <span>🛏️ Log Sleep Hours</span>
                        <span className="text-[9px] bg-[#C9B6FF]/30 px-2 py-0.5 rounded-full text-[#7E7A88] font-bold">Goal Tracker</span>
                      </h3>
                      <form onSubmit={handleLogSleep} className="space-y-3 text-xs font-semibold text-[#7E7A88]">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block mb-1">Hours slept</label>
                            <input type="number" step="0.1" value={sleepHours} onChange={(e) => setSleepHours(parseFloat(e.target.value))} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" />
                          </div>
                          <div>
                            <label className="block mb-1">Quality</label>
                            <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2">
                              <option value="Excellent">Excellent</option>
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Poor">Poor</option>
                            </select>
                          </div>
                          <div><label className="block mb-1">Bedtime</label><input type="text" value={sleepBedtime} onChange={(e) => setSleepBedtime(e.target.value)} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                          <div><label className="block mb-1">Wake Time</label><input type="text" value={sleepWaketime} onChange={(e) => setSleepWaketime(e.target.value)} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                        </div>
                        <button type="submit" className="bg-[#C9B6FF] hover:bg-[#C9B6FF]/90 text-white font-bold py-2 px-4 rounded-xl">Save Sleep</button>
                      </form>
                    </div>

                    {/* Physical Activity Log */}
                    <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                        <span>🏃‍♂️ Log Physical Exercise</span>
                      </h3>
                      <form onSubmit={handleLogActivity} className="space-y-3 text-xs font-semibold text-[#7E7A88]">
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="block mb-1">Steps count</label><input type="number" value={actSteps} onChange={(e) => setActSteps(parseInt(e.target.value))} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                          <div><label className="block mb-1">Calories burned</label><input type="number" value={actCal} onChange={(e) => setActCal(parseInt(e.target.value))} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                          <div><label className="block mb-1">Workout Type</label><input type="text" value={actType} onChange={(e) => setActType(e.target.value)} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                          <div><label className="block mb-1">Duration (mins)</label><input type="number" value={actDuration} onChange={(e) => setActDuration(parseInt(e.target.value))} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2" /></div>
                        </div>
                        <button type="submit" className="bg-[#B9F4D0] hover:bg-[#B9F4D0]/90 text-[#5E5A66] font-bold py-2 px-4 rounded-xl">Save Exercise</button>
                      </form>
                    </div>

                    {/* Reminders */}
                    <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm">
                      <h3 className="font-bold text-lg text-[#5E5A66] border-b border-[#FFB68A]/30 pb-2 mb-4 flex items-center gap-2"><span>🔔</span> {t("Smart Reminders")}</h3>
                      <div className="space-y-3">
                        {dashboardData.reminders.map((rem, idx) => (
                          <div key={idx} className="bg-white/80 border rounded-2xl p-3 text-xs flex justify-between items-start">
                            <div><span className="font-bold text-[#5E5A66] block">{rem.title}</span><span className="text-[#7E7A88] block mt-0.5">{rem.message}</span></div>
                            <span className="text-[9px] bg-[#FF8A80]/10 text-[#FF8A80] px-2 py-0.5 rounded-full font-bold">{rem.category}</span>
                          </div>
                        ))}
                      </div>
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
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] flex items-center justify-center shadow-sm"><Flower className="text-white animate-bounce" size={20} /></div>
                    <div><h2 className="font-bold text-lg text-[#5E5A66]">Sakhi AI Companion</h2><span className="text-xs text-[#B9F4D0] font-bold">Online & Active</span></div>
                  </div>
                </div>
                <div className="bg-[#FFF9EC]/60 px-6 py-2 border-b overflow-x-auto flex gap-2">
                  {["My period is late.", "Explain my glucose levels.", "Nutrients during early pregnancy.", "Anti-inflammatory foods for PCOS."].map((prompt, idx) => (
                    <button key={idx} onClick={() => handleQuickPrompt(prompt)} className="bg-white border text-[#7E7A88] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">{prompt}</button>
                  ))}
                </div>
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`w-full max-w-[75%] rounded-3xl p-4 text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#FF8A80] text-white rounded-tr-none' : 'bg-[#FFF6FB] text-[#5E5A66] rounded-tl-none'}`}>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && <div className="flex justify-start"><div className="bg-[#FFF6FB] rounded-3xl rounded-tl-none p-4 text-xs text-[#A09BAA] flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#A09BAA] animate-bounce"></span><span className="w-1.5 h-1.5 rounded-full bg-[#A09BAA] animate-bounce" style={{ animationDelay: '0.2s' }}></span><span className="w-1.5 h-1.5 rounded-full bg-[#A09BAA] animate-bounce" style={{ animationDelay: '0.4s' }}></span></div></div>}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-3">
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about PCOS, delay, reports..." className="flex-grow bg-[#FFF8F6] border rounded-2xl px-4 py-3 text-xs focus:outline-none" />
                  <button type="submit" className="bg-[#FF8A80] text-white w-12 h-12 rounded-2xl flex items-center justify-center"><Send size={18} /></button>
                </form>
              </div>
            )}

            {/* --- PANEL 3: NUTRITION & MEAL SCANNER --- */}
            {view === 'nutrition' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">AI Meal Scanner</h2>
                  <p className="text-xs text-[#7E7A88] mt-2">Snap a picture of your plate. Gemini Vision detects calories, proteins, and iron distributions.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
                    <div className="w-16 h-16 bg-[#FFE79A]/30 rounded-2xl flex items-center justify-center text-[#FFB68A] mb-4"><Apple size={32} /></div>
                    <label className="bg-[#FFB68A]/20 text-[#5E5A66] hover:bg-[#FFB68A]/30 px-6 py-3 rounded-2xl text-xs font-bold cursor-pointer">
                      Upload Meal Image
                      <input type="file" accept="image/*" onChange={handleMealScan} className="hidden" />
                    </label>
                    {mealScanning && <div className="mt-4 flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-[#FFB68A]" /><span className="text-xs text-[#A09BAA]">Analyzing nutrition with Gemini Vision...</span></div>}
                  </div>
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm">
                    {mealAnalysis ? (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-[#5E5A66]">{mealAnalysis.food_name} ({mealAnalysis.calories} kcal)</h3>
                        <div className="space-y-3">
                          {[['Protein', mealAnalysis.protein, 45, '#B9F4D0'], ['Iron', mealAnalysis.iron, 15, '#FF8A80'], ['Fiber', mealAnalysis.fiber, 25, '#CDECCF']].map(([lbl, val, tar, col]) => (
                            <div key={lbl} className="space-y-1 text-xs">
                              <div className="flex justify-between font-bold"><span>{lbl}</span><span>{val}g / {tar}g target</span></div>
                              <div className="h-2 bg-[#FFF9EC] rounded-full overflow-hidden border"><div className="h-full" style={{ backgroundColor: col, width: `${Math.min((val / tar) * 100, 100)}%` }}></div></div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-[#FFF9EC] border rounded-2xl p-4 text-xs space-y-1"><span className="font-bold block">AI Coach Advice</span><p>{mealAnalysis.suggestions}</p></div>
                      </div>
                    ) : <p className="text-xs text-[#A09BAA] text-center italic py-12">Upload a meal image to extract nutrient analytics.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 4: BLOOD REPORT ANALYZER --- */}
            {view === 'reports' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">Blood Report Analyzer</h2>
                  <p className="text-xs text-[#7E7A88] mt-2">Scan laboratory tests to extract and simplify thyroid, glucose, Vitamin D, and ferritin values.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
                    <div className="w-16 h-16 bg-[#FFB3D9]/30 rounded-2xl flex items-center justify-center text-[#F48FB1] mb-4"><FileText size={32} /></div>
                    <label className="bg-[#F48FB1]/20 text-[#5E5A66] hover:bg-[#F48FB1]/30 px-6 py-3 rounded-2xl text-xs font-bold cursor-pointer">
                      Upload Laboratory Document
                      <input type="file" accept="image/*,application/pdf" onChange={handleReportScan} className="hidden" />
                    </label>
                    {reportScanning && <div className="mt-4 flex flex-col items-center gap-2"><RefreshCw className="animate-spin text-[#F48FB1]" /><span className="text-xs text-[#A09BAA]">Parsing report text with Gemini Vision...</span></div>}
                  </div>
                  <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm">
                    {reportAnalysis ? (
                      <div className="space-y-5">
                        <p className="text-xs text-[#7E7A88] leading-relaxed">{reportAnalysis.summary}</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[['Iron / Ferritin', reportAnalysis.iron_level], ['Vitamin D3', reportAnalysis.vitamin_d_level], ['Thyroid (TSH)', reportAnalysis.thyroid_level], ['Glucose', reportAnalysis.sugar_level]].map(([lbl, val]) => (
                            <div key={lbl} className="bg-[#FFF6FB] border rounded-2xl p-4 text-xs"><span className="text-[#A09BAA] block uppercase font-bold">{lbl}</span><span className="font-bold text-sm block mt-1">{val}</span></div>
                          ))}
                        </div>
                        {reportAnalysis.warnings?.length > 0 && (
                          <div className="bg-[#FF8A80]/15 border border-[#FF8A80]/30 rounded-2xl p-4 space-y-1"><span className="text-xs font-bold text-[#FF8A80] flex items-center gap-1.5"><AlertTriangle size={14} /> Attention Needed</span><ul className="list-disc pl-4 text-xs text-[#7E7A88] space-y-1">{reportAnalysis.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
                        )}
                      </div>
                    ) : <p className="text-xs text-[#A09BAA] text-center italic py-12">Upload a laboratory report file to parse wellness markers.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* --- PANEL 5: MENSTRUAL CYCLE CALENDAR & TRACKER --- */}
            {view === 'tracker' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#5E5A66]">Cycle Calendar & Logs</h2>
                    <span className="text-xs text-[#FFB3D9] font-bold bg-[#FFB3D9]/20 px-2 py-0.5 rounded-full inline-block mt-2">Day 12 Follicular Phase</span>
                  </div>
                  <div className="flex gap-2"><span className="bg-[#FF8A80]/20 text-[#5E5A66] px-3.5 py-1.5 rounded-full text-xs font-semibold">Predicted Period: 4 Days left</span></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-white border rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-[#5E5A66] mb-4">July 2026</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#A09BAA] uppercase mb-2">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-xs text-[#5E5A66]">
                      <span></span><span></span><span></span>
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        let bgClass = "bg-white border hover:bg-[#FFF6FB]";
                        let borderClass = "";
                        if (day >= 13 && day <= 17) { bgClass = "bg-[#FF8A80]/20 text-[#5E5A66] font-bold"; borderClass = "border-[#FF8A80]"; }
                        if (day === 11) { bgClass = "bg-[#C9B6FF]/35 text-[#5E5A66] font-bold"; }
                        if (day === 9) { bgClass = "bg-gradient-to-tr from-[#FF8A80] to-[#FFB3D9] text-white font-bold"; borderClass = "border-transparent"; }
                        return <div key={day} className={`h-10 sm:h-12 rounded-xl flex items-center justify-center transition-colors border ${bgClass} ${borderClass}`}>{day}</div>;
                      })}
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-base text-[#5E5A66]">Log Flow & Pain</h3>
                    <form onSubmit={(e) => { e.preventDefault(); api.logCycle('Medium', 'Mild', 'Happy', 'None'); fetchDashboardData(); alert("Cycle parameters saved!"); }} className="space-y-4 text-xs font-semibold">
                      <div><label className="block mb-1 text-[#7E7A88]">Flow</label><div className="grid grid-cols-2 gap-2">{['Light', 'Medium', 'Heavy', 'Spotting'].map(f => <button type="button" key={f} className="bg-white border rounded-xl py-2 hover:border-[#FFB3D9]">{f}</button>)}</div></div>
                      <div><label className="block mb-1 text-[#7E7A88]">Cramps</label><div className="grid grid-cols-2 gap-2">{['None', 'Mild', 'Moderate', 'Severe'].map(c => <button type="button" key={c} className="bg-white border rounded-xl py-2 hover:border-[#FFB3D9]">{c}</button>)}</div></div>
                      <button type="submit" className="w-full bg-[#FF8A80] text-white py-3 rounded-2xl font-bold">Save Cycle Log</button>
                    </form>
                  </div>
                </div>

                {/* Hormonal forecaster */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-[#5E5A66]">Hormonal Phase & Training Forecaster</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cycleForecast?.map((phase, idx) => (
                      <div key={idx} className={`border rounded-2xl p-4 space-y-2 relative overflow-hidden ${phase.name.includes("Follicular") ? 'bg-[#FFB3D9]/10 border-[#FFB3D9] ring-2 ring-[#FFB3D9]/40' : 'bg-[#FFF6FB] border-white/60'}`}>
                        {phase.name.includes("Follicular") && <span className="absolute top-2 right-2 text-[9px] bg-[#FFB3D9] text-white px-2 py-0.5 rounded-full font-bold">Current</span>}
                        <h4 className="font-bold text-sm text-[#5E5A66]">{phase.name}</h4>
                        <div className="text-[10px] space-y-1 pt-1 font-semibold text-[#7E7A88]">
                          <div>Estrogen: {phase.estrogen}</div>
                          <div>Progesterone: {phase.progesterone}</div>
                          <div>Workout: {phase.workout}</div>
                          <div className="bg-white border p-2 rounded-xl mt-2 text-[9px]">Nutrition: {phase.nutrition}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PCOS screening */}
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#5E5A66]">PCOS Screening Tool</h3>
                    <button onClick={() => setPcosQuizOpen(!pcosQuizOpen)} className="bg-white border rounded-2xl px-4 py-2 text-xs font-bold">{pcosQuizOpen ? 'Close' : 'Start Screening'}</button>
                  </div>
                  {pcosQuizOpen && (
                    <div className="bg-white/60 rounded-2xl p-5 border space-y-4">
                      {pcosResult ? (
                        <div className="space-y-3 text-xs">
                          <h4 className="font-bold text-base">Assessment Result: <span className="text-[#FF8A80]">{pcosResult.risk_level} Correlation</span></h4>
                          <p className="text-[#7E7A88]">{pcosResult.recommendation}</p>
                          <button onClick={() => setPcosResult(null)} className="text-xs text-[#F48FB1] hover:underline font-bold">Retake Quiz</button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitPcosQuiz} className="space-y-4 text-xs font-semibold text-[#7E7A88]">
                          <div className="grid grid-cols-2 gap-4">
                            <div><label>Are cycles regular?</label><select value={pcosAnswers.periods} onChange={(e) => setPcosAnswers({...pcosAnswers, periods: e.target.value})} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2"><option value="regular">Regular</option><option value="irregular">Irregular/Missed</option></select></div>
                            <div><label>Excess facial/body hair?</label><select value={pcosAnswers.hair} onChange={(e) => setPcosAnswers({...pcosAnswers, hair: e.target.value})} className="w-full bg-[#FFF8F6] border rounded-xl px-3 py-2"><option value="no">No</option><option value="yes">Yes</option></select></div>
                          </div>
                          <button type="submit" className="bg-[#FF8A80] text-white px-5 py-2.5 rounded-xl font-bold">Analyze Symptoms</button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- PANEL 6: HEALTH PASSPORT --- */}
            {view === 'passport' && dashboardData && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#FFF9EC] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">Health Passport</h2>
                  <p className="text-xs text-[#7E7A88] mt-2">Unified record repository of vaccinations, visits, prescriptions, and scanned files.</p>
                </div>
                
                {/* Voice audio consult note */}
                <div className="bg-[#FFF6FB] border border-[#FFB3D9]/20 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-[#5E5A66] border-b pb-2 flex justify-between items-center">
                    <span>🎙️ Doctor Audio visit Recorder</span>
                    <span className="text-[10px] bg-[#C9B6FF]/30 px-2 py-0.5 rounded-full text-[#7E7A88] font-bold">AI Transcriber</span>
                  </h3>
                  <p className="text-xs text-[#7E7A88]">Record audio notes from your clinical consult. Gemini AI will automatically transcribe and summarize the doctor's key recommendations.</p>
                  <button onClick={handleRecordAudioNotes} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    recordingAudio ? 'bg-[#FF8A80] animate-pulse text-white' : 'bg-[#C9B6FF] hover:opacity-95 text-white'
                  }`}>
                    {recordingAudio ? '🔴 Recording Consultation (4s)...' : '🎙️ Record Doctor Visit'}
                  </button>
                </div>

                <div className="flex gap-4 border-b border-[#FFB3D9]/10 pb-2">
                  {['timeline', 'vaccines', 'prescriptions', 'audioConsults'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`text-xs font-bold py-1 px-4 rounded-full transition-all capitalize ${
                      activeTab === tab ? 'bg-gradient-to-r from-[#FF8A80] to-[#FFB68A] text-white shadow-sm' : 'text-[#7E7A88]'
                    }`}>{tab}</button>
                  ))}
                </div>

                {activeTab === 'timeline' && (
                  <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b pb-3">
                      <h3 className="font-bold text-lg text-[#5E5A66]">Chronological Timeline</h3>
                      <button onClick={handleGenerateDoctorReport} className="text-xs text-[#FF8A80] font-bold border border-[#FF8A80]/40 rounded-xl px-3.5 py-1.5 flex items-center gap-1.5">
                        {doctorReportLoading ? <RefreshCw className="animate-spin" size={12} /> : '📑'} 
                        {doctorReportLoading ? 'Compiling...' : 'Generate Doctor Report'}
                      </button>
                    </div>

                    {doctorReportText && (
                      <div className="bg-[#FFF9EC]/80 border border-[#FFD59A]/40 rounded-2xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-[10px] text-[#A09BAA] uppercase font-bold tracking-wider">Clinical Summary Worksheet</span>
                          <button onClick={() => setDoctorReportText('')} className="text-xs text-[#F48FB1] hover:underline font-bold">Close Report</button>
                        </div>
                        <pre className="text-xs font-mono text-[#5E5A66] whitespace-pre-wrap bg-white rounded-xl p-4 max-h-72 overflow-y-auto">{doctorReportText}</pre>
                      </div>
                    )}

                    <div className="relative border-l border-[#FFB3D9]/40 ml-4 space-y-8 py-2">
                      <div className="relative pl-8">
                        <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-[#FFE79A] border-4 border-white flex items-center justify-center text-xs">📅</span>
                        <div className="space-y-1">
                          <span className="text-xs text-[#A09BAA] font-semibold">Upcoming: July 15, 2026</span>
                          <h4 className="font-bold text-sm text-[#5E5A66]">Routine OB/GYN Consultation</h4>
                          <p className="text-xs text-[#7E7A88]">Dr. Meera Sen (Gynecologist). Notes: Routine checkup and discussion regarding cycle regularity.</p>
                        </div>
                      </div>
                      <div className="relative pl-8">
                        <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-[#FFB3D9] border-4 border-white flex items-center justify-center text-xs">📄</span>
                        <div className="space-y-1">
                          <span className="text-xs text-[#A09BAA] font-semibold">July 05, 2026</span>
                          <h4 className="font-bold text-sm text-[#5E5A66]">Blood Test Scan uploaded</h4>
                          <p className="text-xs text-[#7E7A88]">Vitamin D deficiency spotted (22 ng/mL). Mild iron deficit. Recommendations integrated into daily targets.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'vaccines' && (
                  <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66]">Vaccination Records</h3>
                    <div className="space-y-3 text-xs">
                      <div className="bg-[#FFF6FB] p-4 rounded-2xl flex justify-between"><div><span className="font-bold block">Tetanus Toxoid Vaccine Booster</span><span className="text-[#A09BAA]">Administered: June 10, 2026</span></div><span className="font-bold text-[#B9F4D0]">Completed</span></div>
                      <div className="bg-[#FFF6FB] p-4 rounded-2xl flex justify-between"><div><span className="font-bold block">HPV Vaccine Dose 2</span><span className="text-[#A09BAA]">Recommended Window: Dec 2026</span></div><span className="font-semibold text-[#FF8A80]">Upcoming</span></div>
                    </div>
                  </div>
                )}

                {activeTab === 'prescriptions' && (
                  <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66]">Prescription History</h3>
                    <div className="space-y-3 text-xs">
                      <div className="bg-[#FFF6FB] p-4 rounded-2xl border">
                        <span className="font-bold block">Dr. Meera Sen (Gynecologist) - June 15, 2026</span>
                        <p className="text-[#7E7A88] mt-1">Rx: Folic Acid 400mcg (1 Daily), Iron Supplement 17mg (1 Daily before bed)</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'audioConsults' && (
                  <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-lg text-[#5E5A66]">Consultation Audio Transcripts</h3>
                    <div className="space-y-3 text-xs">
                      {audioNotes.map(n => (
                        <div key={n.id} className="bg-[#FFF6FB] p-4 rounded-2xl border space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#5E5A66]">{n.doctor}</span>
                            <span className="text-[10px] text-[#A09BAA]">{n.date}</span>
                          </div>
                          <p className="text-[#7E7A88] leading-relaxed italic">"{n.summary}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --- PANEL 7: HEALTH INSIGHTS & RISKS --- */}
            {view === 'insights' && risks && (
              <div className="space-y-8 animate-fade-in">
                
                <div className="bg-[#FFF9EC] border border-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold font-sans text-[#5E5A66]">Health Insights & Risks</h2>
                  <p className="text-sm text-[#7E7A88] mt-2">A centralized analysis screen evaluating weekly summaries, areas to improve, and wellness risk markers.</p>
                </div>

                {/* Weekly AI Health Report */}
                <div className="bg-white border border-[#FFB3D9]/20 rounded-3xl p-6 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FFB3D9]/10 rounded-full"></div>
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">
                    <Sparkles size={20} className="text-[#F48FB1]" /> Weekly AI Health Report
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                    <div className="bg-[#FFF6FB] p-3 rounded-2xl text-center"><span className="text-[#A09BAA] block text-[9px] uppercase">Wellness Score</span><span className="text-lg font-bold text-[#FF8A80]">92% Excellent</span></div>
                    <div className="bg-[#FFF6FB] p-3 rounded-2xl text-center"><span className="text-[#A09BAA] block text-[9px] uppercase">Mood Progression</span><span className="text-lg font-bold text-[#FFB3D9]">😊 Improved</span></div>
                    <div className="bg-[#FFF6FB] p-3 rounded-2xl text-center"><span className="text-[#A09BAA] block text-[9px] uppercase">Water Level</span><span className="text-lg font-bold text-[#FF8A80]">💧 Low yesterday</span></div>
                    <div className="bg-[#FFF6FB] p-3 rounded-2xl text-center"><span className="text-[#A09BAA] block text-[9px] uppercase">Sleep quantity</span><span className="text-lg font-bold text-[#C9B6FF]">Excellent (8h)</span></div>
                  </div>
                  <div className="bg-[#FFF9EC] p-4 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-[#5E5A66] block">AI Recommendation:</span>
                    <p className="text-[#7E7A88] leading-relaxed">Your iron intake has been below targets for 2 days. We recommend adding dark leafy vegetables or sesame seeds to lunches to prevent fatigue.</p>
                  </div>
                </div>

                {/* Risk Predictors */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">
                    <span>🧬</span> Digital Health Twin Risk Predictions
                  </h3>
                  <p className="text-xs text-[#7E7A88]">Note: These predictions are wellness risk indicators based on logged metrics and are not clinical diagnoses.</p>
                  <div className="space-y-3">
                    {risks.map((r, i) => (
                      <div key={i} className="bg-[#FFF6FB] border rounded-2xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <span className="font-bold text-sm text-[#5E5A66] block">{r.name}</span>
                          <span className="text-xs text-[#7E7A88] block mt-0.5">{r.desc}</span>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block text-center ${
                          r.color === 'coral' ? 'bg-[#FF8A80]/20 text-[#FF8A80]' : r.color === 'orange' ? 'bg-[#FFD59A]/30 text-[#FFB68A]' : 'bg-[#B9F4D0] text-[#5E5A66]'
                        }`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* --- PANEL 8: SETTINGS --- */}
            {view === 'settings' && profile && (
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="bg-[#FFF6FB] border rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <h2 className="text-3xl font-bold text-[#5E5A66]">Settings & Accessibility</h2>
                  <p className="text-xs text-[#7E7A88] mt-1">Configure language, larger typography, and dashboard alerts toggles.</p>
                </div>

                {/* Accessibility */}
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2">
                    <ZoomIn size={20} className="text-[#F48FB1]" /> Accessibility Options
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#7E7A88]">
                    <div className="flex items-center justify-between p-4 bg-[#FFF6FB] rounded-2xl border">
                      <div>
                        <span className="font-bold text-sm text-[#5E5A66] block">Select Language</span>
                        <span className="text-[10px] text-[#A09BAA] block mt-0.5">Toggle regional localization</span>
                      </div>
                      <select 
                        value={lang} 
                        onChange={(e) => setLang(e.target.value)} 
                        className="bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold text-[#7E7A88] focus:outline-none shadow-sm cursor-pointer"
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
                    <div className="flex items-center justify-between p-4 bg-[#FFF6FB] rounded-2xl border">
                      <div>
                        <span className="font-bold text-sm text-[#5E5A66] block">Large Text Size</span>
                        <span className="text-[10px] text-[#A09BAA] block mt-0.5">Increase reading text height</span>
                      </div>
                      <input type="checkbox" checked={largeText} onChange={(e) => setLargeText(e.target.checked)} className="w-4 h-4 text-[#FF8A80]" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-lg text-[#5E5A66] border-b pb-2 flex items-center gap-2"><span>🧬</span> Update Health Twin Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-[#7E7A88]">
                    <div><label className="block mb-1.5 uppercase">Age</label><input type="number" value={profile.age || ''} onChange={(e) => handleUpdateProfile('age', parseInt(e.target.value))} className="w-full bg-[#FFF8F6] border px-4 py-2.5 rounded-xl text-sm" /></div>
                    <div><label className="block mb-1.5 uppercase">Weight (kg)</label><input type="number" value={profile.weight || ''} onChange={(e) => handleUpdateProfile('weight', parseFloat(e.target.value))} className="w-full bg-[#FFF8F6] border px-4 py-2.5 rounded-xl text-sm" /></div>
                    <div><label className="block mb-1.5 uppercase">Blood Group</label><input type="text" value={profile.blood_group || ''} onChange={(e) => handleUpdateProfile('blood_group', e.target.value)} className="w-full bg-[#FFF8F6] border px-4 py-2.5 rounded-xl text-sm" /></div>
                    <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={profile.pregnancy} onChange={(e) => handleUpdateProfile('pregnancy', e.target.checked)} className="w-4 h-4 text-[#FF8A80] rounded" /><label className="uppercase">Pregnant</label></div>
                    <div className="flex items-center gap-2 pt-2"><input type="checkbox" checked={profile.menopause} onChange={(e) => handleUpdateProfile('menopause', e.target.checked)} className="w-4 h-4 text-[#FF8A80] rounded" /><label className="uppercase">Menopause</label></div>
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
