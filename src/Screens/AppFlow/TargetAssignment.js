import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';

import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { Strings } from '../../Constants/Strings';
import { hp, wp } from '../../Assets/Responsive';

import MonthlyTargetCalculator from '../../Components/MonthlyTargetCalculator';
import MonthlyTargetAssignment, {
  defaultStaffRows,
} from '../../Components/MonthlyTargetAssignment';
import Btn from '../../Components/Btn';
import Api from '../../Services/Api_services';
import {
  buildBranchManagerAssignTargetsPayload,
  getCurrentMonthYearLabels,
} from '../../Utils/branchManagerMappers';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const BUTTONS_BOTTOM = 20;

const getEmptyStaffRows = () =>
  defaultStaffRows.map(row => ({
    ...row,
    garments: '',
    unstitched: '',
    accessories: '',
  }));

const TargetAssignment = () => {
  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [staffRows, setStaffRows] = useState(getEmptyStaffRows);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleUpdateField = (id, field, value) => {
    setStaffRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleReset = () => {
    setStaffRows(getEmptyStaffRows());
  };

  const handleSaveTargets = async () => {
    const { month, year } = getCurrentMonthYearLabels();
    const payload = buildBranchManagerAssignTargetsPayload(staffRows, month, year);

    if (!payload.targets.length) {
      Toast.show('Please enter at least one target value', Toast.LONG);
      return;
    }

    setIsSaving(true);

    try {
      const res = await Api.assignBranchManagerTargets(payload);
      const resJson = res?.data;

      if (res?.status == 200) {
        console.log(
          'Branch Manager Target Assignment App Response:',
          JSON.stringify(resJson, null, 2),
        );

        Toast.show(resJson?.message || 'Targets saved successfully', Toast.LONG);
        handleReset();
        navigation.goBack();
      } else {
        console.log(
          'Branch Manager Target Assignment Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Branch Manager Target Assignment API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
      showApiMessageToast(null, error);
    } finally {
      setIsSaving(false);
    }
  };

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

        <MonthlyTargetAssignment
          rows={staffRows}
          onUpdateField={handleUpdateField}
        />
      </ScrollView>

      <View
        style={[styles.bottomButtons, { bottom: BUTTONS_BOTTOM - keyboardHeight }]}>
        <Btn
          title="↺ Reset"
          style={styles.resetBtn}
          onPress={handleReset}
          loading={isSaving}
        />

        <Btn
          title="Save Targets"
          style={styles.saveBtn}
          onPress={handleSaveTargets}
          loading={isSaving}
        />
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
