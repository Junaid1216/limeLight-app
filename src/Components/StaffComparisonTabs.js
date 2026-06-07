import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const StaffComparisonTabs = ({ selectedTab, weeklyLabel, monthlyLabel, onPressWeekly, onPressMonthly }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.tabButton, selectedTab === weeklyLabel && styles.tabButtonActive]}
        onPress={onPressWeekly}
      >
        <Text style={[styles.tabText, selectedTab === weeklyLabel && styles.tabTextActive]}>
          {weeklyLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.tabButton, selectedTab === monthlyLabel && styles.tabButtonActive]}
        onPress={onPressMonthly}
      >
        <Text style={[styles.tabText, selectedTab === monthlyLabel && styles.tabTextActive]}>
          {monthlyLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.tabTrack,
    borderRadius: wp(7),
    padding: wp(0.9),
    marginBottom: hp(1.7),
  },
  tabButton: {
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(4.5),
    borderRadius: wp(5),
  },
  tabButtonActive: {
    backgroundColor: Colors.green,
  },
  tabText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm1,
    color: Colors.slateBlue,
  },
  tabTextActive: {
    color: Colors.white,
  },
});

export default StaffComparisonTabs;
