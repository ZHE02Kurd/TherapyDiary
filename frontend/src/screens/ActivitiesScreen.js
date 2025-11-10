/**
 * Activities Screen
 * Browse and manage activity library
 */

import React, { useState, useEffect } from 'react';
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
import { activityService } from '../services/api';
import { APP_SETTINGS, ACTIVITY_CATEGORIES, DIFFICULTY_LEVELS } from '../constants/config';
import ActivityCard from '../components/ActivityCard';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showRankModal, setShowRankModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState({
    category: null,
    difficulty: null,
  });
  
  // Form state for new activity
  const [formData, setFormData] = useState({
    name: '',
    category: ACTIVITY_CATEGORIES.PLEASURABLE,
    difficulty: DIFFICULTY_LEVELS.MODERATE,
    description: '',
    estimatedDuration: '',
    tags: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadActivities();
  }, [filters]);

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      const params = {
        limit: 100,
        ...(filters.category && { category: filters.category }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(searchQuery && { search: searchQuery }),
      };
      
      const response = await activityService.getActivities(params);
      setActivities(response.activities);
    } catch (error) {
      console.error('Load activities error:', error);
      Alert.alert('Error', 'Failed to load activities');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadActivities();
    setIsRefreshing(false);
  };

  const handleSearch = () => {
    loadActivities();
  };

  const handleAddActivity = () => {
    setFormData({
      name: '',
      category: ACTIVITY_CATEGORIES.PLEASURABLE,
      difficulty: DIFFICULTY_LEVELS.MODERATE,
      description: '',
      estimatedDuration: '',
      tags: '',
    });
    setShowAddModal(true);
  };

  const handleSaveActivity = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }

    setIsSaving(true);
    try {
      const activityData = {
        name: formData.name.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        description: formData.description.trim() || undefined,
        estimatedDuration: formData.estimatedDuration ? parseInt(formData.estimatedDuration) : undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : undefined,
      };

      await activityService.createActivity(activityData);
      setShowAddModal(false);
      Alert.alert('Success', 'Activity created!');
      await loadActivities();
    } catch (error) {
      console.error('Save activity error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to save activity');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRankActivity = (activity) => {
    setSelectedActivity(activity);
    setShowRankModal(true);
  };

  const handleUpdateRanking = async (newDifficulty) => {
    if (!selectedActivity) return;

    try {
      await activityService.updateRanking(selectedActivity._id, newDifficulty);
      setShowRankModal(false);
      Alert.alert('Success', 'Activity difficulty updated!');
      await loadActivities();
    } catch (error) {
      console.error('Update ranking error:', error);
      Alert.alert('Error', 'Failed to update difficulty');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const clearFilters = () => {
    setFilters({ category: null, difficulty: null });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.difficulty) count++;
    if (searchQuery) count++;
    return count;
  };

  const renderActivity = ({ item }) => (
    <ActivityCard
      activity={item}
      onPress={() => {
        Alert.alert(
          item.name,
          item.description || 'No description available',
          [{ text: 'OK' }]
        );
      }}
      onRank={handleRankActivity}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No activities found</Text>
        <Text style={styles.emptyText}>
          {getActiveFilterCount() > 0 
            ? 'Try adjusting your filters or create a custom activity'
            : 'Create your first custom activity to get started!'
          }
        </Text>
        <TouchableOpacity style={styles.emptyButton} onPress={handleAddActivity}>
          <Text style={styles.emptyButtonText}>Create Activity</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search activities..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
          {getActiveFilterCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <View style={styles.activeFiltersContainer}>
          {filters.category && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filters.category}</Text>
              <TouchableOpacity onPress={() => handleFilterChange('category', filters.category)}>
                <Text style={styles.removeFilterText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          {filters.difficulty && (
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filters.difficulty}</Text>
              <TouchableOpacity onPress={() => handleFilterChange('difficulty', filters.difficulty)}>
                <Text style={styles.removeFilterText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Activity List */}
      {isLoading && activities.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={APP_SETTINGS.THEME.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={activities}
          renderItem={renderActivity}
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
        />
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleAddActivity}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.modalCancel}>Done</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.modalClear}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.filterOptions}>
              {Object.values(ACTIVITY_CATEGORIES).map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterOption,
                    filters.category === category && styles.filterOptionActive
                  ]}
                  onPress={() => handleFilterChange('category', category)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.category === category && styles.filterOptionTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Difficulty</Text>
            <View style={styles.filterOptions}>
              {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.filterOption,
                    filters.difficulty === difficulty && styles.filterOptionActive
                  ]}
                  onPress={() => handleFilterChange('difficulty', difficulty)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.difficulty === difficulty && styles.filterOptionTextActive
                  ]}>
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Add Activity Modal */}
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
              <Text style={styles.modalTitle}>New Activity</Text>
              <TouchableOpacity onPress={handleSaveActivity} disabled={isSaving}>
                <Text style={[styles.modalSave, isSaving && styles.modalSaveDisabled]}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} keyboardShouldPersistTaps="handled">
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Activity Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Yoga practice"
                  placeholderTextColor="#9ca3af"
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  editable={!isSaving}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Category *</Text>
                <View style={styles.categoryOptions}>
                  {Object.values(ACTIVITY_CATEGORIES).map(category => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryOption,
                        formData.category === category && styles.categoryOptionActive
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, category }))}
                      disabled={isSaving}
                    >
                      <Text style={[
                        styles.categoryOptionText,
                        formData.category === category && styles.categoryOptionTextActive
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Difficulty *</Text>
                <View style={styles.categoryOptions}>
                  {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                    <TouchableOpacity
                      key={difficulty}
                      style={[
                        styles.categoryOption,
                        formData.difficulty === difficulty && styles.categoryOptionActive
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, difficulty }))}
                      disabled={isSaving}
                    >
                      <Text style={[
                        styles.categoryOptionText,
                        formData.difficulty === difficulty && styles.categoryOptionTextActive
                      ]}>
                        {difficulty}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe the activity..."
                  placeholderTextColor="#9ca3af"
                  value={formData.description}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  editable={!isSaving}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Estimated Duration (minutes)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 30"
                  placeholderTextColor="#9ca3af"
                  value={formData.estimatedDuration}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, estimatedDuration: text }))}
                  keyboardType="number-pad"
                  editable={!isSaving}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tags (comma-separated)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., exercise, outdoor, social"
                  placeholderTextColor="#9ca3af"
                  value={formData.tags}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, tags: text }))}
                  editable={!isSaving}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* Rank Activity Modal */}
      <Modal
        visible={showRankModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowRankModal(false)}
      >
        <View style={styles.rankModalOverlay}>
          <View style={styles.rankModalContent}>
            <Text style={styles.rankModalTitle}>Rank Difficulty</Text>
            <Text style={styles.rankModalSubtitle}>{selectedActivity?.name}</Text>
            
            <View style={styles.rankOptions}>
              {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                <TouchableOpacity
                  key={difficulty}
                  style={styles.rankOption}
                  onPress={() => handleUpdateRanking(difficulty)}
                >
                  <Text style={styles.rankOptionText}>{difficulty}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.rankModalCancel}
              onPress={() => setShowRankModal(false)}
            >
              <Text style={styles.rankModalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
  },
  searchInput: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  filterBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: APP_SETTINGS.THEME.PRIMARY,
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    paddingTop: 8,
    gap: 8,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  activeFilterText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  removeFilterText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearFiltersText: {
    color: APP_SETTINGS.THEME.PRIMARY,
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalClear: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.PRIMARY,
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
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginTop: 16,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  filterOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 2,
    borderColor: APP_SETTINGS.THEME.BORDER,
  },
  filterOptionActive: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    borderColor: APP_SETTINGS.THEME.PRIMARY,
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  filterOptionTextActive: {
    color: '#ffffff',
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
  input: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
  },
  textArea: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
    minHeight: 80,
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderWidth: 2,
    borderColor: APP_SETTINGS.THEME.BORDER,
  },
  categoryOptionActive: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    borderColor: APP_SETTINGS.THEME.PRIMARY,
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  categoryOptionTextActive: {
    color: '#ffffff',
  },
  rankModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rankModalContent: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  rankModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
    textAlign: 'center',
  },
  rankModalSubtitle: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 24,
    textAlign: 'center',
  },
  rankOptions: {
    gap: 12,
    marginBottom: 16,
  },
  rankOption: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  rankOptionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  rankModalCancel: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  rankModalCancelText: {
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontSize: 16,
  },
});

export default ActivitiesScreen;
