import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { slabStyleMap } from '../Constants/CategoryColors';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';
import { Fontsize } from '../Constants/Fontsize';

const ID_VISIBLE_CHARS = 8;

const formatInvoice = value =>
  value.length > ID_VISIBLE_CHARS
    ? `${value.slice(0, ID_VISIBLE_CHARS)}...`
    : value;

const formatSalesId = value =>
  value.length > ID_VISIBLE_CHARS
    ? `${value.slice(0, ID_VISIBLE_CHARS)}...`
    : value;

export const SlipBoundIncentiveHeader = () => (
  <View style={styles.headerRow}>
    <View style={[styles.col, styles.colDate]}>
      <Text
        style={[styles.headerText, styles.headerDate]}
        numberOfLines={1}>
        {Strings.incentiveDate}
      </Text>
    </View>
    <View style={[styles.col, styles.colSlab]}>
      <Text
        style={[styles.headerText, styles.headerSlab]}
        numberOfLines={1}>
        {Strings.incentiveSlab}
      </Text>
    </View>
    <View style={[styles.col, styles.colInvoice]}>
      <Text
        style={[styles.headerText, styles.headerInvoice]}
        numberOfLines={1}>
        {Strings.incentiveInvoice}
      </Text>
    </View>
    <View style={[styles.col, styles.colSalesId]}>
      <Text
        style={[styles.headerText, styles.headerSalesId]}
        numberOfLines={1}>
        {Strings.incentiveSalesId}
      </Text>
    </View>
    <View style={[styles.col, styles.colNetSale]}>
      <Text
        style={[styles.headerText, styles.headerNetSale]}
        numberOfLines={1}>
        {Strings.incentiveNetSale}
      </Text>
    </View>
    <View style={[styles.col, styles.colIncentive]}>
      <Text style={styles.headerText} numberOfLines={1}>
        {Strings.incentiveAmount}
      </Text>
    </View>
  </View>
);

const SlipBoundIncentiveItem = ({ item }) => {
  const slabStyle = slabStyleMap[item.slab] ?? slabStyleMap.A;

  return (
    <View style={styles.row}>
      <View style={[styles.col, styles.colDate]}>
        <Text style={[styles.dateDay, styles.dateValue]} numberOfLines={1}>
          {item.dateDay}
        </Text>
        <Text style={[styles.dateYear, styles.dateValue]} numberOfLines={1}>
          {item.dateYear}
        </Text>
      </View>

      <View style={[styles.col, styles.colSlab]}>
        <View
          style={[
            styles.slabPill,
            styles.slabValue,
            { backgroundColor: slabStyle.bg },
          ]}>
          <Text
            style={[styles.slabText, { color: slabStyle.text }]}
            numberOfLines={1}>
            {item.slab}
          </Text>
        </View>
      </View>

      <View style={[styles.col, styles.colInvoice]}>
        <View style={[styles.invSidWrap, styles.invoiceRowWrap]}>
          <Text style={[styles.cellValue, styles.invoiceRowValue]}>
            {formatInvoice(item.invoice)}
          </Text>
        </View>
      </View>

      <View style={[styles.col, styles.colSalesId]}>
        <View style={[styles.invSidWrap, styles.salesIdRowWrap]}>
          <Text style={[styles.cellValue, styles.salesIdRowValue]}>
            {formatSalesId(item.salesId)}
          </Text>
        </View>
      </View>

      <View style={[styles.col, styles.colNetSale]}>
        <View style={styles.netSaleRowWrap}>
          <Text style={[styles.cellValue, styles.netSaleRowValue]}>
            {item.netSale}
          </Text>
        </View>
      </View>

      <View style={[styles.col, styles.colIncentive]}>
        <Text style={styles.cellValue} numberOfLines={1}>
          {item.incentive}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.ghostWhite,
    borderTopLeftRadius: wp(3.5),
    borderTopRightRadius: wp(3.5),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#F8FAFC',
    borderRadius: wp(3.5),
    borderWidth: wp(0.19),
    borderColor: Colors.silver,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  col: {
    flexBasis: 0,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colDate: {
    flex: 1,
  },
  colSlab: {
    flex: 0.9,
    paddingHorizontal: wp(0.6),
  },
  colInvoice: {
    flex: 1.15,
  },
  colSalesId: {
    flex: 1.15,
  },
  colNetSale: {
    flex: 0.9,
  },
  colIncentive: {
    flex: 0.95,
  },
  headerText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xm3,
    color: Colors.blueGrey,
    textAlign: 'center',
    width: wp(20),
  },
  dateDay: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.7),
    color: Colors.black,
    textAlign: 'center',
    width: wp(20),

  },
  dateYear: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: wp(2.4),
    color: Colors.ashGray,
    marginTop: hp(0.15),
    textAlign: 'center',
    width: wp(20),

  },
  slabPill: {
    minWidth: wp(11),
    height: wp(7.5),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  slabText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(2.7),
  },
  cellValue: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.7),
    color: Colors.black,
    textAlign: 'center',
  },
  invSidWrap: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInvoice: {
    marginRight: wp(6.5),
  },
  invoiceRowWrap: {
    marginRight: wp(6.5),
    flexShrink: 0,
    minWidth: wp(19),
  },
  invoiceRowValue: {
    flexShrink: 0,
    includeFontPadding: false,
  },
  salesIdRowWrap: {
    marginRight: wp(5.5),
    flexShrink: 0,
    minWidth: wp(19),
  },
  salesIdRowValue: {
    flexShrink: 0,
    includeFontPadding: false,
  },
  headerDate: {
    marginRight: wp(6.2),
  },
  dateValue: {
    marginRight: wp(5.2),
  },
  headerSlab: {
    marginRight: wp(6.5),
  },
  slabValue: {
    marginRight: wp(6.5),
  },
  headerSalesId: {
    marginRight: wp(6.2),
  },
  headerNetSale: {
    marginRight: wp(4.5),
  },
  netSaleRowWrap: {
    marginRight: wp(4.5),
    flexShrink: 0,
  },
  netSaleRowValue: {
    flexShrink: 0,
  },
});

export default SlipBoundIncentiveItem;
