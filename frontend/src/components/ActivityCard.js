/**
 * ActivityCard Component
 * Displays a single activity in a card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { APP_SETTINGS, ACTIVITY_CATEGORIES, DIFFICULTY_LEVELS } from '../constants/config';

const ActivityCard = ({ activity, onPress, onRank }) => {
  const getCategoryColor = (category) => {
    const colors = {
      [ACTIVITY_CATEGORIES.ROUTINE]: '#e0e7ff',
      [ACTIVITY_CATEGORIES.NECESSARY]: '#fef3c7',
      [ACTIVITY_CATEGORIES.PLEASURABLE]: '#dbeafe',
    };
    return colors[category] || '#f3f4f6';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      [DIFFICULTY_LEVELS.EASIEST]: '#d1fae5',
      [DIFFICULTY_LEVELS.MODERATE]: '#fed7aa',
      [DIFFICULTY_LEVELS.DIFFICULT]: '#fecaca',
    };
    return colors[difficulty] || '#e5e7eb';
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.badges}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(activity.category) }]}>
            <Text style={styles.badgeText}>{activity.category}</Text>
          </View>
          {activity.difficulty && (
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(activity.difficulty) }]}>
              <Text style={styles.badgeText}>{activity.difficulty}</Text>
            </View>
          )}
        </View>
        {activity.isCustom && (
          <View style={styles.customBadge}>
            <Text style={styles.customText}>Custom</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{activity.name}</Text>
      
      {activity.description && (
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>
      )}

      <View style={styles.footer}>
        {activity.estimatedDuration && (
          <View style={styles.duration}>
            <Text style={styles.durationText}>⏱ {activity.estimatedDuration} min</Text>
          </View>
        )}
        
        {activity.tags && activity.tags.length > 0 && (
          <View style={styles.tags}>
            {activity.tags.slice(0, 3).map((tag, index) => (
              <Text key={index} style={styles.tag}>#{tag}</Text>
            ))}
          </View>
        )}
      </View>

      {onRank && !activity.isPrePopulated && (
        <TouchableOpacity style={styles.rankButton} onPress={(e) => {
          e.stopPropagation();
          onRank(activity);
        }}>
          <Text style={styles.rankButtonText}>Rank Difficulty</Text>
        </TouchableOpacity>
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  customBadge: {
    backgroundColor: APP_SETTINGS.THEME.SECONDARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  customText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: APP_SETTINGS.THEME.BORDER,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 13,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-end',
  },
  tag: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.PRIMARY,
    fontWeight: '500',
  },
  rankButton: {
    marginTop: 12,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  rankButtonText: {
    fontSize: 13,
    color: APP_SETTINGS.THEME.PRIMARY,
    fontWeight: '600',
  },
});

export default ActivityCard;
