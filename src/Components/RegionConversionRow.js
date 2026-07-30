import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const BAR_WIDTH = 70;

const RegionConversionRow = props => (
  <View style={styles.row}>
    <View style={styles.rankCircle}>
      <Text style={styles.rankText} numberOfLines={1}>
        {props?.rank}
      </Text>
    </View>

    <View style={styles.nameColumn}>
      <Text style={styles.regionName} numberOfLines={2}>
        {props?.name}
      </Text>
    </View>

    <View style={styles.trafficCell}>
      <View style={styles.barLine}>
        <Progress.Bar
          progress={Math.min((props?.traffic ?? 0) / 100, 1)}
          width={BAR_WIDTH}
          height={6}
          color="#20C997"
          unfilledColor={Colors.inputGrey}
          borderWidth={0}
          borderRadius={6}
        />
        <Text style={styles.smallValue} numberOfLines={1}>
          {props?.traffic}
        </Text>
      </View>

      <View style={styles.barLine}>
        <Progress.Bar
          progress={Math.min((props?.invoices ?? 0) / 20, 1)}
          width={BAR_WIDTH}
          height={6}
          color={Colors.orange}
          unfilledColor={Colors.inputGrey}
          borderWidth={0}
          borderRadius={6}
        />
        <Text style={styles.smallValue} numberOfLines={1}>
          {props?.invoices}
        </Text>
      </View>
    </View>

    <View style={styles.percentageBox}>
      <Text style={styles.percentageText} numberOfLines={1}>
        {props?.conv}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1.4),
    alignSelf: 'stretch',
  },
  rankCircle: {
    width: wp(6.5),
    height: wp(6.2),
    borderRadius: wp(5.4),
    backgroundColor: '#20C997',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.6),
    flexShrink: 0,
  },
  rankText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.4),
    color: Colors.white,
  },
  nameColumn: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginLeft: wp(2),
  },
  regionName: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.s,
    color: Colors.charcoalText,
    marginTop: hp(2.2),
    lineHeight: Fontsize.s * 1.1,
    includeFontPadding: false,
  },
  trafficCell: {
    width: wp(30),
    marginLeft: wp(1),
    paddingHorizontal: wp(0.5),
    paddingVertical: hp(0.8),
    flexShrink: 0,
  },
  barLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  smallValue: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: Colors.charcoalText,
    marginLeft: wp(2),
  },
  percentageBox: {
    width: wp(14),
    minWidth: wp(14),
    flexShrink: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: wp(1),
    marginTop: hp(2.2),
  },
  percentageText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.black,
    includeFontPadding: false,
    textAlign: 'right',
  },
});

export default RegionConversionRow;
