import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack, MainStack } from './screens/Navigators';

import { AuthProvider } from './functions/context/AuthContext';
import useFonts from './functions/useFonts';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from './functions/firebaseConfig';
import Loading from './components/Loading';

const Stack = createStackNavigator();

function AppContainer() {
  
  //const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {

    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
          
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
  }
  prepare();
  }, []);
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in");
        setIsLoggedIn(true);
      } else {
        // User is signed out
        console.log("User is signed out");
        setIsLoggedIn(false);
      }
      setLoading(false)
    })

  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);
  if (!isReady) {
    return null;
  }

   if(loading){
     return(
      <Loading />
     )
   }

  return (
    <NavigationContainer onLayout={onLayoutRootView} >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen name="Main" component={MainStack} />
            ) : (
              <Stack.Screen name="Auth" component={AuthStack} />
            )}
          </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {


  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
