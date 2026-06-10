import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RegionConversionRow from './RegionConversionRow';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.rankColumn]}>{Strings.rank}</Text>
    <Text style={[styles.headerText, styles.nameColumn]}>{Strings.name}</Text>
    <Text style={[styles.headerText, styles.trafficInvColumn]}>
      {Strings.trafficInv}
    </Text>
    <Text style={[styles.headerText, styles.percentColumn]} numberOfLines={1}>
      {Strings.conversionPercent}
    </Text>
  </View>
);

const RegionConversionTable = ({ data, yoursRow }) => {
  const listHeader = (
    <>
      {yoursRow ? (
        <View style={styles.yoursSection}>
          <RegionConversionRow
            rank={yoursRow.rank}
            name={yoursRow.name}
            traffic={yoursRow.traffic}
            invoices={yoursRow.invoices}
            conv={yoursRow.conv}
          />
        </View>
      ) : null}
      <TableHeader />
    </>
  );

  return (
    <View style={styles.card}>
      <FlatList
        data={data}
        keyExtractor={item => String(item.rank)}
        scrollEnabled={false}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
        renderItem={({ item }) => (
          <RegionConversionRow
            rank={item.rank}
            name={item.name}
            traffic={item.traffic}
            invoices={item.invoices}
            conv={item.conv}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  yoursSection: {
    paddingTop: hp(0.5),
    paddingBottom: hp(0.3),
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    backgroundColor: '#E4E4E7',
    marginHorizontal: -wp(3),
    paddingHorizontal: wp(3),
  },
  headerText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(2.4),
    color: '#71717B',
  },
  rankColumn: {
    width: wp(6.5),
  },
  nameColumn: {
    width: wp(20),
    marginLeft: wp(3),
  },
  trafficInvColumn: {
    width: wp(34),
    marginLeft:wp(3),
  },
  percentColumn: {
    minWidth: wp(13),
    marginLeft: 'auto',
    paddingRight: wp(1),
    textAlign: 'right',
    flexShrink: 0,
  },
  rowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    marginBottom: hp(0.5),
  },
});

export default RegionConversionTable;
