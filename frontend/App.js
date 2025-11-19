import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111827' }}>
      <StatusBar barStyle="light-content" />
      <Text style={{ color: '#F9FAFB', fontSize: 24, fontWeight: 'bold' }}>
        Therapy Diary
      </Text>
      <Text style={{ color: '#9CA3AF', marginTop: 8 }}>
        BA Therapy App
      </Text>
    </View>
  );
}
