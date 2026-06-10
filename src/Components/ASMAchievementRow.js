import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const ASMAchievementRow = ({ item }) => {
  const progress = Math.min(1, Math.max(0, (item?.achieved ?? 0) / 100));

  return (
    <View style={styles.row}>
      <View style={styles.rankCircle}>
        <Text style={styles.rankText} numberOfLines={1}>
          {item?.rank}
        </Text>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {item?.name}
      </Text>

      <View style={styles.achievementCol}>
        <View style={[styles.BAR_WIDTH, styles.BAR_HEIGHT, styles.barBox]}>
          <Progress.Bar
            progress={progress}
            width={styles.BAR_WIDTH.width}
            height={styles.BAR_HEIGHT.height}
            color="#20C997"
            unfilledColor={Colors.orange}
            borderWidth={0}
            borderRadius={styles.BAR_HEIGHT.borderRadius}
            animated={false}
          />
        </View>

        <Text style={styles.achievedText} numberOfLines={1}>
          {item?.achieved}%
        </Text>
        <View style={styles.percentSpacer} />
        <Text style={styles.remainingText} numberOfLines={1}>
          {item?.remaining}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.45),
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
  },
  rankText: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.1),
    color: Colors.white,
  },
  name: {
    width: wp(18),
    marginLeft: wp(2),
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(2.4),
    color: Colors.charcoalText,
  },
  achievementCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(0.5),
  },
  BAR_WIDTH: {
    width: wp(26),
  },
  BAR_HEIGHT: {
    height: wp(2.8),
    borderRadius: wp(1.4),
  },
  barBox: {
    overflow: 'hidden',
    marginRight: wp(1),
  },
  percentSpacer: {
    flex: 1,
  },
  achievedText: {
    width: wp(7),
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: '#20C997',
    textAlign: 'left',
    marginLeft: wp(1.8),
  },
  remainingText: {
    width: wp(7),
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs0,
    color: Colors.orange,
    textAlign: 'right',
  },
});

export default ASMAchievementRow;
