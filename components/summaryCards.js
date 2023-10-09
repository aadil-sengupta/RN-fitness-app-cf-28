import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from './progressBar'
import Ionicons from 'react-native-vector-icons/Ionicons';

const SummaryCard = ({color, percent, name, amount, unit, icon='flame'}) => {
  return (
    <View style={styles.container} >
        <View style={styles.top} >
            <View style={[styles.iconBg, {backgroundColor: color + '40', alignItems: 'center', justifyContent: 'center'}]}  >
                <Ionicons style={{color: 'white', fontSize: 25}} name={icon} />
            </View>
            <View style={{transform: [{translateY: 8}]}} >
                <Text style={[styles.amount, {paddingLeft: (amount % 10 == amount) ? 10 : 0 }]}>{amount}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
        <View style={styles.btm}>
            <Text style={styles.text} >{name}</Text>
        </View>
        <View style={styles.btm2} >
            <ProgressBar percent={Math.round(percent)} color={color} />
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
        justifyContent: 'space-between',
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
        overflow: 'hidden'
        
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
    },
    amount:{
        color: 'white',
        fontSize: 25,
        fontFamily: 'SFPro',
        marginTop: -10,
    },
    unit:{
        color: '#808080',
        fontSize: 16,
        fontFamily: 'SFPro',
        marginTop: -15,
        textAlign: 'right',
        paddingRight: 1.5
    },
})