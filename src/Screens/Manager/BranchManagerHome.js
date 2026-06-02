import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CategoryBreakdownCard from '../../Components/CategoryBreakdownCard';
import CommissionCard from '../../Components/CommissionCard';
import HomeHeaderComponent from '../../Components/HomeHeaderComponent';
import SlipBoundIncentiveItem, {
  SlipBoundIncentiveHeader,
} from '../../Components/SlipBoundIncentive';
import TargetVsAchievementCard from '../../Components/TargetVsAchievementCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { slipBoundIncentiveData } from '../../Constants/DummyData';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const renderIncentiveItem = ({ item }) => (
  <SlipBoundIncentiveItem item={item} />
);

const ListHeader = () => (
  <View>
    <Text style={styles.pageTitle} numberOfLines={1}>
      {Strings.branchOverview}
    </Text>
    <TargetVsAchievementCard />
    <CommissionCard />
    <CategoryBreakdownCard />

    <Text style={styles.sectionTitle} numberOfLines={1}>
      {Strings.slipBoundIncentive}
    </Text>
    <Text style={styles.sectionSub} numberOfLines={2}>
      {Strings.branchIncentiveSub}
    </Text>
    <SlipBoundIncentiveHeader />
  </View>
);

const BranchManagerHome = () => {
  return (
    <View style={MyStyling.container2}>
      <View style={styles.headerArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.darkNavy}
        />
        <HomeHeaderComponent />
      </View>

      <FlatList
        data={slipBoundIncentiveData}
        keyExtractor={item => item.id}
        renderItem={renderIncentiveItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: Colors.darkNavy,
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.3),
    paddingBottom: hp(3),
  },
  pageTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.mm,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(2.1),
  },
  sectionTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.slipBoundSectionTitle,
    color: Colors.black,
  },
  sectionSub: {
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.xs1,
    color: Colors.steelGray,
    marginTop: hp(0.4),
    marginBottom: hp(1.2),
  },
});

export default BranchManagerHome;
