import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { dailyEntryService, sessionService } from '../services/api';
import TherapistMessage from '../components/TherapistMessage';

/**
 * Daily Baseline Diary Screen
 * Where users log their daily activities for Week 1
 */
const DailyTaskScreen = ({ route, navigation }) => {
  const { weekNumber } = route.params || { weekNumber: 1 };
  const [todayEntries, setTodayEntries] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [weekNumber])
  );

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get user progress
      const progressData = await sessionService.getUserProgress();
      setUserProgress(progressData.userProgress);

      // Get today's entries
      const dayNumber = progressData.userProgress.currentDay;
      const entriesData = await dailyEntryService.getDayEntries(weekNumber, dayNumber);
      setTodayEntries(entriesData.entries);
      
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load diary entries');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleAddEntry = () => {
    navigation.navigate('AddEntry', { 
      weekNumber,
      onEntryAdded: loadData 
    });
  };

  const handleViewProgress = () => {
    navigation.navigate('WeekProgress', { weekNumber });
  };

  const getDayName = (dayNumber) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayNumber - 1] || 'Day ' + dayNumber;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 18) return 'Good afternoon!';
    return 'Good evening!';
  };

  const getEncouragingMessage = () => {
    const entriesCount = todayEntries.length;
    const dayNumber = userProgress?.currentDay || 1;
    
    if (entriesCount === 0) {
      return `Welcome to Day ${dayNumber}! Ready to log today's activities?\n\nRemember, just track what you're doing naturally - no need to change anything yet. We're just observing patterns.`;
    } else if (entriesCount < 3) {
      return `Great start! You've logged ${entriesCount} ${entriesCount === 1 ? 'activity' : 'activities'} today. Try to log at least 3-4 activities throughout the day to get a good picture of your patterns.`;
    } else {
      return `Excellent work! You've logged ${entriesCount} activities today. You're building a really helpful picture of your daily routines and how they affect your mood. Keep it up!`;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const dayName = getDayName(userProgress?.currentDay || 1);
  const dayNumber = userProgress?.currentDay || 1;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.weekTitle}>Week {weekNumber} Task: Baseline Diary</Text>
          <Text style={styles.dayTitle}>{dayName} - Day {dayNumber} of 7</Text>
        </View>

        {/* Therapist Welcome Message */}
        <TherapistMessage 
          message={`${getGreeting()} ${getEncouragingMessage()}`}
        />

        {/* Today's Entries */}
        <View style={styles.entriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY'S ENTRIES:</Text>
            <Text style={styles.entryCount}>{todayEntries.length}</Text>
          </View>

          {todayEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyText}>No entries yet today</Text>
              <Text style={styles.emptySubtext}>
                Tap the button below to log your first activity
              </Text>
            </View>
          ) : (
            <View style={styles.entriesList}>
              {todayEntries.map((entry, index) => (
                <View key={entry._id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTime}>{entry.timeOfDay}</Text>
                    <Text style={styles.entryTimeDetail}>{entry.time}</Text>
                  </View>
                  <Text style={styles.entryActivity}>{entry.activity}</Text>
                  {entry.location && (
                    <Text style={styles.entryDetail}>📍 {entry.location}</Text>
                  )}
                  {entry.withWhom && (
                    <Text style={styles.entryDetail}>👥 {entry.withWhom}</Text>
                  )}
                  <View style={styles.moodContainer}>
                    <View style={styles.moodItem}>
                      <Text style={styles.moodLabel}>Before:</Text>
                      <Text style={styles.moodText}>{entry.moodBefore}</Text>
                    </View>
                    <Text style={styles.moodArrow}>→</Text>
                    <View style={styles.moodItem}>
                      <Text style={styles.moodLabel}>After:</Text>
                      <Text style={styles.moodText}>{entry.moodAfter}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for Today:</Text>
          <Text style={styles.tipText}>
            • Log activities as you do them throughout the day
          </Text>
          <Text style={styles.tipText}>
            • Be honest about your mood - there are no wrong answers
          </Text>
          <Text style={styles.tipText}>
            • Include everyday activities like meals, chores, and rest
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewProgress}
          >
            <Text style={styles.secondaryButtonText}>
              📊 View This Week's Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('ExampleDiary', { weekNumber })}
          >
            <Text style={styles.secondaryButtonText}>
              📖 Need Help? View Example Diary
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddEntry}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Add Activity Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  entriesSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.5,
  },
  entryCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  entriesList: {
    gap: 12,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
  },
  entryTimeDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  entryActivity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  entryDetail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  moodItem: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  moodText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  moodArrow: {
    fontSize: 18,
    color: '#6366f1',
    marginHorizontal: 8,
  },
  tipsSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#78350f',
    marginBottom: 6,
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
    marginRight: 8,
    fontWeight: 'bold',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default DailyTaskScreen;
