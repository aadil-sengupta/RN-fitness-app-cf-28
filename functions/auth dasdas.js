import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const createTwoButtonAlert = () =>
    Alert.alert('Are you sure you want to logout?', 'You will be logged out and will have to log back in to retrieve your data.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes',
      style: 'destructive',
       onPress: () => console.log('OK Pressed')},
    ]);

export const Login = async (id) => {
    // Login (Server Request Get JWT)
    await SecureStore.setItemAsync("jwt", id);
}

export const Logout = async () => {
    //createTwoButtonAlert();
    SecureStore.deleteItemAsync("jwt")
    console.log("\n \n Logged Out (function) \n \n");
}

export const Check = async () =>{
    const jwt = await SecureStore.getItemAsync("jwt");
    if (jwt) {
        return true;
    } else {
        return false;
    }
}