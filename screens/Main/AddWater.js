import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MainHeader } from '../../components/misc/header'
import { ProgressChart } from 'react-native-chart-kit'
import WaterCard from '../../components/waterCard'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import { fetchUserData, FirebaseAuth, updateUserData } from '../../functions/firebaseConfig'
import Loading from '../../components/Loading'
import { Alert } from 'react-native'

const AddWater = () => {
  const nav = useNavigation()
  const [userData, setUserData] = useState({})
  const [waterPercent, setWaterPercent] = useState(0)
  const [waterConsumed, setWaterConsumed] = useState(0)
  const [waterGoal, setWaterGoal] = useState(2500)
  const [waterPercentGraphArray, setWaterPercentGraphArray] = useState([0])
  const [loading, setLoading] = useState(true)
  const uid = FirebaseAuth.currentUser.uid

  useEffect(() => {
    const data =  fetchUserData(uid).then((data) => {
      setUserData(data)
      setWaterGoal(data.waterGoal)
      let waterConsumedData = data.waterConsumed
      let waterConsumedToday = 0
      try{
      for (let i = 0; i < waterConsumedData.length; i++){

        let time = waterConsumedData[i].date
        let formattedDate = new Date(time.seconds * 1000 + time.nanoseconds/1000000)
        if (formattedDate.toDateString() == new Date().toDateString()){
          waterConsumedToday += waterConsumedData[i].amount
        }
      }
    } catch{}
      setWaterConsumed(waterConsumedToday)
      percent = Math.floor(waterConsumedToday*100/data.waterGoal)
      setWaterPercent(percent)
      if (percent >= 100){
        percent = 1
      } else {
        percent = percent/100
      }
      setWaterPercentGraphArray([percent])
      setLoading(false)
    });

    }, [])

    const AddWaterFunc = (amount) => {
        const data = userData
        NewData = {
          waterConsumed: data.waterConsumed
        }
        NewData.waterConsumed.push({
          date: new Date,
          amount: amount
        })
        console.log(NewData, 'New Data')
        updateUserData(uid, NewData)
        let NewWaterConsumed = waterConsumed + amount
        setWaterConsumed(waterConsumed + amount)

        let NewWaterPercent =0
        if (Math.floor(NewWaterConsumed*100/data.waterGoal) >= 100){
           NewWaterPercent = 1
        } else {
           NewWaterPercent = Math.floor(NewWaterConsumed*100/data.waterGoal)/100
        }
        console.log(NewWaterConsumed)
        setWaterPercent(Math.floor(NewWaterConsumed*100/data.waterGoal))
        setWaterPercentGraphArray([NewWaterPercent])
        console.log([NewWaterPercent])

    }



    if (loading) {
      return (
        <Loading />
      )
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}} >
      <MainHeader title={<Text style={{color: 'white', fontFamily: 'SFPro', fontSize: 20}} >Add Water</Text>} />
      <View style={styles.graphWrap} > 
        <ProgressChart
            style={styles.graphCard}
            data={{labels: ["Water"], data: waterPercentGraphArray}}
            width={Dimensions.get("window").width}
            height={420}
            strokeWidth={20}
            radius={Dimensions.get("window").width/2 - 30}
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              //color: (opacity = 1, dataIndex) => {colorsArray[dataIndex] + (Math.round(opacity*100)).toString() || `rgba(26, 255, 146, ${opacity})`; console.log(colorsArray[dataIndex]+(Math.round(opacity*100)).toString())},
                color: (opacity = 1, dataIndex) => {
                    if (opacity == 0.2){
                        opacity = 0.3;
                    } else {
                        opacity = 1;
                        return  `rgba(0, 209, 255, ${opacity})`;
                    }
                    return '#00D1FF' + (Math.round(opacity*100)).toString() || `rgba(26, 255, 146, ${opacity})`;
                },
              labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2"
              }
            }}
            hideLegend={true}
            propsForLabels={{style:{fontFamily: 'Helvetica', fontSize: 12, fontWeight: 'bold', fill: 'white'}}}
          />
          <View style={styles.graphTextWrap} >
              <Text style={styles.graphText} >{waterPercent}%</Text>
              <Text style={[styles.graphText, {color: '#808080', fontSize: 30, marginTop: -30}]} >{waterConsumed} mL</Text>
          </View>
      </View>
      <View style={styles.section} >
            <Text style={styles.Header} >Add</Text>
            <View style={{width: '100%'}}>
              <View style={{flexDirection: 'row', height: 100, marginTop: 10 }}>
              <TouchableOpacity style={styles.WaterCardWrap}  onPress={() => AddWaterFunc(250)} ><WaterCard amount={250} /></TouchableOpacity>
              <TouchableOpacity style={styles.WaterCardWrap} onPress={() => AddWaterFunc(350)} ><WaterCard amount={350} /></TouchableOpacity>
              <TouchableOpacity style={styles.WaterCardWrap} onPress={() => AddWaterFunc(500)} ><WaterCard amount={500} /></TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', height: 100, marginTop: 10 }}>
              <TouchableOpacity style={styles.WaterCardWrap} onPress={() => AddWaterFunc(750)} ><WaterCard amount={750} /></TouchableOpacity>
              <TouchableOpacity style={styles.WaterCardWrap} onPress={() => AddWaterFunc(1000)} ><WaterCard amount={1000} /></TouchableOpacity>
              <TouchableOpacity style={styles.WaterCardWrap} onPress={() => nav.navigate('AddWaterCustom', {addWater: AddWaterFunc})} ><WaterCard amount={'Other'} /></TouchableOpacity>
              </View>
            </View>
      </View>
      <View style={styles.section} >
          {/* <Text style={[styles.Header, {marginTop: 20}]} >Goal</Text> */}
          <TouchableOpacity style={styles.endBtn} onPress={() => nav.navigate('WaterGoal')}>
          <Text style={styles.endBtnText} >Current Goal: {waterGoal} mL/day</Text>
          <Ionicons name='chevron-forward' style={{color: 'white', fontSize: 18}} />
          </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default AddWater

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
    },
    graphCard:{
      width: '100%',
      transform: [{translateX: 0.5}],
    },
    graphWrap:{
      position: 'relative',
    },
    graphTextWrap:{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    graphText:{
      color: '#fff',
      fontSize: 60,
      fontFamily: 'SFPro',
      marginVertical: 0,
    },
    section:{
      width: '100%',
      height: 'auto',
      minHeight: '150',
      paddingHorizontal: 5,
    },
    Header:{
      color: '#fff',
      fontFamily: 'Futura',
      fontSize: 24,
      marginTop: -10,
      marginLeft: 9,
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
      width: '85%',
      height: 50,
      backgroundColor: '#00000060',
      borderRadius: 10,
      borderColor: '#00D1FF',
      borderStyle: 'solid',
      borderWidth: 2,
      marginVertical: 40,
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
    endBtn:{
      width: '98%',
      marginHorizontal: '1%',
      height: 55,
      backgroundColor: '#1c1c1e',
      borderRadius: 15,
      marginTop: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,

    },
    endBtnText:{
      color: 'white',
      fontFamily: 'SFPro',
      fontSize: 20,
    },
    WaterCardWrap:{
      flex: 1,
    }
})