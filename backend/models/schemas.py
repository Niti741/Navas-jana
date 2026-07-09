from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date, datetime, time

# Auth Schemas
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Health Profile (Digital Health Twin)
class HealthProfileUpdate(BaseModel):
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    conditions: Optional[str] = None
    pregnancy: Optional[bool] = False
    menopause: Optional[bool] = False
    goals: Optional[str] = None

class HealthProfileResponse(HealthProfileUpdate):
    user_id: str

    class Config:
        from_attributes = True

# Logs Schemas
class CycleLogCreate(BaseModel):
    date: date
    flow: Optional[str] = None # Light, Medium, Heavy, Spotting
    pain: Optional[str] = None # None, Mild, Moderate, Severe
    mood: Optional[str] = None
    symptoms: Optional[str] = None

class MoodLogCreate(BaseModel):
    date: date
    mood: str
    stress_level: int = Field(..., ge=1, le=10)
    notes: Optional[str] = None

class WaterLogCreate(BaseModel):
    date: date
    liters: float = Field(..., ge=0.0)

class SleepLogCreate(BaseModel):
    date: date
    hours: float = Field(..., ge=0.0)
    quality: str # Poor, Fair, Good, Excellent

class MedicineCreate(BaseModel):
    medicine_name: str
    dosage: Optional[str] = None
    scheduled_time: str # Format: HH:MM
    taken: bool = False
    date: date

class MedicineResponse(MedicineCreate):
    id: str
    user_id: str

    class Config:
        from_attributes = True

# AI & Chat Schemas
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    role: str
    message: str
    timestamp: datetime

# Meal Scanner & Report Scanner
class MealAnalyzeResponse(BaseModel):
    food_name: str
    calories: int
    protein: float # in g
    iron: float # in mg
    fiber: float # in g
    suggestions: str

class ReportAnalyzeResponse(BaseModel):
    summary: str
    iron_level: str
    vitamin_d_level: str
    thyroid_level: str
    sugar_level: str
    warnings: List[str]

class SOSRequest(BaseModel):
    contacts: List[str]
