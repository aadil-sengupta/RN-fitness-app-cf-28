import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Liboralogo from '../assets/Liboralogo';


export const MainHeader = ({title, type}) => {
  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (type == 'back' ){
      navigation.goBack();
    }
    else{
      navigation.toggleDrawer();
    }
  };

  return (
    <View style={[styles.container, {marginTop: Platform.OS === 'ios' ? 0 : insets.top-4 }]}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name={type == 'back' ? 'chevron-back' : "menu-outline"} style={{fontSize: 30, color: 'white', marginLeft: -8}} />
      </TouchableOpacity>
      {title == undefined ? <LiboraLogo width={80} /> : title }
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? -8: 0 
  },
  backButton: {
    position: 'absolute',
    left: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


