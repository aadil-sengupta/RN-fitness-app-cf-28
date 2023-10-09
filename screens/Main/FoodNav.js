import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MealGoal from './MealGoal'
import AddMeal from './AddMeal'
import AddMealCustom from './AddMealCustom'

const Stack = createStackNavigator()

const FoodNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="MealHome" component={AddMeal} />
        <Stack.Screen name="MealGoal" component={MealGoal} />
        <Stack.Screen name="AddMealCustom" component={AddMealCustom} />
    </Stack.Navigator>
  )
}

export default FoodNav

const styles = StyleSheet.create({})