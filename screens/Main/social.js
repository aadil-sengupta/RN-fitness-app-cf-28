import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { MainHeader } from '../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData } from '../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';


const Social = () => {
  const [Greeting, setGreeting] = useState('Good Afternoon!')
  const uid = FirebaseAuth.currentUser.uid
  const [userData, setUserData] = useState({})


  useEffect(() => {
    const data =  fetchUserData(uid).then((data) => {
      setUserData(data)
      console.log(data)
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12)
        greet = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
      setGreeting(greet + ' ' + data.FirstName + '!');
    })
  }, []);


  return (
  <SafeAreaView style={styles.container} >

  <LinearGradient
    colors={['#ffea0067', 'transparent']}
    style={styles.linearGradient}
    start={[0.5, 0]}
    end={[0.5, 1]}
  >
  <StatusBar style="light" />
  <MainHeader title={''} />
    <Text style={[styles.textHeader, {marginTop: 20}]} >{Greeting}</Text>
    <Text style={styles.textHeader2} >Lets connect with friends!</Text>



  </LinearGradient>
  </SafeAreaView>
  )
}

export default Social

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: -10
  },
  textHeader:{
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 26,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  textHeader2:{
    fontFamily: 'Helvetica',
    color: '#9898A0',
    fontSize: 20,
    marginLeft: 21,

  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    },
})