import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, StyleSheet, Vibration } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FirebaseAuth, updateUserData } from '../../../functions/firebaseConfig';
import { Shadow } from 'react-native-shadow-2';

const Breathe = ({ route, navigation }) => {
  const [gifVisible, setGifVisible] = useState(false);
  const [breathText, setBreathText] = useState('');
  const buttonFadeAnim = new Animated.Value(1);
  const gifFadeAnim = new Animated.Value(1);
  const textFadeAnim = new Animated.Value(1); // Initial opacity set to 0

  const nav = useNavigation();

  const data = route.params.data;

  const fadeTextInOut = (callback) => {
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
      Animated.timing(textFadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startBreathingExercise = () => {
    let cycles = 0;

        fadeTextInOut(() => setBreathText('Inhale...'));
        Vibration.vibrate(500);
        setTimeout(() => {
          fadeTextInOut(() => setBreathText('Hold...'));
          Vibration.vibrate(500);
          setTimeout(() => {
            fadeTextInOut(() => setBreathText('Exhale...'));
            Vibration.vibrate(500);
          }, 7000);
        }, 4000);

    const timer = setInterval(() => {
      if (cycles < 4) {
        fadeTextInOut(() => setBreathText('Inhale...'));
        Vibration.vibrate(500);
        setTimeout(() => {
          fadeTextInOut(() => setBreathText('Hold...'));
          Vibration.vibrate(500);
          setTimeout(() => {
            fadeTextInOut(() => setBreathText('Exhale...'));
            Vibration.vibrate(500);
          }, 7000);
        }, 4000);

        cycles++;
      } else {
        clearInterval(timer);
        setGifVisible(false);
        setBreathText('');
        nav.goBack();
      }
    }, 19000);

    return () => clearInterval(timer);
  };
  const stopExercise = () => {
    setGifVisible(false);
    setBreathText('');
    nav.goBack();
  };
  const onPressButton = () => {
    Animated.timing(buttonFadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setGifVisible(true);
      Animated.timing(gifFadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        startBreathingExercise();
      });
    });
    if ('breathe' in data == false){
        data.breathe = []
        console.log(data.breathe)
    }
    data.breathe.push(new Date())
    updateUserData(FirebaseAuth.currentUser.uid, data)

  };
  
  return (
    <View style={styles.container}>
        {gifVisible && (
        <TouchableOpacity onPress={stopExercise} style={styles.crossButton}>
          <Ionicons name='close' style={{fontSize: 25}} />
        </TouchableOpacity>
      )}
      {gifVisible && (        
        <Animated.Image
          source={require('../../../assets/saas_lo.gif')}
          style={[
            styles.gifStyle,
            { opacity: gifFadeAnim, width: '100%', height: null, aspectRatio: 1 },
          ]}
          resizeMode="contain"
        />
      )}
      <Animated.View style={[styles.buttonWrapper, { opacity: buttonFadeAnim }]}>
        {!gifVisible && (
            <>
            <Shadow  paintInside={true}  distance={0} startColor={'#04d6d620'} >
          <TouchableOpacity onPress={onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>Begin</Text>
          </TouchableOpacity>
          </Shadow>
            <TouchableOpacity onPress={() => nav.navigate('Meditation')} style={[styles.button, {backgroundColor: 'transparent', borderColor: '#04d6d6', borderWidth: 2, marginTop: 10}]}>
                        <Text style={{color: '#04d6d6'}}>Back</Text>
            </TouchableOpacity>
        </>
        )}
      </Animated.View>
      <Animated.Text style={[styles.breathText, { opacity: textFadeAnim }]}>
        {breathText}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    zIndex: 2,
  },
  button: {
    backgroundColor: '#04d6d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  gifStyle: {
    position: 'absolute',
    zIndex: 1,
  },
  breathText: {
    color: 'white',
    fontSize: 26,
    position: 'absolute',
    zIndex: 3,
    bottom: 80,
  },
  crossButton: {
    position: 'absolute',
    top: 54,
    left: 30,
    zIndex: 4,
    padding: 4.5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  crossButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Breathe;
