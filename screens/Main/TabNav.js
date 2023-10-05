import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Background from '../../components/background'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Summary from './Home/Summary'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'
import Meditation from './Home/Meditation'
import Social from './social'
import WorkoutNav from './Home/WorkoutNav'

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,1)','transparent']}
      start={[0.5, 0.55]}  // Gradient starts at 70% from the top
      end={[0.5, -0.02]}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        minHeight: 80,  // Height increased to 80
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };
        let iconName = 'fitness'
        let iconNameOutline = 'fitness-outline'
        let colour = '#6542F4'

        if (route.name == 'Summary') {
           iconName = 'fitness'
           iconNameOutline = 'fitness-outline'
           colour = '#6542F4'
        }
        else if (route.name == 'Meditation') {
           iconName = 'meditation'
           iconNameOutline = 'meditation'
           colour = '#04d6d6'
        }
        else if (route.name == 'Workout') {
          iconName = 'walk'
          iconNameOutline = 'walk-outline'
          colour = '#FF0177'
       }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            { iconName == 'meditation' ? <MaterialCommunityIcons name={isFocused ? iconName : iconNameOutline } size={36} style={{marginBottom: -2}} color={isFocused ? colour : '#666'} /> : 
            <Ionicons
              name={isFocused ? iconName : iconNameOutline }
              size={30}
              color={isFocused ? colour : '#666'}
            />
          }
            <Text style={{ color: isFocused ? colour : '#666', fontFamily: 'Helvetica'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

const Tab = createBottomTabNavigator();

const TabNav = ({navigation, route}) => {

  return (
      <Tab.Navigator
      initialRouteName='Reading'
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E2AD5D',
        tabBarStyle: {
          backgroundColor: '#000',
          paddingBottom: 10,
          height: 70,
        }}}
        >
        <Tab.Screen name="Summary" component={Summary} options={{ tabBarLabel: 'Summary' }} />
        <Tab.Screen name="Meditation" component={Meditation} options={{ tabBarLabel: 'Mindfullness' }} />
        <Tab.Screen name="Workout" component={WorkoutNav} options={{ tabBarLabel: 'Workout' }} />
        {/* <Tab.Screen name="Speaking" component={SpeakingNav} options={{tabBarIcon: ({size ,color}) => <SpeakingIcon width='29' height='29' style={{marginVertical: 5}} fill={color} />}} /> */}
        {/* <Tab.Screen name="Writing" component={Writing} options={{tabBarIcon: ({size ,color}) => <WritingIcon width='29' height='29' style={{marginVertical: 5}} fill={color} />}} /> */}
      </Tab.Navigator>

  )
}

export default TabNav