import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Loading = () => {
  return (
    <View style={{backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', flex: 1}} > 
    <LottieView style={{width: 70}} source={require('../assets/loadingAnimation.json')} autoPlay loop/>
    <Text style={{fontFamily: 'SFPro', color: 'white', fontSize: 16}} >Loading...</Text>
   </View>
  )
}

export default Loading

const styles = StyleSheet.create({})