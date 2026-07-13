import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import CategoryBreakdownCard from '../../Components/CategoryBreakdownCard';
import CommissionCard from '../../Components/CommissionCard';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import SlipBoundIncentiveItem, {
  SlipBoundIncentiveHeader,
} from '../../Components/SlipBoundIncentive';
import TargetVsAchievementCard from '../../Components/TargetVsAchievementCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { categoryColorMap } from '../../Constants/CategoryColors';
import {
  accessoriesTarget,
  commissionData,
  garmentsTarget,
  slipBoundIncentiveData,
  unstitchedTarget,
} from '../../Constants/DummyData';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import Api from '../../Services/Api_services';

const defaultTargetData = [garmentsTarget, unstitchedTarget, accessoriesTarget];

const getCategoryBarColor = categoryName => {
  const key = categoryName?.toLowerCase?.();
  return categoryColorMap[key] || Colors.limeGreen;
};

const formatDashboardAmount = value => {
  if (value == null || value === '') {
    return '0';
  }

  const str = String(value);

  if (/[Kk]|Rs/i.test(str)) {
    return str;
  }

  const num = Number(value);

  if (!Number.isFinite(num)) {
    return str;
  }

  if (num >= 1000) {
    const formatted = num / 1000;
    return Number.isInteger(formatted)
      ? `${formatted}K`
      : `${formatted.toFixed(1)}K`;
  }

  return String(Math.round(num));
};

const mapTargetVsAchievement = items => {
  const mapped = (items ?? []).map((item, index) => ({
    id: item?.category ?? String(index + 1),
    categoryName: item?.category ?? '',
    achieved: item?.achieved_percentage ?? 0,
    remaining: item?.remaining_percentage ?? 0,
    barColor: getCategoryBarColor(item?.category),
    fillPaddingLeft: index === 0 || index === 2 ? 20 : undefined,
    fillPaddingRight: index === 0 || index === 2 ? 8 : undefined,
  }));

  return mapped.length ? mapped : defaultTargetData;
};

const mapCommission = data => {
  if (!data) {
    return commissionData;
  }

  return {
    target: formatDashboardAmount(data?.target),
    sale: formatDashboardAmount(data?.sale),
    commission: String(data?.commission ?? '').includes('Rs')
      ? data.commission
      : `Rs. ${formatDashboardAmount(data?.commission)}`,
    achieved: data?.achieved_percentage ?? 0,
    remaining: data?.remaining_percentage ?? 0,
  };
};

const formatSaleAmount = value => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return String(value ?? 0);
  }

  if (num >= 1000) {
    const formatted = num / 1000;
    return Number.isInteger(formatted)
      ? `${formatted}K`
      : `${formatted.toFixed(1)}K`;
  }

  return String(Math.round(num));
};

const parseIncentiveDate = dateStr => {
  const parts = (dateStr ?? '').trim().split(' ');

  if (parts.length >= 3) {
    return {
      dateDay: `${parts[0]} ${parts[1]}`,
      dateYear: parts[2],
    };
  }

  return {
    dateDay: dateStr || '-',
    dateYear: '',
  };
};

const mapSlipBoundIncentive = items =>
  (items ?? []).map((item, index) => {
    const { dateDay, dateYear } = parseIncentiveDate(item?.date);

    return {
      id: String(item?.invoice_id ?? index + 1),
      dateDay,
      dateYear,
      slab: item?.slab ?? 'A',
      invoice: String(item?.invoice_id ?? ''),
      salesId: String(item?.sales_id ?? ''),
      netSale: formatSaleAmount(item?.net_sale),
      incentive: String(item?.incentive ?? 0),
    };
  });

const getIncentiveList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  return responseData?.data ?? [];
};

const renderIncentiveItem = ({ item }) => (
  <SlipBoundIncentiveItem item={item} />
);

const StaffHomeContent = () => {
  const [targetData, setTargetData] = useState(defaultTargetData);
  const [commission, setCommission] = useState(commissionData);
  const [incentiveData, setIncentiveData] = useState(slipBoundIncentiveData);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isIncentiveLoading, setIsIncentiveLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setIsDashboardLoading(true);

    try {
      const res = await Api.getDashboard();

      if (res?.status == 200) {
        console.log('Dashboard Success:', JSON.stringify(res?.data, null, 2));
        Toast.show(res?.data?.message, Toast.LONG);

        const dashboard = res?.data?.data ?? {};
        setTargetData(mapTargetVsAchievement(dashboard.target_vs_achievement));
        setCommission(mapCommission(dashboard.commission));
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log('Dashboard API Error:', error?.response?.data || error);
      Toast.show(error?.response?.data?.message, Toast.LONG);
    } finally {
      setIsDashboardLoading(false);
    }
  }, []);

  const fetchSlipBoundIncentive = useCallback(async () => {
    setIsIncentiveLoading(true);

    try {
      const res = await Api.getSlipBoundIncentive();

      if (res?.status == 200) {
        console.log(
          'Slip Bound Incentive Success:',
          JSON.stringify(res?.data, null, 2),
        );
        Toast.show(res?.data?.message, Toast.LONG);
        setIncentiveData(mapSlipBoundIncentive(getIncentiveList(res?.data)));
      } else {
        Toast.show(res?.data?.message, Toast.LONG);
      }
    } catch (error) {
      console.log(
        'Slip Bound Incentive API Error:',
        error?.response?.data || error,
      );
      Toast.show(
        error?.response?.data?.message || 'Failed to load slip bound incentive',
        Toast.LONG,
      );
    } finally {
      setIsIncentiveLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
      fetchSlipBoundIncentive();
    }, [fetchDashboard, fetchSlipBoundIncentive]),
  );

  return (
    <FlatList
      data={incentiveData}
      keyExtractor={item => item?.id}
      renderItem={renderIncentiveItem}
      ListHeaderComponent={
        <View>
          <Text style={styles.pageTitle} numberOfLines={1}>
            {Strings.myPerformance}
          </Text>
          <TargetVsAchievementCard
            items={targetData}
            isLoading={isDashboardLoading}
          />
          <CommissionCard data={commission} isLoading={isDashboardLoading} />
          <CategoryBreakdownCard />

          <Text style={styles.sectionTitle} numberOfLines={1}>
            {Strings.slipBoundIncentive}
          </Text>
          <Text style={styles.sectionSub} numberOfLines={2}>
            {Strings.slipBoundIncentiveSub}
          </Text>
          <SlipBoundIncentiveHeader />
          {isIncentiveLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={Colors.darkNavy} size="small" />
            </View>
          )}
        </View>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const Home = () => (
  <View style={MyStyling.container2}>
    <View style={styles.headerArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />
      <HomeHeaderComponent />
    </View>
    <StaffHomeContent />
  </View>
);

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.3),
    paddingBottom: hp(3),
  },
  pageTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(2.1),
  },
  sectionTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.slipBoundSectionTitle,
    color: Colors.black,
  },
  sectionSub: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs1,
    color: Colors.steelGray,
    marginTop: hp(0.4),
    marginBottom: hp(1.2),
  },
  loaderContainer: {
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
