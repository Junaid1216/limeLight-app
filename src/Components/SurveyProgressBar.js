import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const BAR_HEIGHT = hp(1.2);
const BAR_RADIUS = BAR_HEIGHT / 2;

const SurveyProgressBar = props => {
  const [barWidth, setBarWidth] = useState(0);

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

  const fillWidth = barWidth * Math.min(1, Math.max(0, progress));

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
          {isPercentageMode ? `${current}%` : `${current} of ${total}`}
        </Text>
      </View>

      <View
        style={[
          styles.track,
          barWidth > 0 && {
            width: barWidth,
            backgroundColor: unfilledColor,
          },
        ]}
        onLayout={event => setBarWidth(event.nativeEvent.layout.width)}
      >
        {fillWidth > 0 && (
          <View
            style={[
              styles.fill,
              {
                width: fillWidth,
                backgroundColor: color,
              },
            ]}
          />
        )}
      </View>
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
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    marginRight: wp(2.5),
  },
  track: {
    alignSelf: 'stretch',
    height: BAR_HEIGHT,
    borderRadius: BAR_RADIUS,
    overflow: 'hidden',
  },
  fill: {
    height: BAR_HEIGHT,
    borderRadius: BAR_RADIUS,
  },
});

export default SurveyProgressBar;
