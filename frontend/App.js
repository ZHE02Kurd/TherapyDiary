/**
 * TherapyDiary App
 * A mental health tracking app using Behavioural Activation therapy
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
