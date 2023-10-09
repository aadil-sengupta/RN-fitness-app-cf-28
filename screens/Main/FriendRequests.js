import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { fetchFriendRequests, FirebaseAuth, fetchUserData, acceptFriendRequest } from '../../functions/firebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const FriendRequests = () => {
    const [users,setUsers] = useState([]);
    const uid = FirebaseAuth.currentUser.uid

    useEffect(() => {
        const data = fetchFriendRequests(uid).then((data) => {
            setUsers(data)
            console.log(data)
        })
    }, [])
    const nav = useNavigation()
    const AcceptRequests = (sender) => {
        let receiver = uid
        console.log("Sender:", sender);  // Expected to log the UID of the sender.
        console.log("Receiver:", receiver);  // Expected to log the UID of the current user.
    
        acceptFriendRequest(sender, receiver).then( () => {
            console.log('done')
            console.log(users)
            nav.navigate('SocialHome')
        })  
    }

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <TouchableOpacity onPress={() => nav.navigate('SocialHome')}  >
                    <Ionicons name='chevron-back' style={{color: 'white', fontSize: 26}} />
                </TouchableOpacity>
                <Text style={{color: 'white', fontFamily: 'SFPro', fontSize: 20, flex: 1, textAlign: 'center', paddingRight:30}} >
                    Friend Requests
                </Text>
            </View>
            
            <FlatList
                data={users}
                contentContainerStyle={{paddingHorizontal: 7}}
                renderItem={({item}) => (
                    <View style={styles.endBtn} >
                        <Text style={styles.endBtnText} >{item.FirstName} {item.LastName}</Text>
                        <TouchableOpacity style={{padding: 5}} onPress={() => AcceptRequests(item.uid)}>
                            <Text style={styles.addText}><Ionicons name='add-circle' style={{color: '#FF0177', fontSize: 21}} /></Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
    
        </View>
      )
    }
    
    export default FriendRequests
    
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#000',
            paddingHorizontal: '1%'
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
          header:{
            height: 70,
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
          addText:{
            color: '#FF0177',
            fontFamily: 'SFPro',
            fontSize: 20,
          }
    })