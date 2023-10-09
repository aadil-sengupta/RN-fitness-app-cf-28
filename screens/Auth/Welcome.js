import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity, Button, TouchableHighlight, Image } from 'react-native';
import React from 'react';
//import { Button } from '@rneui/themed';
import { useState, useRef } from 'react';
import Liboralogo from '../../components/assets/Liboralogo';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


const Welcome = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');
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
  

  const nav = useNavigation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
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
              <StatusBar style="light" />
          <View style={{ width, height: '100%', alignItems: 'center' }}>
          <Text style={[styles.btmText, {width: '95%', marginTop: 320, fontSize: 80}]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
           <LinearGradient
              colors={['#6542F460', 'transparent']}
              style={styles.linearGradient}
              start={[0.5, 0]}
              end={[0.5, 1]}
            >
          </LinearGradient>
          </View>
          <View style={[{ height: '100%', width}, styles.slide]}>
          <LinearGradient
              colors={['#FF503460', 'transparent']}
              style={styles.linearGradient}
              start={[0.5, 0]}
              end={[0.5, 1]}
            >
          </LinearGradient>
          <View style={styles.wrapper}>
            <Image style={[styles.creative, {width: '94%'}]}  source={require('../../assets/welc-walk.png')} />
              <Text style={[styles.header, {marginTop: 24}]}>Keep track of workouts!</Text>
            </View>
          </View>

          <View style={{ width, height }}>
            <LinearGradient
                colors={['#04d6d650', 'transparent']}
                style={styles.linearGradient}
                start={[0.5, 0]}
                end={[0.5, 1]}
              >
            </LinearGradient>
            <View style={styles.wrapper}>
              <Image style={styles.creative}  source={require('../../assets/welc-mind.png')} />
              <Text style={styles.header}>Mindfullness</Text>
            </View>
          </View>

          <View style={{ width, height }}>
          <LinearGradient
                colors={['#ff6bbf50', 'transparent']}
                style={styles.linearGradient}
                start={[0.5, 0]}
                end={[0.5, 1]}
              >
            </LinearGradient>
            <View style={styles.wrapper}>
            <Image style={[styles.creative, {width: '94%'}]}  source={require('../../assets/welc-social.png')} />
              <Text style={[styles.header, {marginTop: 24}]}>Socialize!</Text>
            </View>
          </View>
          <View style={{ width, height }}>
          <LinearGradient
                colors={['#9A92E350', 'transparent']}
                style={styles.linearGradient}
                start={[0.5, 0]}
                end={[0.5, 1]}
              >
            </LinearGradient>
            <View style={styles.wrapper}>
            <Image style={[styles.creative, {width: '88%'}]}  source={require('../../assets/welc-drink.png')} />
              <Text style={[styles.header, {marginTop: 48}]}>Track hydration levels!</Text>
            </View>
          </View>

          <View style={{ width, height: '100%', justifyContent: 'space-between', alignItems:'center'}}>
          <LinearGradient
              colors={['#6542F460', 'transparent']}
              style={styles.linearGradient}
              start={[0.5, 0]}
              end={[0.5, 1]}
            >
          </LinearGradient>
          <Text style={[styles.btmText, {width: '97%', marginTop: 240, fontSize: 90}]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
          <TouchableHighlight onPress={() => {nav.navigate('Register');}}  style={styles.btnEnd}>
              <Text style={styles.btnEndText}> Get Started! </Text>
          </TouchableHighlight>
        
          </View>
        </ScrollView>
        <View style={{flex: 0.3}}>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(6).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
          <TouchableOpacity onPress={() => Scroll.current.scrollToEnd()} style={{width: '100%'}}>
          <Text  style={{color: '#fff', fontSize: 18, width: '100%', textAlign: 'center'}} >Skip</Text>
          </TouchableOpacity> 
        </View>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontFamily: 'SFPro',
    marginBottom: 20,
    color: '#fff',
    marginTop: -20
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
    
},
slide:{
    justifyContent: 'center',
  },
linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,  // You can adjust the height as per your needs
  },
  creative:{
    height: null,
    width: '105%',
    marginTop: 115,
    aspectRatio: 1
  }
});

export default Welcome;