import os
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
groq_key = os.getenv("GROQ_API_KEY", "")

print(f"Loaded Groq Key: {groq_key[:6]}...{groq_key[-6:] if len(groq_key) > 6 else ''}")

if not groq_key or "YOUR_GROQ" in groq_key:
    print("❌ Error: GROQ_API_KEY is not configured in your .env!")
    exit(1)

try:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {groq_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "user", "content": "Say 'Groq Success' if you can read this."}
        ]
    }
    
    print("⏳ Sending request to Groq...")
    resp = requests.post(url, json=payload, headers=headers, timeout=10)
    if resp.status_code == 200:
        print("✅ Live Groq Response:")
        print(resp.json()["choices"][0]["message"]["content"])
    else:
        print(f"❌ Groq API Error Status {resp.status_code}:")
        print(resp.text)
except Exception as e:
    print("❌ Groq exception details:")
    print(str(e))
