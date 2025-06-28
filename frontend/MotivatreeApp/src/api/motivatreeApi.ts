
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Projects API
export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  return response.json();
};

export const createProject = async (project: { name: string; description: string }) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

export const updateProject = async (id: number, project: { name?: string; description?: string }) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

export const deleteProject = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Tasks API
export const getTasks = async (projectId: number) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
  return response.json();
};

export const createTask = async (projectId: number, task: { name: string; description: string; status: string; dueDate: string }) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (projectId: number, taskId: number, task: { name?: string; description?: string; status?: string; dueDate?: string }) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (projectId: number, taskId: number) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  return response.json();
};
