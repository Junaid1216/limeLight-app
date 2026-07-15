import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeaderComponent from '../../Components/MainHeaderComponent';
import BranchTargetCard from '../../Components/BranchTargetCard';
import ScreenLoader from '../../Components/ScreenLoader';
import { MyStyling } from '../../Constants/Styling';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { hp, wp } from '../../Assets/Responsive';
import Api from '../../Services/Api_services';
import {
  isApiSuccess,
  logApiAppResponse,
  logApiResponse,
  mapAsmBranchTargets,
} from '../../Utils/asmMappers';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const BranchTargets = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAsmBranchTargets = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await Api.getAsmBranchTargets();
      const resJson = res?.data;

      if (isApiSuccess(res)) {
        logApiResponse('ASM Branch Targets Backend Response:', resJson);

        const appResponse = mapAsmBranchTargets(resJson?.data);
        logApiAppResponse('ASM Branch Targets App Response:', res, appResponse);

        setBranchesData(appResponse);
      } else {
        logApiResponse('ASM Branch Targets Error Response:', resJson);
        showApiMessageToast(res);
      }
    } catch (error) {
      logApiResponse(
        'ASM Branch Targets API Error:',
        error?.response?.data ?? error?.message ?? error,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAsmBranchTargets();
    }, [fetchAsmBranchTargets]),
  );

  const handleToggle = branchId => {
    setExpandedId(prev => (prev === branchId ? null : branchId));
  };

  const renderItem = ({ item }) => (
    <BranchTargetCard
      branch={item}
      isExpanded={expandedId === item?.id}
      onPress={() => handleToggle(item?.id)}
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

        {isLoading ? (
          <ScreenLoader />
        ) : (
        <FlatList
          data={branchesData}
          keyExtractor={item => String(item?.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
        )}
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
