import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { Strings } from '../../Constants/Strings';
import { hp, wp } from '../../Assets/Responsive';

import MonthlyTargetCalculator from '../../Components/MonthlyTargetCalculator';
import MonthlyTargetAssignment from '../../Components/MonthlyTargetAssignment';
import Btn from '../../Components/Btn';

const BUTTONS_BOTTOM = 20;

const TargetAssignment = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(event.endCoordinates?.height ?? 0);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <SafeAreaView style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerWrap}>
        <MainHeaderComponent
          title={Strings.TargetAssignment}
          notificationCount={5}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <MonthlyTargetCalculator />

        <MonthlyTargetAssignment />
      </ScrollView>

      <View
        style={[styles.bottomButtons, { bottom: BUTTONS_BOTTOM - keyboardHeight }]}>
        <Btn title="↺ Reset" style={styles.resetBtn} />

        <Btn title="Save Targets" style={styles.saveBtn} />
      </View>
    </SafeAreaView>
  );
};

export default TargetAssignment;

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  scroll: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  scrollContent: {
    paddingTop: hp(1),
    paddingBottom: hp(14),
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
