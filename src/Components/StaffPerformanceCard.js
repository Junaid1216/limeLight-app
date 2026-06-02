import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';

const RankItem = ({ item, index, totalItems, achievedSuffix }) => {
  const isTopThree = item.rank <= 3;
  const achievedColor =
    item.rank === 1
      ? Colors.successTeal
      : item.rank === 2
      ? Colors.royalCobalt
      : item.rank === 3
      ? Colors.warmAmber
      : Colors.steelGray;

  return (
    <View style={[styles.rankRow, index !== totalItems - 1 && styles.rankRowBorder]}>
      <View
        style={[
          styles.rankBadge,
          {
            backgroundColor: isTopThree ? `${item.rankColor}1A` : Colors.lightGrey,
            borderColor: isTopThree ? item.rankColor : Colors.platinum,
          },
        ]}>
        <Text style={[styles.rankBadgeText, { color: isTopThree ? item.rankColor : Colors.ashGray }]}>
          {item.rank}
        </Text>
      </View>

      <View style={styles.rankNameWrap}>
        <Text style={styles.rankName}>{item.name}</Text>
        <Text style={[styles.achievedText, { color: achievedColor }]}>
          {item.achieved} {achievedSuffix}
        </Text>
      </View>

      <Text style={styles.rankTarget}>{item.target}</Text>
      <Text style={styles.rankCommission}>{item.commission}</Text>
    </View>
  );
};

const StaffPerformanceCard = ({
  topPerformer,
  rankData,
  labels,
}) => {
  return (
    <View style={styles.performanceCard}>
      <View style={styles.meRow}>
        <View style={styles.meBadge}>
          <Text style={styles.meBadgeText}>33</Text>
        </View>
        <View style={styles.meInfoWrap}>
          <Text style={styles.meName}>{labels.saleemYou}</Text>
          <Text style={styles.meAchievement}>25 {labels.achievedSuffix}</Text>
        </View>
        <Text style={styles.meTarget}>{topPerformer.target}</Text>
        <Text style={styles.meCommission}>{topPerformer.commission}</Text>
      </View>

      <Text style={styles.sectionHeading}>{labels.achieveTarget}</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.rankCol]}>{labels.rank}</Text>
        <Text style={[styles.tableHeaderText, styles.nameCol]}>{labels.name}</Text>
        <Text style={[styles.tableHeaderText, styles.targetCol]}>{labels.target}</Text>
        <Text style={[styles.tableHeaderText, styles.commissionCol]}>{labels.commission}</Text>
      </View>

      <FlatList
        data={rankData}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <RankItem
            item={item}
            index={index}
            totalItems={rankData.length}
            achievedSuffix={labels.achievedSuffix}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.rankListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  performanceCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: Colors.appBorder,
    paddingHorizontal: wp(3.4),
    paddingTop: hp(1.35),
    paddingBottom: hp(1.1),
  },
  meRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.1),
    marginBottom: hp(0.8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.softDivider,
  },
  meBadge: {
    width: wp(7.1),
    height: wp(7.1),
    borderRadius: wp(4),
    backgroundColor: Colors.mintBadge,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.4),
  },
  meBadgeText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.8),
    color: Colors.green,
  },
  meInfoWrap: {
    flex: 1,
  },
  meName: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(3.65),
    color: Colors.graphite,
    marginLeft: wp(2),
  },
  meAchievement: {
    marginTop: hp(0.15),
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.6),
    color: Colors.green,
  },
  meTarget: {
    width: wp(10),
    textAlign: 'left',
    paddingLeft: 0,
    fontFamily: Fonts.poppinsRegular,
    fontSize: 14,
    color: Colors.mutedSlate,
  },
  meCommission: {
    width: wp(18),
    textAlign: 'right',
    fontFamily: Fonts.poppinsBold,
    fontSize: 14,
    color: Colors.graphite,
  },
  sectionHeading: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 16,
    color: Colors.graphite,
    marginBottom: hp(0.8),
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.3),
  },
  tableHeaderText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: 10,
    color: Colors.blueGrey,
  },
  rankCol: {
    width: wp(11),
  },
  nameCol: {
    flex: 1,
    marginLeft: wp(9.5),
  },
  targetCol: {
    width: wp(10),
    marginRight: wp(10),
  },
  commissionCol: {
    width: wp(20),
    textAlign: 'right',
  },
  rankListContent: {
    rowGap: 0,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.62),
  },
  rankRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.rowDivider,
  },
  rankBadge: {
    width: wp(6.5),
    height: wp(6.5),
    borderRadius: wp(3.25),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.3),
    position: 'relative',
    bottom: hp(0.45),
  },
  rankBadgeText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.9),
  },
  rankNameWrap: {
    flex: 1,
    marginLeft: wp(11.5),
  },
  rankName: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: 12.7,
    color: Colors.graphite,
    marginBottom: hp(0.2),
    lineHeight: 15,
  },
  achievedText: {
    marginTop: 0,
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.7),
  },
  rankTarget: {
    width: wp(10),
    textAlign: 'left',
    paddingLeft: 0,
    marginRight: wp(5.9),
    fontFamily: Fonts.poppinsRegular,
    fontSize: 13,
    color: Colors.mutedSlate,
  },
  rankCommission: {
    width: wp(20),
    textAlign: 'right',
    fontFamily: Fonts.poppinsBold,
    fontSize: 14,
    color: Colors.graphite,
    marginRight: wp(1.7),
  },
});

export default StaffPerformanceCard;
