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
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ProfileChangePasswordCard from '../../Components/ProfileChangePasswordCard';
import ProfileInformationCard from '../../Components/ProfileInformationCard';
import ProfileSummaryCard from '../../Components/ProfileSummaryCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import {
  ROLES,
  getProfileInfo,
  mapProfileData,
  normalizeAuthUser,
} from '../../Constants/roleConfig';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';
import {
  UPDATE_USER_FIELD,
  USER_DATA,
} from '../../Redux/Slices/AuthSlice';
import Api from '../../Services/Api_services';
import Config from '../../Services/Config';

const getProfileImagePath = data =>
  data?.profile_image ?? data?.image ?? data?.avatar ?? null;

const getAvatarDisplayUri = profileImage => {
  if (!profileImage) {
    return null;
  }

  if (typeof profileImage === 'string') {
    if (
      profileImage.startsWith('file:') ||
      profileImage.startsWith('content:') ||
      profileImage.startsWith('http')
    ) {
      return profileImage;
    }

    return Config.domain + profileImage;
  }

  return profileImage.uri ?? null;
};

const Profile = () => {
  const dispatch = useDispatch();
  const { role } = useRole();
  const userData = useSelector(state => state?.AUTH?.userData);

  const [profile, setProfile] = useState(
    () => userData || getProfileInfo(role),
  );
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const applyProfileData = useCallback(
    data => {
      const profileData = mapProfileData(data, role);
      const serverImage = getProfileImagePath(data);

      setProfile({
        ...profileData,
        avatarUri: getAvatarDisplayUri(serverImage),
      });
      setProfileImage(serverImage);
    },
    [role],
  );

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
            applyProfileData(data);

            const profileData = mapProfileData(data, role);
            dispatch(
              USER_DATA({
                ...normalizeAuthUser(userData),
                ...profileData,
                avatarUri: getProfileImagePath(data),
              }),
            );
          } else {
            Toast.show(res?.data?.message, Toast.LONG);
            setProfile(getProfileInfo(role));
            setProfileImage(null);
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
    }, [role, dispatch, applyProfileData]),
  );

  const handleFieldChange = (field, value) => {
    if (field === 'name') {
      return;
    }

    setProfile(prev => ({ ...prev, [field]: value }));
    dispatch(UPDATE_USER_FIELD({ field, value }));
  };

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Toast.show(
            response.errorMessage || 'Unable to pick image',
            Toast.LONG,
          );
          return;
        }

        const asset = response.assets?.[0];

        if (asset?.uri) {
          setProfileImage(asset);
          setProfile(prev => ({ ...prev, avatarUri: asset.uri }));
        }
      },
    );
  };

  const handleUpdateProfile = async () => {
    if (isUpdating) {
      return;
    }

    if (!profile.name?.trim()) {
      Toast.show('Please enter name', Toast.LONG);
      return;
    }

    if (!profile.branchValue?.trim()) {
      Toast.show(
        role === ROLES.ASM ? 'Please enter region' : 'Please enter branch',
        Toast.LONG,
      );
      return;
    }

    if (!profile.designation?.trim()) {
      Toast.show('Please enter designation', Toast.LONG);
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append('type', role);
      formData.append('name', profile.name.trim());
      formData.append('designation', profile.designation.trim());

      if (role === ROLES.ASM) {
        formData.append('region_name', profile.branchValue.trim());
      } else {
        formData.append('branch_name', profile.branchValue.trim());
      }

      if (profileImage && typeof profileImage !== 'string') {
        formData.append('image', {
          uri: profileImage.uri,
          type: profileImage.type || 'image/jpeg',
          name: profileImage.fileName || 'profile.jpg',
        });
      }

      const res = await Api.updateProfile(formData);
      console.log(
        'Update Profile Response:',
        JSON.stringify(res?.data, null, 2),
      );

      if (res?.status == 200) {
        const data = res?.data?.data || {};
        applyProfileData(data);

        const profileData = mapProfileData(data, role);
        dispatch(
          USER_DATA({
            ...normalizeAuthUser(userData),
            ...profileData,
            avatarUri: getProfileImagePath(data),
          }),
        );

        Toast.show(
          res?.data?.message || 'Profile updated successfully',
          Toast.LONG,
        );
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log('Update Profile API Error:', error?.response?.data || error);
      Toast.show(
        error?.response?.data?.message || 'Failed to update profile',
        Toast.LONG,
      );
    } finally {
      setIsUpdating(false);
    }
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
            avatarUri={profile.avatarUri}
            onAvatarPress={handlePickImage}
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
          <Btn
            title={isUpdating ? 'Updating...' : Strings.updateProfile}
            onPress={handleUpdateProfile}
            loading={isUpdating}
            style={styles.updateBtn}
          />
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
  updateBtn: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
});

export default Profile;
