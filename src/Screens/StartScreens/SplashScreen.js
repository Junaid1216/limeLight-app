import React, { useEffect } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../Assets';
import { Colors } from '../../Constants/Colors';
import { wp, hp } from '../../Assets/Responsive';
import { MyStyling } from '../../Constants/Styling';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Role');
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={MyStyling.splashContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <Image
        source={Images.Splash}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: wp(80),
    height: hp(12),
  },
});

export default SplashScreen;
