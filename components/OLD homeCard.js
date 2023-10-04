import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {BlurView} from 'expo-blur'

const HomeCard = ({width, height, start, end, colors, locations, icon, text, value, iconShift}) => {
  return (
    
    <LinearGradient
        // Approximation of Radial Gradient
    
        start={start}
        end={end}
        colors={colors}
        locations={locations}

        style={[styles.container, {width: width, height: height}]}
      >
        <Text style={styles.text} >{text}</Text>
        <Text style={styles.value} >{value}</Text>

        <BlurView intensity={70} style={StyleSheet.absoluteFillObject}>
            <Image 
            source={(icon)}  // Replace with actual path
            style={[styles.icon, {right: iconShift}]} 
            />
      </BlurView>    
    </LinearGradient>
    
  )
}

export default HomeCard

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        borderRadius: 10,
        borderColor: 'red',
        elevation: 40,
        overflow: 'hidden',
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        opacity: 0.71,
        width: '60%',
        height: undefined,
        right: 0,
        top: 7,
        bottom: -6,
        transform: [{rotate: '12deg'}]
    },
    text:{
        position: 'absolute',
        top: 0,
        left: 5,
        color: 'white',
        fontSize: 30,
        opacity: .7,
        zIndex: 99,
        fontFamily: 'Supertalls',
        
        textTransform: 'uppercase'
    },
    value:{
        position: 'absolute',
        bottom: 0,
        left: 5,
        color: 'white',
        fontSize: 30,
        opacity: .9,
        zIndex: 99,
        fontFamily: 'Supertalls',
        
        textTransform: 'uppercase'
    }
})