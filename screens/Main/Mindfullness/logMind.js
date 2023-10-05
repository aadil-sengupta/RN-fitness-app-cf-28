import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MOODS = [
  "Very Pleasant", 
  "Pleasant", 
  "Slightly Pleasant", 
  "Neutral", 
  "Slightly Unpleasant", 
  "Unpleasant", 
  "Very Unpleasant"
];

const MOOD_COLORS = [
  "#6df78c", 
  "#8cf76d", 
  "#acf757", 
  "#e8e82a", 
  "#f7ac57", 
  "#f76d6d", 
  "#f76d9e"
];

const LogMind = () => {
  const [sliderValue, setSliderValue] = useState(3); // Default to Neutral
  const transition = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: transition.value,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: MOOD_COLORS[sliderValue] }]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} />
      <Text style={styles.moodText}>{MOODS[sliderValue]}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={6}
        step={1}
        value={sliderValue}
        onValueChange={value => {
          setSliderValue(value);
          transition.value = withTiming(1, { duration: 250, easing: Easing.linear }, () => {
            transition.value = withTiming(0);
          });
        }}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 60
  }
});

export default LogMind;
