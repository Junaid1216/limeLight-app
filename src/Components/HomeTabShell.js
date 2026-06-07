import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import HomeHeaderComponent from './HomeHeaderComponent';
import { Colors } from '../Constants/Colors';
import { MyStyling } from '../Constants/Styling';

const HomeTabShell = () => (
  <View style={MyStyling.container2}>
    <View style={styles.headerArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />
      <HomeHeaderComponent />
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },
});

export default HomeTabShell;
