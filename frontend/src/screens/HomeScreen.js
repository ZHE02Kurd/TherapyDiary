import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { sessionService } from '../services/api';
import AnimatedBackground from '../components/AnimatedBackground';
import GlassCard from '../components/GlassCard';
import TherapistMessage from '../components/TherapistMessage';
import { SHADOWS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { colors, primary } = useTheme();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const fetchProgress = async () => {
    try {
      const data = await sessionService.getUserProgress();
      setProgress(data);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgress();
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  const currentWeek = progress?.currentWeek || 1;
  const currentDay = progress?.currentDay || 1;
  const totalActivities = progress?.totalActivitiesLogged || 0;
  const completedWeeks = progress?.completedWeeks || [];

  const weeks = [
    { number: 1, title: 'Introduction to Behavioural Activation', type: 'diary' },
    { number: 2, title: 'Build Your Activity Library', type: 'planning' },
    { number: 3, title: 'Rank Activities by Difficulty', type: 'values' },
    { number: 4, title: 'Schedule Activities', type: 'barriers' },
    { number: 5, title: 'Maintenance & Problem-Solving', type: 'review' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AnimatedBackground />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              {getGreeting()}, {user?.name}!
            </Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Text style={[styles.logoutLink, { color: primary }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Therapist Welcome */}
        <TherapistMessage message="Welcome to your Behavioural Activation journey! I'm here to guide you every step of the way. Let's work together to help you feel better." />

        {/* Current Week Card with Hard Shadow */}
        <View style={styles.currentWeekContainer}>
          <GlassCard hardShadow={true}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              CURRENT WEEK
            </Text>
            <Text style={[styles.weekTitle, { color: colors.text }]}>
              Week {currentWeek}: {weeks[currentWeek - 1]?.title}
            </Text>
            <Text style={[styles.taskDescription, { color: colors.textSecondary }]}>
              {currentWeek === 1 && 'Keep a baseline diary for 7 days'}
            </Text>
            
            {/* Progress Bar */}
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentDay / 7) * 100}%`, backgroundColor: primary },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              Day {currentDay} of 7 • {totalActivities} activities logged
            </Text>
            
            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: primary }]}
              onPress={() => navigation.navigate('WeeklySession', { weekNumber: currentWeek })}
            >
              <Text style={styles.continueButtonText}>Continue Task</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
            QUICK ACTIONS
          </Text>
          
          <TouchableOpacity activeOpacity={0.7}>
            <GlassCard hardShadow={false} style={styles.actionCard}>
              <View style={styles.actionRow}>
                <Text style={styles.actionIcon}>📝</Text>
                <Text style={[styles.actionText, { color: colors.text }]}>
                  Log Today's Activity
                </Text>
              </View>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <GlassCard hardShadow={false} style={styles.actionCard}>
              <View style={styles.actionRow}>
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={[styles.actionText, { color: colors.text }]}>
                  View This Week's Progress
                </Text>
              </View>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('WeeklySession', { weekNumber: currentWeek })}
          >
            <GlassCard hardShadow={false} style={styles.actionCard}>
              <View style={styles.actionRow}>
                <Text style={styles.actionIcon}>📖</Text>
                <Text style={[styles.actionText, { color: colors.text }]}>
                  Re-read This Week's Session
                </Text>
              </View>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Journey Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
            YOUR 5-WEEK JOURNEY
          </Text>
          
          {weeks.map((week) => {
            const isCompleted = completedWeeks.includes(week.number);
            const isCurrent = week.number === currentWeek;
            const isLocked = week.number > currentWeek;

            return (
              <GlassCard
                key={week.number}
                hardShadow={isCurrent}
                style={styles.weekCard}
              >
                <View style={styles.weekRow}>
                  <Text style={styles.weekIcon}>
                    {isCompleted ? '✅' : isCurrent ? '📘' : '🔒'}
                  </Text>
                  <View style={styles.weekInfo}>
                    <Text
                      style={[
                        styles.weekItemTitle,
                        { color: isLocked ? colors.textSecondary : colors.text },
                      ]}
                    >
                      Week {week.number}
                    </Text>
                    <Text
                      style={[
                        styles.weekItemSubtitle,
                        { color: colors.textSecondary },
                        isLocked && styles.weekItemSubtitleLocked,
                      ]}
                    >
                      {week.title}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  currentWeekContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    marginBottom: 16,
  },
  continueButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  actionCard: {
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  weekCard: {
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  weekInfo: {
    flex: 1,
  },
  weekItemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  weekItemSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  weekItemSubtitleLocked: {
    opacity: 0.5,
  },
});
