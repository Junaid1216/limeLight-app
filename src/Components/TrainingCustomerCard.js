import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import TrainingThumbnail from './TrainingThumbnail';

const OverlayPlayIcon = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path d="M16 9 L16 39 L40 24 Z" fill={color} />
  </Svg>
);

const PlayIcon = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path d="M18 13 L18 35 L35 24 Z" fill={color} />
  </Svg>
);

const TrainingCustomerCard = ({ item, onPlay }) => {
  const handlePlay = () => {
    onPlay?.(item);
  };

  return (
  <View style={styles.customerCard}>
    <TouchableOpacity
      style={styles.thumbWrap}
      activeOpacity={0.92}
      onPress={handlePlay}
    >
      <TrainingThumbnail
        thumbnail={item?.thumbnail}
        style={styles.thumbImage}
        resizeMode="cover"
      />
      <View style={styles.playOverlayWrap}>
        <View style={styles.playOverlay}>
          <View style={styles.playIconWrap}>
            <OverlayPlayIcon size={wp(9)} color={Colors.black} />
          </View>
        </View>
      </View>
    </TouchableOpacity>

    <View style={styles.cardBody}>
      <Text style={styles.customerTitle}>{item.title}</Text>
      <Text style={styles.customerDesc}>{item.description}</Text>

      <View style={styles.customerFooter}>
        <Text style={styles.dateText}>{item.date}</Text>
        <TouchableOpacity style={styles.startBtn} activeOpacity={0.88} onPress={handlePlay}>
          <PlayIcon size={wp(5.5)} color={Colors.white} />
          <Text style={styles.startBtnText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  customerCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.platinum,
    padding: wp(3),
    marginBottom: hp(2),
  },
  thumbWrap: {
    width: '100%',
    height: hp(19.5),
    borderRadius: wp(3),
    overflow: 'hidden',
    backgroundColor: Colors.lightGrey,
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.inputGrey,
  },
  playOverlayWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playOverlay: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    paddingTop: hp(1.4),
    paddingBottom: hp(0.4),
  },
  customerTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm,
    color: Colors.black,
    lineHeight: hp(2.6),
    marginBottom: hp(0.7),
  },
  customerDesc: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
    lineHeight: hp(2.35),
    marginBottom: hp(1.4),
  },
  customerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.mediumGrey,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    minWidth: wp(24),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.95),
    borderRadius: wp(8),
    gap: wp(1.2),
  },
  startBtnText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs2,
    color: Colors.white,
    includeFontPadding: false,
  },
});

export default TrainingCustomerCard;
