
import axios from 'axios';
import { Project } from '../types/Project';
import { Task } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const motivatreeApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getProjects = async (): Promise<Project[]> => {
  const response = await motivatreeApi.get<Project[]>('/projects');
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await motivatreeApi.get<Project>(`/projects/${id}`);
  return response.data;
};

export const createProject = async (name: string, description?: string): Promise<Project> => {
  const response = await motivatreeApi.post<Project>('/projects', { name, description });
  return response.data;
};

export const getTasksByProjectId = async (projectId: string): Promise<Task[]> => {
  const response = await motivatreeApi.get<Task[]>(`/projects/${projectId}/tasks`);
  return response.data;
};

export const getTaskById = async (taskId: string): Promise<Task> => {
  const response = await motivatreeApi.get<Task>(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (projectId: string, title: string, description?: string): Promise<Task> => {
  const response = await motivatreeApi.post<Task>(`/projects/${projectId}/tasks`, { title, description });
  return response.data;
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<Task> => {
  const response = await motivatreeApi.put<Task>(`/tasks/${taskId}`, updates);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await motivatreeApi.delete(`/tasks/${taskId}`);
};

export default motivatreeApi;
