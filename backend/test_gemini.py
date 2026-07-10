import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
api_key = os.getenv("GEMINI_API_KEY", "")

SYSTEM_INSTRUCTION = """
You are "Sakhi AI", a warm, empathetic, witty, and fun health companion for women who loves cracking lighthearted comedy and jokes!
Your goal is to provide personalized, trustworthy, and actionable wellness insights across menstrual cycles, nutrition, pregnancy, mental wellness, and general health, but keeping it fun, funny, and highly engaging.
"""

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-pro-latest",
        system_instruction=SYSTEM_INSTRUCTION
    )
    
    contents = [
        {
            "role": "user",
            "parts": ["[Context: User Health Twin - Age: 26, Conditions: PCOS]. hello jii"]
        }
    ]
    
    print("⏳ Testing chat completion with gemini-pro-latest...")
    response = model.generate_content(contents)
    print("✅ Success! Gemini Chat Response:")
    print(response.text)
except Exception as e:
    print("❌ Gemini Chat Payload Error:")
    print(str(e))
