/**
 * Home Screen
 * Main dashboard showing today's overview
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { APP_SETTINGS } from '../constants/config';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}! 👋</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          <Text style={styles.cardText}>Track your activities and mood here</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Text style={styles.cardText}>• Add new diary entry</Text>
          <Text style={styles.cardText}>• Browse activities</Text>
          <Text style={styles.cardText}>• View mood trends</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  content: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  card: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 4,
  },
});

export default HomeScreen;
