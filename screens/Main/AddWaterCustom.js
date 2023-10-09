import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const AddWaterCustom = ({route,navigation}) => {
    const nav = useNavigation()
    const [waterDrank, setWaterDrank] = useState(0)
    addWaterFunc = route.params.addWater
  return (
    <View style={styles.container} >
        <View style={styles.header} >
            <TouchableOpacity onPress={() => nav.goBack()}  >
                <Ionicons name='chevron-back' style={{color: 'white', fontSize: 26}} />
            </TouchableOpacity>

        </View>
            <Text style={styles.headerText}>Enter the amount of water you drank in mL</Text>
            <View style={styles.textInputWrap} >
                {/* <Text style={styles.textLabel} >Weight:</Text> */}
                <TextInput style={[styles.textInput, {color: '#026ed4'}]} placeholder='Distance' onChangeText={(value) => setWaterDrank(parseInt(value))} cursorColor={'white'} inputMode='numeric' />
                <Text style={styles.textInputUnit} >mL</Text>
            </View>
            <TouchableOpacity style={{backgroundColor: '#026ed4', marginHorizontal: '30%', paddingVertical: 5}} onPress={() => {addWaterFunc(waterDrank); nav.goBack()}} >
                <Text style={{fontFamily: 'SFPro', color: 'white', fontSize: 21, textAlign: 'center'}} >Add Water</Text>
            </TouchableOpacity>
    </View>
  )
}

export default AddWaterCustom

const styles = StyleSheet.create({
    textInputUnit:{
        color: '#505050',
        height: '91%',
        fontSize: 17,
        textAlignVertical: 'center',
        fontFamily: 'Coolvetica',
        paddingRight: 10,
      },
      textInputWrap:{
        width: '85%',
        height: 50,
        backgroundColor: '#00000060',
        borderRadius: 10,
        borderColor: '#026ed4',
        borderStyle: 'solid',
        borderWidth: 2,
        marginVertical: 15,
        flexDirection: 'row',
        marginHorizontal: '7.5%'
      },
      textInput:{
        flex: 1,
        height: '100%',
        
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'Coolvetica',
        paddingLeft: 12,
  
      },
      textLabel:{
        fontFamily: 'Coolvetica',
        fontSize: 20,
        color: '#00D1FF',
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
      container:{
        backgroundColor: '#000',
        flex: 1
      },
      header:{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      headerText:{
        color: '#fff',
        fontFamily: 'Futura',
        fontSize: 24,
        marginLeft: 15,
        marginTop: 20
      },
})  