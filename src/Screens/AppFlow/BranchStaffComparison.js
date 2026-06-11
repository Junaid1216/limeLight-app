import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeaderComponent from '../../Components/MainHeaderComponent';
import BranchStaffComparisonCard from '../../Components/BranchStaffComparisonCard';
import StaffComparisonTabs from '../../Components/StaffComparisonTabs';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { branchStaffComparisonData } from '../../Constants/DummyData';
import { hp, wp } from '../../Assets/Responsive';
import { MyStyling } from '../../Constants/Styling';

const BranchStaffComparison = props => {
  const params = props?.route?.params;
  const branchData = params?.branchData ?? branchStaffComparisonData;

  const [expandedId, setExpandedId] = useState(params?.expandedId ?? 1);
  const [selectedTab, setSelectedTab] = useState(
    params?.selectedTab ?? Strings.weekly,
  );

  const toggleBranch = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const goToStaffDetail = member => {
    props?.navigation?.navigate('StaffDetail', { member });
  };

  const renderBranch = ({ item }) => (
    <BranchStaffComparisonCard
      branch={item}
      isExpanded={expandedId === item?.id}
      onPress={() => toggleBranch(item?.id)}
      onStaffPress={goToStaffDetail}
    />
  );

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lightGrey} />

      <View style={styles.content}>
        <MainHeaderComponent
          title={params?.title ?? Strings.staffComparisonHeader}
          notificationCount={params?.notificationCount ?? 5}
        />

        <FlatList
          data={branchData}
          keyExtractor={item => String(item?.id)}
          renderItem={renderBranch}
          ListHeaderComponent={
            <StaffComparisonTabs
              selectedTab={selectedTab}
              weeklyLabel={Strings.weekly}
              monthlyLabel={Strings.monthly}
              onPressWeekly={() => setSelectedTab(Strings.weekly)}
              onPressMonthly={() => setSelectedTab(Strings.monthly)}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default BranchStaffComparison;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    backgroundColor: Colors.lightGrey,
  },
  list: {
    paddingBottom: wp(1),
  },
});
