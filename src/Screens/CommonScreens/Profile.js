import React, { useCallback, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
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
import ScreenLoader from '../../Components/ScreenLoader';
import ProfileChangePasswordCard from '../../Components/ProfileChangePasswordCard';
import ProfileInformationCard from '../../Components/ProfileInformationCard';
import ProfileSummaryCard from '../../Components/ProfileSummaryCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import {
  getProfileInfo,
  mapProfileData,
  normalizeAuthUser,
} from '../../Constants/roleConfig';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';
import { USER_DATA } from '../../Redux/Slices/AuthSlice';
import Api, { getAuthToken } from '../../Services/Api_services';
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

const requestGalleryPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) {
    return true;
  }

  const result = await PermissionsAndroid.request(permission);

  return result === PermissionsAndroid.RESULTS.GRANTED;
};

const Profile = () => {
  const dispatch = useDispatch();
  const { role } = useRole();
  const userData = useSelector(state => state?.AUTH?.userData);

  const [profile, setProfile] = useState(
    () => userData || getProfileInfo(role),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [savedName, setSavedName] = useState(
    () => userData?.name || getProfileInfo(role).name,
  );

  const applyProfileData = useCallback(
    data => {
      const profileData = mapProfileData(data, role);
      const serverImage = getProfileImagePath(data);

      setProfile({
        ...profileData,
        avatarUri: getAvatarDisplayUri(serverImage),
      });
      setSavedName(profileData.name);
    },
    [role],
  );

  const handleChangeName = text => {
    setProfile(prev => ({ ...prev, name: text }));
  };

  const handleUpdateProfile = async () => {
    const nextName = String(profile?.name ?? '').trim();

    if (!nextName) {
      Toast.show('Please enter full name', Toast.LONG);
      return;
    }

    if (nextName === savedName) {
      Toast.show('No changes to update', Toast.LONG);
      return;
    }

    if (!getAuthToken()) {
      Toast.show('Please login again', Toast.LONG);
      return;
    }

    setIsUpdating(true);

    const formData = new FormData();
    formData.append('name', nextName);

    try {
      const res = await Api.updateProfile(formData);
      const resJson = res?.data;

      console.log(
        'Update Profile Backend Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (res?.status == 200) {
        console.log(
          'Update Profile Response:',
          JSON.stringify(resJson, null, 2),
        );

        const data = resJson?.data;
        if (data) {
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
          setProfile(prev => ({ ...prev, name: nextName }));
          setSavedName(nextName);
          dispatch(
            USER_DATA({
              ...normalizeAuthUser(userData),
              ...profile,
              name: nextName,
            }),
          );
        }

        Toast.show(resJson?.message || 'Profile updated', Toast.LONG);
      } else {
        console.log(
          'Update Profile Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        Toast.show(resJson?.message || 'Unable to update profile', Toast.LONG);
      }
    } catch (error) {
      console.log(
        'Update Profile API Error:',
        JSON.stringify(
          error?.response?.data ?? error?.message ?? error,
          null,
          2,
        ),
      );
      Toast.show(
        error?.response?.data?.message || 'Unable to update profile',
        Toast.LONG,
      );
    } finally {
      setIsUpdating(false);
    }
  };

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

          const resJson = res?.data;
          console.log(
            'Get Profile Backend Response:',
            JSON.stringify(resJson, null, 2),
          );

          if (res?.status == 200) {
            console.log(
              'Get Profile Response:',
              JSON.stringify(resJson, null, 2),
            );

            const data = resJson?.data || {};
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
            console.log(
              'Get Profile Error Response:',
              JSON.stringify(resJson, null, 2),
            );
            Toast.show(res?.data?.message, Toast.LONG);
            setProfile(getProfileInfo(role));
          }
        } catch (error) {
          if (!isActive) {
            return;
          }
          console.log(
            'Get Profile API Error:',
            JSON.stringify(
              error?.response?.data ?? error?.message ?? error,
              null,
              2,
            ),
          );
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

  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      Toast.show(
        'Gallery permission is required to select a photo',
        Toast.LONG,
      );
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
        includeBase64: false,
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
          setProfile(prev => ({ ...prev, avatarUri: asset.uri }));
        }
      },
    );
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
        <ScreenLoader />
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
            onChangeName={handleChangeName}
          />
          <Btn
            title={Strings.updateProfile}
            onPress={handleUpdateProfile}
            loading={isUpdating}
            style={styles.updateBtn}
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
  updateBtn: {
    marginBottom: hp(2.2),
  },
});

export default Profile;
