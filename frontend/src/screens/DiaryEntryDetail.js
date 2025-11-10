/**
 * Diary Entry Detail / Edit Screen
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { diaryService } from '../services/api';
import { APP_SETTINGS } from '../constants/config';
import MoodSlider from '../components/MoodSlider';

const DiaryEntryDetail = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    activity: '',
    moodBefore: 5,
    moodAfter: 5,
    notes: '',
  });

  useEffect(() => {
    if (!id) return;
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      setLoading(true);
      const res = await diaryService.getEntry(id);
      setEntry(res.entry || res);
    } catch (err) {
      console.error('Fetch entry error:', err);
      Alert.alert('Error', 'Failed to load entry');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const openEdit = () => {
    if (!entry) return;
    setForm({
      activity: entry.activity || '',
      moodBefore: entry.moodBefore ?? 5,
      moodAfter: entry.moodAfter ?? 5,
      notes: entry.notes || '',
    });
    setEditModalVisible(true);
  };

  const handleSave = async () => {
    if (!form.activity.trim()) {
      Alert.alert('Error', 'Please describe your activity');
      return;
    }
    setSaving(true);
    try {
      await diaryService.updateEntry(id, {
        activity: form.activity.trim(),
        moodBefore: form.moodBefore,
        moodAfter: form.moodAfter,
        notes: form.notes.trim() || undefined,
      });
      setEditModalVisible(false);
      await fetchEntry();
      Alert.alert('Success', 'Entry updated');
    } catch (err) {
      console.error('Update entry error:', err);
      Alert.alert('Error', err.response?.data?.error || 'Failed to update entry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await diaryService.deleteEntry(id);
            Alert.alert('Deleted', 'Entry deleted');
            navigation.goBack();
          } catch (err) {
            console.error('Delete error:', err);
            Alert.alert('Error', 'Failed to delete entry');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={APP_SETTINGS.THEME.PRIMARY} />
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>Entry not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.activity}>{entry.activity}</Text>

        {entry.activityId && entry.activityId.name && (
          <View style={styles.tagRow}>
            <Text style={styles.tag}>{entry.activityId.category}</Text>
            {entry.activityId.difficulty && <Text style={styles.tagSecondary}>{entry.activityId.difficulty}</Text>}
          </View>
        )}

        <View style={styles.moodRow}>
          <View style={styles.moodBlock}>
            <Text style={styles.moodLabel}>Before</Text>
            <Text style={styles.moodValue}>{entry.moodBefore}</Text>
          </View>
          <View style={styles.moodBlock}>
            <Text style={styles.moodLabel}>After</Text>
            <Text style={styles.moodValue}>{entry.moodAfter}</Text>
          </View>
        </View>

        {entry.notes ? (
          <View style={styles.notesBox}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{entry.notes}</Text>
          </View>
        ) : null}

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={openEdit}>
            <Text style={styles.actionTxt}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={handleDelete}>
            <Text style={[styles.actionTxt, styles.deleteTxt]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Entry</Text>
              <TouchableOpacity onPress={handleSave} disabled={saving}>
                <Text style={[styles.modalSave, saving && { opacity: 0.6 }]}>{saving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} keyboardShouldPersistTaps="handled">
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Activity</Text>
                <TextInput
                  style={styles.input}
                  value={form.activity}
                  onChangeText={(t) => setForm(prev => ({ ...prev, activity: t }))}
                  multiline
                />
              </View>

              <MoodSlider label="How did you feel BEFORE?" value={form.moodBefore} onChange={(v) => setForm(prev => ({ ...prev, moodBefore: v }))} />
              <MoodSlider label="How do you feel AFTER?" value={form.moodAfter} onChange={(v) => setForm(prev => ({ ...prev, moodAfter: v }))} />

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Notes</Text>
                <TextInput style={[styles.input, { minHeight: 100 }]} value={form.notes} onChangeText={(t) => setForm(prev => ({ ...prev, notes: t }))} multiline />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: APP_SETTINGS.THEME.BACKGROUND },
  content: { flex: 1 },
  activity: { fontSize: 20, fontWeight: '700', color: APP_SETTINGS.THEME.TEXT, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tag: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: APP_SETTINGS.THEME.CARD, borderRadius: 6 },
  tagSecondary: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: APP_SETTINGS.THEME.BACKGROUND, borderRadius: 6 },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  moodBlock: { alignItems: 'center' },
  moodLabel: { fontSize: 12, color: APP_SETTINGS.THEME.TEXT_SECONDARY },
  moodValue: { fontSize: 18, fontWeight: '700', color: APP_SETTINGS.THEME.TEXT },
  notesBox: { backgroundColor: APP_SETTINGS.THEME.CARD, padding: 12, borderRadius: 8, marginBottom: 12 },
  notesLabel: { fontSize: 12, color: APP_SETTINGS.THEME.TEXT_SECONDARY, marginBottom: 6 },
  notesText: { fontSize: 14, color: APP_SETTINGS.THEME.TEXT },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  actionBtn: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: APP_SETTINGS.THEME.PRIMARY, borderRadius: 8 },
  actionTxt: { color: '#fff', fontWeight: '600' },
  deleteBtn: { backgroundColor: APP_SETTINGS.THEME.CARD, borderWidth: 1, borderColor: APP_SETTINGS.THEME.ERROR },
  deleteTxt: { color: APP_SETTINGS.THEME.ERROR },

  modalContainer: { flex: 1, backgroundColor: APP_SETTINGS.THEME.BACKGROUND },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: APP_SETTINGS.THEME.BORDER },
  modalCancel: { color: APP_SETTINGS.THEME.ERROR, fontSize: 16 },
  modalTitle: { fontSize: 16, fontWeight: '600', color: APP_SETTINGS.THEME.TEXT },
  modalSave: { color: APP_SETTINGS.THEME.PRIMARY, fontWeight: '600', fontSize: 16 },
  modalContent: { flex: 1, padding: 16 },
  formGroup: { marginBottom: 16 },
  formLabel: { color: APP_SETTINGS.THEME.TEXT, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: APP_SETTINGS.THEME.CARD, padding: 12, borderRadius: 8, color: APP_SETTINGS.THEME.TEXT },
  empty: { padding: 16, color: APP_SETTINGS.THEME.TEXT, textAlign: 'center' },
});

export default DiaryEntryDetail;
