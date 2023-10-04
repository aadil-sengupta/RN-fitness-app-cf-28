import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { curveNatural } from 'd3-shape';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const MindLineChart = ({ data }) => {
  const breathe = data[0];
  const reflect = data[1];
  const log = data[2];

  let breatheFreq = [0, 0, 0, 0, 0, 0, 0];
  let reflectFreq = [0, 0, 0, 0, 0, 0, 0];
  let logFreq = [0, 0, 0, 0, 0, 0, 0];
  const today = new Date().getDay();

    for (let i = 0; i < breathe.length; i++) {
        //console.log(Math.floor((new Date().getTime() - breathe[i].getTime())/(1000 * 60 * 60 * 24)))
        if (Math.floor((new Date().getTime() - breathe[i].getTime())/(1000 * 60 * 60 * 24)) > 7){
            continue;
        }

        let x = today-breathe[i].getDay()
        breatheFreq[x < 0 ? x + 7 : x ] += 1
    }
    // same for the remaining two
    for (let i = 0; i < reflect.length; i++) {
        //console.log(Math.floor((new Date().getTime() - reflect[i].getTime())/(1000 * 60 * 60 * 24)))
        if (Math.floor((new Date().getTime() - reflect[i].getTime())/(1000 * 60 * 60 * 24)) > 7){
            continue;
        }

        let x = today-reflect[i].getDay()
        reflectFreq[x < 0 ? x + 7 : x ] += 1

    }
    for (let i = 0; i < log.length; i++) {
       // console.log(Math.floor((new Date().getTime() - log[i].getTime())/(1000 * 60 * 60 * 24)))
        if (Math.floor((new Date().getTime() - log[i].getTime())/(1000 * 60 * 60 * 24)) > 7){
            continue;
        }

        let x = today-log[i].getDay()
        logFreq[x < 0 ? x + 7 : x ] += 1
    }
    let data1 = breatheFreq
    let data2 = reflectFreq
    let data3 = logFreq

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const rotatedDays = [...days.slice(today), ...days.slice(0, today)];
  
    const Gradient1 = () => (
      <Defs key="gradient1">
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#ff6900" />
          <Stop offset="100%" stopColor="#ff0000" />
        </LinearGradient>
      </Defs>
    );
  
    const Gradient2 = () => (
      <Defs key="gradient2">
        <LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#0000ff" />
          <Stop offset="100%" stopColor="#5050ff" />
        </LinearGradient>
      </Defs>
    );
  
    const Gradient3 = () => (
      <Defs key="gradient3">
        <LinearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#00fc08" />
          <Stop offset="100%" stopColor="#00ff77" />
        </LinearGradient>
      </Defs>
    );
  
    return (
      <View style={{ flexDirection: 'row', height: 300, padding: 20 }}>
        <YAxis
          data={[0, ...breatheFreq, ...reflectFreq, ...logFreq]}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fontSize: 10, fill: 'grey' }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={breatheFreq}
            svg={{ stroke: 'url(#gradient1)', strokeWidth: 3 }}
            curve={curveNatural}
            contentInset={{ top: 10, bottom: 10 }}
          >
            <Grid />
            <Gradient1 />
          </LineChart>
          <LineChart
            style={{ flex: 1 }}
            data={reflectFreq}
            svg={{ stroke: 'url(#gradient2)', strokeWidth: 3 }}
            curve={curveNatural}
            contentInset={{ top: 10, bottom: 10 }}
          >
            <Grid />
            <Gradient2 />
          </LineChart>
          <LineChart
            style={{ flex: 1 }}
            data={logFreq}
            svg={{ stroke: 'url(#gradient3)', strokeWidth: 3 }}
            curve={curveNatural}
            contentInset={{ top: 10, bottom: 10 }}
          >
            <Grid />
            <Gradient3 />
          </LineChart>
          <XAxis
            style={{ marginTop: 10 }}
            data={breatheFreq}
            formatLabel={(value, index) => rotatedDays[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        </View>
      </View>
    );
  };
  
  export default MindLineChart;
  
  const styles = StyleSheet.create({});