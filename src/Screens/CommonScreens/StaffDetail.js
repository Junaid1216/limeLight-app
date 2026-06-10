import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { Images } from '../../Assets';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import StaffDetailResourceCard from '../../Components/StaffDetailResourceCard';
import StaffDetailCategoryCard from '../../Components/StaffDetailCategoryCard';
import { MyStyling } from '../../Constants/Styling';

const garmentsCard = {
  title: Strings.garments,
  achievement: '75% Achievement',
  target: 100,
  achieved: 75,
  remaining: 25,
  iconSource: Images.Garments,
  iconBg: Colors.darkgreen,
  borderRadius: wp(2.67),
  progressColor: Colors.branchGreen,
  borderColor: Colors.lightGray,
  achievedColor: Colors.branchGreen,
};

const unstitchedCard = {
  title: Strings.unstitched,
  achievement: '67% Achievement',
  target: 100,
  achieved: 65,
  remaining: 35,
  iconSource: Images.unstiched,
  iconBg: Colors.whiteOrange,
  progressColor: Colors.vividAmber,
  borderColor: Colors.lightGray,
  iconTintColor: Colors.vividAmber,
  achievedColor: Colors.vividAmber,
};

const accessoriesCard = {
  title: Strings.accessories,
  achievement: '80% Achievement',
  target: 50,
  achieved: 40,
  remaining: 10,
  iconSource: Images.Accesories,
  iconBg: Colors.lightBlue,
  progressColor: Colors.brightBlue,
  borderColor: Colors.lightGray,
  iconTintColor: Colors.brightBlue,
  achievedColor: Colors.brightBlue,
};

const StaffDetail = ({ navigation }) => {
  return (
    <View style={[MyStyling.container2, styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={styles.headerWrap}>
        <MainHeaderComponent
          title={Strings.staffDetailsHeader}
          notificationCount={5}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <StaffDetailResourceCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} numberOfLines={1}>
            {Strings.categoryPerformance}
          </Text>
        </View>

        <StaffDetailCategoryCard item={garmentsCard} />
        <StaffDetailCategoryCard item={unstitchedCard} />
        <StaffDetailCategoryCard item={accessoriesCard} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: wp(4),
    paddingBottom: hp(3),
  },
  headerWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  sectionHeader: {
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.darkNavy,
    marginTop: wp(1),
    marginLeft: wp(2),
  },
});

export default StaffDetail;
