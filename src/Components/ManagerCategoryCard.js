import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import BranchTargetChip from './BranchTargetChip';
import WeeklyPerformanceItem from './WeeklyPerformanceItem';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const ManagerCategoryCard = ({ item }) => {
  const progressValue = (item?.achievementPercent ?? 0) / 100;
  const fillColor =
    progressValue > 0 ? item?.progressColor : 'transparent';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: item?.iconBg }]}>
          <Image
            source={item?.iconSource}
            style={[
              styles.icon,
              item?.iconTintColor && { tintColor: item?.iconTintColor },
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {Strings.categoryPerformanceSuffix(item?.title)}
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.target}
          </Text>
          <Text style={styles.metricValue} numberOfLines={1}>
            {item?.target}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.achievedLabel}
          </Text>
          <Text
            style={[styles.metricValue, { color: item?.progressColor }]}
            numberOfLines={1}
          >
            {item?.achieved}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.remainingLabel}
          </Text>
          <Text style={styles.metricValue} numberOfLines={1}>
            {item?.remaining}
          </Text>
        </View>
      </View>

      <View style={styles.achievementRow}>
        <Text style={styles.achievementLabel} numberOfLines={1}>
          {Strings.achievement}
        </Text>
        <Text
          style={[styles.achievementPercent, { color: item?.progressColor }]}
          numberOfLines={1}
        >
          {item?.achievementPercent}%
        </Text>
      </View>
      <Progress.Bar
        progress={progressValue}
        width={null}
        color={fillColor}
        unfilledColor={Colors.dividerBlue}
        borderWidth={0}
        height={hp(0.9)}
        borderRadius={hp(1)}
        style={styles.progressTrack}
      />

      <Text style={styles.sectionTitle} numberOfLines={1}>
        {Strings.myBranchTargets}
      </Text>
      <View style={styles.targetRow}>
        <BranchTargetChip item={item?.branchTargets?.[0]} />
        <BranchTargetChip item={item?.branchTargets?.[1]} />
        <BranchTargetChip item={item?.branchTargets?.[2]} />
        <BranchTargetChip item={item?.branchTargets?.[3]} />
      </View>

      <Text style={styles.sectionTitle} numberOfLines={1}>
        {Strings.myBranchPerformance}
      </Text>
      <View style={styles.weekPerformanceShell}>
        <View style={styles.weekRow}>
          <WeeklyPerformanceItem item={item?.weeklyPerformance?.[0]} />
          <WeeklyPerformanceItem item={item?.weeklyPerformance?.[1]} />
          <WeeklyPerformanceItem item={item?.weeklyPerformance?.[2]} />
          <WeeklyPerformanceItem item={item?.weeklyPerformance?.[3]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.paleSlate,
    padding: wp(4),
    marginBottom: hp(1.8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  icon: {
    width: wp(5),
    height: wp(5),
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.darkNavy,
    marginBottom: hp(0.3),
  },
  subtitle: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.mediumGrey,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.8),
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.mediumGrey,
    marginBottom: hp(0.3),
  },
  metricValue: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.sm,
    color: Colors.darkNavy,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.6),
  },
  achievementLabel: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.mediumGrey,
  },
  achievementPercent: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
  },
  progressTrack: {
    alignSelf: 'stretch',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs1,
    color: Colors.darkNavy,
    marginBottom: hp(1),
  },
  targetRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: hp(1.5),
    gap: wp(3),
  },
  weekPerformanceShell: {
    backgroundColor: Colors.white,
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: Colors.paleSlate,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(1.2),
  },
  weekRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: wp(2),
  },
});

export default ManagerCategoryCard;
