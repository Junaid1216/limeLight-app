import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { Strings } from '../Constants/Strings';

const ASMRangeToggle = ({ selectedRange, onSelectRange }) => {
  const isWeekly = selectedRange === Strings.weekly;

  return (
    <View style={styles.container}>
      <View style={styles.toggleGroup}>
        <TouchableOpacity
          style={[styles.toggleButton, isWeekly && styles.toggleButtonActive]}
          onPress={() => onSelectRange(Strings.weekly)}
          activeOpacity={0.9}
        >
          <Text
            style={[styles.toggleLabel, isWeekly && styles.toggleLabelActive]}
            numberOfLines={1}
          >
            {Strings.weekly}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !isWeekly && styles.toggleButtonActive]}
          onPress={() => onSelectRange(Strings.monthly)}
          activeOpacity={0.9}
        >
          <Text
            style={[styles.toggleLabel, !isWeekly && styles.toggleLabelActive]}
            numberOfLines={1}
          >
            {Strings.monthly}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  toggleGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(5),
    borderWidth: wp(0.2),
    borderColor: Colors.paleSlate,
    padding: wp(0.50),
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.35),
    paddingHorizontal: wp(3),
    borderRadius: wp(4),
  },
  toggleButtonActive: {
    backgroundColor: Colors.green,
  },
  toggleLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xm2,
    color: Colors.slateBlue,
  },
  toggleLabelActive: {
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.white,
  },
});

export default ASMRangeToggle;
