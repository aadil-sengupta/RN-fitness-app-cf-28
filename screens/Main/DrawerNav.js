import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import Background from '../../components/background'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import TabNav from './TabNav';
import Liboralogo from '../../components/assets/Liboralogo';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons';
import { FirebaseAuth } from '../../functions/firebaseConfig';
import { BlurView } from "@react-native-community/blur";
import { fetchUserData } from '../../functions/firebaseConfig';
import WaterNav from './WaterNav';
import { MainHeader } from '../../components/misc/header';
import About from './about';
import AddMeal from './AddMeal';

Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  
  function handleLogout() {

    console.log('logout');
    FirebaseAuth.signOut();  
   

  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flexDirection: 'column',justifyContent: 'space-between', height: '100%', backgroundColor: '#000'}}>
      
      <TouchableOpacity style={styles.navProfile} onPress={() => {console.log('profile'); Logout();}}>
        <View style={styles.profileWrap}>
        <Image style={styles.navProfilePic} source={require('../../assets/user.png')} />
        <View style={{marginRight: 5}}>
        <Text style={{fontFamily: 'MontserratMD', fontSize: 18, color: '#fff'}}>{props.name}</Text>
        </View>
        </View>
      </TouchableOpacity>
      <View style={{flex: 1,marginTop: 40,}}>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem style={{marginBottom: 75, backgroundColor: '#121213', borderRadius: 8, paddingLeft: 8.5}} labelStyle={{marginLeft: -20, fontSize: 20, color: 'white' }} label="Logout" icon={({focused,size}) => <Ionicons name="exit-outline" color='white' size={size} />} onPress={handleLogout} />
      <View style={{width: '100%', height: 35, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.logo]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
      </View>
      
    </DrawerContentScrollView>
  )
  }


const DrawerNav = () => {
  nav = useNavigation();

  const uid = FirebaseAuth.currentUser.uid
  const [userData, setUserData] = useState({FirstName: '', LastName: ''})

  useEffect(() => {
    fetchUserData(uid).then((data) => {
      setUserData(data)
      console.log(data, 'drawerNav')
    })

  }, []);

  return (
    <Background>
      <Drawer.Navigator
        initialRouteName={'Home'}
        screenOptions={{ 

          drawerActiveBackgroundColor: '#6542F450',
          drawerLabelStyle: {
              marginLeft: -15,
              fontSize: 18,
          },
          drawerActiveTintColor: '#FF0177',
          drawerInactiveTintColor: '#ffffff45',
          headerStyle: {
            backgroundColor: '#FFFEF7',
          },
          headerTitleAlign: 'center',
          
        }}
        drawerContent={(props) => <CustomDrawerContent name={userData.FirstName + ' ' + userData.LastName} {...props} />}
      >
        <Drawer.Screen name="Home" initialParams={{data: userData}} component={TabNav} options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="home" size={size} color={focused ? '#FF0177' : '#ffffff45'} style={{marginLeft: 5}} />
          ),
        }} />
      <Drawer.Screen name="Add Water" component={WaterNav} options={{
          headerShown: false,
          header: (props) => <MainHeader {...props} title={<Text style={{fontSize: 20, fontFamily: 'SFPro'}} >Add Water</Text> } />,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="water" size={size} color={focused ? '#FF0177' : '#ffffff45'} style={{marginLeft: 5}} />
          ),
        }} />
      <Drawer.Screen name="Add Meal" component={AddMeal} options={{
          headerShown: false,
          header: (props) => <MainHeader {...props} title={<Text style={{fontSize: 20, fontFamily: 'SFPro'}} >Add Meal</Text> } />,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="fast-food" size={size} color={focused ? '#FF0177' : '#ffffff45'} style={{marginLeft: 5}} />
          ),
        }} />
      <Drawer.Screen name="About" component={About} options={{
          headerTitle: 'About',
          header: (props) => <MainHeader {...props} title={<Text style={{fontSize: 20}} >My Class</Text> } />,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="info" size={size} color={focused ? '#FF0177' : '#ffffff45'} style={{marginLeft: 5}} />
          ),
        }} />
      {/* 
        <Drawer.Screen name="Settings" component={SettNav} options={{
          headerTitle: 'Settings',
          header: (props) => <MainHeader {...props} title={<Text style={{fontSize: 20}} >Settings</Text> } />,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="settings" size={size} color={focused ? '#D6A04D' : '#656566'} />
          ),
        }} />
        <Drawer.Screen name="Contact" component={ContactScreen} options={{
          headerTitle: 'Contact Us',
          header: (props) => <MainHeader {...props} title={<Text style={{fontSize: 20}} >Contact Us</Text> } />,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="call" size={size} color={focused ? '#D6A04D' : '#656566'} />
          ),
        }} /> */}

      </Drawer.Navigator>
    </Background>
  )
}

export default DrawerNav

const styles = StyleSheet.create({
  navProfile: {
    height: 100,
    width: '100%',
    marginBottom: 30,
    justifyContent: 'center'
  },
  navProfilePic:{
    width: 60,
    height: null,
    aspectRatio: 1,

  },
  profileWrap: {
    marginLeft: -8,
    paddingVertical: 20,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#121213',
    width: '94%',
    marginLeft: '1.2%',
    borderRadius: 8,
  },
  logo:{
    color: '#fff',
    fontSize: 45,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Coolvetica',    
    height: 50,
    marginBottom: 85,
  },

})