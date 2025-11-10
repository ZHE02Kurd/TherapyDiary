/**
 * DiaryEntryCard Component
 * Displays a single diary entry in a card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { APP_SETTINGS } from '../constants/config';

const DiaryEntryCard = ({ entry, onPress, onDelete }) => {
  const getMoodColor = (mood) => {
    return APP_SETTINGS.MOOD_COLORS[mood] || APP_SETTINGS.THEME.TEXT_SECONDARY;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMoodChangeIndicator = (change) => {
    if (change > 0) return `↑ +${change}`;
    if (change < 0) return `↓ ${change}`;
    return '→ 0';
  };

  const getMoodChangeColor = (change) => {
    if (change > 0) return APP_SETTINGS.THEME.SUCCESS;
    if (change < 0) return APP_SETTINGS.THEME.ERROR;
    return APP_SETTINGS.THEME.TEXT_SECONDARY;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(entry.timestamp)}</Text>
          <Text style={styles.date}>{formatDate(entry.timestamp)}</Text>
        </View>
        {entry.timeOfDay && (
          <View style={styles.timeOfDayBadge}>
            <Text style={styles.timeOfDayText}>{entry.timeOfDay}</Text>
          </View>
        )}
      </View>

      <Text style={styles.activity} numberOfLines={2}>
        {entry.activity}
      </Text>

      {entry.activityId && (
        <View style={styles.activityTagContainer}>
          <View style={[styles.categoryBadge, styles[`category${entry.activityId.category}`]]}>
            <Text style={styles.categoryText}>{entry.activityId.category}</Text>
          </View>
          {entry.activityId.difficulty && (
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{entry.activityId.difficulty}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.moodContainer}>
        <View style={styles.moodItem}>
          <Text style={styles.moodLabel}>Before</Text>
          <View style={[styles.moodBadge, { backgroundColor: getMoodColor(entry.moodBefore) }]}>
            <Text style={styles.moodValue}>{entry.moodBefore}</Text>
          </View>
        </View>

        <View style={[styles.moodChange, { borderColor: getMoodChangeColor(entry.moodChange) }]}>
          <Text style={[styles.moodChangeText, { color: getMoodChangeColor(entry.moodChange) }]}>
            {getMoodChangeIndicator(entry.moodChange)}
          </Text>
        </View>

        <View style={styles.moodItem}>
          <Text style={styles.moodLabel}>After</Text>
          <View style={[styles.moodBadge, { backgroundColor: getMoodColor(entry.moodAfter) }]}>
            <Text style={styles.moodValue}>{entry.moodAfter}</Text>
          </View>
        </View>
      </View>

      {entry.notes && (
        <Text style={styles.notes} numberOfLines={2}>
          {entry.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  date: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginTop: 2,
  },
  timeOfDayBadge: {
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeOfDayText: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontWeight: '500',
  },
  activity: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
    lineHeight: 22,
  },
  activityTagContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryRoutine: {
    backgroundColor: '#e0e7ff',
  },
  categoryNecessary: {
    backgroundColor: '#fef3c7',
  },
  categoryPleasurable: {
    backgroundColor: '#dbeafe',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  difficultyText: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: APP_SETTINGS.THEME.BORDER,
  },
  moodItem: {
    alignItems: 'center',
  },
  moodLabel: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 6,
  },
  moodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 40,
    alignItems: 'center',
  },
  moodValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moodChange: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
  },
  moodChangeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notes: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default DiaryEntryCard;
