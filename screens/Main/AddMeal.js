import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainHeader } from '../../components/misc/header'

const AddMeal = () => {
  return (
    <View style={styles.container} >
      <MainHeader title={<Text style={{color: 'white', fontFamily: 'SFPro', fontSize: 20}} >Add Meal</Text>} />
      <Text>Water</Text>
    </View>
  )
}

export default AddMeal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        

    }
})