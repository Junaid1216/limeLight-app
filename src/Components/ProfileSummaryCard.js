import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Images } from '../Assets';

import { hp, wp } from '../Assets/Responsive';

import { Colors } from '../Constants/Colors';

import { Fontsize } from '../Constants/Fontsize';

import { Fonts } from '../Constants/Fonts';

const ProfileSummaryCard = ({
  name,
  roleTag,
  avatarUri,
  onAvatarPress,
  onChangeName,
  nameEditable = false,
}) => {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.avatarWrap}
        onPress={onAvatarPress}
        disabled={!onAvatarPress}
      >
        <View style={styles.avatar}>
          <Image
            source={
              avatarUri
                ? {
                    uri: avatarUri,
                  }
                : Images.Avatar
            }
            style={avatarUri ? styles.avatarPhoto : styles.avatarImage}
            resizeMode={avatarUri ? 'cover' : 'contain'}
            tintColor={avatarUri ? undefined : Colors.white}
          />
        </View>

        <View style={styles.cameraBadge}>
          <Icon name="camera" size={wp(3)} color={Colors.white} />
        </View>
      </Pressable>

      {nameEditable ? (
        <View style={styles.nameEditWrap}>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={onChangeName}
            placeholder="Full Name"
            placeholderTextColor={Colors.zinc}
            numberOfLines={1}
            textAlign="center"
          />
        </View>
      ) : (
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      )}

      <View style={styles.roleBadge}>
        <Text style={styles.roleText} numberOfLines={1}>
          {roleTag}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4),
    marginBottom: hp(2.2),
    elevation: 1.5,
  },

  avatarWrap: {
    position: 'relative',
    marginBottom: hp(1.2),
  },

  avatar: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: wp(10),
    height: wp(10),
  },

  avatarPhoto: {
    width: '100%',
    height: '100%',
  },

  cameraBadge: {
    position: 'absolute',
    right: -wp(0.8),
    bottom: wp(0.2),
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.green,
    borderWidth: wp(0.5),
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
    marginBottom: hp(0.8),
  },

  nameEditWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderBottomWidth: 1,
    borderBottomColor: Colors.green,
    maxWidth: '90%',
  },

  nameInput: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
    padding: 0,
    margin: 0,
    minWidth: wp(35),
    maxWidth: wp(55),
    textAlign: 'center',
  },

  roleBadge: {
    backgroundColor: Colors.paleMint,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.55),
    borderRadius: wp(5),
  },

  roleText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.s,
    color: Colors.green,
  },
});

export default ProfileSummaryCard;
