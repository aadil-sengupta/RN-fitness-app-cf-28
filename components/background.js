import { SafeAreaView, Text } from 'react-native'
import React from 'react'

const Background = (props) => {
  return (
    <SafeAreaView style={[{width: '100%', height: '100%', backgroundColor: '#000'}, props.style]}>
      {props.children}
    </SafeAreaView>
  )
}

export default Background