import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { surveyReportBranchOptions } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const BranchResponse = () => {
  const [branch, setBranch] = useState(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{Strings.branchLabel}</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        containerStyle={styles.dropdownContainer}
        iconStyle={styles.dropdownIcon}
        data={surveyReportBranchOptions}
        labelField="label"
        valueField="value"
        placeholder={`Select ${Strings.branchLabel.toLowerCase()}`}
        value={branch}
        onChange={item => setBranch(item.value)}
        renderLeftIcon={() => (
          <View style={styles.iconWrap}>
            <Image
              source={Images.Branch}
              style={styles.branchIcon}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default BranchResponse;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1.5),
  },
  label: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.slateGrey,
    marginBottom: hp(0.8),
  },
  dropdown: {
    height: hp(6.5),
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    borderRadius: wp(3.5),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontSize: Fontsize.xmm,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.grey,
    marginLeft: wp(1),
  },
  selectedTextStyle: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
    marginLeft: wp(1),
  },
  itemTextStyle: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
  },
  dropdownContainer: {
    borderRadius: wp(3),
    overflow: 'hidden',
  },
  dropdownIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.mediumGrey,
  },
  iconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.mintBadge,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  branchIcon: {
    width: wp(4.5),
    height: wp(4.5),
    tintColor: Colors.branchGreen,
  },
});
