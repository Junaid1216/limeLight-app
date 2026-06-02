import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import ProfileSectionHeader from './ProfileSectionHeader';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const ProfileChangePasswordCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <ProfileSectionHeader title={Strings.accountSettings} />

      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <Image
              source={Images.ChangePassword}
              style={styles.iconImage}
              resizeMode="contain"
              tintColor={Colors.branchGreen}
            />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>
              {Strings.changePassword}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {Strings.changePasswordSubtitle}
            </Text>
          </View>
        </View>
        <View style={styles.chevronCircle}>
          <Icon
            name="chevron-right"
            size={wp(4.5)}
            color={Colors.slateGrey}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: wp(90),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.lightPeriwinkle,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.85,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp(2),
  },
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.cloudGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: wp(5),
    height: wp(5),
  },
  textWrap: {
    marginLeft: wp(3),
    flex: 1,
  },
  title: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs2,
    color: Colors.black,
    marginBottom: hp(0.25),
  },
  subtitle: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.s,
    color: Colors.coolGrey,
  },
  chevronCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: Colors.cloudGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileChangePasswordCard;
