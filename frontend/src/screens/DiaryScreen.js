/**
 * Diary Screen
 * View and manage diary entries
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { diaryService } from '../services/api';
import { APP_SETTINGS } from '../constants/config';
import DiaryEntryCard from '../components/DiaryEntryCard';
import MoodSlider from '../components/MoodSlider';
import ActivityPicker from '../components/ActivityPicker';

const DiaryScreen = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 });
  
  // Form state
  const [formData, setFormData] = useState({
    activity: '',
    activityId: null,
    selectedActivity: null,
    moodBefore: 5,
    moodAfter: 5,
    notes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await diaryService.getEntries({ page, limit: 20 });
      
      if (page === 1) {
        setEntries(response.entries);
      } else {
        setEntries(prev => [...prev, ...response.entries]);
      }
      
      setPagination(response.pagination);
    } catch (error) {
      console.error('Load entries error:', error);
      Alert.alert('Error', 'Failed to load diary entries');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadEntries(1);
    setIsRefreshing(false);
  };

  const loadMore = () => {
    if (pagination.page < pagination.pages && !isLoading) {
      loadEntries(pagination.page + 1);
    }
  };

  const handleAddEntry = () => {
    setFormData({
      activity: '',
      activityId: null,
      selectedActivity: null,
      moodBefore: 5,
      moodAfter: 5,
      notes: '',
    });
    setShowAddModal(true);
  };

  const handleSelectActivity = (activity) => {
    if (activity) {
      setFormData(prev => ({
        ...prev,
        activity: activity.name,
        activityId: activity._id,
        selectedActivity: activity,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        activityId: null,
        selectedActivity: null,
      }));
    }
  };

  const handleSaveEntry = async () => {
    if (!formData.activity.trim()) {
      Alert.alert('Error', 'Please describe your activity');
      return;
    }

    setIsSaving(true);
    try {
      const entryData = {
        activity: formData.activity.trim(),
        moodBefore: formData.moodBefore,
        moodAfter: formData.moodAfter,
        notes: formData.notes.trim() || undefined,
        ...(formData.activityId && { activityId: formData.activityId }),
      };

      const newEntry = await diaryService.createEntry(entryData);

      setShowAddModal(false);
      Alert.alert('Success', 'Diary entry created!');
      
      // Refresh the list
      await loadEntries(1);
    } catch (error) {
      console.error('Save entry error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEntry = (entryId) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this diary entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await diaryService.deleteEntry(entryId);
              Alert.alert('Success', 'Entry deleted');
              await loadEntries(1);
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const renderEntry = ({ item }) => (
    <DiaryEntryCard
      entry={item}
      onPress={() => {
        // TODO: Navigate to entry detail screen
        Alert.alert('Entry Details', 'Detail view coming soon!');
      }}
      onDelete={() => handleDeleteEntry(item._id)}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No entries yet</Text>
        <Text style={styles.emptyText}>
          Start tracking your activities and mood by adding your first diary entry!
        </Text>
        <TouchableOpacity style={styles.emptyButton} onPress={handleAddEntry}>
          <Text style={styles.emptyButtonText}>Add First Entry</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoading || entries.length === 0) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={APP_SETTINGS.THEME.PRIMARY} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={APP_SETTINGS.THEME.PRIMARY}
          />
        }
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddEntry}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Add Entry Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New Diary Entry</Text>
              <TouchableOpacity onPress={handleSaveEntry} disabled={isSaving}>
                <Text style={[styles.modalSave, isSaving && styles.modalSaveDisabled]}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} keyboardShouldPersistTaps="handled">
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>What did you do?</Text>
                
                {/* Activity Picker Button */}
                <TouchableOpacity 
                  style={styles.activityPickerButton}
                  onPress={() => setShowActivityPicker(true)}
                  disabled={isSaving}
                >
                  <Text style={styles.activityPickerButtonText}>
                    {formData.selectedActivity 
                      ? `Selected: ${formData.selectedActivity.name}` 
                      : 'Select from Activity Library'}
                  </Text>
                  <Text style={styles.activityPickerIcon}>›</Text>
                </TouchableOpacity>

                {formData.selectedActivity && (
                  <View style={styles.selectedActivityBadge}>
                    <Text style={styles.selectedActivityCategory}>
                      {formData.selectedActivity.category}
                    </Text>
                    {formData.selectedActivity.difficulty && (
                      <Text style={styles.selectedActivityDifficulty}>
                        {formData.selectedActivity.difficulty}
                      </Text>
                    )}
                  </View>
                )}

                <Text style={styles.orDivider}>or enter manually</Text>
                
                <TextInput
                  style={styles.activityInput}
                  placeholder="Describe your activity..."
                  placeholderTextColor="#9ca3af"
                  value={formData.activity}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, activity: text }))}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  editable={!isSaving}
                />
              </View>

              <MoodSlider
                label="How did you feel BEFORE?"
                value={formData.moodBefore}
                onChange={(value) => setFormData(prev => ({ ...prev, moodBefore: value }))}
              />

              <MoodSlider
                label="How do you feel AFTER?"
                value={formData.moodAfter}
                onChange={(value) => setFormData(prev => ({ ...prev, moodAfter: value }))}
              />

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Notes (Optional)</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Any thoughts or reflections..."
                  placeholderTextColor="#9ca3af"
                  value={formData.notes}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!isSaving}
                />
              </View>

              {formData.moodAfter !== formData.moodBefore && (
                <View style={styles.moodChangePreview}>
                  <Text style={styles.moodChangeLabel}>Mood Change:</Text>
                  <Text style={[
                    styles.moodChangeValue,
                    { color: formData.moodAfter > formData.moodBefore 
                      ? APP_SETTINGS.THEME.SUCCESS 
                      : APP_SETTINGS.THEME.ERROR 
                    }
                  ]}>
                    {formData.moodAfter > formData.moodBefore ? '+' : ''}
                    {formData.moodAfter - formData.moodBefore}
                  </Text>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* Activity Picker Modal */}
      <ActivityPicker
        visible={showActivityPicker}
        onClose={() => setShowActivityPicker(false)}
        onSelect={handleSelectActivity}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  keyboardView: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
    backgroundColor: APP_SETTINGS.THEME.CARD,
  },
  modalCancel: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.ERROR,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  modalSave: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.PRIMARY,
    fontWeight: '600',
  },
  modalSaveDisabled: {
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
  },
  activityInput: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
    minHeight: 80,
  },
  notesInput: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT,
    minHeight: 100,
  },
  moodChangePreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 8,
    marginTop: 8,
  },
  moodChangeLabel: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
    marginRight: 8,
  },
  moodChangeValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityPickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityPickerButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    flex: 1,
  },
  activityPickerIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
  },
  selectedActivityBadge: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  selectedActivityCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    overflow: 'hidden',
  },
  selectedActivityDifficulty: {
    fontSize: 12,
    fontWeight: '500',
    color: APP_SETTINGS.THEME.TEXT,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
  },
  orDivider: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.SECONDARY_TEXT,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default DiaryScreen;
