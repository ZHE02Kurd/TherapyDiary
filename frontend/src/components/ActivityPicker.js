/**
 * ActivityPicker Component
 * Modal for selecting an activity from the library
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activityService } from '../services/api';
import { APP_SETTINGS, ACTIVITY_CATEGORIES, DIFFICULTY_LEVELS } from '../constants/config';

const ActivityPicker = ({ visible, onClose, onSelect, selectedActivity }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    if (visible) {
      loadActivities();
    }
  }, [visible, categoryFilter]);

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      const params = {
        limit: 100,
        ...(categoryFilter && { category: categoryFilter }),
        ...(searchQuery && { search: searchQuery }),
      };
      
      const response = await activityService.getActivities(params);
      setActivities(response.activities);
    } catch (error) {
      console.error('Load activities error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    loadActivities();
  };

  const handleSelectActivity = (activity) => {
    onSelect(activity);
    onClose();
  };

  const getCategoryColor = (category) => {
    const colors = {
      [ACTIVITY_CATEGORIES.ROUTINE]: '#e0e7ff',
      [ACTIVITY_CATEGORIES.NECESSARY]: '#fef3c7',
      [ACTIVITY_CATEGORIES.PLEASURABLE]: '#dbeafe',
    };
    return colors[category] || '#f3f4f6';
  };

  const renderActivity = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.activityItem,
        selectedActivity?._id === item._id && styles.activityItemSelected,
      ]}
      onPress={() => handleSelectActivity(item)}
    >
      <View style={styles.activityHeader}>
        <Text style={styles.activityName}>{item.name}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      {item.description && (
        <Text style={styles.activityDescription} numberOfLines={1}>
          {item.description}
        </Text>
      )}
      {item.difficulty && (
        <Text style={styles.activityDifficulty}>Difficulty: {item.difficulty}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Activity</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

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
        </View>

        <View style={styles.categoryFilters}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              !categoryFilter && styles.filterChipActive,
            ]}
            onPress={() => setCategoryFilter(null)}
          >
            <Text style={[
              styles.filterChipText,
              !categoryFilter && styles.filterChipTextActive,
            ]}>
              All
            </Text>
          </TouchableOpacity>
          {Object.values(ACTIVITY_CATEGORIES).map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                categoryFilter === category && styles.filterChipActive,
              ]}
              onPress={() => setCategoryFilter(category === categoryFilter ? null : category)}
            >
              <Text style={[
                styles.filterChipText,
                categoryFilter === category && styles.filterChipTextActive,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={APP_SETTINGS.THEME.PRIMARY} />
          </View>
        ) : (
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No activities found</Text>
              </View>
            }
          />
        )}

        <TouchableOpacity
          style={styles.noneButton}
          onPress={() => {
            onSelect(null);
            onClose();
          }}
        >
          <Text style={styles.noneButtonText}>None (Manual Entry)</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
    backgroundColor: APP_SETTINGS.THEME.CARD,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  doneButton: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.PRIMARY,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
  },
  searchInput: {
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT,
  },
  categoryFilters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderBottomWidth: 1,
    borderBottomColor: APP_SETTINGS.THEME.BORDER,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
  },
  filterChipActive: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
    borderColor: APP_SETTINGS.THEME.PRIMARY,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  activityItem: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activityItemSelected: {
    borderColor: APP_SETTINGS.THEME.PRIMARY,
    backgroundColor: '#f0f4ff',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
  },
  activityDescription: {
    fontSize: 13,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 4,
  },
  activityDifficulty: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontWeight: '500',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  noneButton: {
    margin: 16,
    padding: 16,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: APP_SETTINGS.THEME.BORDER,
  },
  noneButtonText: {
    fontSize: 16,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    fontWeight: '500',
  },
});

export default ActivityPicker;
