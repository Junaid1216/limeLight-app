import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { wp } from '../Assets/Responsive';
import { Fontsize } from '../Constants/Fontsize';
import { Images } from '../Assets';
import { Strings } from '../Constants/Strings';

const ResponseComponent = ({
  totalStaff = 0,
  completed = 0,
  pending = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.iconBox, styles.staffIconBox]}>
          <Image source={Images.MultiplePeople} style={styles.staffIcon} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {Strings.TotalStaff}
        </Text>
        <Text style={[styles.count, styles.staffCount]} numberOfLines={1}>
          {totalStaff}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.iconBox, styles.completedIconBox]}>
          <Image source={Images.tickCircle} style={styles.completedIcon} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {Strings.Completed}
        </Text>
        <Text style={[styles.count, styles.completedCount]} numberOfLines={1}>
          {completed}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.iconBox, styles.pendingIconBox]}>
          <Image source={Images.Clock} style={styles.pendingIcon} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {Strings.Pending}
        </Text>
        <Text style={[styles.count, styles.pendingCount]} numberOfLines={1}>
          {pending}
        </Text>
      </View>
    </View>
  );
};

export default ResponseComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: wp(2.5),
  },

  card: {
    width: wp(28),
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    padding: wp(3.5),
    borderWidth: wp(0.5),
    borderColor: Colors.inputGrey,
    elevation: 0.5,
    height: wp(34),
    marginLeft: wp(1.2),
  },
  iconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(2),
  },

  staffIconBox: {
    backgroundColor: Colors.lightGray,
  },

  completedIconBox: {
    backgroundColor: Colors.mintLight,
  },

  pendingIconBox: {
    backgroundColor: Colors.whiteOrange,
    borderRadius: wp(2.4),
  },

  staffIcon: {
    width: wp(4.8),
    height: wp(4.8),
    resizeMode: 'contain',
    tintColor: Colors.royalBlue,
  },

  completedIcon: {
    width: wp(4.8),
    height: wp(4.8),
    resizeMode: 'contain',
  },

  pendingIcon: {
    width: wp(4.8),
    height: wp(4.8),
    resizeMode: 'contain',
  },

  label: {
    fontSize: Fontsize.xs0,
    color: Colors.zinc,
    fontFamily: Fonts.poppinsRegular,
    marginTop: wp(1.5),
  },

  count: {
    fontSize: Fontsize.mm,
    fontFamily: Fonts.poppinsRegular,
    marginTop: wp(1.5),
  },

  staffCount: {
    color: Colors.royalBlue,
    fontFamily: Fonts.poppinsRegular,
  },

  completedCount: {
    color: Colors.branchGreen,
    fontFamily: Fonts.poppinsRegular,
  },

  pendingCount: {
    color: Colors.vividAmber,
  },
});
