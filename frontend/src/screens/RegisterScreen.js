/**
 * Register Screen
 * New user registration screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { APP_SETTINGS } from '../constants/config';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, age } = formData;

    if (!name.trim() || !email.trim() || !password.trim() || !age.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert('Error', 'Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      Alert.alert('Error', 'Password must contain at least one lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(password)) {
      Alert.alert('Error', 'Password must contain at least one number');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
      Alert.alert('Error', 'Please enter a valid age (13-120)');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        age: parseInt(formData.age),
      };

      const result = await register(userData);

      if (!result.success) {
        // Show detailed validation errors if available
        if (result.details && result.details.length > 0) {
          const errorMessages = result.details.map(d => d.message).join('\n');
          Alert.alert('Registration Failed', errorMessages);
        } else {
          Alert.alert('Registration Failed', result.error || 'Unable to register. Please try again.');
        }
      }
      // Success - navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join TherapyDiary to start your mental health journey</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Your age"
                placeholderTextColor="#9ca3af"
                value={formData.age}
                onChangeText={(value) => updateField('age', value)}
                keyboardType="number-pad"
                maxLength={3}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="At least 8 characters"
                placeholderTextColor="#9ca3af"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Text style={styles.hint}>
                Must contain uppercase, lowercase, and number
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor="#9ca3af"
                value={formData.confirmPassword}
                onChangeText={(value) => updateField('confirmPassword', value)}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={isLoading}
              >
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: APP_SETTINGS.THEME.PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
  },
  input: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
  },
  hint: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginTop: 4,
  },
  button: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  link: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.PRIMARY,
    fontWeight: '600',
  },
});

export default RegisterScreen;
