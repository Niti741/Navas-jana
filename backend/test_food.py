import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

from backend.ai.gemini import check_food_health

print("🍎 Testing Healthy Food: 'tomato'...")
res_healthy = check_food_health("tomato")
print("Response:")
print(res_healthy)

print("\n🍔 Testing Unhealthy Food: 'pizza'...")
res_unhealthy = check_food_health("pizza")
print("Response:")
print(res_unhealthy)
