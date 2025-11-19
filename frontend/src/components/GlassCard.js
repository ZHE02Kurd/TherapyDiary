import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { SHADOWS } from '../constants/theme';

export default function GlassCard({ children, style, hardShadow = true, intensity = 70 }) {
  const { isDark, colors } = useTheme();

  return (
    <View style={[styles.container, hardShadow && SHADOWS.hard, !hardShadow && SHADOWS.soft, style]}>
      <BlurView
        intensity={intensity}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.blur,
          {
            backgroundColor: colors.glass,
            borderColor: colors.border,
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  blur: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 16,
  },
});
