/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { APP_SETTINGS } from '../constants/config';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.info}>Age: {user?.age}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingValue}>
              {user?.settings?.notifications ? 'On' : 'Off'}
            </Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Reminder Time</Text>
            <Text style={styles.settingValue}>
              {user?.settings?.reminderTime || '09:00'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  section: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
  },
  settingLabel: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
  },
  settingValue: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  logoutButton: {
    backgroundColor: APP_SETTINGS.THEME.ERROR,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
