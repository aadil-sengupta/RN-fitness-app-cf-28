import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useRef } from 'react';
import { Animated, Easing, ImageBackground } from 'react-native';
import backgroundImage from '../assets/bg2Transparent.png';



function BackgroundAnimation() {
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;

    const INPUT_RANGE_START = 0;
    const INPUT_RANGE_END = 1;
    const OUTPUT_RANGE_START = -281;
    const OUTPUT_RANGE_END = 0;
    const ANIMATION_TO_VALUE = 1;
    const ANIMATION_DURATION = 25000;

    useEffect(() => {
      const translate = () => {
        translateValue.setValue(initialValue);
        Animated.timing(translateValue, {
          toValue: ANIMATION_TO_VALUE,
          duration: ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => translate());
      };
  
      translate();
    }, [translateValue]);
  
    const translateAnimation = translateValue.interpolate({
      inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
      outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });
  
    const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
  
    return (
      
          <AnimetedImage 
              resizeMode="repeat" 
              style={[styles.background,{
                  transform: [
                      {
                        translateX: translateAnimation,
                      },
                      {
                        translateY: translateAnimation,
                      },
                    ],
              }]}
              source={backgroundImage} />
          
    )
  }

export default React.memo(BackgroundAnimation);



const styles = StyleSheet.create({    
    
    background: {
        position: 'absolute',
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.22,
        transform: [
          {
            translateX: 0,
          },
          {
            translateY: 0,
          },
        ],      
      }, 
  });
