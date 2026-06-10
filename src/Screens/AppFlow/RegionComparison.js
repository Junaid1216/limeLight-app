import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import ASMAchievementCard from '../../Components/ASMAchievementCard';
import ASMConversionTable from '../../Components/ASMConversionTable';
import ASMRangeToggle from '../../Components/ASMRangeToggle';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import {
  asmAccessoriesData,
  asmGarmentsData,
  asmUnstitchedData,
  regionConversionData,
  regionYoursAchievementRow,
  regionYoursConversionRow,
} from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const RegionComparison = props => {
  const params = props?.route?.params;
  const conversionData = params?.conversionData ?? regionConversionData;
  const garmentsData = params?.garmentsData ?? asmGarmentsData;
  const unstitchedData = params?.unstitchedData ?? asmUnstitchedData;
  const accessoriesData = params?.accessoriesData ?? asmAccessoriesData;
  const yoursConversionRow =
    params?.yoursConversionRow ?? regionYoursConversionRow;
  const yoursAchievementRow =
    params?.yoursAchievementRow ?? regionYoursAchievementRow;

  const [selectedRange, setSelectedRange] = useState(params?.selectedRange ?? '');

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ASMConversionTable
        data={conversionData}
        yoursRow={yoursConversionRow}
        showLegend={false}
        useRegionRow
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
            <View style={styles.achievementGroup}>
              <ASMAchievementCard
                title={Strings.asmGarments}
                data={garmentsData}
                accentColor="#20C997"
                yoursRow={yoursAchievementRow}
              />
              <ASMAchievementCard
                title={Strings.asmUnstitched}
                data={unstitchedData}
                accentColor={Colors.brightBlue}
                yoursRow={yoursAchievementRow}
              />
              <ASMAchievementCard
                title={Strings.asmAccessories}
                data={accessoriesData}
                accentColor={Colors.vividAmber}
                yoursRow={yoursAchievementRow}
                isLast
              />
            </View>
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
