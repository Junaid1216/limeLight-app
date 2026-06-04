import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { Strings } from '../../Constants/Strings';
import { hp, wp } from '../../Assets/Responsive';

import MonthlyTargetCalculator from '../../Components/MonthlyTargetCalculator';
import MonthlyTargetAssignment from '../../Components/MonthlyTargetAssignment';
import Btn from '../../Components/Btn';

const TargetAssignment = () => {
  return (
    <SafeAreaView style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.content}>
        <MainHeaderComponent
          title={Strings.TargetAssignment}
          notificationCount={5}
        />

        <MonthlyTargetCalculator />

        <MonthlyTargetAssignment />
      </View>
      <View style={styles.bottomButtons}>
        <Btn title="↺ Reset" style={styles.resetBtn} />

        <Btn title="Save Targets" style={styles.saveBtn} />
      </View>
    </SafeAreaView>
  );
};

export default TargetAssignment;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(80),
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  resetBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  saveBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#1FA58A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
  },

  resetBtn: {
    flex: 1,
    backgroundColor: '#000',
    marginRight: 8,
    marginTop: 0,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: '#1FA58A',
    marginLeft: 8,
    marginTop: 0,
  },
});
