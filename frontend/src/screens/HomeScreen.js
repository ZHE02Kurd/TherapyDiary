/**
 * Home Screen
 * Main dashboard showing current week's session and progress
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { sessionService } from '../services/api';
import TherapistMessage from '../components/TherapistMessage';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [currentWeekStats, setCurrentWeekStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getUserProgress();
      setUserProgress(data.userProgress);
      setCurrentWeekStats(data.currentWeekStats);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWeekTitle = (weekNumber) => {
    const titles = {
      1: 'Behavioural Activation',
      2: 'Identifying Activities',
      3: 'Ranking Activities',
      4: 'Scheduling Activities',
      5: 'Maintaining Progress'
    };
    return titles[weekNumber] || 'Session ' + weekNumber;
  };

  const getWeekTask = (weekNumber) => {
    const tasks = {
      1: 'Keep a Baseline Diary',
      2: 'Categorize Activities',
      3: 'Rank by Difficulty',
      4: 'Plan Your Week',
      5: 'Problem-Solving & Maintenance'
    };
    return tasks[weekNumber] || 'Complete weekly task';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      </SafeAreaView>
    );
  }

  const currentWeek = userProgress?.currentWeek || 1;
  const currentDay = userProgress?.currentDay || 1;
  const entriesCount = currentWeekStats?.entriesCount || 0;
  const daysCompleted = currentWeekStats?.daysCompleted || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, {user?.name || 'User'}!</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
        </View>

        {/* Therapist Welcome */}
        <TherapistMessage 
          message={`${getGreeting()}! Welcome back.`}
        />

        {/* Current Week Card */}
        <View style={styles.currentWeekCard}>
          <Text style={styles.cardLabel}>YOUR CURRENT WEEK:</Text>
          
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionIcon}>📘</Text>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>
                Session {currentWeek}: {getWeekTitle(currentWeek)}
              </Text>
              <Text style={styles.taskTitle}>Task: {getWeekTask(currentWeek)}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>
              Progress: Day {currentDay} of 7 completed
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${(daysCompleted / 7) * 100}%` }]} 
              />
            </View>
            <Text style={styles.progressStats}>
              {entriesCount} {entriesCount === 1 ? 'entry' : 'entries'} logged this week
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('DailyTask', { weekNumber: currentWeek })}
          >
            <Text style={styles.continueButtonText}>Continue Task →</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS:</Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddEntry', { weekNumber: currentWeek })}
          >
            <Text style={styles.actionButtonIcon}>+</Text>
            <Text style={styles.actionButtonText}>Log Today's Activity</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('WeekProgress', { weekNumber: currentWeek })}
          >
            <Text style={styles.actionButtonIcon}>📊</Text>
            <Text style={styles.actionButtonText}>View This Week's Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('WeeklySession', { weekNumber: currentWeek })}
          >
            <Text style={styles.actionButtonIcon}>📖</Text>
            <Text style={styles.actionButtonText}>Re-read This Week's Session</Text>
          </TouchableOpacity>
        </View>

        {/* Journey Progress */}
        <View style={styles.journeySection}>
          <Text style={styles.sectionTitle}>YOUR JOURNEY:</Text>
          
          {[1, 2, 3, 4, 5].map((weekNum) => {
            const isCompleted = userProgress?.completedWeeks?.some(w => w.weekNumber === weekNum);
            const isCurrent = weekNum === currentWeek;
            const isLocked = weekNum > currentWeek;

            return (
              <View
                key={weekNum}
                style={[
                  styles.journeyItem,
                  isCompleted && styles.journeyItemCompleted,
                  isCurrent && styles.journeyItemCurrent,
                  isLocked && styles.journeyItemLocked,
                ]}
              >
                <Text style={styles.journeyIcon}>
                  {isCompleted ? '✅' : isLocked ? '🔒' : '📘'}
                </Text>
                <Text style={[
                  styles.journeyText,
                  isLocked && styles.journeyTextLocked,
                ]}>
                  Session {weekNum}: {getWeekTitle(weekNum)}
                  {isCurrent && ' (Current)'}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  
  // Current Week Card
  currentWeekCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sessionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  progressSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressStats: {
    fontSize: 12,
    color: '#6b7280',
  },
  continueButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Quick Actions
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  
  // Journey Progress
  journeySection: {
    marginBottom: 24,
  },
  journeyItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  journeyItemCompleted: {
    backgroundColor: '#f0fdf4',
  },
  journeyItemCurrent: {
    backgroundColor: '#eef2ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  journeyItemLocked: {
    backgroundColor: '#f9fafb',
    opacity: 0.6,
  },
  journeyIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  journeyText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  journeyTextLocked: {
    color: '#9ca3af',
  },
});

export default HomeScreen;
