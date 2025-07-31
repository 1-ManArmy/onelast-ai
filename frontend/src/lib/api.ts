import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => api.post('/api/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/api/auth/login', credentials),

  getCurrentUser: () => api.get('/api/auth/me'),

  updateProfile: (profileData: any) =>
    api.put('/api/auth/profile', profileData),
};

// Memory API
export const memoryAPI = {
  create: (memoryData: {
    type: string;
    title?: string;
    content: string;
    summary?: string;
    tags?: string[];
    category?: string;
    priority?: string;
  }) => api.post('/api/memories', memoryData),

  getAll: (params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
    tags?: string;
    priority?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => api.get('/api/memories', { params }),

  getById: (id: string) => api.get(`/api/memories/${id}`),

  update: (id: string, updateData: any) =>
    api.put(`/api/memories/${id}`, updateData),

  delete: (id: string) => api.delete(`/api/memories/${id}`),

  search: (query: string, limit?: number) =>
    api.get(`/api/memories/search/${encodeURIComponent(query)}`, {
      params: { limit },
    }),

  getRelated: (id: string) => api.get(`/api/memories/${id}/related`),
};

// User API
export const userAPI = {
  getDashboard: () => api.get('/api/users/dashboard'),

  getStats: () => api.get('/api/users/stats'),

  exportData: () => api.post('/api/users/export'),

  deleteAccount: () => api.delete('/api/users/account'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
