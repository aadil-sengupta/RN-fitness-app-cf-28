import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, TouchableHighlight, Easing } from 'react-native';
import GradientText from './gradientText';
import Svg, { Path } from 'react-native-svg';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const Card = ({ width, text, height = '100%', gradColors, iconColor, pressed=true }) => {
  const [isPressed, setIsPressed] = useState(pressed);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const checkmarkValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: isPressed ? 0.95 : 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(checkmarkValue, {
      toValue: isPressed ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isPressed]);

  const handlePress = () => {
    setIsPressed(!isPressed);
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
      onPress={handlePress}
    >
      <View>
        <View style={[styles.iconWrap, { backgroundColor: iconColor }]}></View>
        <GradientText style={styles.text} fontSize={25} gradColors={gradColors}>
          {' '}
          {text}{' '}
        </GradientText>
        <Animated.View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: checkmarkValue,
          }}
        >
          <Svg width="29" height="29" viewBox="0 0 24 24">
            <Path
              fill="white"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            />
          </Svg>
        </Animated.View>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    borderRadius: 21,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    borderWidth: 2,
  },
  text: {
    color: 'white',
    fontFamily: 'Gabarito',
    fontSize: 25,
    marginTop: 22,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default Card
