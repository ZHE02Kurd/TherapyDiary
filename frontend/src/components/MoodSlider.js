/**
 * MoodSlider Component
 * Interactive mood scale selector (1-10)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { APP_SETTINGS } from '../constants/config';

const MoodSlider = ({ label, value, onChange, style }) => {
  const getMoodColor = (moodValue) => {
    return APP_SETTINGS.MOOD_COLORS[moodValue] || APP_SETTINGS.THEME.TEXT_SECONDARY;
  };

  const getMoodLabel = (moodValue) => {
    const labels = {
      1: 'Very Bad',
      2: 'Bad',
      3: 'Poor',
      4: 'Below Average',
      5: 'Fair',
      6: 'Good',
      7: 'Great',
      8: 'Very Good',
      9: 'Excellent',
      10: 'Outstanding',
    };
    return labels[moodValue] || 'Unknown';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.moodBadge, { backgroundColor: getMoodColor(value) }]}>
          <Text style={styles.moodValue}>{value}</Text>
        </View>
      </View>
      
      <Text style={styles.moodLabel}>{getMoodLabel(value)}</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.moodButtonsContainer}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              { backgroundColor: getMoodColor(mood) },
              value === mood && styles.moodButtonSelected,
            ]}
            onPress={() => onChange(mood)}
          >
            <Text style={[
              styles.moodButtonText,
              value === mood && styles.moodButtonTextSelected,
            ]}>
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>1 (Worst)</Text>
        <Text style={styles.scaleLabel}>10 (Best)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  moodBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  moodValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moodLabel: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 12,
    textAlign: 'center',
  },
  moodButtonsContainer: {
    marginBottom: 8,
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    opacity: 0.6,
  },
  moodButtonSelected: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  moodButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moodButtonTextSelected: {
    fontSize: 20,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  scaleLabel: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
});

export default MoodSlider;
