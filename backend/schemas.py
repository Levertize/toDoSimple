from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .models import Priority, Status

class SubTaskBase(BaseModel):
    title: str
    is_completed: bool = False

class SubTaskCreate(SubTaskBase):
    pass

class SubTask(SubTaskBase):
    id: int
    task_id: int

    class Config:
        orm_mode = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Priority = Priority.MEDIUM
    status: Status = Status.TODO
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime
    subtasks: List[SubTask] = []

    class Config:
        orm_mode = True

class TaskBreakdownRequest(BaseModel):
    title: str
    description: Optional[str] = None
