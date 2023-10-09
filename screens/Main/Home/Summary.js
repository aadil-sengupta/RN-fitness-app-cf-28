import { StyleSheet, Text, SafeAreaView, View, ScrollView, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import { MainHeader } from '../../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData } from '../../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { useSteps, useCalories } from '../../../functions/fitness';
import SummaryCard from '../../../components/summaryCards';
//import Carousel from 'react-native-snap-carousel'
import GraphCard from '../../../components/graphCard';
import Loading from '../../../components/Loading';
import { Accelerometer } from 'expo-sensors';

const Summary = () => {

  // Set greeting
    const [Greeting, setGreeting] = useState('Good Afternoon!')
    const uid = FirebaseAuth.currentUser.uid
    const [userData, setUserData] = useState({FirstName: '', LastName: ''})
    
    const [exercise, setExercise] = useState(0)
    const [exerciseGoal, setExerciseGoal] = useState(1000)
    const [water, setWater] = useState(0)
    const [steps, setSteps] = useState(0)
    const [stepGoal, setStepGoal] = useState(3000)
    const [calories, setCalories] = useState(0)
    const [loading, setLoading] = useState(true)
    const [graphData, setGraphData] = useState([0.6, 0, 0.4, 0.5])
    const [mealPercent, setMealPercent] = useState()
    const [meal, setMeal] = useState()
    const [mind, setMind] = useState()
    const [mindPercent, setMindPercent] = useState()

    //Shake
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [shakeDetected, setShakeDetected] = useState(false);

    useEffect(() => {
      const data =  fetchUserData(uid).then((data) => {
        setUserData(data)

        //Exercise Data
        setExerciseGoal(data.workoutGoal)
        let exerciseData = data.workouts
        let exerciseToday = 0
        for (let i =0; i < exerciseData.length; i++){
          let time = exerciseData[i].date
          let formattedDate = new Date(time.seconds * 1000 + time.nanoseconds/1000000)
          if (formattedDate.toDateString() == new Date().toDateString()){
            exerciseToday = exerciseToday + exerciseData[i].time
          }
        }
        console.log(exerciseToday, 'ExerciseToday')
        setExercise(Math.floor(exerciseToday/60))
        const ExercisePercent = Math.floor(exerciseToday*100/(data.workoutGoal*60))/100
      
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
        const WaterPercent = Math.floor(waterConsumedToday*100/data.waterGoal)/100
        setWater(waterConsumedToday)
        //End Water Data

        //Meal Data
        let mealConsumedData = data.mealConsumed
        let mealConsumedToday = 0
        for (let i = 0; i < mealConsumedData.length; i++){
  
          let time = mealConsumedData[i].date
          let formattedDate = new Date(time.seconds * 1000 + time.nanoseconds/1000000)
          if (formattedDate.toDateString() == new Date().toDateString()){
            mealConsumedToday += mealConsumedData[i].amount
          }
        }
        const MealPercent = Math.floor(mealConsumedToday*100/data.mealGoal)/100
        setMeal(mealConsumedToday)
        setMealPercent(MealPercent*100)
        //End Meal Data

        // Mindfullness
        const mindTemp =  data.reflect.length + data.breathe.length
        setMind(mindTemp)
        setMindPercent(Math.floor(mindTemp*100/data.mindGoal))
        // End Mindfullness

        // Set Steps

        // End Steps
        
        //Set Array
        let NewGraphData = [WaterPercent, 0, ExercisePercent, 0]

        for(let i = 0; i < NewGraphData.length; i++){
          if (NewGraphData[i] >= 1){
            NewGraphData[i] = 1
          } else if (NewGraphData[i] <= 0){
            NewGraphData[i] = 0
          }
        }
        setGraphData(NewGraphData)
        // End Set Array



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
        setLoading(false)
      })
    }, []);

    useEffect(() => {
      const subscription = Accelerometer.addListener(accelerometerData => {
          if (isShake(accelerometerData)) {
              handleShake();
          }
      });
  
      Accelerometer.setUpdateInterval(100);
      return () => subscription && subscription.remove();
  }, [handleShake]);

  const isShake = (accelerometerData) => {
    const { x, y, z } = accelerometerData;
    const totalForce = Math.sqrt(x*x + y*y + z*z);

    // Here, 2.5 is a threshold, typically acceleration value when shake is detected is greater than 2.5
    // You can adjust this value based on your needs.
    return totalForce > 1.5;
};

const handleShake = () => {
    console.log('Shake detected!');
    setShakeDetected(true);

    const intervalId = setInterval(() => {
      setSteps(prevCount => prevCount + 1)
  }, 900);
    
    setTimeout(() => {
        setShakeDetected(false);
        clearInterval(intervalId)
    }, 2000);
    setTimeout(() => {
      setShakeDetected(false);
  }, 1000);
};

    if (loading) {
      return (
        <Loading />
      )
    }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 95}} >
      
      <LinearGradient
        colors={['#6542F460', 'transparent']}
        style={styles.linearGradient}
        start={[0.5, 0]}
        end={[0.5, 1]}
      ></LinearGradient>
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

       <GraphCard style={styles.graphCard} graphData={graphData}  />
      

      <View style={styles.cardsWrap} >
        <View style={styles.cardsRow}>
          <SummaryCard color={'#FF0177'} percent={(graphData[3]*100).toString()} name={'Steps'} amount={steps} unit={''} icon='walk-sharp' />
          <SummaryCard color={'#6542F4'} percent={(graphData[3]*100).toString()} name={'Calories'} amount={Math.round(steps*0.04*100)/100} unit={'kcals'} icon='flame' />
        </View>
        <View style={styles.cardsRow}>
          <SummaryCard color={'#A5FF01'} percent={(graphData[2]*100).toString()} name={'Exercise'} amount={exercise} unit={'min'} icon='barbell' />
          <SummaryCard color={'#00D1FF'} percent={(graphData[0]*100).toString()} name={'Water'} amount={water} unit={'mL'} icon='water' />
        </View>
        <View style={styles.cardsRow}>
          <SummaryCard color={'#04d6d6'} percent={mindPercent.toString()} name={'Mindfullness'} amount={mind} unit={'mins'} icon='medical'/>
          <SummaryCard color={'#f7542f'} percent={mealPercent.toString()} name={'Food'} amount={meal} unit={'kcals'} icon='fast-food' />
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