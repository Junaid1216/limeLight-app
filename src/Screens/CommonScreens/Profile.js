import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ProfileChangePasswordCard from '../../Components/ProfileChangePasswordCard';
import ProfileInformationCard from '../../Components/ProfileInformationCard';
import ProfileSummaryCard from '../../Components/ProfileSummaryCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const NOTIFICATION_COUNT = 5;

const Profile = () => {
  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerWrap}>
        <MainHeaderComponent
          title={Strings.profileHeader}
          notificationCount={NOTIFICATION_COUNT}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <ProfileSummaryCard />
        <ProfileInformationCard />
        <ProfileChangePasswordCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(4),
  },
});

export default Profile;
