import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { dailyEntryService } from '../services/api';
import TherapistMessage from '../components/TherapistMessage';

/**
 * Week Progress View
 * Shows all diary entries for the week organized by day
 */
const WeekProgressScreen = ({ route, navigation }) => {
  const { weekNumber } = route.params;
  const [entries, setEntries] = useState([]);
  const [groupedByDay, setGroupedByDay] = useState({});
  const [totalEntries, setTotalEntries] = useState(0);
  const [daysWithEntries, setDaysWithEntries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeekData();
  }, [weekNumber]);

  const loadWeekData = async () => {
    try {
      setLoading(true);
      const data = await dailyEntryService.getWeekEntries(weekNumber);
      setEntries(data.entries);
      setGroupedByDay(data.groupedByDay);
      setTotalEntries(data.totalEntries);
      setDaysWithEntries(data.daysWithEntries);
    } catch (error) {
      console.error('Error loading week data:', error);
      Alert.alert('Error', 'Failed to load week progress');
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayNumber) => {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days[dayNumber - 1] || `DAY ${dayNumber}`;
  };

  const getProgressMessage = () => {
    if (daysWithEntries === 0) {
      return "You haven't started logging yet. That's okay - when you're ready, start tracking your activities each day.";
    } else if (daysWithEntries < 4) {
      return `You've logged activities for ${daysWithEntries} ${daysWithEntries === 1 ? 'day' : 'days'} so far. Great start! Keep going - the more days you track, the clearer the patterns become.`;
    } else if (daysWithEntries < 7) {
      return `Excellent progress! You've tracked ${daysWithEntries} days. You're building a really helpful picture of your routines and how they affect your mood.`;
    } else {
      return `Amazing work! You've completed the full week. Look at all this valuable information you've gathered about yourself. These patterns will help us in the coming weeks.`;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Week {weekNumber}: Your Baseline Diary</Text>
        </View>

        {/* Therapist Message */}
        <TherapistMessage 
          message={`Here's what you've tracked so far this week:\n\n${getProgressMessage()}`}
        />

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{daysWithEntries}</Text>
            <Text style={styles.statLabel}>of 7 Days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalEntries}</Text>
            <Text style={styles.statLabel}>Activities Logged</Text>
          </View>
        </View>

        {/* Days */}
        {[1, 2, 3, 4, 5, 6, 7].map((dayNumber) => {
          const dayEntries = groupedByDay[dayNumber] || [];
          const hasEntries = dayEntries.length > 0;

          return (
            <View key={dayNumber} style={styles.daySection}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{getDayName(dayNumber)}</Text>
                {hasEntries && (
                  <View style={styles.entryBadge}>
                    <Text style={styles.entryBadgeText}>{dayEntries.length}</Text>
                  </View>
                )}
              </View>

              {!hasEntries ? (
                <View style={styles.noEntriesCard}>
                  <Text style={styles.noEntriesText}>Not yet recorded</Text>
                </View>
              ) : (
                <View style={styles.entriesList}>
                  {dayEntries.map((entry, index) => (
                    <View key={entry._id} style={styles.entryCard}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryTime}>{entry.timeOfDay}</Text>
                        <Text style={styles.entryTimeDetail}>{entry.time}</Text>
                      </View>
                      
                      <Text style={styles.entryActivity}>{entry.activity}</Text>
                      
                      {(entry.location || entry.withWhom) && (
                        <View style={styles.entryDetails}>
                          {entry.location && (
                            <Text style={styles.entryDetail}>📍 {entry.location}</Text>
                          )}
                          {entry.withWhom && (
                            <Text style={styles.entryDetail}>👥 {entry.withWhom}</Text>
                          )}
                        </View>
                      )}

                      <View style={styles.moodRow}>
                        <View style={styles.moodBox}>
                          <Text style={styles.moodLabel}>Mood before:</Text>
                          <Text style={styles.moodValue}>{entry.moodBefore}</Text>
                        </View>
                        <Text style={styles.moodArrow}>→</Text>
                        <View style={styles.moodBox}>
                          <Text style={styles.moodLabel}>Mood after:</Text>
                          <Text style={styles.moodValue}>{entry.moodAfter}</Text>
                        </View>
                      </View>

                      {entry.notes && (
                        <View style={styles.notesContainer}>
                          <Text style={styles.notesLabel}>Notes:</Text>
                          <Text style={styles.notesText}>{entry.notes}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* Continue Button */}
        {daysWithEntries >= 7 && (
          <View style={styles.completeSection}>
            <TherapistMessage 
              message="You've completed the full week! When you're ready, you can move on to the next session where we'll identify different types of activities."
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate('WeekComplete', { weekNumber })}
            >
              <Text style={styles.continueButtonText}>
                Complete Week & Continue →
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.5,
  },
  entryBadge: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  entryBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  noEntriesCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  noEntriesText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
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
  entryDetails: {
    marginBottom: 8,
  },
  entryDetail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginTop: 8,
  },
  moodBox: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  moodValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  moodArrow: {
    fontSize: 18,
    color: '#6366f1',
    marginHorizontal: 8,
  },
  notesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fffbeb',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400e',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
  completeSection: {
    marginTop: 24,
  },
  continueButton: {
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default WeekProgressScreen;
