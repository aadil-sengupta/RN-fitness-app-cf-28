import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Video, Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FirebaseAuth, updateUserData } from '../../../functions/firebaseConfig';

const MOODS = [
  "Very Pleasant", 
  "Pleasant", 
  "Slightly Pleasant", 
  "Neutral", 
  "Slightly Unpleasant", 
  "Unpleasant", 
  "Very Unpleasant"
];

const feelings = [
  "Afraid",
  "Amazed",
  "Amused",
  "Angry",
  "Anxious",
  "Ashamed",
  "Brave",
  "Calm",
  "Cheerful",
  "Confident",
  "Confused",
  "Curious",
  "Depressed",
  "Determined",
  "Excited",
  "Frustrated",
  "Grateful",
  "Happy",
  "Hopeful",
  "Jealous",
  "Joyful",
  "Lonely",
  "Nervous",
  "Optimistic",
  "Proud",
  "Relaxed",
  "Sad",
  "Surprised",
  "Thankful",
  "Worried"
];

const impacts = [
  "Work",
  "Family",
  "Health",
  "Finance",
  "Relationships",
  "Education",
  "Politics",
  "Society",
  "Environment",
  "Technology",
  "Passions",
  "Culture",
  "News",
  "Travel",
  "Spirituality",
  "Hobbies",
  "Friends",
  "Music",
  "Career",
  "Pandemic",
  "Stress",
  "Media",
  "Weather",
  "History",
  "Art",
  "Literature",
  "Economy",
  "Goals",
  "Dreams",
  "Failures"
];

const LogMind = ({route,navigation}) => {

  const page1 = useRef(null)
  const page2 = useRef(null)
  const page3 = useRef(null)
  const page4 = useRef(null)

  const nav = useNavigation();
  const data = route.params.data
  useEffect(() => {
    if ('logMind' in data == false){
      data.logMind = []
      console.log(data.logMind)
  }
  data.logMind.push(new Date())
  updateUserData(FirebaseAuth.currentUser.uid, data)
  }, []);

  const hideall = () =>{
    page1.current.setNativeProps({display: 'none'});
    page2.current.setNativeProps({display: 'none'});
    page3.current.setNativeProps({display: 'none'});
    page4.current.setNativeProps({display: 'none'});
  }

  const page1Func = () => {
    hideall()
    page2.current.setNativeProps({display: 'flex'});
  }
  const page2Func = () => {
    hideall()
    page3.current.setNativeProps({display: 'flex'});
  }
  const page3Func = () => {
    hideall()
    page4.current.setNativeProps({display: 'flex'});
  }

  return(
    <View style={styles.container} >
      <Video
        source={require('../../../assets/logMind.mp4')}
        rate={1.0}
        volume={0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      <View ref={page1} style={styles.page} >
          <Text style={styles.quesText} >Choose how you've felt overall today.</Text>
          <View  style={styles.optionsWrap} contentContainerStyle={styles.optionsWrapContainer} >
            <ScrollView style={styles.scrollViewWrap}  contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}>
              {MOODS.map((mood, index) => (
              <TouchableOpacity style={styles.optionWrap} key={index} onPress={page1Func} >
                <Text style={styles.optionText}>{mood}</Text>
              </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
      </View>

      <View ref={page2} style={[styles.page, {display: 'none'}]} >
          <Text style={styles.quesText} >What best describes this feeling?</Text>
          <View  style={styles.optionsWrap} contentContainerStyle={styles.optionsWrapContainer} >
            <ScrollView style={styles.scrollViewWrap}  contentContainerStyle={{alignItems: 'center'}}>
              {feelings.map((feeling, index) => (
              <TouchableOpacity style={styles.optionWrap} onPress={page2Func}  key={index} >
                <Text style={styles.optionText}>{feeling}</Text>
              </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
      </View> 

      <View ref={page3} style={[styles.page, {display: 'none'}]} >
          <Text style={styles.quesText} >What's having the biggest impact on you?</Text>
          <View  style={styles.optionsWrap} contentContainerStyle={styles.optionsWrapContainer} >
            <ScrollView style={styles.scrollViewWrap}  contentContainerStyle={{alignItems: 'center'}}>
              {impacts.map((feeling, index) => (
              <TouchableOpacity style={styles.optionWrap} onPress={page3Func}  key={index} >
                <Text style={styles.optionText}>{feeling}</Text>
              </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
      </View> 

      <View ref={page4} style={[styles.page, {display: 'none', justifyContent: 'center', alignItems: 'center'}]} >
          <Text style={[styles.quesText, {width: '50%', transform: [{scale: 1.15}]}]} >Logged <Ionicons style={{fontSize: 27, paddingLeft: 10}} name='checkmark-circle' /></Text>
          <TouchableOpacity style={[styles.optionWrap,{width: '45%', transform: [{translateY: 225}]}]} onPress={nav.goBack} >
                <Text style={{color: 'white', fontFamily: 'SFPro', fontSize: 28}} >End</Text>
          </TouchableOpacity>
      </View> 
                
      <TouchableOpacity style={[styles.optionWrap,{width: 'auto', height: 'auto', position: 'absolute', padding: 10, top: 25, left: 20, zIndex: 999}]} onPress={nav.goBack} >
        <Ionicons name='close-circle' style={{color: 'white', fontSize: 24}} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  video: {
    zIndex: -99,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  page:{
    width: '100%',
    height: '80%',
    marginBottom: '2%',
    marginTop: '18%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quesText:{
    fontFamily: 'SFPro',
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 12,
    width: '90%',
    marginBottom: -25,
  },
  optionsWrap:{
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  scrollViewWrap:{
    width: '100%',
    height: '53%'
  },
  optionWrap:{
    width: '90%',
    height: 55,
    marginVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionText:{
    color: 'white',
    fontFamily: 'SFPro',
    fontSize: 20,
  }
});

export default LogMind;
