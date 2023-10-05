import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { MainHeader } from '../../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData } from '../../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import WorkoutCard from '../../../components/WorkoutCards';
import { useNavigation } from '@react-navigation/native';

const Workout = () => {
  const [Greeting, setGreeting] = useState('Good Afternoon!')
  const uid = FirebaseAuth.currentUser.uid
  const [userData, setUserData] = useState({})
  const nav = useNavigation();

  useEffect(() => {
    const data =  fetchUserData(uid).then((data) => {
      setUserData(data)
      console.log(data)
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12)
        greet = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
      setGreeting(greet + ' ' + data.FirstName + '!');
    })
  }, []);


  return (
  <ScrollView contentContainerStyle={styles.container} >

  <LinearGradient
    colors={['#FF017765', 'transparent']}
    style={styles.linearGradient}
    start={[0.5, 0]}
    end={[0.5, 1]}
  ></LinearGradient>
  <StatusBar style="light" />
  <MainHeader title={''} />
    <Text style={[styles.textHeader, {marginTop: 20}]} >{Greeting}</Text>
    <Text style={styles.textHeader2}>Here's info about your last workout.</Text>
    <View style={styles.sectionTop}>

    </View>
    <Text style={[styles.textHeader, {marginTop: 10}]}>Start a new workout!</Text>
    <View style={styles.cardSec}>
        <View style={styles.cardRow}>
            <WorkoutCard text={'Outdoor Walk'} width={'45%'} gradColors={['rgb(255, 50, 10)', 'rgb(255, 98, 140)']} iconColor='rgba(255, 50, 10, 0.4)' />
            <WorkoutCard text={'Outdoor Run'} width={'45%'} gradColors={['rgba(0,255,255,0.8)', 'rgba(0,0,255,0.8)']} iconColor='rgba(0,255,255,0.22)' />
        </View>
        <View style={styles.cardRow}>
            <WorkoutCard text={'Indoor Walk'} width={'45%'} gradColors={['rgba(0,155,255,0.8)', 'rgba(0,0,255,0.8)']} iconColor='rgba(15,40,255,0.3)' />
            <WorkoutCard text={'Indoor Run'} width={'45%'} gradColors={['rgb(108, 0, 128)', 'rgb(255, 102, 240)']} iconColor='rgba(108, 0, 128, 0.34)' />
        </View>
        <View style={styles.cardRow}>
            <WorkoutCard text={'Outdoor Cycle'} width={'45%'} gradColors={['rgb(255, 165, 0)', 'rgb(255, 80, 0)']} iconColor='rgba(255, 80, 0,0.45)' />
            <WorkoutCard text={'Indoor Cycle'} width={'45%'} gradColors={['rgba(0,255,255,0.8)', 'rgba(0,0,255,0.8)']}  iconColor='rgba(0,255,255,0.22)' />
        </View>
        <View style={styles.cardRow}>
            <WorkoutCard text={'Outdoor Cycle'} width={'45%'} gradColors={['#50c2c2',  '#007575']} iconColor='#50c2c236'/>
            <WorkoutCard text={'Hiking'} width={'45%'} gradColors={['rgb(255, 162, 200)', 'rgb(255, 22, 193)']} iconColor='rgba(255, 162, 200, 0.45)' />
        </View>
      <TouchableOpacity style={styles.btmBtn} onPress={() => nav.navigate('AddWorkout')} >
        <Text style={styles.btmBtnText} >Add workout manually</Text>
      </TouchableOpacity>
    </View>

  
  </ScrollView>
  )
}

export default Workout

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginTop: -10,
    width: '100%',
    paddingBottom: 100,

  },
  textHeader:{
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 26,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  textHeader2:{
    fontFamily: 'Helvetica',
    color: '#9898A0',
    fontSize: 20,
    marginLeft: 21,

  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    },
    sectionTop:{
      width: '94%',
      marginHorizontal: '3%',
      height: 'auto',
      minHeight: 245,
      paddingVertical: 20,
      marginVertical: 20,
      marginTop: 56,
      paddomgBottom: 0,
      backgroundColor: '#1c1c1e',
      borderRadius: 10,
    },
    cardSec:{
        width: '100%',
        marginTop: 10,
    },
    cardRow:{
        flexDirection: 'row',
        width: '100%',
        height: 126,
        paddingHorizontal: 4,
        marginVertical: 5,
    },
    btmBtn:{
        width: '94%',
        marginHorizontal: '3%',
        height: 50,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btmBtnText:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'SFPro',
    }
})