import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GlassCard from './GlassCard';
import { COLORS } from '../constants/theme';

export default function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  const getIcon = () => {
    if (themeMode === 'light') return '☀️';
    if (themeMode === 'dark') return '🌙';
    return '📱';
  };

  const getLabel = () => {
    if (themeMode === 'light') return 'Light';
    if (themeMode === 'dark') return 'Dark';
    return 'System';
  };

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
      <GlassCard hardShadow={false}>
        <Text style={styles.text}>
          {getIcon()} {getLabel()} Mode
        </Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
