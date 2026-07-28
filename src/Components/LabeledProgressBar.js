import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const TRACK_HEIGHT = hp(4);
const THUMB_SIZE = hp(4.2);
const THUMB_RADIUS = THUMB_SIZE / 2;
const REMAINING_WIDTH = wp(24);

const metricTextStyle = {
  fontFamily: Fonts.poppinsMedium,
  fontSize: Fontsize.xxs0,
  textAlign: 'center',
  includeFontPadding: false,
};

const LabeledProgressBar = props => {
  const [progressWidth, setProgressWidth] = useState(0);
  const fill = Math.min(1, Math.max(0, props.progress ?? 0));
  const percent = Math.round(props.achieved ?? fill * 100);
  const usableWidth = Math.max(progressWidth - THUMB_SIZE, 0);
  const thumbLeft = usableWidth * fill;
  // Keep the 0% circle visible; only draw green fill when progress > 0
  const fillWidth = fill > 0 ? thumbLeft + THUMB_RADIUS : 0;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.track,
          { backgroundColor: props.unfilledColor ?? Colors.darkNavy },
        ]}>
        <View
          style={styles.progressLane}
          onLayout={event =>
            setProgressWidth(event.nativeEvent.layout.width)
          }>
          {fillWidth > 0 ? (
            <View
              style={[
                styles.fill,
                {
                  width: fillWidth,
                  backgroundColor: props.color,
                },
              ]}
            />
          ) : null}

          <View style={[styles.thumbWrap, { left: thumbLeft }]}>
            <View style={[styles.thumb, { borderColor: props.color }]}>
              <Text style={[styles.thumbText, { color: props.color }]}>
                {percent}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.remainingBox}>
          <Text
            style={[
              styles.remainingText,
              { color: props.remainingTextColor ?? Colors.white },
            ]}
            numberOfLines={1}>
            {props.remainingText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LabeledProgressBar;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    paddingVertical: hp(0.5),
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: hp(2),
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderColor: 'rgba(255,255,255,0.15)',
  },
  progressLane: {
    flex: 1,
    height: TRACK_HEIGHT,
    position: 'relative',
    overflow: 'visible',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: hp(2),
    borderBottomLeftRadius: hp(2),
  },
  thumbWrap: {
    position: 'absolute',
    top: (TRACK_HEIGHT - THUMB_SIZE) / 2,
    zIndex: 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_RADIUS,
    backgroundColor: Colors.white,
    borderWidth: wp(0.55),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(0.6),
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: hp(0.3) },
    shadowOpacity: 0.2,
    shadowRadius: wp(1.2),
  },
  thumbText: {
    ...metricTextStyle,
    fontFamily: Fonts.poppinsBold,
  },
  remainingBox: {
    width: REMAINING_WIDTH,
    height: TRACK_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(1),
  },
  remainingText: {
    ...metricTextStyle,
  },
});
