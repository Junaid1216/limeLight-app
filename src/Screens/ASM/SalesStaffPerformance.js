import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import StaffPerformanceCard from '../../Components/StaffPerformanceCard';
import { hp, wp } from '../../Assets/Responsive';
import { staffComparisonRankData } from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';

const SalesStaffPerformance = () => {
  const topPerformer = staffComparisonRankData[1];

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <MainHeaderComponent
          title={Strings.salesStaffPerformance}
          notificationCount={5}
        />
        <StaffPerformanceCard
          topPerformer={topPerformer}
          rankData={staffComparisonRankData}
          labels={Strings}
        />
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

export default SalesStaffPerformance;
