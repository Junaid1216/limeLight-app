import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const StaffDetailCategoryCard = ({ item }) => {
  const progressValue = Math.min(1, (item?.achieved ?? 0) / (item?.target || 1));
  const fillColor = progressValue > 0 ? item?.progressColor : 'transparent';

  return (
    <View
      style={[
        styles.categoryCard,
        {
          borderColor: item?.borderColor,
          borderRadius: item?.borderRadius ?? 13,
        },
      ]}
    >
      <View style={styles.categoryHeader}>
        <View
          style={[
            styles.categoryIcon,
            {
              backgroundColor: item?.iconBg,
              borderRadius: item?.iconBorderRadius ?? wp(2.13),
            },
          ]}
        >
          <Image
            source={item?.iconSource}
            style={[
              styles.categoryIconImage,
              item?.iconTintColor && { tintColor: item?.iconTintColor },
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.categorySubtitle} numberOfLines={1}>
            {item?.achievement}
          </Text>
        </View>
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

      <View style={styles.metricRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.target}
          </Text>
          <Text style={[styles.metricValue, styles.metricValueNormal]} numberOfLines={1}>
            {item?.target}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.achievedLabel}
          </Text>
          <Text
            style={[
              styles.metricValue,
              {
                color: item?.achievedColor
                  ? item?.achievedColor
                  : Colors.darkNavy,
              },
            ]}
            numberOfLines={1}
          >
            {item?.achieved}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>
            {Strings.remainingLabel}
          </Text>
          <Text style={[styles.metricValue, styles.metricValueNormal]} numberOfLines={1}>
            {item?.remaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    padding: wp(4),
    marginBottom: hp(1.5),
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  categoryIcon: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  categoryIconImage: {
    width: wp(5),
    height: wp(5),
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.darkNavy,
    marginBottom: hp(0.3),
  },
  categorySubtitle: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs0,
    color: Colors.mediumGrey,
  },
  progressTrack: {
    alignSelf: 'stretch',
    marginBottom: hp(1.5),
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  metricValueNormal: {
    color: Colors.darkNavy,
  },
});

export default StaffDetailCategoryCard;
