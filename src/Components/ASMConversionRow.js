import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const ASMConversionRow = ({ item }) => (
  <View style={styles.row}>
    <View style={styles.rankCircle}>
      <Text style={styles.rankText} numberOfLines={1}>
        {item?.rank}
      </Text>
    </View>

    <View style={styles.rowBody}>
      <View style={styles.nameColumnBody}>
        <Text style={styles.branchName} numberOfLines={2}>
          {item?.name}
        </Text>
      </View>

      <View style={styles.trafficCell}>
        <View style={styles.barLine}>
          <Progress.Bar
            progress={Math.min((item?.traffic ?? 0) / 100, 1)}
            width={70}
            height={6}
            color="#20C997"
            unfilledColor={Colors.inputGrey}
            borderWidth={0}
            borderRadius={6}
          />
          <Text style={styles.smallValue} numberOfLines={1}>
            {item?.traffic}
          </Text>
        </View>

        <View style={styles.barLine}>
          <Progress.Bar
            progress={Math.min((item?.invoices ?? 0) / 20, 1)}
            width={70}
            height={6}
            color={Colors.orange}
            unfilledColor={Colors.inputGrey}
            borderWidth={0}
            borderRadius={6}
          />
          <Text style={styles.smallValue} numberOfLines={1}>
            {item?.invoices}
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.percentageBox}>
      <Text style={styles.percentageText} numberOfLines={1}>
        {item?.conv}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(1),
  },
  rankCircle: {
    width: 27,
    height: 27,
    borderRadius: wp(5.4),
    backgroundColor: '#20C997',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(1),
    marginTop: hp(1.6),
  },
  rankText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.4),
    color: Colors.white,
  },
  rowBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp(3),
  },
  nameColumnBody: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  trafficCell: {
    width: wp(30),
    marginLeft: wp(1),
    borderRadius: wp(1.5),
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.8),
    flexShrink: 0,
  },
  branchName: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.s,
    color: Colors.charcoalText,
    marginBottom: hp(0.8),
    marginLeft: wp(1),
    marginTop: hp(2.2),
  },
  smallValue: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: Colors.charcoalText,
    marginLeft: wp(2),
  },
  barLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: hp(0.8),
  },
  percentageBox: {
    width: wp(14),
    minWidth: wp(14),
    flexShrink: 0,
    alignItems: 'flex-end',
    marginLeft: wp(1),
    marginTop: hp(2.2),
    paddingRight: wp(0.5),
  },
  percentageText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.black,
    textAlign: 'right',
  },
});

export default ASMConversionRow;
