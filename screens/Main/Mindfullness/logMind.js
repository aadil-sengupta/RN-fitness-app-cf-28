import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LogMind = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [screenHeight, setScreenHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(3); // Start at 'Neutral'

  useEffect(() => {
    const { height } = Dimensions.get('window');
    setScreenHeight(height);

    // Scroll to 'Neutral'
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: height * 3, animated: false });
    }
  }, []);

  const moods = [
    'Very Pleasant', 'Pleasant', 'Slightly Pleasant',
    'Neutral', 'Slightly Unpleasant', 'Unpleasant', 'Very Unpleasant'
  ];

  const moodColors = [
    '#FFD700', '#ADFF2F', '#00FFFF',
    '#D3D3D3', '#1E90FF', '#8A2BE2', '#FF4500'
  ];

  const fixedColor = '#FFFFFF';

  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const activeIndex = Math.round(scrollPosition / screenHeight);
    setActiveIndex(activeIndex);
  };

  const animatedColor = moodColors[activeIndex];

  return (
    <LinearGradient
      colors={[animatedColor, fixedColor]}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 0 }}
    >
      <ScrollView
        ref={scrollViewRef}
        snapToInterval={screenHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
      >
        {moods.map((mood, index) => (
          <View key={index} style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button}>
              <Text>Select</Text>
            </TouchableOpacity>
            <Text style={styles.moodText}>{mood}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {moods.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.5 }]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5
  },
  moodText: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white'
  },
  dotContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 2
  }
});

export default LogMind;
