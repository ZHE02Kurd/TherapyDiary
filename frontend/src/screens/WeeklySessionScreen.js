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
import { sessionService } from '../services/api';
import TherapistMessage from '../components/TherapistMessage';

/**
 * Weekly Session Screen
 * Displays educational content for the current week's session
 */
const WeeklySessionScreen = ({ route, navigation }) => {
  const { weekNumber } = route.params || { weekNumber: 1 };
  const [session, setSession] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, [weekNumber]);

  const loadSession = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getSession(weekNumber);
      setSession(data.session);
      setUserProgress(data.userProgress);
    } catch (error) {
      console.error('Error loading session:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to load session content'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await sessionService.markSessionRead(weekNumber);
      Alert.alert(
        'Session Complete!',
        'Great work! Now you can start working on this week\'s task.',
        [
          {
            text: 'Start Task',
            onPress: () => navigation.navigate('DailyTask', { weekNumber }),
          },
        ]
      );
    } catch (error) {
      console.error('Error marking session complete:', error);
      Alert.alert('Error', 'Failed to mark session as complete');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading session...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Session not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sessionTitle}>Session {weekNumber}</Text>
          <Text style={styles.title}>{session.title}</Text>
          {session.subtitle && (
            <Text style={styles.subtitle}>{session.subtitle}</Text>
          )}
        </View>

        {/* Introduction */}
        <TherapistMessage message={session.introduction} />

        {/* Content Sections */}
        {session.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
              
              {section.therapistMessage && (
                <TherapistMessage 
                  message={section.therapistMessage}
                  style={styles.therapistSection}
                />
              )}
            </View>
          ))}

        {/* This Week's Task */}
        <View style={styles.taskSection}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskIcon}>📋</Text>
            <Text style={styles.taskTitle}>YOUR TASK THIS WEEK</Text>
          </View>
          
          <Text style={styles.taskDescription}>{session.taskDescription}</Text>
          
          {session.taskExplanation && (
            <Text style={styles.taskExplanation}>{session.taskExplanation}</Text>
          )}

          {session.taskInstructions && session.taskInstructions.length > 0 && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>How to complete it:</Text>
              {session.taskInstructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Example Diary Link */}
          {session.exampleDiary && (
            <TouchableOpacity
              style={styles.exampleButton}
              onPress={() => navigation.navigate('ExampleDiary', { 
                weekNumber,
                exampleData: session.exampleDiary 
              })}
            >
              <Text style={styles.exampleButtonText}>
                📖 View Example: {session.exampleDiary.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleMarkComplete}
        >
          <Text style={styles.completeButtonText}>✓ Mark Session Complete</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.startTaskButton}
          onPress={() => navigation.navigate('DailyTask', { weekNumber })}
        >
          <Text style={styles.startTaskButtonText}>Start This Week's Task →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  section: {
    marginVertical: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  therapistSection: {
    marginTop: 16,
  },
  taskSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    letterSpacing: 0.5,
  },
  taskDescription: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  taskExplanation: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 16,
  },
  instructionsContainer: {
    marginTop: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#6366f1',
    marginRight: 8,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  exampleButton: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  exampleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6366f1',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  completeButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  startTaskButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
  },
  startTaskButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WeeklySessionScreen;
