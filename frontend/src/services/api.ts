import axios from 'axios';
import type { Task, TaskCreate, TaskBreakdownRequest } from '../types';
import { Status } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const taskService = {
    getTasks: async () => {
        const response = await api.get<Task[]>('/tasks/');
        return response.data;
    },
    createTask: async (task: any) => {
        const response = await api.post<Task>('/tasks/', task);
        return response.data;
    },
    breakdownTask: async (request: TaskBreakdownRequest) => {
        const response = await api.post<Task>('/tasks/breakdown', request);
        return response.data;
    },
    updateTask: async (taskId: number, task: any) => {
        const response = await api.put<Task>(`/tasks/${taskId}`, task);
        return response.data;
    },
    deleteTask: async (taskId: number) => {
        await api.delete(`/tasks/${taskId}`);
    },
    updateSubtask: async (subtaskId: number, isCompleted: boolean) => {
        const response = await api.patch(`/subtasks/${subtaskId}?is_completed=${isCompleted}`);
        return response.data;
    }
};
