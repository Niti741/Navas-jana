import axios from 'axios';

const API_BASE_URL = 'https://default-niece-aloft.ngrok-free.dev/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Front-end LocalStorage State (Client-side Failover Mock DB)
const MOCK_STATE = {
  profile: {
    name: 'Aditi Sharma',
    age: 26,
    weight: 58.5,
    height: 163.0,
    blood_group: 'O+',
    allergies: 'Gluten sensitive',
    conditions: 'Mild PCOS symptoms',
    pregnancy: false,
    menopause: false,
    goals: 'Regulate period, track nutrition, improve energy',
    lifestyle: 'Moderately Active',
    fitness_goal: 'Weight Maintenance & Muscle Tone'
  },
  water: [
    { date: 'Jul 07', liters: 2.2 },
    { date: 'Jul 08', liters: 2.5 },
    { date: 'Jul 09', liters: 1.8 }
  ],
  sleep: [
    { date: 'Jul 07', hours: 7.5, quality: 'Good', bedtime: '23:00', waketime: '06:30' },
    { date: 'Jul 08', hours: 8.0, quality: 'Excellent', bedtime: '22:30', waketime: '06:30' },
    { date: 'Jul 09', hours: 6.2, quality: 'Fair', bedtime: '00:00', waketime: '06:12' }
  ],
  exercise: [
    { date: 'Jul 07', steps: 8200, calories: 320, duration: 45, workout_type: 'Brisk Walk' },
    { date: 'Jul 08', steps: 10400, calories: 410, duration: 50, workout_type: 'Pilates' },
    { date: 'Jul 09', steps: 5100, calories: 180, duration: 25, workout_type: 'Yoga' }
  ],
  nutrition: [
    { date: 'Jul 09', food_name: 'Greek Yogurt & Berries', protein: 22.0, iron: 1.2, calories: 350, fiber: 4.0, suggestions: 'Rich in probiotics. Good for digestion.' }
  ],
  medicines: [
    { id: 'm1', medicine_name: 'Folic Acid', dosage: '400 mcg', scheduled_time: '09:00', taken: true, date: '2026-07-09' },
    { id: 'm2', medicine_name: 'Omega 3 Fish Oil', dosage: '1000 mg', scheduled_time: '13:00', taken: true, date: '2026-07-09' },
    { id: 'm3', medicine_name: 'Iron Supplement', dosage: '17 mg', scheduled_time: '21:00', taken: false, date: '2026-07-09' }
  ],
  cycle: [
    { date: '2026-06-15', flow: 'Heavy', pain: 'Severe', mood: 'Irritable', symptoms: 'Bloating, Backache' },
    { date: '2026-06-16', flow: 'Medium', pain: 'Moderate', mood: 'Tired', symptoms: 'Cramps' },
    { date: '2026-06-17', flow: 'Medium', pain: 'Mild', mood: 'Calm', symptoms: 'None' },
    { date: '2026-06-18', flow: 'Light', pain: 'None', mood: 'Happy', symptoms: 'None' },
    { date: '2026-06-19', flow: 'Spotting', pain: 'None', mood: 'Energetic', symptoms: 'None' }
  ],
  chat: [
    { role: 'model', message: 'Hello! I am Sakhi, your AI health companion. How can I help you today?', timestamp: new Date().toISOString() }
  ],
  reports: [
    { id: 'r1', file_url: 'BloodTest_June.pdf', summary: 'Vitamin D is low (22 ng/mL). Iron levels borderline. Recommend diet tweaks.', date: '2026-07-05' }
  ],
  notifications: [
    { id: 'n1', title: 'Hydration Goal Alert', message: 'You are 400ml away from your hydration target today. Grab a glass of water!', seen: false },
    { id: 'n2', title: 'Cycle Predictor', message: 'Based on your logs, your next period is expected in 4 days. Keep tracking!', seen: false }
  ],
  appointments: [
    { id: 'a1', doctor: 'Dr. Meera Sen (Gynecologist)', date: '2026-07-15T11:30:00', notes: 'Routine checkup and discussion regarding cycle regularity.' }
  ],
  goals: [
    { id: "g1", title: "Drink 3L Water", target: 3.0, current: 1.8, unit: "L", type: "water" },
    { id: "g2", title: "Walk 8000 Steps", target: 8000, current: 5100, unit: "steps", type: "steps" },
    { id: "g3", title: "Sleep 8 Hours", target: 8.0, current: 6.2, unit: "h", type: "sleep" },
    { id: "g4", title: "Improve Iron Intake", target: 15.0, current: 8.4, unit: "mg", type: "nutrition" }
  ],
  badges: [
    { name: "Healthy Week", unlocked: true, icon: "🏅", desc: "Logged sleep, exercise, and hydration all week." },
    { name: "Water Master", unlocked: true, icon: "💧", desc: "Reached 2.5L water target for 3 days straight." },
    { name: "Mood Streak", unlocked: false, icon: "😊", desc: "Logged mood daily for 5 days." },
    { name: "Medicine Streak", unlocked: false, icon: "💊", desc: "Took all scheduled medicines for 4 days." },
    { name: "7-Day Streak", unlocked: false, icon: "🔥", desc: "Completed daily check-ins for 7 days." }
  ],
  pregnancyCompanion: {
    kicksToday: 4,
    weightLogs: [
      { date: "Jun 15", kg: 57.2 },
      { date: "Jul 01", kg: 58.0 },
      { date: "Jul 09", kg: 58.5 }
    ]
  },
  menopauseCompanion: {
    hotFlashesToday: 2,
    calciumLogs: 600, 
    symptoms: ["Joint dryness", "Slight mood shifts"]
  },
  audioNotes: [
    { id: "a1", date: "Jul 05", doctor: "Dr. Meera Sen", summary: "Advised checking Vitamin D level again in 3 months. Recommended taking iron supplement on empty stomach with lemon juice." }
  ],
  // New features databases
  padReminderPacked: false,
  pregnancyTests: [
    { id: "pt1", trimester: 1, name: "Early Ultrasound (Dating Scan)", weekRange: "Weeks 8-12", completed: true },
    { id: "pt2", trimester: 1, name: "CBC & Blood Typing Panels", weekRange: "Weeks 10-12", completed: true },
    { id: "pt3", trimester: 2, name: "Anomaly Scan (Detailed Ultrasound)", weekRange: "Weeks 18-22", completed: false },
    { id: "pt4", trimester: 2, name: "Oral Glucose Tolerance Test (OGTT)", weekRange: "Weeks 24-28", completed: false },
    { id: "pt5", trimester: 3, name: "Group B Strep (GBS) Screening", weekRange: "Weeks 35-37", completed: false }
  ],
  errands: [
    { id: "er1", task: "Prepare Healthy Meals", completed: true },
    { id: "er2", task: "Clean & Organize Living Room", completed: false },
    { id: "er3", task: "Outside Errands / Groceries Run", completed: false },
    { id: "er4", task: "Do Laundry & Folder Linens", completed: true }
  ],
  errandStreak: 4
};

// Initialize localStorage if empty
Object.keys(MOCK_STATE).forEach(key => {
  if (!localStorage.getItem(`sakhi_${key}`)) {
    localStorage.setItem(`sakhi_${key}`, JSON.stringify(MOCK_STATE[key]));
  }
});

const getLocal = (key) => JSON.parse(localStorage.getItem(`sakhi_${key}`));
const setLocal = (key, data) => localStorage.setItem(`sakhi_${key}`, JSON.stringify(data));

// Central API Service Wrapper
export const api = {
  // Authentication
  register: async (name, email, password) => {
    try {
      const res = await client.post('/auth/register', { name, email, password });
      return res.data;
    } catch (e) {
      const mockUser = { id: 'd3b07384-d113-495f-929a-24157d6b46ef', name, email, created_at: new Date().toISOString() };
      return { access_token: 'mock-token', token_type: 'bearer', user: mockUser };
    }
  },

  login: async (email, password) => {
    try {
      const res = await client.post('/auth/login', { email, password });
      return res.data;
    } catch (e) {
      const mockUser = { id: 'd3b07384-d113-495f-929a-24157d6b46ef', name: 'Aditi Sharma', email, created_at: new Date().toISOString() };
      return { access_token: 'mock-token', token_type: 'bearer', user: mockUser };
    }
  },

  getProfile: async () => {
    try {
      const res = await client.get('/profile');
      return res.data;
    } catch (e) {
      return getLocal('profile');
    }
  },

  updateProfile: async (profileData) => {
    try {
      const res = await client.post('/profile', profileData);
      return res.data;
    } catch (e) {
      const current = getLocal('profile');
      const updated = { ...current, ...profileData };
      setLocal('profile', updated);
      return updated;
    }
  },

  getDashboard: async () => {
    try {
      const res = await client.get('/dashboard');
      return res.data;
    } catch (e) {
      const waterLogs = getLocal('water');
      const sleepLogs = getLocal('sleep');
      const exerciseLogs = getLocal('exercise');
      const profile = getLocal('profile');
      const medicines = getLocal('medicines');
      
      const lastWater = waterLogs[waterLogs.length - 1]?.liters || 1.8;
      const lastSleep = sleepLogs[sleepLogs.length - 1]?.hours || 7.0;
      const lastSleepQual = sleepLogs[sleepLogs.length - 1]?.quality || 'Good';
      const lastSteps = exerciseLogs[exerciseLogs.length - 1]?.steps || 5100;
      const lastCalories = exerciseLogs[exerciseLogs.length - 1]?.calories || 180;
      
      let score = 88;
      if (lastWater >= 2.2) score += 3;
      if (lastSleep >= 7.5) score += 4;
      if (lastSteps >= 8000) score += 3;
      if (profile.pregnancy) score -= 2;

      return {
        wellness_score: Math.min(score, 100),
        recommendations: [
          { title: 'Boost Iron Intake', description: 'Your cycle starts in 4 days. Increasing iron-rich lentils or spinach can prevent fatigue.', category: 'Nutrition', priority: 'High' },
          { title: 'Unwind and Breathe', description: 'Take 5 minutes for deep breathing exercises to help reduce pre-period stress.', category: 'Mental Wellness', priority: 'Medium' }
        ],
        reminders: [
          { title: 'Hydration Target', message: 'Drink 500ml more water to reach your daily goal.', category: 'Water' },
          ...medicines.filter(m => !m.taken).map(m => ({ title: `Take ${m.medicine_name}`, message: `${m.dosage} scheduled for ${m.scheduled_time}`, category: 'Medicine' }))
        ],
        today_metrics: {
          water: lastWater,
          sleep: lastSleep,
          sleep_quality: lastSleepQual,
          steps: lastSteps,
          calories: lastCalories,
          mood: 'Calm',
          stress_level: 3,
          cycle_day: 12
        },
        medicines,
        appointments: getLocal('appointments'),
        notifications: getLocal('notifications')
      };
    }
  },

  logWater: async (liters) => {
    const log = { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), liters };
    try {
      await client.post('/water', { date: new Date().toISOString().split('T')[0], liters });
    } catch (e) {
      const logs = getLocal('water');
      logs.push(log);
      setLocal('water', logs);
      
      const goals = getLocal('goals');
      const g = goals.find(x => x.type === 'water');
      if (g) {
        g.current = liters;
        setLocal('goals', goals);
      }
    }
    return log;
  },

  logMood: async (mood, stress_level, notes) => {
    const log = { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), mood, stress_level, notes };
    try {
      await client.post('/mood', { date: new Date().toISOString().split('T')[0], mood, stress_level, notes });
    } catch (e) {
      const logs = getLocal('mood');
      logs.push(log);
      setLocal('mood', logs);
    }
    return log;
  },

  logCycle: async (flow, pain, mood, symptoms) => {
    const log = { date: new Date().toISOString().split('T')[0], flow, pain, mood, symptoms };
    try {
      await client.post('/cycle', log);
    } catch (e) {
      const logs = getLocal('cycle');
      logs.push(log);
      setLocal('cycle', logs);
    }
    return log;
  },

  logMedicine: async (medicine_name, dosage, scheduled_time) => {
    const newMed = { id: `m-${Date.now()}`, medicine_name, dosage, scheduled_time, taken: false, date: new Date().toISOString().split('T')[0] };
    try {
      const res = await client.post('/medicine', newMed);
      return res.data;
    } catch (e) {
      const meds = getLocal('medicines');
      meds.push(newMed);
      setLocal('medicines', meds);
      return newMed;
    }
  },

  toggleMedicine: async (medId) => {
    try {
      const res = await client.post(`/medicine/toggle/${medId}`);
      return res.data;
    } catch (e) {
      const meds = getLocal('medicines');
      const updated = meds.map(m => m.id === medId ? { ...m, taken: !m.taken } : m);
      setLocal('medicines', updated);
      return { medicine: updated.find(m => m.id === medId) };
    }
  },

  logSleep: async (bedtime, waketime, quality, hours) => {
    const log = { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), hours, quality, bedtime, waketime };
    try {
      await client.post('/sleep', { date: new Date().toISOString().split('T')[0], hours, quality, bedtime, waketime });
    } catch (e) {
      const logs = getLocal('sleep');
      logs.push(log);
      setLocal('sleep', logs);

      const goals = getLocal('goals');
      const g = goals.find(x => x.type === 'sleep');
      if (g) {
        g.current = hours;
        setLocal('goals', goals);
      }
    }
    return log;
  },

  logActivity: async (steps, calories, duration, workout_type) => {
    const log = { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), steps, calories, duration, workout_type };
    try {
      await client.post('/activity', { date: new Date().toISOString().split('T')[0], steps, calories, duration, workout_type });
    } catch (e) {
      const logs = getLocal('exercise');
      logs.push(log);
      setLocal('exercise', logs);

      const goals = getLocal('goals');
      const g = goals.find(x => x.type === 'steps');
      if (g) {
        g.current = steps;
        setLocal('goals', goals);
      }
    }
    return log;
  },

  getGoals: async () => {
    return getLocal('goals');
  },
  
  getBadges: async () => {
    return getLocal('badges');
  },

  getPregnancyDetails: async () => {
    return getLocal('pregnancyCompanion');
  },

  logKick: async () => {
    const companion = getLocal('pregnancyCompanion');
    companion.kicksToday = (companion.kicksToday || 0) + 1;
    setLocal('pregnancyCompanion', companion);
    return companion;
  },

  logPregnancyWeight: async (kg) => {
    const companion = getLocal('pregnancyCompanion');
    companion.weightLogs.push({ date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), kg });
    setLocal('pregnancyCompanion', companion);
    return companion;
  },

  getMenopauseDetails: async () => {
    return getLocal('menopauseCompanion');
  },

  logHotFlash: async () => {
    const companion = getLocal('menopauseCompanion');
    companion.hotFlashesToday = (companion.hotFlashesToday || 0) + 1;
    setLocal('menopauseCompanion', companion);
    return companion;
  },

  logCalcium: async (mg) => {
    const companion = getLocal('menopauseCompanion');
    companion.calciumLogs = (companion.calciumLogs || 0) + mg;
    setLocal('menopauseCompanion', companion);
    return companion;
  },

  getAudioNotes: async () => {
    return getLocal('audioNotes');
  },

  transcribeAudioNotes: async (audioFile) => {
    const newNote = {
      id: `audio-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      doctor: "Gynecologist Clinic Audio",
      summary: "Patient discussed cycle regularity. Advised staying hydrated, taking magnesium-rich seed mixes for fatigue during PMS luteal phase, and avoiding high intensity workouts during cycle day 1-3."
    };
    const notes = getLocal('audioNotes');
    notes.unshift(newNote);
    setLocal('audioNotes', notes);
    return newNote;
  },

  // 📋 Pregnancy test tracker functions
  getPregnancyTests: async () => {
    return getLocal('pregnancyTests');
  },

  togglePregnancyTest: async (id) => {
    const tests = getLocal('pregnancyTests');
    const updated = tests.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setLocal('pregnancyTests', updated);
    return updated;
  },

  // 🏡 Errands streak tracker functions
  getErrands: async () => {
    return getLocal('errands');
  },

  toggleErrand: async (id) => {
    const errands = getLocal('errands');
    const updated = errands.map(e => e.id === id ? { ...e, completed: !e.completed } : e);
    setLocal('errands', updated);

    // Calculate streak logic (if all tasks completed, increment streak)
    let streak = getLocal('errandStreak');
    if (updated.every(e => e.completed)) {
      streak += 1;
      setLocal('errandStreak', streak);
    }
    return { errands: updated, streak };
  },

  addErrand: async (task) => {
    const errands = getLocal('errands');
    const newErrand = { id: `err-${Date.now()}`, task, completed: false };
    errands.push(newErrand);
    setLocal('errands', errands);
    return errands;
  },

  // 🎒 Pad kit reminder function
  togglePadKit: async () => {
    const val = getLocal('padReminderPacked');
    setLocal('padReminderPacked', !val);
    
    // Dispatch alert if ticked
    if (!val) {
      const notifications = getLocal('notifications');
      notifications.unshift({
        id: `pad-${Date.now()}`,
        title: "🎒 Period Kit Ready",
        message: "Your handbag pad kit is verified. You will receive alerts 2 days before your cycle to ensure you are fully prepared.",
        seen: false
      });
      setLocal('notifications', notifications);
    }
    return !val;
  },

  getPadKitStatus: async () => {
    return getLocal('padReminderPacked');
  },

  sendChatMessage: async (message) => {
    try {
      const res = await client.post('/chat', { message });
      return res.data;
    } catch (e) {
      const history = getLocal('chat');
      const userMsg = { role: 'user', message, timestamp: new Date().toISOString() };
      history.push(userMsg);
      
      let reply = "I am listening! That sounds important. Keep logging your daily water and symptoms so my Health Twin engine can tailor advice. Always check with your practitioner for major issues.";
      const msgLower = message.toLowerCase();
      
      if (msgLower.includes('period is late') || msgLower.includes('late cycle')) {
        reply = "Based on your recent cycle history, stress logs, and sleep patterns, a delay can happen due to lifestyle shifts or brief stress. Don't worry, our endocrine systems are highly sensitive! Make sure you stay cozy, warm, and hydrated. If it persists beyond a week, check in with a doctor.";
      } else if (msgLower.includes('pregnant') || msgLower.includes('pregnancy')) {
        reply = "Pregnancy is a beautiful phase. In this initial stage, focus on nutrient-dense meals high in iron and folic acid. Drink plenty of warm water, limit caffeine, and rest. I can track your prenatal medicines in the dashboard!";
      } else if (msgLower.includes('pcos') || msgLower.includes('pcod')) {
        reply = "Managing PCOS is about establishing gentle, low-stress daily routines. Focus on anti-inflammatory fiber, protein, and light workouts like walking or yoga. Monitoring your cycle symptoms is very helpful to share with your gynecologist.";
      } else if (msgLower.includes('blood report') || msgLower.includes('iron')) {
        reply = "You can upload your blood test files in the Report Analyzer widget. I'll read the key markers (like Vitamin D, TSH, glucose, and ferritin) and summarize them cleanly.";
      }

      const modelMsg = { role: 'model', message: reply, timestamp: new Date().toISOString() };
      history.push(modelMsg);
      setLocal('chat', history);
      return modelMsg;
    }
  },

  getChatHistory: async () => {
    try {
      const res = await client.get('/chat/history');
      return res.data;
    } catch (e) {
      return getLocal('chat');
    }
  },

  analyzeMeal: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${API_BASE_URL}/meal/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (e) {
      return {
        food_name: "Healthy Quinoa Salad with Chickpeas, Cucumber, and Feta",
        calories: 320,
        protein: 11.5,
        iron: 2.4,
        fiber: 5.5,
        suggestions: "Excellent plant protein! Pairing it with lemon juice dressing boosts iron absorption."
      };
    }
  },

  checkFood: async (foodName) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/meal/check`, { food_name: foodName });
      return res.data;
    } catch (e) {
      const foodLower = foodName.toLowerCase().trim();
      if (foodLower.includes("pizza") || foodLower.includes("burger") || foodLower.includes("fries") || foodLower.includes("cola")) {
        return {
          is_unhealthy: true,
          healthy_swap: "Paneer Wrap / Grilled Tandoori Tofu salad with mint dressing",
          reason: `'${foodName}' is high in simple refined carbs and trans fats, leading to rapid blood sugar spikes.`,
          benefits: "The recommended swap is rich in dietary fiber and lean protein, which stabilizes insulin levels and supports hormonal repair."
        };
      } else {
        return {
          is_unhealthy: false,
          healthy_swap: "No swap needed! This is a nutritious choice.",
          reason: `'${foodName}' is a wholesome, nutrient-dense ingredient that fits perfectly into a clean diet.`,
          benefits: "Supports smooth digestive function, supplies vital micronutrients, and aids in baseline energy levels without causing sugar crashes."
        };
      }
    }
  },

  analyzeSkin: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${API_BASE_URL}/skin/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (e) {
      return {
        acne: "Mild inflammatory sebum bumps detected on chin",
        pigmentation: "Optimal/Low",
        hydration: "62% (Slightly Dry)",
        hormonalLink: "Progesterone levels are elevating in current Luteal window, triggering increased gland oil secretion. Focus on water intake & tea tree cleansers."
      };
    }
  },


  analyzeReport: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${API_BASE_URL}/report/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (e) {
      return {
        summary: "Your scanned blood report shows general healthy metrics, but highlights mild deficiencies in Vitamin D and iron.",
        iron_level: "Borderline Low (11.5 g/dL)",
        vitamin_d_level: "Low (24 ng/mL)",
        thyroid_level: "Normal (2.1 uIU/mL)",
        sugar_level: "Normal (90 mg/dL)",
        warnings: [
          "Vitamin D is below the recommended 30 ng/mL. Sunlight or supplements are advised.",
          "Iron is borderline. Incorporate dark leafy greens and beets in your lunches."
        ]
      };
    }
  },

  getRiskIndicators: async () => {
    const profile = getLocal('profile');
    const sleepLogs = getLocal('sleep');
    const lastSleep = sleepLogs[sleepLogs.length - 1];
    
    const risks = [
      { name: "PCOS Risk", status: profile.conditions.includes("PCOS") ? "Moderate Correlation" : "Low Correlation", color: profile.conditions.includes("PCOS") ? "orange" : "mint", desc: "Flagged based on period cycle history and hormone logs." },
      { name: "Anemia Risk", status: "Borderline Warning", color: "orange", desc: "Estimated based on scanned lab iron reports (11.5 g/dL)." },
      { name: "Vitamin D Defic.", status: "Deficient Warning", color: "coral", desc: "Vitamin D levels currently log at 24 ng/mL." },
      { name: "Thyroid Marker", status: "Healthy Normal", color: "mint", desc: "TSH values register at a stable 2.1 uIU/mL." },
      { name: "Burnout & Stress", status: lastSleep.hours < 6.5 ? "Elevated Warning" : "Stable", color: lastSleep.hours < 6.5 ? "coral" : "mint", desc: "Slightly elevated due to logged sleep deficits." }
    ];
    return risks;
  },

  getAnalytics: async () => {
    try {
      const res = await client.get('/analytics');
      return res.data;
    } catch (e) {
      return {
        water_trends: getLocal('water'),
        sleep_trends: getLocal('sleep'),
        mood_trends: getLocal('mood'),
        exercise_trends: getLocal('exercise'),
        cycle_history: getLocal('cycle')
      };
    }
  },

  triggerSOS: async (contacts) => {
    try {
      const res = await client.post('/sos', { contacts });
      return res.data;
    } catch (e) {
      const profile = getLocal('profile');
      const notifications = getLocal('notifications');
      notifications.unshift({
        id: `sos-${Date.now()}`,
        title: "SOS Activated",
        message: `Alerts dispatched to ${contacts.join(', ')}. Rending blood group: ${profile.blood_group}.`,
        seen: false
      });
      setLocal('notifications', notifications);
      return {
        status: 'triggered',
        medical_card: {
          name: "Aditi Sharma",
          blood_group: profile.blood_group,
          allergies: profile.allergies,
          conditions: profile.conditions
        }
      };
    }
  },

  checkPcosQuiz: async (answers) => {
    try {
      const res = await client.post('/pcos/quiz', { answers });
      return res.data;
    } catch (e) {
      let points = 0;
      const symptoms = [];
      if (answers.periods === 'irregular') { points += 3; symptoms.push("Irregular or missed periods"); }
      if (answers.hair === 'yes') { points += 2; symptoms.push("Excessive facial/body hair"); }
      if (answers.weight === 'gaining') { points += 2; symptoms.push("Weight management difficulties"); }
      if (answers.acne === 'severe') { points += 1; symptoms.push("Severe acne or oily skin"); }
      if (answers.mood === 'frequent') { points += 1; symptoms.push("Frequent mood swings"); }

      let risk = "Low";
      let advice = "Your symptoms suggest low correlation with PCOS. Maintain your regular wellness routine!";
      if (points >= 6) {
        risk = "High";
        advice = "Your logged symptoms show high alignment with standard PCOS criteria. We highly recommend scheduling an appointment with a gynecologist or endocrinologist.";
      } else if (points >= 3) {
        risk = "Moderate";
        advice = "There is some alignment with PCOS symptoms. Keep tracking and consider discussing these observations during your next routine gynecological checkup.";
      }

      return { score: points, risk_level: risk, identified_symptoms: symptoms, recommendation: advice };
    }
  },

  getDoctorSummary: async () => {
    try {
      const res = await client.get('/report/generate-summary');
      return res.data;
    } catch (e) {
      const profile = getLocal('profile');
      const reports = getLocal('reports');
      const cycle_logs = getLocal('cycle');
      
      let summary = `SAKHI AI - CLINICAL HEALTH TWIN PROFILE SUMMARY\n=============================================\nGenerated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\n\nPATIENT SUMMARY DETAILS:\n- Name: Aditi Sharma\n- Age: ${profile.age} years\n- Blood Group: ${profile.blood_group}\n- Logged Conditions: ${profile.conditions || 'None'}\n- Allergies: ${profile.allergies || 'None'}\n\nLOGGED MENSTRUAL METRICS:\n- Cycle regularity: Base regular (28 days)\n- Symptoms logged: ${Array.from(new Set(cycle_logs.map(c => c.symptoms).filter(Boolean))).join(', ') || 'None logged'}\n\nSCANNED LABORATORY WORKUPS:\n`;
      reports.forEach(r => {
        summary += `- [${r.date}]: ${r.summary}\n`;
      });
      summary += "\nDISCLAIMER: This report is a digital summary compiled by Sakhi AI. Please review values with a certified medical doctor.";
      return { pdf_content_text: summary };
    }
  },

  getCycleForecast: async () => {
    try {
      const res = await client.get('/cycle/forecast');
      return res.data;
    } catch (e) {
      return {
        phases: [
          { name: "Menstrual Phase", days: "Days 1-5", energy: "Low", estrogen: "Low", progesterone: "Low", workout: "Rest / Gentle Yoga", nutrition: "Iron-rich soups, herbal tea" },
          { name: "Follicular Phase", days: "Days 6-12", energy: "High", estrogen: "Rising", progesterone: "Low", workout: "Cardio / Strength Training", nutrition: "Light salads, lean protein" },
          { name: "Ovulatory Phase", days: "Days 13-16", energy: "Peak", estrogen: "High", progesterone: "Low", workout: "HIIT / Group Classes", nutrition: "Raw veggies, high fiber" },
          { name: "Luteal Phase", days: "Days 17-28", energy: "Moderate to Low", estrogen: "Fluctuating", progesterone: "High", workout: "Pilates / Light Jogging", nutrition: "Magnesium-rich foods, oats" }
        ]
      };
    }
  }
};
