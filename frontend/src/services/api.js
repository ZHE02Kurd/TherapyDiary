/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE, API_ENDPOINTS, STORAGE_KEYS } from '../constants/config';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
      // You might want to navigate to login screen here
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Response with token and user data
   */
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH_REGISTER, userData);
    if (response.data.token) {
      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise} Response with token and user data
   */
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH_LOGIN, { email, password });
    if (response.data.token) {
      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH_ME);
    return response.data;
  },

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise} Updated user data
   */
  updateProfile: async (updates) => {
    const response = await api.put(API_ENDPOINTS.AUTH_UPDATE_PROFILE, updates);
    await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    return response.data;
  },

  /**
   * Change user password
   * @param {string} currentPassword 
   * @param {string} newPassword 
   * @returns {Promise}
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put(API_ENDPOINTS.AUTH_CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Logout user - clear local storage
   * @returns {Promise}
   */
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
    }
  },

  /**
   * Get stored token
   * @returns {Promise<string|null>}
   */
  getToken: async () => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get stored user data
   * @returns {Promise<Object|null>}
   */
  getStoredUser: async () => {
    const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
};

// Diary Service
export const diaryService = {
  /**
   * Get all diary entries with pagination
   * @param {Object} params - Query parameters (page, limit, startDate, endDate, timeOfDay)
   * @returns {Promise} Paginated diary entries
   */
  getEntries: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.DIARY, { params });
    return response.data;
  },

  /**
   * Get diary entries for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Diary entries for the date
   */
  getEntriesByDate: async (date) => {
    const response = await api.get(API_ENDPOINTS.DIARY_BY_DATE(date));
    return response.data;
  },

  /**
   * Get a single diary entry
   * @param {string} id - Entry ID
   * @returns {Promise} Diary entry
   */
  getEntry: async (id) => {
    const response = await api.get(API_ENDPOINTS.DIARY_BY_ID(id));
    return response.data;
  },

  /**
   * Create a new diary entry
   * @param {Object} entryData - Diary entry data
   * @returns {Promise} Created entry
   */
  createEntry: async (entryData) => {
    const response = await api.post(API_ENDPOINTS.DIARY, entryData);
    return response.data;
  },

  /**
   * Update a diary entry
   * @param {string} id - Entry ID
   * @param {Object} updates - Entry updates
   * @returns {Promise} Updated entry
   */
  updateEntry: async (id, updates) => {
    const response = await api.put(API_ENDPOINTS.DIARY_BY_ID(id), updates);
    return response.data;
  },

  /**
   * Delete a diary entry
   * @param {string} id - Entry ID
   * @returns {Promise}
   */
  deleteEntry: async (id) => {
    const response = await api.delete(API_ENDPOINTS.DIARY_BY_ID(id));
    return response.data;
  },
};

// Activity Service
export const activityService = {
  /**
   * Get all activities with filters
   * @param {Object} params - Query parameters (category, difficulty, search, page, limit)
   * @returns {Promise} Paginated activities
   */
  getActivities: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.ACTIVITIES, { params });
    return response.data;
  },

  /**
   * Get activities by category
   * @param {string} category - Category name (Routine, Necessary, Pleasurable)
   * @returns {Promise} Activities in category
   */
  getByCategory: async (category) => {
    const response = await api.get(API_ENDPOINTS.ACTIVITIES_BY_CATEGORY(category));
    return response.data;
  },

  /**
   * Get activities by difficulty
   * @param {string} difficulty - Difficulty level (Easiest, Moderate, Difficult)
   * @returns {Promise} Activities with difficulty
   */
  getByDifficulty: async (difficulty) => {
    const response = await api.get(API_ENDPOINTS.ACTIVITIES_BY_DIFFICULTY(difficulty));
    return response.data;
  },

  /**
   * Get a single activity
   * @param {string} id - Activity ID
   * @returns {Promise} Activity details
   */
  getActivity: async (id) => {
    const response = await api.get(API_ENDPOINTS.ACTIVITIES_BY_ID(id));
    return response.data;
  },

  /**
   * Create a custom activity
   * @param {Object} activityData - Activity data
   * @returns {Promise} Created activity
   */
  createActivity: async (activityData) => {
    const response = await api.post(API_ENDPOINTS.ACTIVITIES, activityData);
    return response.data;
  },

  /**
   * Update a custom activity
   * @param {string} id - Activity ID
   * @param {Object} updates - Activity updates
   * @returns {Promise} Updated activity
   */
  updateActivity: async (id, updates) => {
    const response = await api.put(API_ENDPOINTS.ACTIVITIES_BY_ID(id), updates);
    return response.data;
  },

  /**
   * Update activity ranking/difficulty
   * @param {string} id - Activity ID
   * @param {string} difficulty - New difficulty level
   * @returns {Promise} Updated activity
   */
  updateRanking: async (id, difficulty) => {
    const response = await api.patch(API_ENDPOINTS.ACTIVITIES_RANK(id), { difficulty });
    return response.data;
  },

  /**
   * Delete a custom activity
   * @param {string} id - Activity ID
   * @returns {Promise}
   */
  deleteActivity: async (id) => {
    const response = await api.delete(API_ENDPOINTS.ACTIVITIES_BY_ID(id));
    return response.data;
  },
};

// Mood Service
export const moodService = {
  /**
   * Get mood logs for a date range
   * @param {Object} params - Query parameters (startDate, endDate, days)
   * @returns {Promise} Mood logs with statistics
   */
  getMoodLogs: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.MOOD, { params });
    return response.data;
  },

  /**
   * Get mood log for specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Mood log for the date
   */
  getMoodLogByDate: async (date) => {
    const response = await api.get(API_ENDPOINTS.MOOD_BY_DATE(date));
    return response.data;
  },

  /**
   * Get mood statistics summary
   * @param {number} days - Number of days to look back (default: 30)
   * @returns {Promise} Mood statistics and trends
   */
  getMoodStats: async (days = 30) => {
    const response = await api.get(API_ENDPOINTS.MOOD_STATS, { params: { days } });
    return response.data;
  },
};

export default api;
