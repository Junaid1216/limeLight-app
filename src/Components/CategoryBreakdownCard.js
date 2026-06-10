import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { categoryBreakdownData } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const RowDivider = () => <View style={styles.rowDivider} />;

const TableRow = ({ item }) => (
  <View style={styles.tableRow}>
    <View style={styles.colCategory}>
      <View style={styles.categoryCell}>
        <View style={[styles.categoryDot, { backgroundColor: item.dotColor }]} />
        <Text
          style={[styles.cellText, styles.categoryText, styles.categoryName]}
          numberOfLines={1}>
          {item?.categoryName}
        </Text>
      </View>
    </View>

    <View style={styles.colNumeric}>
      <Text style={[styles.cellText, styles.numericValue]} numberOfLines={1}>
        {item?.target}
      </Text>
    </View>

    <View style={styles.colNumeric}>
      <Text style={[styles.cellText, styles.numericValue]} numberOfLines={1}>
        {item?.achieved}
      </Text>
    </View>

    <View style={styles.colCommission}>
      <Text
        style={[styles.cellText, styles.commissionText, styles.numericValue]}
        numberOfLines={1}>
        {item.commission}
      </Text>
    </View>
  </View>
);

const CategoryBreakdownCard = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle} numberOfLines={1}>
      {Strings.categoryBreakdown}
    </Text>
    <Text style={styles.sectionSub} numberOfLines={2}>
      {Strings.categoryBreakdownSub}
    </Text>

    <View style={styles.card}>
      <View style={styles.tableHeader}>
        <View style={styles.colCategory}>
          <Text
            style={[styles.headerText, styles.headerTextLeft]}
            numberOfLines={1}>
            {Strings.tableCategory}
          </Text>
        </View>
        <View style={styles.colNumeric}>
          <Text style={styles.headerText} numberOfLines={1}>
            {Strings.tableTarget}
          </Text>
        </View>
        <View style={styles.colNumeric}>
          <Text style={styles.headerText} numberOfLines={1}>
            {Strings.tableAchieved}
          </Text>
        </View>
        <View style={styles.colCommission}>
          <Text style={styles.headerText} numberOfLines={1}>
            {Strings.tableCommission}
          </Text>
        </View>
      </View>

      <RowDivider />
      <TableRow item={categoryBreakdownData[0]} />
      <RowDivider />
      <TableRow item={categoryBreakdownData[1]} />
      <RowDivider />
      <TableRow item={categoryBreakdownData[2]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: hp(2.5),
    marginTop: hp(0.5),
  },
  sectionTitle: {
    fontFamily: Fonts.poppinsBold,
    color: Colors.black,
    marginLeft: wp(0.7),
    fontSize: Fontsize.m,
  },
  sectionSub: {
    fontFamily: Fonts.poppinsBold,
    color: Colors.blueGrey,
    marginTop: hp(0.1),
    marginBottom: hp(1.4),
    marginLeft: wp(0.7),
    fontSize: Fontsize.xs0,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    borderWidth: wp(0.18),
     borderColor: Colors.silver,
    overflow: 'hidden',
    paddingBottom: hp(1.3),
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingTop: hp(2),
    paddingBottom: hp(1.1),
    paddingHorizontal: wp(4),
  },
  colCategory: {
    flex: 1.35,
    flexBasis: 0,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  colNumeric: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCommission: {
    flex: 1.1,
    flexBasis: 0,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp(0.5),
    paddingRight: wp(3.5),
  },
  headerText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.4),
    color: Colors.blueGrey,
    textAlign: 'center',
    width: wp(55),
    marginTop: hp(0.5),
  },
  headerTextLeft: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: 'auto',
    marginLeft: wp(4.8),
  },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.paleSlate,
    marginHorizontal: wp(4),
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(1.35),
    paddingBottom: hp(0.7),
    paddingHorizontal: wp(4),
  },
  categoryCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.2),
  },
  categoryDot: {
    width: wp(3.1),
    height: wp(3.1),
    borderRadius: wp(1.55),
    marginTop: hp(0),
    marginLeft: wp(0.5),
  },
  cellText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize:Fontsize.xs0,
    color: Colors.deepSlate,
    textAlign: 'center',
    width: wp(55),
  },
  numericValue: {
    fontFamily: Fonts.poppinsBold,
    marginTop: hp(0.3),
  },
  categoryText: {
    textAlign: 'left',
  },
  categoryName: {
    fontSize: Fontsize.xs0,
    width: wp(19),
    fontFamily: Fonts.poppinsBold,
    marginTop: hp(0.3),
  },
  commissionText: {
    textAlign: 'center',
  },
});

export default CategoryBreakdownCard;
