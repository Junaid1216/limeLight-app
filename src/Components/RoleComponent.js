import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const RoleComponent = props => {
  return (
    <Pressable
      style={[styles.card, { borderColor: props?.borderColor }]}
      onPress={props?.onPress}>
      <View
        style={[styles.iconCircle, { backgroundColor: props?.arrowBg }]}>
        <Image
          source={props.image}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.textWrap, props?.moveTextUp && styles.textWrapUp]}>
        <Text style={styles.roleTitle} numberOfLines={1}>
          {props?.title}
        </Text>
        <Text
          style={styles.roleDescription}
          numberOfLines={props?.numberofLines}>
          {props?.description}
        </Text>
      </View>
      <View
        style={[
          styles.arrowCircle,
          { backgroundColor: props?.arrowBg },
        ]}>
        <Image
          source={Images.RightArrow}
          style={[styles.arrow, { tintColor: props?.arrowColor }]}
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: wp(0.4),
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    height: wp(32),
  },
  iconCircle: {
    width: wp(23),
    height: wp(23),
    borderRadius: wp(15),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(14.7),   
    height: wp(13.6), 
  },
  textWrap: {
    flex: 1,
    marginRight: wp(2),
  },
  textWrapUp: {
    marginTop: -hp(0.8),
  },
  roleTitle: {
    fontSize: wp(4.5),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
  },
  roleDescription: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.grey,
    lineHeight: hp(2),
    width: wp(55),
  },
  arrowCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width:wp(2),
  },
});

export default RoleComponent;
