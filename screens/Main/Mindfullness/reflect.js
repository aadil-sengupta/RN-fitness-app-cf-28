import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Video, Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { FirebaseAuth, updateUserData } from '../../../functions/firebaseConfig';

const Reflect = ({route, navigation}) => {
  const reflectTexts = [
    "Recall a time when you learned a new way of doing something and what it felt like to think in a new way.",
    "Notice each thought that goes through your mind. Consider why it's there and then let it go.",
    "Think back to a moment when you felt completely content and try to relive that sensation.",
    "Imagine a place where you feel completely at ease. What does it look like? What does it feel like?",
    "Reflect on a time when you overcame a challenge. What did you learn about yourself?",
    "Recall a moment when someone showed you kindness. How did it make you feel?",
    "Consider a goal you recently achieved. Acknowledge the steps it took to get there.",
    "Think of a loved one and imagine sending them positive energy and love.",
    "Reflect on a situation where you wish you had acted differently. What would you change?",
    "Take a moment to acknowledge one thing you’re grateful for today.",
    "Think about an upcoming event that you're looking forward to, and imagine it going well.",
    "Recall a time you were brave. What fears did you overcome?",
    "Consider a recent mistake you made. What have you learned from it?",
    "Imagine you’re holding a stress ball. With each exhale, imagine squeezing out a little bit of your stress.",
    "Think about the people who have helped you get where you are today. Send them a silent thank you."
  ];
  
  const [showText, setShowText] = useState(true);
  const [showReflect, setShowReflect] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const reflectFadeAnim = useRef(new Animated.Value(0)).current;
  const soundObject = new Audio.Sound();
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const blurFadeAnim = useRef(new Animated.Value(1)).current;
  const [reflectText, setReflectText] = useState(reflectTexts[Math.floor(Math.random() * reflectTexts.length)]);
  const [sound, setSound] = useState();
  const [isReflectionComplete, setIsReflectionComplete] = useState(false);

  const data = route.params.data;
  
  useEffect(() => {
    setTimeout(fadeOut, 3000);
    const loadSound = async () => {
      try {
        console.log('Trying to load sound');
        await soundObject.loadAsync(require('../../../assets/reflect.mp3'));
        console.log('Sound loaded');
        setIsSoundLoaded(true);
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };
    
    return sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const loadAndPlaySound = async () => {
    console.log('Loading Sound');
    try {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../../../assets/reflect.mp3')
      );
      setSound(loadedSound);
      console.log('Playing Sound');
      await loadedSound.playAsync();
    } catch (error) {
      console.error('Error loading and playing sound:', error);
    }
  };


  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setShowText(false);
      reflectFadeAnim.setValue(0);  // Reset reflectFadeAnim to 0
      setShowReflect(true);
      Animated.timing(reflectFadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  };
  
  
  const startReflect = async () => {
    Animated.parallel([
      Animated.timing(reflectFadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(blurFadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsReflectionComplete(true); // Add this line

      if ('reflect' in data == false){
        data.reflect = []
        console.log(data.reflect)
    }
    data.reflect.push(new Date())
    updateUserData(FirebaseAuth.currentUser.uid, data)

    });
  
  
    if (isSoundLoaded) {
      try {
        await soundObject.replayAsync();  // Replay the sound object
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    } else {
      console.log('Sound not loaded yet');
    }
    loadAndPlaySound();

  };  
  
  const loadSound = async () => {
    try {
      console.log('Trying to load sound');
      await soundObject.loadAsync(require('../../../assets/reflect.mp3'));
      console.log('Sound loaded');
      setIsSoundLoaded(true);
      await soundObject.playAsync(); // Add this line

    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Video
        source={require('../../../assets/reflectBg.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      
      {(showText || showReflect) && (
        <Animated.View style={{...styles.blurOverlay, opacity: blurFadeAnim}}>
        <BlurView intensity={7} tint='dark' style={StyleSheet.absoluteFill}></BlurView>
      </Animated.View>
      )}

      {showText && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Text style={styles.text}>Take a moment to pause.</Text>
        </Animated.View>
      )}

        {showReflect && (
        <Animated.View style={[styles.overlay, { opacity: reflectFadeAnim }]}>
            <Text style={styles.text}>{reflectText}</Text>
          {!isReflectionComplete ? (
            <TouchableOpacity style={styles.button} onPress={startReflect}>
            <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>
         ) : (<></>)}
        </Animated.View>
        
        )}
        <TouchableOpacity onPress={() => {nav.goBack()}}  style={styles.crossButton}>
        <BlurView intensity={20} tint='dark' style={{padding: 5.5,borderRadius: 10,overflow: 'hidden',}} >
                <Ionicons name='close' style={{fontSize: 25, color: '#fff'}} />
        </BlurView>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 27,
    color: '#ffffff',
    fontFamily: 'SFPro',
    width: '95%',
    textAlign: 'center',
    marginVertical: 10
  },
  button: {
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'SFPro'
  },
  crossButton: {
    position: 'absolute',
    top: 24,
    left: 20,
    zIndex: 4,
    backgroundColor: '#00000015'
  },
  crossButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Reflect;
