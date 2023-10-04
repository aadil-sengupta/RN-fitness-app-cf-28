import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from './progressBar'

const SummaryCard = ({color, percent, name}) => {
  return (
    <View style={styles.container} >
        <View style={styles.top} >
            <View style={[styles.iconBg, {backgroundColor: color + '40'}]}  >

            </View>
        </View>
        <View style={styles.btm}>
            <Text style={styles.text} >{name}</Text>
        </View>
        <View style={styles.btm2} >
            <ProgressBar percent={percent} color={color} />
        </View>
    </View>
  )
}

export default SummaryCard

const styles = StyleSheet.create({
    container:{
        width: '46%',
        height: 170,
        backgroundColor: '#1c1c1e',
        borderRadius: 38,
        paddingVertical: 15,
        paddingTop: 9,
        paddingHorizontal: 19
    },
    top:{
        flex: 5,
        height: 70,    

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btm:{
        flex: 3,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        //backgroundColor: 'red'
    },
    btm2:{
        flex: 5,
        height: 60,
        justifyContent: 'flex-end',
        paddingBottom: 6,
        
    },
    iconBg:{
        width: 37,
        height: 37,
        borderRadius: 50,
    },
    text:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'SFPro',
        marginTop: -6,
    }
})