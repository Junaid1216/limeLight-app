import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const TrainingCustomerCard = ({ item }) => (
  <View style={styles.customerCard}>
    <View style={styles.thumbWrap}>
      <Image
        source={item.image}
        style={styles.thumbImage}
        resizeMode="cover"
      />
      <View style={styles.playOverlayWrap}>
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={wp(5)} color={Colors.charcoal} />
        </View>
      </View>
    </View>

    <Text style={styles.customerTitle}>{item.title}</Text>
    <Text style={styles.customerDesc}>{item.description}</Text>

    <View style={styles.customerFooter}>
      <Text style={styles.dateText}>{item.date}</Text>
      <TouchableOpacity style={styles.startBtn} activeOpacity={0.9}>
        <Ionicons name="play" size={wp(3.4)} color={Colors.white} />
        <Text style={styles.startBtnText}>Start</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  customerCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.softDivider,
    padding: wp(3),
    marginBottom: hp(2),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbWrap: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(3),
    overflow: 'hidden',
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  thumbImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  playOverlayWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playOverlay: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(0.5),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  customerTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm1,
    color: Colors.black,
    marginBottom: hp(0.8),
  },
  customerDesc: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
    lineHeight: hp(2.4),
    marginBottom: hp(1.6),
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
    backgroundColor: Colors.green,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1),
    borderRadius: wp(6),
    gap: wp(1.5),
  },
  startBtnText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs2,
    color: Colors.white,
  },
});

export default TrainingCustomerCard;
