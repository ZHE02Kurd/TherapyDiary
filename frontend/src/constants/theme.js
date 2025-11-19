// Theme configuration for glassmorphism design
export const COLORS = {
  primary: '#F97316', // Orange accent
  
  light: {
    background: '#F3F4F6',
    glass: 'rgba(255, 255, 255, 0.7)',
    text: '#000000',
    textSecondary: '#6B7280',
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: '#F97316',
  },
  
  dark: {
    background: '#000000',
    glass: 'rgba(0, 0, 0, 0.4)',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '#F97316',
  },
};

export const SHADOWS = {
  hard: {
    shadowColor: '#F97316',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
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
