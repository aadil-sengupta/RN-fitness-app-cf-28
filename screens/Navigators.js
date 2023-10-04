import { View, Text } from 'react-native'
import React from 'react'
import Welcome from './Auth/Welcome';
import LoginScreen from './Auth/Login';
import RegisterScreen from './Auth/register';
import DrawerNav from './Main/DrawerNav';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './Onboarding';
import Breathe from './Main/Mindfullness/breathe';
import Reflect from './Main/Mindfullness/reflect';
import LogMind from './Main/Mindfullness/logMind';
const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export const MainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          
          <Stack.Screen name="DrawerNav" component={DrawerNav} />
          <Stack.Screen name="Onboarding" component={Onboarding} />

          <Stack.Screen name="Breathe" component={Breathe} />
          <Stack.Screen name="Reflect" component={Reflect} />
          <Stack.Screen name="LogMind" component={LogMind} />
        {/*<Stack.Screen name="BookView" component={BookView} /> */}
        {/* Reading End */}
      </Stack.Navigator>
    )
  }