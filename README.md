
# 🧠 toDoSimple

> "Literally productivity on another level, honestly."

**toDoSimple** adalah sebuah masterpiece hasil kegabutan yang hakiki. Kita sadar banget kalo To-Do list biasa tuh *so yesterday*. Makanya, kita bikin sesuatu yang lebih *sophisticated*—sebuah task management system yang dibedah langsung pake Gemini AI dan dibalut interface yang *clean* parah, ala-ala startup unicorn di Silicon Valley.

![Modern Pro Dark UI](https://img.shields.io/badge/UI-Obsidian%20Dark-09090b?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%20Pro-blue?style=for-the-badge&logo=google-gemini&logoColor=white)

---

## ✨ Key Features (Yang Bikin Beda)

-   **🤖 AI Task Breaker**: Masukin goals lo yang *vague* kayak "Belajar Quantum Physics," terus biarkan Gemini AI yang *breakdown* jadi sub-tasks kecil yang *actionable*. Lo tinggal duduk manis aja.
-   **🌑 Obsidian Pro UI**: Design-nya *literally* minimalis banget, terinspirasi dari Linear dan Raycast. Tipis, tajam, dan punya *subtle glow* yang bikin mata lo nyaman berlama-lama.
-   **📋 Kanban Flow**: *Smooth* parah! Tinggal *drag-and-drop* tugas lo dari `To Do`, `In Progress`, sampe `Done`. *Experience*-nya dapet banget.
-   **💾 Zero Data Loss**: Pake SQLite dan SQLAlchemy biar data lo tetep *persistent*. Gak ada lagi drama tugas ilang pas di-restart.
-   **⚡ High Performance**: Dibangun pake Vite dan FastAPI biar *interaction*-nya berasa *instant*, gak pake lama.

---

## 🛠️ Tech Stack (The Secret Sauce)

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| **Frontend**   | React 19, TypeScript, Vite, Zustand |
| **Backend**    | Python 3.12+, FastAPI, Uvicorn      |
| **AI Engine**  | Google Gemini API                   |
| **Database**   | SQLite + SQLAlchemy                 |
| **Styling**    | Pure CSS (Modern Pro Dark System)   |
| **Icons**      | Lucide React                        |

---

## 🚀 How to Get Started (Gercep!)

### 1. Clone & Prep
```bash
git clone https://github.com/yourusername/toDoComplex.git
cd toDoComplex
```

### 2. Backend Setup (The Engine)
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
```
Bikin file `.env` di folder `backend`, terus isi:
```env
GEMINI_API_KEY=api_key_gemini_lo_disini
```

### 3. Frontend Setup (The Face)
```bash
cd ../frontend
npm install
```

### 4. Let's Go!
**Terminal 1 (Backend):**
```bash
# Jalanin dari root folder biar gak error import-nya
uvicorn backend.main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## ❔ Why build this?

Kenapa kita bikin ini? *Simple* sih, karena kita ngerasa aplikasi produktivitas tuh harusnya punya *soul*, bukan cuma fungsional doang. Proyek ini tuh *basically* ajang *showcase* buat *killing boredom* dengan cara gabungin *UI trend* paling *hype* sama *power of LLMs*. 

**Warning:** Pake aplikasi ini bisa bikin lo beneran produktif. *Don't say I didn't warn you.*

---

## 📜 License

Project ini pake lisensi "me Lagi Gabut". *Feel free* buat ngapain aja.

*Built with passion and high-end aesthetics by* [Lev/Gemini]
