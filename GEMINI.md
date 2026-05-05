# GEMINI.md — Agent Instructions for TodoComplex Project

> This file is the single source of truth for the Gemini AI agent working on this project.
> It has been updated to reflect the shift from a "simple" app to a "complex" full-stack application.

---

## 🧠 Project Overview

**TodoComplex** is an over-engineered task management system designed to explore modern full-stack development and AI integration.

**Core Features:**
- **Advanced Task Management**: Sub-tasks, priorities, due dates, and categories.
- **Kanban Board UI**: Drag-and-drop interface for task status management.
- **AI Task Breaker**: Integration with Gemini API to automatically decompose large tasks into manageable sub-tasks.
- **Full-stack Architecture**: Separate frontend and backend with a persistent database.

---

## 🗂️ Project Structure

```
toDoSimple/
├── backend/            # FastAPI Backend
│   ├── main.py         # Entry point
│   ├── models.py       # SQLAlchemy models
│   ├── schemas.py      # Pydantic schemas
│   ├── database.py     # DB configuration
│   └── crud.py         # DB operations
├── frontend/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── store/      # Zustand stores
│   │   ├── hooks/
│   │   └── services/   # API calls
│   └── ...
└── GEMINI.md           # You are here
```

---

## ⚙️ Tech Stack

| Layer      | Choice                        |
|------------|-------------------------------|
| Frontend   | React (TypeScript) + Vite     |
| Backend    | Python (FastAPI)              |
| Database   | SQLite + SQLAlchemy           |
| State Mgmt | Zustand                       |
| AI         | Google Gemini API             |
| Styling    | Vanilla CSS                   |

---

## ✅ Coding Standards

### Backend (Python)
- Use **FastAPI** with type hints.
- **Pydantic** for request/response validation.
- **SQLAlchemy** (async preferred if possible, or standard for simplicity with SQLite).
- Organize code into `main.py`, `models.py`, `schemas.py`, `crud.py`.

### Frontend (React)
- **TypeScript** is mandatory.
- **Functional Components** with Hooks.
- **Zustand** for global state (tasks, UI state).
- **Vanilla CSS** for all styling. Use CSS variables.
- Keep components small and reusable.

---

## 🔄 AI Interaction Flow

1. User enters a complex task.
2. Frontend sends the task to `/api/tasks/breakdown`.
3. Backend calls Gemini API to generate a list of sub-tasks.
4. Backend saves the main task and the generated sub-tasks to SQLite.
5. Frontend updates the UI to show the new task and its sub-tasks.

---

*Last updated: 2026-05-04. Updated to reflect "Complex" project direction.*
