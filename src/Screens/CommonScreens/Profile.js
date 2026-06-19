import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ProfileChangePasswordCard from '../../Components/ProfileChangePasswordCard';
import ProfileInformationCard from '../../Components/ProfileInformationCard';
import ProfileSummaryCard from '../../Components/ProfileSummaryCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { getProfileInfo, mapProfileData } from '../../Constants/roleConfig';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';
import {
  UPDATE_USER_FIELD,
  USER_DATA,
} from '../../Redux/Slices/AuthSlice';
import Api from '../../Services/Api_services';

const Profile = () => {
  const dispatch = useDispatch();
  const { role } = useRole();
  const userData = useSelector(state => state?.AUTH?.userData);

  const [profile, setProfile] = useState(
    () => userData || getProfileInfo(role),
  );
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getProfileData = async () => {
        setIsLoading(true);

        try {
          const res = await Api.getProfile();
          if (!isActive) {
            return;
          }

          console.log(
            'Get Profile Response:',
            JSON.stringify(res?.data, null, 2),
          );

          if (res?.status == 200) {
            const data = res?.data?.data || {};
            const profileData = mapProfileData(data, role);

            console.log('Get Profile Data:', JSON.stringify(data, null, 2));
            console.log(
              'Get Profile Mapped:',
              JSON.stringify(profileData, null, 2),
            );

            setProfile(profileData);
            dispatch(USER_DATA(profileData));
            console.log('userData', profileData);
            Toast.show(res?.data?.message, Toast.LONG);
          } else {
            Toast.show(res?.data?.message, Toast.LONG);
            const fallback = getProfileInfo(role);
            setProfile(fallback);
          }
        } catch (error) {
          if (!isActive) {
            return;
          }
          console.log('Get Profile API Error:', error?.response?.data || error);
          Toast.show(error?.response?.data?.message, Toast.LONG);
          setProfile(prev => prev || getProfileInfo(role));
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      getProfileData();

      return () => {
        isActive = false;
      };
    }, [role, dispatch]),
  );

  const handleFieldChange = (field, value) => {
    if (field === 'name') {
      return;
    }

    setProfile(prev => ({ ...prev, [field]: value }));
    dispatch(UPDATE_USER_FIELD({ field, value }));
  };

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerWrap}>
        <MainHeaderComponent
          title={Strings.profileHeader}
          notificationCount={5}
        />
      </View>

      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={Colors.green} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ProfileSummaryCard
            name={profile.name}
            roleTag={profile.roleTag}
          />
          <ProfileInformationCard
            branchLabel={profile.branchLabel}
            name={profile.name}
            branchValue={profile.branchValue}
            roleValue={profile.roleValue}
            designation={profile.designation}
            onFieldChange={handleFieldChange}
          />
          <ProfileChangePasswordCard />
        </ScrollView>
      )}
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
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
