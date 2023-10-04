import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// Custom component for Gradient Text
const GradientText = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <MaskedView
        style={{ height: '100%', width: '100%', justifyContent: 'flex-start' }}
        maskElement={
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={[styles.text, {fontSize: props.fontSize,}]}>
              {props.children}
            </Text>
          </View>
        }
      >
        <LinearGradient
          colors={props.gradColors}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
};

export default GradientText;

// Styles
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
