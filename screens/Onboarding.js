import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Platform, TouchableHighlight, Button, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
//import { Button } from '@rneui/themed';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackgroundAnimation from '../components/backgroundAnimated';
import { BlurView } from 'expo-blur';
import Card from '../components/cards';
import { updateUserData, FirebaseAuth } from '../functions/firebaseConfig';

const Onboarding = () => {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');
    
    //Form States
    const [Weight, setWeight] = useState('');
    const [Height, setHeight] = useState('');
    const [Gender, setGender] = useState('');
    const [Loading, setLoading] = useState(false);

    const Scroll = useRef()
    const setSliderPage = (event) => {
      const { currentPage } = sliderState;
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor(x / (width-1));
      if (indexOfNextScreen !== currentPage) {
        setSliderState({
          ...sliderState,
          currentPage: indexOfNextScreen,
        });
      }
    };
  
    const { currentPage } = sliderState;
    const pageIndex = Math.round(currentPage);
    
    //push weight, height and gender to firestore

    let pushData = () =>{
      setLoading(true)
  
      try{
        const user = FirebaseAuth.currentUser;
        console.log(user)
        let data = {
          weight: Weight,
          height: Height,
          gender: Gender
        }
        updateUserData(user.uid, data)
    } catch (e){
        console.log(e)
  
      } finally {
        setLoading(false)
      }
    }
    const nav = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
        {/* <BackgroundAnimation></BackgroundAnimation> */}
    <ScrollView
      ref={Scroll}
      style={{ flex: 1 }}
      horizontal={true}
      scrollEventThrottle={16}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onScroll={(event) => {
        setSliderPage(event);
      }}
    >
      <View style={{ width, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[styles.btmText, {width: '90%'}]}>Welcome To <Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
      </View>
      <View style={[{ height: '100%', width}, styles.slide]}>
        <View style={[styles.slideContainer, {borderColor: '#FF0177'}]}>
        <Text style={styles.QuesText}>Tell us about <Text style={{color: '#6542F4'}} >yourself!</Text></Text>
        <View style={{width: '75%'}}>
            <View style={styles.textInputWrap} >
                <Text style={styles.textLabel} >Weight:</Text>
                <TextInput style={[styles.textInput, {color: '#FFF500',}]} onChangeText={(value) => setWeight(value)} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit} >kg</Text>
            </View>
            <View style={[styles.textInputWrap,{borderColor: '#FF0177'}]} >
                <Text style={[styles.textLabel,{color: '#FF0177', width: 85 }]} >Height:</Text>
                <TextInput style={[styles.textInput, {color: '#FF0177',}]} onChangeText={(value) => setHeight(value)} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit} >cm</Text>
            </View>
            <View style={[styles.textInputWrap,{borderColor: '#6542F4'}]} >
                <Text style={[styles.textLabel,{color: '#6542F4', width: 89 }]} >Gender:</Text>
                <Picker style={[styles.textInput, {borderRadius:12, overflow: 'hidden', transform: [{translateY: -5}], padding: 0, color: '#6542F4'}]}  selectedValue={Gender} onValueChange={(value)=>setGender(value)} mode='dropdown' prompt='Gender' >
                    <Picker.Item  label="Male" value="male" />
                    <Picker.Item label="Female" value="female"/>
                    <Picker.Item label="Prefer not to say" value="none"/>
                </Picker>
            </View>
        </View>
        </View>
      </View>

      <View style={[{ height: '100%', width}, styles.slide]}>
        <View style={[styles.slideContainer]}>
        <View style={{height: '100%'}} >
            <ScrollView >
              <Text style={[styles.QuesText, {marginTop: 55, width: '100%', textAlign: 'center'}]}>What do you wish to <Text style={{color: '#FF0177'}} >track?</Text></Text>
                <View style={styles.cardGroup}>
                    <Card text={'Water'} width={'45%'} gradColors={['rgba(0,255,255,0.8)', 'rgba(0,0,255,0.8)']} iconColor='rgba(0,255,255,0.22)' />
                    <Card text={'Calories'} width={'45%'} gradColors={['rgb(255, 50, 10)', 'rgb(255, 98, 140)']} iconColor='rgba(255, 50, 10, 0.4)' />
                </View>
                <View style={styles.cardGroup}>
                    <Card text={'Steps'} width={'45%'} gradColors={['rgb(10, 205, 50)', 'rgb(120, 225, 200)']} iconColor='rgba(10, 205, 50,0.35)' />
                    <Card text={'Sleep'} width={'45%'} gradColors={['rgba(0,255,255,0.8)', 'rgba(0,0,255,0.8)']} iconColor='rgba(15,40,255,0.3)' />
                </View>
                <View style={styles.cardGroup}>
                    <Card text={'Meditation'} width={'45%'} gradColors={['#50c2c2',  '#007575']} iconColor='#50c2c236'/>
                    <Card text={'Stand'} width={'45%'} gradColors={['rgb(108, 0, 128)', 'rgb(255, 102, 240)']} iconColor='rgba(108, 0, 128, 0.34)' />
                </View>
                <View style={styles.cardGroup}>
                  <Card text={'Stand'} width={'45%'} gradColors={['rgb(255, 165, 0)', 'rgb(255, 80, 0)']} iconColor='rgba(255, 80, 0,0.45)' />
                  <Card text={'Refect'} width={'45%'} gradColors={['rgb(255, 162, 200)', 'rgb(255, 22, 193)']} iconColor='rgba(255, 162, 200, 0.45)' />
                    
                </View>
            </ScrollView>
            </View>
        </View>
      </View>

      <View style={[{ height: '100%', width}, styles.slide]}>
        <View style={[styles.slideContainer]}>
        <View style={{height: '100%'}} >
            <ScrollView >
        <Text style={[styles.QuesText, {marginTop: 55, width: '100%', textAlign: 'center', fontSize: 66, lineHeight: 69}]}>Set your <Text style={{color: '#FFF500'}} >goals.</Text></Text>

            </ScrollView>
            </View>
        </View>
      </View>

      <View style={{ width, height: '100%', justifyContent: 'space-between', alignItems:'center'}}>
        <Text style={[styles.btmText, {width: '90%', marginTop: 240, fontSize: 100}]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
          <TouchableHighlight onPress={() => {nav.navigate('DrawerNav');pushData();}}  style={styles.btnEnd}>
              <Text style={styles.btnEndText}> Get Started! </Text>
          </TouchableHighlight>
        
      </View>
    </ScrollView>
    <View style={{flex: 0.3}}>
    <View style={styles.paginationWrapper}>
      {Array.from(Array(5).keys()).map((key, index) => (
        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
      ))}
    </View>

    </View>

  </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
      },
      header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      paragraph: {
        fontSize: 17,
      },
      paginationWrapper: {
        marginVertical: 50,
        
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      paginationDots: {
        height: 11,
        width: 11,
        borderRadius: 10 / 2,
        backgroundColor: '#fff',
        marginHorizontal: 5,
      },
      btmText:{
        color: '#fff',
        fontSize: 64,
        justifyContent: 'center',
        alignItems: 'flex-end',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: -55,
        fontFamily: 'Coolvetica',
      },
      QuesText:{
        color: '#fff',
        fontSize: 54,
        justifyContent: 'center',
        alignItems: 'flex-end',
        textAlign: 'center',
        marginTop: 6,
        
        fontFamily: 'Coolvetica',
        width: '90%',

        marginBottom: 45
      },

      slide:{
        justifyContent: 'center',
      },
      slideContainer:{
        width: '92%',
        marginHorizontal: '4%',
        marginTop: 40,
        height: '85%',

        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      textInput:{
        flex: 1,
        height: '100%',
        
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'Coolvetica',
        paddingLeft: 12,

      },
      textInputUnit:{
        color: '#505050',
        height: '91%',
        fontSize: 17,
        textAlignVertical: 'center',
        fontFamily: 'Coolvetica',
        paddingRight: 10,
      },
      textInputWrap:{
        width: '100%',
        height: 50,
        backgroundColor: '#00000060',
        borderRadius: 10,
        borderColor: '#FFF500',
        borderStyle: 'solid',
        borderWidth: 2,
        marginVertical: 10,
        flexDirection: 'row',
      },
      textLabel:{
        fontFamily: 'Coolvetica',
        fontSize: 20,
        color: '#FFF500',
        height: '94%',
        paddingLeft: 11.4,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        textAlignVertical: 'center',
        width: 91.5,
        backgroundColor: '#1c1c1e',
        letterSpacing: 1.03
      },
      cardGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        width: '100%',
        height: 120,
        marginVertical: 5,
      },
      btnEnd:{
        borderColor: '#FF0177',
        borderWidth: 2.4,
        backgroundColor: '#00000000',
        borderRadius: 7,
        justifyContent: 'center',
        marginBottom: 72
    },
    btnEndText:{
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Coolvetica',
        paddingHorizontal: 20,
        paddingVertical: 12,
        paddingBottom: 13.5,
        letterSpacing: 1.03,
        
    }
})