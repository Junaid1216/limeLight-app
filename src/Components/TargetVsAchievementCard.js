import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LabeledProgressBar from './LabeledProgressBar';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import {
  accessoriesTarget,
  garmentsTarget,
  unstitchedTarget,
} from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const ProgressRow = props => {
  const remaining = props.remaining ?? 100 - props.achieved;

  return (
    <View style={styles.progressRow}>
      <Text style={styles.categoryLabel} numberOfLines={1}>
        {props.categoryName}
      </Text>
      <LabeledProgressBar
        progress={props.achieved / 100}
        color={props.barColor}
        unfilledColor={Colors.darkNavy}
        fillPaddingLeft={props.fillPaddingLeft}
        fillPaddingRight={props.fillPaddingRight}
        achievedText={props.achieved + Strings.percentAchieved}
        remainingText={remaining + Strings.percentRemaining}
        remainingTextColor={Colors.white}
      />
    </View>
  );
};

const TargetVsAchievementCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {Strings.targetVsAchievement}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {Strings.targetVsAchievementSub}
      </Text>

      <View style={styles.progressList}>
        <ProgressRow {...garmentsTarget} />
        <ProgressRow {...unstitchedTarget} />
        <ProgressRow {...accessoriesTarget} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkNavy,
    borderRadius: wp(7.5),
    paddingHorizontal: wp(5),
    paddingTop: hp(2.2),
    paddingBottom: hp(2.9),
    marginTop: -hp(0.25),
    marginBottom: hp(2),
  },
  title: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.white,
    marginTop: -hp(0),
  },
  subtitle: {
    fontFamily: Fonts.poppinsBold,
    marginTop: hp(0),
    marginBottom: hp(2),
    color: Colors.blueGrey,
    fontSize: Fontsize.xs1,
  },
  progressList: {
    gap: hp(2.5),
  },
  progressRow: {
    gap: hp(1),
  },
  categoryLabel: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs2,
    color: Colors.white,
  },
});

export default TargetVsAchievementCard;
