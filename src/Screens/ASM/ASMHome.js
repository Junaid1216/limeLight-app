import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fonts } from '../../Constants/Fonts';
import { Fontsize } from '../../Constants/Fontsize';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import * as Progress from 'react-native-progress';

const conversionData = [
  { rank: 1, name: 'Emporium', traffic: 92, invoices: 10, conv: 15 },
  { rank: 2, name: 'MM Alam', traffic: 90, invoices: 12, conv: 14 },
  { rank: 3, name: 'Dolmen', traffic: 65, invoices: 8, conv: 12 },
  { rank: 4, name: 'Gulberg', traffic: 62, invoices: 11, conv: 11 },
  { rank: 5, name: 'Packages', traffic: 64, invoices: 9, conv: 8 },
  { rank: 6, name: 'Amanah Mall', traffic: 59, invoices: 9, conv: 8 },
];

const branchComparisonData = [
  { name: 'Emporium', achieved: 84, remaining: 16 },
  { name: 'MM Alam', achieved: 78, remaining: 22 },
  { name: 'Dolmen', achieved: 72, remaining: 28 },
  { name: 'Gulberg', achieved: 68, remaining: 32 },
  { name: 'Packages', achieved: 64, remaining: 36 },
  { name: 'Amanah Mall', achieved: 60, remaining: 40 },
];

const ranges = [Strings.weekly, Strings.monthly];

const ASMHome = () => {
  const [selectedRange, setSelectedRange] = useState(Strings.weekly);

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkNavy} />
      <View style={styles.headerArea}>
        <HomeHeaderComponent />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>{Strings.branchComparison}</Text>

        <View style={styles.branchControlsRow}>
          <View style={styles.toggleGroupSmall}>
            {ranges.map(range => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.toggleButtonSmall,
                  selectedRange === range && styles.toggleButtonActiveSmall,
                ]}
                onPress={() => setSelectedRange(range)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.toggleLabelSmall,
                    selectedRange === range && styles.toggleLabelActiveSmall,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.conversionHeading}>Conversions</Text>

        <View style={styles.card}>
          <View style={styles.innerPanel}>
            <View style={styles.tableHeaderRowSmall}>
              <Text style={styles.headerText}>{Strings.rank}</Text>
              <Text style={[styles.headerText, styles.nameColumn]}>
                {Strings.name}
              </Text>
              <Text style={[styles.headerText, styles.trafficInvColumn]}>
                {Strings.trafficInv}
              </Text>
              <Text style={[styles.headerText, styles.percentColumn]}>
                {Strings.conversionPercent}
              </Text>
            </View>

            {conversionData.map((item, index) => (
              <ConversionRow
                key={item.rank}
                item={item}
                isLast={index === conversionData.length - 1}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.cardHeader, styles.cardHeaderTop]}>
            <Text style={styles.cardTitle}>{Strings.branchComparison}</Text>
            <Text style={styles.cardSubtitle}>Achievement vs Remaining</Text>
          </View>

          {branchComparisonData.map((item, index) => (
            <ProgressRow
              key={item.name}
              item={item}
              isLast={index === branchComparisonData.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const ConversionRow = ({ item, isLast }) => {
  const invoiceWidth = Math.min(item.invoices * 7.5, 80);
  const trafficWidth = Math.min(item.traffic, 100);

  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <View style={styles.rankCircle}>
        <Text style={styles.rankText}>{item.rank}</Text>
      </View>

      <View style={styles.rowBody}>
        <View style={styles.nameColumnBody}>
          <Text style={styles.branchName}>{item.name}</Text>
        </View>

        <View style={styles.trafficCell}>
          <View style={styles.barLine}>
            <Progress.Bar
              progress={Math.min(item.traffic / 100, 1)}
              width={70}
              height={6}
              color={Colors.green}
              unfilledColor={Colors.inputGrey}
              borderWidth={0}
              borderRadius={6}
            />
            <Text style={styles.smallValue}>{item.traffic}</Text>
          </View>

          <View style={styles.barLine}>
            <Progress.Bar
              progress={Math.min(item.invoices / 20, 1)}
              width={70}
              height={6}
              color={Colors.orange}
              unfilledColor={Colors.inputGrey}
              borderWidth={0}
              borderRadius={6}
            />
            <Text style={styles.smallValue}>{item.invoices}</Text>
          </View>
        </View>
      </View>

      <View style={styles.percentageBox}>
        <Text style={styles.percentageText}>{item.conv}%</Text>
      </View>
    </View>
  );
};

const ProgressRow = ({ item, isLast }) => (
  <View style={[styles.progressRow, !isLast && styles.rowDivider]}>
    <View style={styles.progressHeader}>
      <Text style={styles.branchName}>{item.name}</Text>
      <Text style={styles.branchPercent}>{item.achieved}%</Text>
    </View>
    <View style={styles.progressBarTrack}>
      <View style={[styles.progressBarFill, { width: `${item.achieved}%` }]} />
      <View
        style={[styles.progressBarRemaining, { width: `${item.remaining}%` }]}
      />
    </View>
    <View style={styles.progressLegend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: Colors.green }]} />
        <Text style={styles.legendLabel}>Achieved</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: Colors.orange }]} />
        <Text style={styles.legendLabel}>Remaining</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(3),
    backgroundColor: Colors.ghostWhite,
  },
  screenTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.black,
    marginBottom: hp(2.2),
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    padding: wp(0.8),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderTopPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingTop: hp(1.2),
    paddingBottom: hp(1.1),
  },
  innerPanel: {
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    padding: wp(3),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#E4E4E7',
    borderRightColor: '#E4E4E7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  cardHeaderTop: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.m,
    color: Colors.black,
  },
  branchControlsRow: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  conversionHeading: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.s,
    color: Colors.black,
    marginBottom: hp(1.2),
  },
  trafficInvColumn: {
    width: wp(34),
    marginLeft: wp(3),
    textAlign: 'center',
  },
  cardSubtitle: {
    marginTop: hp(0.5),
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.slateGrey,
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(2.5),
    overflow: 'hidden',
  },
  toggleButton: {
    paddingVertical: hp(0.9),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.lightGrey,
  },
  toggleButtonActive: {
    backgroundColor: Colors.green,
  },
  toggleLabel: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs1,
    color: Colors.slateGrey,
  },
  toggleLabelActive: {
    color: Colors.white,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    backgroundColor: Colors.paleBlue,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    paddingHorizontal: wp(2),
    marginBottom: hp(1.4),
  },
  tableHeaderRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    backgroundColor: Colors.paleBlue,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    paddingHorizontal: wp(2),
    marginBottom: hp(1.4),
  },
  headerText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: 10,
    color: '#71717B',
  },
  nameColumn: {
    flex: 1,
    marginLeft: wp(4),
  },
  smallColumn: {
    width: wp(18),
    marginLeft: wp(2),
  },
  trafficColumn: {
    width: wp(30),
    textAlign: 'left',
    marginLeft: wp(3),
  },
  percentColumn: {
    width: wp(16),
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1.4),
  },
  rowDivider: {
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.lightGray,
  },
  rankCircle: {
    width: 27,
    height: 27,
    borderRadius: wp(5.4),
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(1),
  },
  rankText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs1,
    color: Colors.white,
  },
  rowBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp(3),
  },
  nameColumnBody: {
    flex: 1,
  },
  trafficCell: {
    width: wp(34),
    marginLeft: wp(2),
    borderRadius: wp(1.5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.8),
  },
  branchName: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.s,
    color: Colors.charcoalText,
    marginBottom: hp(0.8),
    marginLeft: wp(1),
  },
  barGroup: {
    gap: hp(0.6),
  },
  barMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.6),
  },
  smallLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.slateGrey,
  },
  smallValue: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: Colors.charcoalText,
    marginLeft: wp(2),
  },
  barLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: hp(0.8),
  },
  barRowLarge: {
    width: '100%',
    height: hp(1.4),
    backgroundColor: Colors.inputGrey,
    borderRadius: wp(1),
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  barAndValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  trafficValue: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.slateGrey,
    minWidth: wp(8),
    textAlign: 'left',
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginTop: hp(0.2),
  },
  invoiceDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: Colors.orange,
  },
  invoiceValue: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.slateGrey,
    marginLeft: wp(1),
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.green,
  },
  rowMeta: {
    flexDirection: 'row',
    gap: wp(5),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  metaText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.slateGrey,
  },
  rowCaption: {
    flexDirection: 'row',
    gap: wp(4),
    marginTop: hp(1),
  },
  dotLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
  },
  dotText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.slateGrey,
  },
  percentageBox: {
    width: wp(12),
    alignItems: 'flex-start',
    marginLeft: wp(2),
  },
  percentageText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
  },
  progressRow: {
    marginBottom: hp(1.8),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  branchPercent: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs1,
    color: Colors.green,
  },
  progressBarTrack: {
    flexDirection: 'row',
    width: '100%',
    height: hp(2.2),
    borderRadius: wp(1.2),
    backgroundColor: Colors.inputGrey,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: Colors.green,
  },
  progressBarRemaining: {
    backgroundColor: Colors.orange,
  },
  progressLegend: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: wp(4),
    marginTop: hp(1),
  },
  outsideControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  toggleGroupSmall: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    height: 34,
    overflow: 'hidden',
  },
  toggleButtonSmall: {
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: Colors.lightGrey,
    height: '100%',
  },
  toggleButtonActiveSmall: {
    backgroundColor: Colors.green,
  },
  toggleLabelSmall: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: 9,
    color: Colors.slateGrey,
  },
  toggleLabelActiveSmall: {
    color: Colors.white,
  },
  conversionSummaryBox: {
    backgroundColor: Colors.white,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
  },
  conversionSummaryTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.slateGrey,
  },
  conversionSummaryValue: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.m,
    color: Colors.black,
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
  legendLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.slateGrey,
  },
});

export default ASMHome;
