import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { MainHeader } from '../../components/misc/header'
import React from 'react'

const About = () => {
  return (
    <View style={styles.container} >  
      <MainHeader title={<Text style={styles.headerText} >CF 28</Text>} />
      <ScrollView style={styles.container2} contentContainerStyle={{paddingBottom: 50}} >
      <Text style={styles.title}>About HoloFit</Text>
      <Text style={styles.paragraph}>
        HoloFit emphasizes the significance of both passive fitness and mindfulness, intertwining them to create a holistic health experience. Not only does it cater to your physical needs but it also nurtures your mental well-being.
      </Text>

      <Text style={styles.subTitle}>Mindfulness Features:</Text>
      <Text style={styles.feature}>
        - Breathe: Dive into a tranquil space with our guided meditation, helping you center yourself and reduce daily stress.
      </Text>
      <Text style={styles.feature}>
        - Reflect: Dedicate moments to ponder upon your day, your thoughts, and feelings, fostering a clearer mental space.
      </Text>
      <Text style={styles.feature}>
        - Log State of Mind: A unique tool to record and track your daily emotional and mental well-being.
      </Text>

      <Text style={styles.paragraph}>
        Mindfulness is paramount because it helps enhance focus, reduces stress and anxiety, and promotes a positive mood, enabling you to live in the moment and enhancing overall quality of life.
      </Text>

      <Text style={styles.subTitle}>Fitness Features:</Text>
      <Text style={styles.feature}>
        - Comprehensive Exercise Data: HoloFit is adept at recording steps, calories, and various exercise metrics.
      </Text>
      <Text style={styles.feature}>
        - Variety of Workouts: Whether you're into cycling, running, walking, or more, HoloFit caters to a myriad of exercise preferences.
      </Text>
      <Text style={styles.feature}>
        - Stay Hydrated and Energized: Track your daily water intake in mL and monitor the calories you consume. Stay on top of your hydration and nutritional goals.
      </Text>
      <Text style={styles.feature}>
        - Engaging Workout Screens: Monitor your workout duration, distance covered, and visualize your path with our real-time map view, making your exercise sessions more interactive and informative.
      </Text>
      <Text style={styles.feature}>
        - Compete with Friends: Add friends, monitor their progress, and get a nudge of healthy competition. This system instills motivation to meet and exceed your daily fitness goals.
      </Text>
      <Text style={styles.feature}>
        - Secure and Synced: With a robust authentication system, your data remains secure. Additionally, sync your fitness data across devices seamlessly, ensuring you're always updated, wherever you go.
      </Text>

      <Text style={styles.paragraph}>
        Embrace a healthier, more aware, and active lifestyle with HoloFit.
      </Text>
    </ScrollView>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#000',
    flex: 1,
  },
  headerText:{
    fontFamily: 'SFPro',
    color: 'white',
    fontSize: 26,
    marginLeft: 20,
  },
  container2: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  feature: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
    marginBottom: 8,
  },
})