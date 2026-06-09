import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeaderComponent from '../../Components/MainHeaderComponent';
import BranchTargetCard from '../../Components/BranchTargetCard';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { branchesData } from '../../Constants/DummyData';
import { hp, wp } from '../../Assets/Responsive';

const BranchTargets = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = branchId => {
    setExpandedId(prev => (prev === branchId ? null : branchId));
  };

  const renderItem = ({ item }) => (
    <BranchTargetCard
      branch={item}
      isExpanded={expandedId === item.id}
      onPress={() => handleToggle(item.id)}
    />
  );

  return (
    <SafeAreaView style={MyStyling.container2} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.content}>
        <MainHeaderComponent
          title={Strings.branchTargets}
          notificationCount={5}
        />

        <FlatList
          data={branchesData}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default BranchTargets;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingBottom: hp(4),
  },
});
