import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { hp, wp } from '../../Assets/Responsive';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ScreenLoader from '../../Components/ScreenLoader';
import StaffComparisonTabs from '../../Components/StaffComparisonTabs';
import StaffConversionChartCard from '../../Components/StaffConversionChartCard';
import StaffPerformanceCard from '../../Components/StaffPerformanceCard';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import Api from '../../Services/Api_services';
import { showApiMessageToast } from '../../Utils/apiHelpers';
import { mapSalesStaffComparison } from '../../Utils/salesStaffMappers';

const StaffComparison = props => {
  const params = props?.route?.params;
  const title = params?.title ?? props?.title ?? Strings.staffComparisonHeader;

  const [selectedTab, setSelectedTab] = useState(
    params?.selectedTab ?? Strings.weekly,
  );
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [datePickerKey, setDatePickerKey] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [yourData, setYourData] = useState(null);
  const [rankData, setRankData] = useState([]);
  const [topPerformer, setTopPerformer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = date => date.toLocaleDateString('en-GB');

  const fetchSalesStaffComparison = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await Api.getSalesStaffComparison();
      const resJson = res?.data;

      console.log(
        'Sales Staff Comparison Backend Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (res?.status == 200) {
        console.log(
          'Sales Staff Comparison Response:',
          JSON.stringify(resJson, null, 2),
        );

        const mapped = mapSalesStaffComparison(resJson?.data ?? resJson);
        setYourData(mapped.yourData);
        setRankData(mapped.rankData);
        setTopPerformer(mapped.topPerformer);
      } else {
        console.log(
          'Sales Staff Comparison Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Sales Staff Comparison API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSalesStaffComparison();
    }, [fetchSalesStaffComparison]),
  );

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
        <MainHeaderComponent
          title={title}
          notificationCount={params?.notificationCount ?? 5}
        />

        <StaffComparisonTabs
          selectedTab={selectedTab}
          weeklyLabel={Strings.weekly}
          monthlyLabel={Strings.monthly}
          onPressWeekly={() => setSelectedTab(Strings.weekly)}
          onPressMonthly={() => setSelectedTab(Strings.monthly)}
        />

        {isLoading ? (
          <ScreenLoader />
        ) : (
          <StaffPerformanceCard
            topPerformer={topPerformer}
            rankData={rankData}
            yourData={yourData}
            labels={params?.labels ?? Strings}
          />
        )}

        <StaffConversionChartCard
          labels={params?.labels ?? Strings}
          fromDate={fromDate}
          toDate={toDate}
          formatDate={formatDate}
          onPressFrom={() => openPicker('from')}
          onPressTo={() => openPicker('to')}
        />

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={
              datePickerKey === 'from'
                ? fromDate || today
                : toDate || fromDate || today
            }
            minimumDate={datePickerKey === 'to' ? fromDate || today : undefined}
            maximumDate={datePickerKey === 'from' ? today : undefined}
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
