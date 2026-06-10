import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnnouncementCard from '../../Components/AnnouncementCard';
import AnnouncementFilterBar from '../../Components/AnnouncementFilterBar';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { announcementData } from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const Announcement = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const listData = announcementData[selectedFilter];

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <FlatList
        data={listData}
        keyExtractor={item => item?.id}
        renderItem={({ item }) => (
          <AnnouncementCard
            item={item}
            onPress={() =>
              navigation.navigate('AnnouncementDetail', { item })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <MainHeaderComponent
              title={Strings.announcementHeader}
              notificationCount={5}
            />
            <AnnouncementFilterBar
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
  },
});

export default Announcement;
