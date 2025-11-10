/**
 * Authentication Context
 * Manages user authentication state throughout the app
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await authService.getToken();
      if (token) {
        // Try to get current user from API
        const userData = await authService.getCurrentUser();
        setUser(userData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // If check fails, clear any stored data
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
        details: error.response?.data?.details || [],
      };
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: 'Logout failed' };
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (updates) => {
    try {
      const response = await authService.updateProfile(updates);
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Update failed',
      };
    }
  };

  /**
   * Change password
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword(currentPassword, newPassword);
      return { success: true, data: response };
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Password change failed',
      };
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      console.error('Refresh user error:', error);
      return { success: false, error: 'Failed to refresh user data' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
