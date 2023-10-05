import { StyleSheet, Text, SafeAreaView, View, ScrollView, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import { MainHeader } from '../../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData } from '../../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { useSteps, useCalories } from '../../../functions/fitness';
import SummaryCard from '../../../components/summaryCards';
import Carousel from 'react-native-snap-carousel'
import GraphCard from '../../../components/graphCard';

const Summary = () => {

  // Set greeting
    const [Greeting, setGreeting] = useState('Good Afternoon!')
    const uid = FirebaseAuth.currentUser.uid
    const [userData, setUserData] = useState({})
    const steps = useSteps()
    const [exercise, setExercise] = useState(0)
    const [exerciseGoal, setExerciseGoal] = useState(1000)
    const [water, setWater] = useState(0)
    const calories = steps * 0.04

    useEffect(() => {
      const data =  fetchUserData(uid).then((data) => {
        setUserData(data)

        //Exercise Data
        setExerciseGoal(data.exerciseGoal)
        let exerciseData = data.workouts
        let exerciseToday = 0
        for (let i =0; i < exerciseData.length; i++){
          let time = exerciseData[i].date
          let formattedDate = new Date(time.seconds * 1000 + time.nanoseconds/1000000)
          if (formattedDate.toDateString() == new Date().toDateString()){
            exerciseToday = exerciseToday + exerciseData[i].time
          }
        }
        //End Exercise Data

        //Water Data
        let waterConsumedData = data.waterConsumed
        let waterConsumedToday = 0
        for (let i = 0; i < waterConsumedData.length; i++){
  
          let time = waterConsumedData[i].date
          let formattedDate = new Date(time.seconds * 1000 + time.nanoseconds/1000000)
          if (formattedDate.toDateString() == new Date().toDateString()){
            waterConsumedToday += waterConsumedData[i].amount
          }
        }
        setWater(waterConsumedToday)
        //End Water Data

        console.log(exerciseToday, 'ExerciseToday')
        setExercise(Math.floor(exerciseToday/60))
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
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 95}} >
      
      <LinearGradient
        colors={['#6542F460', 'transparent']}
        style={styles.linearGradient}
        start={[0.5, 0]}
        end={[0.5, 1]}
      ></LinearGradient>
      <StatusBar style="light" />
      <MainHeader title={''} />
      <Text style={[styles.textHeader, {marginTop: 20}]} >{Greeting}</Text>
      <Text style={styles.textHeader2} >Here's today's summary.</Text>

      {/* <Carousel
        data={[{id: 1, rate: 33},{id: 1, rate: 33}]}
        renderItem={({item, index}) => {
          return(
              <GraphCard />
          )
        }}
        sliderWidth={Dimensions.get('screen').width - 26}
        itemWidth={Dimensions.get('screen').width - 23}
       /> */}

       <GraphCard style={styles.graphCard} />
      

      <View style={styles.cardsWrap} >
        <View style={styles.cardsRow}>
          <SummaryCard color={'#FF0177'} percent={'84'} name={'Steps'} amount={2300} unit={''} />
          <SummaryCard color={'#6542F4'} percent={'90'} name={'Calories'} amount={458} unit={'kcals'} />
        </View>
        <View style={styles.cardsRow}>
          <SummaryCard color={'#A5FF01'} percent={'36'} name={'Exercise'} amount={exercise} unit={'min'} />
          <SummaryCard color={'#00D1FF'} percent={'67'} name={'Water'} amount={water} unit={'mL'} />
        </View>
      </View>
      

    </ScrollView>
  )
}

export default Summary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: -10,
    paddingBottom: 200,
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
  cardsWrap:{
    width: '100%',
    marginTop: 20,
    backgroundColor: '#000'
  },
  cardsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,  // You can adjust the height as per your needs
  },
  graphCard:{
    width: '94%',
    marginHorizontal: '3%',
    height: 245,
    //backgroundColor: '#1c1c1e',
    borderRadius: 20,
    marginTop: 40,
  }
})