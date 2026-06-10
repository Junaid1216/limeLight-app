import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Strings } from '../Constants/Strings';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const AnnouncementCard = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText} numberOfLines={1}>
            {item?.category}
          </Text>
        </View>

        <View style={styles.dateRow}>
          <Image
            source={Images.Calender}
            style={styles.calendarIcon}
            resizeMode="contain"
          />
          <Text style={styles.dateText} numberOfLines={1}>
            {item?.date}
          </Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {item?.title}
      </Text>

      <Text style={styles.description} numberOfLines={3}>
        {item?.description}
      </Text>

      <TouchableOpacity
        style={styles.readMoreRow}
        activeOpacity={0.7}
        onPress={() => onPress?.(item)}>
        <Text style={styles.readMoreText} numberOfLines={1}>
          {Strings.readMore}
        </Text>
        <Image
          source={Images.ColorfulArrow}
          style={styles.readMoreIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
  },
  categoryBadge: {
    backgroundColor: Colors.green,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
  },
  categoryText: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.white,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: wp(3.5),
    height: wp(3.5),
    tintColor: Colors.mediumGrey,
  },
  dateText: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    marginLeft: wp(1),
  },
  title: {
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginBottom: hp(0.8),
  },
  description: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.zinc,
    lineHeight: hp(2.4),
    marginBottom: hp(1.2),
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.orange,
    marginLeft: wp(1),
  },
  readMoreIcon: {
    width: wp(3),
    height: wp(3),
    marginLeft:wp(1),
  },
});

export default AnnouncementCard;
