import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native'
import React,{useState,useEffect, useRef} from 'react'
import Background from '../../components/background'
import { Input, Button } from '@rneui/themed'
import Liboralogo from '../../components/assets/Liboralogo'
import { useNavigation } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import { FirebaseAuth } from '../../functions/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUserData } from '../../functions/firebaseConfig'


const RegisterScreen = () => {
  nav = useNavigation();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false);

  const pageRef1 = useRef();
  const pageRef2 = useRef();
  
  const handleNext = () => {
    pageRef1.current.setNativeProps({display: 'none'});
    pageRef2.current.setNativeProps({display: 'flex'});
  }
  const handleBack = () => {
    pageRef1.current.setNativeProps({display: 'flex'});
    pageRef2.current.setNativeProps({display: 'none'});
  }

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

  let register = () =>{
    setLoading(true)

    try{
      createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)

        //create user in firestore
        // UserInfo collection with uid
        nameSplit = name.split(' ')
        console.log(nameSplit)
        let data = {
          FirstName: nameSplit[0],
          LastName: nameSplit.slice(1).join(' '),
          birthday: date,
          email: email,
        }

        createUserData(user.uid, data)

        nav.navigate('Onboarding')
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

  return (
    <Background>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={[styles.logo, {width: '90%', marginTop: 0, fontSize: 85}]}><Text style={{color: '#FFF500'}} >Holo</Text><Text style={{color: '#FF0177'}} >Fit<Text style={{color: '#6542F4'}} >!</Text></Text></Text>
        <View ref={pageRef1} style={{width: '100%', alignItems: 'center'}} >
        <View style={{width: '92%', marginBottom: 50 }}>
            <Input
              placeholder="Full Name"
              leftIcon={{ type: 'font-awesome', name: 'user', color: '#FF0177' }}
              style={styles.input}
              onChangeText={(value) => {setName(value);}}
              inputContainerStyle={{borderColor: 'transparent',backgroundColor: '#000', borderRadius: 7,borderBottomWidth: 2.5, borderWidth: 2.4, borderColor: '#FF0177', paddingLeft: 15, color: '#fff' }}
              containerStyle={{}}
            />
        <TouchableOpacity onPress={() => setOpen(true)} >
          <Input
            placeholder="Date of Birth"
            value={date.toDateString('dd/MM/yyyy')}
            secureTextEntry={false}
            leftIcon={{ type: 'font-awesome', name: 'birthday-cake', color: '#FFF500' }}
            style={styles.input}
            onChangeText={() => {}}
            inputContainerStyle={{borderColor: 'transparent',backgroundColor: '#000', borderRadius: 7, borderBottomWidth: 2.5, borderWidth: 2.4, borderColor: '#FFF500', paddingLeft: 15 }}
            editable={false}
            containerStyle={{}}
          />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleNext()}  style={{ borderColor: '#6542F4', borderWidth: 2.5, backgroundColor: 'black', borderRadius: 7, width: '54%', height: 45, justifyContent: 'center'}}  >
                <Text style={{color: '#6542F4', fontSize: 22, textAlign: 'center', width: '100%'}}> Next </Text>
        </TouchableOpacity>
        </View>

        <View ref={pageRef2} style={{width: '100%', alignItems: 'center', display: 'none'}} >
        <View style={{width: '92%', marginBottom: 50, marginTop: 15}}>
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
        <TouchableOpacity onPress={() => register()}  style={{ borderColor: '#6542F4', borderWidth: 1, borderRadius: 7, width: '54%', height: 45, justifyContent: 'center', backgroundColor: '#6542F4'}}  >
                <Text style={{color: '#fff', fontSize: 22, textAlign: 'center', width: '100%'}}> Register </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleBack()}  style={{ marginTop: 15, borderColor: '#6542F4', borderWidth: 2, backgroundColor: '#000', borderRadius: 7, width: '54%', height: 45, justifyContent: 'center'}}  >
                <Text style={{color: '#6542F4', fontSize: 22, textAlign: 'center', width: '100%'}}> Back </Text>
        </TouchableOpacity>
        </View>

        <Text style={{fontSize: 20, color: 'red', marginTop: 16, fontFamily: 'Futura'}}> { error } </Text>

      </View>

      <TouchableOpacity style={{position: 'absolute', bottom: 42.5, width: '100%', opacity: 1 }} onPress={()=> nav.navigate('Login')}>
        {keyboardOpen ? null :
        <Text style={{color: '#fff', width: '100%', textAlign: 'center', fontSize: 17}}>
        Already have an account?{"\n"} Click here to <Text style={{fontWeight: 'bold', color: '#FFF500', fontSize: 17}}>Login!</Text>
        </Text>
        }
      </TouchableOpacity>

      <DatePicker
        title={'Date of Birth'}
        modal
        mode='date'
        open={open}
        date={date}
        value={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        onChangeText={(selectedDate) => console.log(selectedDate)}
      />
    </Background>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

  input: {
    marginLeft: 8,
    borderBottomColor: '#E2AD5D',
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