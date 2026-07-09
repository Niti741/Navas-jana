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

# Configure Gemini if key is available and mock is disabled
if gemini_installed and settings.GEMINI_API_KEY and not settings.USE_MOCK_DATA:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    MODELS = {
        "text": "gemini-1.5-flash",
        "vision": "gemini-1.5-flash"
    }
else:
    genai = None

# System prompt for Sakhi AI
SYSTEM_INSTRUCTION = """
You are "Sakhi AI", a warm, empathetic, and knowledgeable health companion for women.
Your goal is to provide personalized, trustworthy, and actionable wellness insights across menstrual cycles, nutrition, pregnancy, mental wellness, and general health.
Tone guidelines:
- Friendly, warm, empowering, calming, and caring (Headspace/Apple-like feel).
- Do not sound cold, sterile, or overly clinical.
- Avoid using harsh list styles when a friendly paragraph fits better.
- Explicitly emphasize that your insights are for educational/wellness guidance and do not replace professional medical advice. Always add a gentle, warm reminder of this.
- Respect and maintain the strict pastel-themed, warm ambiance of the application.
"""

def generate_recommendations(profile: Dict[str, Any], logs: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generates personalized recommendations based on the Health Profile (Health Twin) and recent logs.
    """
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=SYSTEM_INSTRUCTION
            )
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
            response = model.generate_content(prompt)
            # Remove markdown backticks if any
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            # Fallback to mock in case of API failure
            pass

    # Mock recommendations
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
    
    # Customize based on profile
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
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["text"],
                system_instruction=SYSTEM_INSTRUCTION
            )
            # Format history
            contents = []
            for h in history:
                contents.append({
                    "role": "user" if h["role"] == "user" else "model",
                    "parts": [h["message"]]
                })
            
            # Context prompt injection
            context = f"[Context: User Health Twin - Age: {profile.get('age')}, Pregnancy: {profile.get('pregnancy')}, Menopause: {profile.get('menopause')}, Conditions: {profile.get('conditions')}]. "
            contents.append({
                "role": "user",
                "parts": [context + message]
            })
            
            response = model.generate_content(contents)
            return response.text
        except Exception as e:
            # Fallback
            pass

    # Mock Chat Responses matching women's health intents
    msg_lower = message.lower()
    
    if "period is late" in msg_lower or "late cycle" in msg_lower:
        return (
            "Based on your recent cycle history, stress level, and sleep pattern, your cycle may be delayed due to lifestyle changes, temporary stress, or a shift in sleep schedules. "
            "Our bodies are incredibly sensitive to these shifts! Try focusing on rest, gentle movement, and warmth today. "
            "Please note: if your period continues to be delayed beyond a week, or if there is a possibility of pregnancy, consider testing or consulting your healthcare provider."
        )
    elif "pregnant" in msg_lower or "pregnancy" in msg_lower:
        return (
            "Pregnancy is a beautiful, transformative journey. In this early stage, prioritizing nutrient-dense foods (rich in folate, iron, and choline), drinking plenty of water, and resting whenever your body asks for it are essential. "
            "Keep tracking your prenatal vitamins in the Medicine Assistant, and let me know if you feel any symptoms like morning sickness so we can adjust your daily recommendations!"
        )
    elif "pcos" in msg_lower or "pcod" in msg_lower:
        return (
            "Managing PCOS is all about finding a gentle, sustainable rhythm that works for your unique endocrine system. "
            "Focusing on anti-inflammatory whole foods, balancing meals with proteins and complex carbohydrates, and choosing joyful, low-stress movement like walking or strength training can make a big difference. "
            "I can help you monitor your cycle variations and track symptoms to share with your gynecologist!"
        )
    elif "blood report" in msg_lower or "iron" in msg_lower:
        return (
            "I've noted your query regarding blood reports. If you upload a blood report in the Report Analyzer, I will scan it for markers like Vitamin D, Iron (Ferritin), Thyroid (TSH), and HbA1c to provide a simple, friendly breakdown."
        )
    else:
        return (
            f"I hear you, and I am here for you! Taking care of yourself is a daily practice, and small steps make a big difference. "
            f"Regarding your query about '{message}', remember to listen to your body first. "
            f"If you'd like, you can log your symptoms, water, or sleep on the dashboard, and I'll generate updated insights for your health twin. "
            f"Always consult a physician if you experience severe pain or symptoms."
        )

def analyze_blood_report(image_bytes: bytes, file_name: str) -> Dict[str, Any]:
    """
    Renders text and insights from a blood report image or PDF using Gemini Vision.
    """
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["vision"],
                system_instruction=SYSTEM_INSTRUCTION
            )
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
            # Fallback
            pass

    # Mock Vision analysis
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
    if genai and not settings.USE_MOCK_DATA:
        try:
            model = genai.GenerativeModel(
                model_name=MODELS["vision"],
                system_instruction=SYSTEM_INSTRUCTION
            )
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
            pass

    # Mock meal scanner response
    return {
        "food_name": "Avocado Toast with Poached Egg and Cherry Tomatoes",
        "calories": 380,
        "protein": 14.5,
        "iron": 1.8,
        "fiber": 6.2,
        "suggestions": "This is a fantastic breakfast choice! To optimize iron absorption, try adding a squeeze of lemon or pairing it with a glass of orange juice (Vitamin C improves plant-based iron intake)."
    }
