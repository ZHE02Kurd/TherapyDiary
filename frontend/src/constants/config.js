// App configuration
export const API_BASE = 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@therapy_diary_auth_token',
  USER_DATA: '@therapy_diary_user_data',
  THEME: '@therapy_diary_theme',
  FIRST_LAUNCH: '@therapy_diary_first_launch',
  CURRENT_WEEK: '@therapy_diary_current_week',
};

export const TIME_OF_DAY = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
};

export const MOOD_SCALE = {
  MIN: 1,
  MAX: 5,
  LABELS: {
    1: 'Very Low',
    2: 'Low',
    3: 'Neutral',
    4: 'Good',
    5: 'Very Good',
  },
};

export const WEEKS = {
  1: { title: 'Week 1: Baseline Diary', type: 'diary' },
  2: { title: 'Week 2: Activity Planning', type: 'planning' },
  3: { title: 'Week 3: Values & Goals', type: 'values' },
  4: { title: 'Week 4: Overcoming Barriers', type: 'barriers' },
  5: { title: 'Week 5: Progress Review', type: 'review' },
  6: { title: 'Week 6: Maintenance', type: 'maintenance' },
};
