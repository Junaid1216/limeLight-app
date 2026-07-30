import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const ASMAchievementRow = ({ item }) => {
  const achieved = Number(item?.achieved ?? 0);
  const remaining = Number(item?.remaining ?? 0);
  const progress = Math.min(1, Math.max(0, achieved / 100));
  const fillColor = progress > 0 ? '#20C997' : 'transparent';

  return (
    <View style={styles.row}>
      <View style={styles.rankCircle}>
        <Text style={styles.rankText} numberOfLines={1}>
          {item?.rank}
        </Text>
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {item?.name}
      </Text>

      <View style={styles.achievementCol}>
        <View style={[styles.BAR_WIDTH, styles.BAR_HEIGHT, styles.barBox]}>
          <Progress.Bar
            progress={progress}
            width={styles.BAR_WIDTH.width}
            height={styles.BAR_HEIGHT.height}
            color={fillColor}
            unfilledColor={Colors.orange}
            borderWidth={0}
            borderRadius={styles.BAR_HEIGHT.borderRadius}
            animated={false}
          />
        </View>

        <View style={styles.percentRow}>
          <Text style={styles.achievedText} numberOfLines={1}>
            {achieved}%
          </Text>
          <Text style={styles.remainingText} numberOfLines={1}>
            {remaining}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(0.55),
    paddingHorizontal: wp(2),
    backgroundColor: '#F5FAFF',
  },
  rankCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#20C997',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.2),
    flexShrink: 0,
  },
  rankText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.1),
    color: Colors.white,
  },
  name: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginLeft: wp(1.5),
    marginRight: wp(1),
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.4),
    color: Colors.charcoalText,
    lineHeight: wp(2.4) * 1.2,
  },
  achievementCol: {
    width: wp(28),
    flexShrink: 0,
    marginLeft: wp(0.5),
  },
  BAR_WIDTH: {
    width: wp(28),
  },
  BAR_HEIGHT: {
    height: wp(2.8),
    borderRadius: wp(1.4),
  },
  barBox: {
    overflow: 'hidden',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(28),
    marginTop: wp(0.8),
  },
  achievedText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: '#20C997',
    flexShrink: 0,
  },
  remainingText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: Colors.orange,
    flexShrink: 0,
  },
});

export default ASMAchievementRow;
