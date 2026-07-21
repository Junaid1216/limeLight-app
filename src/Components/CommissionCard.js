import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { commissionData } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const MIN_ACHIEVED_FILL_PERCENT = 8;

const StatBox = props => (
  <View
    style={[
      styles.statBox,
      {
        backgroundColor: props?.backgroundColor,
        borderColor: props?.borderColor,
      },
    ]}
  >
    <Text style={styles.statLabel} numberOfLines={1}>
      {props?.label}
    </Text>

    <Text style={styles.statValue} numberOfLines={1}>
      {props?.value}
    </Text>
  </View>
);

const CommissionCard = ({ data = commissionData, isLoading }) => {
  const { target, sale, commission, achieved, remaining } = data;
  const achievedPercent = Math.min(
    100,
    Math.max(0, Number(achieved) || 0),
  );
  const remainingPercent = Math.min(
    100,
    Math.max(0, Number(remaining) ?? 100 - achievedPercent),
  );
  const fillPercent =
    achievedPercent === 0
      ? MIN_ACHIEVED_FILL_PERCENT
      : achievedPercent;

  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {Strings.commission}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {Strings.commissionSub}
      </Text>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={Colors.darkNavy} size="small" />
        </View>
      ) : (
        <>
          <View style={styles.statsRow}>
            <StatBox
              label={Strings.targetStat}
              value={target}
              backgroundColor={Colors.mintCream}
              borderColor={Colors.green}
            />
            <StatBox
              label={Strings.saleStat}
              value={sale}
              backgroundColor={Colors.aliceBlue}
              borderColor={Colors.cerulean}
            />
            <StatBox
              label={Strings.commissionStat}
              value={commission}
              backgroundColor={Colors.cornsilk}
              borderColor={Colors.pumpkin}
            />
          </View>

          <View style={styles.combinedBar}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.achievedFill,
                  { width: `${fillPercent}%` },
                ]}
              />
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(6.5),
    borderWidth: 1,
    borderColor: Colors.paleSlate,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2.5),
    marginBottom: hp(2.5),
  },
  title: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  subtitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs0,
    color: Colors.steelGray,
    marginBottom: hp(2),
  },
  loaderContainer: {
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(2),
    marginBottom: hp(2),
  },
  statBox: {
    flex: 1,
    borderRadius: wp(2.5),
    borderWidth: wp(0.5),
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(1.5),
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: Fonts.poppinsBold,
    color: Colors.blueGrey,
    marginBottom: hp(0.1),
    fontSize: Fontsize.xm0,
  },
  statValue: {
    fontFamily: Fonts.poppinsBold,
    color: Colors.black,
    fontSize: Fontsize.xx0,
  },
  combinedBar: {
    height: hp(3.1),
    borderRadius: hp(1.55),
    backgroundColor: Colors.darkNavy,
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
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xxm,
    color: Colors.white,
  },
  barTextLeft: {
    textAlign: 'left',
  },
  barTextRight: {
    textAlign: 'right',
  },
});

export default CommissionCard;
