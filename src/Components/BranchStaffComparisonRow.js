import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BranchStaffProgressBar from './BranchStaffProgressBar';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { hp, wp } from '../Assets/Responsive';

export const TABLE_SIDE_INSET = wp(0.5);
export const TABLE_PAD = wp(2.5);
export const ROW_PAD_H = TABLE_SIDE_INSET + TABLE_PAD;

export const COMPARISON_COLUMNS = {
  rank: wp(8),
  name: wp(13),
  commission: wp(18),
};

export const ComparisonColumnsLayout = ({
  rank,
  name,
  target,
  commission,
  style,
}) => (
  <View style={[styles.columnsRow, style]}>
    <View style={styles.rankCol}>{rank}</View>
    <View style={styles.nameCol}>{name}</View>
    <View style={styles.targetCol}>{target}</View>
    <View style={styles.commissionCol}>{commission}</View>
  </View>
);

const BranchStaffComparisonRow = ({ member, showBorder }) => (
  <View style={[styles.row, showBorder && styles.border]}>
    <ComparisonColumnsLayout
      rank={
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{member.rank}</Text>
        </View>
      }
      name={
        <Text style={styles.name} numberOfLines={1}>
          {member.name}
        </Text>
      }
      target={
        <BranchStaffProgressBar
          achieved={member.achieved}
          remaining={member.remaining}
        />
      }
      commission={
        <Text style={styles.commission} numberOfLines={1}>
          {member.commission}
        </Text>
      }
    />
  </View>
);

const styles = StyleSheet.create({
  columnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankCol: {
    width: COMPARISON_COLUMNS.rank,
    justifyContent: 'center',
  },
  nameCol: {
    width: COMPARISON_COLUMNS.name,
  },
  targetCol: {
    flex: 1,
    flexShrink: 1,
    paddingLeft: wp(1.2),
    marginRight: wp(0.5),
  },
  commissionCol: {
    width: COMPARISON_COLUMNS.commission,
    flexShrink: 0,
    alignItems: 'flex-end',
    paddingRight: wp(0.3),
  },
  row: {
    paddingVertical: hp(1.1),
    paddingHorizontal: ROW_PAD_H,
  },
  border: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.rowDivider,
  },
  rankBadge: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(2.25),
    backgroundColor: Colors.branchGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: Fontsize.xxxxs,
    fontFamily: Fonts.poppinsBold,
    color: Colors.white,
  },
  name: {
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
  },
  commission: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
    textAlign: 'right',
    flexShrink: 0,
  },
});

export default BranchStaffComparisonRow;
