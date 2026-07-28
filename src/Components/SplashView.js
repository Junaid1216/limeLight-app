import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { MyStyling } from '../Constants/Styling';

const SplashView = () => (
  <View style={MyStyling.splashContainer}>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    <Image source={Images.Splash} style={styles.logo} resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    width: wp(80),
    height: hp(12),
  },
});

export default SplashView;
