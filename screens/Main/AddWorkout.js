import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddWorkout = () => {
  return (
    <View style={styles.container} >
      <Text>AddWorkout</Text>
    </View>
  )
}

export default AddWorkout

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',

    }
})