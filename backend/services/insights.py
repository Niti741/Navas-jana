from typing import Dict, Any, List
from datetime import date

def calculate_wellness_score(logs: Dict[str, Any], profile: Dict[str, Any]) -> int:
    """
    Computes wellness score (0-100) based on weighted metrics:
    - Sleep: 25%
    - Nutrition: 20%
    - Water: 15%
    - Mood & Stress: 15%
    - Exercise: 10%
    - Medicine: 10%
    - Cycle Health: 5%
    """
    
    # 1. Sleep Score (out of 100)
    # Target: 8 hours
    sleep_hours = logs.get("sleep", {}).get("hours", 8.0)
    sleep_score = min((sleep_hours / 8.0) * 100, 100.0)
    if logs.get("sleep", {}).get("quality") == "Poor":
        sleep_score = max(sleep_score - 20, 30.0)
    elif logs.get("sleep", {}).get("quality") == "Excellent":
        sleep_score = min(sleep_score + 10, 100.0)
        
    # 2. Nutrition Score (out of 100)
    # Target: Balanced calorie/protein distribution, protein around 45g
    nutrition_data = logs.get("nutrition", {})
    if nutrition_data:
        protein = nutrition_data.get("protein", 45.0)
        protein_score = min((protein / 45.0) * 100, 100.0)
        cal = nutrition_data.get("calories", 1800)
        # Calories target between 1600 and 2200
        cal_score = 100.0 if 1600 <= cal <= 2200 else max(100.0 - abs(1800 - cal) // 10, 50.0)
        nutrition_score = (protein_score + cal_score) / 2
    else:
        nutrition_score = 75.0 # baseline default if not logged
        
    # 3. Water Score (out of 100)
    # Target: 2.5 Liters
    water_liters = logs.get("water", {}).get("liters", 2.0)
    water_score = min((water_liters / 2.5) * 100, 100.0)
    
    # 4. Mood & Stress Score (out of 100)
    # Target: Low stress (1-3)
    stress = logs.get("mood", {}).get("stress_level", 3)
    mood_str = logs.get("mood", {}).get("mood", "Calm")
    # Invert stress (1 stress = 100 score, 10 stress = 10 score)
    stress_score = 100.0 - (stress - 1) * 10.0
    mood_multiplier = {
        "Happy": 1.0, "Energetic": 1.0, "Calm": 0.95,
        "Tired": 0.8, "Anxious": 0.7, "Irritable": 0.6
    }
    mood_score = stress_score * mood_multiplier.get(mood_str, 0.9)
    mood_score = max(min(mood_score, 100.0), 20.0)
    
    # 5. Exercise Score (out of 100)
    # Target: 10,000 steps
    steps = logs.get("exercise", {}).get("steps", 7500)
    exercise_score = min((steps / 10000.0) * 100, 100.0)
    
    # 6. Medicine Compliance Score (out of 100)
    meds = logs.get("medicines", [])
    if meds:
        taken_meds = [m for m in meds if m.get("taken", False)]
        medicine_score = (len(taken_meds) / len(meds)) * 100
    else:
        medicine_score = 100.0 # 100% if no meds scheduled
        
    # 7. Cycle Health (out of 100)
    cycle = logs.get("cycle", {})
    if cycle:
        pain = cycle.get("pain", "None")
        flow = cycle.get("flow", "Medium")
        # Deduct for heavy pain or flow anomalies
        cycle_score = 100.0
        if pain == "Severe":
            cycle_score -= 30
        elif pain == "Moderate":
            cycle_score -= 15
        if flow == "Heavy":
            cycle_score -= 10
    else:
        cycle_score = 90.0 # general default
        
    # Weighted Wellness Score
    score = (
        0.25 * sleep_score +
        0.20 * nutrition_score +
        0.15 * water_score +
        0.15 * mood_score +
        0.10 * exercise_score +
        0.10 * medicine_score +
        0.05 * cycle_score
    )
    
    return int(round(score))

def generate_smart_reminders(logs: Dict[str, Any], meds: List[Dict[str, Any]], profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Returns action items or reminders based on today's logged data.
    """
    reminders = []
    
    # Check water
    water_liters = logs.get("water", {}).get("liters", 0.0)
    if water_liters < 2.0:
        reminders.append({
            "title": "Hydration Reminder",
            "message": f"You've logged {water_liters}L of water. Try to drink another 500ml to reach your wellness goal.",
            "category": "Water"
        })
        
    # Check medicines
    for m in meds:
        if not m.get("taken"):
            reminders.append({
                "title": f"Take {m.get('medicine_name')}",
                "message": f"Scheduled for {m.get('scheduled_time')} ({m.get('dosage')})",
                "category": "Medicine"
            })
            
    # Check movement
    steps = logs.get("exercise", {}).get("steps", 0)
    if steps < 5000:
        reminders.append({
            "title": "Evening Walk",
            "message": f"You are at {steps} steps today. A light 15-minute walk will boost circulation and energy.",
            "category": "Exercise"
        })
        
    # Check period
    if not profile.get("menopause") and not profile.get("pregnancy"):
        # Predict based on cycle logs (mocked for prompt)
        reminders.append({
            "title": "Cycle Alert",
            "message": "Your cycle is predicted to start in approximately 4 days. Pack cycle essentials.",
            "category": "Cycle"
        })
        
    return reminders
