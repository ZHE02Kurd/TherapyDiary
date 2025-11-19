import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GlassCard from './GlassCard';

export default function TherapistMessage({ message }) {
  const { colors, primary } = useTheme();
  
  if (!message) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: primary }]}>
        <Text style={styles.avatarEmoji}>👤</Text>
      </View>
      <View style={styles.messageContainer}>
        <GlassCard hardShadow={false}>
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
});
