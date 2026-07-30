import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ASMAchievementRow from './ASMAchievementRow';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const CARD_BORDER = '#3B82F6';
const CARD_BG = '#F5FAFF';
const VISIBLE_ROWS = 6;
const ROW_HEIGHT = hp(6.5);

const EMPTY_YOURS_ROW = { rank: 0, name: '', achieved: 0, remaining: 0 };

const ASMAchievementCard = ({
  title,
  data,
  accentColor = '#20C997',
  yoursRow = EMPTY_YOURS_ROW,
  isLast = false,
}) => {
  const rows = data ?? [];
  const hasYoursRow = Boolean(yoursRow?.name);
  const listContent = rows.map((item, index) => (
    <ASMAchievementRow
      key={`${item?.rank ?? index}-${item?.name}`}
      item={item}
    />
  ));

  return (
    <View style={[styles.card, isLast && styles.cardLast]}>
      <View style={[styles.titlePill, { borderColor: accentColor }]}>
        <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {hasYoursRow ? (
        <View style={styles.yoursRow}>
          <ASMAchievementRow item={yoursRow} />
        </View>
      ) : null}

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

      {rows.length > VISIBLE_ROWS ? (
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.rowsScroll}
        >
          {listContent}
        </ScrollView>
      ) : (
        listContent
      )}
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
  rowsScroll: {
    maxHeight: ROW_HEIGHT * VISIBLE_ROWS,
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
    flex: 1,
    flexShrink: 1,
    minWidth: wp(12),
    marginLeft: wp(0.5),
  },
  rightHeader: {
    width: wp(28),
    flexShrink: 0,
    marginLeft: wp(0.5),
  },
  achievementCol: {
    marginBottom: hp(0.15),
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(1.5),
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
