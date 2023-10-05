import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const Stopwatch = ({style, isRunning, setElapsedTime2}) => {
    //const [isRunning, setIsRunning] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1000);
                try{
                setElapsedTime2(prevTime => prevTime + 1000);
                } catch (e) {
                    console.log(e)
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time - hours * 3600000) / 60000);
        const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);
        
        // return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        //return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // const togglePause = () => {
    //     setIsRunning(!isRunning);
    // };

    const getElapsedTime = () => {
        return elapsedTime;
    };

    return (
        <View>
            <Text style={style} >{formatTime(elapsedTime)}</Text>
            {/* As previously mentioned, you can connect the below function to your button */}
            {/* <Button title={isRunning ? 'Pause' : 'Start'} onPress={togglePause} /> */}
        </View>
    );
};

export default Stopwatch;
