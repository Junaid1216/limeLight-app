import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { hp, wp } from '../../Assets/Responsive';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import StaffComparisonTabs from '../../Components/StaffComparisonTabs';
import StaffConversionChartCard from '../../Components/StaffConversionChartCard';
import StaffPerformanceCard from '../../Components/StaffPerformanceCard';
import { staffComparisonRankData } from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';

const StaffComparison = ({ title = Strings.staffComparisonHeader }) => {
  const [selectedTab, setSelectedTab] = useState(Strings.weekly);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [datePickerKey, setDatePickerKey] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const topPerformer = staffComparisonRankData[1];

  const formatDate = date => date.toLocaleDateString('en-GB');

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (datePickerKey === 'from') {
      setFromDate(selectedDate);
      if (toDate && selectedDate > toDate) {
        setToDate(selectedDate);
      }
    }

    if (datePickerKey === 'to') {
      setToDate(selectedDate);
    }

    setShowPicker(false);
  };

  const openPicker = key => {
    setDatePickerKey(key);
    setShowPicker(true);
  };

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <MainHeaderComponent title={title} notificationCount={5} />

        <StaffComparisonTabs
          selectedTab={selectedTab}
          weeklyLabel={Strings.weekly}
          monthlyLabel={Strings.monthly}
          onPressWeekly={() => setSelectedTab(Strings.weekly)}
          onPressMonthly={() => setSelectedTab(Strings.monthly)}
        />

        <StaffPerformanceCard
          topPerformer={topPerformer}
          rankData={staffComparisonRankData}
          labels={Strings}
        />

        <StaffConversionChartCard
          labels={Strings}
          fromDate={fromDate}
          toDate={toDate}
          formatDate={formatDate}
          onPressFrom={() => openPicker('from')}
          onPressTo={() => openPicker('to')}
        />

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={datePickerKey === 'from' ? fromDate || today : toDate || fromDate || today}
            minimumDate={datePickerKey === 'to' ? fromDate || today : today}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    paddingBottom: hp(3),
  },
});

export default StaffComparison;
