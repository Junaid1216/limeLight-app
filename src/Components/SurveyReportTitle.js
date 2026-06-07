import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const SurveyReportTitle = () => (
  <View>
    <Text style={styles.title} numberOfLines={1}>{Strings.SurveyReport}</Text>
    <Text style={styles.subtitle} numberOfLines={1}>{Strings.Detailed}</Text>
  </View>
);

export default SurveyReportTitle;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(5),
    color: Colors.graphite,
    marginTop: hp(0.2),
  },
  subtitle: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(3),
    color: Colors.zinc,

  },
});
