import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const BAR_HEIGHT = hp(2.8);
const UNITS_FONT_SIZE = wp((5.5 / 375) * 100);

const WeeklyPerformanceItem = ({ item }) => {
  const progress = Math.min(1, Math.max(0, item?.progress ?? 0));
  const percent = item?.percent ?? Math.round(progress * 100);

  return (
    <View style={styles.column}>
      <Text style={styles.weekLabel} numberOfLines={1}>
        {item?.week}
      </Text>

      <View style={styles.progressWrap}>
        <Progress.Bar
          progress={progress}
          width={null}
          color={Colors.branchGreen}
          unfilledColor={Colors.darkSlate}
          borderWidth={0}
          height={BAR_HEIGHT}
          borderRadius={BAR_HEIGHT / 2}
          animated={false}
          style={styles.progressBar}
        />
        <Text
          style={styles.barPercent}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          {percent}%
        </Text>
      </View>

      <Text style={styles.unitsText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {item?.units} {Strings.unitsLabel}
      </Text>

      <Text
        style={[styles.statusText, { color: item?.statusColor ?? Colors.black }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {item?.status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    minWidth: 0,
    alignItems: 'stretch',
  },
  weekLabel: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xm1,
    color: Colors.graphite,
    marginBottom: hp(0.55),
    textAlign: 'left',
    includeFontPadding: false,
  },
  progressWrap: {
    alignSelf: 'stretch',
    height: BAR_HEIGHT,
    position: 'relative',
    marginBottom: hp(0.65),
  },
  progressBar: {
    alignSelf: 'stretch',
  },
  barPercent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xxxxs,
    color: Colors.white,
    includeFontPadding: false,
    lineHeight: BAR_HEIGHT,
  },
  unitsText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: UNITS_FONT_SIZE,
    color: Colors.black,
    marginBottom: hp(0.4),
    textAlign: 'left',
    includeFontPadding: false,
  },
  statusText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xxxxs,
    includeFontPadding: false,
    textAlign: 'left',
  },
});

export default WeeklyPerformanceItem;
