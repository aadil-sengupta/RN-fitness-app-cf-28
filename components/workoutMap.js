import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


const WorkoutMap = () => {
    const [location, setLocation] = useState(null);
    const [trail, setTrail] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);

    const darkMapStyle = [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
        }
    ];
    

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation({
                    latitude: 20.5937,
                    longitude: 78.9629,  // India's latitude and longitude
                });
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation(currentLocation.coords);
            setLoading(false);

            let locationWatcher = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10,
                },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    setLocation({
                        latitude,
                        longitude,
                    });
                    setTrail((prevTrail) => [...prevTrail, { latitude, longitude }]);
                }
            );

            return () => {
                if (locationWatcher) {
                    locationWatcher.remove();
                }
            };
        })();
    }, []);

    const goToCurrentLocation = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    };


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF0177" />
                <Text style={{color: 'white', marginTop: 7}} >Loading Map...</Text>
            </View>
        );
    }

    if (!location) return null;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                customMapStyle={darkMapStyle}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker 
                        coordinate={location}
                        // Replace with your icon
                        image={require('../assets/mapMarker.png')}
                    />
                )}
                <Polyline coordinates={trail} strokeColor="red" strokeWidth={2} />
            </MapView>

            <TouchableOpacity onPress={goToCurrentLocation} style={styles.mapLocateBtn} >
                    <Ionicons name='navigate-circle-outline' style={{fontSize: 28, color: '#FF0177'}} />
            </TouchableOpacity>
            <LinearGradient
        colors={['transparent', 'transparent', '#000']}
        style={styles.linearGradient}
        start={[0.5, 0]}
        end={[0.5, 1]}></LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 460,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 460,
    },
    mapLocateBtn:{
        position: 'absolute',
        bottom: 17,
        right: 17,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        padding: 7,
        elevation: 10,
        zIndex: 10,
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 360,
        height: 100,
        zIndex: 1,
        },
    loadingContainer: {
            //flex: 1,
            height: 460,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
    },
        
});

export default WorkoutMap;
