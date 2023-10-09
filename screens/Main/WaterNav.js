import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WaterGoal from './WaterGoal'
import AddWater from './AddWater'
import AddWaterCustom from './AddWaterCustom'

const Stack = createStackNavigator()

const WaterNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="WaterHome" component={AddWater} />
        <Stack.Screen name="WaterGoal" component={WaterGoal} />
        <Stack.Screen name="AddWaterCustom" component={AddWaterCustom} />
    </Stack.Navigator>
  )
}

export default WaterNav

const styles = StyleSheet.create({})