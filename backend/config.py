import os
from dotenv import load_dotenv

# Load from .env file if present (checking current working directory and backend directory specifically)
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

class Settings:
    PROJECT_NAME: str = "Sakhi AI Health Companion Backend"
    VERSION: str = "1.0.0"
    
    # Hybrid Mode Configuration
    USE_MOCK_DATA: bool = os.getenv("USE_MOCK_DATA", "true").lower() in ("true", "1", "yes")
    
    # Credentials (only used if USE_MOCK_DATA is False)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

settings = Settings()
