import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import BranchStaffComparisonRow, {
  ComparisonColumnsLayout,
  ROW_PAD_H,
  TABLE_PAD,
  TABLE_SIDE_INSET,
} from './BranchStaffComparisonRow';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { hp, wp } from '../Assets/Responsive';
import { Strings } from '../Constants/Strings';

const BranchStaffComparisonTable = ({ staff }) => {
  const renderItem = ({ item, index }) => (
    <BranchStaffComparisonRow
      member={item}
      showBorder={index < staff.length - 1}
    />
  );

  return (
    <View style={styles.table}>
      <View style={styles.topRow}>
        <Text style={styles.sectionTitle}>{Strings.staffComparisonHeader}</Text>

        <View style={styles.legendWrap}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.achievedDot]} />
            <Text style={styles.legendText}>{Strings.achievedLabel}</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.remainingDot]} />
            <Text style={styles.legendText}>{Strings.remainingLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.headerShell}>
        <ComparisonColumnsLayout
          style={styles.headerColumns}
          rank={<Text style={styles.headerText}>{Strings.rank}</Text>}
          name={<Text style={styles.headerText}>{Strings.name}</Text>}
          target={
            <Text style={[styles.headerText, styles.targetHeader]}>
              {Strings.target}
            </Text>
          }
          commission={
            <Text
              style={[styles.headerText, styles.commissionHeader]}
              numberOfLines={1}
            >
              {Strings.commission}
            </Text>
          }
        />
      </View>

      <FlatList
        data={staff}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: hp(1.5),
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: wp(3),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ROW_PAD_H,
    paddingTop: hp(1.6),
    paddingBottom: hp(1.2),
  },
  sectionTitle: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
    flexShrink: 1,
    marginRight: wp(1.5),
  },
  legendWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: wp(2),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    marginRight: wp(0.8),
  },
  achievedDot: {
    backgroundColor: Colors.green,
  },
  remainingDot: {
    backgroundColor: Colors.amber,
  },
  legendText: {
    fontSize: Fontsize.x0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.steelGray,
  },
  headerShell: {
    marginHorizontal: TABLE_SIDE_INSET,
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(3),
    paddingVertical: hp(1.15),
    paddingHorizontal: TABLE_PAD,
    marginBottom: hp(0.5),
  },
  headerColumns: {
    width: '100%',
  },
  headerText: {
    fontSize: Fontsize.xm0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.slateGrey,
  },
  targetHeader: {
    paddingLeft: wp(1.2),
  },
  commissionHeader: {
    textAlign: 'right',
    flexShrink: 0,
    paddingRight: wp(0.3),
  },
  listContent: {
    paddingBottom: hp(0.8),
  },
});

export default BranchStaffComparisonTable;
