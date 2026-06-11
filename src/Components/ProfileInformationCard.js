import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Images } from '../Assets';
import ProfileInfoRow from './ProfileInfoRow';
import ProfileSectionHeader from './ProfileSectionHeader';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Strings } from '../Constants/Strings';
import { getProfileInfo } from '../Constants/roleConfig';
import { useRole } from '../Context/RoleContext';

const ProfileInformationCard = () => {
  const { role } = useRole();
  const profile = getProfileInfo(role);

  return (
    <View style={styles.section}>
      <ProfileSectionHeader
        title={Strings.profileInformation}
        showReadOnly={true}
        numberoflines={1}
        style={styles.ProfileInformationStyle}
      />

      <View style={styles.card}>
        <ProfileInfoRow
          iconSource={Images.Person}
          label={Strings.fullName}
          value={profile.name}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.BranchIcon}
          label={profile.branchLabel}
          value={profile.branchValue}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.Staff}
          label={Strings.roleLabel}
          value={profile.roleValue}
        />
        <View style={styles.divider} />
        <ProfileInfoRow
          iconSource={Images.Designation}
          label={Strings.designation}
          value={profile.designation}
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
  ProfileInformationStyle:{
    maxWidth:wp(50),
  }
});

export default ProfileInformationCard;
