import os
import sys
# Add parent directory to path so backend import works
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

from backend.config import settings
from backend.ai.gemini import get_chat_response

print("Settings Details:")
print(f"USE_MOCK_DATA: {settings.USE_MOCK_DATA}")
print(f"GEMINI_API_KEY: {settings.GEMINI_API_KEY[:6]}...")
print(f"GROQ_API_KEY: {settings.GROQ_API_KEY[:6]}...")

history = []
profile = {"age": 26, "pregnancy": False, "conditions": "PCOS"}
message = "How can I reduce PCOS acne?"

print(f"\n⏳ Calling get_chat_response with message: '{message}'...")
reply = get_chat_response(message, history, profile)
print("\n✅ Response Received:")
print(reply)
