/**
 * App Configuration
 * Central configuration for API endpoints and app settings
 */

// Determine the API URL based on environment
// For development, use your local backend
// For production, use your deployed backend URL
const getApiUrl = () => {
  // If running on physical device, use your computer's IP address
  // If running on emulator/simulator, localhost works
  
  // Development URLs
  const LOCALHOST = 'http://localhost:3000';
  const LOCAL_NETWORK = 'http://192.168.1.100:3000'; // Replace with your computer's IP
  
  // For now, default to localhost (works for iOS simulator and Android emulator)
  return LOCALHOST;
};

export const API_URL = getApiUrl();
export const API_BASE = `${API_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',
  AUTH_UPDATE_PROFILE: '/auth/profile',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',
  AUTH_LOGOUT: '/auth/logout',
  
  // Diary
  DIARY: '/diary',
  DIARY_BY_DATE: (date) => `/diary/date/${date}`,
  DIARY_BY_ID: (id) => `/diary/${id}`,
  
  // Activities
  ACTIVITIES: '/activities',
  ACTIVITIES_BY_ID: (id) => `/activities/${id}`,
  ACTIVITIES_BY_CATEGORY: (category) => `/activities/category/${category}`,
  ACTIVITIES_BY_DIFFICULTY: (difficulty) => `/activities/difficulty/${difficulty}`,
  ACTIVITIES_RANK: (id) => `/activities/${id}/rank`,
};

// App Settings
export const APP_SETTINGS = {
  MOOD_SCALE: { MIN: 1, MAX: 10 },
  PAGINATION: {
    DIARY_LIMIT: 20,
    ACTIVITIES_LIMIT: 50,
  },
  THEME: {
    PRIMARY: '#6366f1', // Indigo
    SECONDARY: '#8b5cf6', // Purple
    SUCCESS: '#10b981', // Green
    WARNING: '#f59e0b', // Amber
    ERROR: '#ef4444', // Red
    BACKGROUND: '#f9fafb', // Gray 50
    CARD: '#ffffff',
    TEXT: '#111827', // Gray 900
    TEXT_SECONDARY: '#6b7280', // Gray 500
    BORDER: '#e5e7eb', // Gray 200
  },
  MOOD_COLORS: {
    1: '#ef4444', // Red - Very bad
    2: '#f97316', // Orange
    3: '#f59e0b', // Amber
    4: '#eab308', // Yellow
    5: '#84cc16', // Lime
    6: '#22c55e', // Green
    7: '#10b981', // Emerald
    8: '#14b8a6', // Teal
    9: '#06b6d4', // Cyan
    10: '#0ea5e9', // Sky - Excellent
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  REMINDER_TIME: 'reminder_time',
};

// Activity Categories
export const ACTIVITY_CATEGORIES = {
  ROUTINE: 'Routine',
  NECESSARY: 'Necessary',
  PLEASURABLE: 'Pleasurable',
};

// Activity Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASIEST: 'Easiest',
  MODERATE: 'Moderate',
  DIFFICULT: 'Difficult',
};

// Time of Day
export const TIME_OF_DAY = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon',
  EVENING: 'Evening',
  NIGHT: 'Night',
};

export default {
  API_URL,
  API_BASE,
  API_ENDPOINTS,
  APP_SETTINGS,
  STORAGE_KEYS,
  ACTIVITY_CATEGORIES,
  DIFFICULTY_LEVELS,
  TIME_OF_DAY,
};
