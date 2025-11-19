// Theme configuration for glassmorphism design
export const COLORS = {
  light: {
    primary: '#A855F7',     // Purple
    secondary: '#EC4899',   // Pink
    accent: '#EAB308',      // Yellow
    shadow: '#F97316',      // Bold orange shadow
    background: '#F3F4F6',
    surface: 'rgba(255, 255, 255, 0.7)',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#A855F7',
    secondary: '#EC4899',
    accent: '#EAB308',
    shadow: '#F97316',
    background: '#111827',
    surface: 'rgba(30, 41, 59, 0.7)',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: 'rgba(255, 255, 255, 0.1)',
  },
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '600' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  small: { fontSize: 14, fontWeight: '400' },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
};

// Bold hard shadow style
export const GLASS_CARD_SHADOW = {
  shadowOffset: { width: 10, height: 10 },
  shadowColor: COLORS.light.shadow,
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 10,
};
