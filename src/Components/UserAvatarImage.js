import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { getUserAvatarUri } from '../Utils/profileImageHelpers';

const UserAvatarImage = ({
  userData,
  uri,
  iconStyle,
  photoStyle,
  fallbackTintColor = Colors.white,
}) => {
  const displayUri = uri ?? getUserAvatarUri(userData);

  if (displayUri) {
    return (
      <Image
        source={{ uri: displayUri }}
        style={[styles.photo, photoStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <Image
      source={Images.Avatar}
      style={iconStyle}
      resizeMode="contain"
      tintColor={fallbackTintColor}
    />
  );
};

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default UserAvatarImage;
