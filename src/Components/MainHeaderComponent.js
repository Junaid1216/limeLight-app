import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { navigateToNotification } from '../Navigations/navigationHelpers';

const MainHeaderComponent = props => {
  const navigation = useNavigation();
  const count = props.notificationCount || 0;
  const showNotification = props.notificationCount != null;

  return (
    <View style={[styles.header, props.style]}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={Images.LeftArrow}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {props?.title}
      </Text>

      {showNotification ? (
        <TouchableOpacity
          style={styles.notification}
          onPress={() => navigateToNotification(navigation)}
        >
          <Image
            source={Images.NotificationBell}
            resizeMode="contain"
            style={styles.bellIcon}
          />
          {count > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  backBtn: {
    width: wp(7),
    height: wp(7),
    backgroundColor: Colors.green,
    borderRadius: wp(2.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: wp(2),
    height: hp(4),
    tintColor: Colors.white,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  notification: {
    width: wp(6.5),
    height: wp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    width: wp(6.5),
    height: wp(6.5),
  },
  badge: {
    position: 'absolute',
    top: -hp(0.6),
    right: -wp(0.1),
    backgroundColor: Colors.red,
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2.25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsSemiBold,
  },
  placeholder: {
    width: wp(6.5),
    height: wp(6.5),
  },
});

export default MainHeaderComponent;
