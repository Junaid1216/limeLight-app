import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import BranchCommissionCard from '../../Components/BranchCommissionCard';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import ManagerCategoryCard from '../../Components/ManagerCategoryCard';
import ManagerLiveStatusCard from '../../Components/ManagerLiveStatusCard';
import ScreenLoader from '../../Components/ScreenLoader';
import StaffConversionChartCard from '../../Components/StaffConversionChartCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import Api, { isApiSuccess } from '../../Services/Api_services';
import Config from '../../Services/Config';
import { showApiMessageToast } from '../../Utils/apiHelpers';
import {
  mapBranchManagerCategoryPerformance,
  mapBranchManagerCommission,
  mapBranchManagerDashboard,
} from '../../Utils/branchManagerMappers';

const isNotFoundError = error => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 404) {
    return true;
  }

  if (typeof data === 'string' && data.includes('Not Found')) {
    return true;
  }

  if (data?.exception?.includes('NotFoundHttpException')) {
    return true;
  }

  return false;
};

const logBackend404Message = (label, endpoint) => {
  const url = `${Config.baseURL}${endpoint}`;

  console.log(
    `${label} — 404 Fix:\n` +
      `1. Browser kholo: https://ranglerzbeta.in/limelight/optimize-project\n` +
      `2. "Optimization Commands Executed Successfully" message aana chahiye\n` +
      `3. App reload karo (Metro: r) aur screen dubara kholo\n` +
      `4. Agar phir bhi 404 aaye to backend ko yeh message send karo:\n\n` +
      `Hi Backend Team,\n\n` +
      `Beta server par yeh API 404 de rahi hai:\n` +
      `GET ${url}\n\n` +
      `optimize-project bhi run kar liya, phir bhi 404 aa raha hai.\n` +
      `Please route deploy karo.\n\n` +
      `Thanks.`,
  );
};

const formatApiDate = date => {
  if (!date) {
    return '';
  }

  const value = new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const BranchManager = () => {
  const [performanceSummary, setPerformanceSummary] = useState(null);
  const [commissionData, setCommissionData] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [datePickerKey, setDatePickerKey] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [conversionData, setConversionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConversionLoading, setIsConversionLoading] = useState(false);

  const hasConversionDateRange = Boolean(fromDate && toDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = date => date?.toLocaleDateString('en-GB');

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (datePickerKey === 'from') {
      const nextDate = selectedDate > today ? today : selectedDate;
      setFromDate(nextDate);

      if (toDate && nextDate > toDate) {
        setToDate(nextDate);
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

  const fetchBranchManagerDashboard = useCallback(async () => {
    try {
      const res = await Api.getBranchManagerDashboard();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'Branch Manager Dashboard Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapBranchManagerDashboard(resJson?.data);
        console.log(
          'Branch Manager Dashboard App Response:',
          JSON.stringify(
            {
              status: resJson?.status ?? res?.status,
              message: resJson?.message,
              data: appResponse,
            },
            null,
            2,
          ),
        );

        setPerformanceSummary(appResponse);
      } else {
        console.log(
          'Branch Manager Dashboard Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      if (isNotFoundError(error)) {
        logBackend404Message(
          'Branch Manager Dashboard',
          'branch-manager-dashboard',
        );
      } else {
        console.log(
          'Branch Manager Dashboard API Error:',
          JSON.stringify(
            error?.response?.data ?? error?.message ?? error,
            null,
            2,
          ),
        );
      }
    }
  }, []);

  const fetchBranchManagerCommission = useCallback(async () => {
    try {
      const res = await Api.getBranchManagerCommission();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'Branch Manager Commission Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapBranchManagerCommission(resJson?.data);
        console.log(
          'Branch Manager Commission App Response:',
          JSON.stringify(
            {
              status: resJson?.status ?? res?.status,
              message: resJson?.message,
              data: appResponse,
            },
            null,
            2,
          ),
        );

        setCommissionData(appResponse);
      } else {
        console.log(
          'Branch Manager Commission Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      if (isNotFoundError(error)) {
        logBackend404Message(
          'Branch Manager Commission',
          'branch-manager-commission',
        );
      } else {
        console.log(
          'Branch Manager Commission API Error:',
          JSON.stringify(
            error?.response?.data ?? error?.message ?? error,
            null,
            2,
          ),
        );
      }
    }
  }, []);

  const fetchBranchManagerCategoryPerformance = useCallback(async () => {
    try {
      const res = await Api.getBranchManagerCategoryPerformance();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'Branch Manager Category Performance Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapBranchManagerCategoryPerformance(resJson?.data);
        console.log(
          'Branch Manager Category Performance App Response:',
          JSON.stringify(
            {
              status: resJson?.status ?? res?.status,
              message: resJson?.message,
              data: appResponse,
            },
            null,
            2,
          ),
        );

        setCategoryPerformance(appResponse);
      } else {
        console.log(
          'Branch Manager Category Performance Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      if (isNotFoundError(error)) {
        logBackend404Message(
          'Branch Manager Category Performance',
          'branch-manager-category-performance',
        );
      } else {
        console.log(
          'Branch Manager Category Performance API Error:',
          JSON.stringify(
            error?.response?.data ?? error?.message ?? error,
            null,
            2,
          ),
        );
      }
    }
  }, []);

  const fetchConversionRate = useCallback(async () => {
    if (!fromDate || !toDate) {
      setConversionData(null);
      return;
    }

    const from = formatApiDate(fromDate);
    const to = formatApiDate(toDate);

    setIsConversionLoading(true);

    try {
      const res = await Api.getConversionRate(from, to);
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        const list = Array.isArray(resJson)
          ? resJson
          : resJson?.chart ?? resJson?.data ?? [];

        console.log(
          'Conversion Rate Backend Response:',
          JSON.stringify(
            {
              status: resJson?.status ?? res?.status,
              ...(!Array.isArray(resJson) ? resJson : { data: resJson }),
            },
            null,
            2,
          ),
        );

        const appResponse = Array.isArray(resJson)
          ? {
              status: res?.status,
              data: list,
            }
          : {
              status: resJson?.status ?? res?.status,
              from: resJson?.from ?? from,
              to: resJson?.to ?? to,
              peak: resJson?.peak,
              chart: list,
            };

        console.log(
          'Conversion Rate App Response:',
          JSON.stringify(appResponse, null, 2),
        );

        setConversionData(list);
      } else {
        console.log(
          'Conversion Rate Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
        setConversionData([]);
      }
    } catch (error) {
      console.log(
        'Conversion Rate API Error:',
        JSON.stringify(
          error?.response?.data ?? error?.message ?? error,
          null,
          2,
        ),
      );
      setConversionData([]);
    } finally {
      setIsConversionLoading(false);
    }
  }, [fromDate, toDate]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadScreenData = async () => {
        setIsLoading(true);

        try {
          await Promise.all([
            fetchBranchManagerDashboard(),
            fetchBranchManagerCommission(),
            fetchBranchManagerCategoryPerformance(),
          ]);
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadScreenData();

      return () => {
        isActive = false;
      };
    }, [
      fetchBranchManagerDashboard,
      fetchBranchManagerCommission,
      fetchBranchManagerCategoryPerformance,
    ]),
  );

  useEffect(() => {
    fetchConversionRate();
  }, [fetchConversionRate]);

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />
      <View style={styles.headerArea}>
        <HomeHeaderComponent />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.screenTitle} numberOfLines={1}>
          {Strings.myPerformance}
        </Text>

        {isLoading ? (
          <ScreenLoader />
        ) : (
          <>
        <ManagerLiveStatusCard data={performanceSummary} />

        <Text style={styles.sectionTitle} numberOfLines={1}>
          {Strings.categoryPerformance}
        </Text>

        {categoryPerformance.map(item => (
          <ManagerCategoryCard key={item.id} item={item} />
        ))}

        <BranchCommissionCard items={commissionData} />

        <StaffConversionChartCard
          labels={Strings}
          fromDate={fromDate}
          toDate={toDate}
          formatDate={formatDate}
          onPressFrom={() => openPicker('from')}
          onPressTo={() => openPicker('to')}
          transactionSummary={hasConversionDateRange ? conversionData : null}
          isLoading={isConversionLoading}
        />
          </>
        )}

        {showPicker ? (
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
        ) : null}
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
