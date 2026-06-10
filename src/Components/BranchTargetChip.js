import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const CHIP_WIDTH = wp((70 / 375) * 100);
const CHIP_HEIGHT = hp((38.99 / 812) * 100);
const UNITS_FONT_SIZE = wp((5.5 / 375) * 100);

const BranchTargetChip = ({ item }) => (
  <View style={styles.chip}>
    <View style={styles.headerRow}>
      <Text
        style={styles.weekLabel}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {item?.week}
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText} numberOfLines={1}>
          {item?.badge}
        </Text>
      </View>
    </View>
    <Text
      style={styles.unitsLine}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.8}
    >
      <Text style={styles.unitsValue} numberOfLines={1}>
        {item?.units}{' '}
      </Text>
      <Text style={styles.unitsLabel}>{Strings.unitsLabel.toLowerCase()}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(2),
    paddingHorizontal: wp(1.2),
    paddingVertical: hp(0.35),
    borderWidth: 1,
    borderColor: Colors.paleSlate,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.2),
    gap: wp(0.4),
  },
  weekLabel: {
    flex: 1,
    minWidth: 0,
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xxxxs,
    color: Colors.slateGrey,
    includeFontPadding: false,
  },
  badge: {
    flexShrink: 0,
    backgroundColor: Colors.lightBlue,
    borderRadius: wp(2),
    paddingHorizontal: wp(1.4),
    paddingVertical: hp(0.15),
  },
  badgeText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xxxxs,
    color: Colors.brightBlue,
    includeFontPadding: false,
  },
  unitsLine: {
    fontFamily: Fonts.poppinsBold,
    fontSize: UNITS_FONT_SIZE,
    color: Colors.black,
    includeFontPadding: false,
  },
  unitsValue: {
    fontFamily: Fonts.poppinsBold,
    fontSize: UNITS_FONT_SIZE,
    color: Colors.black,
  },
  unitsLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: UNITS_FONT_SIZE,
    color: Colors.mediumGrey,
  },
});

export default BranchTargetChip;
