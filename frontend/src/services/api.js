import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@therapy_diary_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Auth Services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

// Session Services
export const sessionService = {
  getSession: (weekNumber) => api.get(`/sessions/${weekNumber}`),
  markSessionRead: (weekNumber) => api.post(`/sessions/${weekNumber}/read`),
  getUserProgress: () => api.get('/sessions/user/progress'),
};

// Daily Entry Services
export const dailyEntryService = {
  createEntry: (data) => api.post('/daily-entries', data),
  getWeekEntries: (weekNumber) => api.get(`/daily-entries/week/${weekNumber}`),
  getDayEntries: (weekNumber, dayNumber) => api.get(`/daily-entries/day/${weekNumber}/${dayNumber}`),
  updateEntry: (id, data) => api.put(`/daily-entries/${id}`, data),
  deleteEntry: (id) => api.delete(`/daily-entries/${id}`),
  completeWeek: (weekNumber) => api.post(`/daily-entries/week/${weekNumber}/complete`),
};

export default api;
