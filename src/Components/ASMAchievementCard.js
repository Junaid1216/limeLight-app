import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ASMAchievementRow from './ASMAchievementRow';
import { asmYoursAchievementRow } from '../Constants/DummyData';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const CARD_BORDER = '#3B82F6';
const CARD_BG = '#F5FAFF';

const ASMAchievementCard = ({
  title,
  data,
  accentColor = '#20C997',
  yoursRow = asmYoursAchievementRow,
  isLast = false,
}) => {
  return (
    <View style={[styles.card, isLast && styles.cardLast]}>
      <View style={[styles.titlePill, { borderColor: accentColor }]}>
        <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.yoursRow}>
        <ASMAchievementRow item={yoursRow} />
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.rankCol]} numberOfLines={1}>
          {Strings.rank}
        </Text>
        <Text style={[styles.headerText, styles.nameCol]} numberOfLines={1}>
          {Strings.name}
        </Text>
        <View style={styles.rightHeader}>
          <Text style={[styles.headerText, styles.achievementCol]} numberOfLines={1}>
            {Strings.achievementPercent}
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.achievedDot]} />
              <Text style={styles.legendLabel} numberOfLines={1}>
                {Strings.achievedLabel}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.remainingDot]} />
              <Text style={styles.legendLabel} numberOfLines={1}>
                {Strings.remainingLabel}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ASMAchievementRow item={data?.[0]} />
      <ASMAchievementRow item={data?.[1]} />
      <ASMAchievementRow item={data?.[2]} />
      <ASMAchievementRow item={data?.[3]} />
      <ASMAchievementRow item={data?.[4]} />
      <ASMAchievementRow item={data?.[5]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BG,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: wp(3),
    marginBottom: hp(2.2),
  },
  titlePill: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.4),
    marginBottom: hp(1.2),
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(2.6),
  },
  cardLast: {
    marginBottom: 0,
  },
  yoursRow: {
    marginBottom: hp(0.4),
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(2),
    paddingVertical: hp(0.55),
    paddingHorizontal: wp(2),
    marginBottom: hp(0.5),
  },
  headerText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.1),
    color: '#4B5563',
  },
  rankCol: {
    width: wp(11),
  },
  nameCol: {
    width: wp(14),
    marginLeft: wp(0.5),
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  achievementCol: {
    marginRight: wp(2),
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(1.5),
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: wp(0.8),
  },
  achievedDot: {
    backgroundColor: '#20C997',
  },
  remainingDot: {
    backgroundColor: Colors.orange,
  },
  legendLabel: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(1.9),
    color: '#4B5563',
  },
});

export default ASMAchievementCard;
