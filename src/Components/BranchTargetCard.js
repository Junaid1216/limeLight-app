import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Images } from '../Assets';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { hp, wp } from '../Assets/Responsive';
import { Strings } from '../Constants/Strings';
import BranchTargetTable from './BranchTargetTable';

const BranchTargetCard = ({ branch, isExpanded, onPress }) => {
  const staffCount = branch?.staff?.length ?? 0;

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [
          styles.header,
          isExpanded && styles.headerExpanded,
          pressed && styles.headerPressed,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.iconBox,
            isExpanded ? styles.iconBoxActive : styles.iconBoxInactive,
          ]}
        >
          <Image
            source={Images.BranchIcon}
            style={[
              styles.branchIcon,
              !isExpanded && styles.branchIconInactive,
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.branchName} numberOfLines={1}>
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
          color={Colors.ashGray}
        />
      </Pressable>

      {isExpanded && (
        <BranchTargetTable staff={branch?.staff} totals={branch?.totals} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(1.5),
    borderWidth: wp(0.25),
    borderColor: Colors.lightGray,
    elevation: wp(0.2),
    shadowOffset: { width: 0, height: hp(0.12) },
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerExpanded: {
    backgroundColor: Colors.expandedHeaderBg,
    marginHorizontal: -wp(4),
    marginTop: -wp(4),
    paddingHorizontal: wp(4),
    paddingTop: wp(4),
    paddingBottom: hp(1.5),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderBottomWidth: wp(0.25),
    borderBottomColor: Colors.lightGray,
  },
  headerPressed: {
    opacity: 0.92,
  },
  iconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxActive: {
    backgroundColor: Colors.mintBadge,
  },
  iconBoxInactive: {
    backgroundColor: Colors.cloudGray,
  },
  branchIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.green,
  },
  branchIconInactive: {
    tintColor: Colors.ashGray,
  },
  titleBlock: {
    flex: 1,
    marginLeft: wp(3),
  },
  branchName: {
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.graphite,
  },
  subtitle: {
    marginTop: hp(0.2),
    fontSize: Fontsize.xs0,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.ashGray,
  },
});

export default BranchTargetCard;
