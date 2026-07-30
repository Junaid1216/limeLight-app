import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
  commission: wp(22),
};

export const ComparisonColumnsLayout = ({
  rank,
  name,
  target,
  commission,
  style,
}) => (
  <View style={[styles.columnsRow, style]}>
    <View style={[styles.rankCol, { width: COMPARISON_COLUMNS.rank }]}>{rank}</View>
    <View style={styles.nameCol}>{name}</View>
    <View style={styles.targetCol}>{target}</View>
    <View style={[styles.commissionCol, { width: COMPARISON_COLUMNS.commission }]}>
      {commission}
    </View>
  </View>
);

const BranchStaffComparisonRow = ({ member, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    onPress={() => onPress?.(member)}
  >
    <ComparisonColumnsLayout
      rank={
        <View style={styles.rankBadge}>
          <Text style={styles.rankText} numberOfLines={1}>
            {member?.rank}
          </Text>
        </View>
      }
      name={
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {member?.name}
        </Text>
      }
      target={
        <BranchStaffProgressBar
          achieved={member?.achieved}
          remaining={member?.remaining}
        />
      }
      commission={
        <Text
          style={styles.commission}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          {member?.commission}
        </Text>
      }
    />
  </Pressable>
);

const styles = StyleSheet.create({
  columnsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rankCol: {
    justifyContent: 'center',
    paddingTop: hp(0.15),
  },
  nameCol: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    paddingLeft: wp(1.5),
    paddingRight: wp(1),
  },
  targetCol: {
    width: wp(24),
    flexShrink: 0,
    paddingLeft: wp(0.5),
  },
  commissionCol: {
    width: COMPARISON_COLUMNS.commission,
    flexShrink: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: hp(0.15),
    paddingLeft: wp(0.5),
  },
  row: {
    paddingVertical: hp(0.55),
    paddingHorizontal: ROW_PAD_H,
  },
  rowPressed: {
    opacity: 0.6,
  },
  rankBadge: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.branchGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: Fontsize.x0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.white,
    lineHeight: Fontsize.x0,
  },
  name: {
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
    lineHeight: Fontsize.xs0 * 1.2,
    includeFontPadding: false,
    flexShrink: 1,
  },
  commission: {
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
    textAlign: 'right',
    flexShrink: 0,
    maxWidth: COMPARISON_COLUMNS.commission,
  },
});

export default BranchStaffComparisonRow;
