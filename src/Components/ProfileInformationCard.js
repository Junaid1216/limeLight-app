import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Images } from '../Assets';
import ProfileInfoRow from './ProfileInfoRow';
import ProfileSectionHeader from './ProfileSectionHeader';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Strings } from '../Constants/Strings';

const ProfileInformationCard = props => {
  return (
    <View style={styles.section}>
      <ProfileSectionHeader
        title={Strings.profileInformation}
        numberoflines={1}
        style={styles.ProfileInformationStyle}
      />

      <View style={styles.card}>
        <ProfileInfoRow
          iconSource={Images.Person}
          label={Strings.fullName}
          value={props?.name}
          editable={false}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.BranchIcon}
          label={props?.branchLabel}
          value={props?.branchValue}
          onChangeText={text => props?.onFieldChange?.('branchValue', text)}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.Staff}
          label={Strings.roleLabel}
          value={props?.roleValue}
          onChangeText={text => props?.onFieldChange?.('roleValue', text)}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.Designation}
          label={Strings.designation}
          value={props?.designation}
          onChangeText={text => props?.onFieldChange?.('designation', text)}
        />
      </View>
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
    borderWidth: wp(0.4),
    borderColor: Colors.white,
    paddingHorizontal: wp(3.5),
    marginBottom: hp(2.2),
    overflow: 'hidden',
    elevation: 0.9,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightPeriwinkle,
  },
  ProfileInformationStyle: {
    maxWidth: wp(50),
  },
});

export default ProfileInformationCard;
