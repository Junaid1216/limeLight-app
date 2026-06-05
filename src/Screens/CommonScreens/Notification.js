import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { notificationData } from '../../Constants/DummyData';
import { Strings } from '../../Constants/Strings';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { MyStyling } from '../../Constants/Styling';

const Notification = () => {
  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <FlatList
        data={notificationData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <MainHeaderComponent
              title={Strings.notificationHeader}
              notificationCount={5}
            />
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle} numberOfLines={1}>
                {Strings.recent}
              </Text>
              <Text style={styles.unreadText} numberOfLines={1}>
                {Strings.unreadCount}
              </Text>
            </View>
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
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    width: wp(40),
  },
  unreadText: {
    fontSize: Fontsize.xmm,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    width: wp(14),
  },
});

export default Notification;
