import React,{useEffect, useState} from 'react';
import WorkoutMap from '../../components/workoutMap';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Touchable, Alert } from 'react-native';
import Stopwatch from '../../components/stopwatch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData, FirebaseAuth, updateUserData } from '../../functions/firebaseConfig';

export default function WorkoutScreen({route, navigation}) {
    const [pauseColor, setPauseColor] = useState('#1c1c1e')
    const [isPaused, setIsPaused] = useState(false)
    const [userData, setUserData] = useState({})
    const [elapsedTime, setElapsedTime] = useState(0)
    const uid = FirebaseAuth.currentUser.uid
    const nav = useNavigation();
    const handlePause = () => {
        console.log('Toggle Pause')
        setIsPaused(!isPaused)
        if (isPaused) {
            setPauseColor('#1c1c1e')
        } else {        
            setPauseColor('#fa9325')
        }
    }
    useEffect(() => {
        const data =  fetchUserData(uid).then((data) => {
            setUserData(data)
        })}, [])

    const EndWorkoutAlert = () =>{
        Alert.alert(
            'End Workout',
            'Are you sure you want to end this workout?',
            [
            {
                text: 'Cancel',
                style: 'destructive',
            },
            {
                text: 'Yes',
                onPress: EndWorkout,
                style: 'default',
            },
            ],
            {
            cancelable: true,
            },
        );
    }
    const EndWorkout = () => {
        console.log('End Workout')
        let time = elapsedTime
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time - hours * 3600000) / 60000);
        const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);
        const total = seconds + minutes*60
        console.log(total, 'Total Seconds')
        if (minutes < 1) {
            Alert.alert('Enough data wasn\'t collected to save this workout.');
            nav.goBack();
            return;
        }
        const data = userData
        let NewData = {
            workouts: data.workouts
        }
        NewData.workouts.push({
            name: route.params.name,
            time: total,
            date: new Date,
        })
        console.log(NewData, 'New Data')
        updateUserData(uid, NewData).then(() => nav.goBack() )
        
    }

  return (
    <View style={styles.container}>
        <WorkoutMap />
        <ScrollView style={styles.wrap} contentContainerStyle={{paddingBottom: 55}} >
            <Text style={{color: 'white', fontSize: 22, fontFamily: 'SFPro', marginBottom: 10, paddingLeft: 5}} >{route.params.name}</Text>
            <View style={styles.timerCard}>
                <Stopwatch style={styles.timer} isRunning={!isPaused} setElapsedTime2={setElapsedTime} />
            </View>
            <View style={styles.rowCard}>
                <View style={[styles.card2, {backgroundColor: '#FF017730'}]}>
                    <View style={[styles.card2Top]}>
                        <View style={[styles.iconBg, {backgroundColor: '#FF017740'}]}></View>
                        <Text style={{fontFamily: 'SFPro', fontSize: 23, color: 'white', height: '100%', textAlignVertical: 'center', marginLeft: 8, marginTop: 11}} >Calories</Text>
                    </View>
                    <View style={styles.card2Btm}>
                        <Text style={{fontFamily: 'SFPro', fontSize: 34, color: 'white', height: '100%', textAlignVertical: 'center', marginLeft: 15, marginTop: 5}} >0.00</Text>
                        <Text style={{fontFamily: 'SFPro', fontSize: 22, color: '#808080', height: '100%', textAlignVertical: 'bottom', marginLeft: 4, marginTop: 2}} >kcals</Text>
                    </View>
                </View>
                <View style={[styles.card2, {backgroundColor: '#008ffc45'}]}>
                <View style={[styles.card2Top]}>
                        <View style={[styles.iconBg, {backgroundColor: '#3a64fc55'}]}></View>
                        <Text style={{fontFamily: 'SFPro', fontSize: 23, color: 'white', height: '100%', textAlignVertical: 'center', marginLeft: 8, marginTop: 11}} >Distance</Text>
                    </View>
                    <View style={styles.card2Btm}>
                        <Text style={{fontFamily: 'SFPro', fontSize: 34, color: 'white', height: '100%', textAlignVertical: 'center', marginLeft: 15, marginTop: 5}} >0.00</Text>
                        <Text style={{fontFamily: 'SFPro', fontSize: 22, color: '#808080', height: '100%', textAlignVertical: 'bottom', marginLeft: 4, marginTop: 2}} >m</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.rowCard, {height: 80}]}>
                <TouchableOpacity style={[styles.card2, {backgroundColor: '#fa2537', paddingBottom: 0}]} onPress={EndWorkoutAlert} >
                    <Ionicons style={styles.icon} name='stop-circle-outline' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card2, {backgroundColor: pauseColor, paddingBottom: 0}]} onPress={handlePause} >
                    <Ionicons style={styles.icon} name='pause-circle-outline' />
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrap:{
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  timerCard:{
    backgroundColor: '#1c1c1e',
    width: '100%',
    height: 130,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowCard:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 130,
  },
    card2:{
        backgroundColor: '#1c1c1e',
        width: '48%',
        height: '100%',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 2,
        paddingHorizontal: 4,
    },
    timer:{
        color: 'white', 
        fontFamily: 'SFProThin',
        fontSize: 88,
        transform: [{translateY: -14}]
    },
    icon:{
        color: 'white',
        fontSize: 54,
    },
    card2Top:{
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    card2Btm:{
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    iconBg:{
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#fa9325',
        marginLeft: 10,
        marginTop: 10,
    }
});
