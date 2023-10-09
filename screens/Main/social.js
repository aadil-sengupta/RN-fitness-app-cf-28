import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { MainHeader } from '../../components/misc/header'
import { StatusBar } from 'expo-status-bar';
import { FirebaseAuth, fetchUserData, fetchUserFriendsData } from '../../functions/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel'
import SummaryCard from '../../components/summaryCards';


const SocialHome = () => {
  const uid = FirebaseAuth.currentUser.uid
  const [userData, setUserData] = useState({})
  const [noRequests, setNoRequests] = useState(0)
  const [friendsDataCards, setFriendsDataCards] = useState([])
  
  useEffect(() => {
    const data =  fetchUserData(uid).then((data) => {
      setUserData(data)
      console.log(data)
      setNoRequests(data.friendRequests.length)
    })
    fetchUserFriendsData().then((data) => {
      console.log(data, 'Friends Data array')
      setFriendsDataCards(data)
      // let friendsDataCards = []
      // for(let i = 0; i < data.length; i++){
      //   console.log(data[i], 'Data[i]')
      // }
    })
  }, []);

  return (
  <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}} >
    <MainHeader title={<Text style={{color: 'white', fontFamily: 'SFPro', fontSize: 23}} >Friends</Text>}/>
    <View style={{width: '98%', paddingHorizontal: '1%'}} >

    <TouchableOpacity style={styles.endBtn} onPress={() => nav.navigate('AddFriends', {data: userData})}>
          <Text style={styles.endBtnText} >Add Friends</Text>
          <Ionicons name='chevron-forward' style={{color: 'white', fontSize: 18}} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.endBtn} onPress={() => nav.navigate('FriendRequests')}>
          <Text style={styles.endBtnText} >Friend Requests</Text>
          <View style={{flexDirection: 'row'}} >
          <View style={{backgroundColor: '#FF0177', borderRadius: 50, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10}} ><Text style={{color: 'white', fontSize: 16, transform: [{translateY: -2}]}} >{noRequests}</Text></View>
          <Ionicons name='chevron-forward' style={{color: 'white', fontSize: 18}} />
          </View>
    </TouchableOpacity>

    <Text style={styles.textHeader} >Friends Activity</Text>
    <Carousel
        data={friendsDataCards}
        renderItem={({item, index}) => {
          return(
            <View style={styles.cardsWrap} >
              <Text style={{fontFamily: 'SFPro', color: 'white', fontSize: 20, marginLeft: 33, marginTop: 10}} >{item.FirstName}'s progress today.</Text>
            <View style={styles.cardsRow}>
              <SummaryCard color={'#FF0177'} percent={'0'} name={'Steps'} amount={0} unit={''} icon='walk-sharp'/>
              <SummaryCard color={'#6542F4'} percent={'0'} name={'Calories'} amount={0} unit={'kcals'} icon='flame' />
            </View>
            <View style={styles.cardsRow}>
              <SummaryCard color={'#A5FF01'} percent={'0'} name={'Exercise'} amount={0} unit={'min'} icon='barbell'/>
              <SummaryCard color={'#00D1FF'} percent={'0'} name={'Water'} amount={0} unit={'mL'} icon='water'/>
            </View>
            <View style={styles.cardsRow}>
              <SummaryCard color={'#04d6d6'} percent={'0'} name={'Mindfullness'} amount={0} unit={'mins'} icon='medical'/>
              <SummaryCard color={'#f7542f'} percent={'0'} name={'Food'} amount={0} unit={'kcals'} icon='fast-food'/>
            </View>
          </View>
          )
        }}
        sliderWidth={Dimensions.get('screen').width - 0}
        itemWidth={Dimensions.get('screen').width - 0}
       />
    </View>
  </ScrollView>
  )
}

export default SocialHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: -10
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
  textHeader:{
    fontFamily: 'SFPro',
    color: 'white',
    fontSize: 26,
    marginLeft: 20,
    marginVertical: 10,
    marginTop: 20
  },
  cardsWrap:{
    width: Dimensions.get('screen').width + 26,
    transform: [{translateX: -14}],
    marginTop: 10,
    backgroundColor: '#1c1c1e'
  },
  cardsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 4,
  },
})