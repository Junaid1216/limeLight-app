import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const SurveyOption = props => {
  const isSelected = props?.selected;

  return (
    <Pressable
      style={[styles.optionRow, isSelected && styles.optionRowSelected]}
      onPress={props?.onPress}>
      <View style={styles.labelRow}>
        {props?.icon ? (
          <Image
            source={props.icon}
            style={[
              styles.optionIcon,
              isSelected ? styles.optionIconSelected : styles.optionIconDefault,
            ]}
            resizeMode="contain"
          />
        ) : null}
        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
          {props?.label}
        </Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.platinum,
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginBottom: hp(1),
    backgroundColor: Colors.white,
  },
  optionRowSelected: {
    borderColor: Colors.teal,
    borderWidth: 1.5,
    backgroundColor: Colors.white,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(2.5),
  },
  optionIconDefault: {
    tintColor: Colors.mediumGrey,
  },
  optionIconSelected: {
    tintColor: Colors.teal,
  },
  optionText: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
  },
  optionTextSelected: {
    fontFamily: Fonts.poppinsMedium,
    color: Colors.teal,
  },
  radio: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(3),
    borderWidth: 1.5,
    borderColor: Colors.paleGray,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  checkMark: {
    color: Colors.white,
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsSemiBold,
  },
});

export default SurveyOption;
