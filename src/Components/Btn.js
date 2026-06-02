import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const Btn = props => {
  return (
    <Pressable style={[styles.btn, props.style]} onPress={props.onPress}>
      <View style={styles.content}>
        {props?.icon ? (
          <Image
            source={props.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        ) : null}
        <Text style={styles.btnText}>{props?.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.green,
    borderRadius: wp(3),
    height: hp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(4.5),
    height: wp(4.5),
    marginRight: wp(2),
  },
  btnText: {
    fontSize: wp(4),
    fontFamily: Fonts.poppinsMedium,
    color: Colors.white,
  },
});

export default Btn;
