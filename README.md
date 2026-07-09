# Sakhi – Your Everyday AI Health Companion (Hackathon Edition)
**Tagline:** "Your Everyday AI Health Companion for Every Stage of a Woman's Life."

Sakhi is an AI-powered women's health companion built for a premium, calm, and trustworthy healthcare experience. Rather than running disconnected tools, Sakhi introduces the **AI Health Twin** concept where all lifestyle inputs, menstrual tracker dates, scanned meals, and uploaded blood reports sync into a central **Health Insights Engine** to calculate your dynamic Wellness Score and serve customized advice.

---

## Technical Architecture

```
                     AI Health Twin (Digital Model)
                           │
 ─────────────────────────────────────────────────────────────────
 │         │          │         │          │           │         │
Cycle    Mood      Sleep    Nutrition   Reports    Exercise  Medicine
 │         │          │         │          │           │         │
 └─────────┴──────────┴─────────┴──────────┴───────────┴─────────┘
                    │
         Health Insights Engine (Calculations Service)
                    │
        Wellness Score + AI Recommendations
                    │
      Dashboard + Smart Reminders + Chatbot Dialogs
```

### Core Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS (v3) + Framer Motion + Recharts + Lucide Icons.
- **Backend:** FastAPI (Python) + Uvicorn server.
- **Database:** Supabase PostgreSQL with seed tables.
- **AI Integrations:** Google Gemini API (Chat, Vision analysis for meal logging and blood report scanning).

---

## Getting Started

To support zero-configuration judges/developers running the application instantly without configuring Supabase tables or Gemini API keys, the system operates in a **Hybrid Mock/Live Mode**. By default, it runs with high-fidelity synthetic mock data. To activate live API bindings, populate the environment variables.

### 1. Backend Setup & Run
Make sure you have Python 3.8+ installed.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows (Command Prompt):
   venv\Scripts\activate.bat
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment:
   Create a `.env` file in the root `sakhi/backend/.env` folder:
   ```env
   USE_MOCK_DATA=true
   GEMINI_API_KEY=your_gemini_api_key_here
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend will be live at `http://127.5.5.1:8000` with Swagger docs at `http://127.5.5.1:8000/docs`.

---

## 2. Frontend Setup & Run
Make sure you have Node.js installed.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000` to interact with Sakhi.

---

## Features Implemented
1. **Module 1: Premium Landing Page** - Hero layout, floating active twin metrics, horizontal life stage timeline (Teen to Senior), FAQ accordions, responsive footer.
2. **Module 2: Authentications** - Register/Login layouts with custom demo log-in (Alice seed).
3. **Module 3: Health Twin Profile Config** - Settings editor adjusting weight, height, conditions, and pregnancy toggles.
4. **Module 4: Personalized Dashboard** - Welcomes you with calculated wellness index, active medication checklists, water logs, sleep trackers, and activity steps.
5. **Module 5: Cycle Calendar** - Interactive monthly grid indicating predicted period and ovulation slots.
6. **Module 6: Nutrition AI Vision** - Drag-and-drop plate scanning extracting protein, iron, and fiber counts parsed by Gemini Vision.
7. **Module 7: Blood Report Analyzer** - Scanning medical lab images to output thyroid, sugar, and Vitamin D warnings.
8. **Module 10: Sakhi Chatbot** - Context-aware assistant supporting quick-pill prompts.
9. **Module 12: Analytics Trends** - Beautiful area, bar, and line graphs showing weekly logs.
10. **Module 13: Emergency SOS Widget** - Immediate triggers alert contacts and displays your medical card.
