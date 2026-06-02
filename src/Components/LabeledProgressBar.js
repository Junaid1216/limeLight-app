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
  const empty = 1 - fill;
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
    <View style={styles.row}>
      <View style={[styles.track, { backgroundColor: props.unfilledColor }]}>
        <View style={styles.barRow}>
          <View
            style={[
              styles.fill,
              {
                flex: fill,
                backgroundColor: props.color,
                paddingLeft,
                paddingRight,
              },
            ]}>
            <Text
              style={styles.fillText}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}>
              {props.achievedText}
            </Text>
          </View>
          <View style={{ flex: empty }} />
        </View>
      </View>

      <Text
        style={[styles.remaining, { color: props.remainingTextColor }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}>
        {props.remainingText}
      </Text>
    </View>
  );
};

export default LabeledProgressBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  track: {
    flex: 1,
    height: hp(3.8),
    borderRadius: hp(1.9),
    overflow: 'hidden',
  },
  barRow: {
    flexDirection: 'row',
    width: '100%',
    height: hp(3.8),
  },
  fill: {
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: hp(0.55),
    borderRadius: hp(1.9),
  },
  fillText: {
    width: '100%',
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xxm,
    color: Colors.white,
  },
  remaining: {
    flexShrink: 0,
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xxm,
    textAlign: 'right',
    paddingRight: wp(5),
    maxWidth: wp(28),
  },
});
