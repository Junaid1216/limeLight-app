import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const StaffDetailCategoryCard = ({ item }) => {
  const progressValue = Math.min(1, item.achieved / item.target);

  return (
    <View
      style={[
        styles.categoryCard,
        {
          borderColor: item.borderColor,
          borderRadius: item.borderRadius ?? 13,
        },
      ]}
    >
      <View style={styles.categoryHeader}>
        <View
          style={[
            styles.categoryIcon,
            {
              backgroundColor: item.iconBg,
              borderRadius: item.iconBorderRadius ?? wp(2.13),
            },
          ]}
        >
          <Image
            source={item.iconSource}
            style={[
              styles.categoryIconImage,
              item.iconTintColor && { tintColor: item.iconTintColor },
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categorySubtitle}>{item.achievement}</Text>
        </View>
      </View>

      <Progress.Bar
        progress={progressValue}
        width={null}
        color={item.progressColor}
        unfilledColor={Colors.dividerBlue}
        borderWidth={0}
        height={hp(0.9)}
        borderRadius={hp(1)}
        style={styles.progressTrack}
      />

      <View style={styles.metricRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{Strings.target}</Text>
          <Text style={[styles.metricValue, styles.metricValueNormal]}>
            {item.target}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{Strings.achievedLabel}</Text>
          <Text
            style={[
              styles.metricValue,
              {
                color: item.achievedColor
                  ? item.achievedColor
                  : Colors.darkNavy,
              },
            ]}
          >
            {item.achieved}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{Strings.remainingLabel}</Text>
          <Text style={[styles.metricValue, styles.metricValueNormal]}>
            {item.remaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(5),
    padding: wp(4),
    marginBottom: hp(1.5),
    marginHorizontal: wp(1),
    borderWidth: 1,
    shadowColor: Colors.black,
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  categoryIcon: {
    width: wp(8.53),
    height: wp(8.53),
    borderRadius: wp(2.13),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  categoryIconImage: {
    width: wp(4.53),
    height: wp(4.53),
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.darkNavy,
    marginBottom: hp(0.4),
  },
  categorySubtitle: {
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
  progressTrack: {
    width: '100%',
    marginBottom: hp(2),
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(3),
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: Fontsize.xs0,
    color: Colors.mediumGrey,
    fontFamily: Fonts.poppinsRegular,
    marginBottom: hp(0.4),
  },
  metricValue: {
    fontSize: Fontsize.sm,
    color: Colors.darkNavy,
    fontFamily: Fonts.poppinsSemiBold,
  },
  metricValueNormal: {
    fontSize: 14,
    fontFamily: Fonts.poppinsRegular,
  },
});

export default StaffDetailCategoryCard;
