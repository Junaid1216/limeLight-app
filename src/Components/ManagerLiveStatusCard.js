import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const EMPTY_SUMMARY = {
  branchMonthlyTarget: 0,
  achieved: 0,
  remaining: 0,
  commission: 0,
  achievedPercent: 0,
  remainingPercent: 0,
};

const clampPercent = value =>
  Math.min(100, Math.max(0, Math.round(Number(value) || 0)));

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

const ManagerLiveStatusCard = ({ data }) => {
  const summary = data ?? EMPTY_SUMMARY;

  const achievedPercent = clampPercent(summary.achievedPercent);
  const remainingPercent = clampPercent(
    summary.remainingPercent != null && summary.remainingPercent !== ''
      ? summary.remainingPercent
      : 100 - achievedPercent,
  );
  const progress = achievedPercent / 100;

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
          <StatItem
            label={Strings.branchMonthlyTarget}
            value={summary.branchMonthlyTarget}
          />
          <StatItem
            label={Strings.achievedLabel}
            value={summary.achieved}
            alignRight
          />
        </View>
        <View style={styles.statsRow}>
          <StatItem label={Strings.remainingLabel} value={summary.remaining} />
          <StatItem
            label={Strings.commission}
            value={summary.commission}
            alignRight
          />
        </View>
      </View>

      <Text style={styles.progressLabel} numberOfLines={1}>
        {Strings.achievedLabel}
      </Text>

      <View style={styles.combinedBar}>
        <View style={styles.barTrack}>
          {progress > 0 ? (
            <View style={[styles.achievedFill, { width: `${achievedPercent}%` }]} />
          ) : null}
        </View>
        <View style={styles.barLabels} pointerEvents="none">
          <Text
            style={[styles.barText, styles.barTextLeft]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {achievedPercent}
            {Strings.percentAchieved}
          </Text>
          <Text
            style={[styles.barText, styles.barTextRight]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {remainingPercent}
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
  combinedBar: {
    height: hp(3.1),
    borderRadius: hp(1.55),
    backgroundColor: Colors.darkSlate,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  barTrack: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  achievedFill: {
    height: '100%',
    backgroundColor: Colors.emerald,
    borderRadius: hp(1.55),
  },
  barLabels: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  barText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xm2,
    color: Colors.white,
  },
  barTextLeft: {
    textAlign: 'left',
  },
  barTextRight: {
    textAlign: 'right',
  },
});

export default ManagerLiveStatusCard;
