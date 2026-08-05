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
import { getEmployeeNameLabel } from '../Constants/roleConfig';
import { Strings } from '../Constants/Strings';
import { useRole } from '../Context/RoleContext';

const ListHeader = () => {
  const { role } = useRole();

  return (
    <>
      <View style={styles.topRow}>
        <Text style={styles.sectionTitle} numberOfLines={1}>
          {Strings.staffComparisonHeader}
        </Text>

        <View style={styles.legendWrap}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.achievedDot]} />
            <Text style={styles.legendText} numberOfLines={1}>
              {Strings.achievedLabel}
            </Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.remainingDot]} />
            <Text style={styles.legendText} numberOfLines={1}>
              {Strings.remainingLabel}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.headerShell}>
        <ComparisonColumnsLayout
          style={styles.headerColumns}
          rank={
            <Text style={styles.headerText} numberOfLines={1}>
              {Strings.rank}
            </Text>
          }
          name={
            <Text style={styles.headerText} numberOfLines={1}>
              {/* {getEmployeeNameLabel(role)} */}
              Name
            </Text>
          }
          target={
            <Text style={[styles.headerText, styles.targetHeader]} numberOfLines={1}>
              {Strings.target}
            </Text>
          }
          commission={
            <Text style={[styles.headerText, styles.commissionHeader]} numberOfLines={1}>
              {Strings.commission}
            </Text>
          }
        />
      </View>
    </>
  );
};

const BranchStaffComparisonTable = ({ staff, onStaffPress }) => (
  <View style={styles.table}>
    <FlatList
      data={staff}
      keyExtractor={item => String(item?.id)}
      scrollEnabled={false}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      renderItem={({ item }) => (
        <BranchStaffComparisonRow member={item} onPress={onStaffPress} />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  table: {
    marginTop: hp(1),
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
    paddingTop: hp(0.9),
    paddingBottom: hp(0.6),
  },
  sectionTitle: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
    flexShrink: 1,
    marginRight: wp(1.5),
    lineHeight: Fontsize.sm * 1.15,
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
    lineHeight: Fontsize.x0 * 1.1,
  },
  headerShell: {
    marginHorizontal: TABLE_SIDE_INSET,
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(3),
    paddingVertical: hp(0.75),
    paddingHorizontal: TABLE_PAD,
    marginBottom: hp(0.35),
    borderBottomWidth: wp(0.2),
    borderBottomColor: Colors.rowDivider,
  },
  headerColumns: {
    alignSelf: 'stretch',
  },
  headerText: {
    fontSize: Fontsize.xm0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.steelGray,
    lineHeight: Fontsize.xm0 * 1.1,
  },
  targetHeader: {
    alignSelf: 'stretch',
    paddingLeft: wp(2),
    textAlign: 'left',
  },
  commissionHeader: {
    alignSelf: 'stretch',
    textAlign: 'right',
    flexShrink: 0,
    paddingRight: wp(0.3),
    lineHeight: Fontsize.xm0,
  },
  listContent: {
    paddingBottom: hp(0.35),
  },
  rowSeparator: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.rowDivider,
    marginHorizontal: ROW_PAD_H,
  },
});

export default BranchStaffComparisonTable;
