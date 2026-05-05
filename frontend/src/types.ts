export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}

export interface SubTask {
    id: number;
    title: string;
    is_completed: boolean;
    task_id: number;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    due_date?: string;
    created_at: string;
    subtasks: SubTask[];
}

export interface TaskCreate {
    title: string;
    description?: string;
    priority?: Priority;
    status?: Status;
    due_date?: string;
}

export interface TaskBreakdownRequest {
    title: string;
    description?: string;
}
