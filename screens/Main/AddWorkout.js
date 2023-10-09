import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { updateUserData, FirebaseAuth } from '../../functions/firebaseConfig'

const AddWorkout = ({route, navigation}) => {
    const nav = useNavigation()
    const [workoutType, setWorkoutType] = useState('')
    const [workoutDistance, setWorkoutDistance] = useState('')
    const [workoutCalories, setWorkoutCalories] = useState('')
    const [workoutDuration, setWorkoutDuration] = useState('')
    const [userData, setUserData] = useState({})
    const uid = FirebaseAuth.currentUser.uid 

    useEffect(() => setUserData(route.params.userData), [])

    const addWorkout = () => {
      const data = userData
      let NewData = {
          workouts: data.workouts
      }
      NewData.workouts.push({
          name: 'Manual Workout',
          time: parseInt(workoutDuration)*60,
          date: new Date,
      })
      console.log(NewData, 'New Data')
      updateUserData(uid, NewData).then(() => nav.goBack() )
    }


  return (
    <View style={styles.container} >
        <View style={styles.header} >
            <TouchableOpacity onPress={() => nav.goBack()}  >
                <Ionicons name='chevron-back' style={{color: 'white', fontSize: 26}} />
            </TouchableOpacity>

        </View>
            <Text style={styles.headerText}>Add workout manually</Text>
            <View style={{width: '100%', paddingHorizontal: '7.5%', marginVertical: 25}}>
            <View style={[styles.textInputWrap,{borderColor: '#A5FF01'}]} >
                <Text style={[styles.textLabel,{color: '#A5FF01', width: 69 }]} >Type:</Text>
                <TextInput style={[styles.textInput, {color: '#A5FF01',}]} onChangeText={(value) => setWorkoutType(value)} cursorColor={'white'} inputMode='text' />
                <Text style={styles.textInputUnit}></Text>
            </View>
            <View style={[styles.textInputWrap, {borderColor: '#026ed4'}]} >
                <Text style={[styles.textLabel, {color: '#026ed4', width: 105}]} >Distance:</Text>
                <TextInput style={[styles.textInput, {color: '#026ed4',}]} onChangeText={(value) => setWorkoutDistance(value)} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit} >km</Text>
            </View>
            <View style={[styles.textInputWrap, {borderColor: '#FF0177'}]} >
                <Text style={[styles.textLabel, {color: '#FF0177', width: 102}]} >Calories:</Text>
                <TextInput style={[styles.textInput, {color: '#FF0177',}]} onChangeText={(value) => setWorkoutCalories(value)} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit}>kcals</Text>
            </View>
            <View style={[styles.textInputWrap, {borderColor: '#FFF500'}]} >
                <Text style={[styles.textLabel, {color: '#FFF500', width: 102}]} >Duration:</Text>
                <TextInput style={[styles.textInput, {color: '#FFF500',}]} onChangeText={(value) => setWorkoutDuration(value)} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit}>mins</Text>
            </View>
        </View>

            <TouchableOpacity style={{borderColor: '#026ed4', borderWidth: 3, marginHorizontal: '22%', paddingVertical: 5, borderRadius: 12}} onPress={addWorkout} >
                <Text style={{fontFamily: 'SFPro', color: 'white', fontSize: 21, textAlign: 'center', marginHorizontal: 15}} >Add Workout</Text>
            </TouchableOpacity>
    </View>
  )
}

export default AddWorkout

const styles = StyleSheet.create({
    textInputUnit:{
        color: '#505050',
        height: '91%',
        fontSize: 17,
        textAlignVertical: 'center',
        fontFamily: 'Coolvetica',
        paddingRight: 10,
      },
      textInputWrap:{
        width: '85%',
        height: 50,
        backgroundColor: '#00000060',
        borderRadius: 10,
        borderColor: '#026ed4',
        borderStyle: 'solid',
        borderWidth: 2,
        marginVertical: 15,
        flexDirection: 'row',
        marginHorizontal: '7.5%'
      },
      textInput:{
        flex: 1,
        height: '100%',
        
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'Coolvetica',
        paddingLeft: 12,
  
      },
      textLabel:{
        fontFamily: 'Coolvetica',
        fontSize: 20,
        color: '#00D1FF',
        height: '94%',
        paddingLeft: 11.4,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        textAlignVertical: 'center',
        width: 91.5,
        backgroundColor: '#1c1c1e',
        letterSpacing: 1.03
      },
      container:{
        backgroundColor: '#000',
        flex: 1
      },
      header:{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      headerText:{
        color: '#fff',
        fontFamily: 'Futura',
        fontSize: 24,
        marginLeft: 15,
        marginTop: 20
      },
      textInput:{
        flex: 1,
        height: '100%',
        
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'Coolvetica',
        paddingLeft: 12,

      },
      textInputUnit:{
        color: '#505050',
        height: '91%',
        fontSize: 17,
        textAlignVertical: 'center',
        fontFamily: 'Coolvetica',
        paddingRight: 10,
      },
      textInputWrap:{
        width: '100%',
        height: 50,
        backgroundColor: '#00000060',
        borderRadius: 10,
        borderColor: '#FFF500',
        borderStyle: 'solid',
        borderWidth: 2,
        marginVertical: 10,
        flexDirection: 'row',
      },
      textLabel:{
        fontFamily: 'Coolvetica',
        fontSize: 20,
        color: '#FFF500',
        height: '94%',
        paddingLeft: 11.4,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        textAlignVertical: 'center',
        width: 91.5,
        backgroundColor: '#1c1c1e',
        letterSpacing: 1.03
      },

})  