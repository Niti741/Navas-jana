import uuid
from datetime import date, datetime, time, timedelta
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException, status, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.config import settings
from backend.models.schemas import (
    UserRegister, UserLogin, UserResponse, TokenResponse,
    HealthProfileUpdate, CycleLogCreate, MoodLogCreate,
    WaterLogCreate, SleepLogCreate, MedicineCreate,
    ChatRequest, ChatResponse, SOSRequest
)
from backend.ai.gemini import (
    generate_recommendations, get_chat_response,
    analyze_blood_report, analyze_meal, analyze_skin
)
from backend.services.insights import (
    calculate_wellness_score, generate_smart_reminders
)

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- IN-MEMORY DATABASE STATE (Mock Database for Hackathon) ---
DB = {
    "users": {
        "d3b07384-d113-495f-929a-24157d6b46ef": {
            "id": "d3b07384-d113-495f-929a-24157d6b46ef",
            "name": "Aditi Sharma",
            "email": "aditi@sakhi.ai",
            "password": "password123", # Plain text check for hackathon dev
            "created_at": datetime.now()
        }
    },
    "health_profiles": {
        "d3b07384-d113-495f-929a-24157d6b46ef": {
            "user_id": "d3b07384-d113-495f-929a-24157d6b46ef",
            "age": 26,
            "weight": 58.5,
            "height": 163.0,
            "blood_group": "O+",
            "allergies": "Gluten sensitive",
            "conditions": "Mild PCOS symptoms",
            "pregnancy": False,
            "menopause": False,
            "goals": "Regulate period, track nutrition, improve energy"
        }
    },
    "cycle_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 6, 15), "flow": "Heavy", "pain": "Severe", "mood": "Irritable", "symptoms": "Bloating, Backache"},
            {"date": date(2026, 6, 16), "flow": "Medium", "pain": "Moderate", "mood": "Tired", "symptoms": "Cramps"},
            {"date": date(2026, 6, 17), "flow": "Medium", "pain": "Mild", "mood": "Calm", "symptoms": "None"},
            {"date": date(2026, 6, 18), "flow": "Light", "pain": "None", "mood": "Happy", "symptoms": "None"},
            {"date": date(2026, 6, 19), "flow": "Spotting", "pain": "None", "mood": "Energetic", "symptoms": "None"}
        ]
    },
    "mood_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 7, 7), "mood": "Calm", "stress_level": 3, "notes": "Meditated for 10 minutes."},
            {"date": date(2026, 7, 8), "mood": "Energetic", "stress_level": 2, "notes": "Great morning workout."},
            {"date": date(2026, 7, 9), "mood": "Tired", "stress_level": 6, "notes": "Poor sleep, sugar cravings."}
        ]
    },
    "water_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 7, 7), "liters": 2.2},
            {"date": date(2026, 7, 8), "liters": 2.5},
            {"date": date(2026, 7, 9), "liters": 1.8}
        ]
    },
    "sleep_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 7, 7), "hours": 7.5, "quality": "Good"},
            {"date": date(2026, 7, 8), "hours": 8.0, "quality": "Excellent"},
            {"date": date(2026, 7, 9), "hours": 6.2, "quality": "Fair"}
        ]
    },
    "exercise_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 7, 7), "steps": 8200, "calories": 320},
            {"date": date(2026, 7, 8), "steps": 10400, "calories": 410},
            {"date": date(2026, 7, 9), "steps": 5100, "calories": 180}
        ]
    },
    "nutrition_logs": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"date": date(2026, 7, 9), "meal_image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300", "protein": 42.5, "iron": 8.4, "calories": 1650, "fiber": 22.0, "suggestions": "Add spinach or pumpkin seeds to dinner."}
        ]
    },
    "medicines": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"id": "m1", "user_id": "d3b07384-d113-495f-929a-24157d6b46ef", "medicine_name": "Folic Acid", "dosage": "400 mcg", "scheduled_time": "09:00", "taken": True, "date": date(2026, 7, 9)},
            {"id": "m2", "user_id": "d3b07384-d113-495f-929a-24157d6b46ef", "medicine_name": "Omega 3 Fish Oil", "dosage": "1000 mg", "scheduled_time": "13:00", "taken": True, "date": date(2026, 7, 9)},
            {"id": "m3", "user_id": "d3b07384-d113-495f-929a-24157d6b46ef", "medicine_name": "Iron Supplement", "dosage": "17 mg", "scheduled_time": "21:00", "taken": False, "date": date(2026, 7, 9)}
        ]
    },
    "chat_history": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"id": "c1", "role": "user", "message": "Why do I feel so tired right before my period?", "timestamp": datetime.now() - timedelta(minutes=15)},
            {"id": "c2", "role": "model", "message": "Feeling tired before your period is very common and is primarily driven by hormonal fluctuations. Estrogen and progesterone drop sharply, which can reduce energy and affect serotonin (the mood-regulating chemical). Try eating iron-rich foods, staying hydrated, and doing light yoga to boost circulation.", "timestamp": datetime.now() - timedelta(minutes=14)}
        ]
    },
    "reports": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"id": "r1", "file_url": "report_1.png", "summary": "Vitamin D deficiency spotted (22 ng/mL). Mild iron deficit.", "date": date(2026, 7, 5)}
        ]
    },
    "notifications": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"id": "n1", "title": "Hydration Goal Alert", "message": "You are 400ml away from your hydration target today. Grab a glass of water!", "seen": False, "created_at": datetime.now() - timedelta(hours=2)},
            {"id": "n2", "title": "Cycle Predictor", "message": "Based on your logs, your next period is expected in 4 days. Keep tracking!", "seen": False, "created_at": datetime.now() - timedelta(hours=5)}
        ]
    },
    "appointments": {
        "d3b07384-d113-495f-929a-24157d6b46ef": [
            {"id": "a1", "doctor": "Dr. Meera Sen (Gynecologist)", "date": datetime.now() + timedelta(days=6, hours=2), "notes": "Routine checkup and discussion regarding cycle regularity."}
        ]
    }
}

# --- AUTH ROUTES ---
@app.post("/api/auth/register", response_model=TokenResponse)
def register(user: UserRegister):
    # Check if email exists
    for u in DB["users"].values():
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
            
    user_id = str(uuid.uuid4())
    new_user = {
        "id": user_id,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "created_at": datetime.now()
    }
    
    # Store
    DB["users"][user_id] = new_user
    # Setup blank records
    DB["health_profiles"][user_id] = {
        "user_id": user_id, "age": 25, "weight": 60.0, "height": 160.0, "blood_group": "A+",
        "allergies": "", "conditions": "", "pregnancy": False, "menopause": False, "goals": ""
    }
    DB["cycle_logs"][user_id] = []
    DB["mood_logs"][user_id] = []
    DB["water_logs"][user_id] = []
    DB["sleep_logs"][user_id] = []
    DB["exercise_logs"][user_id] = []
    DB["nutrition_logs"][user_id] = []
    DB["medicines"][user_id] = []
    DB["chat_history"][user_id] = []
    DB["reports"][user_id] = []
    DB["notifications"][user_id] = []
    DB["appointments"][user_id] = []
    
    user_resp = UserResponse(id=user_id, name=user.name, email=user.email, created_at=new_user["created_at"])
    return TokenResponse(access_token=f"mock-token-{user_id}", token_type="bearer", user=user_resp)

@app.post("/api/auth/login", response_model=TokenResponse)
def login(credentials: UserLogin):
    found_user = None
    for u in DB["users"].values():
        if u["email"] == credentials.email and u["password"] == credentials.password:
            found_user = u
            break
            
    if not found_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    user_id = found_user["id"]
    user_resp = UserResponse(id=user_id, name=found_user["name"], email=found_user["email"], created_at=found_user["created_at"])
    return TokenResponse(access_token=f"mock-token-{user_id}", token_type="bearer", user=user_resp)

# Helper function to get mock current user
def get_current_user_id() -> str:
    # Always default to Aditi Sharma's ID for simple, config-less client requests
    return "d3b07384-d113-495f-929a-24157d6b46ef"

# --- PROFILE (HEALTH TWIN) ROUTES ---
@app.get("/api/profile")
def get_profile():
    uid = get_current_user_id()
    if uid not in DB["health_profiles"]:
        raise HTTPException(status_code=404, detail="Profile not found")
    return DB["health_profiles"][uid]

@app.post("/api/profile")
def update_profile(profile: HealthProfileUpdate):
    uid = get_current_user_id()
    current_profile = DB["health_profiles"].setdefault(uid, {"user_id": uid})
    
    update_data = profile.dict(exclude_unset=True)
    for k, v in update_data.items():
        current_profile[k] = v
        
    return current_profile

# --- DASHBOARD & ANALYTICS ---
@app.get("/api/dashboard")
def get_dashboard():
    uid = get_current_user_id()
    
    # 1. Fetch today's logs (default to last entries or base mock)
    cycle = DB["cycle_logs"][uid][-1] if DB["cycle_logs"][uid] else {}
    mood = DB["mood_logs"][uid][-1] if DB["mood_logs"][uid] else {"mood": "Calm", "stress_level": 3}
    water = DB["water_logs"][uid][-1] if DB["water_logs"][uid] else {"liters": 1.5}
    sleep = DB["sleep_logs"][uid][-1] if DB["sleep_logs"][uid] else {"hours": 7.0, "quality": "Good"}
    exercise = DB["exercise_logs"][uid][-1] if DB["exercise_logs"][uid] else {"steps": 6000, "calories": 250}
    nutrition = DB["nutrition_logs"][uid][-1] if DB["nutrition_logs"][uid] else {"protein": 30.0, "iron": 5.0, "calories": 1500}
    
    today_logs = {
        "cycle": cycle,
        "mood": mood,
        "water": water,
        "sleep": sleep,
        "exercise": exercise,
        "nutrition": nutrition,
        "medicines": DB["medicines"][uid]
    }
    
    profile = DB["health_profiles"].get(uid, {})
    
    # 2. Insights Calculations
    wellness_score = calculate_wellness_score(today_logs, profile)
    recommendations = generate_recommendations(profile, today_logs)
    reminders = generate_smart_reminders(today_logs, DB["medicines"][uid], profile)
    
    return {
        "wellness_score": wellness_score,
        "recommendations": recommendations,
        "reminders": reminders,
        "today_metrics": {
            "water": water.get("liters", 0.0),
            "sleep": sleep.get("hours", 0.0),
            "sleep_quality": sleep.get("quality", "Good"),
            "steps": exercise.get("steps", 0),
            "calories": exercise.get("calories", 0),
            "mood": mood.get("mood", "Calm"),
            "stress_level": mood.get("stress_level", 3),
            "cycle_day": 12 # simulated cycle day
        },
        "medicines": DB["medicines"][uid],
        "appointments": DB["appointments"][uid],
        "notifications": DB["notifications"][uid]
    }

# --- HEALTH INPUT TRACKING ENDPOINTS ---
@app.post("/api/water")
def log_water(water: WaterLogCreate):
    uid = get_current_user_id()
    DB["water_logs"][uid].append({"date": water.date, "liters": water.liters})
    return {"message": "Water intake logged successfully", "data": {"date": water.date, "liters": water.liters}}

@app.post("/api/mood")
def log_mood(mood: MoodLogCreate):
    uid = get_current_user_id()
    DB["mood_logs"][uid].append({"date": mood.date, "mood": mood.mood, "stress_level": mood.stress_level, "notes": mood.notes})
    return {"message": "Mood logged successfully"}

@app.post("/api/cycle")
def log_cycle(cycle: CycleLogCreate):
    uid = get_current_user_id()
    DB["cycle_logs"][uid].append({"date": cycle.date, "flow": cycle.flow, "pain": cycle.pain, "mood": cycle.mood, "symptoms": cycle.symptoms})
    return {"message": "Cycle data logged successfully"}

@app.post("/api/medicine")
def log_medicine(med: MedicineCreate):
    uid = get_current_user_id()
    med_id = f"m-{len(DB['medicines'][uid]) + 1}"
    new_med = {
        "id": med_id,
        "user_id": uid,
        "medicine_name": med.medicine_name,
        "dosage": med.dosage,
        "scheduled_time": med.scheduled_time,
        "taken": med.taken,
        "date": med.date
    }
    DB["medicines"][uid].append(new_med)
    return new_med

@app.post("/api/medicine/toggle/{med_id}")
def toggle_medicine(med_id: str):
    uid = get_current_user_id()
    for m in DB["medicines"][uid]:
        if m["id"] == med_id:
            m["taken"] = not m["taken"]
            return {"message": "Status updated", "medicine": m}
    raise HTTPException(status_code=404, detail="Medicine not found")

# --- AI MODULE ACTIONS ---
@app.post("/api/chat", response_model=ChatResponse)
def chat_with_sakhi(chat_req: ChatRequest):
    uid = get_current_user_id()
    history = DB["chat_history"].setdefault(uid, [])
    profile = DB["health_profiles"].get(uid, {})
    
    # 1. Fetch AI completion
    response_text = get_chat_response(chat_req.message, history, profile)
    
    # 2. Save dialogue
    history.append({"id": f"c-usr-{len(history)}", "role": "user", "message": chat_req.message, "timestamp": datetime.now()})
    model_response = {"id": f"c-mod-{len(history)}", "role": "model", "message": response_text, "timestamp": datetime.now()}
    history.append(model_response)
    
    return ChatResponse(role="model", message=response_text, timestamp=model_response["timestamp"])

@app.get("/api/chat/history")
def get_chat_history():
    uid = get_current_user_id()
    return DB["chat_history"].setdefault(uid, [])

@app.post("/api/meal/analyze")
async def upload_meal(file: UploadFile = File(...)):
    contents = await file.read()
    analysis = analyze_meal(contents, file.filename)
    
    # Log nutrition log
    uid = get_current_user_id()
    DB["nutrition_logs"][uid].append({
        "date": date.today(),
        "meal_image": f"uploads/{file.filename}",
        "protein": analysis.get("protein", 0.0),
        "iron": analysis.get("iron", 0.0),
        "calories": analysis.get("calories", 0),
        "fiber": analysis.get("fiber", 0.0),
        "suggestions": analysis.get("suggestions", "")
    })
    
    return analysis

@app.post("/api/skin/analyze")
async def upload_skin(file: UploadFile = File(...)):
    contents = await file.read()
    analysis = analyze_skin(contents, file.filename)
    return analysis

@app.post("/api/report/analyze")
async def upload_report(file: UploadFile = File(...)):
    contents = await file.read()
    analysis = analyze_blood_report(contents, file.filename)
    
    # Save Report Registry
    uid = get_current_user_id()
    DB["reports"][uid].append({
        "id": f"rep-{len(DB['reports'][uid]) + 1}",
        "file_url": file.filename,
        "summary": analysis.get("summary", ""),
        "date": date.today()
    })
    
    return analysis

@app.get("/api/reports")
def get_all_reports():
    uid = get_current_user_id()
    return DB["reports"][uid]

# --- ANALYTICS ---
@app.get("/api/analytics")
def get_analytics():
    uid = get_current_user_id()
    
    # Convert dates to string format for simple JSON serialization
    def format_logs(logs_list):
        formatted = []
        for l in logs_list:
            item = l.copy()
            if isinstance(item.get("date"), date):
                item["date"] = item["date"].strftime("%b %d")
            formatted.append(item)
        return formatted
        
    return {
        "water_trends": format_logs(DB["water_logs"][uid][-7:]),
        "sleep_trends": format_logs(DB["sleep_logs"][uid][-7:]),
        "mood_trends": format_logs(DB["mood_logs"][uid][-7:]),
        "exercise_trends": format_logs(DB["exercise_logs"][uid][-7:]),
        "cycle_history": format_logs(DB["cycle_logs"][uid])
    }

# --- EMERGENCY SOS ---
@app.post("/api/sos")
def trigger_sos(sos: SOSRequest):
    uid = get_current_user_id()
    profile = DB["health_profiles"].get(uid, {})
    
    # Enqueue emergency notification
    alert_msg = f"SOS Triggered! Alert sent to contacts: {', '.join(sos.contacts)}. Rending Emergency medical profile: Blood Group: {profile.get('blood_group')}, Allergies: {profile.get('allergies')}."
    DB["notifications"][uid].insert(0, {
        "id": f"sos-{uuid.uuid4()}",
        "title": "SOS Emergency Triggered",
        "message": alert_msg,
        "seen": False,
        "created_at": datetime.now()
    })
    
    return {
        "status": "triggered",
        "message": "Emergency alert sent successfully.",
        "medical_card": {
            "name": DB["users"][uid]["name"],
            "blood_group": profile.get("blood_group"),
            "allergies": profile.get("allergies"),
            "conditions": profile.get("conditions")
        }
    }

# --- NEW EXTENSION MODULES ---
class PCOSQuizRequest(BaseModel):
    answers: dict

@app.post("/api/pcos/quiz")
def check_pcos_risk(req: PCOSQuizRequest):
    answers = req.answers
    points = 0
    symptoms = []
    
    if answers.get("periods") == "irregular":
        points += 3
        symptoms.append("Irregular or missed periods")
    if answers.get("hair") == "yes":
        points += 2
        symptoms.append("Excessive facial or body hair growth")
    if answers.get("weight") == "gaining":
        points += 2
        symptoms.append("Difficulty managing weight or sudden weight gain")
    if answers.get("acne") == "severe":
        points += 1
        symptoms.append("Persistent acne or oily skin")
    if answers.get("mood") == "frequent":
        points += 1
        symptoms.append("Frequent mood swings or anxiety")
        
    risk = "Low"
    advice = "Your symptoms suggest low correlation with PCOS. Maintain your regular wellness routine!"
    if points >= 6:
        risk = "High"
        advice = "Your logged symptoms show high alignment with standard PCOS criteria. We highly recommend scheduling an appointment with a gynecologist or endocrinologist."
    elif points >= 3:
        risk = "Moderate"
        advice = "There is some alignment with PCOS symptoms. Keep tracking and consider discussing these observations during your next routine gynecological checkup."
        
    return {
        "score": points,
        "risk_level": risk,
        "identified_symptoms": symptoms,
        "recommendation": advice
    }

@app.get("/api/report/generate-summary")
def generate_doctor_summary():
    uid = get_current_user_id()
    profile = DB["health_profiles"].get(uid, {})
    reports = DB["reports"].get(uid, [])
    cycle_logs = DB["cycle_logs"].get(uid, [])
    
    summary = f"""SAKHI AI - CLINICAL HEALTH TWIN PROFILE SUMMARY
=============================================
Generated: {datetime.now().strftime("%B %d, %Y")}

PATIENT SUMMARY DETAILS:
- Name: Aditi Sharma
- Age: {profile.get('age')} years
- Blood Group: {profile.get('blood_group')}
- Logged Conditions: {profile.get('conditions') or 'None'}
- Allergies: {profile.get('allergies') or 'None'}

LOGGED MENSTRUAL METRICS:
- Cycle regularity: Base regular (28 days)
- symptoms logged: {", ".join(list(set([c.get('symptoms') for c in cycle_logs if c.get('symptoms')]))) or 'None logged'}

SCANNED LABORATORY WORKUPS:
"""
    for r in reports:
        summary += f"- [{r.get('date')}]: {r.get('summary')}\n"
        
    summary += "\nDISCLAIMER: This report is a digital summary compiled by Sakhi AI. Please review values with a certified medical doctor."
    return {"pdf_content_text": summary}

@app.get("/api/cycle/forecast")
def get_cycle_forecast():
    return {
        "phases": [
            {"name": "Menstrual Phase", "days": "Days 1-5", "energy": "Low", "estrogen": "Low", "progesterone": "Low", "workout": "Rest / Gentle Yoga", "nutrition": "Iron-rich soups, herbal tea"},
            {"name": "Follicular Phase", "days": "Days 6-12", "energy": "High", "estrogen": "Rising", "progesterone": "Low", "workout": "Cardio / Strength Training", "nutrition": "Light salads, lean protein"},
            {"name": "Ovulatory Phase", "days": "Days 13-16", "energy": "Peak", "estrogen": "High", "progesterone": "Low", "workout": "HIIT / Group Classes", "nutrition": "Raw veggies, high fiber"},
            {"name": "Luteal Phase", "days": "Days 17-28", "energy": "Moderate to Low", "estrogen": "Fluctuating", "progesterone": "High", "workout": "Pilates / Light Jogging", "nutrition": "Magnesium-rich foods, oats"}
        ]
    }

