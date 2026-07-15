import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ASMAchievementCard from '../../Components/ASMAchievementCard';
import ASMConversionTable from '../../Components/ASMConversionTable';
import ASMRangeToggle from '../../Components/ASMRangeToggle';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ScreenLoader from '../../Components/ScreenLoader';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import Api, { isApiSuccess } from '../../Services/Api_services';
import {
  logApiRequest,
  mapAsmRegionComparison,
  mapAsmRegionConversion,
} from '../../Utils/asmMappers';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const EMPTY_YOURS_ROW = { rank: 0, name: '', achieved: 0, remaining: 0 };

const getRangeType = range => (range === Strings.weekly ? 'weekly' : 'monthly');

const RegionComparison = props => {
  const params = props?.route?.params;

  const [selectedRange, setSelectedRange] = useState(
    params?.selectedRange ?? Strings.weekly,
  );
  const [conversionData, setConversionData] = useState([]);
  const [conversionYoursRow, setConversionYoursRow] = useState(null);
  const [garmentsData, setGarmentsData] = useState([]);
  const [unstitchedData, setUnstitchedData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [garmentsYoursRow, setGarmentsYoursRow] = useState(EMPTY_YOURS_ROW);
  const [unstitchedYoursRow, setUnstitchedYoursRow] = useState(EMPTY_YOURS_ROW);
  const [accessoriesYoursRow, setAccessoriesYoursRow] =
    useState(EMPTY_YOURS_ROW);
  const [isLoading, setIsLoading] = useState(false);
  const [isConversionLoading, setIsConversionLoading] = useState(false);

  const fetchAsmRegionConversion = useCallback(async () => {
    setIsConversionLoading(true);

    try {
      const type = getRangeType(selectedRange);
      logApiRequest(
        'ASM Region Conversion',
        `asm-region-comparison?type=${type}`,
      );

      const res = await Api.getAsmRegionConversion(type);
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'ASM Region Conversion Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapAsmRegionConversion(resJson?.data);
        console.log(
          'ASM Region Conversion App Response:',
          JSON.stringify(appResponse, null, 2),
        );

        setConversionData(appResponse.rows);
        setConversionYoursRow(appResponse.yoursRow);
      } else {
        console.log(
          'ASM Region Conversion Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'ASM Region Conversion API Error:',
        JSON.stringify(
          error?.response?.data ?? error?.message ?? error,
          null,
          2,
        ),
      );
    } finally {
      setIsConversionLoading(false);
    }
  }, [selectedRange]);

  const fetchAsmRegionComparison = useCallback(async () => {
    setIsLoading(true);

    try {
      logApiRequest('ASM Region Comparison', 'asm-regions-comparison');

      const res = await Api.getAsmRegionComparison();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log(
          'ASM Region Comparison Backend Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapAsmRegionComparison(resJson?.data);
        console.log(
          'ASM Region Comparison App Response:',
          JSON.stringify(appResponse, null, 2),
        );

        setGarmentsData(appResponse.garmentsData);
        setUnstitchedData(appResponse.unstitchedData);
        setAccessoriesData(appResponse.accessoriesData);
        setGarmentsYoursRow(appResponse.garmentsYoursRow);
        setUnstitchedYoursRow(appResponse.unstitchedYoursRow);
        setAccessoriesYoursRow(appResponse.accessoriesYoursRow);
      } else {
        console.log(
          'ASM Region Comparison Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'ASM Region Comparison API Error:',
        JSON.stringify(
          error?.response?.data ?? error?.message ?? error,
          null,
          2,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAsmRegionComparison();
    }, [fetchAsmRegionComparison]),
  );

  useEffect(() => {
    fetchAsmRegionConversion();
  }, [selectedRange, fetchAsmRegionConversion]);

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ASMConversionTable
        data={conversionData}
        showLegend={false}
        useRegionRow
        yoursRow={conversionYoursRow}
        isLoading={isConversionLoading}
        contentContainerStyle={styles.content}
        topContent={
          <>
            <MainHeaderComponent
              title={params?.title ?? Strings.regionComparison}
              notificationCount={params?.notificationCount ?? 5}
            />

            <ASMRangeToggle
              selectedRange={selectedRange}
              onSelectRange={setSelectedRange}
            />

            <Text style={styles.sectionHeading} numberOfLines={1}>
              {Strings.conversions}
            </Text>
          </>
        }
        bottomContent={
          <>
            <Text style={styles.sectionHeading} numberOfLines={1}>
              {Strings.regionComparison}
            </Text>
            {isLoading ? (
              <ScreenLoader />
            ) : (
            <View style={styles.achievementGroup}>
                <ASMAchievementCard
                  title={Strings.asmGarments}
                  data={garmentsData}
                  accentColor="#20C997"
                  yoursRow={garmentsYoursRow}
                />
                <ASMAchievementCard
                  title={Strings.asmUnstitched}
                  data={unstitchedData}
                  accentColor={Colors.brightBlue}
                  yoursRow={unstitchedYoursRow}
                />
                <ASMAchievementCard
                  title={Strings.asmAccessories}
                  data={accessoriesData}
                  accentColor={Colors.vividAmber}
                  yoursRow={accessoriesYoursRow}
                  isLast
                />
              </View>
            )}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.8),
    paddingBottom: hp(3),
    backgroundColor: Colors.white,
  },
  sectionHeading: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    marginTop: hp(2),
    marginBottom: hp(1.2),
  },
  achievementGroup: {
    borderWidth: 1,
    borderColor: '#A89C9C',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    marginBottom: hp(2),
    backgroundColor: '#F5FAFF',
  },
});

export default RegionComparison;
