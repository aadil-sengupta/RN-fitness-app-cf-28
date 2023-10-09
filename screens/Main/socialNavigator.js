import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SocialHome from './social'
import AddFriends from './addFriends';
import FriendRequests from './FriendRequests'
const Stack = createStackNavigator();


const SocialNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name='SocialHome' component={SocialHome} />
      <Stack.Screen name='AddFriends' component={AddFriends} />
      <Stack.Screen name='FriendRequests' component={FriendRequests} />
    </Stack.Navigator>
  )
}

export default SocialNav

const styles = StyleSheet.create({})