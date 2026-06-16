import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const Btn = props => {
  const { loading, title, onPress, style, icon } = props;

  return (
    <Pressable
      style={[styles.btn, style, loading && styles.btnDisabled]}
      onPress={onPress}
      disabled={loading}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={Colors.white} size="small" />
        ) : (
          <>
            {icon ? (
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            ) : null}
            <Text style={styles.btnText}>{title}</Text>
          </>
        )}
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
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.white,
  },
  btnDisabled: {
    opacity: 0.7,
  },
});

export default Btn;
