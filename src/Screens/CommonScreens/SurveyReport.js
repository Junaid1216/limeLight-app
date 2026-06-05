import { StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Fonts } from '../../Constants/Fonts';
import BranchResponse from '../../Components/BranchResponse';
import SatisficationSurveyComponent from '../../Components/SatisficationSuveyComponent';

import { Strings } from '../../Constants/Strings';

const SurveyReport = () => {
  return (
    <SafeAreaView style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={styles.headerWrap}>
        <MainHeaderComponent title={'Survey Report'} notificationCount={5} />
      </View>
      <Text style={styles.reportStyle} numberOfLines={1}>
        {Strings.SurveyReport}
      </Text>
      <Text style={styles.DetailedStyle} numberOfLines={1}>
        {Strings.Detailed}
      </Text>
      <BranchResponse />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <SatisficationSurveyComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyReport;

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  reportStyle: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(4.8),
    marginLeft: wp(5),
  },
  DetailedStyle: {
    color: '#71717B',
    fontSize: 12,
    marginLeft: wp(5.3),
  },
});
