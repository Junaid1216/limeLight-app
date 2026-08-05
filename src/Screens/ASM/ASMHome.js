import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ASMAchievementCard from '../../Components/ASMAchievementCard';
import ASMConversionTable from '../../Components/ASMConversionTable';
import ASMRangeToggle from '../../Components/ASMRangeToggle';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import ScreenLoader from '../../Components/ScreenLoader';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import Api from '../../Services/Api_services';
import {
  mapAsmBranchComparison,
  mapAsmBranchConversion,
} from '../../Utils/asmMappers';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const getRangeType = range => (range === Strings.weekly ? 'weekly' : 'monthly');

const ASMHome = () => {
  const userData = useSelector(state => state?.AUTH?.userData);

  const asmName =
    userData?.name || userData?.user?.name || userData?.data?.name || '';

  const [selectedRange, setSelectedRange] = useState(Strings.weekly);
  const [conversionData, setConversionData] = useState([]);
  const [garmentsData, setGarmentsData] = useState([]);
  const [unstitchedData, setUnstitchedData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);

  const [garmentsYoursRow, setGarmentsYoursRow] = useState({
    rank: 0,
    name: '',
    achieved: 0,
    remaining: 0,
  });

  const [unstitchedYoursRow, setUnstitchedYoursRow] = useState({
    rank: 0,
    name: '',
    achieved: 0,
    remaining: 0,
  });

  const [accessoriesYoursRow, setAccessoriesYoursRow] = useState({
    rank: 0,
    name: '',
    achieved: 0,
    remaining: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isConversionLoading, setIsConversionLoading] = useState(false);

  const fetchAsmBranchConversion = useCallback(async () => {
    setIsConversionLoading(true);

    try {
      const type = getRangeType(selectedRange);

      console.log('type@@', type);


      const res = await Api.getAsmBranchConversion(type);
      const resJson = res?.data;

      console.log(
        'ASM Branch Conversion Backend Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (res?.status == 200) {
        console.log(
          'ASM Branch Conversion Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapAsmBranchConversion(resJson?.data);

        setConversionData(appResponse);
      } else {
        console.log(
          'ASM Branch Conversion Error Response:',
          JSON.stringify(resJson, null, 2),
        );

        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'ASM Branch Conversion API Error:',
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

  const fetchAsmBranchComparison = useCallback(async () => {
    setIsLoading(true);

    try {
      const type = getRangeType(selectedRange);

      const res = await Api.getAsmBranchComparison(type);
      const resJson = res?.data;

      console.log(
        'ASM Branch Comparison Backend Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (res?.status == 200) {
        console.log(
          'ASM Branch Comparison Response:',
          JSON.stringify(resJson, null, 2),
        );

        const appResponse = mapAsmBranchComparison(resJson?.data);

        setGarmentsData(appResponse.garmentsData);
        setUnstitchedData(appResponse.unstitchedData);
        setAccessoriesData(appResponse.accessoriesData);
        setGarmentsYoursRow(appResponse.garmentsYoursRow);
        setUnstitchedYoursRow(appResponse.unstitchedYoursRow);
        setAccessoriesYoursRow(appResponse.accessoriesYoursRow);
      } else {
        console.log(
          'ASM Branch Comparison Error Response:',
          JSON.stringify(resJson, null, 2),
        );

        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'ASM Branch Comparison API Error:',
        JSON.stringify(
          error?.response?.data ?? error?.message ?? error,
          null,
          2,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedRange]);

  useFocusEffect(
    useCallback(() => {
      fetchAsmBranchComparison();
    }, [fetchAsmBranchComparison]),
  );

  useEffect(() => {
    fetchAsmBranchConversion();
  }, [fetchAsmBranchConversion]);

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />

      <View style={styles.headerArea}>
        <HomeHeaderComponent userName={asmName} />
      </View>

      <ASMConversionTable
        data={conversionData}
        contentContainerStyle={styles.content}
        isLoading={isConversionLoading}
        topContent={
          <>
            <Text style={styles.screenTitle} numberOfLines={1}>
              {Strings.branchComparison}
            </Text>

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
              {Strings.branchComparison}
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
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },

  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(3),
    backgroundColor: Colors.white,
  },

  screenTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.black,
    marginBottom: hp(2.2),
    textAlign: 'center',
  },

  sectionHeading: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    marginBottom: hp(1.2),
  },

  achievementGroup: {
    borderWidth: 0.97,
    borderColor: '#A89C9C',
    borderRadius: wp(4),
    paddingHorizontal: wp(2.5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    marginBottom: hp(3),
    backgroundColor: '#F5FAFF',
  },
});

export default ASMHome;
