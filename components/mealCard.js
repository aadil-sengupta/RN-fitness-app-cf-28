import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const MealCard = ({amount=250}) => {
  return (
    <View style={styles.container} >
        <View style={{width: '100%', height: 30}} >
          <Text style={styles.amount} >{amount}</Text>
          <Text style={styles.unit} >kcals</Text>
        </View>
        <Text style={[styles.amount, {marginTop: 22, fontSize: 17}]} >Food</Text>
        <Ionicons style={styles.water} name='fast-food' />
    </View>
  )
}

export default MealCard

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 5,
        height: '100%',
        borderRadius: 17,
        backgroundColor: '#1c1c1e',
        //backgroundColor: '#1D87F1',
        paddingTop: 12,
        paddingHorizontal: 11,
    },
    amount:{
        color: 'white',
        fontSize: 21,
        fontFamily: 'SFPro',
        marginTop: -10,
    },
    unit:{
        color: '#808080',
        fontSize: 13,
        fontFamily: 'SFPro',
        marginTop: -12,
    },
    water:{
        fontSize: 40,
        color: '#f7542f90',
        position: 'absolute',
        right: 10,
        top: 8,
    }
})