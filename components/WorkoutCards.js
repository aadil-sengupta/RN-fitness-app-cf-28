import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, TouchableHighlight, Easing } from 'react-native';
import GradientText from './gradientText';
import Svg, { Path } from 'react-native-svg';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const WorkoutCard = ({ width, text, height = '100%', gradColors, iconColor }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    }, [isPressed]);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      setIsPressed(true);
  };
  const handlePressOut = () => {
    Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      setIsPressed(false);
  };


  return (
    <AnimatedTouchable
      style={[
        styles.container,
        {
          borderColor: isPressed ? 'white' : '#1c1c1e',
          height: height,
          width: width,
          transform: [{ scale: scaleValue }],
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View>
        <View style={[styles.iconWrap, { backgroundColor: iconColor }]}></View>
        <GradientText style={styles.text} fontSize={25} gradColors={gradColors}>
          {' '}
          {text}{' '}
        </GradientText>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderWidth: 2,
  },
  text: {
    color: 'white',
    fontFamily: 'Gabarito',
    fontSize: 25,
    marginTop: 22,
    width: 240,
    marginLeft: -4
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default WorkoutCard
