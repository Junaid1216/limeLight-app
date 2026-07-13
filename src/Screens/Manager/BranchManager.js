import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import BranchCommissionCard from '../../Components/BranchCommissionCard';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import ManagerCategoryCard from '../../Components/ManagerCategoryCard';
import ManagerLiveStatusCard from '../../Components/ManagerLiveStatusCard';
import StaffConversionChartCard from '../../Components/StaffConversionChartCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import {
  categoryBreakdownData,
  managerAccessoriesPerformance,
  managerGarmentsPerformance,
  managerPerformanceSummary,
  managerUnstitchedPerformance,
} from '../../Constants/DummyData';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useDateRangePicker } from '../../hooks/useDateRangePicker';
import { useConversionRate } from '../../hooks/useConversionRate';
import Api from '../../Services/Api_services';
import {
  mapBranchManagerCategoryPerformance,
  mapBranchManagerCommission,
  mapBranchManagerPerformanceSummary,
} from '../../Utils/branchManagerMappers';

const defaultCategoryPerformance = [
  managerGarmentsPerformance,
  managerUnstitchedPerformance,
  managerAccessoriesPerformance,
];

const getApiErrorMessage = error =>
  error?.response?.data?.message || error?.message || '';

const isNotFoundError = error => error?.response?.status === 404;

const BranchManager = props => {
  const params = props?.route?.params;

  const [performanceSummary, setPerformanceSummary] = useState(
    managerPerformanceSummary,
  );
  const [categoryPerformance, setCategoryPerformance] = useState(
    defaultCategoryPerformance,
  );
  const [commissionBreakdown, setCommissionBreakdown] = useState(
    categoryBreakdownData,
  );
  const [isCommissionLoading, setIsCommissionLoading] = useState(false);

  const garmentsPerformance =
    params?.garmentsPerformance ??
    categoryPerformance[0] ??
    managerGarmentsPerformance;
  const unstitchedPerformance =
    params?.unstitchedPerformance ??
    categoryPerformance[1] ??
    managerUnstitchedPerformance;
  const accessoriesPerformance =
    params?.accessoriesPerformance ??
    categoryPerformance[2] ??
    managerAccessoriesPerformance;

  const {
    fromDate,
    toDate,
    formatDate,
    openFromPicker,
    openToPicker,
    datePicker,
  } = useDateRangePicker();

  const { conversionData, isLoading: isConversionLoading } = useConversionRate(
    fromDate,
    toDate,
  );

  const fetchBranchManagerCommission = useCallback(async () => {
    setIsCommissionLoading(true);

    try {
      const res = await Api.getBranchManagerCommission();

      if (res?.status == 200) {
        console.log(
          'Branch Manager Commission Success:',
          JSON.stringify(res?.data, null, 2),
        );
        Toast.show(res?.data?.message, Toast.LONG);

        const items = res?.data?.data ?? [];
        setCommissionBreakdown(mapBranchManagerCommission(items));
        setPerformanceSummary(mapBranchManagerPerformanceSummary(items));
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log(
        'Branch Manager Commission API Error:',
        error?.response?.data || error,
      );

      if (!isNotFoundError(error)) {
        Toast.show(
          getApiErrorMessage(error) ||
            'Failed to load branch manager commission',
          Toast.LONG,
        );
      }
    } finally {
      setIsCommissionLoading(false);
    }
  }, []);

  const fetchBranchManagerCategoryPerformance = useCallback(async () => {
    try {
      console.log('Branch Manager Category Performance Request');

      const res = await Api.getBranchManagerCategoryPerformance();

      if (res?.status == 200) {
        console.log(
          'Branch Manager Category Performance Success:',
          JSON.stringify(res?.data, null, 2),
        );
        Toast.show(res?.data?.message, Toast.LONG);

        const mapped = mapBranchManagerCategoryPerformance(res?.data?.data);

        if (mapped.length) {
          setCategoryPerformance(mapped);
        }
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log(
        'Branch Manager Category Performance API Error:',
        error?.response?.data || error,
      );

      if (!isNotFoundError(error)) {
        Toast.show(
          getApiErrorMessage(error) ||
            'Failed to load branch manager category performance',
          Toast.LONG,
        );
      }
    }
  }, []);

  const fetchBranchManagerData = useCallback(async () => {
    await Promise.all([
      fetchBranchManagerCommission(),
      fetchBranchManagerCategoryPerformance(),
    ]);
  }, [fetchBranchManagerCommission, fetchBranchManagerCategoryPerformance]);

  useFocusEffect(
    useCallback(() => {
      fetchBranchManagerData();
    }, [fetchBranchManagerData]),
  );

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />
      <View style={styles.headerArea}>
        <HomeHeaderComponent />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.screenTitle} numberOfLines={1}>
          {Strings.myPerformance}
        </Text>

        <ManagerLiveStatusCard data={performanceSummary} />

        <Text style={styles.sectionTitle} numberOfLines={1}>
          {Strings.categoryPerformance}
        </Text>

        <ManagerCategoryCard item={garmentsPerformance} />
        <ManagerCategoryCard item={unstitchedPerformance} />
        <ManagerCategoryCard item={accessoriesPerformance} />

        <BranchCommissionCard
          items={commissionBreakdown}
          isLoading={isCommissionLoading}
        />

        <StaffConversionChartCard
          labels={Strings}
          fromDate={fromDate}
          toDate={toDate}
          formatDate={formatDate}
          onPressFrom={openFromPicker}
          onPressTo={openToPicker}
          transactionSummary={conversionData}
          isLoading={isConversionLoading}
        />

        {datePicker ? <DateTimePicker {...datePicker} /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.3),
    paddingBottom: hp(3),
    backgroundColor: Colors.white,
  },
  screenTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(2.1),
  },
  sectionTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
    marginBottom: hp(1.5),
    marginLeft: wp(0.5),
  },
});

export default BranchManager;
