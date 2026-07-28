import React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import DrawerMenuButton from './DrawerMenuButton';

import { Images } from '../Assets';

import { hp, wp } from '../Assets/Responsive';

import { Colors } from '../Constants/Colors';

import { Fontsize } from '../Constants/Fontsize';

import { Fonts } from '../Constants/Fonts';

import {
  getEmployeeNameLabel,
  getHomeBranchLabel,
} from '../Constants/roleConfig';

import { useRole } from '../Context/RoleContext';

import {
  navigateToNotification,
  navigateToProfile,
} from '../Navigations/navigationHelpers';

const NOTIFICATION_COUNT = 5;

const HomeHeaderComponent = ({ userName }) => {
  const navigation = useNavigation();

  const { role } = useRole();

  return (
    <View style={styles.header}>
      <DrawerMenuButton iconColor={Colors.white} style={styles.menuBtn} />

      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={1}>
          {userName || getEmployeeNameLabel(role)}
        </Text>

        <Text style={styles.userBranch} numberOfLines={1}>
          {getHomeBranchLabel(role)}
        </Text>
      </View>

      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.notification}
          onPress={() => navigateToNotification(navigation)}
        >
          <Image
            source={Images.NotificationBell}
            resizeMode="contain"
            style={styles.bellIcon}
          />

          {NOTIFICATION_COUNT > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{NOTIFICATION_COUNT}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigateToProfile(navigation)}
        >
          <Image
            source={Images.Avatar}
            style={styles.avatarImage}
            resizeMode="contain"
            tintColor={Colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.darkNavy,
    paddingHorizontal: wp(4),
    paddingTop: hp(3),
    paddingBottom: hp(1.8),
  },

  menuBtn: {
    marginRight: wp(2.5),
    marginTop: hp(0.3),
  },

  userInfo: {
    flex: 1,
    marginRight: wp(2),
    paddingTop: hp(0.5),
  },

  userName: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.mm,
    color: Colors.white,
  },

  userBranch: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(3),
    color: Colors.ashGray,
    marginTop: hp(0.2),
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: wp(3),
  },

  notification: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.dimGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bellIcon: {
    width: wp(6),
    height: wp(7),
    tintColor: Colors.white,
  },

  badge: {
    position: 'absolute',
    top: wp(0.6),
    right: wp(2),
    backgroundColor: Colors.red,
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(1.75),
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: Colors.white,
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsSemiBold,
  },

  avatar: {
    width: wp(10),
    height: hp(5.1),
    borderRadius: wp(8),
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: wp(5),
    height: hp(2.8),
    tintColor: Colors.white,
  },
});

export default HomeHeaderComponent;
