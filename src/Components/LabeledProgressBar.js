import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const NARROW_BAR_THRESHOLD = 0.55;

const resolvePadding = (custom, progress, defaultValue) => {
  const value = custom ?? defaultValue;
  if (progress < NARROW_BAR_THRESHOLD) {
    return Math.min(value, wp(3));
  }
  return value;
};

const LabeledProgressBar = props => {
  const fill = Math.min(1, Math.max(0, props.progress ?? 0));
  const paddingLeft = resolvePadding(
    props.fillPaddingLeft,
    fill,
    wp(4.5),
  );
  const paddingRight = resolvePadding(
    props.fillPaddingRight,
    fill,
    wp(2.5),
  );

  return (
    <View style={[styles.track, { backgroundColor: props.unfilledColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${fill * 100}%`,
            backgroundColor: props.color,
            paddingLeft,
            paddingRight,
          },
        ]}>
        <Text
          style={styles.fillText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}>
          {props.achievedText}
        </Text>
      </View>

      <View style={styles.remainingWrap} pointerEvents="none">
        <Text
          style={[styles.remaining, { color: props.remainingTextColor }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}>
          {props.remainingText}
        </Text>
      </View>
    </View>
  );
};

export default LabeledProgressBar;

const styles = StyleSheet.create({
  track: {
    alignSelf: 'stretch',
    height: hp(3.8),
    borderRadius: hp(1.9),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    minWidth: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: hp(0.55),
    borderRadius: hp(1.9),
  },
  fillText: {
    flex: 1,
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xxs0,
    color: Colors.white,
  },
  remainingWrap: {
    position: 'absolute',
    right: wp(4),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  remaining: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xxs0,
    textAlign: 'right',
  },
});
