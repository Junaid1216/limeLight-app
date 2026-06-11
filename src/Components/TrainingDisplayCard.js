import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const DisplayAudioPlayer = ({ progress, duration }) => (
  <View style={styles.displayAudioBox}>
    <View style={styles.displayAudioRow}>
      <TouchableOpacity style={styles.displayPlayBtn} activeOpacity={0.9}>
        <Ionicons name="play" size={wp(4)} color={Colors.white} />
      </TouchableOpacity>
      <Text style={styles.displayAudioLabel}>Audio Guide</Text>
      <Text style={styles.displayAudioTime}>{duration}</Text>
    </View>
    <Progress.Bar
      progress={progress}
      width={null}
      height={hp(0.7)}
      color={Colors.amber}
      unfilledColor={Colors.platinum}
      borderWidth={0}
      borderRadius={wp(2)}
      style={styles.displayProgress}
    />
  </View>
);

const TrainingDisplayCard = ({ item }) => (
  <View style={styles.displayCard}>
    <View style={styles.displayImageWrap}>
      <Image
        source={item.image}
        style={styles.displayImage}
        resizeMode="cover"
      />
      <View style={styles.locationPill}>
        <Feather name="map-pin" size={wp(3)} color={Colors.white} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
    </View>

    <View style={styles.displayBody}>
      <Text style={styles.displayCategory}>{item.category}</Text>
      <Text style={styles.displayTitle}>{item.title}</Text>
      <Text style={styles.displayDesc}>{item.description}</Text>
      <DisplayAudioPlayer progress={item.progress} duration={item.duration} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  displayCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.softDivider,
    marginBottom: hp(2),
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  displayImageWrap: {
    width: '100%',
    height: hp(18),
    backgroundColor: Colors.darkSlate,
    justifyContent: 'flex-end',
  },
  displayImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.6),
    borderRadius: wp(4),
    margin: wp(3),
    gap: wp(1),
  },
  locationText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm2,
    color: Colors.white,
  },
  displayBody: {
    padding: wp(3.5),
  },
  displayCategory: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xm2,
    color: Colors.green,
    letterSpacing: 0.5,
    marginBottom: hp(0.6),
  },
  displayTitle: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.sm1,
    color: Colors.black,
    marginBottom: hp(0.6),
  },
  displayDesc: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs2,
    color: Colors.grey,
    lineHeight: hp(2.4),
    marginBottom: hp(1.6),
  },
  displayAudioBox: {
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(3),
    padding: wp(3),
  },
  displayAudioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  displayPlayBtn: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(0.6),
    marginRight: wp(3),
  },
  displayAudioLabel: {
    flex: 1,
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs2,
    color: Colors.charcoalText,
  },
  displayAudioTime: {
    fontFamily: Fonts.poppinsRegular,
    fontSize: Fontsize.xs1,
    color: Colors.grey,
  },
  displayProgress: {
    width: '100%',
  },
});

export default TrainingDisplayCard;
