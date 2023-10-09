import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { ProgressChart } from 'react-native-chart-kit'

const GraphCard = ({style, graphData=[0.6, 0.8, 0.4, 0.5]}) => {
    const data = {
        labels: ["Water","Calories", "Exercise","Steps"], // Labels for the data points
        data: graphData // Mock data (60%, 80%, 40%, and 50%)
      };
    const colorsArray = ['#00D1FF','#6542F4', '#A5FF01','#FF0177'];

  return (
    <View style={[styles.container, style]} >
    <ProgressChart
        style={styles.graphCard}
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        strokeWidth={16}
        radius={32}
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
                    return colorsArray[dataIndex] || `rgba(26, 255, 146, ${opacity})`;
                }
                return colorsArray[dataIndex] + (Math.round(opacity*100)).toString() || `rgba(26, 255, 146, ${opacity})`;
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
        hideLegend={false}
        propsForLabels={{style:{fontFamily: 'Helvetica', fontSize: 12, fontWeight: 'bold', fill: 'white'}}}
      />
    </View>
  )
}

export default GraphCard

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    graphCard:{
        transform: [{translateX: -43}],
    }
})