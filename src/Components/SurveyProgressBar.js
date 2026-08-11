import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const BAR_SIZE = 10;

const SurveyProgressBar = props => {
  const current = props?.current ?? 0;
  const total = props?.total;
  const color = props?.color ?? Colors.amber;
  const unfilledColor =
    props?.unfilledColor ??
    (props?.color ? Colors.platinum : Colors.surveyProgressTrack);

  const isPercentageMode = total === undefined || total === null;

  const progress = isPercentageMode
    ? current / 100
    : total > 0
      ? current / total
      : 0;

  return (
    <View style={styles.section}>
      <View style={styles.topRow}>
        <View style={styles.leftRow}>
          <View style={[styles.dot, { backgroundColor: color }]} />

          <Text style={styles.surveyName} numberOfLines={1}>
            {props?.title}
          </Text>
        </View>

        <Text
          style={[
            styles.stepText,
            isPercentageMode && {
              color: color,
              fontFamily: Fonts.poppinsSemiBold,
            },
          ]}
        >
          {props?.progressLabel ||
            (isPercentageMode ? `${current}%` : `${current} of ${total}`)}
        </Text>
      </View>

      <Progress.Bar
        progress={Math.min(1, Math.max(0, progress))}
        width={null}
        height={BAR_SIZE}
        color={color}
        unfilledColor={unfilledColor}
        borderWidth={0}
        borderRadius={BAR_SIZE / 2}
        animated={false}
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: hp(1.5),
    alignSelf: 'stretch',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(0.8),
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  surveyName: {
    flexShrink: 1,
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
  },
  stepText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    flexShrink: 0,
    marginLeft: wp(2),
  },
  dot: {
    width: BAR_SIZE,
    height: BAR_SIZE,
    borderRadius: BAR_SIZE / 2,
    marginRight: wp(2.5),
  },
  progressBar: {
    alignSelf: 'stretch',
  },
});

export default SurveyProgressBar;
