import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { DRAWER_BOTTOM_ROUTE } from '../Constants/DrawerMenu';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { getRoleDisplayLabel } from '../Constants/roleConfig';
import { Strings } from '../Constants/Strings';
import { useRole } from '../Context/RoleContext';

const CustomDrawer = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { role } = useRole();

  const goToScreen = screenName => {
    navigation.navigate(DRAWER_BOTTOM_ROUTE, { screen: screenName });
    navigation.closeDrawer();
  };

  const goToDrawerScreen = screenName => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  const goToAnnouncement = () => {
    navigation.closeDrawer();
    navigation.getParent()?.navigate('Announcement');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + hp(2) }]}>
      <Pressable
        style={({ pressed }) => [
          styles.profileSection,
          pressed && styles.menuItemPressed,
        ]}
        onPress={() => {
          navigation.closeDrawer();
          navigation.getParent()?.navigate('Profile');
        }}>
        <View style={styles.avatar}>
          <Image
            source={Images.Avatar}
            style={styles.avatarImage}
            resizeMode="contain"
            tintColor={Colors.white}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {Strings.homeUserName}
          </Text>
          <Text style={styles.userRole} numberOfLines={1}>
            {getRoleDisplayLabel(role)}
          </Text>
        </View>
      </Pressable>

      <View style={styles.profileDivider} />

      <ScrollView
        style={styles.menuScroll}
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToScreen('Training')}>
          <Icon name="headphones" size={wp(5)} color={Colors.slateGrey} />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.customerServiceTraining}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToScreen('Training')}>
          <Icon name="package" size={wp(5)} color={Colors.slateGrey} />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.productTraining}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToScreen('Training')}>
          <Icon name="grid" size={wp(5)} color={Colors.slateGrey} />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.displayTraining}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={goToAnnouncement}>
          <Image
            source={Images.MegaAssignment}
            style={styles.menuIcon}
            resizeMode="contain"
          />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.announcements}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToScreen('FeedBack')}>
          <Icon name="message-square" size={wp(5)} color={Colors.slateGrey} />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.feedback}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToDrawerScreen('StaffComparison')}>
          <Icon name="users" size={wp(5)} color={Colors.slateGrey} />
          <Text style={styles.menuLabel} numberOfLines={1}>
            Staff Comparison
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
          onPress={() => goToScreen('Survey')}>
          <Image
            source={Images.Note}
            style={styles.menuIcon}
            resizeMode="contain"
          />
          <Text style={styles.menuLabel} numberOfLines={1}>
            {Strings.surveys}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(5),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
    marginTop: hp(-0.3),
  },
  profileDivider: {
    height: hp(0.15),
    backgroundColor: Colors.lightGrey,
    marginBottom: hp(1.5),
  },
  avatar: {
    width: wp(13),
    height: hp(6.1),
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
  profileInfo: {
    marginLeft: wp(3),
    flex: 1,
  },
  userName: {
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginTop: hp(0.6),
  },
  userRole: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.grey,
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    paddingBottom: hp(3),
    marginTop: hp(-0.5),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1),
    borderRadius: wp(2),
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  menuIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.slateGrey,
  },
  menuLabel: {
    flex: 1,
    marginLeft: wp(3),
    fontSize:wp(3.5),
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
});

export default CustomDrawer;
