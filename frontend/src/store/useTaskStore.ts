import { create } from 'zustand';
import type { Task } from '../types';
import { Status } from '../types';
import { taskService } from '../services/api';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: any) => Promise<void>;
    addComplexTask: (title: string, description: string) => Promise<void>;
    updateTaskStatus: (taskId: number, status: Status) => Promise<void>;
    toggleSubtask: (taskId: number, subtaskId: number, isCompleted: boolean) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const tasks = await taskService.getTasks();
            set({ tasks, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', isLoading: false });
        }
    },

    addTask: async (taskData) => {
        try {
            const newTask = await taskService.createTask(taskData);
            set({ tasks: [...get().tasks, newTask] });
        } catch (error) {
            set({ error: 'Failed to add task' });
        }
    },

    addComplexTask: async (title, description) => {
        set({ isLoading: true });
        try {
            const newTask = await taskService.breakdownTask({ title, description });
            set({ tasks: [...get().tasks, newTask], isLoading: false });
        } catch (error) {
            set({ error: 'Failed to breakdown task', isLoading: false });
        }
    },

    updateTaskStatus: async (taskId, status) => {
        const task = get().tasks.find(t => t.id === taskId);
        if (!task) return;

        try {
            const updatedTask = await taskService.updateTask(taskId, { ...task, status });
            set({
                tasks: get().tasks.map(t => t.id === taskId ? updatedTask : t)
            });
        } catch (error) {
            set({ error: 'Failed to update task status' });
        }
    },

    toggleSubtask: async (taskId, subtaskId, isCompleted) => {
        try {
            await taskService.updateSubtask(subtaskId, isCompleted);
            set({
                tasks: get().tasks.map(t => {
                    if (t.id === taskId) {
                        return {
                            ...t,
                            subtasks: t.subtasks.map(st => 
                                st.id === subtaskId ? { ...st, is_completed: isCompleted } : st
                            )
                        };
                    }
                    return t;
                })
            });
        } catch (error) {
            set({ error: 'Failed to update subtask' });
        }
    },

    deleteTask: async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            set({ tasks: get().tasks.filter(t => t.id !== taskId) });
        } catch (error) {
            set({ error: 'Failed to delete task' });
        }
    }
}));
