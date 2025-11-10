/**
 * App Navigation
 * Manages navigation between screens
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Import screens (we'll create these next)
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DiaryScreen from '../screens/DiaryScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Auth Stack - Login and Register screens
 */
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main Tab Navigator - Authenticated user screens
 */
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'TherapyDiary',
        }}
      />
      <Tab.Screen 
        name="Diary" 
        component={DiaryScreen}
        options={{
          tabBarLabel: 'Diary',
          title: 'My Diary',
        }}
      />
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesScreen}
        options={{
          tabBarLabel: 'Activities',
          title: 'Activity Library',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          title: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Navigator - Switches between Auth and Main based on authentication
 */
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
