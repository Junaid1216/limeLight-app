import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SurveyProgressBar from './SurveyProgressBar';
import { Fonts } from '../Constants/Fonts';
import { wp } from '../Assets/Responsive';

const SatisficationSurveyComponent = props => {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconBox}>
            {/* <Text style={{ fontSize: 16 }}>📊</Text> */}
            <Image
              source={require('../Assets/Icons/ReportSurvey.png')}
              style={{ width: 18, height: 18 }}
            />
          </View>

          <View>
            <Text style={styles.report}>{props?.reportText ?? 'REPORT'}</Text>

            <Text style={styles.mainTitle}>
              {props?.reportTitle ?? 'Price Satisfaction Survey'}
            </Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{props?.status ?? 'Active'}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* TITLE */}
      <Text style={styles.label} numberOfLines={1}>
        TITLE
      </Text>

      <Text style={styles.title} numberOfLines={1}>
        {props?.title ?? 'Monthly Employee Satisfaction Survey'}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../Assets/Icons/Question.png')}
              style={{ width: 12, height: 12, marginRight: 5 }}
            />
            <Text style={styles.statsLabel}>Questions</Text>
          </View>

          <Text style={styles.statsValue}>{props?.questions ?? 2}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../Assets/Icons/ResponseRate.png')}
              style={{ width: 12, height: 12, marginRight: 5 }}
            />
            <Text style={styles.statsLabel}>Response Rate</Text>
          </View>

          <Text style={[styles.statsValue, { color: '#F59E0B' }]}>
            {props?.responseRate ?? '75%'}
          </Text>
        </View>
      </View>

      {/* BREAKDOWN */}
      <View style={styles.breakRow}>
        <Text style={styles.breakTitle}>Response Breakdown</Text>

        <Text style={styles.breakCount}>
          {props?.responses ?? '8 responses'}
        </Text>
      </View>

      {/* PROGRESS */}
      <SurveyProgressBar title="High" current={25} color="#2F6FED" />

      <SurveyProgressBar title="Fair" current={60} color="#2BC48A" />

      <SurveyProgressBar title="Low" current={15} color="#F4A11A" />
    </View>
  );
};

export default SatisficationSurveyComponent;

const styles = StyleSheet.create({
  //   card: {
  //     margin: 16,
  //     padding: 16,
  //     borderRadius: 18,
  //     backgroundColor: '#FFFFFF',
  //     borderWidth: 1,
  //     borderColor: '#E5E7EB',
  //   },
  card: {
    margin: 16,
    marginTop: 0, // 👈 yaha value kam karo (upar move hoga)
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E9FBF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  report: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  mainTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  badge: {
    backgroundColor: '#E9FBF3',

    borderRadius: 20,
    width: 46,
    height: 28,
  },

  badgeText: {
    color: '#10B981',
    fontSize: 10,
    fontFamily: Fonts.poppinsRegular,
    marginLeft: wp(2),
    marginTop: wp(1.7),
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },

  label: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: Fonts.poppinsRegular,
    letterSpacing: 1,
  },

  title: {
    fontSize: 14,
    // fontWeight: '700',
    marginTop: 4,
    fontFamily: Fonts.poppinsSemiBold,
    color: '#111827',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  statsCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    // padding: 7,
    borderRadius: 11,
    height: wp(17),
  },

  statsLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: Fonts.poppinsRegular,

    marginTop: wp(5),
  },

  statsValue: {
    fontSize: 18,
    fontWeight: '700',
    // marginTop: 6,
    color: '#111827',
  },

  breakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 12,
  },

  breakTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  breakCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
