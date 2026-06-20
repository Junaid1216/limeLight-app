import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const ProfileSummaryCard = ({ name, roleTag, avatarUri, onAvatarPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <Pressable
          style={styles.avatar}
          onPress={onAvatarPress}
          disabled={!onAvatarPress}>
          <Image
            source={avatarUri ? { uri: avatarUri } : Images.Avatar}
            style={avatarUri ? styles.avatarPhoto : styles.avatarImage}
            resizeMode={avatarUri ? 'cover' : 'contain'}
            tintColor={avatarUri ? undefined : Colors.white}
          />
        </Pressable>
        <View style={styles.lockBadge}>
          <Icon name="camera" size={wp(3)} color={Colors.white} />
        </View>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>

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
  lockBadge: {
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
