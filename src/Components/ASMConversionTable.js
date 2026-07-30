import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import ASMConversionRow from './ASMConversionRow';
import RegionConversionRow from './RegionConversionRow';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { Strings } from '../Constants/Strings';

const VISIBLE_ROWS = 6;
const ROW_HEIGHT = hp(10);
const REGION_TABLE_PAD = wp(3);

const RowSeparator = () => <View style={styles.rowSeparator} />;

const ConversionCard = ({
  data,
  showLegend = true,
  useRegionRow = false,
  yoursRow,
}) => (
  <View style={styles.card}>
    {showLegend ? (
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.trafficDot]} />
          <Text style={styles.legendLabel} numberOfLines={1}>
            {Strings.traffic}
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.invoiceDot]} />
          <Text style={styles.legendLabel} numberOfLines={1}>
            {Strings.invoices}
          </Text>
        </View>
      </View>
    ) : null}

    <View
      style={[
        styles.tableContainer,
        useRegionRow && styles.tableContainerRegion,
        !useRegionRow && styles.tableContainerBorder,
      ]}
    >
      {yoursRow ? (
        <View style={[styles.yoursSection, useRegionRow && styles.regionTablePad]}>
          <RegionConversionRow
            rank={yoursRow?.rank}
            name={yoursRow?.name}
            traffic={yoursRow?.traffic}
            invoices={yoursRow?.invoices}
            conv={yoursRow?.conv}
          />
        </View>
      ) : null}

      <View style={[styles.tableHeader, useRegionRow && styles.tableHeaderFull]}>
        <Text
          style={[
            styles.headerText,
            useRegionRow ? styles.rankHeaderCol : styles.rankHeaderDefault,
          ]}
          numberOfLines={1}
        >
          {Strings.rank}
        </Text>
        <Text
          style={[
            styles.headerText,
            useRegionRow ? styles.nameColumnRegion : styles.nameColumn,
          ]}
          numberOfLines={1}
        >
          {Strings.name}
        </Text>
        <Text
          style={[
            styles.headerText,
            useRegionRow ? styles.trafficInvColumnRegion : styles.trafficInvColumn,
          ]}
          numberOfLines={1}
        >
          {Strings.trafficInv}
        </Text>
        <Text
          style={[
            styles.headerText,
            useRegionRow ? styles.percentColumnRegion : styles.percentColumn,
          ]}
          numberOfLines={1}
        >
          {Strings.conversionPercent}
        </Text>
      </View>

      <ScrollView
        scrollEnabled={data.length > VISIBLE_ROWS}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={[
          styles.innerList,
          data.length > VISIBLE_ROWS && styles.innerListScroll,
        ]}
        contentContainerStyle={[
          useRegionRow && styles.regionTablePad,
          styles.listContentPad,
        ]}
      >
        {data.map((item, index) => (
          <View key={String(item?.rank)}>
            {useRegionRow ? (
              <RegionConversionRow
                rank={item?.rank}
                name={item?.name}
                traffic={item?.traffic}
                invoices={item?.invoices}
                conv={item?.conv}
              />
            ) : (
              <ASMConversionRow item={item} />
            )}
            {index < data.length - 1 ? <RowSeparator /> : null}
          </View>
        ))}
      </ScrollView>
      <View
        style={[styles.tableBottomBorder, useRegionRow && styles.regionBottomBorder]}
      />
    </View>
  </View>
);

const ASMConversionTable = ({
  data,
  topContent,
  bottomContent,
  contentContainerStyle,
  showLegend = true,
  useRegionRow = false,
  yoursRow,
  isLoading = false,
}) => (
  <ScrollView
    style={styles.list}
    contentContainerStyle={contentContainerStyle}
    showsVerticalScrollIndicator={false}
    nestedScrollEnabled
  >
    {topContent}
    {isLoading ? (
      <ActivityIndicator
        style={styles.sectionLoader}
        size="large"
        color={Colors.green}
      />
    ) : (
      <ConversionCard
        data={data}
        showLegend={showLegend}
        useRegionRow={useRegionRow}
        yoursRow={yoursRow}
      />
    )}
    {bottomContent}
  </ScrollView>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  sectionLoader: {
    marginVertical: hp(4),
  },
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(5),
    marginBottom: hp(1.5),
    paddingTop: hp(0.5),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  legendDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
  },
  trafficDot: {
    backgroundColor: '#20C997',
  },
  invoiceDot: {
    backgroundColor: Colors.orange,
  },
  legendLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.slateGrey,
  },
  tableContainer: {
    overflow: 'hidden',
    borderRadius: wp(2),
  },
  tableContainerRegion: {
    marginHorizontal: -wp(3),
    overflow: 'visible',
    borderRadius: 0,
  },
  tableContainerBorder: {
    borderLeftWidth: wp(0.25),
    borderRightWidth: wp(0.25),
    borderColor: Colors.lightGray,
  },
  yoursSection: {
    paddingTop: hp(0.5),
    paddingBottom: hp(0.3),
  },
  innerList: {
    flexGrow: 0,
  },
  innerListScroll: {
    maxHeight: ROW_HEIGHT * VISIBLE_ROWS + hp(1),
  },
  listContentPad: {
    paddingBottom: hp(0.3),
  },
  tableBottomBorder: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.lightGray,
  },
  regionBottomBorder: {
    marginHorizontal: REGION_TABLE_PAD,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    backgroundColor: '#E4E4E7',
    paddingHorizontal: wp(2),
    marginBottom: hp(0.5),
  },
  tableHeaderFull: {
    marginHorizontal: 0,
    paddingHorizontal: REGION_TABLE_PAD,
    borderRadius: 0,
  },
  regionTablePad: {
    paddingHorizontal: REGION_TABLE_PAD,
  },
  headerText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(2.4),
    color: '#71717B',
  },
  rankHeaderDefault: {},
  rankHeaderCol: {
    width: wp(6.5),
    textAlign: 'center',
  },
  nameColumn: {
    flex: 1,
    marginLeft: wp(4),
  },
  nameColumnRegion: {
    flex: 1,
    flexShrink: 1,
    minWidth: wp(16),
    marginLeft: wp(2),
  },
  trafficInvColumn: {
    width: wp(34),
    marginLeft: wp(3),
    textAlign: 'center',
  },
  trafficInvColumnRegion: {
    width: wp(30),
    marginLeft: wp(1),
    textAlign: 'center',
    flexShrink: 0,
  },
  percentColumn: {
    width: wp(14),
    textAlign: 'right',
    flexShrink: 0,
  },
  percentColumnRegion: {
    width: wp(14),
    minWidth: wp(14),
    marginLeft: wp(1),
    paddingRight: wp(0.5),
    textAlign: 'right',
    flexShrink: 0,
  },
  rowSeparator: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.lightGray,
    marginBottom: hp(0.5),
  },
});

export default ASMConversionTable;
