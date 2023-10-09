import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Workout from './WorkoutHome'
import AddWorkout from '../AddWorkout'
import WorkoutGoal from '../WorkoutGoal'

const Stack = createStackNavigator()

const WorkoutNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="WorkoutHome" component={Workout} />
        <Stack.Screen name="AddWorkout" component={AddWorkout} />
        <Stack.Screen name="WorkoutGoal" component={WorkoutGoal} />
        {/* <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} /> */}
    </Stack.Navigator>
  )
}

export default WorkoutNav

const styles = StyleSheet.create({})