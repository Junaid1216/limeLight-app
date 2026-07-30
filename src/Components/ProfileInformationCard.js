import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Images } from '../Assets';

import { hp, wp } from '../Assets/Responsive';

import { Colors } from '../Constants/Colors';

import { Strings } from '../Constants/Strings';

import ProfileInfoRow from './ProfileInfoRow';

import ProfileSectionHeader from './ProfileSectionHeader';

const ProfileInformationCard = props => {
  return (
    <View style={styles.section}>
      <ProfileSectionHeader
        title={Strings.profileInformation}
        numberoflines={1}
        style={styles.profileInformationStyle}
      />

      <View style={styles.card}>
        <ProfileInfoRow
          iconSource={Images.Person}
          label={Strings.fullName}
          value={props?.name}
          editable={props?.isEditingName}
          isEditing={props?.isEditingName}
          autoFocus={props?.isEditingName}
          isSaving={props?.isSavingName}
          showEditAction
          onPressEdit={props?.onPressEditName}
          onPressSave={props?.onPressSaveName}
          onPressCancel={props?.onPressCancelName}
          onChangeText={props?.onChangeName}
        />

        <View style={styles.divider} />

        <ProfileInfoRow
          iconSource={Images.BranchIcon}
          label={props?.branchLabel}
          value={props?.branchValue}
          editable={false}
        />

        <View style={styles.divider} />

        <ProfileInfoRow
          iconSource={Images.Staff}
          label={Strings.roleLabel}
          value={props?.roleValue}
          editable={false}
        />

        <View style={styles.divider} />

        <ProfileInfoRow
          iconSource={Images.Designation}
          label={Strings.designation}
          value={props?.designation}
          editable={false}
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

  profileInformationStyle: {
    maxWidth: wp(50),
  },
});

export default ProfileInformationCard;
