import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SurveyProgressBar from './SurveyProgressBar';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { surveyReportDetail } from '../Constants/DummyData';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const SatisficationSurveyComponent = ({
  reportTitle = surveyReportDetail.reportTitle,
  title = surveyReportDetail.title,
  questions = surveyReportDetail.questions,
  responseRate = surveyReportDetail.responseRate,
  responses = surveyReportDetail.responses,
  breakdown = surveyReportDetail.breakdown,
  status = 'Active',
}) => {
  const breakdownItems = Array.isArray(breakdown) ? breakdown : [];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconBox}>
            <Image
              source={require('../Assets/Icons/ReportSurvey.png')}
              style={styles.reportIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.report} numberOfLines={1}>REPORT</Text>
            <Text style={styles.mainTitle} numberOfLines={1}>
              {reportTitle}
            </Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.label}>TITLE</Text>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Image source={Images.Question} style={styles.statsIcon} />
            <Text style={styles.statsLabel}>Questions</Text>
          </View>
          <Text style={styles.statsValue}>{questions}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Image
              source={require('../Assets/Icons/ResponseRate.png')}
              style={styles.statsIcon}
            />
            <Text style={styles.statsLabel}>Response Rate</Text>
          </View>
          <Text style={[styles.statsValue, styles.rateValue]}>
            {responseRate}
          </Text>
        </View>
      </View>

      <View style={styles.breakRow}>
        <Text style={styles.breakTitle}>Response Breakdown</Text>
        <Text style={styles.breakCount}>{responses}</Text>
      </View>

      {breakdownItems.map(item => (
        <SurveyProgressBar
          key={item.label}
          title={item.label}
          current={item.value}
          color={item.color}
        />
      ))}
    </View>
  );
};

export default SatisficationSurveyComponent;

const styles = StyleSheet.create({
  card: {
    marginTop: hp(2),
    padding: wp(4),
    borderRadius: wp(4.5),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp(2),
  },
  headerTextWrap: {
    flex: 1,
  },
  iconBox: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(3),
    backgroundColor: Colors.mintBadge,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2.5),
  },
  reportIcon: {
    width: wp(4.5),
    height: wp(4.5),
  },
  report: {
    fontSize: Fontsize.xm0,
    color: Colors.ashGray,
    fontFamily: Fonts.poppinsMedium,
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: Fontsize.xx1,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
    marginTop: hp(0.2),
  },
  badge: {
    backgroundColor: Colors.mintBadge,
    borderRadius: wp(5),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.limeGreen,
    fontSize: Fontsize.xm0,
    fontFamily: Fonts.poppinsMedium,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.fieldBorder,
    marginVertical: hp(1.8),
  },
  label: {
    fontSize: Fontsize.xm0,
    color: Colors.ashGray,
    fontFamily: Fonts.poppinsMedium,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: Fontsize.xs4,
    marginTop: hp(0.5),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
    lineHeight: wp(5),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
    gap: wp(2.5),
  },
  statsCard: {
    flex: 1,
    backgroundColor: Colors.cloudGray,
    borderRadius: wp(2.8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
  },
  statsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  statsIcon: {
    width: wp(3),
    height: wp(3),
    marginRight: wp(1.5),
  },
  statsLabel: {
    fontSize: Fontsize.xm0,
    color: Colors.steelGray,
    fontFamily: Fonts.poppinsRegular,
  },
  statsValue: {
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
  },
  rateValue: {
    color: Colors.vividAmber,
  },
  breakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  breakTitle: {
    fontSize: Fontsize.xs4,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
  },
  breakCount: {
    fontSize:Fontsize.xs0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.ashGray,
  },
});
