import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { managerPerformanceSummary } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const StatItem = ({ label, value, alignRight = false }) => (
  <View style={[styles.statItem, alignRight && styles.statItemRight]}>
    <Text
      style={[styles.statLabel, alignRight && styles.statTextRight]}
      numberOfLines={1}
    >
      {label}
    </Text>
    <Text
      style={[styles.statValue, alignRight && styles.statTextRight]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const ManagerLiveStatusCard = () => {
  const data = managerPerformanceSummary;
  const progress = Math.min(1, Math.max(0, data.achievedPercent / 100));

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.liveStatus}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText} numberOfLines={1}>
            {Strings.liveStatus}
          </Text>
        </View>
        <Image
          source={Images.LiveStatus}
          style={styles.liveStatusIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <StatItem label={Strings.branchMonthlyTarget} value={data.branchMonthlyTarget} />
          <StatItem
            label={Strings.achievedLabel}
            value={data.achieved}
            alignRight
          />
        </View>
        <View style={styles.statsRow}>
          <StatItem label={Strings.remainingLabel} value={data.remaining} />
          <StatItem label={Strings.commission} value={data.commission} alignRight />
        </View>
      </View>

      <Text style={styles.progressLabel} numberOfLines={1}>
        {Strings.achievedLabel}
      </Text>
      <View style={styles.progressWrap}>
        <Progress.Bar
          progress={progress}
          width={null}
          color={Colors.emerald}
          unfilledColor={Colors.darkSlate}
          borderWidth={0}
          height={hp(3.1)}
          borderRadius={hp(1.55)}
          animated={false}
          style={styles.progressBar}
        />
        <View style={styles.barLabelRow} pointerEvents="none">
          <Text
            style={styles.barText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {data.achievedPercent}
            {Strings.percentAchieved}
          </Text>
          <Text
            style={styles.barText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {data.remainingPercent}
            {Strings.percentRemaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkNavy,
    borderRadius: wp(5),
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2),
    paddingBottom: hp(2.2),
    marginBottom: hp(2.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  liveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  liveDot: {
    width: wp(2.2),
    height: wp(2.2),
    borderRadius: wp(1.1),
    backgroundColor: Colors.emerald,
  },
  liveText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs1,
    color: Colors.emerald,
  },
  liveStatusIcon: {
    width: wp(3.5),
    height: wp(3.5),
  },
  statsGrid: {
    marginBottom: hp(2),
    gap: hp(1.8),
  },
  statsRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
  },
  statItemRight: {
    alignItems: 'flex-end',
    paddingRight: wp(3),
  },
  statTextRight: {
    textAlign: 'right',
  },
  statLabel: {
    fontFamily: Fonts.poppinsBold,
    // fontSize: 13.33,
    fontSize: wp(3.1),
    color: Colors.white,
    marginBottom: hp(0.3),
  },
  statValue: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.white,
  },
  progressLabel: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs1,
    color: Colors.vividAmber,
    marginBottom: hp(0.8),
  },
  progressWrap: {
    height: hp(3.1),
    position: 'relative',
  },
  progressBar: {
    alignSelf: 'stretch',
  },
  barLabelRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  barText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.white,
  },
});

export default ManagerLiveStatusCard;
