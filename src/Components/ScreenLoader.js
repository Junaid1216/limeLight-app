import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { hp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';

const ScreenLoader = ({ style, color = Colors.green, size = 'large' }) => (
  <View style={[styles.wrap, style]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
  },
});

export default ScreenLoader;
