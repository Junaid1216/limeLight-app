import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ASMAchievementCard from '../../Components/ASMAchievementCard';
import ASMRangeToggle from '../../Components/ASMRangeToggle';
import BranchStaffComparisonTable from '../../Components/BranchStaffComparisonTable';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import {
  asmAccessoriesData,
  asmGarmentsData,
  asmUnstitchedData,
  bmTeamAchievementRow,
  branchManagerStaffData,
} from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const Comparison = props => {
  const params = props?.route?.params;
  const staffData = params?.staffData ?? branchManagerStaffData;
  const garmentsData = params?.garmentsData ?? asmGarmentsData;
  const unstitchedData = params?.unstitchedData ?? asmUnstitchedData;
  const accessoriesData = params?.accessoriesData ?? asmAccessoriesData;
  const teamAchievementRow = params?.teamAchievementRow ?? bmTeamAchievementRow;

  const [selectedRange, setSelectedRange] = useState(params?.selectedRange ?? '');

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MainHeaderComponent
          title={params?.title ?? Strings.comparison}
          notificationCount={params?.notificationCount ?? 5}
        />

        <ASMRangeToggle
          selectedRange={selectedRange}
          onSelectRange={setSelectedRange}
        />

        <BranchStaffComparisonTable staff={staffData} />

        <Text style={styles.sectionHeading} numberOfLines={1}>
          {Strings.branchComparison}
        </Text>
        <View style={styles.achievementGroup}>
          <ASMAchievementCard
            title={Strings.asmGarments}
            data={garmentsData}
            accentColor="#20C997"
            yoursRow={teamAchievementRow}
          />
          <ASMAchievementCard
            title={Strings.asmUnstitched}
            data={unstitchedData}
            accentColor={Colors.brightBlue}
            yoursRow={teamAchievementRow}
          />
          <ASMAchievementCard
            title={Strings.asmAccessories}
            data={accessoriesData}
            accentColor={Colors.vividAmber}
            yoursRow={teamAchievementRow}
            isLast
          />
        </View>
      </ScrollView>
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

export default Comparison;
