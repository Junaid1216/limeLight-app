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
import { Images } from '../../Assets';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { getRoleDisplayLabel } from '../../Constants/roleConfig';
import { Strings } from '../../Constants/Strings';
import { useRole } from '../../Context/RoleContext';
import Api, { setAuthToken } from '../../Services/Api_services';
import Toast from 'react-native-simple-toast';

const DRAWER_BOTTOM_ROUTE = 'BottomNavigation';

const ASMDrawerContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { role, setRole } = useRole();

  const goToTabScreen = (screenName, params) => {
    navigation.navigate(DRAWER_BOTTOM_ROUTE, { screen: screenName, params });
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

  const goToProfile = () => {
    navigation.closeDrawer();
    navigation.getParent()?.navigate('Profile');
  };

  const goToAppScreen = screenName => {
    navigation.closeDrawer();
    navigation.getParent()?.navigate(screenName);
  };

  const handleLogout = async () => {
    navigation.closeDrawer();

    try {
      const res = await Api.logout();
      console.log('Logout Response:', JSON.stringify(res?.data, null, 2));

      if (res?.status == 200) {
        console.log('Logout Success:', JSON.stringify(res?.data, null, 2));
        Toast.show(res?.data?.message, Toast.LONG);
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log('Logout API Error:', error?.response?.data || error);
      Toast.show(error?.response?.data?.message, Toast.LONG);
    }

    setAuthToken(null);
    setRole(null);
    navigation.getParent()?.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Role' }],
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + hp(2) }]}>
      <Pressable
        style={({ pressed }) => [
          styles.profileSection,
          pressed && styles.menuItemPressed,
        ]}
        onPress={goToProfile}
      >
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
        showsVerticalScrollIndicator={false}
      >
        <MenuItem
          iconName="globe"
          label={Strings.regionComparison}
          onPress={() => goToDrawerScreen('RegionComparison')}
        />
        <MenuItem
          iconName="trending-up"
          label={Strings.salesStaffPerformance}
          onPress={() => goToAppScreen('BranchStaffComparison')}
        />
        <MenuItem
          iconName="crosshair"
          label={Strings.branchTargets}
          onPress={() => goToAppScreen('BranchTargets')}
        />
        <MenuItem
          iconName="headphones"
          label={Strings.customerServiceTraining}
          onPress={() =>
            goToTabScreen('Training', { tab: 'Customer', ts: Date.now() })
          }
        />
        <MenuItem
          iconName="package"
          label={Strings.productTraining}
          onPress={() =>
            goToTabScreen('Training', { tab: 'Product', ts: Date.now() })
          }
        />
        <MenuItem
          iconName="grid"
          label={Strings.displayTraining}
          onPress={() =>
            goToTabScreen('Training', { tab: 'Display', ts: Date.now() })
          }
        />
        <MenuItem
          imageSource={Images.MegaAssignment}
          label={Strings.announcements}
          onPress={goToAnnouncement}
        />
        <MenuItem
          iconName="message-square"
          label={Strings.feedback}
          onPress={() => goToTabScreen('FeedBack')}
        />
        <MenuItem
          imageSource={Images.Note}
          label={Strings.surveys}
          onPress={() => goToTabScreen('Survey', { screen: 'SurveyMain' })}
        />
        <MenuItem
          iconName="file-text"
          label={Strings.SurveyReport}
          onPress={() => goToTabScreen('Survey', { screen: 'SurveyReport' })}
        />

        <View style={styles.logoutDivider} />
        <MenuItem
          iconName="log-out"
          label={Strings.logout}
          onPress={handleLogout}
          danger
        />
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ label, onPress, iconName, imageSource, danger }) => (
  <Pressable
    style={({ pressed }) => [
      styles.menuItem,
      pressed && styles.menuItemPressed,
    ]}
    onPress={onPress}
  >
    {iconName ? (
      <Icon
        name={iconName}
        size={wp(5)}
        color={danger ? Colors.brightRed : Colors.slateGrey}
      />
    ) : (
      <Image
        source={imageSource}
        style={styles.menuIcon}
        resizeMode="contain"
      />
    )}
    <Text
      style={[styles.menuLabel, danger && styles.menuLabelDanger]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </Pressable>
);

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
    fontSize: Fontsize.xs3,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
  menuLabelDanger: {
    color: Colors.brightRed,
  },
  logoutDivider: {
    height: hp(0.15),
    backgroundColor: Colors.lightGrey,
    marginVertical: hp(1),
  },
});

export default ASMDrawerContent;
