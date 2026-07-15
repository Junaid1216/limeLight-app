import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { categoryColorMap } from '../Constants/CategoryColors';
import { categoryBreakdownData } from '../Constants/DummyData';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';
import Api, { isApiSuccess } from '../Services/Api_services';
import { showApiMessageToast } from '../Utils/apiHelpers';

const getCategoryDotColor = categoryName => {
  const key = categoryName?.toLowerCase?.();
  return categoryColorMap[key] || Colors.blueGrey;
};

const formatCommission = value => `Rs ${value}`;

const mapCategoryBreakdown = items =>
  (items ?? []).map((item, index) => ({
    id: item?.category ?? String(index + 1),
    categoryName: item?.category ?? '',
    target: String(item?.target ?? 0),
    achieved: String(item?.achieved ?? 0),
    commission: formatCommission(item?.commission ?? 0),
    dotColor: getCategoryDotColor(item?.category),
  }));

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

const CategoryBreakdownCard = ({
  items,
  fetchEnabled = true,
  title = Strings.categoryBreakdown,
  subtitle = Strings.categoryBreakdownSub,
}) => {
  const [breakdownData, setBreakdownData] = useState(categoryBreakdownData);

  const displayData = fetchEnabled ? breakdownData : (items ?? []);

  const fetchCategoryBreakdown = useCallback(async () => {
    try {
      const res = await Api.getCategoryBreakdown();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        console.log('Category Breakdown Backend Response:', resJson);

        const appResponse = mapCategoryBreakdown(resJson?.data);
        console.log('Category Breakdown App Response:', appResponse);

        setBreakdownData(appResponse);
      } else {
        console.log('Category Breakdown Error Response:', resJson);
        showApiMessageToast(res);
      }
    } catch (error) {
      console.log(
        'Category Breakdown API Error:',
        error?.response?.data ?? error?.message ?? error,
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (fetchEnabled) {
        fetchCategoryBreakdown();
      }
    }, [fetchCategoryBreakdown, fetchEnabled]),
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.sectionSub} numberOfLines={2}>
        {subtitle}
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
        {displayData.map((item, index) => (
          <React.Fragment key={item.id ?? item.categoryName ?? index}>
            {index > 0 && <RowDivider />}
            <TableRow item={item} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

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
  loaderContainer: {
    paddingVertical: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: Fontsize.xs0,
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
