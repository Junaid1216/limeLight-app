import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import ResponseComponent from '../../Components/ResponseComponent';
import AllResponseComponent from '../../Components/AllResponseComponent';

const SurveyResponse = () => {
  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={styles.headerWrap}>
        <MainHeaderComponent title={'Survey Response'} notificationCount={5} />
      </View>
      <ResponseComponent />
      <View style={styles.tabsWrap}>
        <AllResponseComponent />
      </View>
    </View>
  );
};

export default SurveyResponse;

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  tabsWrap: {
    flex: 1,
  },
});
