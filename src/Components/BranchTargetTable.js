import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { hp, wp } from '../Assets/Responsive';
import { Strings } from '../Constants/Strings';

const ValueBox = ({ value }) => (
  <View style={styles.valueBox}>
    <Text style={[styles.valueText, value === 0 && styles.valueTextZero]}>
      {value}
    </Text>
  </View>
);

const TargetRow = ({ member, showBorder }) => (
  <View style={[styles.dataRow, showBorder && styles.rowBorder]}>
    <Text style={styles.nameText} numberOfLines={1}>
      {member.name}
    </Text>

    <View style={styles.valuesRow}>
      <ValueBox value={member.garments} />
      <ValueBox value={member.unstitched} />
      <ValueBox value={member.accessories} />
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={styles.headerName}>{Strings.tableName}</Text>

    <View style={styles.valuesRow}>
      <Text style={styles.headerCell} numberOfLines={1}>
        {Strings.tableGarments}
      </Text>
      <Text style={styles.headerCell} numberOfLines={1}>
        {Strings.tableUnstitched}
      </Text>
      <Text style={styles.headerCell} numberOfLines={1}>
        {Strings.tableAccessShort}
      </Text>
    </View>
  </View>
);

const TableFooter = ({ totals }) => (
  <View style={styles.totalRow}>
    <Text style={styles.totalLabel}>{Strings.total}</Text>

    <View style={styles.valuesRow}>
      <View style={styles.totalBox}>
        <Text style={styles.totalValue}>{totals.garments}</Text>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalValue}>{totals.unstitched}</Text>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalValue}>{totals.accessories}</Text>
      </View>
    </View>
  </View>
);

const BranchTargetTable = ({ staff, totals }) => {
  const renderItem = ({ item, index }) => (
    <TargetRow member={item} showBorder={index < staff.length - 1} />
  );

  return (
    <View style={styles.table}>
      <FlatList
        data={staff}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={TableHeader}
        ListFooterComponent={() => <TableFooter totals={totals} />}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: hp(1.5),
    borderRadius: wp(3),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3),
  },
  headerName: {
    flex: 1.3,
    fontSize: Fontsize.x0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.ashGray,
    textAlign: 'left',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fontsize.x00,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.ashGray,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.1),
    paddingHorizontal: wp(2),
  },
  rowBorder: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.lightGray,
  },
  nameText: {
    flex: 1.3,
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
  valuesRow: {
    flex: 2.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueBox: {
    flex: 1,

    width: wp(12.3),
    height: wp(7.4),
    marginHorizontal: wp(2),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    borderRadius: wp(2),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: Fontsize.xs00,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
  },
  valueTextZero: {
    color: Colors.ashGray,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mintLight,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
  },
  totalLabel: {
    flex: 1.3,
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsBold,
    color: Colors.black,
  },
  totalBox: {
    flex: 1,
    width: wp(12.3),
    height: wp(7.4),
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    backgroundColor: Colors.mintGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.white,
  },
});

export default BranchTargetTable;
