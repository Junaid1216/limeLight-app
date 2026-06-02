import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const ProfileSectionHeader = props => (
  <View style={styles.row}>
    <Text style={styles.title} numberOfLines={1}>
      {props?.title}
    </Text>
    {props?.showReadOnly ? (
      <View style={styles.readOnlyRow}>
        <Icon name="lock" size={wp(3.2)} color={Colors.coolGrey} />
        <Text style={styles.readOnlyText} numberOfLines={1}>
          {Strings.readOnly}
        </Text>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
    marginTop: hp(0.5),
  },
  title: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs,
    color: Colors.coolGrey,
    letterSpacing: 0.6,
  },
  readOnlyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  readOnlyText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs,
    color: Colors.coolGrey,
  },
});

export default ProfileSectionHeader;
