import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Images } from '../Assets';
import { wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';

const DrawerMenuButton = ({ style, iconColor }) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuBtn,
        style,
        pressed && styles.menuBtnPressed,
      ]}
      onPress={openDrawer}>
      <Image
        source={Images.DrawerIcon}
        style={[styles.icon, iconColor && { tintColor: iconColor }]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    width: 36,
    height: 36,
    backgroundColor: Colors.black,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp(3.7),
    height: wp(3.7),
  },
  menuBtnPressed: {
    opacity: 0.7,
  },
});

export default DrawerMenuButton;
