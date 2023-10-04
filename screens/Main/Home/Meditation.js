import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import { MainHeader } from '../../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData } from '../../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';
import MindLineChart from '../../../components/Graph.js';

const Meditation = () => {
  const [Greeting, setGreeting] = useState('Good Afternoon!')
  const uid = FirebaseAuth.currentUser.uid
  const [userData, setUserData] = useState({})

  const pageRef1 = useRef();
  const pageRef2 = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const pageRef3 = useRef();
  const pageRef4 = useRef();
  const buttonRef3 = useRef();
  const buttonRef4 = useRef();

  const handleNext = () => {
    pageRef1.current.setNativeProps({display: 'none'});
    pageRef2.current.setNativeProps({display: 'flex'});
    buttonRef1.current.setNativeProps({backgroundColor: 'transparent'});
    buttonRef2.current.setNativeProps({backgroundColor: '#6a696f'});
  }
  const handleBack = () => {
    pageRef1.current.setNativeProps({display: 'flex'});
    pageRef2.current.setNativeProps({display: 'none'});
    buttonRef1.current.setNativeProps({backgroundColor: '#6a696f'});
    buttonRef2.current.setNativeProps({backgroundColor: 'transparent'});
  }
  const handleNext3 = () => {
    pageRef3.current.setNativeProps({display: 'none'});
    pageRef4.current.setNativeProps({display: 'flex'});
    buttonRef3.current.setNativeProps({backgroundColor: 'transparent'});
    buttonRef4.current.setNativeProps({backgroundColor: '#6a696f'});
  }
  const handleBack4 = () => {
    pageRef3.current.setNativeProps({display: 'flex'});
    pageRef4.current.setNativeProps({display: 'none'});
    buttonRef3.current.setNativeProps({backgroundColor: '#6a696f'});
    buttonRef4.current.setNativeProps({backgroundColor: 'transparent'});
  }

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

  const exampleInput = [
  [new Date('2023-09-29'), new Date('2023-09-30'), new Date('2023-09-20')],
  [new Date('2023-09-30'), new Date('2023-09-29')],
  [new Date('2023-09-29'), new Date('2023-09-26')],
];

  const nav = useNavigation();
  return (
    
  <ScrollView contentContainerStyle={styles.container} >    
  <LinearGradient
    colors={['#04d6d650', 'transparent']}
    style={styles.linearGradient}
    start={[0.5, 0]}
    end={[0.5, 1]}
  ></LinearGradient>
  
  <StatusBar style="light" />
  <MainHeader title={''} />
    <Text style={[styles.textHeader, {marginTop: 20}]} >{Greeting}</Text>
    <Text style={styles.textHeader2} >How are you doing today?</Text>

    <View style={styles.sectionTop} >
    <TouchableOpacity onPress={() => nav.navigate('Breathe', {data: userData})}>
      <Shadow style={styles.row} containerStyle={{marginVertical: 10}} paintInside={true}  distance={0} startColor={'#04d6d620'} >
        <View style={styles.iconGroup} >
          <Ionicons name='medical-outline' style={styles.rowIcon} />
          <Text style={styles.rowText} >Breathe</Text>
        </View>
          <Text style={styles.time} >2min</Text>
      </Shadow>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate('Reflect', {data: userData})} >
      <Shadow style={styles.row} paintInside={true} containerStyle={{marginVertical: 10}} distance={0} startColor={'#04d6d620'} >
        <View style={styles.iconGroup} >
          <MaterialComunityIcons name='mirror' style={styles.rowIcon} />
          <Text style={styles.rowText} >Reflect</Text>
        </View>
          <Text style={styles.time}>3min</Text>
      </Shadow>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate('LogMind', {data: userData})}>
        <Shadow style={styles.row} paintInside={true} containerStyle={{marginVertical: 10}} distance={0} startColor={'#04d6d620'} >
          <View style={styles.iconGroup} >
          <Image source={require('../../../assets/mood.png')} style={{ width: 30, marginVertical: 14,marginHorizontal: 8, aspectRatio: 1 }} />
            <Text style={styles.rowText} >Mood</Text>
          </View>
            <Text style={styles.time} >Log </Text>
        </Shadow>
      </TouchableOpacity>
      <Text style={styles.infoText} >"Taking a moment every day to do some deep breathing can reduce stress, calm the body-mind as well as have long term health benefits." —— Deepak Chopra</Text>
    </View>
    <Text style={[styles.headerText, {marginTop: 0, fontWeight: 'normal'}]} >Activity</Text>
    <View style={styles.graphWrap} >
    <View style={styles.buttonGroupWrap}>
    <TouchableOpacity onPress={handleBack} ref={buttonRef1} style={[styles.buttonContainer, {backgroundColor: '#6a696f'}]} ><Text style={styles.buttonText}>7 Days</Text></TouchableOpacity>
    <TouchableOpacity onPress={handleNext} ref={buttonRef2} style={styles.buttonContainer} ><Text style={styles.buttonText} >30 Days</Text></TouchableOpacity>
    </View>
      <View ref={pageRef1}>
        <MindLineChart  data={exampleInput}  />
      </View>
      <View ref={pageRef2} style={{display: 'none', justifyContent: 'center', alignItems: 'center'}} >
          <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Helvetica', fontSize: 18, position: 'absolute', paddingBottom: 45}} >No data available</Text>
          <MindLineChart  data={[[],[],[]]}  />
      </View>
    </View>

    <Text style={[styles.headerText, {marginTop: 8, fontWeight: 'normal'}]} >Mood</Text>
    <View style={styles.graphWrap} >
    <View style={styles.buttonGroupWrap}>
    <TouchableOpacity onPress={handleBack4} ref={buttonRef3} style={[styles.buttonContainer, {backgroundColor: '#6a696f'}]} ><Text style={styles.buttonText}>7 Days</Text></TouchableOpacity>
    <TouchableOpacity onPress={handleNext3} ref={buttonRef4} style={styles.buttonContainer} ><Text style={styles.buttonText} >30 Days</Text></TouchableOpacity>
    </View>
      <View ref={pageRef3}>
        <MindLineChart  data={exampleInput}  />
      </View>
      <View ref={pageRef4} style={{display: 'none', justifyContent: 'center', alignItems: 'center'}} >
          <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Helvetica', fontSize: 18, position: 'absolute', paddingBottom: 45}} >No data available</Text>
          <MindLineChart  data={[[],[],[]]}  />
      </View>
    </View>
  
  </ScrollView>

  )
}

export default Meditation

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginTop: -10,
    width: '100%',
    paddingBottom: 100
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
  sectionTop:{
    width: '94%',
    marginHorizontal: '3%',
    height: 'auto',
    paddingVertical: 20,
    marginVertical: 20,
    marginBottom: 0,
    paddomgBottom: 0,
  },
  headerText:{
    color: '#fff',
    fontSize: 22,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  row:{
    width: '100%',
    minHeight: 62,
    // backgroundColor: '#1c1c1e',
    backgroundColor: 'transparent',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText:{
    color: '#04d6d6',
    fontSize: 22,
    height: '100%',
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
    marginHorizontal: 9
  },
  time:{
    color: '#04d6d6',
    fontSize: 19,
    fontFamily: 'Helvetica',
    height: '100%',
    textAlignVertical: 'center',
    marginHorizontal: 20
  },
  rowIcon:{
    color: '#04d6d6',
    fontSize: 30,
    height: '100%',
    textAlignVertical: 'center',
    marginHorizontal: 7,
  },
  iconGroup:{
    marginLeft: 12,
    height: '100%',
    flexDirection: 'row'
  },
  graphWrap:{
    width: '94%',
    marginHorizontal: '3%',
    height: 'auto',
    paddingVertical: 20,
    marginVertical: 20,
    paddomgBottom: 0,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
  },
  buttonGroupWrap:{
    width: '95%',
    marginHorizontal: '2.5%',
    borderRadius: 7,
    height: 35,
    flexDirection: 'row',
    backgroundColor: '#323137',
    marginBottom: 15
  },
  buttonContainer:{
    flex: 1,
    marginHorizontal: 3,
    marginVertical: 2.5,
    borderRadius: 6,
  },
  buttonText:{
    color:'white',
    textAlign: 'center',
    fontSize: 15,
    height: '100%',
    fontFamily: 'Futura',
    textAlignVertical: 'center',
  },
  infoText:{
    color: '#4f4f4f',
    marginHorizontal: 5,
    marginVertical: 3
  }
})