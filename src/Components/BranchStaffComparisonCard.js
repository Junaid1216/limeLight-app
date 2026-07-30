import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { hp, wp } from '../Assets/Responsive';
import { Strings } from '../Constants/Strings';
import BranchStaffComparisonTable from './BranchStaffComparisonTable';

const BranchStaffComparisonCard = ({
  branch,
  isExpanded,
  onPress,
  onStaffPress,
}) => {
  const staffCount = branch?.staff?.length ?? 0;

  return (
    <View style={[styles.card, isExpanded && styles.cardExpanded]}>
      <Pressable
        style={({ pressed }) => [
          styles.header,
          isExpanded && styles.headerExpanded,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.iconBox,
            isExpanded ? styles.iconActive : styles.iconInactive,
          ]}
        >
          <Image
            source={Images.BranchIcon}
            style={[styles.icon, !isExpanded && styles.iconGray]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>
            {branch?.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {isExpanded
              ? Strings.staffMembers(staffCount)
              : Strings.tapToViewTargets}
          </Text>
        </View>

        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={wp(5)}
          color={Colors.graphite}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.tableWrap}>
          <BranchStaffComparisonTable
            staff={branch?.staff}
            onStaffPress={onStaffPress}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4.5),
    padding: wp(3),
    marginBottom: hp(1.5),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    elevation: wp(0.2),
    shadowColor: Colors.black,
    overflow: 'hidden',
  },
  cardExpanded: {
    backgroundColor: Colors.inputGrey,
    borderColor: Colors.paleSlate,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerExpanded: {
    // marginBottom: hp(0.2),
  },
  tableWrap: {
    alignSelf: 'stretch',
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
  },
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconActive: {
    backgroundColor: Colors.mintBadge,
  },
  iconInactive: {
    backgroundColor: Colors.cloudGray,
  },
  icon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.green,
  },
  iconGray: {
    tintColor: Colors.ashGray,
  },
  textBox: {
    flex: 1,
    marginLeft: wp(3),
  },
  title: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsBold,
    color: Colors.graphite,
  },
  subtitle: {
    marginTop: hp(0.25),
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.ashGray,
  },
});

export default BranchStaffComparisonCard;
