import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import BranchResponse from '../../Components/BranchResponse';
import SatisficationSurveyComponent from '../../Components/SatisficationSuveyComponent';
import SurveyReportTitle from '../../Components/SurveyReportTitle';
import TotalResponsesCard from '../../Components/TotalResponsesCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { MyStyling } from '../../Constants/Styling';

const SurveyReport = () => {
  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.headerWrap}>
        <MainHeaderComponent title="Survey Report" notificationCount={5} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SurveyReportTitle />
        <BranchResponse />
        <TotalResponsesCard />
        <SatisficationSurveyComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyReport;

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
});
