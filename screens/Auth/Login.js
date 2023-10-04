import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import React,{useEffect, useState, useContext} from 'react'
import Background from '../../components/background'
import { Input} from '@rneui/themed'
import Liboralogo from '../../components/assets/Liboralogo'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../functions/context/AuthContext'
import { FirebaseAuth } from '../../functions/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { isLoading } from 'expo-font'

const LoginScreen = () => {
  nav = useNavigation();
  //Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  let login = () =>{
    setLoading(true)

    try{
      signInWithEmailAndPassword(FirebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)


        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        setError(error.message.slice(10))
        // ..
      });
    } catch (e){
      console.log(e)

    } finally {
      setLoading(false)
    }
  }

  // ------------------------------
  // Remove text if keyboard is open
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardOpen(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardOpen(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  // ------------------------------
  return (
    <Background>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={[styles.logo, {width: '90%', marginTop: 0, fontSize: 85}]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
        <View style={{width: '92%', marginBottom: 50}}>
            <Input
              placeholder="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#FF0177' }}
              style={styles.input}
              onChangeText={(value) => {setEmail(value);}}
              inputContainerStyle={{borderColor: 'transparent',backgroundColor: '#000', borderRadius: 7,borderBottomWidth: 2.5, borderWidth: 2.4, borderColor: '#FF0177', paddingLeft: 15, color: '#fff' }}
              containerStyle={{}}
            />
          <Input
            secureTextEntry={true}
            placeholder="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock', color: '#FFF500' }}
            style={styles.input}
            onChangeText={(value) => {setPassword(value);}}
            inputContainerStyle={{borderColor: 'transparent',backgroundColor: '#000', borderRadius: 7, borderBottomWidth: 2.5, borderWidth: 2.4, borderColor: '#FFF500', paddingLeft: 15 }}
            containerStyle={{}}
          />
        </View>

        <TouchableOpacity onPress={login}  style={{ borderColor: !isLoading ? '#808080' : '#000', borderWidth: 1, backgroundColor: !isLoading ? '#808080' : '#6542F4', borderRadius: 7, width: '54%', height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}  >
                { !isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (<></>) }
                <Text style={{color: '#fff', fontSize: 22, textAlign: 'center'}}> Login </Text>
        </TouchableOpacity>

        <Text style={{fontSize: 20, color: 'red', marginTop: 16, fontFamily: 'Futura'}}> { error } </Text>

        
      </View>
      <TouchableOpacity style={{position: 'absolute', bottom: 42.5, width: '100%', opacity: 1 }} onPress={()=> nav.navigate('Register')}>
        { keyboardOpen ? null :
        <Text style={{color: '#fff', width: '100%', textAlign: 'center', fontSize: 17}}>
        Dont have an account?{"\n"} Click here to <Text style={{fontWeight: 'bold', color: '#FFF500', fontSize: 17}}>Register</Text>!
        </Text>
        }
      </TouchableOpacity>
    </Background>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

  input: {
    marginLeft: 8,
    color: 'white'
  },
  logo:{
    color: '#fff',
    fontSize: 64,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 90,
    fontFamily: 'Coolvetica',
    
  },

})