import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function AnimatedBackground() {
  const { isDark } = useTheme();
  const blob1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const blob2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const blob3 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    const animateBlob = (blob, duration, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(blob, {
            toValue: { x: 30, y: -40 },
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(blob, {
            toValue: { x: -30, y: 30 },
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(blob, {
            toValue: { x: 0, y: 0 },
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateBlob(blob1, 7000, 0);
    animateBlob(blob2, 8000, 1000);
    animateBlob(blob3, 9000, 2000);
  }, []);

  const blobOpacity = isDark ? 0.3 : 0.4;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.blob,
          {
            top: height * 0.1,
            left: width * 0.1,
            backgroundColor: '#F97316',
            opacity: blobOpacity,
            transform: [
              { translateX: blob1.x },
              { translateY: blob1.y },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          {
            top: height * 0.5,
            right: width * 0.1,
            backgroundColor: '#3B82F6',
            opacity: blobOpacity,
            transform: [
              { translateX: blob2.x },
              { translateY: blob2.y },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          {
            bottom: height * 0.1,
            left: width * 0.3,
            backgroundColor: '#10B981',
            opacity: blobOpacity,
            transform: [
              { translateX: blob3.x },
              { translateY: blob3.y },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
