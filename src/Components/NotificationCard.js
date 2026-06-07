import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const NotificationCard = ({ item, onPress }) => {
  const iconSource = Images[item.icon];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.iconBox}>
        {iconSource ? (
          <Image
            source={iconSource}
            style={styles.iconImage}
            resizeMode="contain"
          />
        ) : (
          <Icon name={item.icon} size={wp(5)} color={Colors.mediumGrey} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footerRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <Image
        source={Images.RightArrow}
        style={styles.chevron}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.8),
    marginBottom: hp(1.2),
    elevation: 1,
  },
  iconBox: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    padding: wp(2),
  },
  iconImage: {
    width: wp(5),
    height: wp(8),
    tintColor: Colors.mediumGrey,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    marginLeft: wp(3),
    marginRight: wp(2),
  },
  title: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginBottom: hp(0.4),
  },
  description: {
    fontSize: wp(3.18),
    fontFamily: Fonts.poppinsRegular,
    color: Colors.zinc,
    lineHeight: hp(2.2),
    marginBottom: hp(0.8),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
    borderRadius: wp(3),
    marginRight: wp(2),
    backgroundColor: Colors.lightGrey,
  },
  tagText: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.mediumGrey,
  },
  time: {
    fontSize: Fontsize.xs,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
  chevron: {
    width: wp(2.5),
    height: wp(2.5),
    tintColor: Colors.mediumGrey,
    alignSelf: 'flex-start',
    marginTop: hp(1.5),
  },
});

export default NotificationCard;
