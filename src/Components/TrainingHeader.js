import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const NOTIFICATION_COUNT = 5;

const TrainingHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={Images.LeftArrow}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Training</Text>

      <TouchableOpacity
        style={styles.bellBtn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Notification')}
      >
        <Feather name="bell" size={wp(5.5)} color={Colors.black} />
        {NOTIFICATION_COUNT > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{NOTIFICATION_COUNT}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  backBtn: {
    width: wp(9),
    height: wp(9),
    backgroundColor: Colors.green,
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: wp(2),
    height: hp(3.5),
    tintColor: Colors.white,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  bellBtn: {
    width: wp(9),
    height: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: wp(0.4),
    right: wp(0.6),
    minWidth: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsSemiBold,
  },
});

export default TrainingHeader;
