import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { commissionData } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const StatBox = ({ label, value, backgroundColor, borderColor }) => (
  <View style={[styles.statBox, { backgroundColor, borderColor }]}>
    <Text style={styles.statLabel} numberOfLines={1}>
      {label}
    </Text>
    <Text style={styles.statValue} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const CommissionCard = () => {
  const { target, sale, commission, achieved, remaining } = commissionData;
  const fill = achieved / 100;
  const empty = remaining / 100;

  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {Strings.commission}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {Strings.commissionSub}
      </Text>

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
        <View style={styles.barRow}>
          <View
            style={[
              styles.achievedSegment,
              { flex: fill, backgroundColor: Colors.emerald },
            ]}
          >
            <Text
              style={[styles.barText, styles.barTextLeft]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {achieved}
              {Strings.percentAchieved}
            </Text>
          </View>
          <View style={[styles.remainingSegment, { flex: empty }]}>
            <Text
              style={[styles.barText, styles.barTextRight]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {remaining}
              {Strings.percentRemaining}
            </Text>
          </View>
        </View>
      </View>
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
    fontSize: Fontsize.xm1,
    color: Colors.black,
  },
  subtitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs0,
    color: Colors.steelGray,
    marginBottom: hp(2),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(2),
    marginBottom: hp(2),
  },
  statBox: {
    flex: 1,
    borderRadius: wp(2.5),
    borderWidth: 1,
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
  },
  barRow: {
    flexDirection: 'row',
    width: wp(78),
    height: hp(3.1),
  },
  achievedSegment: {
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: wp(3),
    paddingRight: wp(2),
    paddingVertical: hp(0.4),
    borderRadius: hp(1.55),
    overflow: 'hidden',
  },
  remainingSegment: {
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: wp(2),
    paddingRight: wp(3),
    paddingVertical: hp(0.4),
  },
  barText: {
    width: '100%',
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
