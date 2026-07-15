import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';
import { Images } from '../Assets';

const StaffDetailResourceCard = ({ profile }) => {
  const initials = profile?.initials ?? '';
  const name = profile?.name ?? '';
  const designation = profile?.designation ?? '';
  const roleBadge = profile?.roleBadge ?? designation;
  const branch = profile?.branch ?? '';
  const target = profile?.target ?? 0;
  const achieved = profile?.achieved ?? 0;
  const remaining = profile?.remaining ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.staffName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.staffRole} numberOfLines={1}>
              {designation}
            </Text>
            <View style={styles.badgeRow}>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText} numberOfLines={1}>
                  {roleBadge}
                </Text>
              </View>
              <View style={styles.branchContainer}>
                <Image source={Images.Location} style={styles.locationIcon} />
                <Text style={styles.branchText} numberOfLines={1}>
                  {branch}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statsBox, styles.targetBox]}>
          <View style={styles.statsLabelRow}>
            <Feather name="target" size={10} color={Colors.brightBlue} />
            <Text style={[styles.statsLabel, { color: Colors.brightBlue }]}>
              {' '}
              {Strings.target}
            </Text>
          </View>
          <Text style={[styles.statsValue, { color: Colors.brightBlue }]}>
            {String(target)}
          </Text>
        </View>
        <View style={[styles.statsBox, styles.achievedBox]}>
          <View style={styles.statsLabelRow}>
            <Feather name="trending-up" size={10} color={Colors.branchGreen} />
            <Text style={[styles.statsLabel, { color: Colors.branchGreen }]}>
              {' '}
              {Strings.achievedLabel}
            </Text>
          </View>
          <Text style={[styles.statsValue, { color: Colors.branchGreen }]}>
            {String(achieved)}
          </Text>
        </View>
        <View style={[styles.statsBox, styles.remainingBox]}>
          <View style={styles.statsLabelRow}>
            <Feather name="clock" size={10} color={Colors.vividAmber} />
            <Text style={[styles.statsLabel, { color: Colors.vividAmber }]}>
              {' '}
              {Strings.remainingLabel}
            </Text>
          </View>
          <Text style={[styles.statsValue, { color: Colors.vividAmber }]}>
            {String(remaining)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(91.9),
  },
  profileCard: {
    backgroundColor: Colors.white,
    padding: wp(5),
    marginBottom: hp(2),
    borderColor: Colors.branchGreen,
    borderRadius: wp(3.2),
    borderWidth: wp(0.27),
    marginLeft: wp(1.2),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  avatarCircle: {
    width: wp(13.4),
    height: wp(13.4),
    borderRadius: wp(6.7),
    backgroundColor: '#20C9971A',
    borderColor: '#20C9971A',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  avatarText: {
    fontSize: Fontsize.ml,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.branchGreen,
  },
  profileInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: wp(3.5),
    fontFamily: Fonts.poppinsRegular,
    color: Colors.darkNavy,
    marginBottom: hp(0.4),
  },
  staffRole: {
    fontSize: wp(2.4),
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    marginBottom: hp(1.2),
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: wp(1),
  },
  roleBadge: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: wp(4),
    backgroundColor: '#F4F4F5',
    marginRight: wp(2),
  },
  roleBadgeText: {
    fontSize: Fontsize.xs1,
    color: Colors.darkgrey,
    fontFamily: Fonts.poppinsMedium,
    width: wp(17.7),
    marginLeft: wp(0.7),
  },
  branchText: {
    fontSize: Fontsize.xs1,
    color: Colors.mediumGrey,
    fontFamily: Fonts.poppinsRegular,
  },
  branchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  locationIcon: {
    width: wp(3.1),
    height: wp(3.1),
    tintColor: '#71717B',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(3.2),
    width: wp(93),
  },
  statsBox: {
    width: wp(28),
    borderRadius: wp(4),
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(12),
  },
  statsLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  targetBox: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  achievedBox: {
    backgroundColor: Colors.mintLight,
    borderWidth: 1,
    borderColor: '#20C997',
  },
  remainingBox: {
    backgroundColor: Colors.whiteOrange,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  statsLabel: {
    fontSize: wp(2.67),
    fontFamily: Fonts.poppinsRegular,
    marginLeft: wp(1),
  },
  statsValue: {
    fontSize: wp(5.6),
    color: Colors.darkNavy,
    fontFamily: Fonts.poppinsSemiBold,
  },
});

export default StaffDetailResourceCard;
