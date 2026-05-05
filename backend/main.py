from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from . import crud, models, schemas, ai
from .database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TodoComplex API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks/breakdown", response_model=schemas.Task)
def breakdown_and_create_task(request: schemas.TaskBreakdownRequest, db: Session = Depends(get_db)):
    print(f"Received breakdown request: {request.title}")
    try:
        # 1. Create the main task
        task_create = schemas.TaskCreate(
            title=request.title,
            description=request.description,
            status=models.Status.TODO,
            priority=models.Priority.MEDIUM
        )
        db_task = crud.create_task(db=db, task=task_create)
        print(f"Created main task ID: {db_task.id}")
        
        # 2. Get breakdown from AI
        subtask_titles = ai.breakdown_task(request.title, request.description or "")
        print(f"AI generated {len(subtask_titles)} subtasks")
        
        # 3. Create subtasks
        for title in subtask_titles:
            subtask_create = schemas.SubTaskCreate(title=title)
            crud.create_subtask(db=db, subtask=subtask_create, task_id=db_task.id)
        
        db.refresh(db_task)
        return db_task
    except Exception as e:
        print(f"Error in breakdown_and_create_task: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)

@app.get("/tasks/", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks

@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.update_task(db=db, task_id=task_id, task=task)

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    crud.delete_task(db=db, task_id=task_id)
    return {"message": "Task deleted"}

@app.post("/tasks/{task_id}/subtasks/", response_model=schemas.SubTask)
def create_subtask(task_id: int, subtask: schemas.SubTaskCreate, db: Session = Depends(get_db)):
    return crud.create_subtask(db=db, subtask=subtask, task_id=task_id)

@app.patch("/subtasks/{subtask_id}", response_model=schemas.SubTask)
def update_subtask(subtask_id: int, is_completed: bool, db: Session = Depends(get_db)):
    return crud.update_subtask(db=db, subtask_id=subtask_id, is_completed=is_completed)

@app.get("/")
def read_root():
    return {"message": "Welcome to TodoComplex API"}
