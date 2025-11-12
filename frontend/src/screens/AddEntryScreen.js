import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { dailyEntryService } from '../services/api';
import TherapistMessage from '../components/TherapistMessage';

/**
 * Add Entry Screen
 * Form for logging baseline diary entries
 */
const AddEntryScreen = ({ route, navigation }) => {
  const { weekNumber, onEntryAdded } = route.params;
  
  const [timeOfDay, setTimeOfDay] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState('');
  const [withWhom, setWithWhom] = useState('');
  const [moodBefore, setMoodBefore] = useState('');
  const [moodAfter, setMoodAfter] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const timeOfDayOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeOfDaySelect = (option) => {
    setTimeOfDay(option);
    if (!time) {
      setTime(getCurrentTime());
    }
  };

  const validateForm = () => {
    if (!timeOfDay) {
      Alert.alert('Missing Information', 'Please select a time of day');
      return false;
    }
    if (!time) {
      Alert.alert('Missing Information', 'Please enter what time this was');
      return false;
    }
    if (!activity.trim()) {
      Alert.alert('Missing Information', 'Please describe what you did');
      return false;
    }
    if (!moodBefore.trim()) {
      Alert.alert('Missing Information', 'Please describe how you felt before');
      return false;
    }
    if (!moodAfter.trim()) {
      Alert.alert('Missing Information', 'Please describe how you felt after');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      
      await dailyEntryService.createEntry({
        timeOfDay,
        time,
        activity: activity.trim(),
        location: location.trim(),
        withWhom: withWhom.trim(),
        moodBefore: moodBefore.trim(),
        moodAfter: moodAfter.trim(),
        notes: notes.trim(),
      });

      // Show success message
      Alert.alert(
        'Well done!',
        "You've logged another activity. I can see you're doing the work. Keep it up!",
        [
          {
            text: 'Log Another Activity',
            onPress: () => {
              // Clear form
              setTimeOfDay('');
              setTime('');
              setActivity('');
              setLocation('');
              setWithWhom('');
              setMoodBefore('');
              setMoodAfter('');
              setNotes('');
            },
          },
          {
            text: "View Today's Diary",
            onPress: () => {
              if (onEntryAdded) onEntryAdded();
              navigation.goBack();
            },
          },
        ]
      );

    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to save entry. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TherapistMessage message="Let's record what you did." />

        {/* Time of Day Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Time of Day *</Text>
          <View style={styles.optionsRow}>
            {timeOfDayOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  timeOfDay === option && styles.optionButtonActive,
                ]}
                onPress={() => handleTimeOfDaySelect(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    timeOfDay === option && styles.optionTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time */}
        <View style={styles.section}>
          <Text style={styles.label}>What time? *</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="e.g., 2:30 PM or 14:30"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Activity */}
        <View style={styles.section}>
          <Text style={styles.label}>What did you do? *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={activity}
            onChangeText={setActivity}
            placeholder='e.g., "Went for a walk", "Made breakfast", "Stayed in bed"'
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Where?</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder='e.g., "At home", "Park", "Kitchen"'
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Who With */}
        <View style={styles.section}>
          <Text style={styles.label}>Who were you with?</Text>
          <TextInput
            style={styles.input}
            value={withWhom}
            onChangeText={setWithWhom}
            placeholder='e.g., "Alone", "Friend", "Partner", "Family"'
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Mood Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Mood</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Mood Before */}
        <View style={styles.section}>
          <Text style={styles.label}>How was your mood BEFORE this activity? *</Text>
          <Text style={styles.hint}>
            Describe how you felt in your own words
          </Text>
          <TextInput
            style={styles.input}
            value={moodBefore}
            onChangeText={setMoodBefore}
            placeholder='e.g., "Low", "Tired", "Fed up", "Worried", "Okay"'
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Mood After */}
        <View style={styles.section}>
          <Text style={styles.label}>How was your mood AFTER this activity? *</Text>
          <Text style={styles.hint}>
            Describe how you felt after
          </Text>
          <TextInput
            style={styles.input}
            value={moodAfter}
            onChangeText={setMoodAfter}
            placeholder='e.g., "Better", "Same", "Worse", "Relieved", "Pleased"'
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Any additional notes? (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any other thoughts or details..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  optionTextActive: {
    color: '#ffffff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomSpacing: {
    height: 20,
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
  saveButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddEntryScreen;
