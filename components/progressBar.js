import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgressBar = ({percent='0%', color}) => {
  return (
    <View>
    <View style={styles.numContainer}><Text style={styles.percentText}>{percent}%</Text></View>
    <View style={[styles.container, {backgroundColor: color + '40'}]}>
    <View style={[styles.bar, {width: percent+'%', backgroundColor: color}]}></View>
    </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    container:{
        width: '97%',
        marginHorizontal: '1.5%',
        
        backgroundColor: 'white',
        height: 8,
        borderRadius: 10,
        overflow: 'hidden'
    },
    bar:{
        
        height: '100%',
        borderRadius: 10,

    },
    numContainer:{
        marginBottom: 10,
        height: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    percentText:{
        fontSize: 16,
        fontFamily: 'SFPro',
        marginHorizontal: 5,
        color: 'white'
    }
})