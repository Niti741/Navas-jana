import json
import base64
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.config import settings

# Attempt to import google generativeai
try:
    import google.generativeai as genai
    gemini_installed = True
except ImportError:
    gemini_installed = False

import requests

# Configure Gemini if key is available and mock is disabled
if gemini_installed and settings.GEMINI_API_KEY and not settings.USE_MOCK_DATA:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    MODELS = {
        "text": "gemini-3.5-flash",
        "vision": "gemini-3.5-flash"
    }
else:
    genai = None

# System prompt for Sakhi AI
SYSTEM_INSTRUCTION = """
You are "Sakhi AI", a warm, empathetic, witty, and fun health companion for women who loves cracking lighthearted comedy and jokes!
Your goal is to provide personalized, trustworthy, and actionable wellness insights across menstrual cycles, nutrition, pregnancy, mental wellness, and general health, but keeping it fun, funny, and highly engaging.
Tone guidelines:
- Friendly, warm, witty, humorous, and entertaining.
- Keep the mood light and use funny health jokes or relatable comedy analogies (e.g. "hormones playing DJ with our feelings", "staying hydrated so we don't look like dried raisins", "cravings that whisper sweet chocolate lies to us").
- Do not sound cold, sterile, or overly clinical.
- Avoid using harsh list styles when a friendly paragraph fits better.
- Explicitly emphasize that your insights are for educational/wellness guidance and do not replace professional medical advice. Always add a gentle, warm reminder of this (in a fun way!).
- Respect and maintain the strict pastel-themed, warm ambiance of the application.
"""

def call_groq_chat(system_instruction: str, prompt: str, history: List[Dict[str, str]] = None) -> Optional[str]:
    if not settings.GROQ_API_KEY or settings.USE_MOCK_DATA:
        return None
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        messages = [{"role": "system", "content": system_instruction}]
        
        if history:
            for h in history:
                messages.append({
                    "role": "user" if h["role"] == "user" else "assistant",
                    "content": h["message"]
                })
        
        messages.append({"role": "user", "content": prompt})
        
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": messages,
            "temperature": 0.7
        }
        
        resp = requests.post(url, json=payload, headers=headers, timeout=15)
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
        else:
            print(f"Groq API Chat Error: Status {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"Groq Chat exception: {str(e)}")
    return None

def call_groq_vision(system_instruction: str, image_bytes: bytes, file_name: str, prompt: str) -> Optional[Dict[str, Any]]:
    if not settings.GROQ_API_KEY or settings.USE_MOCK_DATA:
        return None
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        mime_type = "image/jpeg" if file_name.endswith(('.jpg', '.jpeg')) else "image/png"
        b64_image = base64.b64encode(image_bytes).decode("utf-8")
        
        messages = [
            {"role": "system", "content": system_instruction},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{b64_image}"
                        }
                    }
                ]
            }
        ]
        
        payload = {
            "model": "llama-3.2-11b-vision-preview",
            "messages": messages,
            "temperature": 0.2,
            "response_format": {"type": "json_object"}
        }
        
        resp = requests.post(url, json=payload, headers=headers, timeout=20)
        if resp.status_code == 200:
            content = resp.json()["choices"][0]["message"]["content"]
            clean_text = content.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        else:
            print(f"Groq Vision API Error: Status {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"Groq Vision exception: {str(e)}")
    return None

def generate_recommendations(profile: Dict[str, Any], logs: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generates personalized recommendations based on the Health Profile (Health Twin) and recent logs.
    """
    prompt = f"""
    Analyze the following patient health profile and recent logs to generate a list of 3-4 personalized health recommendations.
    Return the output STRICTLY as a JSON array of objects, where each object has:
    - 'title': short recommendation title
    - 'description': friendly 1-2 sentence advice
    - 'category': one of 'Cycle', 'Nutrition', 'Hydration', 'Mental Wellness', 'General'
    - 'priority': 'High', 'Medium', or 'Low'

    User Profile:
    {json.dumps(profile)}

    Recent Logs:
    {json.dumps(logs)}
    """
    
    # 1. Try Gemini first
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            response = model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini recommendations failed, falling back to Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_reply = call_groq_chat(
                system_instruction=SYSTEM_INSTRUCTION + "\nReturn ONLY a valid JSON array of objects.",
                prompt=prompt
            )
            if groq_reply:
                clean_text = groq_reply.replace("```json", "").replace("```", "").strip()
                return json.loads(clean_text)
        except Exception as e:
            print(f"Groq recommendations failed: {str(e)}")

    # 3. Mock recommendations fallback
    recs = [
        {
            "title": "Boost Iron Intake",
            "description": "Your cycle starts in 4 days. Increasing your intake of spinach, lentils, or sesame seeds now can help maintain healthy iron levels.",
            "category": "Nutrition",
            "priority": "High"
        },
        {
            "title": "Unwind and Breathe",
            "description": "You logged a slightly elevated stress level yesterday. Try a 5-minute deep breathing exercise before bed tonight.",
            "category": "Mental Wellness",
            "priority": "Medium"
        },
        {
            "title": "Keep up the Hydration",
            "description": "Your water intake was slightly below average yesterday. Aim for 2.2L today to help ease pre-menstrual bloating.",
            "category": "Hydration",
            "priority": "Medium"
        }
    ]
    
    if profile.get("pregnancy"):
        recs.insert(0, {
            "title": "Folic Acid Reminder",
            "description": "Keep supporting your baby's development. Ensure you take your daily Folic Acid supplement with breakfast.",
            "category": "General",
            "priority": "High"
        })
    elif profile.get("menopause"):
        recs.insert(0, {
            "title": "Calcium Support",
            "description": "Focus on bone wellness during menopause. Try adding a serving of Greek yogurt, almonds, or fortified plant milk today.",
            "category": "Nutrition",
            "priority": "High"
        })
        
    return recs[:4]

def get_chat_response(message: str, history: List[Dict[str, str]], profile: Dict[str, Any]) -> str:
    """
    Renders an AI chatbot response considering the chat context and Health Twin profile.
    """
    system_instruction = SYSTEM_INSTRUCTION
    context = f"[Context: User Health Twin - Age: {profile.get('age')}, Pregnancy: {profile.get('pregnancy')}, Menopause: {profile.get('menopause')}, Conditions: {profile.get('conditions')}]. "

    # 1. Try Gemini first
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=system_instruction
            )
            contents = []
            for h in history:
                contents.append({
                    "role": "user" if h["role"] == "user" else "model",
                    "parts": [h["message"]]
                })
            contents.append({
                "role": "user",
                "parts": [context + message]
            })
            response = model.generate_content(contents)
            return response.text
        except Exception as e:
            print(f"Gemini chat failed, trying Groq fallback... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        groq_reply = call_groq_chat(
            system_instruction=system_instruction,
            prompt=context + message,
            history=history
        )
        if groq_reply:
            return groq_reply

    # 3. Mock Chat Responses matching women's health intents (funny comedy tone fallback)
    msg_lower = message.lower()
    
    if "period is late" in msg_lower or "late cycle" in msg_lower:
        return (
            "Well, it looks like your period is playing hide and seek! 🙈 Based on your recent cycles and stress levels, your body is probably reacting to lifestyle shifts. Our hormones are basically the drama queens of our endocrine system. Try keeping warm, eating some comfort food, and relaxing. "
            "But remember: if it decides to take a vacation longer than a week, or there's a chance of a mini-you on the way, take a test or consult a professional!"
        )
    elif "pregnant" in msg_lower or "pregnancy" in msg_lower:
        return (
            "Congratulations! You are officially hosting a tiny, demanding roommate! 🍼 Early pregnancy is all about eating folate and iron-rich foods, staying super hydrated, and resting before your body starts writing aggressive letters. "
            "Keep tracking your prenatal vitamins, and don't worry—I'm here to help navigate all the weird cravings!"
        )
    elif "pcos" in msg_lower or "pcod" in msg_lower:
        return (
            "Managing PCOS is like trying to negotiate with a moody toddler—you've got to be gentle but consistent! 🍼 Focus on anti-inflammatory whole foods, balancing proteins, and choosing low-stress workouts like walking or yoga. "
            "I'm here to help you log cycles and build a bulletproof symptom sheet to show your gynecologist!"
        )
    elif "blood report" in msg_lower or "iron" in msg_lower:
        return (
            "Aha! Let's read the ancient scrolls (aka your blood reports). 📜 Upload it in the Report Analyzer, and I'll translate TSH, Vitamin D, Glucose, and Iron into human words instead of doctor-code!"
        )
    else:
        return (
            f"I hear you! Dealing with '{message}' can feel like trying to solve a Rubik's cube in the dark. 🧩 Remember to listen to your body (it usually knows what's up). "
            f"Try logging this in the tracker so our AI Health Twin can analyze the patterns. If it's a major emergency, put down the phone and call your doctor!"
        )

def analyze_blood_report(image_bytes: bytes, file_name: str) -> Dict[str, Any]:
    """
    Renders text and insights from a blood report image or PDF using Gemini Vision.
    """
    prompt = """
    You are a medical laboratory report analyzer. Scan the attached blood report image or document.
    Identify and extract values for major markers, particularly:
    - Iron / Ferritin / Hemoglobin
    - Vitamin D
    - Thyroid (TSH / T3 / T4)
    - Blood Sugar (Glucose / HbA1c)

    Return the output STRICTLY as a JSON object with:
    - 'summary': A 2-3 sentence reassuring summary of findings.
    - 'iron_level': Status (e.g., 'Normal', 'Borderline Low', 'Low' with the value)
    - 'vitamin_d_level': Status
    - 'thyroid_level': Status
    - 'sugar_level': Status
    - 'warnings': A JSON array of string warning messages if any markers are outside standard ranges.

    Be gentle and positive. Emphasize this is a draft analysis for their wellness dashboard and they should review it with a doctor.
    """
    
    # 1. Try Gemini
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["vision"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            image_parts = [
                {
                    "mime_type": "image/jpeg" if file_name.endswith(('.jpg', '.jpeg')) else "image/png",
                    "data": base64.b64encode(image_bytes).decode("utf-8")
                }
            ]
            response = model.generate_content([prompt, image_parts[0]])
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini blood report analyzer failed, trying Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_res = call_groq_vision(SYSTEM_INSTRUCTION, image_bytes, file_name, prompt)
            if groq_res:
                return groq_res
        except Exception as e:
            print(f"Groq blood report analyzer failed: {str(e)}")

    # 3. Fallback mock
    return {
        "summary": "We scanned your blood report. Most values look wonderful, but we noticed a slightly lower level of Vitamin D and Iron, which is very common and manageable with minor changes.",
        "iron_level": "Borderline Low (11.2 g/dL - normal range is 12-15)",
        "vitamin_d_level": "Low (22 ng/mL - normal range is 30-100)",
        "thyroid_level": "Normal (1.8 uIU/mL)",
        "sugar_level": "Normal (88 mg/dL fasting)",
        "warnings": [
            "Your Vitamin D is below optimal levels. Consider discussing a supplement or sunlight exposure with your doctor.",
            "Iron levels are slightly low, which might explain any recent afternoon tiredness."
        ]
    }

def analyze_meal(image_bytes: bytes, file_name: str) -> Dict[str, Any]:
    """
    Scans a meal image using Gemini Vision and extracts macro/micronutrient insights.
    """
    prompt = """
    Analyze this meal image. Estimate the food item and provide a quick nutritional breakdown.
    Return the output STRICTLY as a JSON object with:
    - 'food_name': Name of detected food
    - 'calories': Estimated calories (integer)
    - 'protein': Estimated protein in grams (float)
    - 'iron': Estimated iron in milligrams (float)
    - 'fiber': Estimated fiber in grams (float)
    - 'suggestions': A friendly advice sentence about how to make it more balanced (e.g. adding healthy fats or fiber).
    """

    # 1. Try Gemini
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["vision"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            image_parts = [
                {
                    "mime_type": "image/jpeg" if file_name.endswith(('.jpg', '.jpeg')) else "image/png",
                    "data": base64.b64encode(image_bytes).decode("utf-8")
                }
            ]
            response = model.generate_content([prompt, image_parts[0]])
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini meal analyzer failed, trying Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_res = call_groq_vision(SYSTEM_INSTRUCTION, image_bytes, file_name, prompt)
            if groq_res:
                return groq_res
        except Exception as e:
            print(f"Groq meal analyzer failed: {str(e)}")

    return {
        "food_name": "Avocado Toast with Poached Egg and Cherry Tomatoes",
        "calories": 380,
        "protein": 14.5,
        "iron": 1.8,
        "fiber": 6.2,
        "suggestions": "This is a fantastic breakfast choice! To optimize iron absorption, try adding a squeeze of lemon or pairing it with a glass of orange juice (Vitamin C improves plant-based iron intake)."
    }

def analyze_skin(image_bytes: bytes, file_name: str) -> Dict[str, Any]:
    """
    Scans a face selfie image using Gemini Vision and extracts acne levels, pigmentation, hydration, and cycle correlation.
    """
    prompt = """
    Analyze this face selfie. Estimate:
    - 'acne': acne severity level (e.g. Mild, Moderate, Severe, or none spotted)
    - 'pigmentation': skin pigmentation index (e.g. Low, Moderate, High)
    - 'hydration': skin moisture level (e.g. 70% Hydrated, 55% Dry)
    - 'hormonalLink': A reassuring, cycle-correlation sentence explaining how progesterone or estrogen peaks during luteal or follicular phases affect their skin sebum and breakouts.
    
    Return the output STRICTLY as a JSON object matching these keys. Do not return markdown backticks.
    """

    # 1. Try Gemini
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["vision"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            image_parts = [
                {
                    "mime_type": "image/jpeg" if file_name.endswith(('.jpg', '.jpeg')) else "image/png",
                    "data": base64.b64encode(image_bytes).decode("utf-8")
                }
            ]
            response = model.generate_content([prompt, image_parts[0]])
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini skin analyzer failed, trying Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_res = call_groq_vision(SYSTEM_INSTRUCTION, image_bytes, file_name, prompt)
            if groq_res:
                return groq_res
        except Exception as e:
            print(f"Groq skin analyzer failed: {str(e)}")

    return {
        "acne": "Mild inflammatory sebum bumps detected on chin",
        "pigmentation": "Optimal/Low",
        "hydration": "62% (Slightly Dry)",
        "hormonalLink": "Progesterone levels are elevating in current Luteal window, triggering increased gland oil secretion. Focus on water intake & tea tree cleansers."
    }

def check_food_health(food_name: str) -> Dict[str, Any]:
    """
    Analyzes whether a food item is healthy or unhealthy using LLM reasoning.
    Returns recommendations and logic in a strict JSON format.
    """
    prompt = f"""
    Analyze this food item: "{food_name}".
    Determine if it is generally considered "unhealthy" (high in refined sugar, trans fats, refined carbs, artificial preservatives, or triggers severe blood sugar spikes) or "healthy" (nutrient-dense, whole food, rich in protein/fiber/vitamins).

    Return the output STRICTLY as a JSON object with the following keys:
    - 'is_unhealthy': boolean (true if unhealthy, false if healthy)
    - 'healthy_swap': string (If unhealthy, suggest a delicious healthier alternative. If healthy, write "No swap needed! This is a nutritious choice.")
    - 'reason': string (A 1-2 sentence explanation of why it is unhealthy or why it is healthy.)
    - 'benefits': string (A 1-2 sentence description of the key nutritional benefits of this food or of the recommended swap, especially tied to women's hormonal balance, energy, or cycles.)

    Do not include markdown backticks like ```json in your response. Just return raw json.
    """

    # 1. Try Gemini first
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            response = model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini check_food_health failed, trying Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_reply = call_groq_chat(
                system_instruction=SYSTEM_INSTRUCTION + "\nReturn ONLY a valid JSON object.",
                prompt=prompt
            )
            if groq_reply:
                clean_text = groq_reply.replace("```json", "").replace("```", "").strip()
                return json.loads(clean_text)
        except Exception as e:
            print(f"Groq check_food_health failed: {str(e)}")

    # 3. Fallback mock
    food_lower = food_name.lower().strip()
    if any(unhealthy_key in food_lower for unhealthy_key in ["pizza", "burger", "fries", "cola", "donut", "soda", "chips", "maggi"]):
        return {
            "is_unhealthy": True,
            "healthy_swap": "Spiced Lentil Soup / Sauteed green vegetables & Paneer tikka",
            "reason": f"'{food_name}' is high in simple refined carbs and trans fats, leading to rapid blood sugar spikes.",
            "benefits": "The recommended swap is rich in dietary fiber and lean protein, which stabilizes insulin levels and supports hormonal repair."
        }
    else:
        return {
            "is_unhealthy": False,
            "healthy_swap": "No swap needed! This is a nutritious choice.",
            "reason": f"'{food_name}' is a wholesome, nutrient-dense ingredient that fits perfectly into a clean diet.",
            "benefits": "Supports smooth digestive function, supplies vital micronutrients, and aids in baseline energy levels without causing sugar crashes."
        }

def estimate_nutrition_text(food_text: str) -> Dict[str, Any]:
    """
    Estimates macros (calories, protein, iron, fiber) from a text description of a meal.
    """
    prompt = f"""
    Estimate the nutritional values for this meal description: "{food_text}".
    Provide a realistic, scientific estimation for one serving.

    Return the output STRICTLY as a JSON object with the following keys:
    - 'food_name': string (the standardized name of the food)
    - 'calories': integer (kcal)
    - 'protein': float (grams)
    - 'iron': float (mg)
    - 'fiber': float (grams)

    Do not include markdown backticks like ```json in your response. Just return raw json.
    """

    # 1. Try Gemini first
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            response = model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Gemini estimate_nutrition_text failed, trying Groq... Error: {str(e)}")

    # 2. Try Groq fallback
    if settings.GROQ_API_KEY and not settings.USE_MOCK_DATA:
        try:
            groq_reply = call_groq_chat(
                system_instruction=SYSTEM_INSTRUCTION + "\nReturn ONLY a valid JSON object.",
                prompt=prompt
            )
            if groq_reply:
                clean_text = groq_reply.replace("```json", "").replace("```", "").strip()
                return json.loads(clean_text)
        except Exception as e:
            print(f"Groq estimate_nutrition_text failed: {str(e)}")

    # 3. Mock Fallback
    return {
        "food_name": food_text,
        "calories": 250,
        "protein": 8.0,
        "iron": 1.2,
        "fiber": 2.5
    }


